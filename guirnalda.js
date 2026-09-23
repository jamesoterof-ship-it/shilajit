/* ============================================================
   GUIRNALDA SOLAR · el diseño propio, montado sobre la ficha.
   REHECHO el 22-09 después del rechazo de James.

   Lo que él dijo, y lo que cambia por cada cosa:
     · "qué página tan fea, básica"  -> la ficha entera es de noche, sin
       cajas negras flotando sobre blanco.
     · "esquinas redondas JAMÁS en un hero" -> el hero va a sangre, de
       borde a borde, sin un solo radio.
     · "ningún efecto tiene ese hero" y "¿para qué me pediste las dos
       imágenes?" -> LA CLAVE. Antes la transición día→noche arrancaba ya
       medio encendida y se completaba sola en 2 s, antes de que nadie
       mirara: el cliente nunca veía el cambio, y las dos fotos no
       servían de nada. AHORA el hero arranca DE DÍA del todo y la
       enciende EL CLIENTE con un interruptor. El efecto se ve porque lo
       provoca él, y puede apagarla y prenderla las veces que quiera.

   Corre DESPUES de ficha.js. Si el producto no es la guirnalda se va sin
   hacer nada. No toca el encabezado (.top) ni el pie (.pie).

   OJO: no se afirma que se encienda sola al anochecer ni cuántas horas
   dura. Eso no está confirmado con el proveedor.
   ============================================================ */
(function () {
  'use strict';

  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'guirnalda') return;

  var AMPOLLETAS = 10;

  var FOTOS = [
    ['img/gui-sec-pack.webp?v=1',
     'Guirnalda solar de diez ampolletas tipo Edison junto a su panel solar y la estaca, sobre una mesa de madera',
     'Qué llega', 'La guirnalda, el panel y la estaca',
     'Eso es todo lo que trae la caja, y es todo lo que necesita: no lleva enchufe, ni alargador, ni herramientas.'],
    ['img/gui-sec-ampolleta.webp?v=1',
     'Primer plano de tres ampolletas tipo Edison encendidas con luz ámbar cálida',
     'La luz', 'Cálida, no blanca de hospital',
     'Ampolletas tipo Edison con el filamento a la vista. La luz sale ámbar: el color que hace que un patio se vea acogedor y no como una bodega.'],
    ['img/gui-sec-panel.webp?v=1',
     'Panel solar negro montado en su estaca sobre el pasto de un jardín',
     'De dónde sale la energía', 'El panel va donde le dé el sol',
     'La estaca se entierra en el pasto o en una maceta, apuntando adonde pega el sol la mayor parte del día. El cable llega hasta la guirnalda y no queda nada a la vista.'],
  ];

  var CINTA = [
    ['Un balcón de departamento', '3 m', 30],
    ['Una terraza corriente', '6 m', 60],
    ['La guirnalda', '10 m', 100, true],
  ];

  var CAPS = [
    ['sol', 'Energía solar', 'Sin enchufe ni cuenta de luz'],
    ['agua', 'IP65', 'Aguanta la lluvia afuera'],
    ['rayo', 'LED cálida', 'De larga duración'],
    ['casa', 'Un minuto', 'Se cuelga sin herramientas'],
  ];

  var ICONOS = {
    sol:  '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    agua: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    rayo: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- la guirnalda dibujada ----------
     El cable NO es una línea recta: cuelga en una catenaria, como cuelga
     de verdad entre dos puntos. Las ampolletas van colgadas de la curva. */
  function cable(ancho, alto, caida) {
    var d = 'M 0 6 Q ' + (ancho / 2) + ' ' + (caida * 2) + ' ' + ancho + ' 6';
    var amp = '';
    for (var i = 0; i < AMPOLLETAS; i++) {
      var t = (i + 0.5) / AMPOLLETAS;
      var x = t * ancho;
      /* punto de la curva de Bézier cuadrática en t */
      var y = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * (caida * 2) + t * t * 6;
      amp += '<g class="gu-amp" style="--n:' + i + '" data-i="' + i + '">' +
        '<line x1="' + x.toFixed(1) + '" y1="' + y.toFixed(1) + '" x2="' + x.toFixed(1) + '" y2="' + (y + 7).toFixed(1) + '" stroke="#0b0f16" stroke-width="1.6"/>' +
        '<ellipse cx="' + x.toFixed(1) + '" cy="' + (y + 11).toFixed(1) + '" rx="4.2" ry="5.4"/>' +
      '</g>';
    }
    return '<svg class="gu-cable" viewBox="0 0 ' + ancho + ' ' + alto + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="gu-hilo" d="' + d + '"/>' + amp + '</svg>';
  }

  function bloqueFotos() {
    return '<div class="gu-fichas gu-oscura">' + FOTOS.map(function (f, i) {
      return '<figure class="gu-fi" style="--i:' + i + '">' +
        '<img src="' + f[0] + '" alt="' + esc(f[1]) + '" loading="lazy" width="1000" height="750">' +
        '<figcaption>' +
          '<span class="gu-rot2">' + esc(f[2]) + '</span>' +
          '<b>' + esc(f[3]) + '</b>' +
          '<p>' + esc(f[4]) + '</p>' +
        '</figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  function bloqueMomento() {
    return '<section class="gu-mom gu-oscura">' +
      '<span class="gu-rot">El antes y el después</span>' +
      '<h2 class="gu-h2">Nadie se queda en un patio <em>a oscuras.</em></h2>' +
      '<p class="gu-sub">Es la misma mesa, la misma gente y la misma noche. Lo único que cambia es que hay luz, y con luz la junta no se corta a las nueve.</p>' +
      '<img src="img/gui-sec-antes.webp?v=1" width="1080" height="1320" loading="lazy"' +
        ' alt="La misma terraza con amigos en la mesa: a oscuras sin iluminación, y después con la guirnalda solar encendida">' +
    '</section>';
  }

  function bloqueCinta() {
    return '<section class="gu-sec gu-blq gu-oscura">' +
      '<span class="gu-rot">Lo que nadie te dice</span>' +
      '<h2 class="gu-h2">¿Cuánto son <em>diez metros?</em></h2>' +
      '<p class="gu-sub">Es la duda de todos antes de comprar. Diez metros no es un número: es cruzar una terraza completa de lado a lado, y que todavía te sobre cable.</p>' +
      '<div class="gu-cinta">' +
        CINTA.map(function (r) {
          return '<div class="gu-tramo' + (r[3] ? ' gu-mia' : '') + '">' +
            '<div class="gu-et"><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></div>' +
            '<div class="gu-huincha"><i style="--w:' + r[2] + '%"></i></div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  function bloqueCaps() {
    return '<div class="gu-caps gu-oscura">' + CAPS.map(function (c) {
      return '<div class="gu-cap">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONOS[c[0]] + '</svg>' +
        '<b>' + esc(c[1]) + '</b><span>' + esc(c[2]) + '</span>' +
      '</div>';
    }).join('') + '</div>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;
    if (cont.querySelector('.gu-hero')) return true;

    document.body.classList.add('p-guirnalda');

    /* la serif de display. Va acá y no en el HTML para no cargarla en las
       otras doce fichas, que no la usan. */
    if (!document.getElementById('gu-fuente')) {
      var l = document.createElement('link');
      l.id = 'gu-fuente';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap';
      document.head.appendChild(l);
    }

    var html =
      /* la escena mide dos pantallas y media; el hero va pegado arriba y el
         patio atardece mientras el cliente la recorre con el dedo */
      /* 🔴 EL HERO ES UN VIDEO. James: "ibas a hacer un puto video".
         Antes eran las dos fotos cruzándose con el scroll, y ese cruce se
         rompió tres veces: se quedaba de día, o las dos se veían a medias.
         El video del día a la noche no depende de nada: arranca solo, va en
         bucle y el efecto se ve siempre.

         Los TEXTOS NO van quemados en el video: van acá en HTML, encima,
         para que entren en cascada. Es lo que pidió. */
      '<div class="gu-hero">' +
        '<video class="gu-video" autoplay muted loop playsinline preload="auto"' +
          ' poster="img/guirnalda-noche.webp?v=1"' +
          ' aria-label="La misma terraza de día y de noche: las diez ampolletas de la guirnalda se encienden al caer la tarde">' +
          '<source src="img/guirnalda-hero.mp4?v=2" type="video/mp4">' +
        '</video>' +
        '<div class="gu-vineta" aria-hidden="true"></div>' +
        '<div class="gu-sobre">' +
          '<span class="gu-rot">Diez metros · diez ampolletas · energía solar</span>' +
          '<h1 class="gu-h1">Tu patio de noche,<em>por fin.</em></h1>' +
          /* 🔴 James: "no entiendo esto". La frase decia "de noche no se ve
   nada" MIENTRAS el video muestra el patio encendido: el texto
   contradecia la imagen. Ahora dice lo que el cliente esta viendo. */
            '<p class="gu-frase">Diez metros de luz cálida que funcionan con el sol, sin enchufe.</p>' +
        '</div>' +
      '</div>' +
      '<section class="gu-sec gu-oscura">' +
        '<p class="gu-sub" style="max-width:52ch">Diez metros de cable con diez ampolletas tipo Edison de luz cálida, para dejar puestas afuera. El panel va donde le dé el sol y se carga de día: no se enchufa a la corriente, así que no te sube la cuenta de la luz.</p>' +
        '<div class="gu-med">' +
          '<div><b>10</b><span>metros de largo</span></div>' +
          '<div><b>10</b><span>ampolletas cálidas</span></div>' +
          '<div><b>$0</b><span>de cuenta de luz</span></div>' +
        '</div>' +
      '</section>';

    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    var sec = cont.querySelector('.gu-sec');
    if (sec) sec.insertAdjacentElement('afterend', arriba);

    var desc = cont.querySelector('section.desc');
    if (desc) {
      /* orden de los ángulos: primero el POR QUÉ, después el CUÁNTO,
         al final el CÓMO. Nunca pegados al precio: ahí la ficha ya pone
         su botón y quedarían dos botones seguidos. */
      desc.insertAdjacentHTML('beforebegin', bloqueMomento());
      desc.insertAdjacentHTML('beforebegin', bloqueCinta());
      desc.insertAdjacentHTML('beforebegin', bloqueCaps());
      var p = desc.querySelector('p');
      if (p) p.insertAdjacentHTML('afterend', bloqueFotos());
      else desc.insertAdjacentHTML('beforeend', bloqueFotos());
    }
    return true;
  }

  function animar() {
    /* El hero ya no necesita JavaScript: es un video que corre solo. Lo que
       queda es la entrada de las secciones al aparecer.
       El CSS las deja VISIBLES y aca se esconden con .gu-pre justo antes de
       observarlas: si este archivo no corre, la pagina se ve completa igual. */
    /* ---------- las secciones entran al aparecer ----------
       🔴 El CSS las deja VISIBLES: acá se esconden con .gu-pre justo antes
       de observarlas. Si este archivo no corre, la página se ve completa
       igual en vez de dejar una sección en blanco. */
    var sel = '.gu-fi,.gu-mom,.gu-tramo';
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (!f.isIntersecting) return;
        f.target.classList.remove('gu-pre');
        f.target.classList.add('vis');
        obs.unobserve(f.target);
      });
    /* 🔴 rootMargin de 300px y threshold 0: la sección se revela ANTES de
       entrar en pantalla. Con threshold 0.2 había que tenerla ya encima para
       que apareciera, y bajando rápido con el dedo se veía el contenido a
       medio aparecer, casi invisible. Vale más que la animación se la pierda
       alguien a que el cliente vea un hueco. */
    }, { threshold: 0, rootMargin: '300px 0px 300px 0px' });
    [].forEach.call(document.querySelectorAll(sel), function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.2) { el.classList.add('vis'); return; }
      el.classList.add('gu-pre');
      obs.observe(el);
    });
  }

  var intentos = 0;
  var reloj = setInterval(function () {
    if (montar() || ++intentos > 120) {
      clearInterval(reloj);
      if (document.querySelector('.gu-hero')) animar();
    }
  }, 50);
})();
