import Script from "next/script";

/**
 * Loads Yandex.Metrika and Top.Mail.Ru only when their counter IDs are
 * configured via env vars. Both are no-ops until then, so the site ships
 * clean and picks up real counters by setting
 * NEXT_PUBLIC_YANDEX_METRIKA_ID / NEXT_PUBLIC_TOPMAILRU_ID.
 */
export function Analytics() {
  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  const topMailRuId = process.env.NEXT_PUBLIC_TOPMAILRU_ID;

  return (
    <>
      {metrikaId ? (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${JSON.stringify(metrikaId)}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });`}
        </Script>
      ) : null}
      {topMailRuId ? (
        <Script id="topmailru" strategy="afterInteractive">
          {`var _tmr = window._tmr || (window._tmr = []);
_tmr.push({id: ${JSON.stringify(topMailRuId)}, type: "pageView", start: (new Date()).getTime()});
(function (d, w, id) {
  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () { var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s); };
  if (w.opera === "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "tmr-code");`}
        </Script>
      ) : null}
    </>
  );
}
