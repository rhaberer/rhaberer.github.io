import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Telemetry } from "@/components/telemetry";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ronny Haberer — Product, 3D & interactive design",
    template: "%s — Ronny Haberer",
  },
  description: site.description,
  openGraph: {
    title: "Ronny Haberer — Product, 3D & interactive design",
    description: site.description,
    type: "website",
    images: [
      {
        url: "/media/social.jpg",
        width: 1200,
        height: 630,
        alt: "Ronny Haberer — Product, computational and interactive design",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <footer className="footer">
          <span>© {new Date().getFullYear()} Ronny Haberer</span>
          <span>Objects / Systems / Experiments</span>
          <a href="#top">Back to top ↑</a>
        </footer>
        <Telemetry />
      </body>
    </html>
  );
}
