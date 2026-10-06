/* ============================================================
   CÁMARA AMPOLLETA WIFI · skill ui-ux-pro-max 06-10 (consulta "smart home gadget nocturno, luz ámbar en el pasillo,
   guardián silencioso"): Glassmorphism oscuro, azul noche #0F172A / tarjeta #1B2336 / verde "en vivo" #22C55E,
   letra Plus Jakarta Sans. Corre DESPUÉS de ficha.js; si el producto no es la ampolleta, se va. No toca el
   encabezado (.top), el pie (.pie), los precios ni el formulario.

   Lo que hace:
     1. HÉROE como una TRANSMISIÓN EN VIVO: la foto (OpenAI, cámara real de Dropi de referencia) dentro de un visor
        de cámara con esquinas, "REC", la hora de Chile corriendo, una línea de barrido, el halo de las luces de la
        cámara que late, y cada pocos segundos el aviso "Movimiento en la entrada" (así se ve el aviso de la app).
        Parallax suave con el dedo/mouse y el scroll. La galería de la ficha se va.
     2. debajo del precio: POR CUÁNTAS cámaras es ("por 2 cámaras"), sigue al pack elegido.
     3. "Cómo funciona": las 3 escenas (instalación · en vivo · de noche) en un carrusel que se desliza con el dedo.
     4. la promoción lleva SU foto (las 2 cámaras en la mano): ninguna foto se repite.
     5. el video real con su título; las secciones entran suave al llegar (nunca invisibles en reposo).
   ============================================================ */
(function () {
  function slug() { try { return window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; } }
  if (slug() !== 'ampolleta') return;
  document.body.classList.add('p-amp');

  var FOTO_HEROE = 'img/amp-heroe.webp?v=1';
  var FOTO_PROMO = 'img/amp-promo.webp?v=1';
  var ESCENAS = [
    ['img/amp-instala.webp?v=1', '01', 'La instalas tú', 'Mujer atornillando la cámara ampolleta en el portalámpara del pasillo, sin herramientas'],
    ['img/amp-envivo.webp?v=1', '02', 'La ves en vivo', 'Hombre en su oficina mirando en el celular el patio de su casa con su perro, en vivo'],
    ['img/amp-noche.webp?v=1', '03', 'También de noche', 'Mujer en su cama mirando en el celular la imagen nocturna del patio'],
  ];
  var CAMARAS = { 21490: 1, 33490: 2, 45490: 3 };
  var quieto = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. héroe: la casa en vivo ---------- */
  function heroe(prod) {
    if (prod.querySelector('.amp-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var h = document.createElement('section');
    h.className = 'amp-heroe';
    h.innerHTML =
      '<div class="amp-cielo" aria-hidden="true"></div>'
      + '<p class="amp-pill"><span class="amp-led" aria-hidden="true"></span>En vivo desde tu celular</p>'
      + '<h1 class="amp-h1">Tu casa,<br><em>a la vista.</em></h1>'
      + '<p class="amp-sub">Se atornilla en el portalámpara como una ampolleta, se conecta al WiFi y la ves en vivo, estés donde estés. También de noche.</p>'
      + '<figure class="amp-visor">'
      +   '<div class="amp-capa"><img src="' + FOTO_HEROE + '" alt="Hombre atornillando la cámara ampolleta en el portalámpara del alero de su casa, de noche" width="1024" height="1536" fetchpriority="high"></div>'
      +   '<span class="amp-halo" aria-hidden="true"></span>'
      +   '<span class="amp-barrido" aria-hidden="true"></span>'
      +   '<i class="amp-esq e1" aria-hidden="true"></i><i class="amp-esq e2" aria-hidden="true"></i><i class="amp-esq e3" aria-hidden="true"></i><i class="amp-esq e4" aria-hidden="true"></i>'
      +   '<div class="amp-hud" aria-hidden="true"><span class="amp-rec"><b></b>REC</span><span>CAM 01 · ENTRADA</span><time class="amp-hora">--:--:--</time></div>'
      +   '<div class="amp-aviso" role="status" aria-live="polite"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 8v5M12 16h.01"/></svg><span><b>Movimiento en la entrada</b>Así te avisa la app en el celular</span></div>'
      + '</figure>'
      + '<ul class="amp-chips">'
      +   '<li><b>1080p</b>imagen HD</li>'
      +   '<li><b>Noche</b>visión nocturna</li>'
      +   '<li><b>$33.490</b>por 2 cámaras</li>'
      + '</ul>';
    if (arriba) {
      arriba.parentNode.insertBefore(h, arriba);
      ['.gal', '.miniz'].forEach(function (s) { var el = arriba.querySelector(s); if (el) el.remove(); });
    } else prod.insertBefore(h, prod.firstChild);
    reloj(h);
    if (!quieto) { aviso(h); mover(h); }
  }

  /* la hora de Chile, corriendo como en una cámara de verdad */
  function reloj(h) {
    var t = h.querySelector('.amp-hora'); if (!t) return;
    var f = null;
    try { f = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); } catch (e) {}
    function pinta() { var d = new Date(); t.textContent = f ? f.format(d) : d.toTimeString().slice(0, 8); }
    pinta(); setInterval(pinta, 1000);
  }

  /* el aviso de movimiento entra, se queda un rato y se va; vuelve cada 8 segundos mientras el héroe se ve */
  function aviso(h) {
    var a = h.querySelector('.amp-aviso'), visible = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(h);
    function ciclo() {
      if (visible && !document.hidden) { a.classList.add('amp-sale'); setTimeout(function () { a.classList.remove('amp-sale'); }, 3600); }
    }
    setTimeout(ciclo, 2200); setInterval(ciclo, 8000);
  }

  /* parallax: la foto se mueve un poco con el dedo/mouse y con el scroll; el texto queda quieto */
  function mover(h) {
    var capa = h.querySelector('.amp-capa'), cielo = h.querySelector('.amp-cielo'), mx = 0, my = 0, pend = false;
    function pinta() {
      pend = false;
      var s = Math.min(scrollY, 900);
      capa.style.transform = 'translate3d(' + (mx * 10).toFixed(1) + 'px,' + (my * 8 - s * .06).toFixed(1) + 'px,0) scale(1.06)';
      cielo.style.transform = 'translate3d(0,' + (s * .2).toFixed(1) + 'px,0)';
    }
    function pedir() { if (!pend) { pend = true; requestAnimationFrame(pinta); } }
    addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; pedir(); }, { passive: true });
    addEventListener('scroll', pedir, { passive: true });
    pinta();
  }

  /* ---------- 2. "por 2 cámaras" debajo del precio ---------- */
  function porCuantas(prod) {
    var top = prod.querySelector('.precioTop'), ahora = document.getElementById('pcAhora');
    if (!top || !ahora || document.getElementById('ampPor')) return;
    var el = document.createElement('p'); el.className = 'amp-por'; el.id = 'ampPor';
    top.insertAdjacentElement('afterend', el);
    function pinta() {
      var n = CAMARAS[parseInt(ahora.textContent.replace(/\D/g, ''), 10)] || 1;
      el.innerHTML = 'por <b>' + n + (n === 1 ? ' cámara' : ' cámaras') + '</b> · envío gratis';
    }
    pinta();
    if ('MutationObserver' in window) new MutationObserver(pinta).observe(ahora, { childList: true, characterData: true, subtree: true });
  }

  /* ---------- 3. las 3 escenas dentro de "Cómo funciona" ---------- */
  function escenas(prod) {
    var sec = prod.querySelector('.form-sec');
    if (!sec || sec.querySelector('.amp-escenas')) return;
    var d = document.createElement('div'); d.className = 'amp-escenas';
    d.innerHTML = ESCENAS.map(function (e) {
      return '<figure><img src="' + e[0] + '" alt="' + e[3] + '" loading="lazy" width="1024" height="1024">'
        + '<figcaption><b>' + e[1] + '</b>' + e[2] + '</figcaption></figure>';
    }).join('');
    var ref = sec.querySelector('.sub2') || sec.querySelector('.tit2');
    if (ref) ref.parentNode.insertBefore(d, ref.nextSibling); else sec.insertBefore(d, sec.firstChild);
    var puntos = document.createElement('div'); puntos.className = 'amp-puntos'; puntos.setAttribute('aria-hidden', 'true');
    puntos.innerHTML = '<i class="on"></i><i></i><i></i>';
    d.insertAdjacentElement('afterend', puntos);
    d.addEventListener('scroll', function () {
      var i = Math.round(d.scrollLeft / Math.max(1, d.clientWidth * .86));
      puntos.querySelectorAll('i').forEach(function (p, k) { p.classList.toggle('on', k === i); });
    }, { passive: true });
  }

  /* ---------- 4. la foto de la promoción ---------- */
  function promoFoto(prod) {
    var card = prod.querySelector('.promo-sec .promo-card');
    if (!card || card.querySelector('.amp-promo-foto')) return;
    var f = document.createElement('img'); f.className = 'amp-promo-foto';
    f.src = FOTO_PROMO; f.alt = 'Dos cámaras ampolleta, una en cada mano, frente a la entrada de una casa'; f.loading = 'lazy'; f.width = 1024; f.height = 1024;
    var ban = card.querySelector('.promo-banner');
    if (ban) ban.insertAdjacentElement('afterend', f); else card.insertBefore(f, card.firstChild);
  }

  /* ---------- 5. video con título ---------- */
  function video(prod) {
    var v = prod.querySelector('.vid-wrap');
    if (!v || v.querySelector('.amp-vtit')) return;
    v.insertAdjacentHTML('afterbegin', '<div class="amp-vtit"><p class="amp-pill amp-pill-s"><span class="amp-led" aria-hidden="true"></span>Video real</p><h2>Así se instala y así se ve</h2></div>');
  }

  /* las secciones suben un poco al llegar (quedan visibles aunque el observador no corra) */
  function entradas(prod) {
    if (quieto || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('amp-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    prod.querySelectorAll(':scope > section, :scope > .bloque').forEach(function (s) {
      if (s.classList.contains('amp-heroe') || s.getBoundingClientRect().top < innerHeight) return;
      s.classList.add('amp-sube'); io.observe(s);
    });
  }

  function arrancar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;   /* ficha.js todavía no pinta */
    heroe(prod); porCuantas(prod); escenas(prod); promoFoto(prod); video(prod); entradas(prod);
    return true;
  }
  function intentar() {
    if (arrancar()) return;
    var n = 0, r = setInterval(function () { n++; if (arrancar() || n > 60) clearInterval(r); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
