import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Cal Sans is loaded via @font-face in globals.css and referenced
// through the --font-cal CSS variable defined in :root

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://poole.media"
  ),
  title: {
    default: "Poole Media — Agentic SEO and Website Development | Tri-Cities, WA",
    template: "%s | Poole Media",
  },
  description:
    "We build custom websites and run continuous agentic SEO — so your business shows up on Google, ChatGPT, Perplexity, and Grok. Serving Tri-Cities, WA and beyond.",
  keywords: [
    "digital marketing",
    "agentic SEO",
    "website development",
    "AI search optimization",
    "GEO",
    "AEO",
    "content marketing",
    "site maintenance",
    "Tri-Cities WA",
    "Kennewick",
    "Richland",
    "Pasco",
    "ChatGPT SEO",
    "Perplexity SEO",
    "local SEO",
  ],
  authors: [{ name: "Poole Media" }],
  creator: "Poole Media",
  openGraph: {
    siteName: "Poole Media",
    locale: "en_US",
    type: "website",
    url: "https://poole.media",
    images: [
      {
        url: "/images/poole_media_logo.png",
        width: 1200,
        height: 630,
        alt: "Poole Media — AI-Driven Digital Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "facebook-domain-verification": "x323twzhobg6kcabls7z7kjgzc4iqn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
