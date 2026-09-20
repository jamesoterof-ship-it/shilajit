/* ============================================================
   El diseño propio del Cargador Reparador 12V, montado sobre la ficha.
   Tomado como ejemplo del de la Clorofila, con sus propios efectos.

   Corre DESPUES de ficha.js. Si el producto no es el cargador se va
   sin hacer nada, asi que los otros diez quedan igual que siempre.
   No toca el encabezado (.top) ni el pie (.pie): esos viven fuera de
   #prod y aca ni se nombran. Es la regla de James.

   Lo que hace:
     1. cambia la galeria por UNA foto de hero, con el pulso de
        corriente recorriendola, chispas arriba y el voltimetro
        que sube de 10.0 a 12.6 V
     2. mete la tira de datos (12V · 10A · sin taller) y el numero
        grande que cuenta hasta 100
     3. convierte «Que es y para que sirve» en tres tarjetas con las
        fotos, que suben escalonadas
   Lo demas de la ficha -promo, reseñas, preguntas, antes y despues y
   el formulario- sigue tal cual, para no romper la compra.
   ============================================================ */
(function () {
  function slug() {
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'cargador') return;

  /* ---- las tres fotos SON «Que es y para que sirve» ----
     Cada pie cuenta algo que la foto NO trae escrito, para no decir dos
     veces lo mismo. Nada de promesas: solo lo que el aparato hace y que
     ya esta en la ficha que Camila usa por WhatsApp. */
  var FOTOS = [
    ['img/prod-cargador-2.webp?v=1',
     'Cargador reparador de baterias 12V con su pantalla, las pinzas y el cable',
     'Que llega', 'Pantalla, pinzas y cable',
     'Viene listo para usar: las pinzas, el cable y la pantalla. Se enchufa a un toma corriente comun de la casa, sin taller y sin mecanico.'],
    ['img/prod-cargador.webp?v=1',
     'Persona conectando las pinzas del cargador a la bateria del auto',
     'Como se conecta', 'La roja al positivo, la negra al negativo',
     'No hay que desmontar la bateria ni sacarla del auto. Se conecta con el capo abierto y el aparato hace el resto solo.'],
    ['img/prod-cargador-3.webp?v=1',
     'Pantalla del cargador encendida mostrando el voltaje de la bateria',
     'Mientras trabaja', 'La pantalla te dice como va',
     'Ves el voltaje real en todo momento, y cuando la bateria queda lista corta la carga por su cuenta. Lo dejas conectado tranquilo.'],
  ];

  function ficha(src, alt, rotulo, titulo, texto) {
    return '<figure class="cg-fi">' +
      '<img src="' + src + '" alt="' + alt + '" loading="lazy" width="1024" height="1024">' +
      '<figcaption>' +
        '<span class="cg-rot2">' + rotulo + '</span>' +
        '<b>' + titulo + '</b>' +
        '<p>' + texto + '</p>' +
      '</figcaption>' +
    '</figure>';
  }

  function bloqueFotos() {
    return '<div class="cg-fichas">' + FOTOS.map(function (f) {
      return ficha(f[0], f[1], f[2], f[3], f[4]);
    }).join('') + '</div>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;                          /* ficha.js todavia no pinto */
    if (cont.querySelector('.cg-hero')) return true;    /* ya estaba puesto */

    document.body.classList.add('p-cargador');

    var html =
      '<div class="cg-hero">' +
        '<div class="cg-sobre">' +
          '<span class="cg-rot cg-cae" style="--i:0">Cargador inteligente · carga, repara y protege</span>' +
          '<h1 class="cg-h1">' +
            '<span class="cg-cae" style="--i:1">No la botes.</span>' +
            '<em class="cg-cae" style="--i:2">Recupérala.</em>' +
          '</h1>' +
        '</div>' +
        '<div class="cg-foto">' +
          '<img src="img/prod-cargador-4.webp?v=1" alt="Cargador reparador de baterias 12V con la pantalla encendida y las pinzas" fetchpriority="high">' +
          '<div class="cg-pulso"></div>' +
          /* las chispas caen en la franja de arriba, donde no esta el producto */
          '<div class="cg-chispas">' +
            '<i style="left:14%;top:22%;animation-delay:0s"></i>' +
            '<i style="left:38%;top:12%;animation-delay:.9s"></i>' +
            '<i style="left:62%;top:28%;animation-delay:1.7s"></i>' +
            '<i style="left:84%;top:16%;animation-delay:2.4s"></i>' +
          '</div>' +
          /* el voltimetro: el HTML ya trae el 12.6 escrito, asi que si el js
             no alcanza a contar, el cliente ve el dato completo igual */
          '<div class="cg-volt"><b>12.6</b><span>V</span></div>' +
        '</div>' +
      '</div>' +
      '<p class="cg-bajada">El sulfato pegado en las placas es lo que impide que tu batería tome carga. Este cargador manda pulsos que lo limpian y la deja cargando otra vez. Auto, moto, camioneta o lancha.</p>' +
      '<div class="cg-med">' +
        '<div><b>12</b><span>volts, cualquier batería</span></div>' +
        '<div><b>10</b><span>amperes de carga</span></div>' +
        '<div><b>0</b><span>taller ni mecánico</span></div>' +
      '</div>' +
      '<section class="cg-blq">' +
        '<span class="cg-rot">Lo que hace</span>' +
        '<h2 class="cg-h2">¿Qué le hace a tu batería?</h2>' +
        '<p class="cg-sub">Un cargador común solo le mete corriente. Este trabaja sobre el sulfato de las placas, que es la razón real de que la batería no tome carga. Por eso recupera baterías que ya nadie cargaba, y te ahorra comprar una nueva.</p>' +
        '<div class="cg-gigante"><span class="cg-num">100</span><small>Ah · hasta ese tamaño de batería</small></div>' +
      '</section>';

    /* La GALERIA se va -arriba queda la foto del hero-, pero la CABECERA
       se queda: estrellas, nombre y el precio grande con el tachado. */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    var med = cont.querySelector('.cg-med');
    if (med) med.insertAdjacentElement('afterend', arriba);

    /* El bloque del «100» NO puede quedar pegado debajo del precio: ahi la
       ficha ya pone su boton y quedarian DOS BOTONES SEGUIDOS, que es regla
       rota. Se baja hasta justo antes de la descripcion. */
    var blq = cont.querySelector('.cg-blq');
    var desc = cont.querySelector('section.desc');
    if (blq && desc) desc.insertAdjacentElement('beforebegin', blq);

    /* «Que es y para que sirve» pasa a ser las tres tarjetas */
    if (!cont.querySelector('.cg-fichas')) {
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
     Se marca el estado ESCONDIDO y el observador lo QUITA cuando el cliente
     llega. Si el navegador no lo soporta o no alcanza a avisar, la marca se
     quita igual: NUNCA puede quedar contenido invisible por un efecto. */
  function efectos(cont) {
    var quieto = false;
    try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var primera = cont.querySelector('details');
    if (primera) primera.open = true;

    /* red de seguridad de la cascada del rotulo */
    var letras = cont.querySelectorAll('.cg-cae');
    if (quieto) {
      letras.forEach(function (el) { el.classList.remove('cg-cae'); });
    } else {
      setTimeout(function () {
        letras.forEach(function (el) { el.classList.remove('cg-cae'); });
      }, 2500);
    }

    /* ---- el VOLTIMETRO del hero: sube de 10.0 a 12.6 V una sola vez ----
       Con red de seguridad: pase lo que pase termina en 12.6, porque el
       voltaje es un DATO y un efecto no puede dejarlo mal. */
    var volt = cont.querySelector('.cg-volt b');
    if (volt && !quieto) {
      var desde = 10.0, hasta = 12.6, ms = 2200, t0 = null, cerrado = false;
      var seguro = setTimeout(function () {
        if (!cerrado) { cerrado = true; volt.textContent = hasta.toFixed(1); }
      }, ms + 900);
      function pasoV(t) {
        if (cerrado) return;
        if (t0 === null) t0 = t;
        var x = Math.min(1, (t - t0) / ms);
        volt.textContent = (desde + (hasta - desde) * (1 - Math.pow(1 - x, 3))).toFixed(1);
        if (x < 1) requestAnimationFrame(pasoV);
        else { cerrado = true; clearTimeout(seguro); volt.textContent = hasta.toFixed(1); }
      }
      volt.textContent = desde.toFixed(1);
      requestAnimationFrame(pasoV);
    }

    var piezas = [];
    /* las tarjetas SUBEN escalonadas (en la clorofila entran de lado) */
    cont.querySelectorAll('.cg-fi').forEach(function (el, i) {
      el.style.transitionDelay = (i * 90) + 'ms';
      piezas.push([el, 'cg-entra-ab']);
    });
    /* SOLO mis bloques: las secciones de la tienda las anima efectos-ficha.js
       con GSAP y si les meto encima mi clase, dos sistemas peleando por la
       misma opacidad. */
    ['.cg-med', '.cg-blq'].forEach(function (s) {
      cont.querySelectorAll(s).forEach(function (el) { piezas.push([el, 'cg-sec-entra']); });
    });
    if (!piezas.length) return;

    /* ---- el CONTEO del 100 ----
       El HTML ya trae el 100 escrito: si el js nunca arranca, el cliente ve
       el numero completo. Ningun efecto puede dejar un dato mal. */
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
        else { listo = true; el.textContent = String(hasta); }
      }
      var seguro = setTimeout(function () {
        if (!listo) { listo = true; el.textContent = String(hasta); }
      }, ms + 700);
      el.textContent = '0';
      requestAnimationFrame(function (t) {
        if (listo) { clearTimeout(seguro); return; }
        paso(t);
      });
    }

    if (quieto || !('IntersectionObserver' in window)) return;

    piezas.forEach(function (p) { p[0].classList.add(p[1]); });

    function encender(el, conNumero) {
      el.classList.remove('cg-entra-ab', 'cg-sec-entra');
      if (!conNumero) return;
      var n = el.querySelector && el.querySelector('.cg-num');
      if (n) setTimeout(function () { contar(n, 100, 1400); }, 180);
    }

    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) { if (f.isIntersecting) { encender(f.target, true); obs.unobserve(f.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    piezas.forEach(function (p) { obs.observe(p[0]); });

    /* red de seguridad: si a los 2,5 s algo sigue marcado, se enciende igual.
       El numero NO se fuerza a contar aca: si nunca se vio, se queda con el
       100 del HTML, que es lo correcto. */
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
