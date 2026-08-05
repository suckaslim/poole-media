import { urlFor } from "@/sanity/lib/image";
import type { BlogAuthor } from "@/types";

// Inline SVGs — lucide-react v1 dropped brand icons
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function AuthorCard({ author }: { author: BlogAuthor | null }) {
  if (!author) return null;

  const photoUrl = author.photo
    ? urlFor(author.photo).width(96).height(96).url()
    : null;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 flex gap-5">
      <div className="shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-[#6366f1]/30 to-[#8b5cf6]/30 border border-white/[0.08]">
        {photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={author.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div>
        <p className="text-white font-semibold">{author.name}</p>
        {author.role && (
          <p className="text-xs text-white/40 uppercase tracking-wide mb-2">
            {author.role}
          </p>
        )}
        {author.bio && (
          <p className="text-sm text-white/55 leading-relaxed mb-3">{author.bio}</p>
        )}
        {(author.linkedin || author.twitter) && (
          <div className="flex items-center gap-3">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} on LinkedIn`}
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} on Twitter`}
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
