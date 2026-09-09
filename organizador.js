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

    /* la galeria y la cabecera se van: en su lugar, una sola foto */
    arriba.insertAdjacentHTML('beforebegin', html);
    arriba.remove();

    /* estos dos ahora dirian lo mismo dos veces */
    ['.med-sec', '.cmp-sec'].forEach(function (s) {
      var el = cont.querySelector(s);
      if (el) el.style.display = 'none';
    });

    contraste(cont);
    return true;
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
  function fondoDe(el) {
    var n = el;
    while (n && n !== document.body) {
      var bg = getComputedStyle(n).backgroundColor;
      if (bg && bg.indexOf('rgba(0, 0, 0, 0)') < 0 && bg !== 'transparent') return bg;
      n = n.parentElement;
    }
    return 'rgb(25, 28, 30)';
  }
  function contraste(cont) {
    var arreglados = 0;
    cont.querySelectorAll('*').forEach(function (el) {
      if (el.children.length || !el.textContent.trim()) return;
      var cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      var fondo = fondoDe(el);
      var lf = lum(cs.color), lb = lum(fondo);
      var razon = (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);
      var grande = parseFloat(cs.fontSize) >= 24 ||
        (parseFloat(cs.fontSize) >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
      if (razon >= (grande ? 3 : 4.5)) return;
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
