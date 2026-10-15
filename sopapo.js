/* ============================================================
   SOPAPO DESTAPADOR A PRESIÓN · 15-10 · patrón de la skill ui-ux-pro-max "Hero-Centric Design" (aprobado por James):
     1. Héroe a todo el ancho: foto del producto (solo el producto, grande) + titular Barlow Condensed + datos + botón.
     2. Franja con UNA propuesta de valor.
     3. Beneficio / prueba: el problema (WC tapado), cómo funciona en 3 pasos, dónde sirve.
     4. Botón principal: el formulario de la ficha (y el botón fijo .stickycta que ya pone la ficha).
   Estilo Minimalismo suizo: cuadrícula, números grandes, sin brillos ni pulso. Con reduced-motion nada se anima.
   Corre DESPUÉS de ficha.js y solo en ?p=sopapo. No toca el encabezado, el pie, los precios ni el formulario.
   🔴 No prometer "120 PSI" ni "acero inoxidable". No destapa objetos duros caídos (lo dicen las preguntas).
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'sopapo') return;
  document.body.classList.add('p-sopapo');

  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PACK = { 25500: '1 sopapo', 37500: '2 sopapos · uno para cada baño', 49500: '3 sopapos · uno para cada baño y para regalar',
               22900: '1 sopapo', 33700: '2 sopapos · uno para cada baño', 44500: '3 sopapos · uno para cada baño y para regalar' };
  var ic = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };
  var FLECHA = ic('<path d="M5 12h14M13 5l7 7-7 7"/>');
  var CAMION = ic('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>');
  var PASOS = [
    ['img/sopapo-paso1.webp?v=1', 'Pon la copa', 'Sobre el desagüe, con un poco de agua para que selle.', 'Manos poniendo la copa de goma del destapador sobre el desagüe del WC'],
    ['img/sopapo-paso2.webp?v=2', 'Empuja el mango', 'Con fuerza, 3 a 5 veces: el aire a presión empuja el tapón.', 'Hombre empujando el mango en T del destapador a presión dentro del WC'],
    ['img/sopapo-paso3.webp?v=1', 'El agua baja', 'Sacas el destapador y listo. Sin químicos y sin gasfíter.', 'WC destapado con el agua bajando y una mano sacando el destapador'],
  ];

  function irAlFormulario() { var f = document.querySelector('.form-sec') || document.getElementById('form') || document.getElementById('pedir'); if (f) f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); }
  function mini(t) { return '<p class="sp-cierre"><button type="button" class="sp-mini">' + t + FLECHA + '</button></p>'; }
  function antesDelForm(prod, s) { var ref = prod.querySelector('.form-sec'); if (ref) ref.parentNode.insertBefore(s, ref); else prod.appendChild(s); }

  function portada(prod) {
    if (prod.querySelector('.sp-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var s = document.createElement('section');
    s.className = 'sp-heroe';
    s.innerHTML =
        '<div class="sp-marco">'
      +   '<img class="sp-foto" src="img/sopapo-heroe.webp?v=2" alt="Sopapo destapador a presión de aire: mango en T negro, cuerpo naranja y copa de goma" width="1024" height="1536" fetchpriority="high">'
      +   '<div class="sp-arriba"><p class="sp-sello"><i aria-hidden="true"></i>Nuevo en Chile</p>'
      +   '<h1 class="sp-h1">¿WC tapado? <em>Destápalo con aire.</em></h1></div>'
      + '</div>'
      + '<div class="sp-abajo">'
      +   '<div><p class="sp-baja">Tenlo en casa antes de que pase: destapas el WC en minutos, sin gasfíter y sin químicos.</p>'
      +   '<ul class="sp-datos"><li><b>64 cm</b>de largo</li><li><b>9 cm</b>de copa</li><li><b>0</b>químicos</li></ul></div>'
      +   '<button type="button" class="cta" id="spCta">Lo quiero, pago al recibir</button>'
      + '</div>';
    if (arriba) {
      arriba.parentNode.insertBefore(s, arriba);
      ['.gal', '.miniz'].forEach(function (q) { var el = arriba.querySelector(q); if (el) el.remove(); });
    } else prod.insertBefore(s, prod.firstChild);
    s.querySelector('#spCta').addEventListener('click', irAlFormulario);
    var f = document.createElement('section'); f.className = 'sp-franja';
    f.innerHTML = '<p>Una sola visita del gasfíter cuesta más que el sopapo.</p>';
    s.parentNode.insertBefore(f, s.nextSibling);
  }

  function gancho(prod) {
    var top = prod.querySelector('.precioTop'), ahora = document.getElementById('pcAhora');
    if (!top || !ahora || document.getElementById('spGancho')) return;
    var el = document.createElement('p'); el.className = 'sp-gancho'; el.id = 'spGancho';
    top.insertAdjacentElement('afterend', el);
    var packDe = document.getElementById('pcPack'); if (packDe) packDe.style.display = 'none';
    function escribe() { var t = PACK[parseInt(ahora.textContent.replace(/\D/g, ''), 10)] || PACK[37500]; el.innerHTML = CAMION + '<span><b>' + t + '</b> · envío gratis · pagas al recibir</span>'; }
    escribe();
    if ('MutationObserver' in window) new MutationObserver(escribe).observe(ahora, { childList: true, characterData: true, subtree: true });
  }

  function problema(prod) {
    if (prod.querySelector('.sp-b1')) return;
    var s = document.createElement('section'); s.className = 'sp-bloque sp-b1';
    s.innerHTML = '<span class="sp-num">01 · El problema</span><h2>Siempre pasa en el peor momento.</h2>'
      + '<div class="sp-prob grid-item"><img src="img/sopapo-problema.webp?v=1" alt="WC tapado con el agua casi al borde" width="1024" height="1024" loading="lazy">'
      + '<ul><li>Se tapa de noche o el fin de semana, cuando nadie atiende</li><li>El sopapo de siempre salpica y no destapa</li><li>La soda cáustica tarda horas y daña la cañería</li><li>El gasfíter cobra entre $16.000 y $45.000 la hora</li></ul></div>'
      + mini('Ver cómo funciona');
    antesDelForm(prod, s);
    s.querySelector('.sp-mini').addEventListener('click', function () { var n = prod.querySelector('.sp-b2'); if (n) n.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); });
  }

  function pasos(prod) {
    if (prod.querySelector('.sp-b2')) return;
    var s = document.createElement('section'); s.className = 'sp-bloque sp-b2';
    s.innerHTML = '<span class="sp-num">02 · Cómo funciona</span><h2>Tres pasos y el agua baja.</h2>'
      + '<div class="sp-grid">' + PASOS.map(function (u, i) {
          return '<figure class="sp-carta grid-item"><img src="' + u[0] + '" alt="' + u[3] + '" width="1024" height="1024" loading="lazy">'
            + '<figcaption><span class="sp-paso">0' + (i + 1) + '</span><b>' + u[1] + '</b><p>' + u[2] + '</p></figcaption></figure>';
        }).join('') + '</div>';
    antesDelForm(prod, s);
  }

  function usos(prod) {
    if (prod.querySelector('.sp-b3')) return;
    var s = document.createElement('section'); s.className = 'sp-bloque sp-b3';
    s.innerHTML = '<span class="sp-num">03 · Para tu casa</span><h2>Listo para la próxima vez.</h2>'
      + '<div class="sp-usos"><figure class="sp-carta grid-item"><img src="img/sopapo-usos.webp?v=2" alt="Mujer empujando el mango del destapador a presión dentro del WC" width="1024" height="1024" loading="lazy"></figure>'
      + '<ul class="sp-tags grid-item"><li>WC</li><li>Lavamanos</li><li>Ducha</li><li>Tina</li></ul></div>'
      + mini('Pedir el mío');
    antesDelForm(prod, s);
    s.querySelector('.sp-mini').addEventListener('click', irAlFormulario);
  }

  function promo(prod) {
    var sec = prod.querySelector('.promo-sec'); if (!sec || sec.querySelector('.sp-promo-img')) return;
    var fig = document.createElement('figure'); fig.className = 'sp-promo-img';
    fig.innerHTML = '<img src="img/sopapo-promo.webp?v=1" alt="Promoción: 1 sopapo $25.500, 2 sopapos $37.500, 3 sopapos $49.500" width="1024" height="1024" loading="lazy">';
    sec.insertBefore(fig, sec.firstChild);
  }

  /* movimiento suizo: entra corto y seco, sin rebote; las fotos están SIEMPRE visibles (fromTo termina en opacidad 1) */
  function mover(prod) {
    if (calma || !window.gsap || !('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (lista) {
      lista.forEach(function (it) {
        if (!it.isIntersecting) return; obs.unobserve(it.target);
        var items = it.target.querySelectorAll('.grid-item'); if (!items.length) return;
        gsap.fromTo(items, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.24, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' });
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    prod.querySelectorAll('.sp-bloque').forEach(function (b) { obs.observe(b); });
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;
    portada(prod); gancho(prod); promo(prod); problema(prod); pasos(prod); usos(prod); mover(prod);
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
