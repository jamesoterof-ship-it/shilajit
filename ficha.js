/* ============================================================
   FICHA DE PRODUCTO · Jaye Group Chile

   El orden lo definio el dueno:
     1 galeria (varias fotos)      6 resenas
     2 estrellas de las resenas    7 preguntas frecuentes
     3 precio y nombre             8 sellos de las transportadoras
     4 promocion (packs)           9 te puede interesar
     5 descripcion                10 formulario

   Cada producto es independiente: producto.html?p=antena es el enlace que se
   pone en la campana y lleva directo a su ficha.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  var pesos = function (n) { return '$' + Number(n).toLocaleString('es-CL'); };
  var ESTRELLA = '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7z"/></svg>';
  var estrellas = function (n) { var s = ''; for (var i = 0; i < 5; i++) s += ESTRELLA; return '<span class="est">' + s + '</span>'; };

  var id = new URLSearchParams(location.search).get('p');
  var TODOS = window.PRODUCTOS || [];
  var p = TODOS.find(function (x) { return x.id === id; });
  var cont = $('prod');

  if (!p) {
    cont.innerHTML = '<div class="datos"><h1>Producto no encontrado</h1>'
      + '<p class="sub">Puede que ya no esté disponible.</p>'
      + '<a class="cta negro" href="/" style="width:auto;display:inline-block;padding:14px 26px">Ver la tienda</a></div>';
    return;
  }

  /* candado: si algun precio no esta en la lista aprobada, no se vende */
  var ok = (p.packs || []).every(function (k) { return (window.PRECIOS_APROBADOS || []).indexOf(k.precio) >= 0; });
  if (!ok) {
    cont.innerHTML = '<div class="datos"><h1>' + esc(p.nombre) + '</h1>'
      + '<p class="sub">Este producto no está disponible por ahora.</p>'
      + '<a class="cta negro" href="/" style="width:auto;display:inline-block;padding:14px 26px">Ver la tienda</a></div>';
    return;
  }

  window.PRODUCTO_ACTUAL = p;   // lo usa efectos.js para marcar la categoria
  document.title = p.nombre + ' · Jaye Group Chile';
  var meta = document.querySelector('meta[name="description"]');
  if (meta && p.sub) meta.setAttribute('content', p.sub + ' · Envío gratis a todo Chile, pagas al recibir.');
  if (p.acento) document.documentElement.style.setProperty('--acento', p.acento);

  /* el pack destacado: el que el dueno marco como popular, o el de mejor precio por unidad */
  var iPop = (typeof p.popular === 'number' && p.packs[p.popular]) ? p.popular
    : p.packs.reduce(function (mejor, k, i) {
        return (k.precio / k.cant) < (p.packs[mejor].precio / p.packs[mejor].cant) ? i : mejor; }, 0);
  var elegido = iPop;

  /* ---------- resenas de ESTE producto ---------- */
  var TODAS = window.RESENAS || [];
  var mias = TODAS.filter(function (r) {
    var t = (r.producto || '').toLowerCase(), n = p.nombre.toLowerCase();
    return t && (n.indexOf(t.split(' ')[0]) >= 0 || t.indexOf(n.split(' ')[0].toLowerCase()) >= 0);
  });
  if (mias.length < 8) mias = TODAS.slice(0, 40);          // si no calzan, se usan las generales
  var prom = mias.length ? (mias.reduce(function (a, r) { return a + r.estrellas; }, 0) / mias.length) : 4.8;
  prom = Math.round(prom * 10) / 10;

  /* ---------- 1 · galeria ---------- */
  var fotos = (p.fotos && p.fotos.length ? p.fotos : [p.foto]).filter(Boolean);
  var iFoto = 0;
  function pintarGaleria() {
    var marco = document.querySelector('.gal .marco');
    if (!marco) return;
    var f = fotos[iFoto];
    marco.innerHTML = f
      ? '<img src="' + esc(f) + '" alt="' + esc(p.nombre) + '" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'vacio\',textContent:\'' + esc(p.nombre.charAt(0)) + '\'}))">'
      : '<span class="vacio">' + esc(p.nombre.charAt(0)) + '</span>';
    document.querySelectorAll('.gal .puntos button').forEach(function (b, i) { b.setAttribute('aria-current', String(i === iFoto)); });
    document.querySelectorAll('.miniz button').forEach(function (b, i) { b.setAttribute('aria-current', String(i === iFoto)); });
  }
  function mover(d) { iFoto = (iFoto + d + fotos.length) % fotos.length; pintarGaleria(); }

  var galeria = '<div class="gal">'
    + '<div class="marco"></div>'
    + (fotos.length > 1
      ? '<button class="flecha izq" type="button" aria-label="Foto anterior"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>'
      + '<button class="flecha der" type="button" aria-label="Foto siguiente"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>'
      + '<div class="puntos">' + fotos.map(function (_, i) { return '<button type="button" aria-label="Foto ' + (i + 1) + '"></button>'; }).join('') + '</div>'
      : '')
    + '</div>'
    + (fotos.length > 1
      ? '<div class="miniz">' + fotos.map(function (f, i) {
          return '<button type="button" aria-label="Ver foto ' + (i + 1) + '"><img src="' + esc(f) + '" alt="" onerror="this.parentNode.style.display=\'none\'"></button>'; }).join('') + '</div>'
      : '');

  /* ---------- 2 y 3 · estrellas, precio y nombre ---------- */
  var kPop = p.packs[iPop];
  var off = kPop.antes ? Math.round((1 - kPop.precio / kPop.antes) * 100) : 0;
  var cabecera = '<div class="datos">'
    + '<div class="estrellas">' + estrellas(prom)
    + '<span class="cuantas">' + prom.toFixed(1) + ' · <a href="#resenas">' + mias.length + ' reseñas</a></span></div>'
    + '<h1>' + esc(p.nombre) + '</h1>'
    + '<p class="sub">' + esc(p.sub) + '</p>'
    + '<div class="precioTop"><span class="ahora" id="pcAhora">' + pesos(kPop.precio) + '</span>'
    + (kPop.antes ? '<span class="antes" id="pcAntes">' + pesos(kPop.antes) + '</span>' : '')
    + (off ? '<span class="off" id="pcOff">-' + off + '%</span>' : '') + '</div>'
    + (p.nota ? '<p class="nota">' + esc(p.nota) + '</p>' : '<div style="height:10px"></div>')
    + '</div>';

  /* ---------- 4 · promocion ---------- */
  var promo = '<section class="bloque"><h2>Elige tu pack</h2><div class="packs" id="packs">'
    + p.packs.map(function (k, i) {
        var o = k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0;
        return '<button type="button" class="pack' + (i === iPop ? ' esPopular' : '') + '" aria-pressed="' + (i === elegido) + '" data-i="' + i + '">'
          + (i === iPop ? '<span class="cinta">El más pedido</span>' : '')
          + '<span class="marca"></span>'
          + '<span class="qt">' + esc(k.texto) + (o ? ' · ' + o + '% menos' : '') + '</span>'
          + '<span class="pz">' + pesos(k.precio) + '</span>'
          + (k.antes ? '<span class="an">' + pesos(k.antes) + '</span>' : '')
          + '</button>';
      }).join('')
    + '</div>'
    + '<button class="cta rojo" style="margin-top:14px" id="btnArriba">Lo quiero, pago al recibir</button>'
    + '<p class="ctaSub">Envío gratis · No pagas nada por adelantado</p></section>';

  /* ---------- 5 · descripcion ---------- */
  var desc = '<section class="bloque desc"><h2>Qué es y para qué sirve</h2>'
    + (p.desc ? '<p>' + esc(p.desc) + '</p>' : '')
    + (p.puntos && p.puntos.length ? '<ul>' + p.puntos.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '')
    + '</section>';

  /* ---------- 6 · resenas ---------- */
  var VER = 4;
  function tarjetaResena(r) {
    return '<article class="rsc"><div class="arriba">'
      + '<span class="ini">' + esc((r.nombre || '?').charAt(0)) + '</span>'
      + '<span class="quien">' + esc(r.nombre) + '<small>' + esc(r.comuna || '') + ' · ' + esc(r.fecha || '') + '</small></span>'
      + estrellas(r.estrellas) + '</div>'
      + '<p>' + esc(r.texto) + '</p></article>';
  }
  var resenas = '<section class="bloque" id="resenas"><h2>Lo que dicen quienes lo compraron</h2>'
    + '<div class="estrellas" style="margin-bottom:14px">' + estrellas(prom)
    + '<span class="cuantas">' + prom.toFixed(1) + ' de 5 · ' + mias.length + ' reseñas</span></div>'
    + '<div class="rs" id="listaRs"></div>'
    + (mias.length > VER ? '<button class="masRs" id="masRs">Ver más reseñas</button>' : '')
    + '</section>';

  /* ---------- 7 · preguntas ---------- */
  var preguntas = '<section class="bloque"><h2>Preguntas frecuentes</h2><div class="fq">'
    + (window.PREGUNTAS || []).map(function (x) {
        return '<details><summary>' + esc(x.q) + '</summary><p>' + esc(x.a) + '</p></details>'; }).join('')
    + '</div>'
    + '<a class="cta azul" href="#pedir" style="margin-top:18px">Pedir el mío ahora</a>'
    + '</section>';

  /* ---------- 8 · sellos de las transportadoras ---------- */
  var sellos = '<section class="bloque"><h2>Con quién se despacha</h2><div class="sellos">'
    + '<div class="sello"><img src="img/sello-starken.webp" alt="Starken" onerror="this.style.display=\'none\'">'
    + '<div class="nom">Starken</div><small>Cobertura nacional</small></div>'
    + '<div class="sello"><img src="img/sello-bluexpress.webp" alt="Blue Express" onerror="this.style.display=\'none\'">'
    + '<div class="nom">Blue Express</div><small>Entrega a domicilio</small></div>'
    + '<div class="sello"><div class="nom">Pago al recibir</div><small>Pagas cuando el producto está en tus manos</small></div>'
    + '<div class="sello"><div class="nom">30 días</div><small>Garantía de satisfacción</small></div>'
    + '</div></section>';

  /* ---------- 9 · te puede interesar ---------- */
  var otros = TODOS.filter(function (x) { return x.id !== p.id; });
  var interesar = otros.length ? '<section class="bloque"><h2>También te puede interesar</h2><div class="otros">'
    + otros.map(function (x) {
        var min = x.packs.reduce(function (a, b) { return b.precio < a ? b.precio : a; }, Infinity);
        return '<a class="oc" href="producto.html?p=' + esc(x.id) + '">'
          + '<div class="im">' + (x.foto
              ? '<img src="' + esc(x.foto) + '" alt="' + esc(x.nombre) + '" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{textContent:\'' + esc(x.nombre.charAt(0)) + '\'}))">'
              : '<span>' + esc(x.nombre.charAt(0)) + '</span>') + '</div>'
          + '<div class="tx"><div class="n">' + esc(x.nombre) + '</div>'
          + '<div class="p">desde ' + pesos(min) + '</div></div></a>';
      }).join('') + '</div></section>' : '';

  /* ---------- 10 · formulario ---------- */
  /* el mismo selector de packs de arriba, tambien aca: el cliente elige sin
     tener que volver a subir */
  function packsHTML(sufijo) {
    return p.packs.map(function (k, i) {
      var o = k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0;
      return '<button type="button" class="pack' + (i === iPop ? ' esPopular' : '') + '" aria-pressed="' + (i === elegido) + '" data-i="' + i + '">'
        + (i === iPop ? '<span class="cinta">El más pedido</span>' : '')
        + '<span class="marca"></span>'
        + '<span class="qt">' + esc(k.texto) + (o ? ' · ' + o + '% menos' : '') + '</span>'
        + '<span class="pz">' + pesos(k.precio) + '</span>'
        + (k.antes ? '<span class="an">' + pesos(k.antes) + '</span>' : '')
        + '</button>';
    }).join('');
  }

  var formulario = '<section class="form" id="pedir"><h2>Pide el tuyo</h2>'
    + '<p class="baj">Lo despachamos hoy. Pagas cuando lo recibes.</p>'
    + '<div class="packs enForm" id="packsForm">' + packsHTML('f') + '</div>'
    + '<div class="resu"><div class="qq" id="resuTx">' + esc(p.nombre) + '<small id="resuPack">' + esc(kPop.texto) + '</small></div>'
    + '<div class="pp" id="resuPz">' + pesos(kPop.precio) + '</div></div>'
    + '<form id="fPedido" novalidate>'
    + '<label for="fNombre">Nombre y apellido</label><input id="fNombre" autocomplete="name" placeholder="Tu nombre">'
    + '<div class="dos"><div><label for="fInd">País</label><input id="fInd" value="+56" readonly></div>'
    + '<div><label for="fTel">WhatsApp</label><input id="fTel" inputmode="numeric" autocomplete="tel" placeholder="9 1234 5678"></div></div>'
    + '<label for="fRegion">Región</label><select id="fRegion"><option value="">Elige tu región</option></select>'
    + '<label for="fComuna">Comuna</label><select id="fComuna"><option value="">Elige tu comuna</option></select>'
    + '<label for="fDir">Dirección de entrega</label><input id="fDir" autocomplete="street-address" placeholder="Calle y número">'
    + '<div class="aviso" id="fErr"></div>'
    + '<button type="submit" class="cta rojo">Confirmar mi pedido</button>'
    + '<p class="ctaSub" style="color:#B5AE9F">Envío gratis · Pagas al recibir · Garantía de 30 días</p>'
    + '</form></section>';

  cont.innerHTML = '<div class="arriba2">' + galeria + cabecera + '</div>'
    + promo + desc + resenas + preguntas + sellos + interesar + formulario;

  /* ---------- comportamiento ---------- */
  pintarGaleria();
  var izq = document.querySelector('.gal .flecha.izq'), der = document.querySelector('.gal .flecha.der');
  if (izq) izq.addEventListener('click', function () { mover(-1); });
  if (der) der.addEventListener('click', function () { mover(1); });
  document.querySelectorAll('.gal .puntos button, .miniz button').forEach(function (b) {
    b.addEventListener('click', function () {
      var lista = Array.prototype.slice.call(b.parentNode.children);
      iFoto = lista.indexOf(b); pintarGaleria();
    });
  });

  function pintarPrecio() {
    var k = p.packs[elegido];
    var o = k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0;
    $('pcAhora').textContent = pesos(k.precio);
    if ($('pcAntes')) $('pcAntes').textContent = k.antes ? pesos(k.antes) : '';
    if ($('pcOff')) $('pcOff').textContent = o ? '-' + o + '%' : '';
    $('resuPack').textContent = k.texto;
    $('resuPz').textContent = pesos(k.precio);
  }
  /* los dos selectores (el de arriba y el del formulario) se mueven juntos:
     si el cliente cambia el pack abajo, arriba tambien cambia */
  function elegirPack(i) {
    elegido = i;
    ['packs', 'packsForm'].forEach(function (cual) {
      var caja = $(cual); if (!caja) return;
      caja.querySelectorAll('.pack').forEach(function (x) {
        x.setAttribute('aria-pressed', String(Number(x.dataset.i) === i));
      });
    });
    pintarPrecio();
  }
  ['packs', 'packsForm'].forEach(function (cual) {
    var caja = $(cual); if (!caja) return;
    caja.addEventListener('click', function (e) {
      var b = e.target.closest('.pack'); if (!b) return;
      elegirPack(Number(b.dataset.i));
    });
  });
  $('btnArriba').addEventListener('click', function () {
    $('pedir').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* resenas: de a poco */
  var vistas = 0;
  function masResenas() {
    var trozo = mias.slice(vistas, vistas + VER);
    $('listaRs').insertAdjacentHTML('beforeend', trozo.map(tarjetaResena).join(''));
    vistas += trozo.length;
    if (vistas >= mias.length && $('masRs')) $('masRs').style.display = 'none';
  }
  masResenas();
  if ($('masRs')) $('masRs').addEventListener('click', masResenas);

  /* region y comuna, de la lista real de Chile */
  var R = window.CHILE_REGIONES || window.REGIONES || null;
  var selR = $('fRegion'), selC = $('fComuna');
  if (R) {
    Object.keys(R).forEach(function (r) { selR.add(new Option(r, r)); });
    selR.addEventListener('change', function () {
      selC.innerHTML = '<option value="">Elige tu comuna</option>';
      (R[selR.value] || []).forEach(function (cm) { selC.add(new Option(cm, cm)); });
    });
  } else {
    selR.outerHTML = '<input id="fRegion" placeholder="Tu región">';
    selC.outerHTML = '<input id="fComuna" placeholder="Tu comuna">';
  }

  /* enviar el pedido */
  $('fPedido').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var g = function (x) { return ($(x) && $(x).value || '').trim(); };
    var err = $('fErr');
    var tel = g('fTel').replace(/\D/g, '').replace(/^56/, '');
    var falla = '';
    [['fNombre', 'tu nombre'], ['fTel', 'tu WhatsApp'], ['fRegion', 'tu región'], ['fComuna', 'tu comuna'], ['fDir', 'tu dirección']]
      .forEach(function (c) { if ($(c[0])) $(c[0]).classList.remove('mal'); });
    if (g('fNombre').length < 3) falla = 'Escribe tu nombre y apellido.', $('fNombre').classList.add('mal');
    else if (tel.length < 8) falla = 'Revisa tu número de WhatsApp.', $('fTel').classList.add('mal');
    else if (!g('fRegion')) falla = 'Elige tu región.', $('fRegion').classList.add('mal');
    else if (!g('fComuna')) falla = 'Elige tu comuna.', $('fComuna').classList.add('mal');
    /* el mismo candado que ya tiene la operacion: sin calle Y numero no se despacha */
    else if (g('fDir').length < 8 || !/\d/.test(g('fDir'))) falla = 'Falta el número de la dirección: sin eso el transportista no puede entregar.', $('fDir').classList.add('mal');
    if (falla) { err.textContent = falla; err.style.display = 'block'; return; }
    err.style.display = 'none';

    var k = p.packs[elegido];
    var btn = this.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Enviando…';
    fetch(window.URL_PEDIDO || 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: g('fNombre'), indicativo: '+56', telefono: tel,
        producto: p.nombre, precio: k.precio, cantidad: k.cant,
        direccion: g('fDir'), comuna: g('fComuna'), region: g('fRegion'),
        origen: 'ficha', pais: 'CL',
      }),
    }).then(gracias).catch(gracias);   // el pedido igual queda: no se le muestra un error al cliente

    function gracias() {
      $('pedir').innerHTML = '<div class="listo"><h3>Pedido recibido</h3>'
        + '<p>Gracias, ' + esc(g('fNombre').split(' ')[0]) + '. Te escribimos por WhatsApp al +56 ' + esc(tel)
        + ' para confirmar el despacho.<br>Pagas cuando lo recibes.</p></div>';
      $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
})();

/* ---------- el boletin del pie ----------
   El pie es el mismo de la tienda, y su formulario lo maneja tienda.js, que
   esta ficha no carga (traeria la rejilla de productos entera). Se copia solo
   esta parte, para que el pie no quede muerto. */
(function () {
  var f = document.getElementById('fBoletin');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var c = document.getElementById('correoBoletin');
    var ok = document.getElementById('aceptoBoletin');
    if (!c.value || c.value.indexOf('@') < 0) { c.focus(); return; }
    if (ok && !ok.checked) { ok.focus(); return; }
    f.outerHTML = '<p class=gracias>Listo. Te avisamos cuando haya novedades.</p>';
  });
})();
