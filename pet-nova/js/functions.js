/* =====================================================
   Pet Nova – js/functions.js
   JavaScript exclusivo de la página Functions (functions.html)
   ===================================================== */

/* ---------- Cursor animado de la barra de navegación ----------
   Todas las páginas. Un "cursor" morado se desliza detrás del enlace
   al que apuntas con el mouse o el teclado y, al salir, vuelve al enlace
   de la página actual (el que tiene aria-current="page"). */
(function () {
    var ul = document.querySelector(".navbar nav ul");
    if (!ul) return;
    var cursor = ul.querySelector(".nav-cursor");
    var links = Array.prototype.slice.call(ul.querySelectorAll("a"));
    var selected = ul.querySelector('a[aria-current="page"]') || links[0];

    function moveTo(link, animate) {
        cursor.style.transition = animate ? "" : "none";
        cursor.style.width = link.offsetWidth + "px";
        cursor.style.height = link.offsetHeight + "px";
        cursor.style.transform = "translate(" + link.offsetLeft + "px," + link.offsetTop + "px)";
        cursor.style.opacity = 1;
        links.forEach(function (l) { l.classList.toggle("is-under", l === link); });
    }

    links.forEach(function (link) {
        link.addEventListener("mouseenter", function () { moveTo(link, true); });
        link.addEventListener("focus", function () { moveTo(link, true); });
    });
    ul.addEventListener("mouseleave", function () { moveTo(selected, true); });
    ul.addEventListener("focusout", function () { moveTo(selected, true); });

    window.addEventListener("load", function () { moveTo(selected, false); });
    window.addEventListener("resize", function () { moveTo(selected, false); });
    moveTo(selected, false);
})();

/* ---------- Contadores animados (página Functions) ----------
   Los números con data-count (5,000+, 12,000+, 300+, 98%) cuentan desde 0
   cuando aparecen en pantalla. Si el navegador no soporta la animación, o
   la persona prefiere menos movimiento, se queda el número final. */
(function () {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    function run(el) {
        var end = Number(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var start = null, duration = 1600;
        function step(t) {
            if (start === null) start = t;
            var p = Math.min((t - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(end * eased).toLocaleString("en-US") + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) { run(entry.target); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { observer.observe(n); });
})();
