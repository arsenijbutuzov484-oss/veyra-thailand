const cells = [
  {
    title: "Локация и район",
    text: "Пхукет — не одна точка, а разные условия для инвестора. Меряем расстояние до пляжа шагами и считаем, сколько квартир выйдет в аренду одновременно с Вашей.",
    factLabel: "750 м",
    factText: "по карте — это 12 минут пешком и в горку",
  },
  {
    title: "Сезонность и загрузка",
    text: "High season — ноябрь–апрель, лоу — май–октябрь, разница в ставке двукратная. Пересчитываем цифры управляющей компании на 12 месяцев.",
    factLabel: "80 %",
    factText: "в презентации — обычно 45–55 % в пересчёте на год",
  },
  {
    title: "Форма владения",
    text: "Квота на freehold для иностранцев — 49 %, дальше только лизхолд 30+30+30. Проверяем Chanote отдельно от буклета застройщика.",
    factLabel: "49 %",
    factText: "площадей корпуса — весь лимит фрихолда",
  },
  {
    title: "Расходы после покупки",
    text: "Цена в прайсе — это вход, а не итог. Считаем первый год владения в одну таблицу до сделки.",
    factLabel: "3–6 %",
    factText: "от цены объекта — стоимость первого года",
    factSup: true,
  },
];

export function Approach() {
  return (
    <section className="sec" id="approach" data-screen-label="01 Что мы разбираем">
      <div className="wrap">
        <p className="rubric">
          <i>01</i>Что мы разбираем
        </p>
        <h2 className="h2">Что мы разбираем прежде, чем показать Вам объект</h2>
        <div className="grid2">
          {cells.map((cell) => (
            <article className="cell" key={cell.title}>
              <h3>{cell.title}</h3>
              <p>{cell.text}</p>
              <p className="fact">
                <b>{cell.factLabel}</b> {cell.factText}
                {cell.factSup ? <sup>1</sup> : null}
              </p>
            </article>
          ))}
        </div>
        <p className="note" style={{ marginTop: 22 }}>
          <sup>1</sup> Диапазоны приведены по рынку в целом и не являются расчётом по конкретному
          объекту.
        </p>
      </div>
    </section>
  );
}
