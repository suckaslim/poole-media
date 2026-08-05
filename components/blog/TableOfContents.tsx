"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn, slugify } from "@/lib/utils";
import type { PortableTextBlock } from "@/types";

type Heading = { id: string; text: string; level: 2 | 3 };

function extractHeadings(body: PortableTextBlock[]): Heading[] {
  return body
    .filter(
      (block) =>
        block._type === "block" && (block.style === "h2" || block.style === "h3")
    )
    .map((block) => {
      const children = (block.children as Array<{ text?: string }>) ?? [];
      const text = children.map((child) => child.text ?? "").join("");
      return {
        id: slugify(text),
        text,
        level: block.style === "h2" ? (2 as const) : (3 as const),
      };
    })
    .filter((heading) => heading.text.length > 0);
}

function TocList({ headings }: { headings: Heading[] }) {
  return (
    <ul className="space-y-2.5 text-sm">
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={heading.level === 3 ? "pl-4" : undefined}
        >
          <a
            href={`#${heading.id}`}
            className="text-white/50 hover:text-white transition-colors duration-200 leading-snug"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ body }: { body: PortableTextBlock[] }) {
  const [open, setOpen] = useState(false);
  const headings = extractHeadings(body);

  if (headings.length < 3) return null;

  return (
    <>
      {/* Desktop — sticky sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-24 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
          On this page
        </p>
        <TocList headings={headings} />
      </nav>

      {/* Mobile — collapsible accordion */}
      <div className="lg:hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] mb-8">
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-toc"
          className="flex w-full items-center justify-between gap-4 p-4"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
            On this page
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>
        {open && (
          <div id="mobile-toc" className="px-4 pb-4">
            <TocList headings={headings} />
          </div>
        )}
      </div>
    </>
  );
}
