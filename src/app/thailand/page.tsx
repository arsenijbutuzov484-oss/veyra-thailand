import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { Scenarios } from "@/components/sections/Scenarios";
import { Objects } from "@/components/sections/Objects";
import { LegalFramework } from "@/components/sections/LegalFramework";
import { About } from "@/components/sections/About";
import { LeadForm } from "@/components/sections/LeadForm";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Недвижимость в Таиланде — инвестиции, аренда, зимовка",
  description:
    "Разбор покупки недвижимости в Таиланде: локация, freehold и leasehold, квота 49%, расходы на владение, сценарии аренды и зимовки. Пхукет, Самуи, Паттайя, Бангкок. VEYRA ESTATE — 12 лет на рынке недвижимости.",
  alternates: { canonical: absoluteUrl("/thailand") },
  openGraph: {
    type: "website",
    title: "Недвижимость в Таиланде как актив — VEYRA ESTATE",
    description: "Локация, форма владения, расходы и сценарий использования — до внесения первого транша.",
    url: absoluteUrl("/thailand"),
  },
  twitter: { card: "summary_large_image" },
};

export default function ThailandPage() {
  return (
    <>
      <Header />
      <Hero />
      <div id="page">
        <Approach />
        <Scenarios />
        <Objects />
        <LegalFramework />
        <About />
        <LeadForm />
        <Footer />
      </div>
    </>
  );
}
