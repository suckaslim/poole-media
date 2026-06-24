import { Star } from "lucide-react";

// [TESTIMONIAL PLACEHOLDERS] — Replace with real client quotes before launch
const TESTIMONIALS = [
  {
    quote:
      "Working with Poole Media has been a game-changer for our business. They are truly masters at their craft, and their work has helped us reach new heights. We couldn't be happier with the results!",
    name: "Austin Kautzman",
    role: "Owner/Operator",
    company: "Humble Home Solutions LLC",
  },
  {
    quote:
      "The team at Poole Media is exceptional. Their expertise and dedication to our project were evident from the start. They delivered beyond our expectations, and we are thrilled with the outcome.",
    name: "Dr. Craig Christian",
    role: "Founder & Practicing Dentist",
    company: "Riverstone Dental",
  }
];

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Don&apos;t take our{" "}
            <span className="text-gradient">word for it</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.08] p-7"
            >
              <StarRating />
              <blockquote className="mt-4 flex-1">
                <p className="text-sm text-white/60 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
