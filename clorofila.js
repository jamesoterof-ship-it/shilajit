/* ============================================================
   El diseño propio de la Clorofila Liquida, montado sobre la ficha.

   Corre DESPUES de ficha.js. Si el producto no es la clorofila se va
   sin hacer nada, asi que los otros diez quedan igual que siempre.
   No toca el encabezado (.top) ni el pie (.pie): esos viven fuera de
   #prod y aca ni se nombran. Es la regla de James.

   Lo que hace:
     1. cambia la galeria por UNA foto de hero con la marea verde
        subiendo y las gotas cayendo encima
     2. mete la tira de datos (60 ml · menta · 1 mes) y el numero
        que se llena de verde
     3. convierte «Que es y para que sirve» en tres tarjetas con las
        fotos, que entran de lado alternando
   Lo demas de la ficha -promo, reseñas, preguntas, antes y despues y
   el formulario- sigue tal cual, para no romper la compra.
   ============================================================ */
(function () {
  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'clorofila') return;

  /* ---- las tres fotos SON «Que es y para que sirve» ----
     Cada pie cuenta algo que la foto NO trae escrito, para no decir lo
     mismo dos veces. Y ninguno promete salud: es suplemento y el
     D.S. 977/96 lo prohibe (ver el comentario de productos.js). */
  var FOTOS = [
    ['img/cl-gotero.webp?v=1',
     'Gotero dejando caer clorofila liquida dentro de un vaso de agua con hielo',
     'Como se usa', 'Se disuelve al instante',
     'Cae en el agua fria y se reparte sola, sin grumos y sin batidora. No hay que revolver dos minutos ni esperar a que baje el polvo del fondo.'],
    ['img/cl-cocina.webp?v=1',
     'Mujer en su cocina echando gotas de clorofila en un vaso de agua',
     'Cuando', 'En el vaso que ya te ibas a tomar',
     'No cambia tu rutina ni te obliga a preparar nada aparte. El vaso de agua de la mañana, el del almuerzo o el que dejas en el escritorio.'],
    ['img/cl-ficha.webp?v=1',
     'Ficha del producto con el frasco, la caja y los tres packs disponibles',
     'Que llega', 'El frasco de 60 ml con su caja',
     'Viene sellado, con gotero de vidrio y su estuche. Libre de alcohol y libre de gluten, declarado en el envase del fabricante.'],
  ];

  function ficha(src, alt, rotulo, titulo, texto) {
    return '<figure class="cl-fi">' +
      '<img src="' + src + '" alt="' + alt + '" loading="lazy" width="1024" height="1024">' +
      '<figcaption>' +
        '<span class="cl-rot2">' + rotulo + '</span>' +
        '<b>' + titulo + '</b>' +
        '<p>' + texto + '</p>' +
      '</figcaption>' +
    '</figure>';
  }

  function bloqueFotos() {
    return '<div class="cl-fichas">' + FOTOS.map(function (f) {
      return ficha(f[0], f[1], f[2], f[3], f[4]);
    }).join('') + '</div>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;                          /* ficha.js todavia no pinto */
    if (cont.querySelector('.cl-hero')) return true;    /* ya estaba puesto */

    document.body.classList.add('p-clorofila');

    var html =
      '<div class="cl-hero">' +
        '<img src="img/cl-hero.webp?v=1" alt="Frasco de clorofila liquida junto a un vaso de agua verde con hielo" fetchpriority="high">' +
        '<div class="cl-marea"></div>' +
        /* las gotas caen en la franja de arriba, que es cielo y encimera:
           por abajo esta el producto y ahi estorbarian */
        '<div class="cl-gotas">' +
          '<i style="left:12%;animation-delay:0s"></i>' +
          '<i style="left:34%;animation-delay:1.1s"></i>' +
          '<i style="left:58%;animation-delay:2.3s"></i>' +
          '<i style="left:79%;animation-delay:3.4s"></i>' +
        '</div>' +
        /* el texto entra EN CASCADA, trozo por trozo (James, 10-sep). El
           turno de cada uno va en --i; el estilo hace el resto. */
        '<div class="cl-sobre">' +
          '<span class="cl-rot cl-cae" style="--i:0">Clorofila líquida · 60 ml</span>' +
          '<h1 class="cl-h1">' +
            '<span class="cl-cae" style="--i:1">Tu vaso de agua</span>' +
            '<em class="cl-cae" style="--i:2">de siempre.</em>' +
          '</h1>' +
          '<p class="cl-cae" style="--i:3">Unas gotas y queda verde. Sabor menta, sin alcohol y sin gluten.</p>' +
        '</div>' +
      '</div>' +
      '<div class="cl-med">' +
        '<div><b>60</b><span>ml por frasco</span></div>' +
        '<div><b>1</b><span>mes te rinde</span></div>' +
        '<div><b>0</b><span>alcohol y gluten</span></div>' +
      '</div>' +
      '<section class="cl-blq">' +
        '<span class="cl-rot" style="color:var(--cl-claro)">Lo primero que preguntan</span>' +
        '<h2 class="cl-h2">¿A qué sabe?</h2>' +
        '<p class="cl-sub">A menta suave. No sabe a pasto ni deja regusto amargo, que es justo lo que casi todo el mundo teme antes de probarla.</p>' +
        '<div class="cl-gigante"><span class="cl-num">60</span><small>mililitros con gotero</small></div>' +
      '</section>';

    /* La GALERIA se va -arriba queda la foto del hero-, pero la CABECERA
       se queda: estrellas, nombre y el precio grande con el tachado. Es lo
       que el cliente busca apenas ve la foto. */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    var med = cont.querySelector('.cl-med');
    if (med) med.insertAdjacentElement('afterend', arriba);

    /* El bloque del «60» NO puede quedar pegado debajo del precio: ahi la ficha
       ya pone su boton y quedaban DOS BOTONES SEGUIDOS, que es regla rota.
       Se baja hasta justo antes de la descripcion. */
    var blq = cont.querySelector('.cl-blq');
    var desc = cont.querySelector('section.desc');
    if (blq && desc) desc.insertAdjacentElement('beforebegin', blq);

    /* «Que es y para que sirve» pasa a ser las tres tarjetas */
    if (!cont.querySelector('.cl-fichas')) {
      var descSec = null;
      var secs = cont.querySelectorAll('section.desc');
      for (var i = 0; i < secs.length; i++) {
        var t = secs[i].querySelector('.tit2');
        if (t && t.textContent.indexOf('Qué es') >= 0) { descSec = secs[i]; break; }
      }
      if (descSec) {
        var p = descSec.querySelector('p'); if (p) p.remove();
        var ul = descSec.querySelector('ul'); if (ul) ul.remove();
        descSec.insertAdjacentHTML('beforeend', bloqueFotos());
      }
    }

    efectos(cont);
    return true;
  }

  /* ---- efectos ----
     Igual que en el Organizador, lo que se marca es el estado ESCONDIDO y
     el observador lo QUITA cuando el cliente llega. Si el navegador no lo
     soporta o no alcanza a avisar, la marca se quita igual: nunca puede
     quedar contenido invisible por culpa de un efecto. */
  function efectos(cont) {
    var quieto = false;
    try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var primera = cont.querySelector('details');
    if (primera) primera.open = true;

    /* RED DE SEGURIDAD de la cascada. La animacion tiene `forwards`, pero
       efectos-ficha.js tambien mueve opacidades con GSAP y el texto se quedaba
       en cero. Regla que no se rompe: NUNCA puede quedar texto invisible por
       culpa de un efecto, asi que a los 2,5 s se quita la clase y el titulo
       vuelve a su estado normal, que ya es visible. */
    var letras = cont.querySelectorAll('.cl-cae');
    if (quieto) {
      letras.forEach(function (el) { el.classList.remove('cl-cae'); });
    } else {
      setTimeout(function () {
        letras.forEach(function (el) { el.classList.remove('cl-cae'); });
      }, 2500);
    }

    var piezas = [];
    /* las tarjetas entran de lado, alternando: izquierda, derecha, izquierda */
    cont.querySelectorAll('.cl-fi').forEach(function (el, i) {
      piezas.push([el, i % 2 ? 'cl-entra-d' : 'cl-entra-i']);
    });
    /* SOLO mis bloques: las secciones de la tienda las anima efectos-ficha.js
       con GSAP y si les meto encima mi clase, dos sistemas peleando por la
       misma opacidad. */
    ['.cl-med', '.cl-blq'].forEach(function (s) {
      cont.querySelectorAll(s).forEach(function (el) { piezas.push([el, 'cl-sec-entra']); });
    });
    if (!piezas.length) return;

    var num = cont.querySelector('.cl-num');

    /* ---- el CONTEO del 60 ----
       Sube de 0 a 60 y frena al final. Corre UNA sola vez. El HTML ya trae el
       60 escrito, asi que si el js no llega a arrancar nunca, el cliente ve el
       numero completo igual: el efecto no puede esconder el dato. */
    function contar(el, hasta, ms) {
      if (el.dataset.contado) return;
      el.dataset.contado = '1';
      var listo = false, t0 = null;
      function paso(t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / ms);
        if (listo) return;
        el.textContent = String(Math.round(hasta * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(paso);
        else { listo = true; el.textContent = String(hasta); }   /* cierra exacto */
      }
      /* RED DE SEGURIDAD del conteo. requestAnimationFrame NO corre si la
         pestaña esta en segundo plano o si el navegador tiene el reloj de
         cuadros parado, y ahi el numero se quedaria clavado en 0: el cliente
         veria «0 MILILITROS CON GOTERO». Regla que no se rompe: ningun efecto
         puede dejar un dato mal. Pase lo que pase, al final dice 60. */
      var seguro = setTimeout(function () {
        if (!listo) { listo = true; el.textContent = String(hasta); }
      }, ms + 700);
      el.textContent = '0';
      requestAnimationFrame(function (t) {
        if (listo) { clearTimeout(seguro); return; }
        paso(t);
      });
    }
    /* si pide menos movimiento, o el navegador no trae el observador, el 60 se
       queda quieto tal como viene en el HTML */
    if (quieto || !('IntersectionObserver' in window)) return;

    piezas.forEach(function (p) { p[0].classList.add(p[1]); });

    /* `conNumero` separa las dos cosas a proposito. La red de seguridad de mas
       abajo solo destapa el contenido; si tambien arrancara el conteo, el 60
       correria a los 2,5 s con el cliente todavia mirando el hero, y al llegar
       al bloque ya lo encontraria quieto en 60. */
    function encender(el, conNumero) {
      el.classList.remove('cl-entra-i', 'cl-entra-d', 'cl-sec-entra');
      if (!conNumero) return;
      var n = el.querySelector && el.querySelector('.cl-num');
      if (n) setTimeout(function () { contar(n, 60, 1400); }, 180);
    }

    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) { if (f.isIntersecting) { encender(f.target, true); obs.unobserve(f.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    piezas.forEach(function (p) { obs.observe(p[0]); });

    /* red de seguridad: si a los 2,5 s algo sigue marcado, se enciende igual.
       El numero NO se fuerza a contar aca: si nunca llego a verse, se queda
       con el 60 del HTML, que es lo correcto. */
    setTimeout(function () {
      piezas.forEach(function (p) { encender(p[0]); });
    }, 2500);
  }

  /* ficha.js pinta cuando termina de leer productos.js, asi que se
     reintenta hasta que aparezca .arriba2 */
  if (!montar()) {
    var n = 0;
    var t = setInterval(function () { if (montar() || ++n > 60) clearInterval(t); }, 120);
    document.addEventListener('DOMContentLoaded', montar);
    window.addEventListener('load', montar);
  }
})();
