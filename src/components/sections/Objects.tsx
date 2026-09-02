import Link from "next/link";
import { objects } from "@/content/objects";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export function Objects() {
  return (
    <section className="sec" id="objects" data-screen-label="03 Объекты">
      <div className="wrap">
        <div className="eyebrow fade">
          <span className="num">03</span>
          <span className="lbl">Объекты</span>
          <span className="line" />
        </div>
        <h2 className="h2 fade">Пять точек входа, из которых видно логику выбора</h2>
        <p className="lede fade">
          Разные локации, стадии и формы владения — чтобы сравнивать не картинки, а условия. По
          каждому объекту мы отдаём договор, схему платежей и таблицу расходов на владение до
          внесения депозита.
        </p>
        <div className="objs">
          {objects.map((object) => (
            <article className="card fade" key={object.slug}>
              <div className="card__ph">
                <span className="card__badge">{object.badge}</span>
                <PlaceholderImage placeholder={object.cardImage.placeholder} alt={object.title} />
              </div>
              <div className="card__body">
                <p className="card__loc">{object.location}</p>
                <h3>{object.title}</h3>
                <p>{object.tagline}</p>
                <ul className="spex">
                  {object.highlights.map((h) => (
                    <li key={h.label}>
                      <span>{h.label}</span>
                      <b>{h.value}</b>
                    </li>
                  ))}
                </ul>
                <div className="card__foot">
                  <a className="btn btn--line" href="#form">
                    {object.ctaLabel}
                  </a>
                  <Link className="link" href={`/thailand/${object.slug}`}>
                    Подробнее
                  </Link>
                </div>
              </div>
            </article>
          ))}
          <article className="card card--dark fade">
            <div className="card__body">
              <p className="card__loc">Не публикуется</p>
              <h3>Закрытые лоты</h3>
              <p>
                Переуступки от собственников до сдачи, прямые продажи владельцев, непубличные
                условия застройщиков по остаткам квоты и последним корпусам. Такие лоты не
                попадают в открытые подборки и живут несколько дней.
              </p>
              <div className="card__foot">
                <a className="btn" href="#form">
                  Запросить закрытые лоты
                </a>
              </div>
            </div>
          </article>
        </div>
        <p className="small fade" style={{ marginTop: 30, maxWidth: "70ch" }}>
          Это стартовые точки для сравнения, а не весь рынок. Названия, цены и сроки — примеры
          структуры данных; актуальные условия по каждому проекту уточняются на момент запроса.
        </p>
      </div>
    </section>
  );
}
