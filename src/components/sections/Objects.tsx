import { objects } from "@/content/objects";
import { Gallery } from "@/components/Gallery";
import { ObjectCtaButton } from "@/components/ObjectInterest";

export function Objects() {
  return (
    <section className="sec" id="objects" data-screen-label="03 Объекты">
      <div className="wrap">
        <p className="rubric">
          <i>03</i>Объекты
        </p>
        <h2 className="h2">Пять точек входа, из которых видно логику выбора</h2>
        <div className="objs">
          {objects.map((object) => (
            <article className="card" key={object.slug}>
              <div className="card__ph">
                <span className="card__badge">{object.badge}</span>
                <Gallery images={object.gallery} title={object.title} />
              </div>
              <div className="card__body">
                <p className="card__loc">{object.location}</p>
                <h3>{object.title}</h3>
                <p>{object.tagline}</p>
                <ul className="spex">
                  {object.highlights.map((spec) => (
                    <li key={spec.label}>
                      <span>{spec.label}</span>
                      {spec.note ? (
                        <b className="price">
                          {spec.value}
                          <em>{spec.note}</em>
                        </b>
                      ) : (
                        <b>{spec.value}</b>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="card__foot">
                  <ObjectCtaButton
                    object={`${object.title} — ${object.location}`}
                    label={object.ctaLabel}
                  />
                </div>
              </div>
            </article>
          ))}
          <article className="card card--dark">
            <div className="card__body">
              <p className="card__loc">Не публикуется</p>
              <h3>Закрытые лоты</h3>
              <p>
                Переуступки от собственников, прямые продажи владельцев, непубличные остатки квоты.
                Такие лоты живут несколько дней.
              </p>
              <ObjectCtaButton
                object="Закрытые лоты"
                label="Запросить закрытые лоты"
                className="btn"
              />
            </div>
          </article>
        </div>
        <p className="note objs-note">
          Это стартовые точки для сравнения, а не весь рынок. Актуальные условия уточняются на
          момент запроса.
        </p>
      </div>
    </section>
  );
}
