/* ============================================================
   MÁSCARA DE PESTAÑAS FLAMENCO · diseño propio sobre la ficha de la TIENDA.
   Hecho el 25-09. James: "la que va es la de la tienda" (no la landing
   independiente pestanas.jayegroupchile.store: de ahí solo se tomaron sus
   tres fotos limpias de camerino).

   CONCEPTO "camerino": el tocador con ampolletas de las fotos de la marca.
   Letra de revista de moda (Bodoni Moda, cursiva) + Jost para rótulos.
   Dorado #D8A52E (el acento de la ficha en productos.js) sobre negro.
     · hero  -> VIDEO real de aplicación y resultado (cuerpo_mascara, sin
                letras ni sonido). Las letras van ARRIBA sobre negro y el
                video ABAJO: así NO tapan los ojos, que son el producto.
                Ampolletas que se encienden en fila + polvo dorado.
                Título en CASCADA letra por letra.
     · cifras -> conteo progresivo con golpe de luz.
     · pasos  -> una pincelada dorada se dibuja bajo cada paso.
     · antes/después (el de la ficha) -> un brillo lo cruza una vez.
     · tarjetas -> brillo de espejo que sigue el dedo.
     · fotos  -> se abren como el telón de un camerino.

   LO QUE SE AFIRMA sale de productos.js: microfibras que alargan y
   engrosan, cepillo que separa pestaña por pestaña (sin grumos), a prueba
   de agua, aguanta el día, sale con agua tibia, sin extensiones ni postizas.

   Candado: todo se ve aunque este archivo falle. Nada depende de
   requestAnimationFrame para aparecer (se congela con la pestaña oculta).
   ============================================================ */
(function () {
  'use strict';

  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'mascara') return;

  var QUIETO = false;
  try { QUIETO = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var PASOS = [
    ['Desde la raíz', 'Apoya el cepillo en la base de las pestañas y súbelo hacia las puntas. Las microfibras se pegan a cada pestaña y la alargan.'],
    ['Segunda capa', 'Con una segunda pasada ganas volumen. El cepillo las separa una por una: no se apelmazan ni quedan grumos.'],
    ['Todo el día', 'Es a prueba de agua: aguanta lluvia, lágrimas y el día completo sin correrse. En la noche sale con agua tibia.'],
  ];

  /* 🔴 25-09 James: "repetiste la misma del hero abajo, no tiene variedad".
     Las fotos de abajo NO pueden ser el camerino del hero: salen de las otras
     fotos limpias de la landing vieja de nad (card2, card3, duo). */
  var FOTOS = [
    ['img/ma-ojo.webp?v=1',
     'Primer plano de un ojo con el cepillo de la máscara peinando las pestañas',
     'El cepillo', 'Peina pestaña por pestaña',
     'Las cerdas separan cada pestaña y las microfibras la alargan: volumen sin grumos ni pestañas pegadas.'],
    ['img/ma-aplica.webp?v=1',
     'Una mujer aplicándose la máscara Flamenco en su casa, con los envases frente a ella',
     'Cómo se usa', 'Dos pasadas, en tu casa',
     'Una capa para alargar y otra para dar volumen. Sin extensiones, sin postizas y sin pegamento.'],
    ['img/ma-duo.webp?v=1',
     'La máscara Flamenco Mega Volume Waterproof con su cepillo',
     'Por qué no se corre', 'A prueba de agua',
     'Aguanta el día entero, la lluvia y las lágrimas. Y cuando quieras sacarla, basta con agua tibia.'],
  ];

  var ICONOS = {
    fibra:   '<path d="M4 18c3-8 7-12 16-14"/><path d="M4 14c2-4 5-7 9-9"/><path d="M8 20c3-5 7-9 12-11"/>',
    cepillo: '<path d="M4 20 15 9"/><path d="M13 5l6 6"/><path d="M14 6l-1-2M16 5l-.5-2M18 7l2-.5M19 9l2 .5M12 8 10 7"/>',
    agua:    '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    pluma:   '<path d="M20 4C10 4 5 10 4 20"/><path d="M20 4c-1 6-5 10-12 11"/>',
  };
  function ico(k) {
    return '<svg class="ma-ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONOS[k] || ICONOS.fibra) + '</svg>';
  }
  function icoDe(t) {
    t = t.toLowerCase();
    if (t.indexOf('cepillo') >= 0 || t.indexOf('grumo') >= 0) return 'cepillo';
    if (t.indexOf('agua') >= 0) return 'agua';
    if (t.indexOf('postiza') >= 0 || t.indexOf('extension') >= 0 || t.indexOf('extensión') >= 0) return 'pluma';
    return 'fibra';
  }

  /* título en cascada LETRA POR LETRA (el foco va por palabra: acá cambia) */
  function letras(lineas, ini, paso) {
    var n = 0;
    return lineas.map(function (l) {
      var txt = l[0], acento = l[1];
      var html = txt.split(' ').map(function (w) {
        return '<span class="ma-pal">' + w.split('').map(function (ch) {
          return '<span class="ma-le" style="--d:' + (ini + paso * n++).toFixed(3) + 's">' + esc(ch) + '</span>';
        }).join('') + '</span>';
      }).join(' ');
      return '<span class="ma-ln">' + (acento ? '<em>' + html + '</em>' : html) + '</span>';
    }).join('');
  }
  function palabras(txt, ini, paso) {
    return txt.split(' ').map(function (w, i) {
      return '<span class="ma-pw" style="--d:' + (ini + paso * i).toFixed(2) + 's">' + esc(w) + '</span>';
    }).join(' ');
  }

  function hero() {
    var focos = '';
    for (var i = 0; i < 9; i++) focos += '<i style="--n:' + i + '"></i>';
    var polvo = '';
    for (var k = 0; k < 18; k++) {
      polvo += '<i style="--x:' + (Math.random() * 100).toFixed(1) + '%;--t:' + (6 + Math.random() * 6).toFixed(2) +
        's;--r:' + (Math.random() * 6).toFixed(2) + 's;--s:' + (0.6 + Math.random() * 1.2).toFixed(2) + '"></i>';
    }
    return '<div class="ma-hero">' +
      /* 🔴 James 25-09: el hero es LA FOTO DEL CAMERINO de la landing de
         pestañas ("toma la que tenía"), no un cuadro del video. */
      '<img class="ma-video ma-img" src="img/ma-hero.webp?v=2" width="900" height="1350" fetchpriority="high"' +
        ' alt="La máscara Flamenco Mega Volume en su envase oro rosa frente a un espejo de camerino, con una mujer aplicándosela">' +
      '<div class="ma-funde" aria-hidden="true"></div>' +
      '<div class="ma-polvo" aria-hidden="true">' + polvo + '</div>' +
      '<div class="ma-focos" aria-hidden="true">' + focos + '</div>' +
      '<div class="ma-sobre">' +
        '<span class="ma-rot">Microfibras de volumen · a prueba de agua</span>' +
        '<h1 class="ma-h1">' +
          letras([['Más largas,'], ['más gruesas,'], ['sin postizas.', 1]], 0.25, 0.035) +
        '</h1>' +
        '<p class="ma-frase">' + palabras('El cepillo separa pestaña por pestaña: volumen real, sin grumos, que aguanta el día entero.', 1.15, 0.03) + '</p>' +
      '</div>' +
    '</div>' +
    '<section class="ma-sec ma-oscura ma-cifras">' +
      '<div class="ma-med">' +
        '<div><b data-hasta="2">2</b><span>capas y listo</span></div>' +
        '<div><b data-hasta="0" data-rodillo="1">0</b><span>grumos</span></div>' +
        '<div><b data-hasta="0" data-rodillo="1">0</b><span>postizas ni extensiones</span></div>' +
      '</div>' +
    '</section>';
  }

  function bloquePasos() {
    return '<section class="ma-sec ma-oscura ma-pasos-sec">' +
      '<span class="ma-rot">Cómo se aplica</span>' +
      '<h2 class="ma-h2">Tres pasos, <em>frente al espejo.</em></h2>' +
      '<ol class="ma-pasos">' +
        PASOS.map(function (p, i) {
          return '<li class="ma-paso ma-rev" style="--i:' + i + '">' +
            '<span class="ma-num" aria-hidden="true">' + (i + 1) + '</span>' +
            '<div><h3>' + esc(p[0]) + '<span class="ma-trazo" aria-hidden="true"></span></h3>' +
            '<p>' + esc(p[1]) + '</p></div>' +
          '</li>';
        }).join('') +
      '</ol>' +
    '</section>';
  }

  function bloqueTrae(puntos) {
    return '<section class="ma-sec ma-oscura ma-trae">' +
      '<span class="ma-rot">Lo que la hace distinta</span>' +
      '<h2 class="ma-h2">No solo pinta: <em>construye volumen.</em></h2>' +
      '<div class="ma-grid">' +
        puntos.map(function (t, i) {
          return '<button type="button" class="ma-tar ma-rev" style="--i:' + i + '">' +
            '<span class="ma-tar-ico">' + ico(icoDe(t)) + '</span>' +
            '<b>' + esc(t) + '</b>' +
          '</button>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  function bloqueFotos() {
    return '<div class="ma-fichas">' + FOTOS.map(function (f) {
      return '<figure class="ma-fi ma-rev">' +
        '<div class="ma-foto">' +
          '<img src="' + f[0] + '" alt="' + esc(f[1]) + '" loading="lazy" width="900" height="900">' +
          '<span class="ma-telon ma-t1" aria-hidden="true"></span><span class="ma-telon ma-t2" aria-hidden="true"></span>' +
        '</div>' +
        '<figcaption><span class="ma-rot">' + esc(f[2]) + '</span><b>' + esc(f[3]) + '</b><p>' + esc(f[4]) + '</p></figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;
    if (cont.querySelector('.ma-hero')) return true;

    document.body.classList.add('p-mascara');
    var medir = function () {
      document.documentElement.style.setProperty('--ma-vw', document.documentElement.clientWidth + 'px');
    };
    medir();
    window.addEventListener('resize', medir);
    window.addEventListener('orientationchange', medir);

    if (!document.getElementById('ma-fuente')) {
      var l = document.createElement('link');
      l.id = 'ma-fuente';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;1,6..96,500;1,6..96,700&family=Jost:wght@500;600&display=swap';
      document.head.appendChild(l);
    }

    arriba.insertAdjacentHTML('beforebegin', hero());
    /* la galería de la ficha son flyers del proveedor llenos de letras: sobra */
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    var cifras = cont.querySelector('.ma-cifras');
    if (cifras) cifras.insertAdjacentElement('afterend', arriba);

    var desc = cont.querySelector('section.desc');
    if (desc) {
      desc.insertAdjacentHTML('beforebegin', bloquePasos());
      /* el antes/después de la ficha sube (estaba al fondo) y su botón queda suelto */
      var ba = cont.querySelector('.ba-sec');
      if (ba) {
        desc.insertAdjacentElement('beforebegin', ba);
        var img = ba.querySelector('.ba-img');
        if (img) img.insertAdjacentHTML('beforeend', '<span class="ma-brillo" aria-hidden="true"></span>');
        var boton = ba.querySelector('.cta');
        if (boton) {
          var franja = document.createElement('div');
          franja.className = 'ma-cta-franja';
          franja.appendChild(boton);
          ba.insertAdjacentElement('afterend', franja);
        }
      }
      var listas = desc.querySelectorAll('ul');
      if (listas.length) {
        var puntos = [];
        listas[0].querySelectorAll('li').forEach(function (li) { puntos.push(li.textContent.trim()); });
        [].forEach.call(listas, function (u) { u.remove(); });
        if (puntos.length) desc.insertAdjacentHTML('beforebegin', bloqueTrae(puntos));
      }
      var pd = desc.querySelector('p');
      if (pd) pd.insertAdjacentHTML('afterend', bloqueFotos());
      else desc.insertAdjacentHTML('beforeend', bloqueFotos());
    }

    /* el video de más abajo: su póster era un flyer con letras; va uno limpio */
    var vp = cont.querySelector('.vid-prod');
    if (vp) vp.setAttribute('poster', 'img/mascara-ficha-poster.webp?v=1');
    return true;
  }

  /* ---------------- EFECTOS ---------------- */
  function entradaHero() {
    var vid = document.querySelector('.ma-video');
    if (vid) {
      /* con autoplay el navegador ya lo baja: solo play (load() lo baja dos veces) */
      var prender = function () {
        try { if (vid.paused) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } } catch (e) {}
      };
      if (document.readyState === 'complete') setTimeout(prender, 300);
      else window.addEventListener('load', function () { setTimeout(prender, 300); });
    }
    if (QUIETO) return;
    document.body.classList.add('ma-arranca');
    setTimeout(function () {
      void document.body.offsetWidth;
      document.body.classList.add('ma-listo');
    }, 400);
  }

  function parallax() {
    if (QUIETO) return;
    var hero = document.querySelector('.ma-hero');
    /* el hero ahora es foto con su propio acercamiento: el parallax solo aplica a un video */
    var vid = document.querySelector('video.ma-video');
    if (!hero || !vid) return;
    var pide = false;
    function pintar() {
      pide = false;
      var y = window.scrollY, alto = hero.offsetHeight;
      if (y > alto) return;
      vid.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0) scale(' + (1 + y / alto * 0.06).toFixed(3) + ')';
    }
    window.addEventListener('scroll', function () {
      if (pide) return;
      pide = true;
      requestAnimationFrame(pintar);
    }, { passive: true });
  }

  function contar() {
    var fila = document.querySelector('.ma-med');
    if (!fila || QUIETO || !('IntersectionObserver' in window)) return;
    function fin(el) { el.classList.add('ma-fin'); }
    function subir(el, hasta) {
      var ini = Date.now(), dur = 1400;
      el.textContent = '0';
      var t = setInterval(function () {
        var p = Math.min((Date.now() - ini) / dur, 1);
        el.textContent = String(Math.round(hasta * p));
        if (p >= 1) { clearInterval(t); el.textContent = String(hasta); fin(el); }
      }, 40);
    }
    function rodillo(el) {
      var i = 0, total = 26, t = setInterval(function () {
        i++;
        el.textContent = i >= total ? '0' : String(Math.floor(Math.random() * 9) + 1);
        if (i >= total) { clearInterval(t); fin(el); }
      }, 70);
    }
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) {
        if (!v.isIntersecting) return;
        obs.unobserve(v.target);
        v.target.querySelectorAll('b[data-hasta]').forEach(function (b, i) {
          setTimeout(function () {
            if (b.getAttribute('data-rodillo')) rodillo(b);
            else subir(b, Number(b.getAttribute('data-hasta')));
          }, i * 260);
        });
      });
    }, { threshold: 0.4 });
    obs.observe(fila);
  }

  /* el brillo de espejo: sigue el dedo por la tarjeta */
  function espejo() {
    document.querySelectorAll('.ma-tar').forEach(function (t) {
      function mover(e) {
        var p = e.touches ? e.touches[0] : e;
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (p.clientX - r.left).toFixed(0) + 'px');
        t.style.setProperty('--my', (p.clientY - r.top).toFixed(0) + 'px');
      }
      t.addEventListener('pointermove', mover, { passive: true });
      t.addEventListener('touchmove', mover, { passive: true });
      t.addEventListener('pointerdown', function (e) { mover(e); t.classList.add('ma-luz'); });
      t.addEventListener('pointerleave', function () { t.classList.remove('ma-luz'); });
      t.addEventListener('pointerup', function () { setTimeout(function () { t.classList.remove('ma-luz'); }, 650); });
    });
  }

  function revelar() {
    if (QUIETO || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.ma-rev, .p-mascara #prod .ba-img');
    document.body.classList.add('ma-anima');
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add('ma-in');
        obs.unobserve(v.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top < window.innerHeight * 0.9) { e.classList.add('ma-in'); return; }
      e.classList.add('ma-pre');
      obs.observe(e);
    });
    /* red de seguridad: lo que ya pasó por pantalla se muestra sí o sí */
    var t = setInterval(function () {
      var quedan = 0;
      document.querySelectorAll('.ma-pre:not(.ma-in)').forEach(function (e) {
        if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('ma-in');
        else quedan++;
      });
      if (!quedan) clearInterval(t);
    }, 400);
  }

  var intentos = 0;
  (function esperar() {
    if (montar()) {
      entradaHero(); parallax(); contar(); espejo(); revelar();
      return;
    }
    if (++intentos > 60) return;
    setTimeout(esperar, 100);
  })();
})();
