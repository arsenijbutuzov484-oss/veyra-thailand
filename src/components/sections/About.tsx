import { PlaceholderImage } from "@/components/PlaceholderImage";

const markets = [
  { name: "Крым", note: "основное направление, с 2014 года" },
  { name: "Сочи", note: "курортная и городская недвижимость" },
  { name: "Алтай", note: "загородный и рекреационный формат" },
  { name: "Таиланд", note: "инвестиции, аренда, зимовка, релокация" },
];

const founders = [
  {
    name: "Вера Королёва",
    role: "Эксперт по премиальной недвижимости в Таиланде",
    quote: "Видит не презентацию, а сделку за объектом.",
    placeholder: "Портрет 800×1040, естественный свет",
  },
  {
    name: "Имя партнёра",
    role: "Роль в направлении",
    quote: "Строка-характеристика — заменить перед публикацией.",
    placeholder: "Портрет второго партнёра 800×1040",
  },
];

export function About() {
  return (
    <section className="sec" id="about" data-screen-label="05 Почему VEYRA">
      <div className="wrap">
        <div className="eyebrow fade">
          <span className="num">05</span>
          <span className="lbl">Почему VEYRA ESTATE</span>
          <span className="line" />
        </div>
        <div className="about">
          <div>
            <h2 className="h2 fade" style={{ maxWidth: "24ch" }}>
              Потому что в Таиланде важно увидеть больше, чем объект
            </h2>
            <p className="lede fade">
              VEYRA ESTATE — это не витрина недвижимости и не автоматическая подборка. За каждым
              решением стоят люди, которые знают рынок изнутри и помогают смотреть глубже: на
              локацию, сделку, расходы, сценарий владения и то, что будет после покупки.
            </p>
            <p className="lede fade">
              Агентство работает на нескольких рынках и переносит в Таиланд одну и ту же
              методологию проверки сделки — меняются законы и валюта, не меняется порядок
              вопросов.
            </p>
            <ul className="markets fade">
              {markets.map((m) => (
                <li key={m.name}>
                  {m.name}
                  <span>{m.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fade">
            {founders.map((f) => (
              <div className="founder" key={f.name}>
                <div className="founder__photo">
                  <PlaceholderImage placeholder={f.placeholder} alt={f.name} />
                </div>
                <div>
                  <h4>{f.name}</h4>
                  <p className="role">{f.role}</p>
                  <p className="quote">{f.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
