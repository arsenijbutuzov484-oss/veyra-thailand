import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { ObjectInterestProvider } from "@/components/ObjectInterest";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { Scenarios } from "@/components/sections/Scenarios";
import { Objects } from "@/components/sections/Objects";
import { CtaBand } from "@/components/sections/CtaBand";
import { LegalFramework } from "@/components/sections/LegalFramework";
import { About } from "@/components/sections/About";
import { LeadForm } from "@/components/sections/LeadForm";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Недвижимость в Таиланде — инвестиции и аренда на Пхукете и в Паттайе",
  description:
    "Купить недвижимость в Таиланде: инвестиции, аренда под управлением, зимовка и релокация. Пхукет и Паттайя: объекты от $80 000, разбор локации, freehold и leasehold, квоты 49 %, полных расходов на владение. VEYRA ESTATE.",
  alternates: { canonical: absoluteUrl("/thailand") },
  openGraph: {
    type: "website",
    siteName: "VEYRA ESTATE",
    locale: "ru_RU",
    title: "Недвижимость в Таиланде — Пхукет и Паттайя | VEYRA ESTATE",
    description:
      "Инвестиции, аренда, зимовка и релокация. Разбираем локацию, форму владения и полную стоимость владения — до первого транша.",
    url: absoluteUrl("/thailand"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Недвижимость в Таиланде — Пхукет и Паттайя | VEYRA ESTATE",
    description: "Инвестиции, аренда, зимовка и релокация. Объекты от $80 000.",
  },
};

export const viewport = {
  themeColor: "#14201E",
};

export default function ThailandPage() {
  return (
    <ObjectInterestProvider>
      <Header />
      <Hero />
      <div id="page">
        <Approach />
        <Scenarios />
        <Objects />
        <CtaBand />
        <LegalFramework />
        <About />
        <LeadForm />
        <Footer />
      </div>
      <CookieBanner />
    </ObjectInterestProvider>
  );
}
