import { Star } from "lucide-react";

const TESTIMONIAL = {
  quote:
    "Working with Poole Media has been a game-changer for our business. They are truly masters at their craft, and their work has helped us reach new heights. We couldn't be happier with the results!",
  name: "Austin Kautzman",
  role: "Owner/Operator",
  company: "Humble Home Solutions LLC",
};

function StarRating() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#6366f1] text-[#6366f1]" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Don&apos;t take our{" "}
            <span className="text-gradient">word for it</span>
          </h2>
        </div>

        {/* Single centered testimonial */}
        <figure className="flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.08] p-8 md:p-10">
          <StarRating />
          <blockquote className="mt-5 flex-1">
            <p className="text-base md:text-lg text-white/60 leading-relaxed italic">
              &ldquo;{TESTIMONIAL.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-white shrink-0">
              {TESTIMONIAL.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{TESTIMONIAL.name}</p>
              <p className="text-xs text-white/40">
                {TESTIMONIAL.role} · {TESTIMONIAL.company}
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
