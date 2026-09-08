"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "veyra_cookies";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (stored === "1") return;

    const showTimer = setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    }, 900);
    return () => clearTimeout(showTimer);
  }, []);

  if (!mounted) return null;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable — banner still dismisses for this visit
    }
    setVisible(false);
    setTimeout(() => setMounted(false), 400);
  };

  return (
    <div className={`cookies${visible ? " show" : ""}`}>
      <div className="wrap">
        <p>
          Мы используем cookie и сервисы аналитики, чтобы понимать, какие разделы полезны.
          Подробнее — в <Link href="/thailand/policy">Политике конфиденциальности</Link>.
        </p>
        <button className="btn btn--line" type="button" onClick={accept}>
          Принять
        </button>
      </div>
    </div>
  );
}
