"use server";

import { headers } from "next/headers";

export interface LeadFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const budgetOptions = [
  "$80 000 — $150 000",
  "$150 000 — $300 000",
  "$300 000 — $600 000",
  "$600 000 — $1 500 000",
  "от $1 500 000",
  "Пока определяю",
];

const scenarioOptions = [
  "Инвестиция",
  "Аренда под управлением",
  "Зимовка / второй дом",
  "Переезд",
  "Пока изучаю",
];

const lastSubmitByIp = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

async function notifyLead(lead: {
  name: string;
  phone: string;
  telegram: string;
  budget: string;
  scenario: string;
  source: string;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  const text = [
    "Новая заявка — VEYRA ESTATE / Таиланд",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    lead.telegram ? `Telegram: ${lead.telegram}` : null,
    lead.budget ? `Бюджет: ${lead.budget}` : null,
    lead.scenario ? `Сценарий: ${lead.scenario}` : null,
    lead.source ? `Источник: ${lead.source}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  let delivered = false;

  if (botToken && chatId) {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    delivered = response.ok;
  }

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    delivered = delivered || response.ok;
  }

  if (!delivered) {
    console.warn(
      "[lead] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID or LEAD_WEBHOOK_URL not configured — lead was not delivered anywhere:",
      lead,
    );
  }
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success" };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const last = lastSubmitByIp.get(ip);
  if (last && now - last < RATE_LIMIT_MS) {
    return { status: "error", message: "Слишком много попыток. Попробуйте через полминуты." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const telegram = String(formData.get("telegram") ?? "").trim();
  const budgetRaw = String(formData.get("budget") ?? "").trim();
  const scenarioRaw = String(formData.get("scenario") ?? "").trim();
  const consent = formData.get("consent");

  if (!name || !phone || !consent) {
    return { status: "error", message: "Заполните имя, телефон и согласие на обработку данных." };
  }
  const budget = budgetOptions.includes(budgetRaw) ? budgetRaw : "";
  const scenario = scenarioOptions.includes(scenarioRaw) ? scenarioRaw : "";
  const source = String(formData.get("source") ?? "").trim();

  lastSubmitByIp.set(ip, now);

  await notifyLead({ name, phone, telegram, budget, scenario, source });

  return {
    status: "success",
    message: "Заявка отправлена. Менеджер направления свяжется с Вами в течение рабочего дня.",
  };
}
