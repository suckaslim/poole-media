"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { Database } from "@/types/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
};

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactActionResult> {
  if (
    !data.name.trim() ||
    !data.email.trim() ||
    !data.service_interest ||
    !data.message.trim()
  ) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim() || null,
    service_interest: data.service_interest,
    message: data.message.trim(),
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return {
      success: false,
      error: "Failed to save your message. Please try again.",
    };
  }

  try {
    await resend.emails.send({
      from: "Poole Media <contact@poole.media>",
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New inquiry: ${data.service_interest} — ${data.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
          <h2 style="color:#6366f1;margin-bottom:16px;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:8px 12px 8px 0;font-weight:600;color:#555;white-space:nowrap;">Name</td>
              <td style="padding:8px 0;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px 8px 0;font-weight:600;color:#555;white-space:nowrap;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#6366f1;">${escapeHtml(data.email)}</a></td>
            </tr>
            ${
              data.phone
                ? `<tr>
              <td style="padding:8px 12px 8px 0;font-weight:600;color:#555;white-space:nowrap;">Phone</td>
              <td style="padding:8px 0;">${escapeHtml(data.phone)}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:8px 12px 8px 0;font-weight:600;color:#555;white-space:nowrap;">Service</td>
              <td style="padding:8px 0;">${escapeHtml(data.service_interest)}</td>
            </tr>
          </table>
          <div style="margin-top:20px;">
            <p style="font-weight:600;color:#555;margin-bottom:8px;">Message:</p>
            <div style="background:#f5f5f5;padding:16px;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Resend email error:", err);
  }

  return { success: true };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
