# Poole Media — CLAUDE.md

## Project Overview
Building the official website for Poole Media, an AI-driven digital marketing agency based in the Tri-Cities, WA area. The site must feel modern, alive, and premium — showcasing AI-powered services to small and mid-sized businesses.

## Tech Stack
- **Framework:** Next.js 15 with App Router and TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animations:** Framer Motion for component transitions + GSAP for scroll-triggered animations
- **Database/Auth:** Supabase (for contact form submissions and future CMS needs)
- **Deployment:** Vercel
- **Email:** Resend for contact form transactional email

## Design System

### Aesthetic
- **Dark-first design:** Deep dark backgrounds (#0a0a0a or #080810) with light text
- **Feels "alive":** Subtle animated gradients, glowing accents, particle effects in hero
- **AI/Tech forward:** Think linear.app, vercel.com, cursor.com — clean, sharp, purposeful
- **Bold typography:** Large expressive headlines, tight tracking on display text
- **Accent color:** Electric blue/violet gradient (#6366f1 → #8b5cf6) for CTAs and highlights

### Typography
- **Display/Headlines:** Cal Sans Display — large, bold, high impact
- **Body:** Inter — clean and readable
- **Mono accents:** JetBrains Mono for any technical/data elements

### Motion Principles
- Scroll-triggered fade-ins and slide-ups on all content sections (GSAP ScrollTrigger)
- Subtle parallax on hero background elements
- Smooth page transitions (Framer Motion)
- Hover micro-interactions on all cards and buttons
- Number counters that animate when scrolled into view (results/stats section)
- NO jarring or excessive animation — motion should feel purposeful, not flashy

## Site Architecture

### Pages
1. `/` — Homepage
2. `/services` — Services detail page
3. `/case-studies` — Case studies index
4. `/case-studies/[slug]` — Individual case study (dynamic route)
5. `/about` — About Poole Media
6. `/faq` — FAQ with accordion
7. `/contact` — Contact page with form

### Homepage Sections (in order)
1. **Hero** — Full-viewport, animated gradient background, headline, subheadline, two CTAs (Get Free Audit / See Our Work), subtle floating particle or grid animation
2. **Social Proof Bar** — Logos or stats strip ("Trusted by local businesses across WA")
3. **Services Overview** — 3 service cards (Website Dev, AI-Ready SEO, Email Marketing) with hover effects and icons
4. **Why Poole Media** — Differentiator section with animated stat counters (e.g., "3x faster builds", "2s average load time", "AI-powered results")
5. **How It Works** — 4-step process with scroll-triggered reveal
6. **Case Studies Preview** — 2–3 featured project cards linking to full case studies
7. **Testimonials** — Client quotes carousel or cards
8. **FAQ Preview** — 3–4 top questions with accordion, linking to full FAQ page
9. **CTA Banner** — Bold full-width section: "Ready to get found in AI search?" with contact CTA
10. **Footer** — Logo, nav links, social links, location (Tri-Cities, WA), copyright

## Key Components to Build
- `<AnimatedHero />` — tsParticles canvas particle field (neural network style, electric blue/violet) + Framer Motion staggered text reveal
- `<ServiceCard />` — Dark card with icon, hover glow effect, animated border
- `<StatCounter />` — Number that counts up when scrolled into view
- `<CaseStudyCard />` — Project preview with image, client name, result highlight
- `<ProcessStep />` — Numbered step with scroll-triggered line connector animation
- `<TestimonialCarousel />` — Auto-playing with manual override
- `<ContactForm />` — Validated form, submits to Supabase + sends email via Resend
- `<Navbar />` — Sticky, transparent → solid on scroll, mobile hamburger menu
- `<Footer />` — Clean, dark, minimal

## Content (Real Data from Existing Site)

### Services
1. **Website Development** — Fast, modern, mobile-first sites that load in under 2 seconds and turn visitors into paying customers. No bloated templates — clean design focused on results.
2. **AI-Ready SEO** — Optimize for the new AI search world (ChatGPT, Perplexity, Grok) while crushing traditional Google rankings. Perfect for local businesses trying to stand out.
3. **Email Marketing** — Automated email sequences that nurture leads, win back old customers, and drive consistent bookings or sales on autopilot.

### Case Studies (Supabase — `case_studies` table)
Schema:
- id, slug, client_name, tagline, description, results, featured (boolean), created_at

Seed data:
1. **Humble Home Solutions LLC** (slug: `humble-home-solutions`) — Built a fast, mobile-friendly website for a handyman based in Spokane, WA. Featured: true.
2. **Riverstone Dental** (slug: `riverstone-dental`) — Refreshed their website and added online appointment request functionality. Featured: true.

### Case Studies (Supabase - `case_study_images` bucket)
- will manually add these images and name them to match the slug of the case study from the case_studies table.

### Process Steps
1. Discovery & Free Audit — 15–30 min call, review current digital presence
2. Strategy & Custom Plan — Tailored roadmap for your goals
3. Build & Launch — Execute with precision and speed
4. Optimize & Scale — Ongoing tracking and improvement

### FAQ Content
What services do you offer?
- We provide digital marketing including AI-Ready SEO, website development, and email campaigns.

Do you have service packages?
- Yes, we offer tailored packages to fit different budgets and goals.

What company sizes do you serve?
- We work with startups, small businesses, and mid-sized companies across various industries.

How long are contracts?
- We don't have contracts! If you aren't happy with our services you are free to cancel at anytime.

Can I customize my package?
- Absolutely. While AI-Readiness is at the heart of our services, we can customize a package for your needs.

How do I get started with your services?
- Schedule a consultation with us and we can discuss your project needs and address any questions you may have.

### Stats/Social Proof (use these as animated counters)
- Sub-2 second load times
- AI search optimization (ChatGPT, Perplexity, Grok, Google)
- Serving local businesses in Tri-Cities WA and beyond

## Code Standards
- **TypeScript strictly typed** — no `any` types
- **Server components by default** — only use `"use client"` when necessary (animations, interactivity)
- **Mobile-first responsive** — all breakpoints: mobile, tablet, desktop
- **SEO optimized from day one** — proper metadata, OG tags, structured data (JSON-LD) on every page
- **Performance budget:** Lighthouse score 90+ on all pages
- **Accessibility:** WCAG 2.1 AA minimum — proper aria labels, keyboard navigation, color contrast
- **Error boundaries** on all async components
- **loading.tsx** files alongside all async pages

## File Structure
```
poole-media/
├── app/
│   ├── layout.tsx          # Root layout with navbar + footer
│   ├── page.tsx            # Homepage
│   ├── services/page.tsx
│   ├── case-studies/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                 # shadcn components
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Homepage sections
│   └── shared/             # Reusable components
├── lib/
│   ├── supabase.ts
│   └── utils.ts
├── public/
│   └── images/
└── CLAUDE.md
```

## Environment Variables Needed
```
NEXT_PUBLIC_SUPABASE_URL=https://ftgfyrkjvddzziyddpjb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Z2Z5cmtqdmRkenppeWRkcGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzgzMzUsImV4cCI6MjA5NzIxNDMzNX0.INdsW2LNGdnLBlG5opkC8Zzr1K1-OIZE439nA2Z04cQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Z2Z5cmtqdmRkenppeWRkcGpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTYzODMzNSwiZXhwIjoyMDk3MjE0MzM1fQ.ZFJ8oSkhfT2k3K-nNNqNV0FF3gFFxKHQsPzVP3ntcy0
RESEND_API_KEY=re_BeNThzr7_Hag8gvgVAbF2NQhQGLTnKjow
RESEND_TO_EMAIL=contact@poole.media
NEXT_PUBLIC_SITE_URL=https://poole.media
```

## Do Not
- Use `pages/` router — App Router only
- Use CSS modules — Tailwind only
- Add unnecessary npm packages — keep bundle lean
- Use `any` TypeScript type
- Hardcode colors outside the design system
- Add placeholder/lorem ipsum content — use the real content provided above