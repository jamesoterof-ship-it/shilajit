/* ============================================================
   EFECTOS DE LA FICHA · con GSAP (lib/gsap.min.js)

   Las librerias ya estaban descargadas en lib/ y nadie las usaba. Se usa
   SOLO gsap.min.js (71 KB, del propio dominio). No se carga ScrollTrigger
   (otros 44 KB): para saber cuando algo entra en pantalla ya sirve
   IntersectionObserver, que viene en el navegador.

   Que hace, y por que asi:

   1. Los circulos ENTRAN despacio, uno detras de otro, al aparecer la
      seccion. Entrada suave, sin rebote de resorte: el rebote se ve
      jugueton y esto vende una compra.

   2. Un ANILLO se abre y se desvanece desde un circulo cada vez, en orden,
      con pausa larga entre uno y otro. Es lo unico que se mueve solo. Se
      eligio esto y no un latido porque el latido cambia el tamaño del
      circulo, mueve el texto de al lado y se siente barato; el anillo
      llama la atencion sin tocar la maqueta.

   3. Los BOTONES se hunden apenas al apretarlos y vuelven suave. Sin
      rebote elastico: un boton de compra que rebota parece un juego.

   El contenido lo escribe ficha.js despues, asi que se espera a que los
   elementos existan. Con el telefono en "menos animacion" no se hace nada.
   ============================================================ */
(function () {
  'use strict';

  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quieto || !window.gsap) return;
  var gsap = window.gsap;

  /* ---------- 1 · los circulos entran en cadena ---------- */
  function circulos() {
    var cirs = document.querySelectorAll('.ing .cir');
    if (!cirs.length) return false;

    gsap.set(cirs, { scale: 0.86, opacity: 0, y: 10 });

    function soltar() {
      gsap.to(cirs, {
        scale: 1, opacity: 1, y: 0,
        duration: 0.85, ease: 'power3.out',
        stagger: 0.12,
        onComplete: anillos,
      });
    }

    /* ---------- 2 · el anillo que se abre, uno por vez ---------- */
    function anillos() {
      var i = 0;
      function siguiente() {
        var c = cirs[i % cirs.length];
        i++;
        var aro = document.createElement('span');
        aro.className = 'aro';
        c.appendChild(aro);
        gsap.fromTo(aro,
          { scale: 1, opacity: 0.55 },
          { scale: 1.6, opacity: 0, duration: 1.5, ease: 'power2.out',
            onComplete: function () { aro.remove(); } });
        /* pausa larga: llama la atencion sin volverse ruido */
        setTimeout(siguiente, 1900);
      }
      setTimeout(siguiente, 900);
    }

    var sec = cirs[0].closest('section') || cirs[0].parentNode;
    if (!('IntersectionObserver' in window)) { soltar(); return true; }
    var ojo = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        soltar();
        ojo.disconnect();
      });
    }, { threshold: 0.2 });
    ojo.observe(sec);

    /* en computador, al pasar el mouse: crece apenas, sin girar */
    document.querySelectorAll('.ing').forEach(function (fila) {
      var c = fila.querySelector('.cir');
      if (!c) return;
      fila.addEventListener('mouseenter', function () {
        gsap.to(c, { scale: 1.07, duration: 0.4, ease: 'power2.out' });
      });
      fila.addEventListener('mouseleave', function () {
        gsap.to(c, { scale: 1, duration: 0.5, ease: 'power2.out' });
      });
    });
    return true;
  }

  /* ---------- 3 · los botones se hunden al apretar ---------- */
  function botones() {
    var btns = document.querySelectorAll('.prod .cta, .promo-card .cta');
    if (!btns.length) return false;
    btns.forEach(function (b) {
      if (b.dataset.gsap) return;
      b.dataset.gsap = '1';
      var abajo = function () { gsap.to(b, { scale: 0.98, duration: 0.14, ease: 'power2.out' }); };
      var arriba = function () { gsap.to(b, { scale: 1, duration: 0.32, ease: 'power2.out' }); };
      b.addEventListener('pointerdown', abajo);
      b.addEventListener('pointerup', arriba);
      b.addEventListener('pointerleave', arriba);
      b.addEventListener('pointercancel', arriba);
    });
    return true;
  }

  function intentar() { var a = circulos(), b = botones(); return a && b; }
  if (!intentar()) {
    var cont = document.getElementById('prod');
    if (cont && 'MutationObserver' in window) {
      var mo = new MutationObserver(function () { if (intentar()) mo.disconnect(); });
      mo.observe(cont, { childList: true, subtree: true });
      setTimeout(function () { mo.disconnect(); }, 8000);
    }
  }
})();

/* ---- Bloque de escasez: el número sube y la barra se llena cuando entra en
   pantalla. Usa CountUp, que ya estaba descargado en lib/ y no se usaba.
   Si CountUp no cargó, el número se pone directo: nunca queda en cero. ---- */
(function () {
  'use strict';
  function animar(caja) {
    var n = caja.querySelector('.cnt-hoy');
    var barra = caja.querySelector('.esc-barra');
    if (n) {
      var meta = parseInt(n.getAttribute('data-n'), 10) || 0;
      var CU = window.countUp && (window.countUp.CountUp || window.countUp);
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (CU && !reduce) { try { new CU(n, meta, { duration: 1.3 }).start(); } catch (e) { n.textContent = meta; } }
      else n.textContent = meta;
    }
    if (barra) setTimeout(function () { barra.style.width = (barra.getAttribute('data-w') || 0) + '%'; }, 120);
  }
  function arranca() {
    var caja = document.querySelector('.esc-sec');
    if (!caja) return;
    if (!('IntersectionObserver' in window)) return animar(caja);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { animar(caja); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(caja);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(arranca, 600); });
  else setTimeout(arranca, 600);
})();


/* ---- HERO: movimiento ligado al scroll, sin brillos ni inclinaciones ---- */
(function () {
  'use strict';
  function arranca() {
    var p = window.PRODUCTO_ACTUAL;
    if (!p || !p.heroEfecto) return;
    var marco = document.querySelector('.gal .marco');
    var img = marco && marco.querySelector('img');
    if (!marco || !img) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    var st = document.createElement('style');
    st.textContent = '.gal .marco{overflow:hidden}'
      + '.gal .marco img{will-change:transform,opacity;backface-visibility:hidden}';
    document.head.appendChild(st);

    var g = window.gsap;
    if (!g) return;
    if (window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);

    /* 1 · REVEAL de entrada: se descubre de abajo hacia arriba y el zoom asienta */
    g.fromTo(img,
      { scale: 1.14, yPercent: 3, clipPath: 'inset(14% 0% 0% 0%)' },
      { scale: 1, yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power3.out' });

    /* 2 · PARALLAX: la foto va mas lenta que la pagina. Es el detalle que
       separa una pagina hecha de una plantilla, y casi no se nota. */
    if (window.ScrollTrigger) {
      g.to(img, {
        yPercent: -9, ease: 'none',
        scrollTrigger: { trigger: marco, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    }

    /* 3 · CRUCE entre fotos: la galeria cambia el src de golpe; se le pone un
       fundido corto con un zoom minimo para que no sea un corte seco. */
    var obs = new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.attributeName !== 'src') return;
        g.fromTo(img, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: .5, ease: 'power2.out' });
      });
    });
    obs.observe(img, { attributes: true, attributeFilter: ['src'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(arranca, 420); });
  else setTimeout(arranca, 420);
})();
