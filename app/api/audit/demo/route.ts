import { NextRequest, NextResponse } from "next/server";

// Proxies the free demo audit to the SEO agent's public endpoint so
// SEO_AGENT_DEMO_ENDPOINT never reaches the browser. The endpoint is open
// (no auth header) and handles its own rate limiting via Upstash — a 429
// from upstream is passed straight through, no additional limiting here.

const PRIVATE_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
const TIMEOUT_MS = 30_000;

export async function POST(request: NextRequest) {
  let body: { url?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  const url = body.url;
  if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  let hostname: string;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  if (PRIVATE_HOSTS.has(hostname)) {
    return NextResponse.json({ error: "private_url" }, { status: 400 });
  }

  const endpoint = process.env.SEO_AGENT_DEMO_ENDPOINT;
  if (!endpoint) {
    console.error("SEO_AGENT_DEMO_ENDPOINT is not configured");
    return NextResponse.json({ error: "endpoint_error" }, { status: 500 });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    // The upstream demo endpoint only accepts GET with a `domain` query
    // param (bare hostname) — confirmed by hand against the live endpoint.
    const upstreamUrl = new URL(endpoint);
    upstreamUrl.searchParams.set("domain", hostname);

    const upstream = await fetch(upstreamUrl, {
      method: "GET",
      signal: controller.signal,
    });

    if (upstream.status === 429) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    if (!upstream.ok) {
      return NextResponse.json({ error: "endpoint_error" }, { status: 502 });
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json({ error: "timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "network_error" }, { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }
}
