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
      '<div class="og-med">' +
        '<div><b>60</b><span>cm largo</span></div>' +
        '<div><b>43</b><span>cm ancho</span></div>' +
        '<div><b>38</b><span>cm alto</span></div>' +
        '<div><b>98</b><span>litros</span></div>' +
      '</div>' +
      '<section class="og-blq">' +
        '<span class="og-rot">Lo que le cabe</span>' +
        '<div class="og-gigante">98<small>litros por caja</small></div>' +
        '<div class="og-cabe">' +
          '<div><b>1</b><span>plumón king completo</span></div>' +
          '<div><b>6</b><span>frazadas gruesas</span></div>' +
          '<div><b>16</b><span>prendas dobladas</span></div>' +
        '</div>' +
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
    return true;
  }

  /* ficha.js puede pintar despues que este script; se espera a que exista */
  if (montar()) return;
  var intentos = 0;
  var reloj = setInterval(function () {
    intentos++;
    if (montar() || intentos > 60) clearInterval(reloj);
  }, 100);
})();
