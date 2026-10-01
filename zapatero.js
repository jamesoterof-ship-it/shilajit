/* ============================================================
   El diseño propio del Zapatero Colgador, montado sobre la ficha. Desde el 01-10 los colores,
   las letras y los efectos salen de la skill ui-ux-pro-max (ver zapatero.css); ya no es la
   copia del Organizador.

   Corre DESPUES de ficha.js. Si el producto no es el zapatero
   se va sin hacer nada, asi que los otros 9 quedan igual que
   siempre. No toca el encabezado (.top) ni el pie (.pie): esos
   viven fuera de #prod y aca ni se nombran.

   Lo que hace:
     1. cambia la galeria y la cabecera por UNA sola foto con el
        texto cayendo en cascada arriba, sin tapar las cajas
     2. mete las medidas, el 98 gigante y la comparacion 26 vs 98
     3. esconde los dos bloques que ahora dirian lo mismo dos veces
   Lo demas de la ficha -promo, reseñas, preguntas y el formulario-
   sigue tal cual, para no romper la compra.
   ============================================================ */
(function () {
  function slug() {
    try { return window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'zapatero') return;

  /* ---- las tres fotos SON «Qué es y para qué sirve» ----
     Esa seccion era un parrafo largo y seis viñetas debajo: pura letra.
     Ahora el parrafo y la lista se van, y en su lugar quedan tres
     tarjetas, una debajo de la otra: la foto arriba y su descripcion
     adentro. Cada pie cuenta algo que la foto NO trae escrito, para no
     decir lo mismo dos veces. */
  var FOTOS = [
    ['img/zp-arriba.webp?v=1',
     'Parte de arriba del zapatero con chaqueta, bolso, mochila y gorra colgados en los ganchos',
     'Arriba', '8 ganchos para colgar',
     'Chaquetas, mochilas, carteras, gorros y las llaves. Lo que antes quedaba en el respaldo de la silla o tirado en el sillón, ahora tiene su lugar apenas entras.'],
    ['img/zp-abajo.webp?v=1',
     'Las cuatro repisas del zapatero llenas de zapatillas y zapatos ordenados',
     'Abajo', '4 repisas para el calzado',
     'Los zapatos dejan de estar amontonados en el suelo de la entrada. Cada par a la vista, y la repisa de arriba sirve para las llaves, el bolso o una planta.'],
    ['img/zp-rincon.webp?v=1',
     'El zapatero cargado en un rincón angosto del pasillo, junto a la puerta',
     'Dónde va', 'Un mueble en vez de tres',
     'Zapatera y perchero en uno solo, en el espacio que ocupa uno. Entra en la entrada, en el pasillo o en el dormitorio, y se arma encajando las piezas.'],
  ];

  function bloqueFotos() {
    return '<div class="zp-fichas">' + FOTOS.map(function (f) {
      return ficha(f[0], f[1], f[2], f[3], f[4]);
    }).join('') + '</div>';
  }

  /* una foto con su ficha debajo: rotulo, titular y el detalle */
  function ficha(src, alt, rotulo, titulo, texto) {
    return '<figure class="zp-fi">' +
      '<img src="' + src + '" alt="' + alt + '" loading="lazy" width="1024" height="1024">' +
      '<figcaption>' +
        '<span class="zp-rot">' + rotulo + '</span>' +
        '<b>' + titulo + '</b>' +
        '<p>' + texto + '</p>' +
      '</figcaption>' +
    '</figure>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;              /* ficha.js todavia no pinto */
    if (cont.querySelector('.zp-hero')) return true;  /* ya estaba puesto */

    document.body.classList.add('p-zapatero');

    var foto = 'img/prod-zapatero.webp?v=1';

    var html =
      '<div class="zp-hero">' +
        '<img src="' + foto + '" alt="Zapatero colgador con zapatos en las repisas y chaquetas en los ganchos" fetchpriority="high">' +
        '<div class="zp-sobre">' +
          '<span class="zp-rot zp-cae" style="--i:0">Zapatero colgador · 2 en 1</span>' +
          '<h1 class="zp-h1">' +
            '<span class="zp-cae" style="--i:1">Los zapatos abajo.</span>' +
            '<em class="zp-cae" style="--i:2">Todo lo demás,</em>' +
            '<span class="zp-cae" style="--i:3">colgado.</span>' +
          '</h1>' +
          '<p class="zp-cae" style="--i:4">Tu entrada, ordenada en un solo mueble.</p>' +
        '</div>' +
        '<div class="zp-estrellas">' +
          '<i style="left:6%;top:16%;animation-delay:0s"></i>' +
          '<i style="left:47%;top:9%;animation-delay:.9s;width:10px;height:10px"></i>' +
          '<i style="left:72%;top:27%;animation-delay:1.7s"></i>' +
          '<i style="left:88%;top:11%;animation-delay:2.5s;width:9px;height:9px"></i>' +
          '<i style="left:28%;top:36%;animation-delay:3.1s;width:11px;height:11px"></i>' +
        '</div>' +
        '<div class="zp-sello"><div><b>2</b><i>EN 1</i></div></div>' +
      '</div>' +
      '<div class="zp-med">' +
        '<div><b>4</b><span>repisas</span></div>' +
        '<div><b>8</b><span>ganchos</span></div>' +
        '<div><b>1</b><span>solo mueble</span></div>' +
      '</div>' +
      '<section class="zp-blq">' +
        '<span class="zp-rot">Lo que ordena</span>' +
        '<div class="zp-cabe zp-cabe--sola">' +
          '<div><b>8</b><span>ganchos: chaquetas, bolsos, gorros, llaves</span></div>' +
          '<div><b>4</b><span>repisas para zapatos y zapatillas</span></div>' +
          '<div><b>1</b><span>repisa arriba para lo de todos los días</span></div>' +
        '</div>' +
        '<p class="zp-sub">Todo en el mismo lugar, apenas entras.</p>' +
      '</section>' +
      '<section class="zp-blq zp-linea">' +
        '<span class="zp-rot">La diferencia</span>' +
        '<h2 class="zp-h2">Un mueble<br>en vez<br>de tres.</h2>' +
        '<p class="zp-sub">Zapatera abajo, perchero arriba y una repisa para las llaves. Lo que antes eran tres muebles y una silla llena de ropa, ahora ocupa el espacio de uno.</p>' +
      '</section>';

    /* La GALERIA se va -arriba queda una sola foto, la del hero-, pero la
       CABECERA se queda: nombre, estrellas, precio grande con el tachado. */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    /* y sube a su sitio: justo debajo de la tira de medidas, que es donde
       el cliente la busca despues de ver la foto */
    var med = cont.querySelector('.zp-med');
    if (med) med.insertAdjacentElement('afterend', arriba);

    /* estos dos ahora dirian lo mismo dos veces */
    ['.med-sec', '.cmp-sec'].forEach(function (s) {
      var el = cont.querySelector(s);
      if (el) el.style.display = 'none';
    });

    /* el enlace del bloque de precios baja a la promocion */
    var promo = cont.querySelector('.promo-sec');
    if (promo && !promo.id) promo.id = 'zp-promo';

    /* «Qué es y para qué sirve» pasa a ser las tres tarjetas: se van el
       parrafo largo y la lista de viñetas, que decian lo mismo que los
       pies de foto, y quedan la foto y su descripcion. */
    if (!cont.querySelector('.zp-fichas')) {
      var descSec = null;
      var secs = cont.querySelectorAll('section.desc');
      for (var i = 0; i < secs.length; i++) {
        var t = secs[i].querySelector('.tit2');
        if (t && t.textContent.indexOf('Qué es') >= 0) { descSec = secs[i]; break; }
      }
      if (descSec) {
        var parrafo = descSec.querySelector('p');
        if (parrafo) parrafo.remove();
        var lista = descSec.querySelector('ul');
        if (lista) lista.remove();
        descSec.insertAdjacentHTML('beforeend', bloqueFotos());
      }
    }

    /* las cifras de las tiras cuentan desde cero al llegar (las cuenta `contar`) */
    cont.querySelectorAll('.zp-med b, .zp-cabe b').forEach(function (b) {
      var n = parseInt(b.textContent, 10);
      if (n) { b.classList.add('zp-num'); b.setAttribute('data-n', n); }
    });

    efectos(cont);
    letras(cont);

    /* Se repasa varias veces: efectos-ficha.js anima con GSAP y hay
       bloques que todavia no estan pintados -o estan ocultos- cuando
       corre la primera pasada. Los puntos de la descripcion quedaban
       negros justo por eso. */
    contraste(cont);
    [300, 900, 1800, 3000, 4500, 6500, 9000].forEach(function (t) {
      setTimeout(function () { contraste(cont); }, t);
    });
    return true;
  }

  /* ---- efectos ----
     Lo que no se puede hacer solo con la hoja de estilo: que las cosas
     entren cuando el cliente llega a ellas, y que la primera pregunta
     abra sola.

     OJO con el sentido: lo que se marca es el estado ESCONDIDO
     (`zp-entra`), y una IntersectionObserver quita esa marca cuando el
     cliente llega. Si el navegador no la tiene, o no llega a avisar,
     la marca se quita igual y todo se ve: nunca puede quedar contenido
     escondido por culpa de un efecto. */
  function efectos(cont) {
    var quieto = false;
    try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    /* la primera pregunta, abierta. James la quiere asi: el que llega ve
       de una que ahi hay respuestas y abre las demas. */
    var primera = cont.querySelector('details');
    if (primera) primera.open = true;

    var piezas = [];
    cont.querySelectorAll('.zp-fi').forEach(function (el) { piezas.push([el, 'zp-fi']); });
    /* SOLO mis bloques. Las secciones de la tienda -promocion, reseñas,
       formulario, antes y despues- ya las anima efectos-ficha.js con GSAP
       y les pone la opacidad en el propio elemento. Si les metiera encima
       mi clase, dos sistemas peleando por lo mismo, y el dia que uno
       falle la seccion se queda invisible. */
    ['.zp-med', '.zp-blq'].forEach(function (s) {
      cont.querySelectorAll(s).forEach(function (el) {
        if (el.style.display !== 'none') piezas.push([el, 'sec']);
      });
    });
    if (!piezas.length) return;

    if (quieto || !('IntersectionObserver' in window)) return;

    piezas.forEach(function (p) {
      p[0].classList.add(p[1] === 'zp-fi' ? 'zp-entra' : 'zp-sec-entra');
    });

    /* encender = quitar la marca de escondido. No se añade nada: el estado
       normal del elemento YA es visible, asi que aunque la transicion no
       llegue a correr, la seccion se ve. */
    function encender(el) {
      el.classList.remove('zp-entra', 'zp-sec-entra');
      if (el.querySelectorAll) el.querySelectorAll('.zp-num').forEach(contar);
    }

    /* El 294 sube desde cero cuando el cliente llega al bloque.
       Va con setInterval y no con requestAnimationFrame a proposito: el
       rAF no corre si la pestaña esta de fondo, y ahi el numero se
       quedaria congelado. Con esto, pase lo que pase, el ultimo paso
       escribe la cifra buena. */
    function contar(el) {
      if (el.dataset.contando) return;
      el.dataset.contando = '1';
      var meta = parseInt(el.getAttribute('data-n'), 10) || 0;
      if (quieto || !meta) { el.textContent = meta; return; }
      var dur = 1100, ini = Date.now();
      el.textContent = '0';
      var reloj = setInterval(function () {
        var t = Math.min(1, (Date.now() - ini) / dur);
        /* frena al final en vez de llegar de golpe */
        var v = Math.round(meta * (1 - Math.pow(1 - t, 3)));
        el.textContent = v;
        if (t >= 1) { clearInterval(reloj); el.textContent = meta; }
      }, 30);
      /* red de seguridad, por si el reloj se traba */
      setTimeout(function () { clearInterval(reloj); el.textContent = meta; }, dur + 1500);
    }

    var ojo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        /* las tarjetas entran una detras de otra, no las tres de golpe */
        var i = [].indexOf.call(el.parentNode.children, el);
        var espera = el.classList.contains('zp-fi') ? Math.min(i, 3) * 110 : 0;
        setTimeout(function () { encender(el); }, espera);
        ojo.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    piezas.forEach(function (p) {
      /* lo que YA se ve al abrir la pagina no espera al observador: se
         enciende de una. Asi la primera pantalla nunca depende de que el
         navegador dispare el aviso, que es justo lo que puede no pasar. */
      var r = p[0].getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        setTimeout(function () { encender(p[0]); }, 60);
      } else {
        ojo.observe(p[0]);
      }
    });

    /* Red de seguridad. El aviso de "ya se ve" lo da el navegador cuando
       pinta, y hay situaciones en que no pinta -pestaña de fondo, ventana
       tapada- y entonces no avisa nunca. A los 2,5 segundos se muestra
       todo igual: mejor sin animacion que con contenido invisible. */
    setTimeout(function () {
      cont.querySelectorAll('.zp-entra, .zp-sec-entra').forEach(encender);
    }, 2500);
  }

  /* ---- LETRAS que entran una por una (skill ui-ux-pro-max, dominio gsap: "Stagger List",
     letra por letra en titulos cortos, 18 ms entre letras) y el VIDEO con su titulo ----
     Se hace sin GSAP: cada letra es un <span> y la hoja las mueve. El titulo completo queda en
     aria-label para los lectores de pantalla. Si el navegador no tiene IntersectionObserver o
     la persona pide menos movimiento, no se parte nada y el titulo se ve normal. */
  function letras(cont) {
    var quieto = false;
    try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var vid = cont.querySelector('.vid-wrap');
    if (vid && !vid.querySelector('.zp-vtit')) {
      vid.insertAdjacentHTML('afterbegin',
        '<div class="zp-vtit"><span class="zp-rot">En video</span><h2>Así queda en tu entrada</h2></div>');
    }
    if (quieto || !('IntersectionObserver' in window)) return;

    var objetivos = [];
    cont.querySelectorAll('.tit2, .bloque > h2, .rev-title, .zp-h2, .zp-vtit h2').forEach(function (h) {
      if (h.closest('.zp-hero') || h.closest('.form') || h.dataset.partido) return;
      partir(h);
      objetivos.push(h);
    });
    if (vid) objetivos.push(vid);

    function partir(h) {
      h.dataset.partido = '1';
      h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
      var k = 0;
      [].slice.call(h.childNodes).forEach(function (n) {
        if (n.nodeType !== 3 || !n.nodeValue.trim()) return;
        var frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
          var pal = document.createElement('span');
          pal.className = 'zp-pal';
          pal.setAttribute('aria-hidden', 'true');
          for (var i = 0; i < w.length; i++) {
            var l = document.createElement('span');
            l.className = 'zp-l';
            l.style.setProperty('--k', k++);
            l.textContent = w.charAt(i);
            pal.appendChild(l);
          }
          frag.appendChild(pal);
        });
        h.replaceChild(frag, n);
      });
      h.classList.add('zp-letras');
      /* la barra de color que se dibuja debajo del titulo */
      if (!h.matches('.bloque > h2')) {
        var raya = document.createElement('span');
        raya.className = 'zp-raya' + (getComputedStyle(h).textAlign === 'center' ? ' zp-raya--c' : '');
        raya.setAttribute('aria-hidden', 'true');
        h.insertAdjacentElement('afterend', raya);
      }
    }

    function encender(el) { el.classList.add('zp-on'); }
    var ojo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        encender(e.target);
        ojo.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    objetivos.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) setTimeout(function () { encender(el); }, 80);
      else ojo.observe(el);
    });
    /* red de seguridad: si el navegador no avisa (pestaña de fondo), al hacer scroll se revisa a mano */
    addEventListener('scroll', function revisar() {
      var quedan = 0;
      objetivos.forEach(function (el) {
        if (el.classList.contains('zp-on')) return;
        quedan++;
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.95 && r.bottom > 0) encender(el);
      });
      if (!quedan) removeEventListener('scroll', revisar);
    }, { passive: true });
  }

  /* ---- contraste, medido y corregido uno por uno ----
     La hoja no alcanzaba: producto.html trae su propio <style> y algo
     vuelve a pintar los textos despues de que carga el css, asi que ni
     con !important quedaban claros. Aca se mide el contraste real de
     cada texto contra el fondo que tiene detras y se corrige SOLO el
     que no llega al minimo. Lo que ya se lee no se toca, y por eso los
     botones y las etiquetas de color quedan como estan. */
  function lum(c) {
    var m = String(c).match(/\d+/g);
    if (!m) return 1;
    var v = m.slice(0, 3).map(function (x) {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  /* Devuelve el fondo REAL que hay detras del texto.
     Dos trampas que costaron el pack seleccionado del formulario en blanco:
       · el navegador puede devolver `color(srgb 0.72 0.22 0.10 / 0.1)`, y de
         ahi lum() sacaba numeros sueltos y calculaba cualquier cosa;
       · un tinte casi transparente -rgba(196,18,47,.05) sobre la tarjeta
         blanca- se leia como si fuera rojo solido, o sea fondo oscuro, y el
         corrector ponia la letra BLANCA sobre blanco.
     Asi que solo vale un rgb/rgba con alfa alto; lo demas se salta y se
     sigue subiendo hasta el fondo que si pinta. */
  function fondoDe(el) {
    var n = el;
    while (n && n !== document.body) {
      var cs = getComputedStyle(n);
      /* Un DEGRADADO no vive en backgroundColor sino en backgroundImage, y
         el color queda transparente. Sin esto, las pastillas blancas de la
         garantia -que llevan un degradado de #fff a #F4F1EA- se leian como
         si no tuvieran fondo, el corrector seguia subiendo hasta el carbon
         y daba por bueno el texto claro: gris sobre blanco. Cuando hay
         degradado no se puede medir, asi que se devuelve null y ese texto
         no se toca. */
      if (cs.backgroundImage && cs.backgroundImage.indexOf('gradient') >= 0) return null;
      var bg = cs.backgroundColor;
      if (bg && bg.indexOf('rgb') === 0) {
        var m = bg.match(/[\d.]+/g);
        var alfa = (m && m.length > 3) ? parseFloat(m[3]) : 1;
        if (alfa >= 0.5) return bg;
      }
      n = n.parentElement;
    }
    /* el body de la tienda es blanco; el carbon solo lo pone #prod */
    var raiz = document.getElementById('prod');
    return raiz ? getComputedStyle(raiz).backgroundColor : 'rgb(25, 28, 30)';
  }
  function contraste(cont) {
    var arreglados = 0;
    cont.querySelectorAll('*').forEach(function (el) {
      /* Sirve cualquier elemento con texto PROPIO, aunque lleve hijos.
         Antes se saltaban los que tenian hijos y por eso los puntos de la
         descripcion seguian negros: cada uno lleva un svg de visto bueno
         adentro, asi que contaban como "con hijos". */
      var propio = false;
      for (var i = 0; i < el.childNodes.length; i++) {
        var n = el.childNodes[i];
        if (n.nodeType === 3 && n.nodeValue.trim()) { propio = true; break; }
      }
      if (!propio) return;
      /* las estrellas van SIEMPRE doradas (regla de la marca): el corrector no las toca */
      if (el.closest('.stars, .estrellas, .est')) return;
      var cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      var fondo = fondoDe(el);
      if (!fondo) return;            /* hay un degradado detras: no se puede medir */
      var lf = lum(cs.color), lb = lum(fondo);
      var razon = (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);
      var grande = parseFloat(cs.fontSize) >= 24 ||
        (parseFloat(cs.fontSize) >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
      if (razon >= (grande ? 3 : 4.5)) return;
      /* LA TRAMPA que costo seis intentos: estos elementos traen
         `transition: all .5s`, y en la cascada las transiciones ganan
         incluso al !important del autor. Se veia el color puesto en el
         style inline y el navegador seguia pintando el viejo. Hay que
         apagar la transicion ANTES de cambiar el color. */
      /* a las letras sueltas NO: su transicion es solo de opacidad y movimiento, y apagarla
         las dejaria escondidas */
      if (!el.classList.contains('zp-l')) el.style.setProperty('transition', 'none', 'important');
      /* sobre fondo claro va texto oscuro; sobre oscuro, texto claro */
      el.style.setProperty('color', lb > 0.35 ? '#141A20' : '#DDE1E4', 'important');
      arreglados++;
    });
    if (window.console && arreglados) console.log('[zapatero] contraste corregido en ' + arreglados + ' textos');
  }

  /* ficha.js puede pintar despues que este script; se espera a que exista */
  if (montar()) return;
  var intentos = 0;
  var reloj = setInterval(function () {
    intentos++;
    if (montar() || intentos > 60) clearInterval(reloj);
  }, 100);
})();
