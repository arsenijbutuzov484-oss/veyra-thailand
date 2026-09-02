import Image from "next/image";
import { siteConfig } from "@/lib/site";

const counters = [
  { v: "12 лет", k: "на рынке недвижимости" },
  { v: "300+", k: "сделок, проведённых агентством" },
  { v: "30+", k: "параметров проверки сделки в нашем регламенте" },
];

export function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="Hero">
      <div className="hero__bg" id="heroBg">
        <Image
          src="/images/hero.jpg"
          alt="Побережье Таиланда с высоты — известняковые скалы и бирюзовая вода"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero__scrim" />
      <div className="wrap">
        <h1>В Таиланде покупают не вид на море, а актив с юридической формой и расходами</h1>
        <p className="hero__sub">
          Мы разбираем локацию, форму владения, полную стоимость владения и сценарий
          использования — до того, как Вы внесёте первый транш. Показываем расчёт с допущениями и
          договор застройщика, а не рендер и обещанную доходность.
        </p>
        <p className="hero__pos">Обрести истинное — значит понимать, чем Вы владеете.</p>
        <div className="hero__cta">
          <a className="btn" href="#form">
            Разобрать сценарий
          </a>
          <a className="btn btn--ghost" href={siteConfig.telegramBotUrl} target="_blank" rel="noopener">
            Задать вопрос в Telegram
          </a>
        </div>
        <div className="counters">
          {counters.map((c) => (
            <div key={c.k}>
              <p className="v">{c.v}</p>
              <p className="k">{c.k}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
