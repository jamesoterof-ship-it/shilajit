/* ============================================================
   EFECTOS DE LA FICHA · con GSAP (lib/gsap.min.js)

   Las librerias ya estaban descargadas en lib/ y nadie las usaba: la ficha
   no cargaba ninguna. Se usa SOLO gsap.min.js (72 KB, del propio dominio).
   No se carga ScrollTrigger (otros 44 KB) porque para saber cuando una
   seccion entra en pantalla ya sirve IntersectionObserver, que viene en el
   navegador y no pesa nada. En una pagina de venta cada KB se paga en
   ventas perdidas.

   Que hace:
     1. Los circulos de los iconos entran uno detras de otro, girando.
     2. Al pasar el dedo o el mouse por encima, el circulo crece y gira.
     3. Los botones se hunden al apretarlos y vuelven con rebote.

   El contenido lo escribe ficha.js despues, asi que se espera a que los
   elementos existan de verdad en vez de suponer que ya estan.
   Con el telefono en "menos animacion" no se hace nada.
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

    gsap.set(cirs, { scale: 0.4, rotate: -35, opacity: 0 });

    var soltar = function () {
      gsap.to(cirs, {
        scale: 1, rotate: 0, opacity: 1,
        duration: 0.55, ease: 'back.out(1.9)',
        stagger: 0.07,
      });
    };

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

    /* al pasar por encima: crece y se inclina (esto solo se ve en computador) */
    document.querySelectorAll('.ing').forEach(function (fila) {
      var c = fila.querySelector('.cir');
      if (!c) return;
      fila.addEventListener('mouseenter', function () {
        gsap.to(c, { scale: 1.14, rotate: 8, duration: 0.28, ease: 'back.out(2.5)' });
      });
      fila.addEventListener('mouseleave', function () {
        gsap.to(c, { scale: 1, rotate: 0, duration: 0.35, ease: 'power2.out' });
      });
    });

    /* En celular no hay "pasar por encima": si el efecto solo vive en el
       hover, el cliente no ve NADA. Asi que despues de entrar, los circulos
       laten solos, uno detras de otro, en una ola que se repite. Es un latido
       chico (4%) y lento: llama la atencion sin marear ni tapar el texto. */
    gsap.to(cirs, {
      scale: 1.04,
      duration: 0.75,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.18, repeat: -1, yoyo: true },
      delay: 1.2,
    });
    return true;
  }

  /* ---------- 2 · los botones se hunden al apretar ---------- */
  function botones() {
    var btns = document.querySelectorAll('.prod .cta, .promo-card .cta');
    if (!btns.length) return false;
    btns.forEach(function (b) {
      if (b.dataset.gsap) return;
      b.dataset.gsap = '1';
      var abajo = function () { gsap.to(b, { scale: 0.965, duration: 0.09, ease: 'power2.out' }); };
      var arriba = function () { gsap.to(b, { scale: 1, duration: 0.45, ease: 'elastic.out(1,0.45)' }); };
      b.addEventListener('pointerdown', abajo);
      b.addEventListener('pointerup', arriba);
      b.addEventListener('pointerleave', arriba);
      b.addEventListener('pointercancel', arriba);
    });
    return true;
  }

  /* ficha.js pinta el contenido despues; se espera a que aparezca */
  function intentar() {
    var a = circulos(), b = botones();
    return a && b;
  }
  if (!intentar()) {
    var cont = document.getElementById('prod');
    if (cont && 'MutationObserver' in window) {
      var mo = new MutationObserver(function () { if (intentar()) mo.disconnect(); });
      mo.observe(cont, { childList: true, subtree: true });
      /* si en 8 s no aparecio, se deja de mirar y no se gasta bateria */
      setTimeout(function () { mo.disconnect(); }, 8000);
    }
  }
})();
