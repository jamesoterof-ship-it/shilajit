/* ============================================================
   FOCO SOLAR TIPO CÁMARA · diseño propio, montado sobre la ficha.
   REHECHO el 25-09 desde cero ("hazlo bien, que no quede pesada,
   organízala bien, efectos buenos, letras diferentes, no siempre lo mismo").

   CONCEPTO: "modo vigilancia". El foco parece una cámara de seguridad, así
   que la página se ve como el visor de una: esquinas de encuadre, un
   indicador de sensor, letra técnica (Chakra Petch) y efectos que cuentan
   lo que el producto hace:
     · hero      -> EL MISMO VIDEO día→noche (a James le gusta, no se toca).
                    Encima: marco de visor, rótulo que se decodifica y el
                    título que entra por máscara, línea por línea.
     · cifras    -> conteo ascendente (lo pidió el 24-09).
     · pasos     -> una línea de tiempo que se ENCIENDE mientras bajas.
     · antes/dsp -> el barrido del sensor la recorre una vez.
     · lo que trae -> tarjetas con un haz de linterna que sigue el dedo.
     · fotos     -> se abren como un obturador.

   ORDEN (parecido a la guirnalda, sin ser idéntico):
     hero · cifras · precio · cómo trabaja · antes/después · botón ·
     lo que trae · descripción (con las fotos) · promo · video · formulario
   Reglas de James que se mantienen: hero a sangre y sin radio, textos
   ARRIBA, un solo antes/después (el de la ficha), el botón suelto entre
   el antes/después y lo que sigue, tarjetas que NO van de borde a borde.

   LO QUE SE AFIRMA sale de productos.js: 77 LED, sensor de movimiento,
   control remoto, resistente al agua, energía solar, se instala sin
   electricista. NO graba (no es una cámara de verdad): por eso el visor
   no lleva "REC" ni nada que sugiera grabación.

   Candado de siempre: TODO se ve aunque este archivo falle. Lo que se
   anima se esconde recién acá, justo antes de observarlo.
   ============================================================ */
(function () {
  'use strict';

  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'foco') return;

  var QUIETO = false;
  try { QUIETO = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var CICLO = [
    ['sol', 'De día', 'Se carga con el sol',
     'El panel de arriba junta sol mientras tú no estás. No va enchufado a nada, así que no le suma un peso a la cuenta de la luz.'],
    ['ojo', 'Cuando alguien pasa', 'Se enciende solo',
     'El sensor de movimiento lo prende de golpe con los 77 LED. No hay que salir a encender nada ni acordarse de apagarlo.'],
    ['escudo', 'Y el que venía', 'Se devuelve',
     'Tiene forma de cámara de vigilancia. No graba, pero el que se estaba acercando no lo sabe: ve la luz encima y la cámara apuntándolo.'],
  ];

  var FOTOS = [
    ['img/prod-foco.webp?v=2',
     'El foco solar encendido en la pared de una casa de noche, con el detalle de los LED, el sensor y el control remoto',
     'Lo que hace', 'Alumbra la entrada completa',
     'Los LED se encienden juntos y el chorro de luz cubre el frente de la casa. Abajo, el sensor de movimiento y el control remoto que viene en la caja.'],
    ['img/prod-foco-2.webp?v=2',
     'El panel solar del foco recibiendo el sol, junto a la caja del producto',
     'De dónde sale la luz', 'El sol de todo el día, guardado',
     'El panel de arriba carga mientras tú no estás. No se enchufa a la corriente: por eso no le suma nada a la cuenta de la luz.'],
    ['img/prod-foco-3.webp?v=2',
     'Medidas del foco: 20 cm de largo, 8 de alto y 11 de profundidad, y el soporte que gira 360 grados y se inclina 90',
     'Dónde lo pones', '20 cm que apuntan a donde quieras',
     'El soporte gira 360° de lado a lado y se inclina 90° arriba y abajo. Lo atornillas donde te sirva y lo dejas apuntando a la puerta, al portón o al pasaje.'],
  ];

  var ICONOS = {
    sol:    '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    ojo:    '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
    escudo: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5z"/><path d="m9 12 2 2 4-4"/>',
    agua:   '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    llave:  '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1z"/>',
    led:    '<rect x="3" y="6" width="18" height="12" rx="3"/><circle cx="8" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="16" cy="12" r="1.3"/>',
  };
  function ico(k) {
    return '<svg class="fo-ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONOS[k] || ICONOS.led) + '</svg>';
  }
  /* el icono sale de lo que dice la tarjeta, no del orden */
  function icoDe(t) {
    t = t.toLowerCase();
    if (t.indexOf('led') >= 0 || t.indexOf('sensor') >= 0) return 'led';
    if (t.indexOf('solar') >= 0 || t.indexOf('sol ') >= 0) return 'sol';
    if (t.indexOf('cámara') >= 0 || t.indexOf('camara') >= 0) return 'escudo';
    if (t.indexOf('agua') >= 0) return 'agua';
    if (t.indexOf('instala') >= 0 || t.indexOf('electricista') >= 0) return 'llave';
    return 'led';
  }

  /* un solo elemento dibuja las cuatro esquinas del visor (CSS) */
  var MIRA = '<span class="fo-mira" aria-hidden="true"></span>';

  /* el título: líneas con máscara y palabras que caen en cascada.
     Una línea que termina en 1 va en el color de acento. */
  function cascada(lineas, ini, paso) {
    var n = 0;
    return lineas.map(function (l) {
      var acento = l[l.length - 1] === 1;
      var pals = l.filter(function (w) { return w !== 1; }).map(function (w) {
        return '<span class="fo-pal" style="--d:' + (ini + paso * n++).toFixed(2) + 's">' + esc(w) + '</span>';
      }).join(' ');
      return '<span class="fo-ln">' + (acento ? '<em>' + pals + '</em>' : pals) + '</span>';
    }).join('');
  }
  /* la frase: palabra por palabra, más rápido y más suave que el título */
  function palabras(txt, ini, paso) {
    return txt.split(' ').map(function (w, i) {
      return '<span class="fo-pw" style="--d:' + (ini + paso * i).toFixed(2) + 's">' + esc(w) + '</span>';
    }).join(' ');
  }

  /* ---------------- HERO ---------------- */
  function hero() {
    var chispas = '';
    for (var i = 0; i < 16; i++) {
      chispas += '<i style="--x:' + (Math.random() * 100).toFixed(1) + '%;--y:' +
        (30 + Math.random() * 64).toFixed(1) + '%;--t:' + (1.8 + Math.random() * 3).toFixed(2) +
        's;--r:' + (Math.random() * 4).toFixed(2) + 's;--s:' + (1 + Math.random() * 1.6).toFixed(2) + '"></i>';
    }
    return '<div class="fo-hero">' +
      /* preload="none": primero el póster, el video llega cuando la página ya cargó */
      '<video class="fo-video" autoplay muted loop playsinline preload="none"' +
        ' poster="img/foco-hero-poster.webp?v=1"' +
        ' aria-label="La misma casa de día y de noche: el foco se carga con el sol y al oscurecer se enciende e ilumina la entrada">' +
        '<source src="img/foco-hero.mp4?v=3" type="video/mp4">' +
      '</video>' +
      '<div class="fo-glow" aria-hidden="true"></div>' +
      '<div class="fo-haz" aria-hidden="true"></div>' +
      '<div class="fo-sol" aria-hidden="true"></div>' +
      '<div class="fo-chispas" aria-hidden="true">' + chispas + '</div>' +
      '<div class="fo-vineta" aria-hidden="true"></div>' +
      /* el visor: esquinas + la barra de estado de arriba */
      '<div class="fo-visor" aria-hidden="true">' + MIRA +
        '<span class="fo-estado"><i></i>Sensor activo</span>' +
        '<span class="fo-estado fo-der">77 LED · solar</span>' +
      '</div>' +
      '<div class="fo-sobre">' +
        '<span class="fo-rot fo-deco" data-txt="Se carga con el sol · se enciende solo">Se carga con el sol · se enciende solo</span>' +
        /* 🔴 CASCADA (James 25-09: "las letras tienen que entrar de cascada").
           Cada PALABRA cae desde arriba dentro de su línea, una detrás de otra. */
        '<h1 class="fo-h1">' +
          cascada([['Tu', 'entrada'], ['iluminada,'], ['sin', 'pagar', 'luz.', 1]], 0.2, 0.11) +
        '</h1>' +
        '<p class="fo-frase">' + palabras('De día se carga con el sol. De noche se enciende cuando alguien se acerca. Y como parece una cámara, nadie se acerca dos veces.', 0.95, 0.025) + '</p>' +
      '</div>' +
      '<a class="fo-baja" href="#fo-cifras" aria-label="Bajar a ver el foco"><span></span></a>' +
    '</div>' +
    '<section class="fo-sec fo-oscura fo-cifras" id="fo-cifras">' +
      '<p class="fo-intro">Un foco con forma de cámara de seguridad: 77 LED, sensor de movimiento y panel solar. Se instala en la pared sin cables ni electricista, y trae control remoto.</p>' +
      '<div class="fo-med">' +
        '<div>' + MIRA + '<b data-hasta="0" data-antes="$" data-rodillo="1">$0</b><span>de cuenta de luz</span></div>' +
        '<div>' + MIRA + '<b data-hasta="77">77</b><span>LED encendidos</span></div>' +
        '<div>' + MIRA + '<b data-hasta="0" data-rodillo="1">0</b><span>cables que instalar</span></div>' +
      '</div>' +
    '</section>';
  }

  /* ---------------- CÓMO TRABAJA: la línea de tiempo ---------------- */
  function bloqueCiclo() {
    return '<section class="fo-sec fo-oscura fo-ciclo">' +
      '<span class="fo-rot">Cómo trabaja, sin que hagas nada</span>' +
      '<h2 class="fo-h2">Se encarga solo, <em>de día y de noche.</em></h2>' +
      '<div class="fo-linea">' +
        '<span class="fo-riel" aria-hidden="true"><i></i></span>' +
        '<ol class="fo-pasos">' +
        CICLO.map(function (p, i) {
          return '<li class="fo-paso">' +
            '<span class="fo-nodo" aria-hidden="true">' + ico(p[0]) + '</span>' +
            '<span class="fo-paso-n">0' + (i + 1) + ' · ' + esc(p[1]) + '</span>' +
            '<h3>' + esc(p[2]) + '</h3>' +
            '<p>' + esc(p[3]) + '</p>' +
          '</li>';
        }).join('') +
        '</ol>' +
      '</div>' +
    '</section>';
  }

  /* ---------------- LO QUE TRAE: tarjetas con linterna ---------------- */
  function bloqueTrae(puntos) {
    return '<section class="fo-sec fo-oscura fo-trae">' +
      '<span class="fo-rot">Lo que trae</span>' +
      '<h2 class="fo-h2">Todo esto, <em>en un solo aparato.</em></h2>' +
      '<p class="fo-pista">Pasa el dedo por las tarjetas</p>' +
      '<div class="fo-grid">' +
        puntos.map(function (t, i) {
          var p = t.split(/:\s|\s·\s/);
          var tit = p[0], sub = p.slice(1).join(' · ');
          return '<button type="button" class="fo-tar fo-rev" style="--i:' + i + '">' +
            '<span class="fo-tar-ico">' + ico(icoDe(t)) + '</span>' +
            '<b>' + esc(tit) + '</b>' +
            (sub ? '<span class="fo-tar-sub">' + esc(sub) + '</span>' : '') +
          '</button>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  /* ---------------- LAS FOTOS: obturador ---------------- */
  function bloqueFotos() {
    return '<div class="fo-fichas">' + FOTOS.map(function (f) {
      return '<figure class="fo-fi fo-rev">' +
        '<div class="fo-foto">' +
          '<img src="' + f[0] + '" alt="' + esc(f[1]) + '" loading="lazy" width="900" height="900">' +
          MIRA +
          '<span class="fo-obt" aria-hidden="true"></span>' +
        '</div>' +
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

    /* el ancho real, no 100vw (100vw incluye la barra de scroll y corría la página 8 px) */
    var medir = function () {
      document.documentElement.style.setProperty('--fo-vw', document.documentElement.clientWidth + 'px');
    };
    medir();
    window.addEventListener('resize', medir);
    window.addEventListener('orientationchange', medir);

    /* la letra: SOLO esta ficha la carga */
    if (!document.getElementById('fo-fuente')) {
      var l = document.createElement('link');
      l.id = 'fo-fuente';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&display=swap';
      document.head.appendChild(l);
    }

    arriba.insertAdjacentHTML('beforebegin', hero());
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    var cifras = cont.querySelector('.fo-cifras');
    if (cifras) cifras.insertAdjacentElement('afterend', arriba);

    var desc = cont.querySelector('section.desc');
    if (desc) {
      /* 1) cómo trabaja */
      desc.insertAdjacentHTML('beforebegin', bloqueCiclo());

      /* 2) el antes/después de la ficha (uno solo) con visor y barrido */
      var ba = cont.querySelector('.ba-sec');
      if (ba) {
        desc.insertAdjacentElement('beforebegin', ba);
        var img = ba.querySelector('.ba-img');
        if (img) img.insertAdjacentHTML('beforeend', MIRA + '<span class="fo-scan" aria-hidden="true"></span>');
        /* 3) el botón sale de la sección y queda en su propia franja */
        var boton = ba.querySelector('.cta');
        if (boton) {
          var franja = document.createElement('div');
          franja.className = 'fo-cta-franja';
          franja.appendChild(boton);
          ba.insertAdjacentElement('afterend', franja);
        }
      }

      /* 4) lo que trae: la lista de la ficha pasa a tarjetas, en su propia
         sección ANTES de la descripción (donde la guirnalda pone las suyas) */
      var listas = desc.querySelectorAll('ul');
      if (listas.length) {
        var puntos = [];
        listas[0].querySelectorAll('li').forEach(function (li) { puntos.push(li.textContent.trim()); });
        [].forEach.call(listas, function (u) { u.remove(); });
        if (puntos.length) desc.insertAdjacentHTML('beforebegin', bloqueTrae(puntos));
      }

      /* 5) las fotos, dentro de la descripción tras el primer párrafo */
      var pd = desc.querySelector('p');
      if (pd) pd.insertAdjacentHTML('afterend', bloqueFotos());
      else desc.insertAdjacentHTML('beforeend', bloqueFotos());
    }
    return true;
  }

  /* ---------------- EFECTOS ---------------- */

  /* el hero: el video se enciende después de cargar la página, y el texto
     entra DELANTE del cliente (no antes de que alcance a verlo) */
  function entradaHero() {
    var vid = document.querySelector('.fo-video');
    if (vid) {
      /* 🔴 SIN vid.load(): con "autoplay" el navegador ya lo está bajando, y
         load() lo pedía otra vez (medido: 147 KB x 2). Solo se le da play. */
      var prender = function () {
        try { if (vid.paused) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } } catch (e) {}
      };
      if (document.readyState === 'complete') setTimeout(prender, 300);
      else window.addEventListener('load', function () { setTimeout(prender, 300); });
    }
    if (QUIETO) return;
    document.body.classList.add('fo-arranca');
    /* 🔴 SIN requestAnimationFrame: si la pestaña no está al frente el
       navegador lo congela y el título se quedaba ESCONDIDO (medido: 9 s
       en "arranca"). Un setTimeout siempre corre; el offsetWidth obliga a
       pintar el estado escondido antes de soltarlo, para que se vea subir. */
    setTimeout(function () {
      void document.body.offsetWidth;
      document.body.classList.add('fo-listo');
      decodificar(document.querySelector('.fo-deco'));
    }, 450);
  }

  /* el rótulo se "decodifica" como la pantalla de un equipo: letras al azar
     que se van asentando de izquierda a derecha */
  function decodificar(el) {
    if (!el) return;
    var fin = el.getAttribute('data-txt') || el.textContent;
    var abc = 'ABCDEFGHJKLMNPRSTUVXYZ0123456789#/';
    var n = 0, total = 22;
    var t = setInterval(function () {
      n++;
      var hecho = Math.floor(fin.length * n / total);
      var s = '';
      for (var i = 0; i < fin.length; i++) {
        var c = fin.charAt(i);
        s += (i < hecho || c === ' ' || c === '·') ? c : abc.charAt(Math.floor(Math.random() * abc.length));
      }
      el.textContent = s;
      if (n >= total) { clearInterval(t); el.textContent = fin; }
    }, 42);
  }

  /* el hero se hunde un poco al bajar (solo transform) */
  function parallax() {
    if (QUIETO) return;
    var hero = document.querySelector('.fo-hero');
    var vid = document.querySelector('.fo-video');
    var sobre = document.querySelector('.fo-sobre');
    if (!hero || !vid) return;
    var pide = false;
    function pintar() {
      pide = false;
      var y = window.scrollY, alto = hero.offsetHeight;
      if (y > alto) return;
      vid.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(1) + 'px,0) scale(' + (1 + y / alto * 0.05).toFixed(3) + ')';
      if (sobre) sobre.style.transform = 'translate3d(0,' + (y * -0.1).toFixed(1) + 'px,0)';
    }
    window.addEventListener('scroll', function () {
      if (pide) return;
      pide = true;
      requestAnimationFrame(pintar);
    }, { passive: true });
  }

  /* conteo ascendente de las cifras, cuando la fila entra en pantalla */
  function contar() {
    var fila = document.querySelector('.fo-med');
    if (!fila || QUIETO || !('IntersectionObserver' in window)) return;
    /* 🔴 CONTEO PROGRESIVO (James 25-09: "ponle efectos a los números").
       Más lento para que se vea subir, y al llegar la cifra da un golpe de
       luz (.fo-fin). Con setTimeout: no se congela como requestAnimationFrame. */
    function terminar(el) { el.classList.add('fo-fin'); }
    function subir(el, hasta, antes) {
      var ini = Date.now(), dur = 2200;
      var t = setInterval(function () {
        var p = Math.min((Date.now() - ini) / dur, 1);
        el.textContent = (antes || '') + Math.round(hasta * (1 - Math.pow(1 - p, 3)));
        if (p >= 1) { clearInterval(t); el.textContent = (antes || '') + hasta; terminar(el); }
      }, 30);
    }
    /* los ceros no pueden "subir" a cero: giran como un contador y frenan en 0 */
    function rodillo(el, antes) {
      var i = 0, total = 28, t = setInterval(function () {
        i++;
        el.textContent = (antes || '') + (i >= total ? '0' : Math.floor(Math.random() * 9) + 1);
        if (i >= total) { clearInterval(t); terminar(el); }
      }, 70);
    }
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) {
        if (!v.isIntersecting) return;
        obs.unobserve(v.target);
        v.target.classList.add('fo-on');
        v.target.querySelectorAll('b[data-hasta]').forEach(function (b, i) {
          setTimeout(function () {
            var antes = b.getAttribute('data-antes') || '';
            if (b.getAttribute('data-rodillo')) rodillo(b, antes);
            else subir(b, Number(b.getAttribute('data-hasta')), antes);
          }, i * 260);
        });
      });
    }, { threshold: 0.4 });
    obs.observe(fila);
  }

  /* la línea de tiempo se ENCIENDE mientras el cliente baja: el riel se
     llena y cada paso se prende cuando el riel lo alcanza */
  function lineaDeTiempo() {
    var ol = document.querySelector('.fo-linea');
    var fill = ol && ol.querySelector('.fo-riel i');
    if (!ol || !fill) return;
    var pasos = ol.querySelectorAll('.fo-paso');
    if (QUIETO) { fill.style.transform = 'scaleY(1)'; pasos.forEach(function (p) { p.classList.add('fo-on'); }); return; }
    var pide = false;
    function pintar() {
      pide = false;
      var r = ol.getBoundingClientRect();
      var foco = window.innerHeight * 0.62;
      var p = Math.max(0, Math.min(1, (foco - r.top) / r.height));
      fill.style.transform = 'scaleY(' + p.toFixed(3) + ')';
      pasos.forEach(function (li) {
        var y = li.offsetTop + 14;
        li.classList.toggle('fo-on', p * r.height >= y);
      });
    }
    function pedir() { if (!pide) { pide = true; requestAnimationFrame(pintar); } }
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    pintar();
  }

  /* la linterna: un haz sigue el dedo (o el mouse) por encima de la tarjeta */
  function linterna() {
    document.querySelectorAll('.fo-tar').forEach(function (t) {
      function mover(e) {
        var p = e.touches ? e.touches[0] : e;
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (p.clientX - r.left).toFixed(0) + 'px');
        t.style.setProperty('--my', (p.clientY - r.top).toFixed(0) + 'px');
      }
      t.addEventListener('pointermove', mover, { passive: true });
      t.addEventListener('touchmove', mover, { passive: true });
      t.addEventListener('pointerdown', function (e) { mover(e); t.classList.add('fo-luz'); });
      t.addEventListener('pointerleave', function () { t.classList.remove('fo-luz'); });
      t.addEventListener('pointerup', function () { setTimeout(function () { t.classList.remove('fo-luz'); }, 650); });
    });
  }

  /* entrada de tarjetas, fotos y antes/después al aparecer.
     🔴 Nunca se esconde nada con opacity 0: se prepara recién acá, y una
     red de seguridad muestra todo lo que ya quedó a la vista. */
  function revelar() {
    if (QUIETO || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.fo-rev, .ba-img, .fo-cifras');
    document.body.classList.add('fo-anima');
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add('fo-in');
        obs.unobserve(v.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top < window.innerHeight * 0.9) { e.classList.add('fo-in'); return; }
      e.classList.add('fo-pre');
      obs.observe(e);
    });
    var pide = false;
    function barrer() {
      pide = false;
      var quedan = 0;
      document.querySelectorAll('.fo-pre:not(.fo-in)').forEach(function (e) {
        if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('fo-in');
        else quedan++;
      });
      if (!quedan) window.removeEventListener('scroll', pedir);
    }
    function pedir() { if (!pide) { pide = true; requestAnimationFrame(barrer); } }
    window.addEventListener('scroll', pedir, { passive: true });
  }

  /* ficha.js pinta #prod de forma asíncrona: se espera a que exista */
  var intentos = 0;
  (function esperar() {
    if (montar()) {
      entradaHero(); parallax(); contar(); lineaDeTiempo(); linterna(); revelar();
      return;
    }
    if (++intentos > 60) return;
    setTimeout(esperar, 100);
  })();
})();
