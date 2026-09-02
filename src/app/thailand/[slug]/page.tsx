import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { LeadForm } from "@/components/sections/LeadForm";
import { getObjectBySlug, objects } from "@/content/objects";
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
    title: object.title,
    description: object.tagline,
    alternates: { canonical: absoluteUrl(`/thailand/${object.slug}`) },
    openGraph: {
      type: "website",
      title: object.title,
      description: object.tagline,
      url: absoluteUrl(`/thailand/${object.slug}`),
    },
  };
}

export default async function ObjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const object = getObjectBySlug(slug);
  if (!object) notFound();

  const similar = objects.filter((o) => o.slug !== object.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: object.title,
      description: object.tagline,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: object.priceFrom.replace(/[^0-9]/g, ""),
        url: absoluteUrl(`/thailand/${object.slug}`),
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Таиланд", item: absoluteUrl("/thailand") },
        { "@type": "ListItem", position: 2, name: "Объекты", item: absoluteUrl("/thailand#objects") },
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
    <>
      <Header />
      <section className="obj-hero">
        <div className="wrap">
          <p className="card__loc">{object.location}</p>
          <h1>{object.title}</h1>
          <p className="obj-hero__tagline">{object.description}</p>
          <div className="obj-params">
            {object.highlights.map((h) => (
              <div key={h.label}>
                <span>{h.label}</span>
                <b>{h.value}</b>
              </div>
            ))}
          </div>
          <div className="hero__cta" style={{ marginTop: 30 }}>
            <a className="btn" href="#form">
              Разобрать сценарий
            </a>
            <a className="btn btn--ghost" href={`#gallery`}>
              Смотреть галерею
            </a>
          </div>
        </div>
      </section>

      <div id="page">
        <section className="sec" id="gallery">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">01</span>
              <span className="lbl">Галерея</span>
              <span className="line" />
            </div>
            <div className="obj-gallery">
              {[object.heroImage, ...object.gallery].map((img, i) => (
                <div className="obj-gallery__item" key={i}>
                  <PlaceholderImage placeholder={img.placeholder} alt={`${object.title} — фото ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ borderTop: "none" }}>
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">02</span>
              <span className="lbl">Локация</span>
              <span className="line" />
            </div>
            <h2 className="h2">Где именно стоит дом</h2>
            <p className="lede" style={{ maxWidth: "70ch" }}>
              {object.locationText}
            </p>

            <div className="obj-block">
              <div className="eyebrow">
                <span className="num">03</span>
                <span className="lbl">Планировки и форматы</span>
                <span className="line" />
              </div>
              <ul className="formats">
                {object.formats.map((f) => (
                  <li key={f.name}>
                    <b>{f.name}</b>
                    <span>{f.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="obj-block">
              <div className="eyebrow">
                <span className="num">04</span>
                <span className="lbl">Финансовая модель</span>
                <span className="line" />
              </div>
              <ul className="finance">
                {object.finance.map((line) => (
                  <li key={line.label}>
                    <span>{line.label}</span>
                    <b>{line.value}</b>
                  </li>
                ))}
              </ul>
              <p className="small" style={{ marginTop: 18, maxWidth: "70ch" }}>
                {object.financeNote}
              </p>
            </div>

            <div className="obj-block">
              <div className="eyebrow">
                <span className="num">05</span>
                <span className="lbl">Юридическая модель объекта</span>
                <span className="line" />
              </div>
              <p className="lede" style={{ maxWidth: "70ch" }}>
                {object.legalText}
              </p>
            </div>

            <div className="obj-block">
              <div className="eyebrow">
                <span className="num">06</span>
                <span className="lbl">Таймлайн платежей</span>
                <span className="line" />
              </div>
              <ul className="timeline">
                {object.timeline.map((stage) => (
                  <li key={stage.stage}>
                    <b>{stage.stage}</b>
                    <span>{stage.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="obj-block">
              <div className="eyebrow">
                <span className="num">07</span>
                <span className="lbl">Риски честным текстом</span>
                <span className="line" />
              </div>
              <ul className="risks">
                {object.risks.map((risk) => (
                  <li key={risk}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <LeadForm source={object.title} />

        <section className="sec" id="similar">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">08</span>
              <span className="lbl">Похожие объекты</span>
              <span className="line" />
            </div>
            <h2 className="h2">Другие точки входа для сравнения</h2>
            <div className="objs">
              {similar.map((o) => (
                <article className="card" key={o.slug}>
                  <div className="card__ph">
                    <span className="card__badge">{o.badge}</span>
                    <PlaceholderImage placeholder={o.cardImage.placeholder} alt={o.title} />
                  </div>
                  <div className="card__body">
                    <p className="card__loc">{o.location}</p>
                    <h3>{o.title}</h3>
                    <p>{o.tagline}</p>
                    <div className="card__foot">
                      <Link className="link" href={`/thailand/${o.slug}`}>
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
