import Link from "next/link";
import { legalLinks, navItems, siteConfig } from "@/lib/site";

const mailSubject = encodeURIComponent("Запрос по недвижимости в Таиланде");

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div>
            <p className="logo">
              <span>
                Veyra<b>&nbsp;Estate</b>
              </span>
            </p>
            <p style={{ marginTop: 16, maxWidth: "44ch" }}>
              Направление «Инвестиции в недвижимость Таиланда»: Пхукет и Паттайя — инвестиции,
              аренда под управлением, зимовка, релокация.
            </p>
            <p
              style={{
                marginTop: 18,
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--gold)",
              }}
            >
              VEYRA ESTATE. Обрести истинное
            </p>
          </div>
          <div>
            <h5>Разделы</h5>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={`/thailand${item.href}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Контакты и документы</h5>
            <ul>
              <li>
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}?subject=${mailSubject}`}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.telegramBotUrl} target="_blank" rel="noopener">
                  Telegram-бот
                </a>
              </li>
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ftr__bot">
          <p>
            Не является публичной офертой. Цены, сроки и характеристики уточняйте у менеджера.
            Расчёты доходности построены на допущениях и не являются гарантией дохода.
            Недвижимость не предоставляет права на визу или проживание.
          </p>
          <p>© {new Date().getFullYear()} VEYRA ESTATE</p>
        </div>
      </div>
    </footer>
  );
}
