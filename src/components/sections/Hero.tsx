import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="Hero">
      <div className="hero__bg ph" id="heroBg">
        <Image
          src="/images/hero.jpg"
          alt="Побережье Пхукета"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero__scrim" />
      <div className="wrap">
        <p className="hero__rubric">
          <i>00</i>Недвижимость в Таиланде
        </p>
        <h1>
          Пространство{" "}
          <br />
          для жизни и капитала
        </h1>
        <p className="hero__sub">
          Пять сценариев входа на тайский рынок, объекты от $80 000{" "}
          <br />и 30+ параметров проверки до первого транша
        </p>
        <div className="hero__cta">
          <a className="btn" href="#objects">
            Подобрать недвижимость
          </a>
        </div>
      </div>
      <a className="cue" href="#approach" aria-label="К разделам разбора">
        <span>06 разделов разбора</span>
        <i />
      </a>
    </section>
  );
}
