/* ============================================================
   BÁLSAMO FACIAL ROSETIMES · CHILE (29-09-2026). Copia del balsamo.js de la tienda de España (James: cópiala igualito), con las cifras del Rosetimes (8 g, cinco activos). Fotos y video: los mismos de España (James, 29-09).
   James, 25-09: "quiero que lo hagan igual que la máscara, con los colores
   del colágeno". Así que esto es `shilajit/mascara.js` clonado entero, con
   los mismos efectos, y encima el contenido y la piel del bálsamo.

   Letra de revista (Bodoni Moda, cursiva) + Jost para rótulos, igual que la
   máscara. Lo que cambia es la paleta: alli era dorado sobre NEGRO; aqui es
   crema, rosa empolvado y el oro del propio envase, porque el negro contra
   este rosa queda fatal (James lo dijo y tenia razon).

     · hero    -> la foto del producto en primer plano, titulo en CASCADA
                  letra por letra, polvo dorado cayendo y focos que se
                  encienden en fila.
     · cifras  -> conteo progresivo con golpe de luz.
     · pasos   -> una pincelada se dibuja bajo cada paso.
     · antes/después -> un brillo lo cruza una vez (si algun dia hay foto).
     · tarjetas -> brillo que sigue el dedo.
     · fotos   -> se abren como un telón.

   LO QUE SE AFIRMA sale de productos.js, y en la UE solo se puede hablar de
   la APARIENCIA de la piel (Reglamento 655/2013): hidrata, la piel deja de
   tirar, las lineas se marcan menos. NUNCA "elimina arrugas" ni
   "rejuvenece": eso es lo que hace que Meta tumbe el anuncio.

   Candado: todo se ve aunque este archivo falle. Nada depende de
   requestAnimationFrame para aparecer (se congela con la pestaña oculta).
   ============================================================ */
(function () {
  'use strict';

  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  /* En Chile la tienda tiene varios productos y el slug SIEMPRE viene en la
     URL. Aquí la página es de UN SOLO producto y se abre en la raíz, sin
     ?p=nada: si se exigiera el slug, este archivo no arrancaría nunca y no se
     vería ni una sección. Por eso vale también cuando viene vacío. */
  var s = slug();
  if (s && s !== 'balsamo') return;

  var QUIETO = false;
  try { QUIETO = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---- ES / PT ----
     El mismo archivo sirve para los dos países, igual que ficha.js: si hay
     window.TEXTOS (que solo carga Portugal) manda lo que traiga; si no, el
     español que va aquí abajo.
     Portugal cuelga de /pt/, así que sus imágenes llevan ../ delante. */
  var T = window.TEXTOS || {};
  function t(k, d) { return (T[k] != null && T[k] !== '') ? T[k] : d; }
  var PAIS = T._pais || 'ES';
  var RUTA = (PAIS === 'PT') ? '../' : '';

  var PASOS = (T.baPasos && T.baPasos.length) ? T.baPasos : [
    ['Gira la base', 'Un giro y asoma un poco de bálsamo. No hay que untarse las manos ni calcular cantidad: sale justo lo que necesitas.'],
    ['Deslízalo', 'Pasa el stick por el pómulo, el contorno, los labios, el cuello o el escote. Se absorbe rápido y no deja sensación grasa.'],
    ['Cuando quieras', 'Por la mañana, por la noche o a media tarde para retocar. Va antes del maquillaje o por encima, sin arrastrarlo.'],
  ];

  /* Las tres fotos las hizo James el 25-09. Ninguna repite la del hero: eso ya
     se lo señaló en la máscara y tenía razón.
     Se quitó la del catálogo del proveedor, que era un collage con FOREHEAD /
     FACE / LIPS / BODY en INGLÉS encima. */
  var FOTOS = (T.baFotos && T.baFotos.length) ? T.baFotos : [
    ['img/balsamo-uso.webp?v=1',
     'Una mujer de unos cincuenta años deslizando el bálsamo Rosetimes por su pómulo',
     'El gesto', 'Dos segundos y ya está',
     'Se desliza directo sobre la piel, sin manos y sin medir cantidad. Por eso se usa de verdad todos los días, y no se queda en el cajón.'],
    ['img/balsamo-mano.webp?v=1',
     'El stick de bálsamo Rosetimes sostenido en la mano, con su etiqueta dorada',
     'Dónde se aplica', 'Rostro, labios, cuello y escote',
     'Un solo producto para todas las zonas que se resecan. Nada de tener un bote distinto para cada parte de la cara.'],
    ['img/balsamo-bolso.webp?v=1',
     'El stick junto a un bolso, unas gafas de sol y un frasco de perfume sobre una mesa de mármol',
     'Se va contigo', 'Ocho gramos, y ya está',
     'Es sólido: no se derrama en el bolso ni se seca como un bote abierto. Lo llevas encima y retocas donde estés.'],
  ];

  var ICONOS = {
    fibra:   '<path d="M4 18c3-8 7-12 16-14"/><path d="M4 14c2-4 5-7 9-9"/><path d="M8 20c3-5 7-9 12-11"/>',
    stick:   '<rect x="9" y="3" width="6" height="7" rx="3"/><rect x="8.5" y="10" width="7" height="11" rx="1.6"/><path d="M8.5 13.5h7"/>',
    agua:    '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    pluma:   '<path d="M20 4C10 4 5 10 4 20"/><path d="M20 4c-1 6-5 10-12 11"/>',
    cara:    '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>',
  };
  function ico(k) {
    return '<svg class="ba-ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONOS[k] || ICONOS.fibra) + '</svg>';
  }
  function icoDe(t) {
    t = t.toLowerCase();
    if (t.indexOf('stick') >= 0 || t.indexOf('mano') >= 0 || t.indexOf('directo') >= 0) return 'stick';
    if (t.indexOf('hidrat') >= 0 || t.indexOf('hialur') >= 0 || t.indexOf('agua') >= 0) return 'agua';
    if (t.indexOf('rostro') >= 0 || t.indexOf('contorno') >= 0 || t.indexOf('labio') >= 0) return 'cara';
    if (t.indexOf('línea') >= 0 || t.indexOf('linea') >= 0 || t.indexOf('expresión') >= 0) return 'pluma';
    return 'fibra';
  }

  /* título en cascada LETRA POR LETRA (el foco va por palabra: acá cambia) */
  function letras(lineas, ini, paso) {
    var n = 0;
    return lineas.map(function (l) {
      var txt = l[0], acento = l[1];
      var html = txt.split(' ').map(function (w) {
        return '<span class="ba-pal">' + w.split('').map(function (ch) {
          return '<span class="ba-le" style="--d:' + (ini + paso * n++).toFixed(3) + 's">' + esc(ch) + '</span>';
        }).join('') + '</span>';
      }).join(' ');
      return '<span class="ba-ln">' + (acento ? '<em>' + html + '</em>' : html) + '</span>';
    }).join('');
  }
  function palabras(txt, ini, paso) {
    return txt.split(' ').map(function (w, i) {
      return '<span class="ba-pw" style="--d:' + (ini + paso * i).toFixed(2) + 's">' + esc(w) + '</span>';
    }).join(' ');
  }

  /* 🔴 EL HERO NO SE TOCA. James, 25-09: "lo único que vas a conservar de la
     que hiciste es el hero, no lo cambies por el de la máscara; solo copias la
     fuente, las secciones y los efectos".
     Así que de la máscara se traen las CIFRAS, los pasos, las tarjetas y las
     fotos, pero el hero sigue siendo el de ficha.js: la foto del producto en
     primer plano, su titular en cascada, las píldoras, el precio y el botón.
     Esta función solo devuelve ya la franja de cifras, que es lo que va justo
     debajo del hero. */
  function hero() {
    return '<section class="ba-sec ba-oscura ba-cifras">' +
      '<div class="ba-med">' +
        '<div><b data-hasta="8">8</b><span>' + esc(t('baCifra1', 'gramos que caben en el bolso')) + '</span></div>' +
        '<div><b data-hasta="5">5</b><span>' + esc(t('baCifra2', 'activos en la fórmula')) + '</span></div>' +
        '<div><b data-hasta="0" data-rodillo="1">0</b><span>' + esc(t('baCifra3', 'manos manchadas')) + '</span></div>' +
      '</div>' +
    '</section>';
  }

  function bloquePasos() {
    return '<section class="ba-sec ba-oscura ba-pasos-sec">' +
      '<span class="ba-rot">' + esc(t('baPasosRot', 'Cómo se usa')) + '</span>' +
      /* El <em> es el trozo en oro: va sin escapar a propósito, y lo que
         entra aquí lo escribimos nosotros, no el cliente. */
      '<h2 class="ba-h2">' + t('baPasosH2', 'Tres gestos, <em>y ya está.</em>') + '</h2>' +
      '<ol class="ba-pasos">' +
        PASOS.map(function (p, i) {
          return '<li class="ba-paso ba-rev" style="--i:' + i + '">' +
            '<span class="ba-num" aria-hidden="true">' + (i + 1) + '</span>' +
            '<div><h3>' + esc(p[0]) + '<span class="ba-trazo" aria-hidden="true"></span></h3>' +
            '<p>' + esc(p[1]) + '</p></div>' +
          '</li>';
        }).join('') +
      '</ol>' +
    '</section>';
  }

  function bloqueTrae(puntos) {
    return '<section class="ba-sec ba-oscura ba-trae">' +
      '<span class="ba-rot">' + esc(t('baTraeRot', 'Lo que lo hace distinto')) + '</span>' +
      '<h2 class="ba-h2">' + t('baTraeH2', 'No es una crema: <em>es un gesto.</em>') + '</h2>' +
      '<div class="ba-grid">' +
        puntos.map(function (t, i) {
          return '<button type="button" class="ba-tar ba-rev" style="--i:' + i + '">' +
            '<span class="ba-tar-ico">' + ico(icoDe(t)) + '</span>' +
            '<b>' + esc(t) + '</b>' +
          '</button>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  function bloqueFotos() {
    return '<div class="ba-fichas">' + FOTOS.map(function (f) {
      return '<figure class="ba-fi ba-rev">' +
        '<div class="ba-foto">' +
          '<img src="' + RUTA + f[0] + '" alt="' + esc(f[1]) + '" loading="lazy" width="900" height="900">' +
          '<span class="ba-telon ba-t1" aria-hidden="true"></span><span class="ba-telon ba-t2" aria-hidden="true"></span>' +
        '</div>' +
        '<figcaption><span class="ba-rot">' + esc(f[2]) + '</span><b>' + esc(f[3]) + '</b><p>' + esc(f[4]) + '</p></figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;
    if (cont.querySelector('.ba-cifras')) return true;   /* ya montado */

    document.body.classList.add('p-balsamo');
    var medir = function () {
      document.documentElement.style.setProperty('--ba-vw', document.documentElement.clientWidth + 'px');
    };
    medir();
    window.addEventListener('resize', medir);
    window.addEventListener('orientationchange', medir);

    if (!document.getElementById('ba-fuente')) {
      var l = document.createElement('link');
      l.id = 'ba-fuente';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;1,6..96,500;1,6..96,700&family=Jost:wght@500;600&display=swap';
      document.head.appendChild(l);
    }

    /* La franja de cifras va justo DEBAJO del hero. Se cuelga del propio hero
       y no de .arriba2: colgada de arriba2 acababa cayendo detrás de los pasos,
       porque las demás secciones se insertan después y la empujaban. */
    var heroReal = cont.querySelector('.heroP');
    if (heroReal) heroReal.insertAdjacentHTML('afterend', hero());
    else arriba.insertAdjacentHTML('beforebegin', hero());

    /* 🔴 LA GALERÍA SE BORRA, igual que en la máscara.
       Aquí escribí lo contrario y estaba mal: razoné que las fotos eran buenas,
       pero el problema nunca fue la calidad. El hero YA enseña el producto a
       pantalla completa, así que el carrusel que va justo debajo lo repite: son
       1.123 px contra los 194 px de la máscara, y por eso al bajar parecía una
       ficha de tienda cualquiera. James lo señaló dos veces.
       Las tres fotos no se pierden: salen abajo en las fichas con telón (el
       gesto, dónde se aplica, se va contigo), que es donde la máscara las pone. */
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });

    var desc = cont.querySelector('section.desc');
    if (desc) {
      desc.insertAdjacentHTML('beforebegin', bloquePasos());
      /* el antes/después de la ficha sube (estaba al fondo) y su botón queda suelto */
      var ba = cont.querySelector('.ba-sec');
      if (ba) {
        desc.insertAdjacentElement('beforebegin', ba);
        var img = ba.querySelector('.ba-img');
        if (img) img.insertAdjacentHTML('beforeend', '<span class="ba-brillo" aria-hidden="true"></span>');
        var boton = ba.querySelector('.cta');
        if (boton) {
          var franja = document.createElement('div');
          franja.className = 'ba-cta-franja';
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
    if (vp) vp.setAttribute('poster', 'img/balsamo-ficha-poster.webp?v=1');

    /* 🔴 LAS CIFRAS, AL SITIO, Y AL FINAL DE TODO.
       Se insertaron justo detrás del hero, pero acababan apareciendo entre los
       pasos y las tarjetas: las secciones que se montan después las empujan.
       En vez de pelearse con el orden de inserción, se mueven aquí, cuando ya
       está todo puesto y nadie las va a desplazar. */
    var cif = cont.querySelector('.ba-cifras');
    var hp = cont.querySelector('.heroP');
    if (cif && hp && hp.nextElementSibling !== cif) hp.insertAdjacentElement('afterend', cif);

    return true;
  }

  /* ---------------- EFECTOS ----------------
     🔴 entradaHero() y parallax() se quitaron: eran del hero de la máscara,
     que aquí NO se usa. El hero es el de ficha.js y trae su propia entrada,
     su cascada y su lluvia de destellos. Lo que sí se conserva es todo lo de
     abajo: el conteo de las cifras, la pincelada de los pasos, el brillo de
     las tarjetas y el telón de las fotos. */

  function contar() {
    var fila = document.querySelector('.ba-med');
    if (!fila || QUIETO || !('IntersectionObserver' in window)) return;
    function fin(el) { el.classList.add('ba-fin'); }
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
    document.querySelectorAll('.ba-tar').forEach(function (t) {
      function mover(e) {
        var p = e.touches ? e.touches[0] : e;
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (p.clientX - r.left).toFixed(0) + 'px');
        t.style.setProperty('--my', (p.clientY - r.top).toFixed(0) + 'px');
      }
      t.addEventListener('pointermove', mover, { passive: true });
      t.addEventListener('touchmove', mover, { passive: true });
      t.addEventListener('pointerdown', function (e) { mover(e); t.classList.add('ba-luz'); });
      t.addEventListener('pointerleave', function () { t.classList.remove('ba-luz'); });
      t.addEventListener('pointerup', function () { setTimeout(function () { t.classList.remove('ba-luz'); }, 650); });
    });
  }

  function revelar() {
    if (QUIETO || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.ba-rev, .p-balsamo #prod .ba-img');
    document.body.classList.add('ba-anima');
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add('ba-in');
        obs.unobserve(v.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top < window.innerHeight * 0.9) { e.classList.add('ba-in'); return; }
      e.classList.add('ba-pre');
      obs.observe(e);
    });
    /* red de seguridad: lo que ya pasó por pantalla se muestra sí o sí */
    var t = setInterval(function () {
      var quedan = 0;
      document.querySelectorAll('.ba-pre:not(.ba-in)').forEach(function (e) {
        if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('ba-in');
        else quedan++;
      });
      if (!quedan) clearInterval(t);
    }, 400);
  }

  /* ============================================================
     LAS SECCIONES QUE VENIAN DEL MOLDE NO TENIAN NINGUN EFECTO.
     Medido el 25-09: de 20 secciones, 13 entraban de golpe. Las que traje de
     la mascara (cifras, pasos, tarjetas, fichas) si se animaban; las del molde
     de la ficha —formula, comparativa, opiniones, garantia, preguntas...— no.
     De ahi que la pagina se sintiera plana por abajo.

     Aqui NO se anima la seccion entera: se marcan su rotulo, su titular y sus
     elementos de lista, que entran escalonados. Asi el bloque no desaparece si
     algo falla, y el movimiento acompaña a la lectura en vez de taparla.
     Reglas aplicadas (ui-ux-pro-max): revelado-scroll, escalonado (30-50ms),
     duracion (<=520ms) y movimiento-reducido.
     ============================================================ */
  function animarElResto(cont) {
    if (QUIETO) return;
    /* Estas ya tienen su propio efecto: no se tocan o se animaria dos veces. */
    var YA = /heroP|ba-cifras|ba-pasos-sec|ba-trae|ba-fichas/;

    [].forEach.call(cont.children, function (sec) {
      if (YA.test((sec.className || '').toString())) return;

      var piezas = [];
      /* El encabezado de la seccion: primero el rotulo, luego el titular. */
      ['.eyebrow', '.ba-rot', 'h2'].forEach(function (s) {
        var e = sec.querySelector(s);
        if (e && piezas.indexOf(e) < 0) piezas.push(e);
      });
      /* Y lo que se repite dentro. Estas clases estan LEIDAS de la pagina en
         vivo, no supuestas: la primera vez puse siete selectores inventados
         (.faq-item, .rev-card, .cmp-fila...) y no existia ninguno.
           .ing   los seis activos de la formula
           .si/.no las filas de la comparativa
           .rsc   cada opinion
           .res   lo que garantizamos
           .sello cada transportadora
         Se cortan en 8: mas alla, el ultimo tardaria una eternidad en salir. */
      var repetidos = sec.querySelectorAll('.ing, .si, .no, .rsc, .res, .sello');
      [].forEach.call(repetidos, function (e, i) { if (i < 8) piezas.push(e); });

      /* Secciones sin titular ni rotulo -el video, la promo, la escasez, los
         sellos de pago-: no habia nada que marcar y se quedaban planas. Se
         marca el bloque entero.
         .arriba2 se queda FUERA a proposito: ahi estan el precio y el boton, y
         no se esconde ni un instante lo que el visitante viene a mirar. */
      if (!piezas.length && !/arriba2/.test((sec.className || '').toString())) {
        var dentro = sec.firstElementChild;
        piezas.push(dentro && dentro.offsetHeight > 40 ? dentro : sec);
      }

      piezas.forEach(function (e, i) {
        e.classList.add('ba-rev');
        e.style.setProperty('--i', i);   // el escalonado lo pone el CSS
      });
    });
  }

  /* ============================================================
     OPINIONES LARGAS: SE PLIEGAN, NO SE REESCRIBEN.
     Son reales, de compradores de este mismo producto, y la ley europea
     (Directiva 2019/2161) no deja tocarles una palabra. Lo que si se puede es
     plegarlas: se ven cuatro lineas y un "Leer mas". El texto entero sigue en
     el DOM, asi que se puede leer completo y comprobar.
     Medido el 25-09: 19 pasaban de 200 caracteres y la mas larga tenia 765.
     Una sola llenaba la pantalla del movil.
     Regla: ux/texto-largo-plegado.
     ============================================================ */
  var PLIEGA_DESDE = 200;   // por debajo de esto cabe en cuatro lineas

  function plegarOpiniones(raiz) {
    var fichas = (raiz || document).querySelectorAll('.rsc');
    [].forEach.call(fichas, function (f) {
      var p = f.querySelector(':scope > p');
      if (!p || p.classList.contains('rsc-txt')) return;

      /* El 🗨 del principio no lo escribio el comprador: lo arrastra el volcado
         de AliExpress. Quitarlo no cambia la opinion. */
      p.textContent = p.textContent.replace(/^\s*[\u{1F5E8}\u{1F4AC}]️?\s*/u, '');

      if (p.textContent.trim().length <= PLIEGA_DESDE) return;

      p.classList.add('rsc-txt');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rsc-mas';
      b.textContent = 'Leer más';
      b.setAttribute('aria-expanded', 'false');
      b.addEventListener('click', function () {
        var abierta = p.classList.toggle('abierta');
        b.textContent = abierta ? 'Leer menos' : 'Leer más';
        b.setAttribute('aria-expanded', abierta ? 'true' : 'false');
      });
      p.insertAdjacentElement('afterend', b);
    });
  }

  /* Las opiniones se pintan despues, y se repintan al pulsar "ver mas
     opiniones": por eso no basta con hacerlo una vez. Se vigila el contenedor
     y se pliega lo que vaya entrando. */
  function vigilarOpiniones() {
    var caja = document.querySelector('.rev-sec') || document.querySelector('#prod');
    if (!caja) return;
    plegarOpiniones(caja);
    if (!('MutationObserver' in window)) return;
    var mo = new MutationObserver(function () { plegarOpiniones(caja); });
    mo.observe(caja, { childList: true, subtree: true });
  }

  /* ============================================================
     EL LADRILLO DE TEXTO.
     James, 26-09: "muy plano esto". Y tenia razon: 496 caracteres en un solo
     parrafo, sin un respiro, y debajo una lista de viñetas todas iguales.
     Lo que se hace es lo que hace una revista con un texto largo:
       · la primera frase sale como ENTRADILLA, un punto mas grande;
       · su primera letra, en capital de Bodoni, que es donde entra el ojo;
       · el resto se parte en parrafos de dos o tres frases.
     No se cambia NI UNA PALABRA: solo se reparte lo que ya estaba escrito.
     Reglas: jerarquia-editorial (4 niveles por tamaño y espacio) y
     medida-linea (34ch en movil).
     ============================================================ */
  function airearDescripcion(cont) {
    /* Se busca por CONTENIDO, no por contenedor.
       Las dos versiones anteriores iban por selector -primero
       'section.desc', luego '.bloque.desc'- y las dos se dejaron copias
       fuera: el mismo texto de 496 caracteres esta TRES veces en la pagina
       (la descripcion, .datos y .dscTop, la que va pegada al precio). James
       me enseño dos veces el mismo ladrillo ya "arreglado" porque yo miraba
       donde no estaba.
       Cualquier parrafo largo dentro de #prod se airea, este donde este. */
    var parrafosLargos = [].filter.call(
      cont.querySelectorAll('p'),
      function (p) {
        return !p.classList.contains('ba-leido')
            && (p.textContent || '').trim().length >= 260
            && !p.closest('.rsc');          // las opiniones se pliegan, no se parten
      });

    /* La lista va aparte del parrafo. Antes iba dentro del mismo bucle y, si
       el parrafo de ese bloque era corto, la funcion salia antes de llegar a
       la lista y se quedaba sin formato. Ademas hay DOS listas iguales: la de
       la descripcion y la de .datos. Las dos se peinan igual. */
    /* Igual que con los parrafos: por contenido, no por contenedor. Cualquier
       lista de tres o mas puntos dentro de #prod, este donde este. */
    var listas = [].filter.call(cont.querySelectorAll('ul'), function (u) {
      return u.children.length >= 3 && !u.closest('.rsc, .form, nav, .pie');
    });
    listas.forEach(function (ul) {
      if (ul.classList.contains('ba-puntos')) return;
      ul.classList.add('ba-puntos');
      [].forEach.call(ul.children, function (li, i) {
        li.classList.add('ba-rev');
        li.style.setProperty('--i', i);
      });
    });

    parrafosLargos.forEach(function (p) {
      var txt = (p.textContent || '').trim();

      /* Partir por frases. El punto de "9 g." o "0,32 oz." no cuenta: se pide
         espacio y mayuscula detras. */
      var frases = txt.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/);
      if (frases.length < 3) return;

      var entradilla = frases.shift();
      /* Grupos de dos frases: un parrafo de tres ya vuelve a pesar. */
      var parrafos = [];
      for (var i = 0; i < frases.length; i += 2) {
        parrafos.push(frases.slice(i, i + 2).join(' '));
      }

      /* Se heredan las clases del parrafo original. .dscTop, por ejemplo,
         trae su propio tamaño y color porque va pegada al precio: si se
         pierden, ese bloque se descoloca. */
      var heredadas = (p.className || '').trim();
      var html = '<p class="ba-entrada ba-leido ' + heredadas + '">'
               + '<span class="ba-cap" aria-hidden="true">' + esc(entradilla.charAt(0)) + '</span>'
               + esc(entradilla.slice(1)) + '</p>'
               + parrafos.map(function (t) {
                   return '<p class="ba-cuerpo ba-leido ' + heredadas + '">' + esc(t) + '</p>';
                 }).join('');
      p.insertAdjacentHTML('afterend', html);
      p.remove();
    });
  }

  var intentos = 0;
  (function esperar() {
    if (montar()) {
      airearDescripcion(document.querySelector('#prod') || document.body);
      animarElResto(document.querySelector('#prod') || document.body);
      vigilarOpiniones();
      contar(); espejo(); revelar();
      return;
    }
    if (++intentos > 60) return;
    setTimeout(esperar, 100);
  })();
})();
