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

  /* El texto de esa parte entra cuando el cliente llega, y el video se carga
     ahi mismo para no gastarle datos de entrada.
     REGLA: el texto NUNCA puede quedar invisible. Si el video no carga, si no
     hay soporte o si algo falla, el texto se muestra igual. */
  function videoGarantia() {
    var sec = document.querySelector('.gar-video');
    if (!sec) return;
    var v = document.getElementById('clipGar');
    var mostrar = function () { sec.classList.add('entro'); };

    // red de seguridad: pase lo que pase, a los 2,5 s el texto se ve
    setTimeout(mostrar, 2500);

    if (!('IntersectionObserver' in window)) { mostrar(); return; }

    var ojo = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) { if (v && !v.paused) v.pause(); return; }
        mostrar();
        if (!v) return;
        var con = navigator.connection || {};
        if (con.saveData || /2g/.test(con.effectiveType || '')) return;
        if (!v.dataset.cargado) { v.dataset.cargado = '1'; v.load(); }
        var t = v.play();
        if (t && t.catch) t.catch(function () {});
        v.classList.add('listo');
      });
    }, { threshold: 0.2 });
    ojo.observe(sec);
  }

  /* El titulo entra EN CASCADA: letra por letra, cada una asomando desde
     abajo detras de una mascara, una detras de la otra. */
  function letrasDelHero() {
    var h = document.querySelector('.hero h1');
    if (!h || h.dataset.listo) return;
    var lineas = h.innerHTML.split(/<br\s*\/?>/i);
    var n = 0;
    h.innerHTML = lineas.map(function (linea) {
      var palabras = linea.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean);
      return '<span class="linea">' + palabras.map(function (pal) {
        var letras = pal.split('').map(function (ch) {
          var d = (0.18 + n * 0.058).toFixed(3); n++;
          return '<span class="ltr" style="animation-delay:' + d + 's">' + ch + '</span>';
        }).join('');
        n += 1.6;   // un respiro mas largo entre palabras
        return '<span class="pal">' + letras + '</span>';
      }).join(' ') + '</span>';
    }).join('');
    h.dataset.listo = '1';
  }

  document.addEventListener('DOMContentLoaded', function () {
    categorias();
    pintar('Todos');
    cabecera();
    videoHero();
    letrasDelHero();
    videoGarantia();
  });
})();
