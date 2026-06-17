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
    default: "Poole Media — AI-Driven Digital Marketing | Tri-Cities, WA",
    template: "%s | Poole Media",
  },
  description:
    "Poole Media helps small and mid-sized businesses in Tri-Cities, WA get found in AI search, rank on Google, and grow online with AI-driven digital marketing.",
  keywords: [
    "digital marketing",
    "AI SEO",
    "website development",
    "email marketing",
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
  },
  twitter: {
    card: "summary_large_image",
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
