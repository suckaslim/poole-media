"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle } from "lucide-react";
import {
  submitIntakeForm,
  type IntakeFormData,
} from "@/app/actions/intake";
import { trackEvent } from "@/lib/gtag";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

type FormState = "idle" | "submitting" | "error";

const EMPTY_FORM: IntakeFormData = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  industry: "",
  services: "",
  serviceArea: "",
  hasStorefront: false,
  address: "",
  currentSiteUrl: "",
  hours: "",
  differentiator: "",
  businessStory: "",
  socialLinks: "",
  visualAssetsNote: "",
  notes: "",
};

const TURNSTILE_TIMEOUT_MS = 15_000;

export function IntakeForm() {
  const router = useRouter();
  const [form, setForm] = useState<IntakeFormData>(EMPTY_FORM);
  const [storefrontChoice, setStorefrontChoice] = useState<
    "visit" | "service-area" | ""
  >("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenResolverRef = useRef<((token: string) => void) | null>(null);
  const tokenRejecterRef = useRef<((err: Error) => void) | null>(null);

  function update<K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTurnstileLoad() {
    if (!window.turnstile || !turnstileContainerRef.current) return;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    widgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: siteKey,
        execution: "execute",
        appearance: "interaction-only",
        callback: (token: string) => {
          tokenResolverRef.current?.(token);
          tokenResolverRef.current = null;
          tokenRejecterRef.current = null;
        },
        "error-callback": () => {
          tokenRejecterRef.current?.(
            new Error("Verification failed. Please try again.")
          );
          tokenResolverRef.current = null;
          tokenRejecterRef.current = null;
        },
      }
    );
  }

  function getTurnstileToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!window.turnstile || !widgetIdRef.current) {
        reject(
          new Error("Verification is still loading. Please try again in a moment.")
        );
        return;
      }

      tokenResolverRef.current = resolve;
      tokenRejecterRef.current = reject;
      window.turnstile.execute(widgetIdRef.current);

      setTimeout(() => {
        if (tokenResolverRef.current) {
          tokenResolverRef.current = null;
          tokenRejecterRef.current = null;
          reject(new Error("Verification timed out. Please try again."));
        }
      }, TURNSTILE_TIMEOUT_MS);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    if (storefrontChoice === "") {
      setErrorMsg("Please let us know if customers visit you or you go to them.");
      setState("error");
      return;
    }

    let turnstileToken: string;
    try {
      turnstileToken = await getTurnstileToken();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Verification failed.");
      setState("error");
      return;
    } finally {
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    }

    const result = await submitIntakeForm({
      ...form,
      hasStorefront: storefrontChoice === "visit",
      honeypot,
      turnstileToken,
    });

    if (result.success) {
      trackEvent("generate_lead", {
        form_name: "get_started",
        industry: form.industry,
      });
      router.push("/get-started/confirmation");
    } else {
      setErrorMsg(result.error);
      setState("error");
    }
  }

  const isLoading = state === "submitting";

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={handleTurnstileLoad}
      />

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="company_site">Company Website</label>
          <input
            id="company_site"
            name="company_site"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* The Basics */}
        <FormSection title="The Basics">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Business Name"
              required
              type="text"
              placeholder="Humble Home Solutions LLC"
              value={form.businessName}
              onChange={(v) => update("businessName", v)}
              disabled={isLoading}
            />
            <FormField
              label="Contact Name"
              required
              type="text"
              placeholder="Jane Smith"
              value={form.contactName}
              onChange={(v) => update("contactName", v)}
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Email"
              required
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={(v) => update("email", v)}
              disabled={isLoading}
            />
            <FormField
              label="Phone"
              required
              type="tel"
              placeholder="(509) 555-0100"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              disabled={isLoading}
            />
          </div>
          <FormField
            label="Industry / Business Type"
            required
            type="text"
            placeholder="Plumbing, HVAC, electrical, home services..."
            value={form.industry}
            onChange={(v) => update("industry", v)}
            disabled={isLoading}
          />
        </FormSection>

        {/* Your Site */}
        <FormSection title="Your Site">
          <TextAreaField
            label="Services Offered"
            required
            rows={3}
            placeholder="List the specific services you want featured on your site..."
            value={form.services}
            onChange={(v) => update("services", v)}
            disabled={isLoading}
          />
          <FormField
            label="City / Service Area(s) Served"
            required
            type="text"
            placeholder="Kennewick, Richland, Pasco"
            value={form.serviceArea}
            onChange={(v) => update("serviceArea", v)}
            disabled={isLoading}
          />

          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-medium text-white/70">
              Location <span className="text-[#8b5cf6]">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <RadioOption
                name="storefront"
                label="Customers visit us"
                checked={storefrontChoice === "visit"}
                onChange={() => setStorefrontChoice("visit")}
                disabled={isLoading}
              />
              <RadioOption
                name="storefront"
                label="We go to them"
                checked={storefrontChoice === "service-area"}
                onChange={() => setStorefrontChoice("service-area")}
                disabled={isLoading}
              />
            </div>
            <AnimatePresence initial={false}>
              {storefrontChoice === "visit" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <FormField
                    label="Address"
                    required
                    type="text"
                    placeholder="123 Main St, Kennewick, WA 99336"
                    value={form.address}
                    onChange={(v) => update("address", v)}
                    disabled={isLoading}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <FormField
            label="Current Website URL"
            required
            type="text"
            placeholder="yourbusiness.com — or type 'none'"
            value={form.currentSiteUrl}
            onChange={(v) => update("currentSiteUrl", v)}
            disabled={isLoading}
          />
        </FormSection>

        {/* Optional extras */}
        <FormSection title="Extra Details" subtitle="Optional — speeds things up, but not required">
          <FormField
            label="Business Hours"
            type="text"
            placeholder="Mon–Fri 8am–5pm"
            value={form.hours}
            onChange={(v) => update("hours", v)}
            disabled={isLoading}
          />
          <TextAreaField
            label="What makes you different from competitors?"
            rows={2}
            placeholder="What should we lead with?"
            value={form.differentiator}
            onChange={(v) => update("differentiator", v)}
            disabled={isLoading}
          />
          <TextAreaField
            label="Tell us about you and your business"
            rows={4}
            placeholder="Give us the story, the vibe, what customers should know about who you are..."
            value={form.businessStory}
            onChange={(v) => update("businessStory", v)}
            disabled={isLoading}
          />
          <FormField
            label="Social Media Links"
            type="text"
            placeholder="Facebook, Instagram, etc."
            value={form.socialLinks}
            onChange={(v) => update("socialLinks", v)}
            disabled={isLoading}
          />
          <FormField
            label="Do you have existing photos/logo we can use?"
            type="text"
            placeholder="e.g. 'Yes, I'll email them' or 'No, please source visuals'"
            value={form.visualAssetsNote}
            onChange={(v) => update("visualAssetsNote", v)}
            disabled={isLoading}
          />
          <TextAreaField
            label="Anything else you want on the site?"
            rows={3}
            placeholder="Anything else we should know..."
            value={form.notes}
            onChange={(v) => update("notes", v)}
            disabled={isLoading}
          />
        </FormSection>

        {/* Turnstile mounts here — invisible unless a challenge is required */}
        <div ref={turnstileContainerRef} className="flex justify-center" />

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
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Get Started
            </>
          )}
        </button>

        <p className="text-center text-xs text-white/30">
          Takes under two minutes. No payment info, no call required.
        </p>
      </form>
    </>
  );
}

function FormSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="border-b border-white/[0.08] pb-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8b5cf6]">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs text-white/35">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
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

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  rows = 3,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/70">
        {label}
        {required && <span className="text-[#8b5cf6] ml-1">*</span>}
      </label>
      <textarea
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1]/50 transition-colors resize-none disabled:opacity-50"
      />
    </div>
  );
}

function RadioOption({
  name,
  label,
  checked,
  onChange,
  disabled,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
}) {
  return (
    <label
      className={`flex flex-1 items-center gap-2.5 rounded-lg border px-4 py-3 text-sm cursor-pointer transition-colors ${
        checked
          ? "border-[#6366f1]/50 bg-[#6366f1]/10 text-white"
          : "border-white/[0.1] bg-white/[0.04] text-white/70 hover:border-white/20"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="accent-[#6366f1]"
      />
      {label}
    </label>
  );
}
