/* ============================================================
   Diseño propio de la LYMPHORIA, montado sobre la ficha.

   Corre DESPUES de ficha.js. Si el producto no es la Lymphoria se va sin
   hacer nada. No toca el encabezado (.top) ni el pie (.pie): viven fuera
   de #prod. Es la regla de James.

   Lo que hace:
     1. cambia la galeria por el HERO que hizo James (tocador, gota dorada)
        con el titulo arriba, la gota que cae y la onda en el frasco
     2. pone tres chips: sabor a miel · vegano · sin gluten
     3. mete «Tres pasos y listo» y dos fotos del producto real antes de
        «Que es y para que sirve»
   Lo demas de la ficha (promo, reseñas, preguntas, formulario) sigue
   tal cual, para no romper la compra.

   🔴 LIMITE LEGAL: es un suplemento (D.S. 977/96). Aca no se dice que
   desinflama, ni hinchazon, ni retencion, ni que adelgaza o desintoxica,
   ni cuantas gotas tomar. Solo hechos del producto y de la compra.
   ============================================================ */
(function () {
  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'lymphoria') return;

  /* iconos en SVG, nunca emojis */
  var ICO = {
    miel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3 4.2 6 7.4 6 10.6a6 6 0 0 1-12 0C6 10.4 9 7.2 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    hoja: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 11 10 6 19 5c-1 9-6 14-14 14zm0 0 7-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    trigo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V9m0 4c-2-1-3.2-2.8-3.2-5 2 .2 3.2 1.4 3.2 3.4M12 13c2-1 3.2-2.8 3.2-5-2 .2-3.2 1.4-3.2 3.4M4 4l16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  function chip(ico, txt) { return '<span class="ly-chip">' + ico + txt + '</span>'; }

  /* polvo de miel del hero: posiciones y tiempos al azar, asi no marchan en fila */
  function motas() {
    var s = '';
    for (var i = 0; i < 14; i++) {
      s += '<i class="ly-mota" style="left:' + (30 + Math.random() * 64).toFixed(1) + '%;' +
        '--s:' + (5 + Math.random() * 5).toFixed(1) + 'px;--d:' + (Math.random() * 6).toFixed(2) + 's;' +
        '--t:' + (7 + Math.random() * 5).toFixed(2) + 's;--x:' + Math.round(Math.random() * 40 - 20) + 'px"></i>';
    }
    return s;
  }

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
      ['Lo recibes en tu casa', 'Envío gratis a todo Chile. Le pagas al repartidor cuando lo tienes en la mano.'],
      ['Unas gotas en tu vaso', 'En agua o en jugo, en el momento del día que prefieras. La dosis sugerida viene en la etiqueta.'],
      ['Sigues con tu día', 'No hay que preparar nada aparte. Sabe a miel y el frasco cabe en la cartera.'],
    ];
    return '<section class="ly-pasos">' +
      '<span class="ly-rot2">Así de simple</span>' +
      '<h2 class="ly-h2">Tres pasos y listo</h2>' +
      '<ol class="ly-lista">' + P.map(function (p, i) {
        return '<li data-n="' + (i + 1) + '" style="--i:' + i + '"><b>' + p[0] + '</b><p>' + p[1] + '</p></li>';
      }).join('') + '</ol>' +
    '</section>';
  }

  /* las tres fotos 1:1 de James van DENTRO de «Que es y para que sirve»,
     como en la clorofila. Cada pie cuenta algo que la foto no trae escrito,
     para no decir dos veces lo mismo. Ninguno promete salud: es suplemento
     y el D.S. 977/96 lo prohibe. */
  function fichas() {
    var F = [
      ['ly-p1.webp', 'La caja de envío abierta sobre el mueble, con el estuche y el frasco encima',
       'Cómo llega', 'Sellado y con su estuche',
       'Llega el frasco de vidrio ámbar dentro de su caja, con el gotero puesto. Lo abres tú: nadie lo destapa antes.'],
      ['ly-p2.webp', 'El gotero soltando gotas doradas en un vaso de agua con hielo, junto al frasco',
       'Cómo se toma', 'Se reparte solo en el vaso',
       'Es líquido: unas gotas en agua o en jugo y listo. No hay cápsulas que tragar ni polvo que se quede en el fondo.'],
      ['ly-p3.webp', 'Mujer en su cocina con el frasco en una mano y un vaso de agua con limón en la otra',
       'Cuándo', 'En el vaso que ya te ibas a tomar',
       'No te cambia la rutina. El de la mañana, el del almuerzo o el que dejas en el escritorio. Y sabe a miel.'],
    ];
    return '<div class="ly-fichas">' + F.map(function (f) {
      return '<figure class="ly-fi">' +
        '<img src="img/' + f[0] + '?v=1" alt="' + f[1] + '" loading="lazy" width="1000" height="1000">' +
        '<figcaption><span class="ly-rot2">' + f[2] + '</span><b>' + f[3] + '</b><p>' + f[4] + '</p></figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  /* el antes y el ahora: es de la RUTINA, no del cuerpo. Un suplemento no
     puede mostrar cambios del cuerpo (D.S. 977/96) y Meta los rechaza. */
  function cambio() {
    return '<section class="ly-cambio">' +
      '<span class="ly-rot2">El cambio</span>' +
      '<h2 class="ly-h2">De los polvos y las cápsulas, a unas gotas</h2>' +
      '<img src="img/ly-cambio.webp?v=1" loading="lazy" width="1000" height="1250" ' +
        'alt="Arriba, la mesada llena de frascos de cápsulas y un vaso mezclador con grumos. Abajo, unas gotas de Lymphoria en un vaso de agua con limón">' +
    '</section>';
  }

  /* fotos del producto real: el mismo frasco y la misma caja que despachamos */
  function llega() {
    return '<section class="ly-llega">' +
      '<span class="ly-rot2">El producto real</span>' +
      '<h2 class="ly-h2">Caja sellada, frasco de vidrio y gotero</h2>' +
      '<div class="ly-fotos">' +
        '<img src="img/ly-llega1.webp?v=1" alt="Caja y frasco Lymphoria en la mano" loading="lazy" width="800" height="1000">' +
        /* la segunda NO es otra toma del mismo video (salian casi iguales):
           es la foto de estudio, que en la ficha no se ve porque el hero
           reemplaza la galeria. Asi va el producto en la mano y en limpio */
        '<img src="img/prod-lymphoria.webp?v=1" alt="Caja y frasco Lymphoria, foto de estudio" loading="lazy" width="1000" height="1000">' +
      '</div>' +
      '<p class="ly-pie">Frasco de vidrio de 60 ml, con su gotero y su caja.</p>' +
    '</section>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;                          /* ficha.js todavia no pinto */
    if (cont.querySelector('.ly-hero')) return true;    /* ya estaba puesto */

    document.body.classList.add('p-lymphoria');

    var html =
      '<div class="ly-hero">' +
        '<img src="img/lym-hero.webp?v=1" alt="Frasco y caja Lymphoria sobre un tocador, con una gota dorada cayendo del gotero" fetchpriority="high" width="1024" height="1536">' +
        '<div class="ly-velo"></div>' + motas() +
        '<div class="ly-caida"><i class="ly-gota"></i></div>' +
        '<i class="ly-onda"></i>' +
        '<div class="ly-sobre">' +
          '<span class="ly-rot">Lymphoria · 60 ml en gotas</span>' +
          '<h1 class="ly-h1">' +
            '<span class="ly-linea"><span class="ly-sube" style="--i:0">Tu rutina,</span></span>' +
            '<span class="ly-linea"><span class="ly-sube" style="--i:1">en gotas</span></span>' +
            '<span class="ly-linea"><span class="ly-sube ly-oro" style="--i:2">doradas.</span></span>' +
          '</h1>' +
          '<p class="ly-bajada ly-sube2">Sabor a miel, vegano y sin gluten. Pagas cuando te llega.</p>' +
        '</div>' +
      '</div>' +
      '<div class="ly-chips">' + chip(ICO.miel, 'Sabor a miel') + chip(ICO.hoja, 'Vegano') + chip(ICO.trigo, 'Sin gluten') + '</div>';

    /* la GALERIA se va (arriba queda el hero); la cabecera con estrellas,
       nombre, precio y boton se queda, justo debajo de los chips */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) { var el = arriba.querySelector(s); if (el) el.remove(); });
    var chips = cont.querySelector('.ly-chips');
    if (chips) chips.insertAdjacentElement('afterend', arriba);

    /* pasos + producto real antes de la descripcion. Ninguno lleva boton:
       debajo del precio ya esta el de la ficha, y dos seguidos rompen la regla */
    var desc = cont.querySelector('section.desc');
    if (desc && !cont.querySelector('.ly-pasos')) desc.insertAdjacentHTML('beforebegin', pasos() + cambio() + llega());
    /* Las tres tarjetas van en «Que es y para que sirve». La seccion se busca
       por su titulo, como en la clorofila. Diferencia a proposito (James,
       11-sep: «no tienen que ser igual»): alla las tarjetas REEMPLAZAN el texto;
       aca lo COMPLEMENTAN, asi que el parrafo y los puntos se quedan. */
    if (!cont.querySelector('.ly-fichas')) {
      var descSec = null;
      var secs = cont.querySelectorAll('section.desc');
      for (var i = 0; i < secs.length; i++) {
        var t = secs[i].querySelector('.tit2');
        if (t && t.textContent.indexOf('Qué es') >= 0) { descSec = secs[i]; break; }
      }
      if (descSec) descSec.insertAdjacentHTML('beforeend', fichas());
    }

    efectos(cont);
    return true;
  }

  function efectos(cont) {
    var quieto = false;
    try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var primera = cont.querySelector('details');
    if (primera) primera.open = true;

    /* RED DE SEGURIDAD del titulo: la animacion termina en 1,2 s; a los 2,6 s
       se quita la clase y el texto queda en su estado normal, que es visible.
       Nunca puede quedar un titulo escondido por culpa de un efecto. */
    cont.querySelectorAll('.ly-chip').forEach(function (c, i) {
      c.style.setProperty('--i', i);
      if (!quieto) c.classList.add('ly-pop');
    });
    var subir = cont.querySelectorAll('.ly-sube, .ly-sube2, .ly-pop');
    setTimeout(function () {
      subir.forEach(function (el) { el.classList.remove('ly-sube', 'ly-sube2', 'ly-pop'); });
    }, quieto ? 0 : 2600);

    /* destello en las estrellas de la cabecera */
    var est = cont.querySelector('.estrellas .est');
    if (est && !est.querySelector('.ly-glint')) est.insertAdjacentHTML('beforeend', '<i class="ly-glint"></i>');

    /* trazo de miel bajo cada titulo de seccion (el h1 del hero no) */
    var tits = cont.querySelectorAll('.ly-h2, section.bloque h2, section.form h2');
    tits.forEach(function (h) {
      if (h.querySelector('.ly-trazo')) return;
      h.insertAdjacentHTML('beforeend', '<svg class="ly-trazo" viewBox="0 0 120 10" aria-hidden="true"><path d="M3 7C30 2 62 9 117 4"/></svg>');
      if (getComputedStyle(h).textAlign === 'center') h.classList.add('ly-centro');
    });

    /* barra de miel arriba, se llena al bajar */
    if (!quieto && !document.querySelector('.ly-barra')) {
      var barra = document.createElement('div');
      barra.className = 'ly-barra'; barra.setAttribute('aria-hidden', 'true');
      document.body.appendChild(barra);
      var pend = false;
      var medir = function () {
        pend = false;
        var h = document.documentElement.scrollHeight - innerHeight;
        barra.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')';
      };
      addEventListener('scroll', function () { if (!pend) { pend = true; requestAnimationFrame(medir); } }, { passive: true });
      medir();
    }

    if (!quieto && 'IntersectionObserver' in window) {
      revelar(tits, 'ly-espera', false);                          /* adorno: sin red */
      revelar(cont.querySelectorAll('.ly-fotos, .ly-fi'), 'ly-espera', true); /* fotos: con red */
    }

    /* la linea de los pasos se dibuja cuando el cliente llega a ella */
    var lista = cont.querySelector('.ly-lista');
    if (!lista || quieto || !('IntersectionObserver' in window)) return;
    lista.classList.add('ly-antes');
    var hecho = false;
    function prender() { if (hecho) return; hecho = true; lista.classList.remove('ly-antes'); }
    var obs = new IntersectionObserver(function (filas) {
      if (filas.some(function (f) { return f.isIntersecting; })) { prender(); obs.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    obs.observe(lista);
    /* red de seguridad: si el observador no avisa, a los 6 s se muestra igual */
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
