import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function Header({ solid = false }: { solid?: boolean } = {}) {
  return (
    <header className={`hdr${solid ? " hdr--solid" : ""}`} id="hdr">
      <div className="wrap">
        <Link href="/thailand#top" className="logo">
          Veyra<b>&nbsp;Estate</b>
        </Link>
        <nav className="nav" id="nav">
          {navItems.map((item) => (
            <Link key={item.href} href={`/thailand${item.href}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="btn" href={siteConfig.telegramBotUrl} target="_blank" rel="noopener">
          Задать вопрос в Telegram
        </a>
        <button className="burger" id="burger" aria-label="Меню" aria-expanded="false">
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
