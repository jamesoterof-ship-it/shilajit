/* ============================================================
   FOCO SOLAR TIPO CÁMARA · el diseño propio, montado sobre la ficha.
   Hecho el 24-09 con el mismo molde que la guirnalda.

   Lo que pidió James, y cómo se resuelve cada cosa:
     · "hazla como la guirnalda, con un video de día y de noche"
       -> EL HERO ES UN VIDEO (img/foco-hero.mp4): arranca de día con el
          foco apagado, cae la noche y los LED se encienden. Va en bucle,
          arranca solo y no depende de que el cliente toque nada.
     · "las letras no las montes en el video, las montas después"
       -> los textos van acá en HTML, encima del video. Cambiarlos no
          obliga a rehacer el video.
     · "que vayan en la parte de ARRIBA, no en la de abajo"
       -> a diferencia de la guirnalda, que las lleva abajo, acá el
          bloque va pegado arriba y la viñeta se oscurece arriba en vez
          de abajo, para que se lean sobre el cielo.
     · "no quiero que el cliente tenga que entender nada"
       -> sin interruptor y sin nada que tocar. Se ve solo.

   El hero va A SANGRE y sin un solo border-radius (regla suya: un hero
   con esquinas redondas parece una tarjeta).

   Acento propio: azul noche + el blanco frío de los LED. La guirnalda usa
   ámbar cálido; este tiene que verse distinto para que Meta no lea los
   dos anuncios como el mismo.

   Corre DESPUÉS de ficha.js. Si el producto no es el foco se va sin hacer
   nada. No toca el encabezado (.top) ni el pie (.pie).

   OJO CON LO QUE SE AFIRMA: la ficha de productos.js dice sensor de
   movimiento, control remoto, resistente al agua y 77 LED. No se agrega
   nada que no esté ahí: ni cuántas horas dura la carga, ni metros de
   alcance, ni que grabe (NO graba, no es una cámara de verdad).
   ============================================================ */
(function () {
  'use strict';

  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'foco') return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* los tres bloques de "cómo funciona": el día, la noche y el susto */
  var CICLO = [
    ['sol', 'Todo el día', 'Se carga con el sol',
     'El panel de arriba junta sol mientras tú no estás. No va enchufado a nada, así que no le suma un peso a la cuenta de la luz.'],
    ['ojo', 'Cuando alguien pasa', 'Se enciende solo',
     'El sensor de movimiento lo prende de golpe con los 77 LED al máximo. No hay que salir a encender nada ni acordarse de apagarlo.'],
    ['escudo', 'Y el que venía', 'Se devuelve',
     'Tiene forma de cámara de vigilancia. No graba, pero el que se estaba acercando no lo sabe: ve la luz encima y la cámara apuntándolo.'],
  ];

  var CAPS = [
    ['sol',  'Energía solar',        'Sin enchufe ni cuenta de luz'],
    ['ojo',  'Sensor de movimiento', 'Se enciende cuando alguien pasa'],
    ['agua', 'Resiste la lluvia',    'Hecho para estar afuera'],
    ['llave','Control remoto',       'Incluido en la caja'],
  ];

  /* Las fotos que ya estaban hechas para este producto. Los textos salen de
     lo que se ve EN cada una, no de lo que a mí se me ocurra:
       prod-foco    -> la casa de noche con el foco encendido y los cuatro sellos
       prod-foco-2  -> el sol cargando el panel, y la caja del proveedor
       prod-foco-3  -> las medidas y los dos giros del soporte */
  var FOTOS = [
    ['img/prod-foco.webp?v=1',
     'El foco solar encendido en la pared de una casa de noche, con el detalle de los LED, el sensor y el control remoto',
     'Lo que hace', 'Alumbra la entrada completa',
     'Los LED se encienden juntos y el chorro de luz cubre el frente de la casa. Abajo, el sensor de movimiento y el control remoto que viene en la caja.'],
    ['img/prod-foco-2.webp?v=1',
     'El panel solar del foco recibiendo el sol, junto a la caja del producto que indica 77 SMD LED',
     'De dónde sale la luz', 'El sol de todo el día, guardado',
     'El panel de arriba carga mientras tú no estás. No se enchufa a la corriente: por eso no le suma nada a la cuenta de la luz.'],
    ['img/prod-foco-3.webp?v=1',
     'Medidas del foco: 20 cm de largo, 8 de alto y 11 de profundidad, y el soporte que gira 360 grados y se inclina 90',
     'Dónde lo pones', '20 cm que apuntan a donde quieras',
     'El soporte gira 360° de lado a lado y se inclina 90° arriba y abajo. Lo atornillas donde te sirva y lo dejas apuntando a la puerta, al portón o al pasaje.'],
  ];

  var ICONOS = {
    sol:    '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    ojo:    '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
    escudo: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5z"/><path d="m9 12 2 2 4-4"/>',
    agua:   '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    llave:  '<rect x="6" y="2.5" width="12" height="19" rx="3"/><circle cx="10" cy="8" r="1.1"/><circle cx="14" cy="8" r="1.1"/><circle cx="10" cy="12" r="1.1"/><circle cx="14" cy="12" r="1.1"/><circle cx="12" cy="17" r="1.3"/>',
  };

  function ico(k) {
    return '<svg class="fo-ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONOS[k] || '') + '</svg>';
  }

  /* ---------- el ciclo: día → sensor → disuasión ---------- */
  function bloqueCiclo() {
    return '<section class="fo-sec fo-oscura fo-ciclo">' +
      '<span class="fo-rot">Cómo trabaja, sin que hagas nada</span>' +
      '<h2 class="fo-h2">Se encarga solo,<em>de día y de noche.</em></h2>' +
      '<div class="fo-pasos">' +
        CICLO.map(function (p, i) {
          return '<div class="fo-paso fo-pre">' +
            '<div class="fo-paso-n">' + ico(p[0]) + '<span>' + esc(p[1]) + '</span></div>' +
            '<h3>' + esc(p[2]) + '</h3>' +
            '<p>' + esc(p[3]) + '</p>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  /* ---------- las dos fotos, lado a lado ----------
     La misma esquina, la misma casa: apagado de día y encendido de noche.
     Es la prueba de lo que el video ya mostró arriba. */
  function bloqueParDiaNoche() {
    return '<section class="fo-sec fo-oscura">' +
      '<span class="fo-rot">La misma esquina</span>' +
      '<h2 class="fo-h2">De día no molesta.<em>De noche no pasa nadie.</em></h2>' +
      '<div class="fo-par">' +
        '<figure class="fo-pre">' +
          '<img src="img/foco-dia.webp?v=1" alt="El foco solar apagado en la esquina de la casa, a plena luz del día, con el panel solar recibiendo el sol" loading="lazy">' +
          '<figcaption><b>Mediodía</b>Cargando en silencio</figcaption>' +
        '</figure>' +
        '<figure class="fo-pre">' +
          '<img src="img/foco-noche.webp?v=1" alt="El mismo foco de noche con los LED encendidos iluminando la entrada de la casa" loading="lazy">' +
          '<figcaption><b>Once de la noche</b>Alguien se acercó</figcaption>' +
        '</figure>' +
      '</div>' +
    '</section>';
  }

  /* ---------- las fichas grandes con las fotos del producto ----------
     Mismo patrón que la guirnalda: foto a sangre y el texto debajo,
     entrando de a una mientras el cliente baja. */
  function bloqueFotos() {
    return '<div class="fo-fichas fo-oscura">' + FOTOS.map(function (f, i) {
      return '<figure class="fo-fi fo-pre" style="--i:' + i + '">' +
        '<img src="' + f[0] + '" alt="' + esc(f[1]) + '" loading="lazy" width="900" height="900">' +
        '<figcaption>' +
          '<span class="fo-rot">' + esc(f[2]) + '</span>' +
          '<b>' + esc(f[3]) + '</b>' +
          '<p>' + esc(f[4]) + '</p>' +
        '</figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  /* ---------- las cuatro características ---------- */
  function bloqueCaps() {
    return '<section class="fo-sec fo-oscura">' +
      '<div class="fo-caps">' +
        CAPS.map(function (c) {
          return '<div class="fo-cap fo-pre">' + ico(c[0]) +
            '<b>' + esc(c[1]) + '</b><span>' + esc(c[2]) + '</span></div>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;
    if (cont.querySelector('.fo-hero')) return true;

    document.body.classList.add('p-foco');

    /* la display. Va acá y no en el HTML para no cargarla en las otras
       fichas, que no la usan. Condensada y firme: el foco es seguridad,
       no es la serif romántica de la guirnalda. */
    if (!document.getElementById('fo-fuente')) {
      var l = document.createElement('link');
      l.id = 'fo-fuente';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&display=swap';
      document.head.appendChild(l);
    }

    var html =
      /* 🔴 EL HERO ES UN VIDEO, igual que en la guirnalda: arranca solo,
         va en bucle y el cambio de día a noche se ve siempre, sin que el
         cliente tenga que tocar ni entender nada.
         Los TEXTOS NO van quemados en el video: van acá, encima, y ARRIBA
         (la guirnalda los lleva abajo; esto es lo que él pidió cambiar). */
      '<div class="fo-hero">' +
        '<video class="fo-video" autoplay muted loop playsinline preload="auto"' +
          ' poster="img/foco-hero-poster.webp?v=1"' +
          ' aria-label="La misma casa de día y de noche: el foco se carga con el sol y al oscurecer se enciende e ilumina la entrada">' +
          '<source src="img/foco-hero.mp4?v=1" type="video/mp4">' +
        '</video>' +
        '<div class="fo-vineta" aria-hidden="true"></div>' +
        /* 🔴 LAS LETRAS ENTRAN EN CASCADA. James: "que lleguen en cascada".
           Cada pieza tiene su propio retardo (--d) y sube sola al cargar.
           El h1 se parte en dos líneas que entran una detrás de la otra. */
        '<div class="fo-sobre">' +
          '<span class="fo-rot fo-casc" style="--d:.15s">Se carga con el sol · 77 LED · sensor de movimiento</span>' +
          '<h1 class="fo-h1">' +
            '<span class="fo-casc" style="--d:.34s">Tu entrada iluminada,</span>' +
            '<em class="fo-casc" style="--d:.52s">sin pagar luz.</em>' +
          '</h1>' +
          '<p class="fo-frase fo-casc" style="--d:.74s">De día se carga con el sol. De noche se enciende cuando alguien se acerca. Y como parece una cámara, nadie se acerca dos veces.</p>' +
        '</div>' +
      '</div>' +
      '<section class="fo-sec fo-oscura">' +
        '<p class="fo-sub">Un foco solar con forma de cámara de seguridad, para dejar puesto afuera. El panel se carga con el sol, así que no se enchufa a la corriente y no te sube la cuenta de la luz. Se atornilla a la pared y no necesitas electricista.</p>' +
        '<div class="fo-med">' +
          '<div><b>$0</b><span>de cuenta de luz</span></div>' +
          '<div><b>77</b><span>LED encendidos</span></div>' +
          '<div><b>0</b><span>cables que instalar</span></div>' +
        '</div>' +
      '</section>';

    arriba.insertAdjacentHTML('beforebegin', html);
    /* la galería cuadrada de la ficha sobra: el hero ya muestra el producto */
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    var sec = cont.querySelector('.fo-sec');
    if (sec) sec.insertAdjacentElement('afterend', arriba);

    var desc = cont.querySelector('section.desc');
    if (desc) {
      /* orden: primero CÓMO trabaja, después la PRUEBA de las dos fotos,
         al final las características. Nunca pegados al precio: ahí la
         ficha ya pone su botón y quedarían dos botones seguidos. */
      /* 🔴 EL VIDEO VA PRIMERO. James, 24-09: "¿dónde está el video?" — y
         tenía razón: la ficha lo deja en su sitio de siempre, que en esta
         página caía al 41% (6.065 px de scroll). Nadie baja tanto.
         Ahora va apenas pasa el precio: el cliente ve cuánto vale, y lo
         primero que encuentra después es el video real del foco. */
      var vid = cont.querySelector('.vid-wrap');
      if (vid) desc.insertAdjacentElement('beforebegin', vid);

      desc.insertAdjacentHTML('beforebegin', bloqueCiclo());
      desc.insertAdjacentHTML('beforebegin', bloqueParDiaNoche());
      desc.insertAdjacentHTML('beforebegin', bloqueFotos());
      desc.insertAdjacentHTML('beforebegin', bloqueCaps());
    }
    return true;
  }

  function animar() {
    /* El hero no necesita JavaScript: es un video que corre solo. Esto es
       solo la entrada de las secciones al aparecer.
       🔴 El CSS las deja VISIBLES: acá se esconden con .fo-pre justo antes
       de observarlas. Si este archivo no corre, la página se ve completa
       igual en vez de dejar una sección en blanco. */
    if (!('IntersectionObserver' in window)) return;
    var filas = document.querySelectorAll('.fo-pre');
    if (!filas.length) return;
    document.body.classList.add('fo-anima');
    var obs = new IntersectionObserver(function (vistas) {
      vistas.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add('fo-in');
        obs.unobserve(v.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    filas.forEach(function (f) { obs.observe(f); });
  }

  /* ficha.js pinta #prod de forma asíncrona: se espera a que exista */
  var intentos = 0;
  (function esperar() {
    if (montar()) { animar(); return; }
    if (++intentos > 60) return;
    setTimeout(esperar, 100);
  })();
})();
