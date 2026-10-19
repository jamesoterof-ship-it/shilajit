/* ============================================================
   LENTES ONE POWER · POR PÁGINA · 18-10. Diseño del script (MASTER de _kn_scratch/lentes/diseno), verde de la caja por orden de James.
   Este archivo arma el HÉROE: foto completa de borde a borde, título que entra en cascada dentro de la foto (letra por letra)
   y la lupa que aclara la letra chica (idea que James pidió mirar en las gafas de Colombia).
   Corre DESPUÉS de ficha.js y solo en ?p=lentes. No toca el encabezado, el pie, los precios ni el formulario.
   🔴 No prometer que corrige astigmatismo ni reemplaza lentes con receta (lo dicen las preguntas).
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'lentes') return;
  document.body.classList.add('p-lentes');

  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ic = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };
  var LECTURA = 'La letra chica del remedio · el WhatsApp de los nietos · <b>la boleta del supermercado</b> · el diario del domingo · '
    + 'la receta de la once · las instrucciones de la caja · <b>el precio en la góndola</b> · la cuenta de la luz · el libro del velador · '
    + 'el menú del restaurante · <b>la etiqueta del champú</b> · el número de la micro · la fecha de vencimiento · el crucigrama · ';

  /* parte el título en letras (cada palabra en su .ln-w para que nunca se corte a la mitad) */
  function letras(el) {
    var k = 0;
    function partir(nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (pal) {
            if (!pal) return;
            if (/^\s+$/.test(pal)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'ln-w';
            pal.split('').forEach(function (c) { var l = document.createElement('span'); l.className = 'ln-l'; l.style.setProperty('--k', k++); l.textContent = c; w.appendChild(l); });
            frag.appendChild(w);
          });
          nodo.replaceChild(frag, n);
        } else if (n.nodeType === 1) partir(n);
      });
    }
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    partir(el);
    return k;
  }

  function portada(prod) {
    if (prod.querySelector('.ln-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var s = document.createElement('section');
    s.className = 'ln-heroe';
    s.innerHTML =
        /* James 18-10: "título ni nada en la imagen". Como las gafas de Colombia: arriba el título (cascada) y la lupa, abajo la foto COMPLETA sola */
        '<div class="ln-marco">'
      +   '<img class="ln-foto" src="img/lentes-heroe.webp?v=2" alt="Señora en su cocina leyendo el celular con los lentes One Power puestos, con la caja turquesa sobre la mesa" width="1024" height="1536" fetchpriority="high">'
      +   '<div class="ln-sobre"><p class="ln-rot ln-sube" style="--d:.05s">Lentes One Power · sin receta</p>'
      +   '<h1 class="ln-h1">Vuelve a leer de cerca <em>sin estirar el brazo.</em></h1></div>'
      + '</div>'
      + '<div class="ln-abajo">'
      +   '<div class="ln-lupa ln-sube" style="--i:0" aria-hidden="true">'
      +     '<p class="ln-lec ln-borroso">' + LECTURA + LECTURA + '</p>'
      +     '<p class="ln-lec ln-nitido">' + LECTURA + LECTURA + '</p>'
      +     '<span class="ln-aro"></span>'
      +   '</div>'
      +   '<p class="ln-pista ln-sube" style="--i:1">Pasa el dedo por la letra: <b>así lees con los One Power</b></p>'
      +   '<p class="ln-baja ln-sube" style="--i:2">Un solo par para <b>leer de cerca y ver de lejos</b>: el celular, el diario y la tele, sin andar cambiando de anteojos.</p>'
      +   '<ul class="ln-sellos ln-sube" style="--i:3">'
      +     '<li>' + ic('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>') + 'Envío gratis</li>'
      +     '<li>' + ic('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>') + 'Pagas al recibir</li>'
      +     '<li>' + ic('<path d="M20 6L9 17l-5-5"/>') + 'Sin receta médica</li>'
      +   '</ul>'
      + '</div>';   // sin botón aquí: el de la ficha ("Pedir ahora") viene justo debajo y no van dos botones seguidos
    if (arriba) {
      arriba.parentNode.insertBefore(s, arriba);
      ['.gal', '.miniz'].forEach(function (q) { var el = arriba.querySelector(q); if (el) el.remove(); });
    } else prod.insertBefore(s, prod.firstChild);

    var n = letras(s.querySelector('.ln-h1'));
    // lo de abajo entra cuando ya cayó la última letra
    var fin = (0.25 + n * 0.042 + 0.5).toFixed(2) + 's';
    Array.prototype.forEach.call(s.querySelectorAll('.ln-lupa, .ln-pista, .ln-abajo .ln-sube'), function (el) { el.style.setProperty('--d', fin); });
    if (!calma) {
      s.classList.add('ln-anda');
      // red de seguridad: a los 6 s todo queda visible aunque el navegador no anime
      setTimeout(function () { s.classList.remove('ln-anda'); }, 6000);
    }
    lupa(s.querySelector('.ln-lupa'));
  }

  /* la lupa: sola recorre la letra en un ocho suave; si el cliente la toca o pasa el mouse, sigue su dedo */
  function lupa(caja) {
    if (!caja) return;
    var mano = false, t0 = performance.now(), quieto;
    function pon(x, y) {
      var r = Math.max(46, Math.min(64, caja.clientHeight * 0.38));
      caja.style.setProperty('--r', r + 'px');
      caja.style.setProperty('--x', x + 'px');
      caja.style.setProperty('--y', y + 'px');
    }
    function sigue(e) {
      var b = caja.getBoundingClientRect(), pt = e.touches ? e.touches[0] : e;
      mano = true; clearTimeout(quieto); quieto = setTimeout(function () { mano = false; t0 = performance.now(); }, 2200);
      pon(Math.max(0, Math.min(b.width, pt.clientX - b.left)), Math.max(0, Math.min(b.height, pt.clientY - b.top)));
    }
    caja.addEventListener('pointermove', sigue);
    caja.addEventListener('touchmove', sigue, { passive: true });
    caja.addEventListener('pointerdown', sigue);
    pon(caja.clientWidth * 0.3, caja.clientHeight * 0.5);
    if (calma) return;
    (function paso(t) {
      if (!mano && caja.isConnected) {
        var s = (t - t0) / 1000, w = caja.clientWidth, h = caja.clientHeight;
        pon(w * (0.5 + 0.36 * Math.sin(s * 0.55)), h * (0.5 + 0.22 * Math.sin(s * 1.1)));
      }
      if (caja.isConnected) requestAnimationFrame(paso);
    })(t0);
  }

  /* ---------- secciones del patrón del script: Problema > Solución (+ video real) > Opiniones > botón ---------- */
  var FLECHA = ic('<path d="M5 12h14M13 5l7 7-7 7"/>');
  function irAlFormulario() { var f = document.querySelector('section.form') || document.getElementById('form') || document.getElementById('pedir'); if (f) f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); }
  function antesDe(prod, sel, s) { var ref = prod.querySelector(sel); if (ref) ref.parentNode.insertBefore(s, ref); else prod.appendChild(s); }

  function problema(prod) {
    if (prod.querySelector('.ln-b1')) return;
    var s = document.createElement('section'); s.className = 'ln-bloque ln-b1';
    s.innerHTML = '<span class="ln-num">01 · El problema</span><h2>¿Estiras el brazo para leer el celular?</h2>'
      + '<div class="ln-carta ln-entra"><img src="img/lentes-problema.webp?v=2" alt="Señor estirando el brazo y achicando los ojos para leer el celular" width="900" height="900" loading="lazy">'
      + '<ul class="ln-lista">'
      +   '<li>' + ic('<path d="M18 6L6 18M6 6l12 12"/>') + 'La letra chica del remedio ya no se lee</li>'
      +   '<li>' + ic('<path d="M18 6L6 18M6 6l12 12"/>') + 'Andas con un anteojo para cerca y otro para lejos</li>'
      +   '<li>' + ic('<path d="M18 6L6 18M6 6l12 12"/>') + 'Achicas los ojos y se te cansa la vista</li>'
      + '</ul></div>';
    antesDe(prod, '.desc', s);
  }

  function solucion(prod) {
    if (prod.querySelector('.ln-b2')) return;
    var P = [
      [ic('<circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/>'), 'Óptica flexible', 'Se ajusta sola a lo que estés mirando.'],
      [ic('<path d="M4 19V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M8 7h6M8 11h6"/>'), 'De cerca y de lejos', 'El celular, el diario y la tele con el mismo par.'],
      [ic('<path d="M20 6L9 17l-5-5"/>'), 'Sin receta', 'Te los pones y ves. Armazón liviano para todo el día.'],
    ];
    var s = document.createElement('section'); s.className = 'ln-bloque ln-b2';
    s.innerHTML = '<span class="ln-num">02 · La solución</span><h2>Un solo par para todo el día.</h2>'
      + '<figure class="ln-carta ln-entra"><img src="img/lentes-solucion.webp?v=1" alt="Señor leyendo el diario en el sillón con los lentes One Power, con la caja sobre la mesa" width="900" height="900" loading="lazy"></figure>'
      + '<div class="ln-grid">' + P.map(function (x) { return '<div class="ln-carta ln-punto ln-entra">' + x[0] + '<b>' + x[1] + '</b><p>' + x[2] + '</p></div>'; }).join('') + '</div>';
    antesDe(prod, '.desc', s);
  }

  /* video REAL (el anuncio "Una graduación", cortado antes de la placa): parte sin sonido y en bucle; con un toque se activa el sonido */
  function video(prod) {
    if (prod.querySelector('.ln-b3')) return;
    var s = document.createElement('section'); s.className = 'ln-bloque ln-b3';
    s.innerHTML = '<span class="ln-num">03 · Míralos de cerca</span><h2>Así son los One Power.</h2>'
      + '<div class="ln-video ln-entra"><video src="img/lentes-video.mp4?v=1" poster="img/lentes-video-poster.webp?v=1" muted loop playsinline preload="metadata" width="720" height="1280"></video>'
      + '<button type="button" class="ln-sonido">' + ic('<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>') + 'Activar sonido</button></div>';
    antesDe(prod, '.desc', s);
    var v = s.querySelector('video'), b = s.querySelector('.ln-sonido');
    b.addEventListener('click', function () { v.muted = !v.muted; if (!v.muted) { v.currentTime = 0; v.play(); } b.lastChild.textContent = v.muted ? 'Activar sonido' : 'Silenciar'; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (l) { l.forEach(function (it) { if (it.isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); }); }, { threshold: 0.35 }).observe(v);
    }
  }

  /* después de las opiniones: el botón (patrón del script: CTA después de la prueba social), secundario para no repetir el principal */
  function ctaOpiniones(prod) {
    var rev = prod.querySelector('.rev-sec'); if (!rev || rev.querySelector('.ln-cierre')) return;
    var p = document.createElement('p'); p.className = 'ln-cierre';
    p.innerHTML = '<button type="button" class="ln-mini">Quiero los míos, pago al recibir' + FLECHA + '</button>';
    rev.appendChild(p);
    p.querySelector('button').addEventListener('click', irAlFormulario);
  }

  /* entrada suave (el "fade-in" del script): al aparecer en pantalla, 300 ms. Nunca deja nada escondido: a los 4 s se muestra todo */
  function mover(prod) {
    var els = prod.querySelectorAll('.ln-entra');
    if (calma || !('IntersectionObserver' in window)) return;
    document.body.classList.add('ln-js');
    var obs = new IntersectionObserver(function (l) { l.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add('ln-visto'); obs.unobserve(it.target); } }); }, { rootMargin: '0px 0px -10% 0px' });
    Array.prototype.forEach.call(els, function (e, i) { e.style.transitionDelay = (i % 3) * 60 + 'ms'; obs.observe(e); });
    setTimeout(function () { Array.prototype.forEach.call(els, function (e) { e.classList.add('ln-visto'); }); }, 4000);
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;
    portada(prod); problema(prod); solucion(prod); video(prod); ctaOpiniones(prod); mover(prod);
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
