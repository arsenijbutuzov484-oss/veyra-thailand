/**
 * Object prices are stored in baht — the currency the deals are actually
 * written in — and the rouble and dollar figures on the cards are derived
 * from them. Update the two rates here and every price on the site follows.
 */
export const exchange = {
  /** Дата, на которую зафиксирован курс. Показывается рядом с ценами. */
  updated: "8 сентября 2026",
  rubPerThb: 2.6077,
  thbPerUsd: 32.917,
};

const NBSP = " ";

/** 3307500 -> "3 307 500" with non-breaking spaces, so a price never wraps mid-number. */
function group(value: number) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

export function priceFromBaht(thb: number) {
  const rub = thb * exchange.rubPerThb;
  const usd = thb / exchange.thbPerUsd;

  return {
    thb,
    usd: Math.round(usd),
    main: `${group(thb)}${NBSP}฿`,
    note: `${group(rub)}${NBSP}₽ · ${group(usd)}${NBSP}$`,
  };
}
