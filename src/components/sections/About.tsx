const markets = [
  { name: "Крым", note: "основное направление, с 2014 года" },
  { name: "Сочи", note: "курортная и городская недвижимость" },
  { name: "Алтай", note: "загородный и рекреационный формат" },
  { name: "Таиланд", note: "инвестиции, аренда, зимовка, релокация" },
];

export function About() {
  return (
    <section className="sec sec--dark" id="about" data-screen-label="05 О нас">
      <div className="wrap">
        <p className="rubric">
          <i>05</i>О нас
        </p>
        <div className="about">
          <div>
            <h2 className="h2">Потому что в Таиланде важно увидеть больше, чем объект</h2>
            <p className="lede">
              VEYRA ESTATE — это не витрина недвижимости и не автоматическая подборка. За каждым
              решением стоят люди, которые знают рынок изнутри: локация, сделка, расходы, сценарий
              владения и то, что будет после покупки.
            </p>
            <p className="lede">
              Агентство работает на нескольких рынках и переносит в Таиланд одну и ту же
              методологию проверки сделки — меняются законы и валюта, не меняется порядок вопросов.
            </p>
            <ul className="markets">
              {markets.map((market) => (
                <li key={market.name}>
                  {market.name}
                  <span>{market.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="expert">
              <div className="expert__ph" role="img" aria-label="Вера Королёва">
                <span className="expert__mono">ВК</span>
              </div>
              <div>
                <h4>Вера Королёва</h4>
                <p className="role">Эксперт по премиальной недвижимости в Таиланде</p>
                <p className="q">Видит не презентацию, а сделку за объектом.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
