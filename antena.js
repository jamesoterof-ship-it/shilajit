/* ============================================================
   Diseño propio de la ANTENA, montado sobre la ficha.

   Corre DESPUES de ficha.js. Si el producto no es la antena se va sin
   hacer nada. No toca el encabezado (.top) ni el pie (.pie): viven fuera
   de #prod. Es la regla de James.

   Lo que hace:
     1. cambia la galeria por el HERO (foto vertical de James) con el
        titulo que SINTONIZA, ondas de señal en la punta de la antena y
        un contador que busca canales
     2. pone tres chips: canales en HD · sin mensualidad · base magnetica
     3. mete «Se instala en 2 minutos» con el VIDEO real de instalacion
        (el mismo que Camila manda despues de la compra) y los 3 pasos
     4. tres fotos reales que entran borrosas y se enfocan, dentro de
        «Que es y para que sirve»
   Lo demas de la ficha (promo, reseñas, preguntas, formulario) sigue
   tal cual, para no romper la compra.

   Efectos distintos a la clorofila y la Lymphoria (James, 14-sep):
   ver antena.css.
   ============================================================ */
(function () {
  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'antena') return;

  /* iconos en SVG, nunca emojis (trazo 1.8, todos del mismo juego) */
  var ICO = {
    hd: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 9v6M7.5 12h3M10.5 9v6M14 9h2.2a3 3 0 0 1 0 6H14z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    libre: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M4 12l4-4M4 12l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/><path d="M6 8h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 13l16-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    iman: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4v8a6 6 0 0 0 12 0V4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 4h4v5H6zM14 4h4v5h-4z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>'
  };
  function chip(ico, txt) { return '<span class="an-chip">' + ico + txt + '</span>'; }
  function barras() { var s = ''; for (var i = 0; i < 4; i++) s += '<i style="--n:' + i + '"></i>'; return '<span class="an-barras" aria-hidden="true">' + s + '</span>'; }

  /* pone el estado "antes" y lo quita cuando el elemento entra en pantalla.
     conRed: a los 10 s lo quita igual (para lo que es contenido, no adorno) */
  function revelar(els, espera, conRed) {
    els = [].slice.call(els);
    if (!els.length) return;
    els.forEach(function (el) { el.classList.add(espera); });
    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (f.isIntersecting) { f.target.classList.remove(espera); obs.unobserve(f.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    els.forEach(function (el) { obs.observe(el); });
    if (conRed) setTimeout(function () { els.forEach(function (el) { el.classList.remove(espera); }); }, 10000);
  }

  function pasos() {
    var P = [
      ['La conectas al televisor', 'Un solo cable al puerto de antena que trae cualquier tele. No hay app, no hay clave, no hay técnico.'],
      ['La pegas donde entre la señal', 'La base es magnética: se afirma sola en el marco de la ventana o en el mueble. El cable de 3 metros llega hasta allá.'],
      ['Buscas canales y listo', 'En el menú del televisor le das «buscar canales» y en dos minutos tienes los canales chilenos en HD, gratis.'],
    ];
    return '<section class="an-pasos">' +
      '<span class="an-rot2">Así de simple</span>' +
      '<h2 class="an-h2">Se instala en 2 minutos' + barras() + '</h2>' +
      '<ol class="an-lista">' + P.map(function (p, i) {
        return '<li data-n="' + (i + 1) + '" style="--i:' + i + '"><b>' + p[0] + '</b><p>' + p[1] + '</p></li>';
      }).join('') + '</ol>' +
    '</section>';
  }

  /* las tres fotos reales van DENTRO de «Que es y para que sirve». Cada pie
     cuenta algo que la foto no trae escrito. */
  function fichas() {
    var F = [
      ['prod-antena-2.webp', 'La antena de pie sobre su base magnética, junto al televisor',
       'Base magnética', 'Se afirma sola, no se cae',
       'Las antenas comunes se caen con el peso del cable. Esta tiene base magnética y peso propio: la pones y se queda ahí.'],
      ['prod-antena-3.webp', 'La antena con el cable extendido hasta la ventana',
       'Cable de 3 metros', 'Llega hasta la ventana',
       'La señal entra mejor cerca de la ventana. Con 3 metros de cable la pones ahí sin alargadores ni mover el televisor.'],
      ['prod-antena-4.webp', 'Televisor mostrando un canal en alta definición con la antena conectada',
       'Canales en HD', 'Sin mensualidad, sin contrato',
       'Capta los canales chilenos abiertos en alta definición: noticias, fútbol, teleseries. Se paga una vez y no vuelve a cobrar nadie.'],
    ];
    return '<div class="an-fichas">' + F.map(function (f) {
      return '<figure class="an-fi">' +
        '<img src="img/' + f[0] + '" alt="' + f[1] + '" loading="lazy" width="1000" height="1000">' +
        '<span class="an-sello" aria-hidden="true">HD</span>' +
        '<figcaption><span class="an-rot2">' + f[2] + '</span><b>' + f[3] + '</b><p>' + f[4] + '</p></figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;                          /* ficha.js todavia no pinto */
    if (cont.querySelector('.an-hero')) return true;    /* ya estaba puesto */

    document.body.classList.add('p-antena');

    var ondas = '';
    for (var i = 0; i < 3; i++) ondas += '<i class="an-onda" style="--i:' + i + '"></i>';

    var html =
      '<div class="an-hero">' +
        '<img src="img/antena-hero.webp?v=2" alt="Antena TV Digital HD sobre el mueble del living, junto al televisor encendido" fetchpriority="high" width="1024" height="1536">' +
        '<div class="an-velo"></div>' +
        '<div class="an-ondas" aria-hidden="true">' + ondas + '</div>' +
        '<div class="an-sobre">' +
          '<span class="an-rot"><i></i>Antena TV Digital HD · pack de 2</span>' +
          '<h1 class="an-h1">' +
            '<span class="an-sinto" style="--i:0">Todos los canales</span>' +
            '<span class="an-sinto" style="--i:1">chilenos en <span class="an-hd">HD</span>,</span>' +
            '<span class="an-sinto" style="--i:2">sin pagar mensualidad.</span>' +
          '</h1>' +
          '<p class="an-bajada an-aparece">Se conecta, buscas canales y listo. Pagas cuando te llega.</p>' +
        '</div>' +
        '<div class="an-cont an-busca" aria-live="polite"><b data-fin="40">0</b><small>canales</small></div>' +
      '</div>' +
      '<div class="an-chips">' + chip(ICO.hd, 'Canales en HD') + chip(ICO.libre, 'Sin mensualidad') + chip(ICO.iman, 'Base magnética') + '</div>';

    /* la GALERIA se va (arriba queda el hero); la cabecera con estrellas,
       nombre, precio y boton se queda, justo debajo de los chips */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) { var el = arriba.querySelector(s); if (el) el.remove(); });
    var chips = cont.querySelector('.an-chips');
    if (chips) chips.insertAdjacentElement('afterend', arriba);

    /* pasos + video antes de la descripcion. Ninguno lleva boton: debajo del
       precio ya esta el de la ficha, y dos seguidos rompen la regla */
    var desc = cont.querySelector('section.desc');
    if (desc && !cont.querySelector('.an-pasos')) desc.insertAdjacentHTML('beforebegin', pasos());

    /* «Que es y para que sirve» pasa a ser las tres tarjetas: se busca la
       seccion por su titulo y se le cuelgan las fichas al final */
    if (!cont.querySelector('.an-fichas')) {
      var descSec = null;
      var secs = cont.querySelectorAll('section.desc');
      for (var k = 0; k < secs.length; k++) {
        var t = secs[k].querySelector('.tit2');
        if (t && t.textContent.indexOf('Qué es') >= 0) { descSec = secs[k]; break; }
      }
      if (descSec) {
        /* la tienda deja los puntos en opacidad 0 hasta que la seccion recibe
           la clase «vino» (ver lymphoria.js): con las fichas la seccion crece y
           el 12% no cabe en un celular. Se prende viendo cualquier parte. */
        var prender = function () { descSec.classList.add('vino'); };
        if ('IntersectionObserver' in window) {
          var ojo = new IntersectionObserver(function (filas) {
            if (filas.some(function (f) { return f.isIntersecting; })) { prender(); ojo.disconnect(); }
          }, { threshold: 0 });
          ojo.observe(descSec);
        } else prender();
        setTimeout(prender, 4000);
        descSec.insertAdjacentHTML('beforeend', fichas());
      }
    }

    efectos(cont);
    return true;
  }

  function efectos(cont) {
    var quieto = false;
    try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var primera = cont.querySelector('details');
    if (primera) primera.open = true;

    /* RED DE SEGURIDAD del titulo: la animacion termina en 1,8 s; a los 2,8 s
       se quitan las clases y el texto queda en su estado normal, visible. */
    cont.querySelectorAll('.an-chip').forEach(function (c, i) {
      c.style.setProperty('--i', i);
      if (!quieto) c.classList.add('an-iman');
    });
    var subir = cont.querySelectorAll('.an-sinto, .an-aparece, .an-iman');
    setTimeout(function () {
      subir.forEach(function (el) { el.classList.remove('an-sinto', 'an-aparece', 'an-iman'); });
    }, quieto ? 0 : 2800);

    /* CONTADOR: busca canales (salta numeros al azar) y aterriza en el final */
    var cnt = cont.querySelector('.an-cont b');
    if (cnt) {
      var fin = Number(cnt.getAttribute('data-fin')) || 40;
      var caja = cnt.parentNode;
      if (quieto) { cnt.textContent = fin; caja.classList.remove('an-busca'); }
      else {
        var t0 = Date.now(), dur = 2400;
        /* red de seguridad: si el navegador frena los cuadros (pestaña de
           fondo, celular lento), el numero final queda puesto igual */
        setTimeout(function () { cnt.textContent = fin; caja.classList.remove('an-busca'); }, dur + 400);
        (function paso() {
          var p = Math.min(1, (Date.now() - t0) / dur);
          if (p < .75) cnt.textContent = Math.floor(Math.random() * fin * 1.4);
          else cnt.textContent = Math.round(fin * (0.6 + 0.4 * ((p - .75) / .25)));
          if (p < 1) requestAnimationFrame(paso);
          else { cnt.textContent = fin; caja.classList.remove('an-busca'); }
        })();
      }
    }

    /* ONDAS: se colocan en la punta de la antena. La foto provisional y la de
       James tienen la antena en el centro-derecha del tercio inferior; si el
       hero cambia, se ajustan --px/--py en el CSS o aca. */
    var ond = cont.querySelector('.an-ondas');
    /* hero de James (14-09): la punta de la antena queda al 49% del ancho y
       al 59,5% del alto */
    if (ond) { ond.style.setProperty('--px', '49%'); ond.style.setProperty('--py', '59.5%'); }

    /* El VIDEO de instalacion ya no se arma aca: va por el campo `video` de
       productos.js y lo pinta la ficha abajo, sin sonido, en bucle y arrancando
       solo, como en los demas productos (James, 14-09). */

    /* barras de señal bajo los titulos de seccion de la ficha (el h1 no) */
    var tits = cont.querySelectorAll('section.bloque h2, section.form h2');
    tits.forEach(function (h) {
      if (h.querySelector('.an-barras')) return;
      h.insertAdjacentHTML('beforeend', barras());
    });
    var conBarras = cont.querySelectorAll('.an-h2, section.bloque h2, section.form h2');

    if (!quieto && 'IntersectionObserver' in window) {
      revelar(conBarras, 'an-espera', false);                      /* adorno: sin red */
      revelar(cont.querySelectorAll('.an-fi'), 'an-espera', true);  /* fotos: con red */
    }

    /* el cable de los pasos se "enchufa" cuando el cliente llega */
    var lista = cont.querySelector('.an-lista');
    if (!lista || quieto || !('IntersectionObserver' in window)) return;
    lista.classList.add('an-antes');
    var hecho = false;
    function prender() { if (hecho) return; hecho = true; lista.classList.remove('an-antes'); }
    var obs = new IntersectionObserver(function (filas) {
      if (filas.some(function (f) { return f.isIntersecting; })) { prender(); obs.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    obs.observe(lista);
    setTimeout(function () { prender(); obs.disconnect(); }, 6000);
  }

  /* ficha.js pinta cuando termina de leer productos.js: se reintenta */
  if (!montar()) {
    var n = 0;
    var t = setInterval(function () { if (montar() || ++n > 60) clearInterval(t); }, 120);
    document.addEventListener('DOMContentLoaded', montar);
    window.addEventListener('load', montar);
  }
})();
