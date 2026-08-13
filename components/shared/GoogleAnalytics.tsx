"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// GA4's Enhanced Measurement can auto-fire page_view on History API changes
// independent of anything gtag.js is told client-side — even send_page_view
// only suppresses the *initial* auto pageview, not that listener. Rather
// than depend on that GA4 Admin setting (Data Streams > Enhanced measurement
// > Page changes based on browser history events) staying off, we disable
// the automatic pageview entirely and send every page_view — including the
// first — as an explicit event, so this component is the single source of
// truth regardless of what's configured on the GA4 property.
function GtagPageview({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.gtag?.("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaId,
    });
  }, [gaId, pathname, searchParams]);

  return null;
}

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GtagPageview gaId={gaId} />
      </Suspense>
    </>
  );
}
