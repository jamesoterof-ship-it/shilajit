/* ============================================================
   SHAMPOO CUBRE CANAS DEXE · 14-10 · OPCIÓN B (James). Marcado que sigue el PATRÓN de la skill ui-ux-pro-max
   "Scroll-Triggered Storytelling":
     0. Barra de progreso (el patrón la pide).
     1. Gancho de entrada = héroe: foto entera del producto (James: GRANDE, solo el producto), título Cormorant encima, tarjeta de vidrio.
     2. Capítulo 1 · el problema: las canas vuelven cada dos semanas (vidrio oscuro + foto).            + botón chico
     3. Capítulo 2 · el camino: los tres pasos del sobre, tarjetas de vidrio en cuadrícula (stagger).  + botón chico
     4. Capítulo 3 · la solución: el resultado y el gancho "Paga 1 y llévate 2".                      + botón chico
     5. Cierre: el formulario de compra de la ficha (climax CTA). Promoción, reseñas, garantía y preguntas los pone ficha.js.
   Movimiento (dial 5, "Stagger List"): gsap.from('.grid-item',{opacity:0,scale:.92,y:16,duration:.4,stagger:{each:.06,from:'start',grid:'auto'},ease:'back.out(1.4)'})
   Con reduced-motion: nada se anima, todo legible en su estado final. Sin parallax ni scrub.
   Corre DESPUÉS de ficha.js y solo en ?p=dexe. No toca el encabezado, el pie, los precios ni el formulario.
   🔴 Cosmético semipermanente: no decir "permanente" ni cifras de duración que el fabricante no declare.
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'dexe') return;
  document.body.classList.add('p-dexe');

  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GANCHO = { 24500: ['Paga 1 y llévate 2', '2 cajas · 20 sobres · 20 retoques'], 29500: ['Paga 2 y llévate 3', '3 cajas · 30 sobres · 30 retoques'],
                 22000: ['Paga 1 y llévate 2', '2 cajas · 20 sobres · 20 retoques'], 26500: ['Paga 2 y llévate 3', '3 cajas · 30 sobres · 30 retoques'] };
  var ic = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };
  var FLECHA = ic('<path d="M12 5v14M5 12l7 7 7-7"/>');
  var ETIQ = ic('<path d="M20 12l-8 8-8-8V4h8z"/><circle cx="9" cy="8" r="1.4"/>');
  var PASOS = [
    ['img/dexe-paso1.webp?v=1', 'Abre un sobre', 'Con el cabello húmedo, corta el sobre de 25 ml. Un sobre alcanza para cabello corto o medio; si es largo o grueso, usa dos.', 'Manos abriendo un sobre del shampoo cubre canas Dexe sobre el lavamanos'],
    ['img/dexe-paso2.webp?v=1', 'Aplica sobre las canas', 'Repártelo como un shampoo sobre las zonas con canas, con guantes, y masajea hasta cubrirlas.', 'Mujer aplicando el shampoo cubre canas en las raíces frente al espejo, con guantes'],
    ['img/dexe-paso3.webp?v=1', 'Espera 5 minutos y enjuaga', 'Déjalo actuar 5 a 10 minutos y enjuaga con agua hasta que salga limpia. Listo.', 'Mujer con el cabello negro recién enjuagado, sin canas visibles'],
  ];

  function cascada(t) { var i = 0; return t.split(' ').map(function (w) { return '<span class="dx-w">' + w.split('').map(function (c) { return '<span class="dx-l" style="--i:' + (i++) + '">' + c + '</span>'; }).join('') + '</span>'; }).join(' '); }
  function irAlFormulario() { var f = document.querySelector('.form-sec') || document.getElementById('form'); if (f) f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); }
  function mini(t) { return '<p class="dx-cierre"><button type="button" class="dx-mini">' + t + FLECHA + '</button></p>'; }

  function progreso() {
    if (document.querySelector('.dx-progreso')) return;
    var b = document.createElement('div'); b.className = 'dx-progreso'; b.setAttribute('aria-hidden', 'true'); b.innerHTML = '<i></i>';
    document.body.appendChild(b);
    var i = b.firstChild;
    function pinta() { var h = document.documentElement.scrollHeight - innerHeight; i.style.width = (h > 0 ? Math.min(100, scrollY / h * 100) : 0) + '%'; }
    addEventListener('scroll', pinta, { passive: true }); pinta();
  }

  function portada(prod) {
    if (prod.querySelector('.dx-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var s = document.createElement('section');
    s.className = 'dx-heroe';
    s.innerHTML =
        '<div class="dx-marco">'
      +   '<img class="dx-foto" src="img/dexe-heroe.webp?v=3" alt="Caja negra del shampoo cubre canas Dexe y un sobre de 25 ml sobre una superficie negra con gotas y luz verde" width="1024" height="1536" fetchpriority="high">'
      +   '<div class="dx-arriba"><div class="dx-vidrio">'
      +     '<p class="dx-sello"><i aria-hidden="true"></i>Nuevo en Chile</p>'
      +     '<h1 class="dx-h1" aria-label="Cubre tus canas en 5 minutos.">' + cascada('Cubre tus canas en 5 minutos.') + '</h1>'
      +   '</div></div>'
      + '</div>'
      + '<div class="dx-abajo">'
      +   '<div><p class="dx-baja">Un sobre, un retoque. Color negro para cabello y barba.</p>'
      +   '<ul class="dx-datos"><li><b>10</b>sobres por caja</li><li><b>5 min</b>de espera</li><li><b>25 ml</b>por sobre</li></ul></div>'
      +   '<button type="button" class="cta" id="dxCta">Lo quiero, pago al recibir</button>'
      + '</div>';
    if (arriba) {
      arriba.parentNode.insertBefore(s, arriba);
      ['.gal', '.miniz'].forEach(function (q) { var el = arriba.querySelector(q); if (el) el.remove(); });
    } else prod.insertBefore(s, prod.firstChild);
    s.querySelector('#dxCta').addEventListener('click', irAlFormulario);
  }

  function gancho(prod) {
    var top = prod.querySelector('.precioTop'), ahora = document.getElementById('pcAhora');
    if (!top || !ahora || document.getElementById('dxGancho')) return;
    var el = document.createElement('p'); el.className = 'dx-gancho'; el.id = 'dxGancho';
    top.insertAdjacentElement('afterend', el);
    var packDe = document.getElementById('pcPack'); if (packDe) packDe.style.display = 'none';
    function escribe() {
      var g = GANCHO[parseInt(ahora.textContent.replace(/\D/g, ''), 10)] || GANCHO[24500];
      el.innerHTML = ETIQ + '<span><b>' + g[0] + '</b> · ' + g[1] + ' · envío gratis</span>';
    }
    escribe();
    if ('MutationObserver' in window) new MutationObserver(escribe).observe(ahora, { childList: true, characterData: true, subtree: true });
    prod.querySelectorAll('.promo-uni').forEach(function (q) { if (/cada caja/.test(q.textContent)) q.textContent = q.textContent.replace(/^.*?cada caja\s*·\s*/, ''); });
  }

  function capitulo1(prod) {
    if (prod.querySelector('.dx-cap1')) return;
    var s = document.createElement('section');
    s.className = 'dx-cap dx-cap1';
    /* 14-10 James: "mucho texto y nada de imágenes": cada capítulo = una foto grande y una línea */
    s.innerHTML = '<span class="dx-num">Capítulo 1 · El problema</span><h2>Las canas vuelven cada dos semanas.</h2>'
      + '<div class="dx-prob grid-item"><img src="img/dexe-ba.webp?v=1" alt="Antes y después: raíces y barba con canas, y el mismo hombre con el cabello negro parejo" width="1200" height="800" loading="lazy">'
      + '<div><ul><li>Raíz blanca a los 15 días</li><li>Peluquería cada vez</li><li>Tinte de caja: mezclas y olor</li></ul></div></div>'
      + mini('Ver cómo lo resuelve');
    var ref = prod.querySelector('.vid-wrap') || prod.querySelector('.form-sec');
    if (ref) ref.parentNode.insertBefore(s, ref); else prod.appendChild(s);
    s.querySelector('.dx-mini').addEventListener('click', function () { var n = prod.querySelector('.dx-cap2'); if (n) n.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); });
  }

  function capitulo2(prod) {
    if (prod.querySelector('.dx-cap2')) return;
    var s = document.createElement('section');
    s.className = 'dx-cap dx-cap2';
    s.innerHTML = '<span class="dx-num">Capítulo 2 · El camino</span><h2>Un sobre, un retoque, cinco minutos.</h2>'
      + '<div class="dx-grid">' + PASOS.map(function (u, i) {
          return '<figure class="dx-glass grid-item"><img src="' + u[0] + '" alt="' + u[3] + '" width="1024" height="1024" loading="lazy">'
            + '<figcaption><span class="dx-paso">Paso ' + (i + 1) + '</span><b>' + u[1] + '</b></figcaption></figure>';
        }).join('') + '</div>'
      + mini('Ver el resultado');
    var ref = prod.querySelector('.form-sec');
    if (ref) ref.parentNode.insertBefore(s, ref); else prod.appendChild(s);
    s.querySelector('.dx-mini').addEventListener('click', function () { var n = prod.querySelector('.dx-cap3'); if (n) n.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); });
  }

  function capitulo3(prod) {
    if (prod.querySelector('.dx-cap3')) return;
    var s = document.createElement('section');
    s.className = 'dx-cap dx-cap3';
    s.innerHTML = '<span class="dx-num">Capítulo 3 · La solución</span><h2>Negro parejo, en cabello y barba.</h2>'
      + '<div class="dx-sol">'
      +   '<figure class="dx-glass grid-item"><img src="img/dexe-ambos.webp?v=1" alt="Hombre y mujer con el cabello negro, sin canas visibles, con la caja Dexe" width="1024" height="1024" loading="lazy"></figure>'
      +   '<div class="dx-glass grid-item dx-oferta"><span class="dx-tag">Paga 1 y llévate 2</span><b>$24.500</b><span><s>$49.000</s> · 2 cajas · 20 sobres</span>'
      +   '<p><strong>Paga 2 y llévate 3</strong>: 3 cajas por $29.500. Envío gratis, pagas al recibir.</p></div>'
      + '</div>'
      + '<div class="dx-grid dx-galeria"><figure class="dx-glass grid-item"><img src="img/dexe-caja.webp?v=1" alt="Caja Dexe con los 10 sobres abiertos sobre la mesa" width="1000" height="1000" loading="lazy"></figure>'
      +   '<figure class="dx-glass grid-item"><img src="img/dexe-paso3.webp?v=1" alt="Cabello negro parejo después de enjuagar" width="1000" height="1000" loading="lazy"></figure>'
      +   '<figure class="dx-glass grid-item"><img src="img/dexe-paso1.webp?v=1" alt="Un sobre de Dexe abierto" width="1000" height="1000" loading="lazy"></figure></div>'
      + mini('Pedir el mío');
    var ref = prod.querySelector('.form-sec');
    if (ref) ref.parentNode.insertBefore(s, ref); else prod.appendChild(s);
    s.querySelector('.dx-mini').addEventListener('click', irAlFormulario);
  }

  /* MOVIMIENTO = el snippet "Stagger List" (Standard) que dio la skill con --motion 5, tal cual, por cuadrícula */
  function mover(prod) {
    /* 14-10: con gsap.from + ScrollTrigger las fotos quedaban INVISIBLES hasta que el disparador saltaba (en el celular a veces nunca:
       capítulo 2 en blanco, mismo error que tuvo Neocell). Ahora las fotos están SIEMPRE visibles y la animación solo corre cuando el
       capítulo entra en pantalla (IntersectionObserver), con fromTo que termina en opacidad 1. */
    if (calma || !window.gsap || !('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (lista) {
      lista.forEach(function (it) {
        if (!it.isIntersecting) return; obs.unobserve(it.target);
        var items = it.target.querySelectorAll('.grid-item'); if (!items.length) return;
        gsap.fromTo(items, { opacity: 0, scale: 0.92, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)', clearProps: 'transform' });
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    prod.querySelectorAll('.dx-cap').forEach(function (cap) { obs.observe(cap); });
  }

  /* 14-10 James: "en la sección de promoción pon una imagen, con las dos promos". Imagen (precios escritos con PIL, exactos) arriba de la
     tarjeta de promoción + un segundo botón para "Paga 1 y llévate 2" (el de la ficha lleva a "Paga 2 y llévate 3"). */
  function promo(prod) {
    var sec = prod.querySelector('.promo-sec'); if (!sec || sec.querySelector('.dx-promo-img')) return;
    var fig = document.createElement('figure'); fig.className = 'dx-promo-img';
    fig.innerHTML = '<img src="img/dexe-promo.webp?v=1" alt="Promoción: Paga 1 y llévate 2 cajas Dexe por $24.500, o paga 2 y llévate 3 por $29.500" width="1024" height="1024" loading="lazy">';
    sec.insertBefore(fig, sec.firstChild);
    /* 14-10 James "¿qué hacen 2 botones acá?": un solo botón (regla de la fábrica: nunca dos botones pegados) */
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;
    progreso(); portada(prod); gancho(prod); promo(prod); capitulo1(prod); capitulo2(prod); capitulo3(prod); mover(prod);
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
