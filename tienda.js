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

  /* Sin "Todos": al entrar se ven todos los productos y ninguna categoria
     marcada. Se toca una para filtrar, y la marca de arriba devuelve a todos. */
  function categorias() {
    var cats = [];
    (window.PRODUCTOS || []).forEach(function (p) {
      if (p.categoria && cats.indexOf(p.categoria) < 0) cats.push(p.categoria);
    });
    var cont = document.getElementById('cats');
    if (!cont) return;
    cont.innerHTML = cats.map(function (c) {
      return '<button type="button" aria-pressed="false" data-cat="' + c + '">' + c + '</button>';
    }).join('');
    cont.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var yaEstaba = b.getAttribute('aria-pressed') === 'true';
      cont.querySelectorAll('button').forEach(function (x) {
        x.setAttribute('aria-pressed', String(!yaEstaba && x === b));
      });
      pintar(yaEstaba ? 'Todos' : b.dataset.cat);   // volver a tocarla muestra todo
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

  document.addEventListener('DOMContentLoaded', function () {
    categorias();
    pintar('Todos');
    cabecera();
  });
})();
