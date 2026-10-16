/* ============================================================
   SOPAPO DESTAPADOR A PRESIÓN · 15-10 (2ª versión) · James: "que el script sea el que haga el diseño". Todo del archivo maestro
   del script (_kn_scratch/sopapo/diseno/design-system/sopapo/MASTER.md), patrón "Trust & Authority + Conversion":
     1. Héroe (misión / credibilidad): la foto que eligió James + titular + datos + botón. + efecto de agua (pedido por James).
     2. Prueba (sellos, cifras): opiniones reales, envío gratis, pago al recibir, transportadoras.
     3. Solución: el problema, cómo funciona en 3 pasos, para tu casa.
     4. Camino claro al botón: el formulario de la ficha (y el botón fijo .stickycta que ya pone la ficha).
   Movimiento: "Stagger List" del script tal cual (opacity 0, scale .92, y 16, .4 s, stagger .06 grid auto, back.out(1.4)).
   Con reduced-motion nada se anima.
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
      +   '<div class="sp-agua" aria-hidden="true"></div>'
      +   '<div class="sp-arriba"><p class="sp-sello">Nuevo en Chile</p>'
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
    agua(s.querySelector('.sp-agua'));
  }

  /* efecto de agua del héroe (James 15-10: "donde se ven las gotas del agua", nada de lluvia): destellos SOLO sobre la salpicadura de
     la foto (zona medida en sopapo-heroe.webp: x 31-93 %, y 79-97 %) y ondas que salen desde la copa (x 60 %, y 94 %). Nada cae. */
  function agua(caja) {
    if (!caja || calma) return;
    var h = '';
    for (var i = 0; i < 16; i++) {
      var x = 31 + Math.random() * 62, y = 79 + Math.random() * 17;
      if (x > 52 && x < 68 && y > 84) { i--; continue; }   // sobre la copa no: solo en el agua
      h += '<i style="left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) + '%;animation-duration:' + (1.4 + Math.random() * 1.6).toFixed(2) + 's;animation-delay:' + (Math.random() * 2.5).toFixed(2) + 's"></i>';
    }
    for (var j = 0; j < 2; j++) h += '<b style="left:60%;top:94%;animation-delay:' + (j * 1.4) + 's"></b>';
    caja.innerHTML = h;
  }

  /* 2. PRUEBA (patrón del script: sellos y cifras), justo debajo del héroe */
  function prueba(prod) {
    if (prod.querySelector('.sp-prueba')) return;
    var heroe = prod.querySelector('.sp-heroe'); if (!heroe) return;
    var n = (window.PRODUCTOS || []).find ? ((window.PRODUCTOS || []).find(function (x) { return x.id === 'sopapo'; }) || {}).resenasResumen : null;
    var tot = n && n.total ? n.total : 0, nota = n && n.nota ? String(n.nota).replace('.', ',') : '';
    var S = [
      [ic('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'), nota ? nota + ' de 5' : 'Opiniones reales', tot ? tot + ' opiniones reales' : 'de compradores'],
      [CAMION, 'Envío gratis', 'a todo Chile'],
      [ic('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>'), 'Pagas al recibir', 'efectivo o débito'],
      [ic('<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'), 'Starken y Blue', 'despacho a tu casa'],
    ];
    var s = document.createElement('section'); s.className = 'sp-prueba';
    s.innerHTML = '<div class="sp-sellos">' + S.map(function (x) { return '<div class="sp-sello-c grid-item">' + x[0] + '<b>' + x[1] + '</b><span>' + x[2] + '</span></div>'; }).join('') + '</div>';
    heroe.parentNode.insertBefore(s, heroe.nextSibling);
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
      + '<div class="sp-prob grid-item"><img src="img/sopapo-problema.webp?v=4" alt="Hombre preocupado mirando el WC tapado en el baño de su casa" width="1024" height="1024" loading="lazy">'
      + '<ul><li>Se tapa de noche o el fin de semana, cuando nadie atiende</li><li>El sopapo de siempre salpica y no destapa</li><li>La soda cáustica tarda horas y daña la cañería</li><li>El gasfíter cobra entre $16.000 y $45.000 la hora</li></ul></div>'
      + mini('Ver cómo funciona');
    antesDelForm(prod, s);
    s.querySelector('.sp-mini').addEventListener('click', function () { var n = prod.querySelector('.sp-b2'); if (n) n.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); });
  }

  /* 15-10 noche: una sola imagen con los 3 momentos (James: "crea todas las imágenes nuevamente") + los 3 pasos en tarjetas del script */
  function pasos(prod) {
    if (prod.querySelector('.sp-b2')) return;
    var s = document.createElement('section'); s.className = 'sp-bloque sp-b2';
    s.innerHTML = '<span class="sp-num">02 · Cómo funciona</span><h2>Tres pasos y el agua baja.</h2>'
      + '<figure class="sp-carta grid-item sp-pasos-img"><img src="img/sopapo-pasos.webp?v=2" alt="Hombre empujando el mango del sopapo a presión con la copa dentro del WC" width="1024" height="1280" loading="lazy"></figure>'
      + '<div class="sp-grid">' + PASOS.map(function (u, i) {
          return '<div class="sp-carta grid-item"><div class="sp-paso-txt"><span class="sp-paso">' + (i + 1) + '</span><b>' + u[1] + '</b><p>' + u[2] + '</p></div></div>';
        }).join('') + '</div>';
    antesDelForm(prod, s);
  }

  function usos(prod) {
    if (prod.querySelector('.sp-b3')) return;
    var s = document.createElement('section'); s.className = 'sp-bloque sp-b3';
    s.innerHTML = '<span class="sp-num">03 · Para tu casa</span><h2>Listo para la próxima vez.</h2>'
      + '<div class="sp-usos"><figure class="sp-carta grid-item"><img src="img/sopapo-usos.webp?v=4" alt="Mujer empujando el mango del sopapo a presión dentro del WC de su casa" width="1024" height="1024" loading="lazy"></figure>'
      + '<ul class="sp-tags grid-item"><li>WC</li><li>Lavamanos</li><li>Ducha</li><li>Tina</li></ul></div>'
      + mini('Pedir el mío');
    antesDelForm(prod, s);
    s.querySelector('.sp-mini').addEventListener('click', irAlFormulario);
  }

  function promo(prod) {
    var sec = prod.querySelector('.promo-sec'); if (!sec || sec.querySelector('.sp-promo-img')) return;
    var fig = document.createElement('figure'); fig.className = 'sp-promo-img';
    fig.innerHTML = '<img src="img/sopapo-promo.webp?v=2" alt="Promoción: 1 sopapo $25.500, 2 sopapos $37.500, 3 sopapos $49.500" width="1024" height="1024" loading="lazy">';
    sec.insertBefore(fig, sec.firstChild);
  }

  /* MOVIMIENTO = el "Stagger List" del script, con sus mismos valores. Se dispara al entrar en pantalla (IntersectionObserver)
     y con fromTo termina en opacidad 1: las fotos nunca quedan escondidas en el celular. */
  function mover(prod) {
    if (calma || !window.gsap || !('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (lista) {
      lista.forEach(function (it) {
        if (!it.isIntersecting) return; obs.unobserve(it.target);
        var items = it.target.querySelectorAll('.grid-item'); if (!items.length) return;
        gsap.fromTo(items, { opacity: 0, scale: 0.92, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)', clearProps: 'transform' });
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    prod.querySelectorAll('.sp-bloque, .sp-prueba').forEach(function (b) { obs.observe(b); });
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;
    portada(prod); prueba(prod); gancho(prod); promo(prod); problema(prod); pasos(prod); usos(prod); mover(prod);
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
