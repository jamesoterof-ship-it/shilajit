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
