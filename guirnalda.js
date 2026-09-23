/* ============================================================
   GUIRNALDA SOLAR · el diseño propio, montado sobre la ficha. 22-09.

   Corre DESPUES de ficha.js. Si el producto no es la guirnalda se va
   sin hacer nada, así que los otros doce quedan igual que siempre.
   No toca el encabezado (.top) ni el pie (.pie): viven fuera de #prod
   y acá ni se nombran. Es la regla de James.

   LOS ANGULOS, en el orden en que atacan (James, 22-09: "ojo con los
   angulos que vas a atacar"):
     1. EL MOMENTO -> nadie se queda en un patio a oscuras. Es el que
        vende: no se compra una guirnalda, se compra la juntada.
     2. CERO CUENTA DE LUZ -> funciona con sol, sin enchufe.
     3. DIEZ METROS DE VERDAD -> la duda real del que compra, que
        ningun competidor le responde.
     4. AGUANTA AFUERA TODO EL ANO -> IP65.

   Lo que hace:
     1. pone el HERO QUE ATARDECE arriba de la cabecera: la misma
        terraza de día y de noche, y la de noche va apareciendo con el
        scroll mientras las diez ampolletas de la tira se encienden
     2. mete la bajada y los tres números (10 m · 10 ampolletas · $0 luz)
     3. la seccion del MOMENTO, con la pieza de antes y despues
     4. la seccion nueva CUANTO SON DIEZ METROS, con la regla a escala
     5. convierte «Qué es y para qué sirve» en tres tarjetas con las
        fotos de sección
     6. pone las cuatro cápsulas: solar · IP65 · LED · instalación

   Lo demás de la ficha -promo, reseñas, preguntas y el formulario-
   sigue tal cual, para no romper la compra.

   OJO: NO se afirma en ningún lado que se encienda sola al anochecer ni
   cuántas horas de luz da. Eso no está confirmado con el proveedor.
   ============================================================ */
(function () {
  'use strict';

  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'guirnalda') return;

  var AMPOLLETAS = 10;

  /* las tres fotos SON «Qué es y para qué sirve». Cada pie cuenta algo
     que la foto no trae escrito, para no decir dos veces lo mismo. */
  var FOTOS = [
    ['img/gui-sec-pack.webp?v=1',
     'Guirnalda solar de diez ampolletas tipo Edison junto a su panel solar y la estaca, sobre una mesa de madera',
     'Qué llega', 'La guirnalda, el panel y la estaca',
     'Eso es todo lo que trae la caja, y es todo lo que necesita: no lleva enchufe, ni alargador, ni herramientas.'],
    ['img/gui-sec-ampolleta.webp?v=1',
     'Primer plano de tres ampolletas tipo Edison encendidas con luz ámbar cálida',
     'La luz', 'Cálida, no blanca de hospital',
     'Ampolletas tipo Edison con el filamento a la vista. La luz sale ámbar, del color que hace que un patio se vea acogedor y no como una bodega.'],
    ['img/gui-sec-panel.webp?v=1',
     'Panel solar negro clavado con su estaca en el pasto de un jardín',
     'De dónde sale la energía', 'El panel va donde le dé el sol',
     'Se clava en la tierra o en una maceta, apuntando a donde pega el sol la mayor parte del día. El cable llega hasta la guirnalda y no queda nada a la vista.'],
  ];

  /* la regla a escala: contra cosas que el cliente tiene en su casa */
  var REGLA = [
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

  function tira() {
    var s = '';
    /* --n es el turno de cada ampolleta: el CSS lo usa para que se
       enciendan en secuencia y no todas de golpe */
    for (var i = 0; i < AMPOLLETAS; i++) s += '<i style="--n:' + i + '"></i>';
    /* aria-hidden: es decoración y a la vez avance; el lector de pantalla
       no gana nada leyendo diez puntos */
    return '<div class="gu-tira" aria-hidden="true">' + s + '</div>';
  }

  function bloqueFotos() {
    return '<div class="gu-fichas">' + FOTOS.map(function (f, i) {
      return '<figure class="gu-fi" style="--i:' + i + '">' +
        '<img src="' + f[0] + '" alt="' + esc(f[1]) + '" loading="lazy" width="1000" height="1000">' +
        '<figcaption>' +
          '<span class="gu-rot2">' + esc(f[2]) + '</span>' +
          '<b>' + esc(f[3]) + '</b>' +
          '<p>' + esc(f[4]) + '</p>' +
        '</figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  /* EL ANGULO QUE VENDE. El patio a oscuras donde nadie se queda, y el
     mismo patio con luz donde la gente se queda hasta tarde. La pieza de
     James ya lo dice con imagen; acá solo se le pone el marco. */
  function bloqueMomento() {
    return '<section class="gu-mom">' +
      '<span class="gu-rot">El antes y el después</span>' +
      '<h2 class="gu-h2">Nadie se queda en un patio a oscuras.</h2>' +
      '<p class="gu-sub">Es la misma mesa, la misma gente y la misma noche. Lo único que cambia es que hay luz, y con luz la junta no se corta a las nueve.</p>' +
      '<img src="img/gui-sec-antes.webp?v=1" width="1080" height="1320" loading="lazy"' +
        ' alt="La misma terraza con amigos en la mesa: a oscuras sin iluminación, y después con la guirnalda solar encendida">' +
    '</section>';
  }

  function bloqueRegla() {
    return '<section class="gu-blq">' +
      '<span class="gu-rot">Lo que nadie te dice</span>' +
      '<h2 class="gu-h2">¿Cuánto son diez metros?</h2>' +
      '<p class="gu-sub">Es la duda de todos antes de comprar. Diez metros no es un número: es cruzar una terraza completa de lado a lado, y que todavía te sobre cable.</p>' +
      '<div class="gu-regla">' +
        REGLA.map(function (r) {
          return '<div class="gu-fila' + (r[3] ? ' gu-mia' : '') + '">' +
            '<div class="gu-et"><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></div>' +
            '<div class="gu-barra"><i style="--w:' + r[2] + '%"></i></div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  function bloqueCaps() {
    return '<div class="gu-caps">' + CAPS.map(function (c) {
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
    if (!arriba) return false;                        /* ficha.js todavía no pintó */
    if (cont.querySelector('.gu-hero')) return true;  /* ya estaba puesto */

    document.body.classList.add('p-guirnalda');

    /* La de DÍA va primero y la de NOCHE encima: así el navegador pinta la
       de día de una y la de noche entra por opacidad, sin reflow. Las dos
       llevan width/height para que no salte el layout al cargar. */
    var html =
      '<div class="gu-hero">' +
        '<img src="img/guirnalda-dia.webp?v=1" width="1024" height="1536" fetchpriority="high"' +
          ' alt="Terraza con la guirnalda de diez ampolletas colgada de la pérgola, de día y apagada">' +
        '<img class="gu-noche-img" src="img/guirnalda-noche.webp?v=1" width="1024" height="1536" fetchpriority="high"' +
          ' alt="La misma terraza de noche, con las diez ampolletas encendidas con luz cálida">' +
        '<div class="gu-glow" aria-hidden="true"></div>' +
        '<div class="gu-barrido" aria-hidden="true"></div>' +
        tira() +
        '<div class="gu-sobre">' +
          '<span class="gu-rot">Diez metros · diez ampolletas · energía solar</span>' +
          '<h1 class="gu-h1">Tu patio de noche,<em>por fin.</em></h1>' +
        '</div>' +
      '</div>' +
      '<p class="gu-bajada">Diez metros de cable con diez ampolletas tipo Edison de luz cálida, para dejar puestas afuera. El panel solar se clava donde le dé el sol y se carga de día: no se enchufa a la corriente, así que no te sube la cuenta de la luz. Es IP65, hecha para aguantar la lluvia todo el año.</p>' +
      '<div class="gu-med">' +
        '<div><b>10</b><span>metros de largo</span></div>' +
        '<div><b>10</b><span>ampolletas cálidas</span></div>' +
        '<div><b>$0</b><span>de cuenta de luz</span></div>' +
      '</div>';

    /* El hero va ARRIBA de la cabecera, y la galería se va: sus fotos ya
       están en el hero y en las tarjetas, así ninguna se ve dos veces.
       La cabecera se queda entera -estrellas, nombre y precio tachado-
       porque de ahí sale el botón de compra. */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    var med = cont.querySelector('.gu-med');
    if (med) med.insertAdjacentElement('afterend', arriba);

    /* Las secciones NO pueden quedar pegadas bajo el precio: ahí la ficha
       ya pone su botón y quedarían dos botones seguidos, que es regla
       rota. Se bajan hasta justo antes de la descripción, y en el orden de
       los ángulos: primero el POR QUÉ (el momento), después el CUÁNTO (los
       diez metros) y al final el CÓMO (las cápsulas). */
    var desc = cont.querySelector('section.desc');
    if (desc) {
      /* insertAdjacentHTML('beforebegin') respeta el orden de inserción, así
         que acá van en el orden en que se leen: el momento primero. */
      desc.insertAdjacentHTML('beforebegin', bloqueMomento());
      desc.insertAdjacentHTML('beforebegin', bloqueRegla());
      desc.insertAdjacentHTML('beforebegin', bloqueCaps());
      /* «Qué es y para qué sirve» pasa a ser las tres tarjetas */
      var p = desc.querySelector('p');
      if (p) p.insertAdjacentHTML('afterend', bloqueFotos());
      else desc.insertAdjacentHTML('beforeend', bloqueFotos());
    }
    return true;
  }

  /* ---------- el atardecer ----------
     Una sola función atada al scroll, con rAF, para no hacer trabajo por
     cada evento. Lee y escribe en el mismo cuadro: nada de layout
     thrashing. */
  function animar() {
    var hero = document.querySelector('.gu-hero');
    if (!hero) return;
    var noche = hero.querySelector('.gu-noche-img');
    var puntos = [].slice.call(hero.querySelectorAll('.gu-tira i'));
    var pedido = false;
    var lento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- SE ENCIENDE SOLA AL ABRIR ----------
       James, 22-09: "ponle efecto al hero". El que abre la ficha y no baja
       tiene que ver alumbrar igual. Durante los primeros 2,2 s manda esta
       animación: el patio pasa de día a noche, las diez ampolletas prenden
       en secuencia y un destello recorre la guirnalda. Después suelta el
       mando al scroll. Si el cliente baja antes, se corta y no estorba. */
    var arrancando = !lento;
    var t0 = 0;

    /* deja el hero encendido del todo, sin animar. Es el estado final y el
       que vale: la ficha nunca puede quedarse a medio prender. */
    function encendidoTotal() {
      arrancando = false;
      if (noche) noche.style.setProperty('--gu-cae', '1');
      for (var i = 0; i < puntos.length; i++) puntos[i].classList.add('on');
    }

    function prender(ahora) {
      if (!t0) t0 = ahora;
      var t = Math.min(1, (ahora - t0) / 2200);
      /* ease-out: prende rápido y asienta lento, como una lámpara de verdad */
      var e = 1 - Math.pow(1 - t, 3);
      if (noche) noche.style.setProperty('--gu-cae', (0.35 + e * 0.65).toFixed(3));
      var n = Math.round(e * AMPOLLETAS);
      for (var i = 0; i < puntos.length; i++) puntos[i].classList.toggle('on', i < n);
      if (t < 1 && arrancando) requestAnimationFrame(prender);
      else { arrancando = false; pintar(); }
    }

    /* 🔴 22-09, visto EN VIVO y no en local: el hero se quedaba de DÍA, con
       cero ampolletas. requestAnimationFrame NO corre mientras la pestaña
       está en segundo plano, así que si el cliente abre la ficha y mira otra
       cosa un segundo, el encendido nunca terminaba y quedaba congelado en el
       0.35 del arranque. Y como `arrancando` seguía en true, `pintar` se iba
       sin hacer nada y el scroll tampoco lo salvaba.
       Dos redes: si la pestaña arranca oculta ni se intenta animar, y pase lo
       que pase, a los 2,8 s el hero queda encendido igual. */
    if (document.hidden) arrancando = false;
    setTimeout(function () { if (arrancando) { encendidoTotal(); pintar(); } }, 2800);

    function pintar() {
      pedido = false;
      if (arrancando) return;   /* el encendido manda hasta que termine */
      var alto = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.pageYOffset || document.documentElement.scrollTop;

      /* ya quedó de noche al abrir: de acá en adelante el scroll solo
         termina de asentarla, nunca la devuelve al día */
      var caida = Math.min(1, y / (window.innerHeight * 1.5));
      if (noche) noche.style.setProperty('--gu-cae', Math.max(0.92, 0.35 + caida * 0.65).toFixed(3));

      /* las ampolletas sí marcan el avance de TODA la página */
      var avance = alto > 0 ? Math.min(1, y / alto) : 1;
      var encendidas = Math.max(AMPOLLETAS, Math.round(avance * AMPOLLETAS));
      for (var i = 0; i < puntos.length; i++) {
        puntos[i].classList.toggle('on', i < encendidas);
      }
    }

    function alScroll() {
      /* si el cliente baja mientras prende, el encendido se corta: mandan
         sus dedos, no la animación */
      if ((window.pageYOffset || 0) > 40) arrancando = false;
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(pintar);
    }

    window.addEventListener('scroll', alScroll, { passive: true });
    window.addEventListener('resize', alScroll, { passive: true });

    hero.classList.add('gu-lista');         /* el CSS ya puede esconder el título */
    if (arrancando) {
      /* un respiro para que las dos fotos estén pintadas antes de cruzarlas */
      setTimeout(function () {
        if (!arrancando) return;
        hero.classList.add('gu-prendida');  /* dispara resplandor y destello */
        requestAnimationFrame(prender);
      }, 220);
    } else {
      hero.classList.add('gu-prendida');
      encendidoTotal();                     /* nada de quedarse a medio prender */
      pintar();
    }

    /* si la pestaña estaba oculta y el cliente vuelve a ella, que la
       encuentre encendida, no a medias */
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && arrancando) { encendidoTotal(); pintar(); }
    });

    /* La regla, el momento y las tarjetas entran al aparecer.
       🔴 El CSS las deja VISIBLES: acá se esconden con .gu-pre justo antes de
       observarlas, y solo si hay IntersectionObserver. Así, si este archivo no
       corre o el navegador es viejo, la página se ve completa igual en vez de
       dejar una sección en blanco. Si algo ya está en pantalla al cargar, se
       marca visible de inmediato y no se esconde nunca. */
    var sel = '.gu-blq,.gu-fi,.gu-mom';
    if (!('IntersectionObserver' in window)) return;

    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (!f.isIntersecting) return;
        f.target.classList.remove('gu-pre');
        f.target.classList.add('vis');
        obs.unobserve(f.target);
      });
    }, { threshold: 0.22 });

    [].forEach.call(document.querySelectorAll(sel), function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) { el.classList.add('vis'); return; }
      el.classList.add('gu-pre');
      obs.observe(el);
    });
  }

  /* ficha.js pinta de forma asíncrona: se reintenta hasta que aparezca
     .arriba2, y se corta a los 6 segundos para no dejar un timer vivo. */
  var intentos = 0;
  var reloj = setInterval(function () {
    if (montar() || ++intentos > 120) {
      clearInterval(reloj);
      if (document.querySelector('.gu-hero')) animar();
    }
  }, 50);
})();
