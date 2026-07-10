"use client";

import { useState } from "react";
import { submitWaitlistForm } from "@/app/actions/waitlist";
import { ArrowRight } from "lucide-react";

export function WaitlistForm({ serviceName }: { serviceName: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const result = await submitWaitlistForm({
      name,
      email,
      service_interest: serviceName,
    });
    if (result.success) {
      setStatus("success");
    } else {
      setErrorMsg(result.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[#6366f1]/30 bg-[#6366f1]/5 px-5 py-4">
        <p className="text-sm font-medium text-white">You&apos;re on the list.</p>
        <p className="text-xs text-white/50 mt-1">
          We&apos;ll reach out when {serviceName} launches.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 rounded-lg bg-white/[0.05] border border-white/[0.1] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#6366f1]/50 transition-colors"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-lg bg-white/[0.05] border border-white/[0.1] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#6366f1]/50 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-1.5 w-full rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          {status === "loading" ? "Joining…" : "Join Waitlist"}
          {status !== "loading" && <ArrowRight className="h-3.5 w-3.5" />}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-red-400 mt-2">{errorMsg}</p>
      )}
    </div>
  );
}
