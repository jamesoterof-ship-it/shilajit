/* ============================================================
   TIENDA JAYE GROUP · pinta el catalogo y filtra por categoria.
   El precio que se muestra es el del pack mas barato, y siempre
   sale de la escalera aprobada: si algun precio no esta en la
   lista, el producto no se pinta (candado, igual que Camila).
   ============================================================ */
(function () {
  'use strict';

  var pesos = function (n) { return '$' + Number(n).toLocaleString('es-CL'); };

  function aprobados(p) {
    var lista = window.PRECIOS_APROBADOS || [];
    return (p.packs || []).every(function (k) { return lista.indexOf(k.precio) >= 0; });
  }

  function tarjeta(p) {
    var barato = p.packs.reduce(function (a, b) { return b.precio < a.precio ? b : a; });
    var et = p.etiqueta
      ? '<span class="et' + (p.etiquetaOro ? ' oro' : '') + '">' + p.etiqueta + '</span>'
      : '';
    var img = p.foto
      ? '<img src="' + p.foto + '" alt="' + p.nombre + '" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'vacio\',textContent:\'' + p.nombre.charAt(0) + '\'}))">'
      : '<span class="vacio">' + p.nombre.charAt(0) + '</span>';
    return '<article class="ficha" data-cat="' + p.categoria + '">'
      + '<a class="im" href="producto.html?p=' + p.id + '">' + et + img + '</a>'
      + '<div class="cuerpo">'
      + '<h3>' + p.nombre + '</h3>'
      + '<p class="sub">' + p.sub + '</p>'
      + '<div class="precio"><b>' + pesos(barato.precio) + '</b>'
      + (barato.antes ? '<s>' + pesos(barato.antes) + '</s>' : '') + '</div>'
      + '</div>'
      + '<a class="btn" href="producto.html?p=' + p.id + '">Lo quiero</a>'
      + '</article>';
  }

  function pintar(cat) {
    var todos = (window.PRODUCTOS || []).filter(aprobados);
    var lista = cat && cat !== 'Todos'
      ? todos.filter(function (p) { return p.categoria === cat; })
      : todos;
    var cont = document.getElementById('rejilla');
    if (!cont) return;
    cont.innerHTML = lista.map(tarjeta).join('');
    var c = document.getElementById('cuantos');
    if (c) c.textContent = lista.length + (lista.length === 1 ? ' producto' : ' productos');
  }

  /* El menu vive en la linea blanca del medio */
  function categorias() {
    var cats = ['Todos'];
    (window.PRODUCTOS || []).forEach(function (p) {
      if (p.categoria && cats.indexOf(p.categoria) < 0) cats.push(p.categoria);
    });
    var cont = document.getElementById('cats');
    if (!cont) return;
    cont.innerHTML = cats.map(function (c, i) {
      return '<button type="button" aria-pressed="' + (i === 0) + '" data-cat="' + c + '">' + c + '</button>';
    }).join('');
    cont.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      cont.querySelectorAll('button').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
      pintar(b.dataset.cat);
    });
  }

  /* Al bajar: se esconde la barra blanca y el header gris se pone negro.
     Al volver arriba del todo, vuelve como estaba. */
  function cabecera() {
    var p = document.getElementById('pegado');
    if (!p) return;
    var esperando = false;
    function mirar() {
      p.classList.toggle('bajando', window.scrollY > 40);
      esperando = false;
    }
    window.addEventListener('scroll', function () {
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(mirar);
    }, { passive: true });
    mirar();
  }

  /* El video del hero: solo se muestra si de verdad existe y puede reproducirse.
     Si no, queda la foto y nadie ve un hueco negro. En datos moviles lentos
     tampoco se fuerza. */
  function videoHero() {
    var v = document.getElementById('clipHero');
    if (!v) return;
    var con = navigator.connection || {};
    if (con.saveData || /2g/.test(con.effectiveType || '')) return;   // no gastarle los datos
    v.addEventListener('loadeddata', function () {
      v.classList.add('listo');
      var t = v.play();
      if (t && t.catch) t.catch(function () { v.classList.remove('listo'); });
    });
    v.addEventListener('error', function () { v.classList.remove('listo'); });
    v.load();
  }

  document.addEventListener('DOMContentLoaded', function () {
    categorias();
    pintar('Todos');
    cabecera();
    videoHero();
  });
})();
