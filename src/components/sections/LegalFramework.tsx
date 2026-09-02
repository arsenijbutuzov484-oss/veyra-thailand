import { legalFaq } from "@/content/legal-faq";

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: legalFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer.join(" "),
    },
  })),
};

export function LegalFramework() {
  return (
    <section className="sec" id="legal" style={{ background: "#EAE4D8" }} data-screen-label="04 Юридическая рамка">
      <div className="wrap">
        <div className="eyebrow fade">
          <span className="num">04</span>
          <span className="lbl">Юридическая и налоговая рамка</span>
          <span className="line" />
        </div>
        <h2 className="h2 fade">Гарантия доходности — это договор, а не факт. Мы читаем договор</h2>
        <p className="lede fade">
          Восемь вопросов, которые в Таиланде решают исход сделки. Без запугивания: правила здесь
          рабочие, их просто нужно знать до перевода денег.
        </p>
        <div className="acc fade">
          {legalFaq.map((item, i) => (
            <details key={item.n} open={i === 0}>
              <summary>
                <i>{item.n}</i>
                <span>{item.question}</span>
                <em>+</em>
              </summary>
              <div className="ans">
                {item.answer.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
        <p className="closing fade">Мы читаем документы до подписания, а не после.</p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
    </section>
  );
}
