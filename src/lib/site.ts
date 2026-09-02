export const siteConfig = {
  name: "VEYRA ESTATE",
  direction: "Недвижимость в Таиланде",
  url: "https://veyra-estate.ru",
  basePath: "/thailand",
  phone: "+7 988 169 53 33",
  phoneHref: "tel:+79881695333",
  email: "info@veyra-estate.ru",
  telegramBotHandle: "@VeyraZayavki_bot",
  telegramBotUrl: "https://t.me/VeyraZayavki_bot",
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export const navItems = [
  { href: "#approach", label: "Подход" },
  { href: "#scenarios", label: "Сценарии" },
  { href: "#objects", label: "Объекты" },
  { href: "#legal", label: "Юридически" },
  { href: "#about", label: "О нас" },
  { href: "#form", label: "Контакты" },
] as const;

export const legalLinks = [
  { href: "/thailand/policy", label: "Политика конфиденциальности" },
  { href: "/thailand/consent", label: "Согласие на обработку ПДн" },
  { href: "/thailand/terms", label: "Пользовательское соглашение" },
] as const;
