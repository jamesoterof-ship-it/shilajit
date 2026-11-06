/* ============================================================
   PROYECTOR NAVIDEÑO LED · Dropi 187712 · 05-11-2026
   Plano del script ui-ux-pro-max (design-system/proyector-navidad-cl),
   aprobado por James el 05-11 con UN agregado suyo: "ponle verde".
     · patrón: EMBUDO DE 3 PASOS: héroe → paso 1 (el problema) →
       paso 2 (la solución) → paso 3 (la acción) → compra, con un
       mini botón al final de cada paso
     · estilo: Bento Box Grid (tarjetas de distinto tamaño, 16 px de
       radio, sombras suaves, sube 1.02 al tocarla)
     · colores: rojo #DC2626 · rojo claro #F87171 · dorado #A16207 (botón)
       · fondo #FEF2F2 · texto #450A0A · borde #FECACA
       · verde #16A34A = agregado de James, va en los sellos de confianza
     · letras: Righteous (títulos) / Poppins (texto)
   🔴 EL HÉROE ES UN VIDEO (James 05-11): el proyector solo y apagado, y
   después encendido llenando la pared. Los textos van acá en HTML y
   entran en cascada, letra por letra.
   El resto de la ficha (promo, packs, reseñas, preguntas, formulario)
   sigue siendo la de siempre, para no romper la compra.
   Corre DESPUÉS de ficha.js. No toca el encabezado (.top) ni el pie.
   Candado de siempre: TODO se ve aunque este archivo falle.
   ============================================================ */
(function () {
  'use strict';

  function slug() {
    try { return window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'proyector') return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function cascada(texto, clase) {
    var i = 0;
    return texto.split(' ').map(function (pal) {
      var l = pal.split('').map(function (c) { return '<span class="py-l" style="--n:' + (i++) + '">' + esc(c) + '</span>'; }).join('');
      i++;
      return '<span class="py-pal' + (clase ? ' ' + clase : '') + '">' + l + '</span>';
    }).join(' ');
  }

  function miniCta(txt) {
    return '<a class="py-mini" href="#pedir">' + esc(txt) + '</a>';
  }

  function hero() {
    return '<div class="py-hero">' +
      '<video class="py-video" autoplay muted loop playsinline preload="none"' +
        ' poster="img/proyector-hero-poster.webp?v=1"' +
        ' aria-label="El proyector apagado y después encendido, llenando la pared de figuras navideñas de colores">' +
        '<source src="img/proyector-hero.mp4?v=1" type="video/mp4">' +
      '</video>' +
      '<div class="py-velo" aria-hidden="true"></div>' +
      '<div class="py-sobre">' +
        '<span class="py-rot">Proyector LED · figuras navideñas</span>' +
        '<h1 class="py-h1">' + cascada('Tu casa de Navidad') + '<br>' + cascada('en un minuto.', 'py-clave') + '</h1>' +
        '<p class="py-frase">Lo enchufas, lo apuntas y la pared se llena de copos, renos y Papá Noel.</p>' +
      '</div>' +
    '</div>' +
    '<div class="py-datos">' +
      '<div><span class="py-estr" aria-hidden="true">★★★★★</span><b>4,9</b><small>736 opiniones</small></div>' +
      '<div><b>0</b><small>escaleras</small></div>' +
      '<div><b>1 min</b><small>y queda puesto</small></div>' +
    '</div>' +
    '<div class="py-sellos">' +
      '<span>Envío gratis</span><span>Pagas al recibir</span><span>Garantía de 6 meses</span>' +
    '</div>';
  }

  /* PASO 1 · el problema */
  function paso1() {
    return '<section class="py-paso" data-paso="1">' +
      '<span class="py-num">Paso 1 · El problema</span>' +
      '<h2 class="py-h2">Decorar la casa no debería costarte <em>una tarde en la escalera.</em></h2>' +
      '<div class="py-bento py-bento--prob">' +
        '<div class="py-b"><b>Guirnaldas enredadas</b><p>Cada diciembre, la misma hora desenredando cables y buscando la ampolleta quemada.</p></div>' +
        '<div class="py-b"><b>Subirse al techo</b><p>Colgar luces en la fachada es escalera, clavos y un susto.</p></div>' +
        '<div class="py-b py-b--ancho"><b>Y al final se ve a medias</b><p>Un par de luces en la ventana y la casa sigue igual de apagada.</p></div>' +
      '</div>' +
      miniCta('Quiero decorar sin escaleras') +
    '</section>';
  }

  /* PASO 2 · la solución: el bento de fotos */
  function paso2() {
    return '<section class="py-paso" data-paso="2">' +
      '<span class="py-num">Paso 2 · La solución</span>' +
      '<h2 class="py-h2">Un proyector chico que <em>llena la pared de figuras.</em></h2>' +
      '<div class="py-bento py-bento--fotos">' +
        tarjeta('img/pr-card1.webp?v=1', 'El proyector en el pasto ilumina la fachada completa de una casa con figuras navideñas', 'Sin escaleras', 'La fachada entera, desde el suelo', 'Lo dejas en el pasto o en la ventana, lo apuntas, y la casa completa queda de Navidad.', 'py-b--grande') +
        tarjeta('img/pr-card2.webp?v=1', 'El proyector en el marco de una ventana proyectando figuras sobre la cortina y la pared', 'Se enchufa y listo', 'Un minuto, no una tarde', 'Se enciende al enchufarlo, con su cable integrado. La base en U le da la inclinación.', '') +
        tarjeta('img/pr-card3.webp?v=1', 'Figuras navideñas de colores girando por el techo y las paredes de una pieza de niños', 'Figuras que se mueven', 'Copos, renos y Papá Noel', 'Las figuras de colores recorren la pared y el techo. Los niños se quedan mirando.', '') +
        tarjeta('img/prod-proyector-3.webp?v=1', 'El proyector en un living llenando la pared y el techo de figuras navideñas', 'En el living', 'Pared y techo completos', 'Mientras más oscuro el lugar, más brillan las figuras.', '') +
        tarjeta('img/prod-proyector-2.webp?v=1', 'Una mano sosteniendo el proyector: es chico y cabe en la palma', 'Chico y liviano', 'Cabe en la palma', 'Pesa 230 gramos: lo cambias de lugar cuando quieras.', '') +
      '</div>' +
      miniCta('Lo quiero para mi casa') +
    '</section>';
  }

  function tarjeta(src, alt, rot, tit, txt, extra) {
    return '<figure class="py-b py-bf ' + extra + '">' +
      '<img src="' + src + '" alt="' + esc(alt) + '" loading="lazy" width="1000" height="1000">' +
      '<figcaption><span class="py-rot2">' + esc(rot) + '</span><b>' + esc(tit) + '</b><p>' + esc(txt) + '</p></figcaption>' +
    '</figure>';
  }

  /* PASO 3 · la acción */
  function paso3() {
    return '<section class="py-paso" data-paso="3">' +
      '<span class="py-num">Paso 3 · La acción</span>' +
      '<h2 class="py-h2">Elige cuántos y <em>decora toda la casa.</em></h2>' +
      '<div class="py-bento py-bento--of">' +
        '<figure class="py-b py-bf py-b--grande"><img src="img/pr-oferta.webp?v=1" width="1000" height="1000" loading="lazy" alt="Tres proyectores navideños iguales sobre una mesa roja y dorada"></figure>' +
        '<div class="py-b"><b>Uno adentro, otro en la entrada</b><p>Con dos o tres decoras el living, la pieza de los niños y la fachada a la vez.</p></div>' +
      '</div>' +
      miniCta('Ver los packs') +
    '</section>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;
    if (cont.querySelector('.py-hero')) return true;

    document.body.classList.add('p-proyector');

    if (!document.getElementById('py-fuente')) {
      var l = document.createElement('link');
      l.id = 'py-fuente';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Righteous&family=Poppins:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }

    arriba.insertAdjacentHTML('beforebegin', hero() + paso1() + paso2());
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    /* el paso 3 va justo antes de la promoción y los packs de la ficha */
    var promo = cont.querySelector('section.promo, .promo');
    if (promo) promo.insertAdjacentHTML('beforebegin', paso3());
    else arriba.insertAdjacentHTML('afterend', paso3());
    return true;
  }

  function encenderVideo() {
    var v = document.querySelector('.py-video');
    if (!v) return;
    function cargar() {
      if (v.getAttribute('data-ok')) return;
      v.setAttribute('data-ok', '1'); v.preload = 'auto'; v.load();
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    }
    if (document.readyState === 'complete') setTimeout(cargar, 300);
    else window.addEventListener('load', function () { setTimeout(cargar, 300); });
    window.addEventListener('touchstart', cargar, { once: true, passive: true });
    window.addEventListener('scroll', cargar, { once: true, passive: true });
  }

  function animar() {
    document.body.classList.add('py-listo');
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (!f.isIntersecting) return;
        f.target.classList.remove('py-pre');
        f.target.classList.add('vis');
        obs.unobserve(f.target);
      });
    }, { threshold: 0, rootMargin: '300px 0px 300px 0px' });
    [].forEach.call(document.querySelectorAll('.py-b'), function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.2) { el.classList.add('vis'); return; }
      el.classList.add('py-pre');
      obs.observe(el);
    });
  }

  var intentos = 0;
  var reloj = setInterval(function () {
    if (montar() || ++intentos > 120) {
      clearInterval(reloj);
      if (document.querySelector('.py-hero')) { encenderVideo(); animar(); }
    }
  }, 50);
})();
