import { createClient } from "next-sanity";

// Falls back to a placeholder project/dataset when the env vars aren't
// configured (e.g. a deploy environment that hasn't been set up yet), so
// client construction never throws at import time. Any real request made
// with a placeholder project will simply fail at fetch time, which every
// caller already handles via `.catch(() => null)` — the page renders its
// hardcoded fallback content instead of crashing the build.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
