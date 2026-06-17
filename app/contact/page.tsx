import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Contact — Book Your Free Digital Marketing Audit",
  description:
    "Book a free 30-minute digital marketing audit. We'll review your online presence and give you a clear action plan — no commitment required.",
  openGraph: {
    title: "Contact Poole Media — Book Your Free Audit",
    description:
      "Get a free 30-minute audit. We'll identify your biggest growth opportunities and give you a clear action plan.",
    type: "website",
    url: "https://poole.media/contact",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Poole Media",
  url: "https://poole.media",
  email: "contact@poole.media",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kennewick",
    addressRegion: "WA",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@poole.media",
    availableLanguage: "English",
  },
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@poole.media",
    href: "mailto:contact@poole.media",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tri-Cities, WA — Serving Nationwide",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 1 business day",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={contactPageSchema} />
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Contact
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-white mb-5">
            Let&apos;s talk about{" "}
            <span className="text-gradient">your business</span>
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-xl">
            Book a free 30-minute audit. We&apos;ll review your digital
            presence, find your biggest growth opportunities, and give you a
            clear action plan — no commitment required.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Info */}
            <div>
              <h2 className="font-display text-3xl font-semibold text-white mb-6">
                Get in touch
              </h2>
              <p className="text-white/55 leading-relaxed mb-10">
                Fill out the form and we&apos;ll get back to you within one
                business day. Or if you prefer, reach us directly by email.
              </p>

              <div className="space-y-6">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20">
                        <Icon className="h-4 w-4 text-[#6366f1]" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-white hover:text-[#8b5cf6] transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-white">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* What to expect */}
              <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                  What to Expect
                </p>
                <ol className="space-y-3">
                  {[
                    "We review your message and current digital presence",
                    "We schedule a 30-min discovery call at your convenience",
                    "You get a custom audit and action plan — free",
                    "You decide if you want to move forward. No pressure.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6366f1]/15 text-[10px] font-bold text-[#6366f1] mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/55">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 md:p-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
