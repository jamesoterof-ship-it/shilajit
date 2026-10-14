/* ============================================================
   COLÁGENO NEOCELL · 14-10 · solo aplica lo que dio la skill ui-ux-pro-max (ver el encabezado de neocell.css).
   Corre DESPUÉS de ficha.js y solo en ?p=neocell. No toca precios, formulario ni los id que usa ficha.js.
     1. Héroe: color de marca, foto limpia a todo el ancho y el título escrito por la página encima (regla de James 09-10).
     2. Orden del patrón "Hero > Problem > Solution > Testimonials > CTA" con las secciones de la tienda (orden acordado con James).
     3. Testimonios en carrusel accesible: anterior / pausa / siguiente, posición anunciada ("3 de 26"), se detiene con foco,
        hover, pestaña oculta y movimiento reducido; todo se recorre con botones, sin arrastrar.
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'neocell') return;
  document.body.classList.add('p-neo');
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVG = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };

  function heroe(prod) {
    if (prod.querySelector('.neo-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var s = document.createElement('section');
    s.className = 'neo-heroe';
    s.innerHTML = '<img src="img/neo-heroe.webp?v=1" alt="Mujer sonriente extendiendo hacia la cámara el frasco celeste de colágeno NeoCell" width="1024" height="1536" fetchpriority="high">'
      + '<div class="neo-tit"><p class="neo-rot">Colágeno hidrolizado · 567 g</p><h1>Se nota en tu piel, tu pelo y tus uñas.</h1></div>';
    if (arriba) {
      arriba.parentNode.insertBefore(s, arriba);
      ['.gal', '.miniz'].forEach(function (q) { var el = arriba.querySelector(q); if (el) el.remove(); });
    } else prod.insertBefore(s, prod.firstChild);
  }

  /* orden acordado: Héroe > Problema > Solución > Testimonios > Compra > el resto */
  function ordenar(prod) {
    if (prod.dataset.neoOrden) return;
    var hijo = function (sel) { return prod.querySelector(':scope > ' + sel); };
    var arriba = hijo('.arriba2');
    var orden = [
      hijo('.neo-heroe'), arriba, arriba && arriba.nextElementSibling,          /* 1. héroe + precio + botón */
      hijo('.ba-sec'),                                                          /* 2. problema */
      hijo('.desc'), hijo('.vid-wrap'), hijo('.form-sec'), hijo('.cmp-sec'),    /* 3. solución (la 1ª .desc = "qué es y para qué sirve") */
      hijo('.rev-sec'), hijo('.res-sec'),                                       /* 4. testimonios */
      hijo('.promo-sec'), hijo('.pagoAnt'), hijo('section.form'),               /* 5. compra */
      hijo('.gar-sec'),
    ].filter(Boolean);
    var resto = Array.prototype.filter.call(prod.children, function (el) { return orden.indexOf(el) === -1; });
    orden.concat(resto).forEach(function (el) { prod.appendChild(el); });
    prod.dataset.neoOrden = '1';
  }

  /* la imagen de beneficios va en "la solución" (qué es y para qué sirve) */
  function solucion(prod) {
    var d = prod.querySelector(':scope > .desc');
    if (!d || d.querySelector('.neo-benef')) return;
    var f = document.createElement('img');
    f.className = 'neo-benef'; f.src = 'img/neo-beneficios.webp?v=1'; f.width = 1024; f.height = 1024; f.loading = 'lazy';
    f.alt = 'Frasco de colágeno NeoCell con sus beneficios: piel más firme, cabello más fuerte, uñas resistentes, articulaciones y huesos, 20 g por porción, sin sabor';
    f.style.cssText = 'display:block;width:100%;height:auto;margin:14px 0 4px';
    var h = d.querySelector('.tit2'); if (h) h.insertAdjacentElement('afterend', f); else d.appendChild(f);
  }

  function carrusel(prod) {
    var sec = prod.querySelector('.rev-sec'), lista = document.getElementById('listaRs'), mas = document.getElementById('masRs');
    if (!sec || !lista || sec.classList.contains('neo-con-carril')) return;
    /* trae todas las reseñas que ficha.js tiene guardadas antes de armar el carril */
    for (var i = 0; i < 60 && mas && mas.style.display !== 'none' && !mas.disabled; i++) mas.click();
    lista.classList.add('neo-carril'); sec.classList.add('neo-con-carril');
    lista.setAttribute('role', 'region'); lista.setAttribute('aria-roledescription', 'carrusel'); lista.setAttribute('aria-label', 'Opiniones de compradores');
    var mandos = document.createElement('div'); mandos.className = 'neo-mandos';
    mandos.innerHTML = '<button type="button" data-a="-1" aria-label="Opinión anterior">' + SVG('<path d="M15 18l-6-6 6-6"/>') + '</button>'
      + '<button type="button" data-a="pausa" aria-label="Pausar">' + SVG('<path d="M9 5v14M15 5v14"/>') + '</button>'
      + '<span class="neo-pos" aria-live="polite"></span>'
      + '<button type="button" data-a="1" aria-label="Opinión siguiente">' + SVG('<path d="M9 18l6-6-6-6"/>') + '</button>';
    lista.insertAdjacentElement('afterend', mandos);
    var pos = mandos.querySelector('.neo-pos'), bPausa = mandos.querySelector('[data-a="pausa"]');
    var tarjetas = function () { return lista.querySelectorAll(':scope > .rsc'); };
    var actual = 0, enPausa = calma, quieto = false, reloj = null;
    function ir(n) {
      var t = tarjetas(); if (!t.length) return;
      actual = (n + t.length) % t.length;
      lista.scrollTo({ left: t[actual].offsetLeft - lista.offsetLeft - (lista.clientWidth - t[actual].clientWidth) / 2, behavior: calma ? 'auto' : 'smooth' });
      pos.textContent = (actual + 1) + ' de ' + t.length;
    }
    function dibujaPausa() {
      bPausa.setAttribute('aria-label', enPausa ? 'Reanudar' : 'Pausar');
      bPausa.innerHTML = enPausa ? SVG('<path d="M8 5l11 7-11 7z"/>') : SVG('<path d="M9 5v14M15 5v14"/>');
    }
    function andar() { clearInterval(reloj); if (!enPausa) reloj = setInterval(function () { if (!quieto && !document.hidden) ir(actual + 1); }, 6000); }
    mandos.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'pausa') { enPausa = !enPausa; dibujaPausa(); andar(); return; }
      ir(actual + parseInt(b.dataset.a, 10)); andar();
    });
    ['mouseenter', 'focusin'].forEach(function (ev) { sec.addEventListener(ev, function () { quieto = true; }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { sec.addEventListener(ev, function () { quieto = false; }); });
    lista.addEventListener('scroll', function () {
      var t = tarjetas(), c = lista.scrollLeft + lista.clientWidth / 2, mejor = 0, dist = 1e9;
      for (var k = 0; k < t.length; k++) { var m = t[k].offsetLeft - lista.offsetLeft + t[k].clientWidth / 2, d = Math.abs(m - c); if (d < dist) { dist = d; mejor = k; } }
      if (mejor !== actual) { actual = mejor; pos.textContent = (actual + 1) + ' de ' + t.length; }
    }, { passive: true });
    dibujaPausa(); pos.textContent = '1 de ' + tarjetas().length; andar();
  }

  /* pages/producto.md del script: "organic curves, flowing SVG shapes" -> una onda arriba de cada sección, del color de esa sección */
  function ondas(prod) {
    if (prod.dataset.neoOndas) return;
    var secs = prod.querySelectorAll(':scope > section'), k = 0;
    Array.prototype.forEach.call(secs, function (s, i) {
      if (i < 2 || s.classList.contains('neo-heroe')) return;
      var bg = getComputedStyle(s).backgroundColor; if (!bg || bg === 'rgba(0, 0, 0, 0)') bg = '#F0F9FF';
      var d = (k++ % 2) ? 'M0,42 C240,6 480,6 720,24 C960,42 1200,42 1440,10 L1440,42 Z' : 'M0,42 C200,10 440,0 720,20 C1000,40 1240,30 1440,6 L1440,42 Z';
      s.insertAdjacentHTML('afterbegin', '<svg class="neo-ola" viewBox="0 0 1440 42" preserveAspectRatio="none" aria-hidden="true" style="color:' + bg + '"><path d="' + d + '"/></svg>');
    });
    prod.dataset.neoOndas = '1';
  }

  /* MASTER.md · Motion "Stagger List" (Standard): gsap.from(items, { opacity:0, scale:0.92, y:16, duration:0.4,
     stagger:{ each:0.06, from:'start', grid:'auto' }, ease:'back.out(1.4)' }), al llegar con el scroll; con movimiento reducido no se anima */
  function movimiento(prod) {
    if (calma || !window.gsap || prod.dataset.neoMov) return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    ['.ing-grid', '.res-grid', '.sellos', '.otros', '#packsForm', '.gar-chips', '.rev-bars'].forEach(function (q) {
      var caja = prod.querySelector(q); if (!caja || !caja.children.length) return;
      var conf = { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' };
      if (window.ScrollTrigger) conf.scrollTrigger = { trigger: caja, start: 'top 85%', once: true };
      gsap.from(caja.children, conf);
    });
    prod.dataset.neoMov = '1';
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2') || !document.getElementById('listaRs')) return false;
    heroe(prod); ordenar(prod); solucion(prod); carrusel(prod); ondas(prod); movimiento(prod);
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
