import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
  type PortableTextBlock as PortableTextReactBlock,
} from "@portabletext/react";
import { Info, TriangleAlert, Lightbulb } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { slugify } from "@/lib/utils";
import type { PortableTextBlock, SanityImage } from "@/types";

function headingId(block: PortableTextReactBlock) {
  const text = (block.children ?? [])
    .map((child) => ("text" in child ? String(child.text) : ""))
    .join("");
  return slugify(text);
}

function youtubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const CALLOUT_STYLES: Record<
  string,
  { className: string; Icon: typeof Info }
> = {
  info: {
    className: "border-blue-500/25 bg-blue-500/10 text-blue-100",
    Icon: Info,
  },
  warning: {
    className: "border-amber-500/25 bg-amber-500/10 text-amber-100",
    Icon: TriangleAlert,
  },
  tip: {
    className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-100",
    Icon: Lightbulb,
  },
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-white/70 leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={headingId(value)}
        className="font-display text-2xl md:text-3xl font-semibold text-white mt-12 mb-4 scroll-mt-28"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={headingId(value)}
        className="font-display text-xl md:text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-28"
      >
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4
        id={headingId(value)}
        className="text-lg font-semibold text-white mt-8 mb-3 scroll-mt-28"
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#6366f1]/50 pl-5 my-6 text-white/60 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 mb-5 space-y-2 text-white/70">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 mb-5 space-y-2 text-white/70">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white/90">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.85em] text-[#a5b4fc]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value?.href as string | undefined) ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[#a5b4fc] underline underline-offset-2 hover:text-white transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    codeBlock: ({ value }) => (
      <pre className="mb-6 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/40 p-4">
        <code className="font-mono text-sm text-white/80">{value.code}</code>
      </pre>
    ),
    callout: ({ value }) => {
      const style = CALLOUT_STYLES[value.type as string] ?? CALLOUT_STYLES.info;
      const { Icon } = style;
      return (
        <div
          className={`mb-6 flex gap-3 rounded-xl border p-4 ${style.className}`}
        >
          <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">{value.content}</p>
        </div>
      );
    },
    imageBlock: ({ value }) => {
      const image = value.image as SanityImage | undefined;
      if (!image) return null;
      const src = urlFor(image).width(1400).url();
      const alt = (value.alt as string | undefined) ?? "";
      const caption = value.caption as string | undefined;
      return (
        <figure className="mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full rounded-xl border border-white/[0.08]"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-white/40">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
    youtubeEmbed: ({ value }) => {
      const id = youtubeId(value.url as string);
      if (!id) return null;
      return (
        <div className="mb-6 aspect-video overflow-hidden rounded-xl border border-white/[0.08]">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      );
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <PortableTextReact
      value={value as unknown as PortableTextReactBlock[]}
      components={components}
    />
  );
}

export { headingId };
