"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Send, AlertCircle } from "lucide-react";
import {
  submitContactForm,
  type ContactFormData,
} from "@/app/actions/contact";

const SERVICE_OPTIONS = [
  "Website Design and Build",
  "Agentic SEO",
  "AI-Assisted Content",
  "Site Maintenance",
  "Full Package",
  "Other / Not Sure",
];

type FormState = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  service_interest: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof ContactFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const result = await submitContactForm(form);

    if (result.success) {
      setState("success");
    } else {
      setErrorMsg(result.error);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center py-12 gap-5"
      >
        <div className="h-16 w-16 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/20 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-[#6366f1]" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-semibold text-white mb-2">
            Message Received
          </h3>
          <p className="text-white/55 max-w-sm leading-relaxed">
            Thanks for reaching out. We&apos;ll review your message and get back
            to you within one business day.
          </p>
        </div>
      </motion.div>
    );
  }

  const isLoading = state === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Name"
          required
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(v) => update("name", v)}
          disabled={isLoading}
        />
        <FormField
          label="Email"
          required
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(v) => update("email", v)}
          disabled={isLoading}
        />
      </div>

      <FormField
        label="Phone"
        type="tel"
        placeholder="(509) 555-0100"
        value={form.phone}
        onChange={(v) => update("phone", v)}
        disabled={isLoading}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">
          Service Interest <span className="text-[#8b5cf6]">*</span>
        </label>
        <select
          required
          value={form.service_interest}
          onChange={(e) => update("service_interest", e.target.value)}
          disabled={isLoading}
          className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1]/50 transition-colors disabled:opacity-50 appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-[#0a0a0a] text-white/50">
            Select a service...
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0a0a0a] text-white">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">
          Message <span className="text-[#8b5cf6]">*</span>
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your business and what you're looking to achieve..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          disabled={isLoading}
          className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1]/50 transition-colors resize-none disabled:opacity-50"
        />
      </div>

      <AnimatePresence>
        {state === "error" && errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 overflow-hidden"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs text-white/30">
        We&apos;ll reply within one business day.
      </p>
    </form>
  );
}

function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  required,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/70">
        {label}
        {required && <span className="text-[#8b5cf6] ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1]/50 transition-colors disabled:opacity-50"
      />
    </div>
  );
}
