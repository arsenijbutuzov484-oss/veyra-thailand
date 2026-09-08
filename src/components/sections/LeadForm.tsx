"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { submitLead, type LeadFormState } from "@/app/thailand/actions";
import { useObjectInterest } from "@/components/ObjectInterest";
import { siteConfig } from "@/lib/site";

const initialState: LeadFormState = { status: "idle" };

/** Formats free typing into +7 900 000 00 00 as the visitor types. */
function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits[0] === "8") digits = `7${digits.slice(1)}`;
  if (digits[0] !== "7") digits = `7${digits}`;
  digits = digits.slice(0, 11);

  let value = "+7";
  if (digits.length > 1) value += ` ${digits.slice(1, 4)}`;
  if (digits.length > 4) value += ` ${digits.slice(4, 7)}`;
  if (digits.length > 7) value += ` ${digits.slice(7, 9)}`;
  if (digits.length > 9) value += ` ${digits.slice(9, 11)}`;
  return value;
}

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const { selected } = useObjectInterest();
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [contactMissing, setContactMissing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const hasContact = phone.trim().length > 3 || telegram.trim().length > 1;
  const submitted = state.status === "success";

  return (
    <section className="sec sec--dark" id="form" data-screen-label="06 Разбор сценария">
      <div className="wrap">
        <p className="rubric">
          <i>06</i>Разбор сценария
        </p>
        <div className="formwrap">
          <div>
            <h2 className="h2" style={{ color: "var(--beige)" }}>
              Разберём Ваш сценарий входа в Таиланд
            </h2>
            <p className="lede">
              Первый разбор — это разговор о задаче и ограничениях, а не подборка ссылок на
              объекты.
            </p>
            {selected ? <p className="objsummary">Объект: {selected}</p> : null}
            <p className="note contacts" style={{ marginTop: 24 }}>
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> <em>WhatsApp · Telegram</em>
              <br />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <br />
              <a href={siteConfig.telegramBotUrl} target="_blank" rel="noopener">
                Telegram-бот направления
              </a>
              <br />
              <em>Отвечаем лично, без рассылок</em>
              <br />
              <em>Пн–Сб, 10:00–20:00 МСК (UTC+3)</em>
            </p>
          </div>
          <form
            className="lead"
            ref={formRef}
            action={formAction}
            noValidate
            onSubmit={(event) => {
              if (!hasContact) {
                event.preventDefault();
                setContactMissing(true);
                return;
              }
              setContactMissing(false);
            }}
          >
            <input
              className="hp"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input type="hidden" name="source" value={selected} />
            <div className="f">
              <label htmlFor="n">Имя</label>
              <input id="n" name="name" type="text" placeholder="Ваше имя" required />
            </div>
            <div className="f">
              <label htmlFor="p">Телефон или WhatsApp</label>
              <input
                id="p"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="+7 900 000 00 00"
                maxLength={16}
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
              />
            </div>
            <div className="f">
              <label htmlFor="t">Telegram</label>
              <input
                id="t"
                name="telegram"
                type="text"
                placeholder="@username"
                value={telegram}
                onChange={(event) => setTelegram(event.target.value)}
              />
            </div>
            <p className={`f--full contact-hint${contactMissing && !hasContact ? " is-err" : ""}`}>
              Достаточно одного способа связи — телефона или Telegram.
            </p>
            <div className="f">
              <label htmlFor="b">
                Бюджет <em>необязательно</em>
              </label>
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
              <label htmlFor="s">
                Сценарий <em>необязательно</em>
              </label>
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
              <button
                className={`btn submit-btn${pending ? " is-loading" : ""}`}
                type="submit"
                disabled={pending || submitted}
              >
                <span>
                  {pending ? "Отправляем…" : submitted ? "Заявка отправлена" : "Начать разбор"}
                </span>
              </button>
              <p className="note" style={{ marginTop: 16, color: "rgba(242,237,228,.5)" }}>
                Данные видит только менеджер направления.
              </p>
              <p className={`formstate is-ok${submitted ? " show" : ""}`} aria-live="polite">
                {state.message}
              </p>
              <p
                className={`formstate is-err${state.status === "error" ? " show" : ""}`}
                role="alert"
              >
                {state.message}{" "}
                <a href={siteConfig.telegramBotUrl} target="_blank" rel="noopener">
                  {siteConfig.telegramBotHandle}
                </a>{" "}
                или {siteConfig.phone}.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
