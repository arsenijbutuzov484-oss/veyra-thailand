"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR =
  "#page .cell,#page .scn>article,#page .card,#page .acc details,#page .expert,#page .markets,#page .h2,#page .lede,#page .closing,#page form";

/**
 * Ports the prototype's inline <script>: sticky/glass header, burger menu,
 * hero fade-in and the scroll-reveal observer. Mounted once in the root layout.
 */
export function SiteScripts() {
  useEffect(() => {
    const hdr = document.getElementById("hdr");
    const burger = document.getElementById("burger");

    const onScroll = () => hdr?.classList.toggle("is-stuck", window.scrollY > 40);
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
    navLinks.forEach((link) => link.addEventListener("click", onNavClick));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".ph").forEach((el) => io.observe(el));
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      el.classList.add("rv");
      io.observe(el);
    });

    document.getElementById("heroBg")?.classList.add("in", "ready");

    return () => {
      window.removeEventListener("scroll", onScroll);
      burger?.removeEventListener("click", onBurgerClick);
      navLinks.forEach((link) => link.removeEventListener("click", onNavClick));
      io.disconnect();
    };
  }, []);

  return null;
}
