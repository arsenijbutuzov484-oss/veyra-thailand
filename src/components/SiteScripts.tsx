"use client";

import { useEffect } from "react";

/**
 * Ports the prototype's inline <script> behavior: sticky/glass header on
 * scroll, burger menu toggle, hero background scale, and the scroll-reveal
 * (.fade -> .fade.in) observer. Mounted once in the root layout so it
 * applies across every page.
 */
export function SiteScripts() {
  useEffect(() => {
    const hdr = document.getElementById("hdr");
    const burger = document.getElementById("burger");
    const heroBg = document.getElementById("heroBg");

    const onScroll = () => {
      hdr?.classList.toggle("is-stuck", window.scrollY > 40);
      if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + (window.scrollY / window.innerHeight) * 0.06})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onBurgerClick = () => {
      const open = hdr?.classList.toggle("is-open");
      burger?.setAttribute("aria-expanded", String(Boolean(open)));
    };
    burger?.addEventListener("click", onBurgerClick);

    const navLinks = Array.from(document.querySelectorAll("#nav a"));
    const onNavClick = () => {
      hdr?.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    };
    navLinks.forEach((a) => a.addEventListener("click", onNavClick));

    const revealTargets = Array.from(document.querySelectorAll(".fade"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("in");
            setTimeout(() => {
              el.style.transitionDelay = "";
            }, 1200);
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    revealTargets.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      burger?.removeEventListener("click", onBurgerClick);
      navLinks.forEach((a) => a.removeEventListener("click", onNavClick));
      io.disconnect();
    };
  }, []);

  return null;
}
