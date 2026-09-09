import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { CookieBanner } from "@/components/CookieBanner";
import { ObjectInterestProvider } from "@/components/ObjectInterest";
import { LeadForm } from "@/components/sections/LeadForm";
import { getObjectBySlug, objects } from "@/content/objects";
import { exchange, priceFromBaht } from "@/lib/currency";
import { absoluteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return objects.map((object) => ({ slug: object.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const object = getObjectBySlug(slug);
  if (!object) return {};

  return {
    title: `${object.title} — ${object.location}`,
    description: object.tagline,
    alternates: { canonical: absoluteUrl(`/thailand/${object.slug}`) },
    openGraph: {
      type: "website",
      title: `${object.title} — ${object.location}`,
      description: object.tagline,
      url: absoluteUrl(`/thailand/${object.slug}`),
    },
  };
}

export default async function ObjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const object = getObjectBySlug(slug);
  if (!object) notFound();

  const price = priceFromBaht(object.priceFromThb);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: object.title,
      description: object.tagline,
      offers: {
        "@type": "Offer",
        url: absoluteUrl(`/thailand/${object.slug}`),
        availability: "https://schema.org/InStock",
        price: price.thb,
        priceCurrency: "THB",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Таиланд", item: absoluteUrl("/thailand") },
        {
          "@type": "ListItem",
          position: 2,
          name: "Объекты",
          item: absoluteUrl("/thailand#objects"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: object.title,
          item: absoluteUrl(`/thailand/${object.slug}`),
        },
      ],
    },
  ];

  return (
    <ObjectInterestProvider>
      <Header solid />
      <section className="obj-hero">
        <div className="wrap">
          <p className="card__loc">{object.location}</p>
          <h1>{object.title}</h1>
          <p className="obj-hero__tagline">{object.description ?? object.tagline}</p>
          <div className="obj-params">
            <div>
              <span>Цена от</span>
              <b>{price.main}</b>
            </div>
            {object.highlights.map((spec) => (
              <div key={spec.label}>
                <span>{spec.label}</span>
                <b>{spec.value}</b>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: 14, color: "rgba(242,237,228,.5)" }}>
            {price.note} · курс на {exchange.updated}
          </p>
          <div className="hero__cta" style={{ marginTop: 30, justifyContent: "flex-start" }}>
            <a className="btn" href="#form">
              Разобрать сценарий
            </a>
          </div>
        </div>
      </section>

      <div id="page">
        <section className="sec" id="gallery">
          <div className="wrap">
            <p className="rubric">
              <i>01</i>Галерея
            </p>
            <div className="card__ph" style={{ aspectRatio: "16/9", borderRadius: 8 }}>
              <Gallery images={object.gallery} title={object.title} />
            </div>

            {object.locationText ? (
              <div className="obj-block">
                <p className="rubric">
                  <i>02</i>Локация
                </p>
                <h2 className="h2">Где именно стоит дом</h2>
                <p className="lede">{object.locationText}</p>
              </div>
            ) : null}

            {object.formats?.length ? (
              <div className="obj-block">
                <p className="rubric">
                  <i>03</i>Планировки и форматы
                </p>
                <ul className="formats">
                  {object.formats.map((format) => (
                    <li key={format.name}>
                      <b>{format.name}</b>
                      <span>{format.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {object.finance?.length ? (
              <div className="obj-block">
                <p className="rubric">
                  <i>04</i>Финансовая модель
                </p>
                <ul className="finance">
                  {object.finance.map((line) => (
                    <li key={line.label}>
                      <span>{line.label}</span>
                      <b>{line.value}</b>
                    </li>
                  ))}
                </ul>
                {object.financeNote ? (
                  <p className="note" style={{ marginTop: 18 }}>
                    {object.financeNote}
                  </p>
                ) : null}
              </div>
            ) : null}

            {object.legalText ? (
              <div className="obj-block">
                <p className="rubric">
                  <i>05</i>Юридическая модель объекта
                </p>
                <p className="lede">{object.legalText}</p>
              </div>
            ) : null}

            {object.timeline?.length ? (
              <div className="obj-block">
                <p className="rubric">
                  <i>06</i>Таймлайн платежей
                </p>
                <ul className="timeline">
                  {object.timeline.map((stage) => (
                    <li key={stage.stage}>
                      <b>{stage.stage}</b>
                      <span>{stage.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {object.risks?.length ? (
              <div className="obj-block">
                <p className="rubric">
                  <i>07</i>Риски честным текстом
                </p>
                <ul className="risks">
                  {object.risks.map((risk) => (
                    <li key={risk}>{risk}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <LeadForm />
        <Footer />
      </div>
      <CookieBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </ObjectInterestProvider>
  );
}
