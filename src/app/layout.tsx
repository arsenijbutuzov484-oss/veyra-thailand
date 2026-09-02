import type { Metadata } from "next";
import { Spectral, Manrope } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { SiteScripts } from "@/components/SiteScripts";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.direction}`,
    template: `%s | ${siteConfig.name}`,
  },
};

const realEstateAgentJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.name,
  url: absoluteUrl("/thailand"),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  slogan: "Обрести истинное",
  areaServed: [
    { "@type": "Place", name: "Пхукет" },
    { "@type": "Place", name: "Самуи" },
    { "@type": "Place", name: "Паттайя" },
    { "@type": "Place", name: "Бангкок" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${spectral.variable} ${manrope.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd) }}
        />
        <SiteScripts />
        <Analytics />
      </body>
    </html>
  );
}
