/* ============================================================
   El diseño propio del Organizador, montado sobre la ficha.

   Corre DESPUES de ficha.js. Si el producto no es el organizador
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
    try { return new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'organizador') return;

  /* ---- las tres fotos SON «Qué es y para qué sirve» ----
     Esa seccion era un parrafo largo y seis viñetas debajo: pura letra.
     Ahora el parrafo y la lista se van, y en su lugar quedan tres
     tarjetas, una debajo de la otra: la foto arriba y su descripcion
     adentro. Cada pie cuenta algo que la foto NO trae escrito, para no
     decir lo mismo dos veces. */
  var FOTOS = [
    ['img/og-cap.webp?v=1',
     'Caja organizadora abierta sobre una cama con un plumón king doblado dentro',
     'La capacidad', '98 litros por caja',
     'O seis frazadas gruesas, o dieciséis prendas dobladas. La tapa abre entera por el cierre, no por una ranura: entra de una y cierra sin forzar.'],
    ['img/og-packs.webp?v=1',
     'Seis cajas organizadoras apiladas en dos torres en un dormitorio',
     'Cómo está armada', 'Varillas en las paredes',
     'Queda parada aunque esté vacía y aguanta el peso de la de arriba, así que aprovechas el alto del clóset. Cuando no la usas, se pliega al grosor de un cuaderno.'],
    ['img/og-medida.webp?v=1',
     'Primer plano de la caja organizadora con la ropa doblada tras la ventana',
     'De qué está hecha', 'Tela no tejida que respira',
     'No es plástico que se quiebra ni cartón que se hunde con la humedad. Al dejar pasar el aire, la ropa sale igual que como la guardaste: sin olor a encierro, aunque pase la temporada entera adentro.'],
  ];

  function bloqueFotos() {
    return '<div class="og-fichas">' + FOTOS.map(function (f) {
      return ficha(f[0], f[1], f[2], f[3], f[4]);
    }).join('') + '</div>';
  }

  /* una foto con su ficha debajo: rotulo, titular y el detalle */
  function ficha(src, alt, rotulo, titulo, texto) {
    return '<figure class="og-fi">' +
      '<img src="' + src + '" alt="' + alt + '" loading="lazy" width="1024" height="1024">' +
      '<figcaption>' +
        '<span class="og-rot">' + rotulo + '</span>' +
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
    if (cont.querySelector('.og-hero')) return true;  /* ya estaba puesto */

    document.body.classList.add('p-organizador');

    var foto = 'img/prod-organizador.webp?v=1';

    var html =
      '<div class="og-hero">' +
        '<img src="' + foto + '" alt="Cajas organizadoras de ropa apiladas en un dormitorio" fetchpriority="high">' +
        '<div class="og-sobre">' +
          '<span class="og-rot og-cae" style="--i:0">Organizador de ropa · pack de 3</span>' +
          '<h1 class="og-h1">' +
            '<span class="og-cae" style="--i:1">Cabe un</span>' +
            '<em class="og-cae" style="--i:2">plumón king.</em>' +
            '<span class="og-cae" style="--i:3">Entero.</span>' +
          '</h1>' +
          '<p class="og-cae" style="--i:4">Y todavía sobra sitio para las frazadas.</p>' +
        '</div>' +
        /* los destellos: van en la franja de arriba, donde esta el velo y
           no hay cajas. Cada uno con su sitio y su tiempo, para que no
           titilen todos a la vez. */
        '<div class="og-estrellas">' +
          '<i style="left:6%;top:16%;animation-delay:0s"></i>' +
          '<i style="left:47%;top:9%;animation-delay:.9s;width:10px;height:10px"></i>' +
          '<i style="left:72%;top:27%;animation-delay:1.7s"></i>' +
          '<i style="left:88%;top:11%;animation-delay:2.5s;width:9px;height:9px"></i>' +
          '<i style="left:28%;top:36%;animation-delay:3.1s;width:11px;height:11px"></i>' +
        '</div>' +
        '<div class="og-sello"><div><b>98</b><i>LITROS</i></div></div>' +
      '</div>' +
      /* el 98 sale UNA vez, en el sello sobre la foto. Aca van las medidas,
         que es otro dato; y abajo el total del pack, que tambien es nuevo.
         Antes el 98 se repetia tres veces seguidas y saltaba a la vista. */
      '<div class="og-med">' +
        '<div><b>60</b><span>cm largo</span></div>' +
        '<div><b>43</b><span>cm ancho</span></div>' +
        '<div><b>38</b><span>cm alto</span></div>' +
      '</div>' +
      '<section class="og-blq">' +
        '<span class="og-rot">Lo que le cabe a cada una</span>' +
        '<div class="og-cabe og-cabe--sola">' +
          '<div><b>1</b><span>plumón king completo</span></div>' +
          '<div><b>6</b><span>frazadas gruesas</span></div>' +
          '<div><b>16</b><span>prendas dobladas</span></div>' +
        '</div>' +
        '<p class="og-sub">Y el pack trae tres.</p>' +
        '<div class="og-gigante">294<small>litros en total</small></div>' +
      '</section>' +
      '<section class="og-blq og-linea">' +
        '<span class="og-rot">La diferencia</span>' +
        '<h2 class="og-h2">Las otras son<br>cuatro veces<br>más chicas.</h2>' +
        '<div class="og-vs">' +
          '<div class="og-vs__f"><b>26 L</b><div><div class="og-vs__b"><i style="width:27%"></i></div>' +
            '<small>Las que pautean hoy · 47 × 28 × 20 cm</small></div></div>' +
          '<div class="og-vs__f n"><b>98 L</b><div><div class="og-vs__b"><i style="width:100%"></i></div>' +
            '<small>La nuestra · 60 × 43 × 38 cm</small></div></div>' +
        '</div>' +
        '<p class="og-sub">Por eso a la nuestra le entra el plumón, y a la otra apenas las poleras.</p>' +
      '</section>';

    /* La GALERIA se va -arriba queda una sola foto, la del hero-, pero la
       CABECERA se queda: son las estrellas, el nombre, el precio grande
       con el tachado y el -37%. Es la misma que traen los otros nueve
       productos y es lo que el cliente busca apenas ve la foto. Antes se
       borraba entera `.arriba2` y con ella se iba el precio. */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) {
      var el = arriba.querySelector(s);
      if (el) el.remove();
    });
    /* y sube a su sitio: justo debajo de la tira de medidas, que es donde
       el cliente la busca despues de ver la foto */
    var med = cont.querySelector('.og-med');
    if (med) med.insertAdjacentElement('afterend', arriba);

    /* estos dos ahora dirian lo mismo dos veces */
    ['.med-sec', '.cmp-sec'].forEach(function (s) {
      var el = cont.querySelector(s);
      if (el) el.style.display = 'none';
    });

    /* el enlace del bloque de precios baja a la promocion */
    var promo = cont.querySelector('.promo-sec');
    if (promo && !promo.id) promo.id = 'og-promo';

    /* «Qué es y para qué sirve» pasa a ser las tres tarjetas: se van el
       parrafo largo y la lista de viñetas, que decian lo mismo que los
       pies de foto, y quedan la foto y su descripcion. */
    if (!cont.querySelector('.og-fichas')) {
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

    efectos(cont);

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
     (`og-entra`), y una IntersectionObserver quita esa marca cuando el
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
    cont.querySelectorAll('.og-fi').forEach(function (el) { piezas.push([el, 'og-fi']); });
    /* SOLO mis bloques. Las secciones de la tienda -promocion, reseñas,
       formulario, antes y despues- ya las anima efectos-ficha.js con GSAP
       y les pone la opacidad en el propio elemento. Si les metiera encima
       mi clase, dos sistemas peleando por lo mismo, y el dia que uno
       falle la seccion se queda invisible. */
    ['.og-med', '.og-blq'].forEach(function (s) {
      cont.querySelectorAll(s).forEach(function (el) {
        if (el.style.display !== 'none') piezas.push([el, 'sec']);
      });
    });
    if (!piezas.length) return;

    if (quieto || !('IntersectionObserver' in window)) return;

    piezas.forEach(function (p) {
      p[0].classList.add(p[1] === 'og-fi' ? 'og-entra' : 'og-sec-entra');
    });

    /* encender = quitar la marca de escondido. No se añade nada: el estado
       normal del elemento YA es visible, asi que aunque la transicion no
       llegue a correr, la seccion se ve. */
    function encender(el) { el.classList.remove('og-entra', 'og-sec-entra'); }

    var ojo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        /* las tarjetas entran una detras de otra, no las tres de golpe */
        var i = [].indexOf.call(el.parentNode.children, el);
        var espera = el.classList.contains('og-fi') ? Math.min(i, 3) * 110 : 0;
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
      cont.querySelectorAll('.og-entra, .og-sec-entra').forEach(encender);
    }, 2500);
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
      el.style.setProperty('transition', 'none', 'important');
      /* sobre fondo claro va texto oscuro; sobre oscuro, texto claro */
      el.style.setProperty('color', lb > 0.35 ? '#141A20' : '#DDE1E4', 'important');
      arreglados++;
    });
    if (window.console && arreglados) console.log('[organizador] contraste corregido en ' + arreglados + ' textos');
  }

  /* ficha.js puede pintar despues que este script; se espera a que exista */
  if (montar()) return;
  var intentos = 0;
  var reloj = setInterval(function () {
    intentos++;
    if (montar() || intentos > 60) clearInterval(reloj);
  }, 100);
})();
