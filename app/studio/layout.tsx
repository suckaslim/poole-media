export const metadata = {
  title: "Studio — Poole Media",
  robots: { index: false, follow: false },
};

// Deliberately minimal — no Tailwind globals.css and no site Navbar/Footer.
// Sanity Studio ships its own full-screen UI and styling; the marketing
// site's root layout lives at app/(site)/layout.tsx instead.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
