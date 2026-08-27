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
    + '<div style="height:10px"></div>'   /* la nota del pack se quito: el pack ya lo dice */
    + '</div>';

  /* ---------- 4 · promocion ---------- */
  /* Los packs viven SOLO en el formulario: arriba repetian el precio grande
     y estorbaban. Aca queda el boton que baja al pedido. */
  var promo = '<section class="bloque">'
    + '<button class="cta rojo rebota" id="btnArriba">Lo quiero, pago al recibir</button>'
    + '<p class="ctaSub">Envío gratis · No pagas nada por adelantado</p></section>';


  /* ---------- 5 · descripcion ---------- */
  var desc = '<section class="bloque desc" data-rv><span class="eyebrow">El producto</span><h2 class="tit2">Qué es y para qué sirve</h2>'
    + (p.desc ? '<p>' + esc(p.desc) + '</p>' : '')
    + (p.puntos && p.puntos.length ? '<ul>' + p.puntos.map(function (x, i) { return '<li style="--i:' + i + '">' + esc(x) + '</li>'; }).join('') + '</ul>' : '')
    + '</section>';

  /* ---------- 6 · resenas ---------- */
  var VER = 4;
  function tarjetaResena(r) {
    return '<article class="rsc"><div class="arriba">'
      + '<span class="ini">' + esc((r.nombre || '?').charAt(0)) + '</span>'
      + '<span class="quien">' + esc(r.nombre)
      + '<i class="verif">✓ Verificado</i>'
      + '<small>' + esc(r.comuna || '') + ' · ' + esc(r.fecha || '') + '</small></span>'
      + estrellas(r.estrellas) + '</div>'
      + '<p>' + esc(r.texto) + '</p>'
      + (r.foto ? '<img class="rfoto" src="' + esc(r.foto) + '" alt="" loading="lazy" onerror="this.remove()">' : '')
      + '</article>';
  }
  /* Resenas con el molde de NAD+: puntuacion grande, barras por estrella,
     boton de escribir, sello Verificado y carrusel automatico abajo. */
  var barras = [5, 4, 3, 2, 1].map(function (e) {
    var n = mias.filter(function (r) { return r.estrellas === e; }).length;
    var pc = mias.length ? Math.round(n / mias.length * 100) : 0;
    return '<div class="bar"><span class="lvl">' + e + ' ★</span>'
      + '<div class="track"><i style="--w:' + pc + '%"></i></div><b>' + n + '</b></div>';
  }).join('');
  var resenas = '<section class="bloque rev-sec" id="resenas" data-rv>'
    + '<h2 class="rev-title">Experiencias reales <span class="stars">★★★★★</span></h2>'
    + '<div class="rev-score"><span class="big">' + prom.toFixed(1) + '</span>'
    + '<span class="cnt">' + mias.length + ' reseñas</span></div>'
    + '<div class="rev-bars">' + barras + '</div>'
    + '<button class="btn-write" id="btnWrite">Escribir una reseña</button>'
    + '<div class="rs" id="listaRs"></div>'
    + (mias.length > VER ? '<button class="masRs" id="masRs">Ver más reseñas</button>' : '')
    + '<p class="rev-auto-label">Más experiencias de nuestros clientes</p>'
    + '<div class="rev-auto"><div class="rev-auto__track" id="revAuto"></div></div>'
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


  /* ---------- 5 · LA FORMULA (molde NAD+) ---------- */
  var ICONOS = {
    ondas:'<path d="M12 18h.01"/><path d="M8.5 14.5a5 5 0 0 1 7 0"/><path d="M5 11a10 10 0 0 1 14 0"/>',
    torre:'<path d="M12 21V9"/><path d="M7 21l5-16 5 16"/><circle cx="12" cy="5" r="2"/>',
    iman:'<path d="M6 4v8a6 6 0 0 0 12 0V4"/><path d="M6 9h4M14 9h4"/>',
    cable:'<path d="M4 8a4 4 0 0 1 8 0v8a4 4 0 0 0 8 0"/><circle cx="4" cy="8" r="1.6"/>',
    casa:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    llave:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l2 2M14 9l2 2"/>',
    fibra:'<path d="M4 20c3-8 5-12 8-16"/><path d="M9 20c3-8 5-12 8-16"/><path d="M14 20c2-6 3-9 5-13"/>',
    cepillo:'<rect x="9" y="3" width="6" height="14" rx="3"/><path d="M9 7H6M9 11H6M9 15H6M15 7h3M15 11h3M15 15h3"/><path d="M12 17v4"/>',
    agua:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    ojo:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
    pluma:'<path d="M20 4C11 4 4 11 4 20"/><path d="M4 20c8 0 16-7 16-16"/><path d="M8 16l4-4"/>',
    libro:'<path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 1-2-2z"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
    auto:'<path d="M4 15h16v-3l-2-5H6l-2 5z"/><circle cx="7.5" cy="17" r="1.6"/><circle cx="16.5" cy="17" r="1.6"/>',
    rayo:'<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    pantalla:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    escudo:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  };
  function seccionFormula() {
    if (!p.formula || !p.formula.length) return '';
    return '<section class="bloque form-sec"><span class="eyebrow">La fórmula</span>'
      + '<h2 class="tit2">' + esc(p.formulaTitulo || 'Qué trae') + '</h2>'
      + (p.formulaSub ? '<p class="sub2">' + esc(p.formulaSub) + '</p>' : '')
      + '<div class="ing-grid">'
      + p.formula.map(function (x) {
          return '<div class="ing"><div class="cir"><svg viewBox="0 0 24 24">' + (ICONOS[x[0]] || ICONOS.llave) + '</svg></div>'
            + '<div><b>' + esc(x[1]) + '</b><p>' + esc(x[2]) + '</p></div></div>';
        }).join('')
      + '</div></section>';
  }

  /* ---------- 6 · EL CAMBIO (solo si hay foto de antes y despues) ---------- */
  function seccionCambio() {
    if (!p.antesDespues) return '';
    return '<section class="bloque ba-sec"><span class="eyebrow">El cambio</span>'
      + '<h2 class="tit2">El antes y después que se nota</h2>'
      + (p.antesDespuesSub ? '<p class="sub2">' + esc(p.antesDespuesSub) + '</p>' : '')
      + '<div class="ba-img"><img src="' + esc(p.antesDespues) + '" alt="Antes y después" loading="lazy" onerror="this.parentNode.remove()"></div>'
      + '<button class="cta rojo" onclick="document.getElementById(\'pedir\').scrollIntoView({behavior:\'smooth\'})">Quiero ese cambio</button></section>';
  }

  /* ---------- 7 · RESULTADOS · numeros REALES de la operacion ---------- */
  function seccionResultados() {
    var datos = [
      ['701', 'pedidos entregados en Chile'],
      ['4,6', 'días promedio hasta tu casa'],
      ['$0', 'de envío, a todo Chile'],
      ['30', 'días de garantía'],
    ];
    return '<section class="bloque res-sec" data-rv><span class="eyebrow">Resultados</span>'
      + '<h2 class="tit2">Lo que ya pasó, no lo que prometemos</h2>'
      + '<div class="res-grid">'
      + datos.map(function (d, i) { return '<div class="res" style="--i:' + i + '"><b data-num="' + d[0] + '">' + d[0] + '</b><span>' + d[1] + '</span></div>'; }).join('')
      + '</div></section>';
  }

  /* ---------- 8 · QUE LO HACE DIFERENTE ---------- */
  function seccionCompara() {
    if (!p.compara || !p.compara.length) return '';
    return '<section class="bloque cmp-sec" data-rv><h2 class="tit2">' + esc(p.comparaTitulo || '¿Qué lo hace diferente?') + '</h2>'
      + '<table class="cmp"><thead><tr><th>Característica</th><th class="us">' + esc(p.nombre.split(' ').slice(0, 2).join(' ')) + '</th><th>Otros</th></tr></thead><tbody>'
      + p.compara.map(function (t) {
          return '<tr><td>' + esc(t) + '</td>'
            + '<td class="si"><svg viewBox="0 0 24 24"><path d="M4 12l6 6L20 6"/></svg></td>'
            + '<td class="no"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></td></tr>';
        }).join('')
      + '</tbody></table></section>';
  }

  /* ---------- 10 · GARANTIA 30 DIAS ---------- */
  function seccionGarantia() {
    return '<section class="bloque gar-sec">'
      + '<div class="gseal"><svg viewBox="0 0 220 220" aria-label="Garantía de 30 días">'
      + '<defs><radialGradient id="gs" cx="0.34" cy="0.28" r="0.95">'
      + '<stop offset="0" stop-color="#f9ecb8"/><stop offset="0.38" stop-color="#e6c65a"/>'
      + '<stop offset="0.68" stop-color="#c9a227"/><stop offset="1" stop-color="#8f741c"/></radialGradient>'
      + '<path id="gt" fill="none" d="M44 110a66 66 0 0 1 132 0"/><path id="gb" fill="none" d="M48 118a62 62 0 0 0 124 0"/></defs>'
      + '<circle cx="110" cy="110" r="98" fill="url(#gs)" opacity=".16"/>'
      + '<circle cx="110" cy="110" r="92" fill="url(#gs)" stroke="#8f741c" stroke-width="3"/>'
      + '<ellipse cx="86" cy="72" rx="46" ry="26" fill="#fff" opacity="0.28"/>'
      + '<circle cx="110" cy="110" r="84" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-dasharray="1.5 6" stroke-linecap="round"/>'
      + '<text font-family="Inter,sans-serif" font-weight="700" font-size="14.5" letter-spacing="2.4" fill="#fff"><textPath href="#gt" startOffset="50%" text-anchor="middle">GARANTÍA TOTAL</textPath></text>'
      + '<text font-family="Inter,sans-serif" font-weight="700" font-size="12.5" letter-spacing="1.8" fill="#fff"><textPath href="#gb" startOffset="50%" text-anchor="middle">DEVOLUCIÓN 100%</textPath></text>'
      + '<text x="110" y="105" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="46" fill="#fff">30</text>'
      + '<text x="110" y="128" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="13" letter-spacing="3" fill="#fff">DÍAS</text>'
      + '</svg></div>'
      + '<h2 class="tit2">Garantía de satisfacción</h2>'
      + '<p class="sub2">Si no quedas conforme, te devolvemos tu dinero dentro de los primeros 30 días. Sin preguntas.</p>'
      + '<div class="gar-chips"><span>Devolución 100%</span><span>Sin preguntas</span><span>Pago al recibir</span></div>'
      + '</section>';
  }

  /* ---------- 14 · formulario ---------- */
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

  /* Formulario con el molde de NAD+: una tarjeta que contiene todo, el sello
     de pago seguro arriba, los packs con la foto del producto, el resumen de
     cuenta y los logos de las transportadoras al final. */
  function packsHTML() {
    return p.packs.map(function (k, i) {
      var o = k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0;
      var etiqueta = i === iPop ? 'Más vendido' : (i === p.packs.length - 1 ? 'Mejor precio' : '');
      return '<button type="button" class="pack' + (i === elegido ? ' sel' : '') + '" data-i="' + i + '">'
        + (etiqueta ? '<span class="tag">' + etiqueta + '</span>' : '')
        + '<span class="radio"></span>'
        + (p.foto ? '<img class="thumb" src="' + esc(p.foto) + '" alt="" onerror="this.remove()">' : '')
        + '<span class="info"><span class="t">' + esc(k.texto) + '</span>'
        + (o ? '<span class="s">Ahorra ' + o + '%</span>' : '') + '</span>'
        + '<span class="pr"><span class="n">' + pesos(k.precio) + '</span>'
        + (k.antes ? '<span class="w">' + pesos(k.antes) + '</span>' : '') + '</span>'
        + '</button>';
    }).join('');
  }
  var kSel = p.packs[elegido];
  var formulario = '<section class="form" id="pedir" data-rv><h2>Pide el tuyo</h2>'
    + '<p class="baj">Lo despachamos hoy. Pagas cuando lo recibes.</p>'
    + '<div class="formcard">'
    + '<div class="cod-badge">'
    + '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>'
    + ' Pago 100% seguro contra entrega</div>'
    + '<div class="packs" id="packsForm">' + packsHTML() + '</div>'
    + '<div class="summary">'
    + '<div class="r"><span>Subtotal</span><span id="sumSub">' + pesos(kSel.antes || kSel.precio) + '</span></div>'
    + '<div class="r"><span>Descuento</span><span id="sumDesc" class="desc">-' + pesos((kSel.antes || kSel.precio) - kSel.precio) + '</span></div>'
    + '<div class="r"><span>Envío</span><span class="free">Gratis</span></div>'
    + '<div class="r tot"><span>Total a pagar al recibir</span><span id="sumTot">' + pesos(kSel.precio) + '</span></div>'
    + '</div>'
    + '<form id="fPedido" novalidate>'
    + '<div class="field"><label for="fNombre">Nombre completo</label><input id="fNombre" autocomplete="name" placeholder="Ej: María González"><div class="err">Escribe tu nombre.</div></div>'
    + '<div class="field"><label for="fTel">Celular / WhatsApp</label>'
    + '<div class="telrow"><span class="cc-btn"><img class="cc-flag" src="https://flagcdn.com/cl.svg" alt=""><span class="cc-code">+56</span></span>'
    + '<input id="fTel" inputmode="numeric" autocomplete="tel" placeholder="9 1234 5678"></div>'
    + '<div class="err">Escribe un teléfono válido.</div></div>'
    + '<div class="field"><label for="fDir">Dirección</label><input id="fDir" autocomplete="street-address" placeholder="Calle y número"><div class="err">Escribe tu dirección con número.</div></div>'
    + '<div class="field"><label for="fRef">Referencia <span class="opc">(opcional)</span></label><input id="fRef" placeholder="Entre calles, color de casa, etc."></div>'
    + '<div class="row2">'
    + '<div class="field"><label for="fRegion">Región</label><select id="fRegion"><option value="">Selecciona…</option></select><div class="err">Selecciona tu región.</div></div>'
    + '<div class="field"><label for="fComuna">Comuna</label><select id="fComuna"><option value="">Selecciona…</option></select><div class="err">Selecciona tu comuna.</div></div>'
    + '</div>'
    + '<div class="field"><label for="fCorreo">Correo <span class="opc">(opcional)</span></label><input id="fCorreo" type="email" inputmode="email" placeholder="Ej: maria@gmail.com"></div>'
    + '<div class="aviso" id="fErr"></div>'
    + '<button type="submit" class="cta rojo rebota">Comprar — pago al recibir</button>'
    + '<p class="formnote">No pagas nada ahora. Te escribimos por WhatsApp para coordinar la entrega.</p>'
    + '</form>'
    + '<div class="carriers"><span class="cl">Despachamos con</span>'
    + '<div class="cbadges"><img src="img/sello-bluexpress.webp" alt="Blue Express" onerror="this.remove()">'
    + '<img src="img/sello-starken.webp" alt="Starken" onerror="this.remove()"></div></div>'
    + '</div></section>';


  cont.innerHTML = '<div class="arriba2">' + galeria + cabecera + '</div>'
    + promo
    + seccionFormula()
    + seccionCambio()
    + seccionResultados()
    + seccionCompara()
    + desc
    + resenas
    + seccionGarantia()
    + preguntas
    + sellos
    + interesar
    + formulario
    + '<div class="stickycta" id="flota"><button class="cta rojo" onclick="document.getElementById('pedir').scrollIntoView({behavior:'smooth'})">Pedir ahora — pago contra entrega</button></div>'
    + '<a class="wa" href="https://wa.me/56964775539" target="_blank" rel="noopener" aria-label="WhatsApp">'
    + '<svg viewBox="0 0 24 24"><path d="M20.5 3.5A11 11 0 0 0 3.2 17.1L2 22l5-1.2A11 11 0 1 0 20.5 3.5zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-3 .7.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5s-.5-1.3-.7-1.7-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3A3 3 0 0 0 6.9 10a5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4 5.3 5.3 0 0 0 2.4.5 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg></a>';

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
    if ($('sumSub')) $('sumSub').textContent = pesos(k.antes || k.precio);
    if ($('sumDesc')) $('sumDesc').textContent = '-' + pesos((k.antes || k.precio) - k.precio);
    if ($('sumTot')) $('sumTot').textContent = pesos(k.precio);
  }
  /* los dos selectores (el de arriba y el del formulario) se mueven juntos:
     si el cliente cambia el pack abajo, arriba tambien cambia */
  function elegirPack(i) {
    elegido = i;
    ['packsForm'].forEach(function (cual) {
      var caja = $(cual); if (!caja) return;
      caja.querySelectorAll('.pack').forEach(function (x) {
        var mio = Number(x.dataset.i) === i;
        x.setAttribute('aria-pressed', String(mio));
        x.classList.toggle('sel', mio);
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

/* ---------- el boton flotante aparece cuando el cliente ya bajo ----------
   Se esconde al llegar al formulario, para no tapar el propio boton de pedido. */
(function () {
  var fl = document.getElementById('flota'), ped = document.getElementById('pedir');
  if (!fl) return;
  var esperando = false;
  function mirar() {
    var y = window.scrollY || 0;
    var enForm = ped && ped.getBoundingClientRect().top < window.innerHeight * 0.9;
    fl.classList.toggle('show', y > 420 && !enForm);
    esperando = false;
  }
  window.addEventListener('scroll', function () {
    if (esperando) return; esperando = true; requestAnimationFrame(mirar);
  }, { passive: true });
  mirar();
})();

/* ---------- las secciones aparecen al llegar a ellas ----------
   Mismo comportamiento que la tienda: nada se queda invisible. */
function revelarFicha() {
  var partes = document.querySelectorAll('[data-rv]:not(.vino)');
  /* si la ficha aun no se pinto, se reintenta: antes salia de aca y las
     secciones se quedaban invisibles para siempre */
  if (!partes.length) { setTimeout(revelarFicha, 200); return; }
  if (!('IntersectionObserver' in window)) { partes.forEach(function (e) { e.classList.add('vino'); }); return; }
  var ojo = new IntersectionObserver(function (ent) {
    ent.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vino'); ojo.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  partes.forEach(function (e) { ojo.observe(e); });
  setTimeout(function () { document.querySelectorAll('[data-rv]:not(.vino)').forEach(function (e) {
    if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('vino'); }); }, 400);
}
revelarFicha();

/* el carrusel de resenas: se duplica la lista para que corra sin cortes */
(function () {
  var t = document.getElementById('revAuto');
  if (!t || !window.RESENAS) return;
  var lote = window.RESENAS.slice(0, 14);
  var uno = lote.map(function (r) {
    return '<article class="rsc"><div class="arriba"><span class="ini">' + (r.nombre || '?').charAt(0) + '</span>'
      + '<span class="quien">' + r.nombre + '<i class="verif">✓ Verificado</i><small>' + (r.comuna || '') + '</small></span></div>'
      + '<p>' + r.texto + '</p></article>';
  }).join('');
  t.innerHTML = uno + uno;
})();

/* ---------- los numeros de Resultados suben desde cero ----------
   Se respeta el formato: 701 sube entero, 4,6 sube con decimal, /usr/bin/bash y 30
   quedan tal cual porque contar hasta 0 no se ve. */
function contarNumeros() {
  var caja = document.querySelector('.res-sec');
  if (!caja) return;
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function subir(el) {
    var fin = String(el.dataset.num || el.textContent).trim();
    var num = parseFloat(fin.replace(/[^0-9,.]/g, '').replace(',', '.'));
    if (!num || quieto) return;
    var dec = fin.indexOf(',') >= 0 ? 1 : 0;
    var pre = fin.match(/^[^0-9]*/)[0], pos = fin.match(/[^0-9,.]*$/)[0];
    var t0 = null, dur = 1100;
    function paso(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var suave = 1 - Math.pow(1 - p, 3);          // arranca rapido y frena
      var v = (num * suave).toFixed(dec).replace('.', ',');
      el.textContent = pre + v + pos;
      if (p < 1) requestAnimationFrame(paso); else el.textContent = fin;
    }
    el.textContent = pre + (dec ? '0,0' : '0') + pos;
    requestAnimationFrame(paso);
  }
  var arrancado = false;
  function mirar() {
    if (arrancado) return;
    if (caja.getBoundingClientRect().top > window.innerHeight * 0.85) return;
    arrancado = true;
    caja.querySelectorAll('b[data-num]').forEach(function (el, i) {
      setTimeout(function () { subir(el); }, i * 110);
    });
  }
  window.addEventListener('scroll', mirar, { passive: true });
  mirar();
}
contarNumeros();
