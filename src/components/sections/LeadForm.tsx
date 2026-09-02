"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitLead, type LeadFormState } from "@/app/thailand/actions";
import { siteConfig } from "@/lib/site";

const initialState: LeadFormState = { status: "idle" };

export function LeadForm({ source }: { source?: string }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  return (
    <section className="sec sec--dark" id="form" data-screen-label="06 Форма">
      <div className="wrap">
        <div className="eyebrow fade">
          <span className="num">06</span>
          <span className="lbl">Разбор сценария</span>
          <span className="line" />
        </div>
        <div className="formwrap">
          <div>
            <h2 className="h2 fade" style={{ color: "var(--ivory)", maxWidth: "18ch" }}>
              Разберём Ваш сценарий входа в Таиланд
            </h2>
            <p className="lede fade">
              Ответим в течение рабочего дня. Первый разбор — это разговор о задаче и
              ограничениях, а не подборка ссылок на объекты.
            </p>
            <p className="small fade" style={{ marginTop: 26, color: "rgba(243,239,231,.6)" }}>
              {siteConfig.phone}
              <br />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <br />
              <a href={siteConfig.telegramBotUrl} target="_blank" rel="noopener">
                Telegram-бот агентства
              </a>
            </p>
          </div>
          {state.status === "success" ? (
            <div className="fade">
              <p className="small" style={{ color: "var(--sand)", fontSize: 16 }}>
                {state.message}
              </p>
            </div>
          ) : (
            <form className="fade lead" action={formAction} noValidate>
              {source ? <input type="hidden" name="source" value={source} /> : null}
              <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="f">
                <label htmlFor="n">Имя</label>
                <input id="n" name="name" type="text" placeholder="Ваше имя" required />
              </div>
              <div className="f">
                <label htmlFor="p">Телефон или WhatsApp</label>
                <input id="p" name="phone" type="tel" placeholder="+7 900 000 00 00" required />
              </div>
              <div className="f">
                <label htmlFor="t">Telegram (необязательно)</label>
                <input id="t" name="telegram" type="text" placeholder="@username" />
              </div>
              <div className="f">
                <label htmlFor="b">Бюджет</label>
                <select id="b" name="budget" defaultValue="">
                  <option value="">Выберите диапазон</option>
                  <option>$80 000 — $150 000</option>
                  <option>$150 000 — $300 000</option>
                  <option>$300 000 — $600 000</option>
                  <option>$600 000 — $1 500 000</option>
                  <option>от $1 500 000</option>
                  <option>Пока определяю</option>
                </select>
              </div>
              <div className="f f--full">
                <label htmlFor="s">Сценарий</label>
                <select id="s" name="scenario" defaultValue="">
                  <option value="">Выберите сценарий</option>
                  <option>Инвестиция</option>
                  <option>Аренда под управлением</option>
                  <option>Зимовка / второй дом</option>
                  <option>Переезд</option>
                  <option>Пока изучаю</option>
                </select>
              </div>
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  Я согласен(-на) на обработку персональных данных в соответствии с{" "}
                  <Link href="/thailand/policy">Политикой конфиденциальности</Link> и{" "}
                  <Link href="/thailand/consent">Согласием на обработку ПДн</Link>.
                </span>
              </label>
              <div className="f--full">
                <button className="btn" type="submit" disabled={pending}>
                  {pending ? "Отправляем…" : "Начать разбор"}
                </button>
                <p className="small" style={{ marginTop: 18, color: "rgba(243,239,231,.5)" }}>
                  Данные видит только менеджер направления. Мы не передаём контакты застройщикам и
                  не подключаем Вас к рассылкам.
                </p>
                {state.status === "error" ? (
                  <p className="small" style={{ marginTop: 14, color: "var(--sand)" }} role="alert">
                    {state.message}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
