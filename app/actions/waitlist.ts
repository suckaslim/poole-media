"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { Database } from "@/types/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export type WaitlistFormData = {
  name: string;
  email: string;
  service_interest: string;
};

export type WaitlistActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitWaitlistForm(
  data: WaitlistFormData
): Promise<WaitlistActionResult> {
  if (!data.name.trim() || !data.email.trim() || !data.service_interest.trim()) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: dbError } = await supabase.from("waitlist_submissions").insert({
    name: data.name.trim(),
    email: data.email.trim(),
    service_interest: data.service_interest,
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return {
      success: false,
      error: "Failed to save your signup. Please try again.",
    };
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: "Poole Media <contact@poole.media>",
        to: process.env.RESEND_TO_EMAIL!,
        replyTo: data.email,
        subject: `Waitlist signup: ${data.service_interest} — ${data.name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
            <h2 style="color:#6366f1;margin-bottom:16px;">New Waitlist Signup</h2>
            <p style="font-size:14px;color:#555;margin-bottom:16px;"><strong>Service:</strong> ${escapeHtml(data.service_interest)}</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:8px 12px 8px 0;font-weight:600;color:#555;white-space:nowrap;">Name</td>
                <td style="padding:8px 0;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px 8px 0;font-weight:600;color:#555;white-space:nowrap;">Email</td>
                <td style="padding:8px 0;">${escapeHtml(data.email)}</td>
              </tr>
            </table>
          </div>
        `,
      }),
      fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `New waitlist signup for ${data.service_interest}: ${data.name} (${data.email})`,
          }),
        }
      ),
    ]);
  } catch (err) {
    console.error("Waitlist notification error:", err);
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
