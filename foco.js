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
          /* el número grande al fondo y la línea que los encadena: deja de
             ser texto suelto sobre negro y se lee como una secuencia */
          return '<div class="fo-paso fo-pre">' +
            '<span class="fo-paso-cifra" aria-hidden="true">' + (i + 1) + '</span>' +
            '<div class="fo-paso-n">' + ico(p[0]) + '<span>' + esc(p[1]) + '</span></div>' +
            '<h3>' + esc(p[2]) + '</h3>' +
            '<p>' + esc(p[3]) + '</p>' +
          '</div>';
        }).join('') +
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

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;
    if (cont.querySelector('.fo-hero')) return true;

    document.body.classList.add('p-foco');

    /* 🔴 EL ANCHO REAL, NO 100vw.
       Las piezas a sangre usaban width:100vw, y 100vw INCLUYE la barra de
       scroll: en este navegador son 356 px contra 348 de pantalla, así que
       la página se corría 8 px y se podía arrastrar de lado. Se veía en el
       hero y en el antes/después, con el texto cortado a la derecha.
       Acá se mide el ancho de verdad y se guarda en --fo-vw; el CSS usa esa
       variable. Se vuelve a medir al girar el teléfono.
       OJO: la guirnalda arrastra el mismo bug (también da 356 contra 348),
       pero eso se toca aparte: un cambio por vez. */
    var medirAncho = function () {
      document.documentElement.style.setProperty(
        '--fo-vw', document.documentElement.clientWidth + 'px');
    };
    medirAncho();
    window.addEventListener('resize', medirAncho);
    window.addEventListener('orientationchange', medirAncho);

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
        /* el resplandor nace donde están los LED y respira al ritmo del
           video: cuando el foco se enciende, el hero se enciende con él */
        '<div class="fo-glow" aria-hidden="true"></div>' +
        /* el haz: se abre desde los LED cuando el foco enciende */
        '<div class="fo-haz" aria-hidden="true"></div>' +
        /* el destello del sol sobre el panel: en la parte de DÍA el hero
           estaba muerto porque el resplandor y el haz solo salen de noche */
        '<div class="fo-sol" aria-hidden="true"></div>' +
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
        /* 🔴 CONTEO ASCENDENTE (James, 24-09: "ponle conteo ascendente").
           data-hasta es el número real; data-antes y data-desp son el
           símbolo y el sufijo, que no se cuentan. Los dos ceros no pueden
           "subir" a cero, así que hacen un rodillo de dígitos que aterriza
           en 0: se ve el conteo y no se afirma ninguna cifra que no sea
           dato del producto. */
        '<div class="fo-med">' +
          '<div><b data-hasta="0" data-antes="$" data-rodillo="1">$0</b><span>de cuenta de luz</span></div>' +
          '<div><b data-hasta="77">77</b><span>LED encendidos</span></div>' +
          '<div><b data-hasta="0" data-rodillo="1">0</b><span>cables que instalar</span></div>' +
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
      /* 🔴 EL ORDEN ES EL DE LA GUIRNALDA, NO UNO MÍO.
         James, 24-09: "mira la puta guirnalda" · "por qué haces lo que te
         da la gana". Tenía razón: me había inventado otro orden y había
         movido el video a un sitio donde la guirnalda no lo tiene.

         La guirnalda va así, y esto lo copia exacto:
            hero · precio · EL MOMENTO · LA CINTA · CARACTERÍSTICAS ·
            descripción (con las fotos adentro) · promo · EL VIDEO
         Aquí EL MOMENTO es el camino y LA CINTA son los tres pasos.

         🔴 EL VIDEO NO SE TOCA: se queda donde la ficha lo pone, igual que
         en la guirnalda. Moverlo fue cosa mía y por eso quedó descuadrado. */
      /* 🔴 UNA SOLA SECCIÓN DE ANTES Y DESPUÉS, Y ES LA QUE YA EXISTÍA.
         James, 24-09: "tres secciones de antes y después, ¿es para burlarte
         de mí?". Tenía toda la razón y el error fue mío de principio a fin:
         la ficha YA trae su bloque .ba-sec con la imagen prod-foco-ba
         ("EL ANTES Y DESPUÉS QUE SE NOTA"), y yo le monté encima otras dos
         con LA MISMA FOTO — el camino y las dos apiladas.
         Las dos mías se fueron. Queda la de la ficha, y se sube acá arriba,
         al sitio donde la guirnalda pone su momento. */
      var ba = cont.querySelector('.ba-sec');
      if (ba) desc.insertAdjacentElement('beforebegin', ba);

      desc.insertAdjacentHTML('beforebegin', bloqueCiclo());

      /* las fotos van DENTRO de la descripción, detrás del primer párrafo,
         exactamente como las pone la guirnalda */
      var pd = desc.querySelector('p');
      if (pd) pd.insertAdjacentHTML('afterend', bloqueFotos());
      else desc.insertAdjacentHTML('beforeend', bloqueFotos());
    }
    return true;
  }

  /* 🔴 PARALLAX DEL HERO. James: "efecto al hero".
     El video se queda atrás mientras el texto sube: el hero se hunde en
     vez de irse de golpe. Va con requestAnimationFrame y solo toca
     transform, así que no obliga al navegador a recalcular la página. */
  function parallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var hero = document.querySelector('.fo-hero');
    var vid = document.querySelector('.fo-video');
    var sobre = document.querySelector('.fo-sobre');
    if (!hero || !vid) return;
    var pidiendo = false;
    function pintar() {
      pidiendo = false;
      var y = window.scrollY;
      var alto = hero.offsetHeight;
      if (y > alto) return;                    /* fuera de pantalla: no se toca */
      var t = y / alto;                        /* 0 arriba del todo, 1 al salir */
      vid.style.transform = 'translate3d(0,' + (y * 0.32) + 'px,0) scale(' + (1 + t * 0.05) + ')';
      if (sobre) {
        sobre.style.transform = 'translate3d(0,' + (y * -0.12) + 'px,0)';
        sobre.style.opacity = String(Math.max(0, 1 - t * 1.5));
      }
    }
    window.addEventListener('scroll', function () {
      if (pidiendo) return;
      pidiendo = true;
      requestAnimationFrame(pintar);
    }, { passive: true });
    pintar();
  }

  /* 🔴 LA CASCADA ESPERA A QUE LA PÁGINA ESTÉ LISTA.
     James: "te pedí efecto de estas letras y nada". El efecto existía pero
     terminaba a los 1,6 s, mientras el video de 608 KB todavía cargaba: él
     llegaba siempre tarde y veía el texto ya asentado.

     Acá se esconde el texto (.fo-arranca) y se suelta (.fo-listo) recién
     cuando el hero tiene algo que mostrar: el primer fotograma del video,
     o el póster. Así la cascada ocurre DELANTE del cliente.

     CANDADO: el texto solo se esconde desde JavaScript, y hay un plazo de
     1,2 s que lo suelta pase lo que pase. Si el video no carga nunca, el
     título igual aparece. */
  function cascada() {
    var hero = document.querySelector('.fo-hero');
    var vid = document.querySelector('.fo-video');
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('fo-arranca');
    var soltado = false;
    function soltar() {
      if (soltado) return;
      soltado = true;
      /* dos cuadros de margen: que el navegador alcance a pintar el texto
         escondido antes de animarlo, o se salta la animación entera */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { document.body.classList.add('fo-listo'); });
      });
    }
    if (vid) {
      if (vid.readyState >= 2) soltar();
      else vid.addEventListener('loadeddata', soltar, { once: true });
    }
    setTimeout(soltar, 1200);        /* pase lo que pase, el texto aparece */
  }

  /* 🔴 EL CONTEO DE LOS TRES NÚMEROS.
     Arranca cuando la fila entra en pantalla, no al cargar: si contara
     antes, el cliente vería el número ya quieto (el mismo error que tenía
     la cascada del hero).
     El 77 sube de 0 a 77 con CountUp, que ya está cargado en la ficha.
     Los dos ceros no pueden subir a cero: hacen un rodillo de dígitos que
     frena en 0 — se ve el conteo sin afirmar ninguna cifra inventada.
     CANDADO: el número final ya está escrito en el HTML, así que si esto
     no corre se lee igual. */
  function contar() {
    var fila = document.querySelector('.fo-med');
    if (!fila || !('IntersectionObserver' in window)) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    /* 🔴 EL CONTEO SE HACE ACÁ, NO CON CountUp.
       producto.html carga lib/countup.umd.js, pero esa build NO deja nada
       en window.CountUp: al probarlo daba "undefined" y el 77 se quedaba
       quieto mientras los otros dos sí giraban. Son doce líneas y no
       depende de nadie. */
    function subir(el, hasta, antes) {
      var ini = null, dur = 1700;
      function paso(t) {
        if (ini === null) ini = t;
        var p = Math.min((t - ini) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);          /* frena al final */
        el.textContent = (antes || '') + Math.round(hasta * e);
        if (p < 1) requestAnimationFrame(paso);
        else el.textContent = (antes || '') + hasta;
      }
      requestAnimationFrame(paso);
    }

    function rodillo(el, antes) {
      var giros = 14, i = 0;
      var t = setInterval(function () {
        i++;
        el.textContent = (antes || '') + (i >= giros ? '0' : Math.floor(Math.random() * 9) + 1);
        if (i >= giros) clearInterval(t);
      }, 55);
    }

    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (!f.isIntersecting) return;
        obs.unobserve(f.target);
        f.target.querySelectorAll('b[data-hasta]').forEach(function (b, i) {
          var hasta = Number(b.getAttribute('data-hasta'));
          var antes = b.getAttribute('data-antes') || '';
          setTimeout(function () {
            if (b.getAttribute('data-rodillo')) { rodillo(b, antes); return; }
            subir(b, hasta, antes);
          }, i * 140);
        });
      });
    }, { threshold: 0.45 });
    obs.observe(fila);
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

    /* 🔴 threshold 0: basta con que ASOME. Con el 0,12 que tenía antes, al
       bajar rápido el observador no alcanzaba a dispararse y ocho bloques
       —el camino, las dos fotos apiladas, los tres pasos y las cuatro
       características— se quedaban INVISIBLES para siempre. Medido: del
       11% al 27% de la página en blanco. */
    var obs = new IntersectionObserver(function (vistas) {
      vistas.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add('fo-in');
        obs.unobserve(v.target);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0 });
    filas.forEach(function (f) { obs.observe(f); });

    /* 🔴 RED DE SEGURIDAD. Aunque el observador falle o se lo salte, esto
       barre en cada scroll y muestra todo lo que ya quedó a la vista o por
       encima. Una sección invisible es peor que una sección sin animación. */
    var pendiente = false;
    function barrer() {
      pendiente = false;
      var alto = window.innerHeight;
      var quedan = 0;
      document.querySelectorAll('.fo-pre:not(.fo-in)').forEach(function (e) {
        if (e.getBoundingClientRect().top < alto * 0.97) e.classList.add('fo-in');
        else quedan++;
      });
      if (!quedan) window.removeEventListener('scroll', pedir);
    }
    function pedir() {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(barrer);
    }
    window.addEventListener('scroll', pedir, { passive: true });
    setTimeout(barrer, 900);
  }

  /* ficha.js pinta #prod de forma asíncrona: se espera a que exista */
  var intentos = 0;
  (function esperar() {
    if (montar()) { animar(); parallax(); cascada(); contar(); return; }
    if (++intentos > 60) return;
    setTimeout(esperar, 100);
  })();
})();
