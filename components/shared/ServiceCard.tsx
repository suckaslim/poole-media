import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

export function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="group relative rounded-2xl p-px overflow-hidden transition-all duration-300">
      {/* Gradient border — fades in on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card body */}
      <div className="relative rounded-[calc(1rem-1px)] bg-[#0a0a14] border border-white/[0.08] group-hover:border-transparent p-7 md:p-8 h-full flex flex-col transition-colors duration-300">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-[#8b5cf6] mb-6 group-hover:bg-[#6366f1]/10 group-hover:border-[#6366f1]/30 transition-all duration-300">
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed flex-1">{description}</p>

        {/* CTA */}
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b5cf6] hover:text-white transition-colors duration-200"
        >
          Learn more
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
