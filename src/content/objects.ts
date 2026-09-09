export interface GalleryImage {
  src?: string;
  alt: string;
  placeholder?: string;
}

export interface PropertySpec {
  label: string;
  value: string;
  /** Second line under the value — used for currency equivalents. */
  note?: string;
}

export interface PropertyFormat {
  name: string;
  detail: string;
}

export interface FinanceLine {
  label: string;
  value: string;
}

export interface TimelineStage {
  stage: string;
  detail: string;
}

export interface PropertyObject {
  slug: string;
  badge: string;
  location: string;
  title: string;
  tagline: string;
  ctaLabel: string;
  gallery: GalleryImage[];
  highlights: PropertySpec[];
  /** Everything below is optional — the detail page renders only what exists. */
  description?: string;
  locationText?: string;
  formats?: PropertyFormat[];
  finance?: FinanceLine[];
  financeNote?: string;
  legalText?: string;
  timeline?: TimelineStage[];
  risks?: string[];
}

const tilda = "https://static.tildacdn.com";

export const objects: PropertyObject[] = [
  {
    slug: "lakeside",
    badge: "Ранний вход",
    location: "Таиланд · Пхукет",
    title: "LakeSide",
    tagline:
      "Утро начинается с воды, а не с парковки. Комплекс на первой линии озера на Пхукете: вид, который нельзя застроить, и загрузка, которая не проваливается в мае.",
    ctaLabel: "Подробнее",
    gallery: [
      {
        src: `${tilda}/tild3961-3966-4432-a335-363331666363/sun-hills-lakeside-p.jpg`,
        alt: "LakeSide — вид на комплекс",
      },
      {
        src: `${tilda}/tild3932-6561-4834-b836-613865343161/sun-hills-lakeside-p.jpg`,
        alt: "LakeSide — территория и бассейн",
      },
      {
        src: `${tilda}/tild3733-3136-4666-a662-373235333734/sun-hills-lakeside-p.jpg`,
        alt: "LakeSide — архитектура корпусов",
      },
      {
        src: `${tilda}/tild6635-3333-4230-b534-326437316631/sun-hills-lakeside-p.jpg`,
        alt: "LakeSide — вид на озеро",
      },
    ],
    highlights: [
      { label: "Цена от", value: "3 307 500 ฿", note: "8 624 967 ₽ · 100 480 $" },
      { label: "Стадия", value: "Котлован, 2028" },
      { label: "Форма владения", value: "Freehold / leasehold" },
    ],
  },
  {
    slug: "lakelayan",
    badge: "Готовый актив",
    location: "Таиланд · Пхукет",
    title: "LakeLayan",
    tagline:
      "Первая линия озера у въезда в Laguna Phuket, на границе с Boat Avenue. С одной стороны вода и огни ресторанов, с другой — низкие виллы Laguna, которые вид не перекрывают. Локация, где вид не застроят.",
    ctaLabel: "Подробнее",
    gallery: [
      { src: "/assets/lakelayan-1.jpg", alt: "LakeLayan — лобби-терраса у бассейна", placeholder: "LakeLayan — лобби-терраса у бассейна" },
      { src: "/assets/lakelayan-2.jpg", alt: "LakeLayan — сад с пальмами и видом на горы", placeholder: "LakeLayan — сад на крыше" },
      { src: "/assets/lakelayan-3.jpg", alt: "LakeLayan — лагунный бассейн вдоль корпуса", placeholder: "LakeLayan — лагунный бассейн" },
    ],
    highlights: [
      { label: "Цена от", value: "3 460 320 ฿", note: "9 023 476 ₽ · 105 123 $" },
      { label: "Статус", value: "Котлован, 2028" },
      { label: "Форма владения", value: "Freehold, Chanote" },
    ],
  },
  {
    slug: "proxima-villas",
    badge: "Под управлением",
    location: "Таиланд · Пхукет",
    title: "Proxima Villas",
    tagline:
      "Бутиковый проект на 14 вилл: три спальни, свой бассейн, один этаж. Не первая линия — Банг Тао в 5 км, но и цена входа другая.",
    ctaLabel: "Подробнее",
    gallery: [
      { src: "/assets/proxima-1.webp", alt: "Proxima Villas — въездная группа на закате", placeholder: "Proxima Villas — въездная группа" },
      { src: "/assets/proxima-2.jpg", alt: "Proxima Villas — приватный бассейн вечером", placeholder: "Proxima Villas — приватный бассейн" },
      { src: "/assets/proxima-3.jpg", alt: "Proxima Villas — вид на комплекс с воздуха", placeholder: "Proxima Villas — вид с воздуха" },
    ],
    highlights: [
      { label: "Цена от", value: "13 750 000 ฿", note: "35 855 875 ₽ · 417 800 $" },
      { label: "Статус", value: "Сдан в IV кв. 2024" },
      { label: "Форма владения", value: "Freehold (квота)" },
    ],
  },
  {
    slug: "radisson-next-point",
    badge: "Вилла",
    location: "Таиланд · Пхукет",
    title: "Radisson Next Point",
    tagline: "Вилла на склоне для жизни и долгого владения. Земля — лизхолд или тайская компания.",
    ctaLabel: "Подробнее",
    gallery: [
      { src: "/assets/radisson-1.jpg", alt: "Radisson Next Point — вид сверху на бассейны и корпуса", placeholder: "Radisson Next Point — вид сверху" },
      { src: "/assets/radisson-2.jpg", alt: "Radisson Next Point — входная группа и фасад", placeholder: "Radisson Next Point — фасад" },
      { src: "/assets/radisson-3.jpg", alt: "Radisson Next Point — панорама комплекса и вид на море", placeholder: "Radisson Next Point — панорама" },
      { src: "/assets/radisson-4.jpg", alt: "Radisson Next Point — внутренний двор с бассейном вечером", placeholder: "Radisson Next Point — внутренний двор" },
    ],
    highlights: [
      { label: "Цена от", value: "29 296 130 ฿", note: "76 395 464 ₽ · 890 000 $" },
      { label: "Сдача", value: "II кв. 2027" },
      { label: "Форма владения", value: "Leasehold 30+30+30" },
    ],
  },
  {
    slug: "pratumnak-line",
    badge: "Другой регион",
    location: "Паттайя · Пратамнак",
    title: "Pratumnak Line",
    tagline:
      "Другая сезонность: меньше зависимости от туристического пика, больше длинной аренды.",
    ctaLabel: "Подробнее",
    gallery: [
      { alt: "Pratumnak Line — фото 1", placeholder: "Паттайя, Пратамнак — городская линия у моря, 1600×1200" },
      { alt: "Pratumnak Line — фото 2", placeholder: "Паттайя — вид на комплекс, 1600×1200" },
      { alt: "Pratumnak Line — фото 3", placeholder: "Паттайя — интерьер апартаментов, 1600×1200" },
    ],
    highlights: [
      { label: "Цена от", value: "2 633 360 ฿", note: "6 867 008 ₽ · 80 000 $" },
      { label: "Статус", value: "Сдан, 2025" },
      { label: "Форма владения", value: "Freehold (квота)" },
    ],
  },
];

export function getObjectBySlug(slug: string) {
  return objects.find((object) => object.slug === slug);
}
