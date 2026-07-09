// On-demand revalidation webhook for Sanity content changes.
//
// Setup (after deploying):
//   1. Add SANITY_REVALIDATION_SECRET to your environment (generate with
//      `openssl rand -hex 32`) — both locally in .env.local and in Vercel.
//   2. In the Sanity dashboard (sanity.io/manage), go to your project ->
//      API -> Webhooks -> Create webhook.
//   3. URL: https://poole.media/api/revalidate?secret=YOUR_SECRET
//   4. Dataset: production. Trigger on: Create, Update, Delete.
//   5. Filter: leave blank to revalidate on any document change, or scope
//      it (e.g. `_type in ["homepage", "servicesPage", "comingSoonService",
//      "caseStudy", "navigation"]`) to avoid firing on unrelated documents.
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/case-studies");
  revalidatePath("/case-studies/[slug]", "page");

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
