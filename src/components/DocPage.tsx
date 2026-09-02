import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export interface DocSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export function DocPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: DocSection[];
}) {
  return (
    <>
      <Header solid />
      <div id="page">
        <section className="sec doc">
          <div className="wrap">
            <h1>{title}</h1>
            <p className="small doc__updated">Действует с {updated}</p>
            <div className="doc__body">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                  {section.items ? (
                    <ul>
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
