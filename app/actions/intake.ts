"use server";

import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { Database } from "@/types/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MINUTES = 60;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;

export type IntakeFormData = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  services: string;
  serviceArea: string;
  hasStorefront: boolean;
  address: string;
  currentSiteUrl: string;
  hours: string;
  differentiator: string;
  businessStory: string;
  socialLinks: string;
  visualAssetsNote: string;
  notes: string;
};

export type IntakeSubmitPayload = IntakeFormData & {
  honeypot: string;
  turnstileToken: string;
};

export type IntakeActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitIntakeForm(
  data: IntakeSubmitPayload
): Promise<IntakeActionResult> {
  // Honeypot tripped — pretend everything worked, save nothing, send nothing.
  if (data.honeypot.trim() !== "") {
    return { success: true };
  }

  if (
    !data.businessName.trim() ||
    !data.contactName.trim() ||
    !data.email.trim() ||
    !data.phone.trim() ||
    !data.industry.trim() ||
    !data.services.trim() ||
    !data.serviceArea.trim() ||
    !data.currentSiteUrl.trim()
  ) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (data.hasStorefront && !data.address.trim()) {
    return {
      success: false,
      error: "Please enter the address customers visit.",
    };
  }

  const ip = await getClientIp();

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (ip && (await isRateLimited(supabase, ip))) {
    return {
      success: false,
      error: "Too many submissions from this connection. Please try again later.",
    };
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return {
      success: false,
      error: "Verification failed. Please refresh the page and try again.",
    };
  }

  const { error: dbError } = await supabase.from("intake_submissions").insert({
    business_name: data.businessName.trim(),
    contact_name: data.contactName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    industry: data.industry,
    services: data.services.trim(),
    service_area: data.serviceArea.trim(),
    has_storefront: data.hasStorefront,
    address: data.address.trim() || null,
    current_site_url: data.currentSiteUrl.trim(),
    hours: data.hours.trim() || null,
    differentiator: data.differentiator.trim() || null,
    business_story: data.businessStory.trim() || null,
    social_links: data.socialLinks.trim() || null,
    visual_assets_note: data.visualAssetsNote.trim() || null,
    notes: data.notes.trim() || null,
    ip_address: ip,
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return {
      success: false,
      error: "Failed to save your submission. Please try again.",
    };
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: "Poole Media <contact@poole.media>",
        to: process.env.RESEND_TO_EMAIL!,
        replyTo: data.email,
        subject: `New Get Started signup: ${data.businessName}`,
        html: internalNotificationHtml(data),
      }),
      resend.emails.send({
        from: "Poole Media <contact@poole.media>",
        to: data.email,
        subject: "We've got everything we need — Poole Media",
        html: confirmationHtml(data),
      }),
      fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `New Get Started signup: ${data.businessName} (${data.contactName}, ${data.email})`,
          }),
        }
      ),
    ]);
  } catch (err) {
    console.error("Intake notification error:", err);
  }

  return { success: true };
}

async function getClientIp(): Promise<string | null> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return h.get("x-real-ip");
}

async function isRateLimited(
  supabase: ReturnType<typeof createClient<Database>>,
  ip: string
): Promise<boolean> {
  const windowStart = new Date(
    Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60_000
  ).toISOString();

  const { count, error } = await supabase
    .from("intake_submissions")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", windowStart);

  if (error) {
    console.error("Rate limit check failed:", error);
    return false;
  }

  return (count ?? 0) >= RATE_LIMIT_MAX_SUBMISSIONS;
}

async function verifyTurnstile(
  token: string,
  ip: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );
    const result = await res.json();
    return result.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

function internalNotificationHtml(data: IntakeFormData): string {
  const rows: Array<[string, string]> = [
    ["Business Name", data.businessName],
    ["Contact Name", data.contactName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Industry", data.industry],
    ["Service Area", data.serviceArea],
    [
      "Storefront",
      data.hasStorefront
        ? `Customers visit them — ${data.address || "no address given"}`
        : "Service-area only, no storefront",
    ],
    ["Current Site", data.currentSiteUrl],
  ];
  if (data.hours) rows.push(["Hours", data.hours]);
  if (data.socialLinks) rows.push(["Social Links", data.socialLinks]);
  if (data.visualAssetsNote) rows.push(["Photos/Logo", data.visualAssetsNote]);

  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px 8px 0;font-weight:600;color:#555;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  const blocks: Array<[string, string]> = [["Services Wanted", data.services]];
  if (data.differentiator) blocks.push(["What Makes Them Different", data.differentiator]);
  if (data.businessStory) blocks.push(["Their Story / Vibe", data.businessStory]);
  if (data.notes) blocks.push(["Anything Else", data.notes]);

  const blocksHtml = blocks
    .map(
      ([label, value]) => `
      <div style="margin-top:20px;">
        <p style="font-weight:600;color:#555;margin-bottom:8px;">${escapeHtml(label)}:</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(value)}</div>
      </div>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
      <h2 style="color:#6366f1;margin-bottom:16px;">New Get Started Signup</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table>
      ${blocksHtml}
    </div>
  `;
}

function confirmationHtml(data: IntakeFormData): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
      <h2 style="color:#6366f1;margin-bottom:16px;">Thanks for signing up with Poole Media!</h2>
      <p style="font-size:15px;line-height:1.6;">
        Hi ${escapeHtml(data.contactName)}, we've got everything we need for
        ${escapeHtml(data.businessName)} and will begin working on your site
        right away.
      </p>
      <p style="font-size:15px;line-height:1.6;">
        We'll reach back out when it's ready for you to review — typically
        about 2 weeks, though it can take a bit longer depending on current
        availability. No need to do anything else in the meantime.
      </p>
      <p style="font-size:15px;line-height:1.6;margin-top:24px;">
        — Jayce
      </p>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
