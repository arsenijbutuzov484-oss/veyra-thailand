import { legalFaq } from "@/content/legal-faq";

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: legalFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function LegalFramework() {
  return (
    <section className="sec" id="legal" data-screen-label="04 Юридическая рамка">
      <div className="wrap">
        <p className="rubric">
          <i>04</i>Юридическая рамка
        </p>
        <h2 className="h2">Гарантия доходности — это договор, а не факт. Мы читаем договор</h2>
        <div className="legal-wrap">
          <div className="acc">
            {legalFaq.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <em>+</em>
                </summary>
                <div className="ans">{item.answer}</div>
              </details>
            ))}
          </div>
          <p className="closing">Мы читаем документы до подписания, а не после.</p>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
    </section>
  );
}
