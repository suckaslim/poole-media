import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const SERVICE_LINKS = [
  { label: "Website Design and Build", href: "/services#website" },
  { label: "Agentic SEO", href: "/services#agentic-seo" },
  { label: "AI-Assisted Content", href: "/services#ai-content" },
  { label: "Free SEO Audit", href: "/audit" },
  { label: "Site Maintenance", href: "/services#site-maintenance" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Inline SVGs — lucide-react v1 dropped brand icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591378770735", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/poole.media/", Icon: InstagramIcon },
];

export function Footer({
  description,
  copyright,
}: {
  description: string;
  copyright: string;
}) {
  return (
    <footer className="bg-[#060610] border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Poole Media home">
              <Image
                src="/images/poole_media_logo_transparent.png"
                alt="Poole Media"
                width={0}
                height={0}
                sizes="200px"
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-white/45 leading-relaxed max-w-[22ch]">
              {description}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-white/35">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Tri-Cities, WA</span>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-5">
              Services
            </p>
            <ul className="space-y-3.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white/90 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-5">
              Company
            </p>
            <ul className="space-y-3.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white/90 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-5">
              Follow Us
            </p>
            <ul className="space-y-3.5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Poole Media on ${label}`}
                    className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white/90 transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 order-2 sm:order-1">
            {copyright}
          </p>
          <p className="text-xs text-white/30 order-1 sm:order-2">
            Tri-Cities, WA · Serving businesses nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}
