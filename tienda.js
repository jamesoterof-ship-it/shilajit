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

  /* La nota y cuantas resenas tiene ESTE producto. Se filtra igual que en la
     ficha, para que la tienda y la ficha digan el mismo numero: si el cliente
     ve 4,8 y 163 aca y otra cosa alla, deja de creer en las dos. */
  function notaDe(p) {
    var todas = window.RESENAS || [];
    var mias = todas.filter(function (r) {
      var t = (r.producto || '').toLowerCase(), n = p.nombre.toLowerCase();
      return t && (n.indexOf(t.split(' ')[0]) >= 0 || t.indexOf(n.split(' ')[0].toLowerCase()) >= 0);
    });
    if (mias.length < 8) return null;
    var suma = mias.reduce(function (a, r) { return a + (Number(r.estrellas) || 5); }, 0);
    return { n: mias.length, prom: (suma / mias.length).toFixed(1) };
  }

  function estrellitas(prom) {
    var llenas = Math.round(Number(prom));
    var s = '';
    for (var i = 1; i <= 5; i++) {
      s += '<svg viewBox="0 0 24 24" class="' + (i <= llenas ? 'on' : '') + '">'
        + '<path d="M12 2l2.9 6.2 6.6.9-4.8 4.7 1.2 6.7L12 17.3 6.1 20.5l1.2-6.7L2.5 9.1l6.6-.9z"/></svg>';
    }
    return s;
  }

  function tarjeta(p) {
    var barato = p.packs.reduce(function (a, b) { return b.precio < a.precio ? b : a; });
    var nota = notaDe(p);
    /* dos renglones: arriba las estrellas con la nota, abajo cuantas son.
       En una sola linea el "187 reseñas" se partia en dos y quedaba feo. */
    var estr = nota
      ? '<div class="nota">'
        + '<div class="linea1"><span class="est">' + estrellitas(nota.prom) + '</span>'
        + '<b>' + nota.prom + '</b></div>'
        + '<small>' + nota.n + ' reseñas</small>'
        + '</div>'
      : '';
    var et = p.etiqueta
      ? '<span class="et' + (p.etiquetaOro ? ' oro' : '') + '">' + p.etiqueta + '</span>'
      : '';
    var img = p.foto
      ? '<img src="' + p.foto + '" alt="' + p.nombre + '" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'vacio\',textContent:\'' + p.nombre.charAt(0) + '\'}))">'
      : '<span class="vacio">' + p.nombre.charAt(0) + '</span>';
    /* TODA la tarjeta lleva al producto, no solo la foto y el boton. Antes, si
       el cliente tocaba el nombre o el precio, no pasaba nada.
       Se hace con un enlace estirado por encima (.tapa): asi el area que
       responde es la tarjeta entera y el boton sigue siendo un boton de
       verdad para el lector de pantalla. */
    return '<article class="ficha" data-cat="' + p.categoria + '" data-rv>'
      + '<a class="tapa" href="producto.html?p=' + p.id + '" aria-label="Ver ' + p.nombre + '"></a>'
      + '<span class="im">' + et + img + '</span>'
      + '<div class="cuerpo">'
      + '<h3>' + p.nombre + '</h3>'
      /* la nota va pegada al NOMBRE, no debajo de la descripcion: es lo
         primero que mira el cliente despues de leer que es el producto */
      + estr
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
    // las tarjetas entran una detras de la otra, no todas de golpe
    cont.querySelectorAll('.ficha').forEach(function (f, i) {
      f.style.setProperty('--d', Math.min(i, 7) * 0.055 + 's');
    });
    var c = document.getElementById('cuantos');
    if (c) c.textContent = lista.length + (lista.length === 1 ? ' producto' : ' productos');
    revelar();
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
    var esperando = false, bajando = false;
    /* Dos umbrales distintos (se activa a 90, se suelta a 24). Con un solo
       umbral, al quedar el dedo justo en el borde la barra oscilaba entre
       gris y negro y el logo parecia parpadear. */
    function mirar() {
      var y = window.scrollY || window.pageYOffset || 0;
      if (!bajando && y > 90) { bajando = true; p.classList.add('bajando'); }
      else if (bajando && y < 24) { bajando = false; p.classList.remove('bajando'); }
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
    var yaEsta = false;
    function mostrar() { if (yaEsta) return; yaEsta = true; sec.classList.add('entro'); }

    /* El video solo se aclara cuando YA hay un cuadro que mostrar. Antes se le
       subia la opacidad apenas se mandaba play(), asi que el fondo se aclaraba
       vacio y despues aparecia el video de golpe: eso era medio parpadeo. */
    if (v) {
      var encender = function () { v.classList.add('listo'); };
      v.addEventListener('playing', encender);
      v.addEventListener('loadeddata', function () { if (v.readyState >= 3) encender(); });
      v.addEventListener('error', function () { v.classList.remove('listo'); });
    }

    /* Red de seguridad: el texto NUNCA puede quedar invisible. Pero no se
       dispara a ciegas a los 2,5 s (asi el efecto se gastaba fuera de pantalla
       y despues no se veia nada): solo si la seccion ya esta a la vista. */
    var red = setInterval(function () {
      if (yaEsta || sec.getBoundingClientRect().top < window.innerHeight * 0.9) {
        mostrar(); clearInterval(red);
      }
    }, 600);

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
      });
    }, { threshold: 0.25 });
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

  /* Suscripcion al correo del pie. Por ahora solo confirma en pantalla;
     cuando definas a donde mandarlos, se engancha aca. */
  function boletin() {
    var f = document.getElementById('fBoletin');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var c = document.getElementById('correoBoletin');
      var ok = document.getElementById('aceptoBoletin');
      if (!c.value || c.value.indexOf('@') < 0) { c.focus(); return; }
      if (!ok.checked) { ok.focus(); return; }
      f.outerHTML = '<p class=gracias>Listo. Te avisamos cuando haya novedades.</p>';
    });
  }

  /* Entrada de las piezas marcadas con data-rv: suben y aparecen cuando el
     cliente llega a ellas. Se puede llamar varias veces (la rejilla se
     re-pinta al filtrar por categoria) y solo mira lo que aun no ha entrado.
     REGLA: nada puede quedarse invisible. */
  var ojoRv = null;
  function revelar() {
    var nuevos = document.querySelectorAll('[data-rv]:not(.vino):not([data-visto])');
    if (!nuevos.length) return;

    if (!('IntersectionObserver' in window)) {
      nuevos.forEach(function (e) { e.classList.add('vino'); });
      return;
    }
    if (!ojoRv) {
      ojoRv = new IntersectionObserver(function (ent) {
        ent.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('vino');
          ojoRv.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    nuevos.forEach(function (e) { e.dataset.visto = '1'; ojoRv.observe(e); });
    barrer();
  }

  /* Red de seguridad de verdad: revisa a mano lo que esta dentro de la pantalla
     y lo muestra. El observador solo se entera de lo que CRUZA el borde, asi que
     si alguien cae a mitad de pagina (un enlace con #, volver atras, o un salto
     de golpe) lo que ya estaba ahi se quedaba invisible para siempre.
     Se cuelga del scroll y del cambio de tamano, no de un temporizador. */
  var barriendo = false;
  function barrer() {
    var falta = document.querySelectorAll('[data-rv]:not(.vino)');
    if (!falta.length) return;
    var alto = window.innerHeight;
    falta.forEach(function (e) {
      var c = e.getBoundingClientRect();
      if (c.top < alto * 0.96 && c.bottom > 0) e.classList.add('vino');
    });
  }
  window.addEventListener('scroll', function () {
    if (barriendo) return;
    barriendo = true;
    requestAnimationFrame(function () { barrer(); barriendo = false; });
  }, { passive: true });
  window.addEventListener('resize', barrer, { passive: true });
  window.addEventListener('load', barrer);

  /* ---------- reseñas ----------
     Arriba una tira de FOTOS redondas que corre sola y siempre se ve.
     Abajo, tarjetas chicas con lo que escribieron. */
  function resenas() {
    var lista = window.RESENAS || [];
    var sec = document.getElementById('resenas');
    if (!sec || !lista.length) { if (sec) sec.hidden = true; return; }

    // nota y cuantas
    var n = document.getElementById('reseNota');
    var q = document.getElementById('reseCuantas');
    if (n) n.textContent = window.RESENAS_PROMEDIO || '4.8';
    if (q) q.textContent = lista.length.toLocaleString('es-CL') + ' reseñas';

    // --- tira de fotos: se duplica para que el giro no tenga costura ---
    var fotos = [];
    lista.forEach(function (r) { if (r.foto && fotos.indexOf(r.foto) < 0) fotos.push(r.foto); });
    var tira = document.getElementById('reseTira');
    if (tira) {
      if (!fotos.length) {
        // sin fotos todavia: se ven los circulos vacios para no dejar un hueco
        fotos = new Array(12).fill('');
      }
      var doble = fotos.concat(fotos);
      tira.innerHTML = doble.map(function (f) {
        /* OJO: nada de loading="lazy" aca. La tira se mueve con transform, y la
           carga diferida mira la posicion de maquetado, no la movida: las fotos
           que van entrando nunca se enteran de que les toca cargar y el circulo
           se queda gris. Son 15 fotos de 7 KB, se cargan todas y ya. */
        return f
          ? '<div class="fo"><img src="' + f + '" alt="Foto de cliente" decoding="async"'
            + ' onerror="this.parentNode.classList.add(\'hueco\');this.remove()"></div>'
          : '<div class="fo hueco"></div>';
      }).join('');
      // el giro dura segun cuantas fotos haya, para que no vaya ni lento ni loco
      tira.style.animationDuration = Math.max(28, fotos.length * 5) + 's';
    }

    // --- tarjetas de texto ---
    var estrellas = function (k) {
      var s = '';
      for (var i = 1; i <= 5; i++) s += (i <= k ? '★' : '<i>★</i>');
      return s;
    };
    var tarjeta = function (r) {
      return '<article class="rsn">'
        + '<div class="quien"><span class="av">' + r.nombre.charAt(0) + '</span>'
        + '<div><div class="nom">' + r.nombre + '</div>'
        + '<div class="lug">' + r.comuna + '</div></div></div>'
        + '<div class="est">' + estrellas(r.estrellas) + '</div>'
        + '<p>' + r.texto + '</p>'
        + '<div class="prod">' + r.producto + '</div>'
        + '<div class="fec">' + r.fecha + '</div>'
        + '</article>';
    };
    /* Se van turnando los productos, uno de cada uno y vuelta a empezar, para
       que en la tira se vean TODOS los que vendemos y no cinco seguidas de
       la máscara solo porque son las primeras de la lista. */
    var porProd = {};
    lista.forEach(function (r) { (porProd[r.producto] = porProd[r.producto] || []).push(r); });
    var prods = Object.keys(porProd), turnadas = [], k = 0;
    while (turnadas.length < 25) {
      var alguna = false;
      for (var j = 0; j < prods.length; j++) {
        var g = porProd[prods[j]];
        if (g[k]) { turnadas.push(g[k]); alguna = true; }
        if (turnadas.length >= 25) break;
      }
      if (!alguna) break;
      k++;
    }

    var pista = document.getElementById('resePista');
    if (pista) pista.innerHTML = turnadas.map(tarjeta).join('');

    /* Las flechas mueven de a tres tarjetas y dan la vuelta al llegar al final,
       para que nunca se queden sin nada que mostrar. */
    function mover(dir) {
      if (!pista) return;
      var t = pista.querySelector('.rsn');
      var paso = ((t ? t.offsetWidth : 190) + 10) * 3;
      var max = pista.scrollWidth - pista.clientWidth;
      var destino = pista.scrollLeft + dir * paso;
      if (destino > max - 4) destino = 0;
      if (destino < 0) destino = max;
      pista.scrollTo({ left: destino, behavior: 'smooth' });
    }
    var a = document.getElementById('reseIzq'), b = document.getElementById('reseDer');
    if (a) a.addEventListener('click', function () { mover(-1); });
    if (b) b.addEventListener('click', function () { mover(1); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* Si se llega desde la ficha de un producto con ?cat=Hogar, la tienda
       abre ya filtrada por esa categoria. */
    var pedida = 'Todos';
    try {
      var q = new URLSearchParams(location.search).get('cat');
      if (q && (window.PRODUCTOS || []).some(function (p) { return p.categoria === q; })) pedida = q;
    } catch (e) {}
    categorias();
    var bt = document.querySelector('#cats button[data-cat="' + pedida + '"]');
    if (bt) document.querySelectorAll('#cats button').forEach(function (x) {
      x.setAttribute('aria-pressed', String(x === bt));
    });
    pintar(pedida);
    resenas();
    cabecera();
    videoHero();
    letrasDelHero();
    videoGarantia();
    boletin();
    revelar();
  });
})();
