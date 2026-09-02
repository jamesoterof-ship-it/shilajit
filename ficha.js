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

  /* Paises para el indicativo del WhatsApp. Chile primero porque es donde
     despachamos, y detras los de la region y los que mas migracion tienen
     aca: hay clientes que viven en Chile con numero de su pais y antes no
     podian pedir, porque el +56 estaba pintado y no se podia cambiar.
       [codigo, indicativo, largo esperado del numero, nombre]
     El largo se usa para avisar, no para bloquear: los formatos cambian y
     no se le va a negar una venta a alguien por eso. */
  var PAISES = [
    ['CL', '+56',  9, 'Chile'],
    ['VE', '+58', 10, 'Venezuela'],
    ['CO', '+57', 10, 'Colombia'],
    ['PE', '+51',  9, 'Perú'],
    ['BO', '+591', 8, 'Bolivia'],
    ['AR', '+54', 10, 'Argentina'],
    ['EC', '+593', 9, 'Ecuador'],
    ['BR', '+55', 11, 'Brasil'],
    ['HT', '+509', 8, 'Haití'],
    ['MX', '+52', 10, 'México'],
    ['ES', '+34',  9, 'España'],
    ['US', '+1',  10, 'Estados Unidos'],
  ];
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

  window.PRODUCTO_ACTUAL = p;

  /* El panel de Jaye (visitas y conversion) lee de Postgres y muestra sola
     cualquier pagina que reporte. La tienda nueva no reportaba nada, por eso
     no aparecia. Se reporta igual que las landings viejas, pero con un slug
     por producto para que cada uno tenga su propia fila. */
  window.avisarPanel = function (tipo) {
    try {
      fetch('https://n8n-production-8a42.up.railway.app/webhook/track-visita', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagina: 'tienda-' + p.id, producto: p.nombre, tipo: tipo }),
      }).catch(function () {});
    } catch (e) {}
  };
  /* una visita por sesion y por producto: si recarga, no cuenta de nuevo */
  try {
    var clave = 'jaye_vis_' + p.id;
    if (!sessionStorage.getItem(clave)) { sessionStorage.setItem(clave, '1'); window.avisarPanel('visita'); }
  } catch (e) { window.avisarPanel('visita'); }

  /* pixel: que Meta sepa que producto se vio y con que precio */
  if (window.fbq) try { fbq('track','ViewContent',{ content_name:p.nombre, content_type:'product',
    content_ids:[p.id], value:p.packs[0].precio, currency:'CLP' }); } catch (e) {}   // lo usa efectos.js para marcar la categoria
  document.title = p.nombre + ' · Jaye Group Chile';
  var meta = document.querySelector('meta[name="description"]');
  if (meta && p.sub) meta.setAttribute('content', p.sub + ' · Envío gratis a todo Chile, pagas al recibir.');
  /* El color del producto manda en botones y secciones. Si no trae, se queda
     el rojo de siempre. Tambien se calcula un tono mas oscuro para sombras y
     degradados. */
  /* Elige letra clara u oscura segun cual se LEA mejor sobre el color.
     Antes se usaba la formula vieja (YIQ, corte en 150) y se equivocaba con
     los colores saturados: al turquesa de los lentes le ponia letra blanca
     y quedaba en 2.6 de contraste. Ahora se mide el contraste real de las
     dos opciones y gana la mayor, que nunca falla. */
  function luminancia(hex) {
    var n = parseInt(String(hex).replace('#', ''), 16);
    var c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function letraSobre(hex) {
    var L = luminancia(hex);
    var contraste = function (otra) {
      var a = Math.max(L, otra), b = Math.min(L, otra);
      return (a + 0.05) / (b + 0.05);
    };
    return contraste(luminancia('#171510')) >= contraste(luminancia('#ffffff')) ? '#171510' : '#fff';
  }
  function oscurece(hex, cuanto) {
    var n = parseInt(String(hex).replace('#', ''), 16);
    var r = Math.max(0, ((n >> 16) & 255) - cuanto);
    var g = Math.max(0, ((n >> 8) & 255) - cuanto);
    var b = Math.max(0, (n & 255) - cuanto);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  /* Los circulos de los iconos van negros con el icono del color del producto.
     Si el color es muy oscuro no se ve encima del negro (le pasa al azul de la
     antena), y entonces ese producto los lleva blancos con borde de su color.
     Se pide con iconoClaro: true en productos.js. */
  if (p.iconoClaro) document.documentElement.classList.add('ico-claro');
  if (p.acento) {
    var raiz = document.documentElement.style;
    raiz.setProperty('--acento', p.acento);
    /* un producto puede llevar DOS colores: el principal y otro para los
       avisos (descuento, mas vendido). Si no trae el segundo, se usa el
       principal mas oscuro. */
    raiz.setProperty('--acento2', p.acento2Manual || oscurece(p.acento, 34));
    raiz.setProperty('--aviso', p.acento2Manual || p.acento);
    /* El segundo boton. Si el producto no trae color propio se usa EL SUYO,
       no el azul fijo del css: en el foco (salmon) salia un boton azul que
       no pintaba nada. La mascara si trae el suyo, negro. */
    var alt = p.botonAlt || p.acento;
    raiz.setProperty('--cta2', alt);
    raiz.setProperty('--sobreCta2', letraSobre(alt));
    raiz.setProperty('--sobreAviso', letraSobre(p.acento2Manual || p.acento));
    /* sobre un color claro (el dorado) la letra blanca no se lee: se pone negra */
    raiz.setProperty('--sobreAcento', letraSobre(p.acento));
  }

  /* el pack destacado: el que el dueno marco como popular, o el de mejor precio por unidad */
  var iPop = (typeof p.popular === 'number' && p.packs[p.popular]) ? p.popular
    : p.packs.reduce(function (mejor, k, i) {
        return (k.precio / k.cant) < (p.packs[mejor].precio / p.packs[mejor].cant) ? i : mejor; }, 0);
  /* Arriba va el PRECIO DE SALIDA (el primero de la escalera): es el numero
     mas bajo y es el que no espanta al que recien entra. El pack que se
     empuja no se pierde: tiene su propia seccion de PROMOCION mas abajo,
     con contador, y ese pack lo elige el dueno en el campo `promo`. */
  var elegido = 0;
  /* Upsells post-compra, uno por producto. Todos viajan en la MISMA guia que
     el pedido, asi que no pagan flete aparte: por eso el extra tiene que ser
     del MISMO proveedor. Si un producto no esta en esta lista, no se le
     ofrece nada y todo se comporta igual que antes.                        */
  var UPSELLS = {
    /* Cabezal de ducha -> Gel Sellador (Dropi 144587) */
    ducha: { nombre: 'Gel Sellador Invisible 300g',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-sellador',
      foto: 'img/sellador.webp',
      beneficios: ['Sella filtraciones y humedad', 'Queda invisible: no cambia el color',
        'Sirve en concreto, ladrillo, ceramica y madera', 'Se aplica con brocha, listo para usar'],
      opciones: [{ cant: 1, precio: 6000 }, { cant: 2, precio: 9990 }] },
    /* Cepillo de parrilla -> Encendedor de arco (Dropi 91919) */
    cepillo: { nombre: 'Encendedor Eléctrico de Arco',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-encendedor',
      foto: 'img/encendedor.webp',
      beneficios: ['Enciende la parrilla sin fósforos ni gas', 'Recargable por USB: no se acaba',
        'Cuello largo y flexible: no te quemas', 'Doble seguro para que no prenda solo'],
      opciones: [{ cant: 1, precio: 4950 }, { cant: 2, precio: 7950 }] }
  };
  /* la ventana post-compra vive fuera de este bloque, por eso se exponen */
  window.UPSELLS = UPSELLS;
  window.UPSELL_SELLADOR = UPSELLS.ducha;   /* se deja por si algo viejo lo llama */

  /* ---------- resenas de ESTE producto ---------- */
  var TODAS = window.RESENAS || [];
  var mias = TODAS.filter(function (r) {
    var t = (r.producto || '').toLowerCase(), n = p.nombre.toLowerCase();
    return t && (n.indexOf(t.split(' ')[0]) >= 0 || t.indexOf(n.split(' ')[0].toLowerCase()) >= 0);
  });
  if (mias.length < 8) mias = TODAS.slice(0, 40);
  /* sin repetir el mismo texto: salian dos resenas identicas seguidas */
  var textos = {};
  mias = mias.filter(function (r) {
    var k = String(r.texto || '').trim().toLowerCase();
    if (textos[k]) return false;
    textos[k] = 1; return true;
  });          // si no calzan, se usan las generales
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
  var kPop = p.packs[elegido];
  var off = kPop.antes ? Math.round((1 - kPop.precio / kPop.antes) * 100) : 0;
  var cabecera = '<div class="datos">'
    + '<div class="estrellas">' + estrellas(prom)
    + '<span class="cuantas">' + prom.toFixed(1) + ' · <a href="#resenas">' + mias.length + ' reseñas</a></span></div>'
    + '<h1>' + esc(p.nombre) + '</h1>'
    + '<p class="sub">' + esc(p.sub) + '</p>'
    + '<div class="precioTop"><span class="ahora" id="pcAhora">' + pesos(kPop.precio) + '</span>'
    + (kPop.antes ? '<span class="antes" id="pcAntes">' + pesos(kPop.antes) + '</span>' : '')
    + (off ? '<span class="off" id="pcOff">-' + off + '%</span>' : '') + '</div>'
    /* El precio grande es el del PACK DE 2. Hay que decirlo debajo o el cliente
       cree que ese valor es por una sola unidad. Se muestra tambien cuanto le
       sale cada una, que es el argumento que cierra el pack. */
    + (kPop.cant > 1 ? '<p class="packDe" id="pcPack">' + esc(kPop.texto) + ' · ' + pesos(Math.round(kPop.precio / kPop.cant)) + ' cada ' + (p.unidad || 'una') + '</p>' : '<div style="height:10px"></div>')
    + '</div>';

  /* ---------- 4 · promocion ---------- */
  /* Los packs viven SOLO en el formulario: arriba repetian el precio grande
     y estorbaban. Aca queda el boton que baja al pedido. */
  var promo = '<section class="bloque">'
    + '<button class="cta rojo rebota" id="btnArriba">Lo quiero, pago al recibir</button>'
    + '<p class="ctaSub">Envío gratis · No pagas nada por adelantado</p></section>';

  /* ---------- PROMOCION · el pack que se empuja, con contador ----------
     Arriba el cliente ve el precio de salida. Aca ve la oferta de verdad:
     que pack conviene, cuanto sale cada unidad y cuanto se ahorra.
     El pack lo elige el dueno producto por producto, en el campo `promo`:
       mascara 4 · lentes 2 · antena 4 · cargador 2 · foco 3
     Si el producto no trae `promo`, la seccion no aparece. */
  function seccionPromo() {
    if (typeof p.promo !== 'number') return '';
    var iP = p.packs.findIndex(function (k) { return k.cant === p.promo; });
    if (iP < 0 || iP === elegido) return '';
    var k = p.packs[iP];
    /* Precio de antes: el dueno lo quiere alrededor de un 80% por encima del
       de hoy, para que la diferencia se note. Se redondea a la centena. */
    var antes = Math.round(k.precio * 1.8 / 100) * 100;
    var off = Math.round((1 - k.precio / antes) * 100);
    var ahorra = antes - k.precio;
    /* Todo va DENTRO de la caja: afuera no se notaba. */
    return '<section class="bloque promo-sec" data-rv>'
      + '<div class="promo-card">'
      + '<div class="promo-banner"><span class="chispa">★</span>Promoción<span class="promo-banner-sub">termina hoy</span></div>'
      + '<div class="promo-cuerpo">'
      + '<b class="promo-qt">' + esc(k.texto) + '</b>'
      + '<div class="promo-precios">'
      + '<span class="promo-antes">' + pesos(antes) + '</span>'
      + '<span class="promo-precio">' + pesos(k.precio) + '</span>'
      + '<span class="promo-off">-' + off + '%</span></div>'
      + '<p class="promo-uni">' + pesos(Math.round(k.precio / k.cant)) + ' cada ' + (p.unidad || 'una')
      + ' · <b>ahorras ' + pesos(ahorra) + '</b></p>'
      + '<div class="cuenta"><div><b id="cH">--</b><span>horas</span></div>'
      + '<div><b id="cM">--</b><span>min</span></div>'
      + '<div class="seg" id="cajaS"><b id="cS">--</b><span>seg</span></div></div>'
      + '<button class="cta rojo" id="btnPromo" data-i="' + iP + '">Quiero la promoción</button>'
      + '</div></div></section>';
  }


  /* ---------- 5 · descripcion ---------- */
  var desc = '<section class="bloque desc" data-rv><span class="eyebrow">El producto</span><h2 class="tit2">Qué es y para qué sirve</h2>'
    + (p.desc ? '<p>' + esc(p.desc) + '</p>' : '')
    + (p.puntos && p.puntos.length ? '<ul>' + p.puntos.map(function (x, i) { return '<li style="--i:' + i + '">' + esc(x) + '</li>'; }).join('') + '</ul>' : '')
    + '</section>';

  /* ---------- 6 · resenas ---------- */
  var VER = 4;
  /* Las resenas CON FOTO del producto van primero: son las que dan confianza.
     Se quita la foto generica que traia resenas.js (esas son de la tienda) y
     se usan solo las del producto. */
  var fotosCli = p.fotosResenas || [];
  mias = mias.map(function (r) { return Object.assign({}, r, { foto: '' }); });
  if (fotosCli.length) {
    var conFoto = mias.slice(0, fotosCli.length).map(function (r, i) {
      return Object.assign({}, r, { foto: fotosCli[i] });   /* nunca se repite una foto: una por resena, en orden */
    });
    mias = conFoto.concat(mias.slice(fotosCli.length));
  }
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
    /* la barra se llena con scaleX, asi que va la fraccion (0 a 1), no el % */
    return '<div class="bar"><span class="lvl">' + e + ' ★</span>'
      + '<div class="track"><i style="--p:' + (pc / 100) + '"></i></div><b>' + n + '</b></div>';
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
    + (p.preguntas ? p.preguntas.concat((window.PREGUNTAS || []).slice(0, 4)) : (window.PREGUNTAS || [])).map(function (x) {
        return '<details><summary>' + esc(x.q) + '</summary><p>' + esc(x.a) + '</p></details>'; }).join('')
    + '</div>'
    + '</section>';

  /* ---------- 7b · cierre: los beneficios y el llamado ----------
     Va justo despues de las preguntas. El cliente ya resolvio sus dudas ahi,
     asi que aqui se le recuerda POR QUE lo quiere y se le pone el boton.
     Antes las preguntas terminaban con un boton suelto sin contexto.
     Ojo: el boton va SOLO aqui, para no dejar dos CTA seguidos. */
  function seccionCierre() {
    var min = p.packs.reduce(function (a, b) { return b.precio < a.precio ? b : a; }, p.packs[0]);
    var pun = (p.puntos || []).slice(0, 5);
    /* usa las clases que ya existen (.desc trae la lista con palomita):
       asi no se agrega CSS y queda identico al resto de la pagina */
    return '<section class="bloque desc" data-rv>'
      + '<span class="eyebrow">Por qué lo quieres</span>'
      + '<h2 class="tit2">' + esc(p.nombre) + '</h2>'
      + (p.sub ? '<p>' + esc(p.sub) + '</p>' : '')
      + (pun.length ? '<ul>' + pun.map(function (x, i) {
          return '<li style="--i:' + i + '">' + esc(x) + '</li>'; }).join('') + '</ul>' : '')
      + '<p style="margin-top:16px">Desde <b>' + pesos(min.precio) + '</b> · envío gratis y pagas cuando lo recibes en tu casa.</p>'
      + '<a class="cta azul" href="#pedir" style="margin-top:14px">Pedir el mío ahora</a>'
      + '</section>';
  }

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
  /* Solo los 4 que MAS VENDEN (14 dias al 01-09: lentes 104, antena 51, foco 51,
     cargador 46). Antes salian los 6 y ahi iban la ducha y el cepillo, que casi no
     rotan: ocupaban el espacio de los que si venden. En la pagina PRINCIPAL siguen
     saliendo todos — este recorte es solo en la ficha del producto. */
  var MAS_VENDIDOS = ['lentes', 'antena', 'foco', 'cargador'];
  var otros = TODOS
    .filter(function (x) { return x.id !== p.id && MAS_VENDIDOS.indexOf(x.id) >= 0; })
    .sort(function (a, b) { return MAS_VENDIDOS.indexOf(a.id) - MAS_VENDIDOS.indexOf(b.id); })
    .slice(0, 4);
  /* si el producto que se ve ES uno de los 4, se completa con el siguiente que mas vende */
  if (otros.length < 4) {
    TODOS.forEach(function (x) {
      if (otros.length < 4 && x.id !== p.id && MAS_VENDIDOS.indexOf(x.id) < 0) otros.push(x);
    });
  }
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
    return '<section class="bloque form-sec" data-rv><span class="eyebrow">' + esc(p.formulaRotulo || 'Qué incluye') + '</span>'
      + '<h2 class="tit2">' + esc(p.formulaTitulo || 'Qué trae') + '</h2>'
      + (p.formulaSub ? '<p class="sub2">' + esc(p.formulaSub) + '</p>' : '')
      + '<div class="ing-grid">'
      + p.formula.map(function (x) {
          return '<div class="ing"><div class="cir"><svg viewBox="0 0 24 24">' + (ICONOS[x[0]] || ICONOS.llave) + '</svg></div>'
            + '<div><b>' + esc(x[1]) + '</b><p>' + esc(x[2]) + '</p></div></div>';
        }).join('')
      + '</div></section>';
  }

  /* ---------- EL CAMBIO · antes y despues (va antes de las preguntas) ----------
     Solo aparece si el producto tiene foto de antes y despues. */
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
  /* el bloque del sellador: mismo aspecto de los packs, pero aparte */
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
    /* El indicativo era una bandera pintada, no se podia cambiar. Hay clientes
       que viven en Chile con numero de otro pais, y no podian pedir. Ahora es
       un selector de verdad; Chile queda elegido por defecto. */
    + '<div class="field"><label for="fTel">Celular / WhatsApp</label>'
    /* Lista PROPIA, no un <select>: el desplegable del sistema solo pinta
       texto y las banderas no se ven. Aca cada opcion lleva su imagen. */
    + '<div class="telrow"><span class="cc-wrap">'
    + '<button type="button" class="cc-btn" id="ccBtn" aria-haspopup="listbox" aria-expanded="false">'
    + '<img class="cc-flag" id="ccFlag" src="https://flagcdn.com/cl.svg" alt="">'
    + '<span class="cc-code" id="ccCode">+56</span></button>'
    + '<div class="cc-lista" id="ccLista" role="listbox" hidden>'
    + PAISES.map(function (x) {
        return '<button type="button" role="option" data-v="' + x[0] + '|' + x[1] + '|' + x[2] + '"'
          + (x[0] === 'CL' ? ' aria-selected="true"' : '') + '>'
          + '<img src="https://flagcdn.com/' + x[0].toLowerCase() + '.svg" alt="" loading="lazy">'
          + '<span>' + esc(x[3]) + '</span><i>' + x[1] + '</i></button>';
      }).join('')
    + '</div>'
    + '<input type="hidden" id="fPais" value="CL|+56|9"></span>'
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
    /* Salida para el que se traba llenando el formulario. Hoy 6 personas
       llegaron hasta aca en la ficha de la ducha y solo 1 lo mando: si algo
       no les calza —su comuna no aparece, la direccion no se la acepta— no
       tenian a donde ir y se iban. */
    + '<p class="formnote ayuda">¿Se te complica llenarlo? '
    + '<a href="https://wa.me/56964775539?text=' + encodeURIComponent('Hola, quiero pedir ' + p.nombre + ' y se me complica el formulario')
    + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a> y te lo tomamos nosotros.</p>'
    + '</form>'
    + '<div class="carriers"><span class="cl">Despachamos con</span>'
    + '<div class="cbadges"><img src="img/sello-bluexpress.webp" alt="Blue Express" onerror="this.remove()">'
    + '<img src="img/sello-starken.webp" alt="Starken" onerror="this.remove()"></div></div>'
    + '</div></section>';


  cont.innerHTML = '<div class="arriba2">' + galeria + cabecera + '</div>'
    + promo
    /* La descripcion va pegada al precio: el cliente que acaba de entrar
       primero quiere saber QUE ES, y despues le hablamos de la oferta. */
    + desc
    + seccionPromo()
    + seccionFormula()
    + seccionResultados()
    + seccionCompara()
    + resenas
    + seccionGarantia()
    /* El antes y despues va SIEMPRE justo antes de las preguntas frecuentes:
       el cliente ya leyo las resenas y la garantia, ve el cambio y ahi decide. */
    + seccionCambio()
    + preguntas
    + seccionCierre()
    + sellos
    + interesar
    + formulario
    ;

  /* El boton de WhatsApp va colgado del BODY, no dentro de #prod: alli dentro
     un position:fixed queda atrapado por el contenedor y no se ve. */
  /* El boton de WhatsApp va escrito en producto.html, como en DRAINPRO:
     creado por JavaScript no aparecia. */

  /* La barra de abajo, igual que en NAD+: transparente, con el boton
     redondeado flotando. Aparece al bajar y se esconde en el formulario. */
  if (!document.querySelector('.stickycta')) {
    var sb = document.createElement('div');
    sb.className = 'stickycta';
    sb.id = 'stickycta';
    var bt = document.createElement('button');
    bt.className = 'btn-flota';
    bt.textContent = 'Pedir ahora — pago contra entrega';
    bt.addEventListener('click', function () {
      document.getElementById('pedir').scrollIntoView({ behavior: 'smooth' });
    });
    sb.appendChild(bt);
    document.body.appendChild(sb);
  }

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

  /* ---------- la galeria gira sola ----------
     Muchos clientes no tocan las flechas y se pierden las otras fotos. Gira
     cada 4,5 s, pero:
       - se PARA en cuanto el cliente toca algo: si el la esta manejando, la
         galeria no le puede quitar la foto de encima. Y no vuelve a arrancar.
       - solo gira mientras la galeria se ve en pantalla; si el cliente bajo a
         leer las resenas, no se gasta bateria moviendo algo que nadie mira.
       - se apaga con el telefono en "menos animacion". */
  (function girar() {
    if (fotos.length < 2) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var gal = document.querySelector('.gal');
    if (!gal) return;

    var reloj = null, parado = false, siesta = null;
    function arrancar() { if (parado || reloj) return; reloj = setInterval(function () { mover(1); }, 4500); }
    function parar() { if (reloj) { clearInterval(reloj); reloj = null; } }

    /* Se para PARA SIEMPRE solo si el cliente usa los controles: flechas,
       puntos o miniaturas. Ahi esta eligiendo foto y no se le puede quitar.
       OJO: antes se paraba con cualquier touchstart sobre la galeria, y en
       celular la gente arrastra el dedo sobre la foto PARA HACER SCROLL —
       con eso la rotacion se moria al primer deslizamiento. */
    gal.addEventListener('click', function (e) {
      if (e.target.closest('.flecha, .puntos button, .miniz button')) { parado = true; parar(); }
    });
    /* si solo esta tocando la foto, se toma una siesta y vuelve */
    gal.addEventListener('touchstart', function () {
      if (parado) return;
      parar();
      clearTimeout(siesta);
      siesta = setTimeout(arrancar, 8000);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ent) {
        ent.forEach(function (e) { if (e.isIntersecting) arrancar(); else parar(); });
      }, { threshold: 0.35 }).observe(gal);
    } else arrancar();
  })();

  function pintarPrecio() {
    var k = p.packs[elegido];
    window.PACK_ELEGIDO = { cant: k.cant, precio: k.precio };
    window.PRODUCTO_NOMBRE = p.nombre;
    var o = k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0;
    $('pcAhora').textContent = pesos(k.precio);
    if ($('pcAntes')) $('pcAntes').textContent = k.antes ? pesos(k.antes) : '';
    if ($('pcOff')) $('pcOff').textContent = o ? '-' + o + '%' : '';
    if ($('pcPack')) $('pcPack').textContent = k.texto + ' · ' + pesos(Math.round(k.precio / k.cant)) + ' cada ' + (p.unidad || 'una');
    if ($('sumSub')) $('sumSub').textContent = pesos(k.antes || k.precio);
    if ($('sumDesc')) $('sumDesc').textContent = '-' + pesos((k.antes || k.precio) - k.precio);
    if ($('sumTot')) $('sumTot').textContent = pesos(k.precio);
  }
  /* los dos selectores (el de arriba y el del formulario) se mueven juntos:
     si el cliente cambia el pack abajo, arriba tambien cambia */
  var _ic = false;
  /* El aviso al panel va PRIMERO y aparte del pixel: antes todo esto se cortaba
     con un `!window.fbq`, asi que a quien tuviera bloqueador de anuncios no se
     le contaba ni la llegada al formulario. El panel es dato propio, no Meta. */
  function _checkout() { if (_ic) return; _ic = true;
    if (window.avisarPanel) window.avisarPanel('visita_form');
    if (!window.fbq) return;
    try { fbq('track','InitiateCheckout',{ content_name:p.nombre, content_ids:[p.id],
      value:p.packs[elegido].precio, currency:'CLP' }); } catch (e) {}
  }
  var _form = document.getElementById('pedir');
  if (_form && 'IntersectionObserver' in window)
    new IntersectionObserver(function (es, o) { if (es.some(function (x) { return x.isIntersecting; })) { _checkout(); o.disconnect(); } }).observe(_form);
  /* Contador de la promocion. Baja hasta la medianoche EN CHILE y vuelve a
     arrancar: no inventa una fecha falsa, el precio es el de hoy.
     La hora de Chile se pide con Intl para no hacer cuentas de huso a mano,
     que es donde siempre se mete el error. */
  (function contador() {
    if (!$('cH')) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago',
        hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) { return; }
    function dosDig(n) { return (n < 10 ? '0' : '') + n; }
    function tic() {
      var t = {};
      fmt.formatToParts(new Date()).forEach(function (x) { if (x.type !== 'literal') t[x.type] = Number(x.value); });
      var faltan = 86400 - ((t.hour || 0) * 3600 + (t.minute || 0) * 60 + (t.second || 0));
      if (faltan < 0) faltan = 0;
      if ($('cH')) $('cH').textContent = dosDig(Math.floor(faltan / 3600));
      if ($('cM')) $('cM').textContent = dosDig(Math.floor(faltan % 3600 / 60));
      if ($('cS')) $('cS').textContent = dosDig(faltan % 60);
      /* el cuadrito de los segundos se enciende con cada segundo. Se quita y se
         vuelve a poner la clase (leyendo offsetWidth en medio) porque si no, el
         navegador no reinicia la animacion y solo late la primera vez. */
      var cja = $('cajaS');
      if (cja) { cja.classList.remove('late'); void cja.offsetWidth; cja.classList.add('late'); }
    }
    tic();
    setInterval(tic, 1000);
  })();

  /* La lista de paises: se abre al tocar la bandera, y al elegir cambia la
     bandera, el indicativo y el ejemplo del campo. */
  (function paises() {
    var btn = $('ccBtn'), lista = $('ccLista');
    if (!btn || !lista) return;

    function abrir(si) {
      lista.hidden = !si;
      btn.setAttribute('aria-expanded', String(si));
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      abrir(lista.hidden);
    });
    lista.addEventListener('click', function (e) {
      var o = e.target.closest('[data-v]');
      if (!o) return;
      var z = o.dataset.v.split('|');
      if ($('fPais')) $('fPais').value = o.dataset.v;
      $('ccFlag').src = 'https://flagcdn.com/' + z[0].toLowerCase() + '.svg';
      $('ccCode').textContent = z[1];
      var largo = Number(z[2]) || 9;
      if ($('fTel')) $('fTel').placeholder = new Array(largo + 1).join('0').replace(/^0/, '9');
      lista.querySelectorAll('[data-v]').forEach(function (x) {
        x.setAttribute('aria-selected', String(x === o));
      });
      abrir(false);
    });
    /* se cierra al tocar fuera o con Escape */
    document.addEventListener('click', function () { abrir(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') abrir(false); });
  })();

  /* el boton de la promocion deja ese pack marcado en el formulario y baja */
  if ($('btnPromo')) $('btnPromo').addEventListener('click', function () {
    elegirPack(Number(this.dataset.i));
    var f = document.getElementById('pedir');
    if (f) f.scrollIntoView({ behavior: 'smooth' });
  });

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
  /* Se pinta una vez al cargar. pintarPrecio() es la que deja PACK_ELEGIDO y
     PRODUCTO_NOMBRE en window, y solo se llamaba al CAMBIAR de pack: si el
     cliente entraba y llenaba el formulario sin tocar los packs, el carrito
     abandonado se guardaba sin producto, sin cantidad y sin total, y asi no
     hay con que escribirle despues. */
  pintarPrecio();

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
    /* que pais eligio: codigo, indicativo y largo esperado */
    var pz = (g('fPais') || 'CL|+56|9').split('|');
    var paisCod = pz[0], indic = pz[1], largo = Number(pz[2]) || 8;
    /* se quita el indicativo si el cliente lo escribio igual, y los ceros
       de marcado nacional que la gente pone por costumbre */
    var tel = g('fTel').replace(/\D/g, '')
      .replace(new RegExp('^' + indic.replace('+', '')), '')
      .replace(/^0+/, '');
    var falla = '';
    [['fNombre', 'tu nombre'], ['fTel', 'tu WhatsApp'], ['fRegion', 'tu región'], ['fComuna', 'tu comuna'], ['fDir', 'tu dirección']]
      .forEach(function (c) { if ($(c[0])) $(c[0]).classList.remove('mal'); });
    if (g('fNombre').length < 3) falla = 'Escribe tu nombre y apellido.', $('fNombre').classList.add('mal');
    else if (tel.length < Math.min(7, largo)) falla = 'Revisa tu número de WhatsApp.', $('fTel').classList.add('mal');
    else if (!g('fRegion')) falla = 'Elige tu región.', $('fRegion').classList.add('mal');
    else if (!g('fComuna')) falla = 'Elige tu comuna.', $('fComuna').classList.add('mal');
    /* el mismo candado que ya tiene la operacion: sin calle Y numero no se despacha */
    else if (g('fDir').length < 8 || !/\d/.test(g('fDir'))) falla = 'Falta el número de la dirección: sin eso el transportista no puede entregar.', $('fDir').classList.add('mal');
    if (falla) { err.textContent = falla; err.style.display = 'block'; return; }
    err.style.display = 'none';

    var k = p.packs[elegido];
    var btn = this.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Enviando…';
    var _pedido = {
      nombre: g('fNombre'), indicativo: indic, telefono: tel,
      /* `total` es el nombre que espera el webhook: es el que manda la
         landing vieja y el que lee el flujo. Mandando solo `precio`, la
         venta entraba con precio 0 (paso el 28-08 con la ducha) y el
         candado de precios no la podia validar. Se mandan los dos. */
      producto: p.nombre, total: k.precio, precio: k.precio, cantidad: k.cant,
      direccion: g('fDir'), comuna: g('fComuna'), region: g('fRegion'),
      /* La referencia y el correo se le pedian al cliente y se tiraban a la
         basura: no viajaban en el pedido. La referencia es justo lo que el
         transportista necesita en direcciones de campo, y el flujo que guarda
         ya sabe pegarla a la direccion. */
      referencia: g('fRef'), correo: g('fCorreo'),
      /* el DESPACHO sigue siendo Chile; `pais` es el del numero, para que
         Camila le escriba al indicativo correcto */
      origen: 'ficha', pais: paisCod, pais_despacho: 'CL',
    };
    /* ANTES decia `.then(gracias).catch(gracias)`, o sea: pasara lo que
       pasara, al cliente se le daba las gracias Y se le avisaba la compra a
       Meta. Si el webhook estaba caido, el pedido se perdia igual: el cliente
       creia que habia comprado y Meta contaba una venta que no existia.
       El 28-08 pasaron dos asi — Meta reportaba 2 compras y en el panel no
       habia ninguna.
       Ahora: solo se agradece y se avisa a Meta si el pedido ENTRO de verdad.
       Si no entro, se guarda y se reintenta. */
    function mandar(datos, intento) {
      return fetch(window.URL_PEDIDO || 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos),
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return true;
      }).catch(function (e) {
        /* tres intentos, separados, por si fue un tropiezo de red */
        if (intento < 3) {
          return new Promise(function (ok) { setTimeout(ok, 1500 * intento); })
            .then(function () { return mandar(datos, intento + 1); });
        }
        throw e;
      });
    }

    mandar(_pedido, 1).then(function () {
      gracias();
    }).catch(function () {
      /* el pedido NO entro: se guarda para reintentarlo al volver a abrir la
         pagina, y se le dice la verdad al cliente en vez de un falso exito */
      try { localStorage.setItem('jaye_pedido_pendiente', JSON.stringify(_pedido)); } catch (e) {}
      noEntro();
    });

    function gracias() {
      /* La COMPRA. La pagina disparaba PageView, ViewContent e InitiateCheckout
         pero nunca Purchase, y las campañas a la web optimizan justo a Purchase:
         Meta no tenia con que aprender. Se dispara una sola vez, aca, que es el
         unico punto donde el pedido ya salio. */
      if (window.fbq && !window._compraEnviada) {
        window._compraEnviada = true;
        try {
          fbq('track', 'Purchase', {
            value: k.precio, currency: 'CLP',
            content_name: p.nombre, content_ids: [p.id],
            content_type: 'product', num_items: k.cant,
          });
        } catch (e) { /* que un bloqueador de anuncios no tumbe la confirmacion */ }
      }
      $('pedir').innerHTML = '<div class="listo"><h3>Pedido recibido</h3>'
        + '<p>Gracias, ' + esc(g('fNombre').split(' ')[0]) + '. Te escribimos por WhatsApp al ' + esc(indic) + ' ' + esc(tel)
        + ' para confirmar el despacho.<br>Pagas cuando lo recibes.</p></div>';
      $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });

    /* VENTANA POST-COMPRA: el Gel Sellador.
       Copiada de la que ya corre con el Parche Adelgazante en app.js. Sale
       DESPUES de que el pedido entro, nunca antes: el cliente ya compro y se
       le ofrece agregarlo con un toque, sin volver a llenar nada. Va en la
       misma guia, asi que no paga flete aparte.
       Solo en los productos que tienen upsell; en los demas no se ofrece. */
    var extra = (window.UPSELLS || {})[String(p.id)];
    if (extra) abrirUpsell(g('fNombre').split(' ')[0], indic + tel, extra);

      try { localStorage.removeItem('jaye_pedido_pendiente'); } catch (e) {}
    }

    /* El pedido NO entro. Antes se le mostraba "Pedido recibido" igual y se le
       avisaba la compra a Meta: el cliente se quedaba esperando algo que nadie
       iba a despachar. Ahora se le dice la verdad y se le da una salida. */
    function noEntro() {
      var wa = 'https://wa.me/56964775539?text=' + encodeURIComponent(
        'Hola, hice mi pedido de ' + p.nombre + ' en la pagina y no me confirmo. Mi nombre es ' + g('fNombre'));
      $('pedir').innerHTML = '<div class="listo"><h3>No pudimos registrar tu pedido</h3>'
        + '<p>Se cayo la conexion justo al enviarlo, y no queremos decirte que quedo si no es cierto.'
        + '<br>Tus datos quedaron guardados: vuelve a intentarlo en un momento, o escribenos y lo tomamos nosotros.</p>'
        + '<a class="cta negro" href="' + wa + '" style="width:auto;display:inline-block;padding:14px 26px;margin-top:6px">Escribir por WhatsApp</a>'
        + '</div>';
      $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  /* Si un pedido quedo sin entrar, se reintenta solo al volver a abrir la
     pagina. Asi no se pierde aunque el cliente cierre y vuelva. */
  (function reintentar() {
    var crudo;
    try { crudo = localStorage.getItem('jaye_pedido_pendiente'); } catch (e) { return; }
    if (!crudo) return;
    var datos;
    try { datos = JSON.parse(crudo); } catch (e) { try { localStorage.removeItem('jaye_pedido_pendiente'); } catch (x) {} return; }
    fetch(window.URL_PEDIDO || 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos),
    }).then(function (r) {
      if (r.ok) { try { localStorage.removeItem('jaye_pedido_pendiente'); } catch (e) {} }
    }).catch(function () { /* se queda guardado para la proxima */ });
  })();
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

/* El WhatsApp queda siempre visible en la esquina, como en NAD+. */


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

/* La barra aparece cuando el cliente ya bajo, y se esconde al llegar al
   formulario para no tapar el boton de comprar. El WhatsApp sube con ella. */
(function () {
  var sb = document.querySelector('.stickycta'), ped = document.getElementById('pedir');
  if (!sb) return;
  var esperando = false;
  function mirar() {
    var y = window.scrollY || 0;
    var enForm = ped && ped.getBoundingClientRect().top < window.innerHeight * 0.92;
    var ver = y > 420 && !enForm;
    sb.classList.toggle('show', ver);
    document.body.classList.toggle('con-barra', ver);
    esperando = false;
  }
  window.addEventListener('scroll', function () {
    if (esperando) return; esperando = true; requestAnimationFrame(mirar);
  }, { passive: true });
  mirar();
})();

/* ====== Aviso al salir (exit-intent) — una sola vez por sesion ======

   Copiado del que ya corre en la pagina de pestañas, que es el que James
   aprobo. Salta en dos momentos: cuando el mouse se va por arriba de la
   ventana (el gesto de cerrar la pestaña) y cuando le dan al boton de atras.

   No aparece si el cliente ya hizo el pedido: en ese caso el bloque #pedir
   queda reemplazado por el mensaje "Pedido recibido", y eso es lo que se
   mira para no molestar a quien ya compro.                                */
(function () {
  var WA = 'https://wa.me/' + ((window.CONFIG && CONFIG.whatsapp) || '56964775539');
  var st = document.createElement('style');
  st.textContent =
    '.exit-ov{position:fixed;inset:0;background:rgba(6,9,18,.7);display:grid;place-items:center;z-index:99999;padding:18px;animation:exitfade .2s ease}'
    + '@keyframes exitfade{from{opacity:0}to{opacity:1}}'
    + '.exit-card{background:#fff;border-radius:22px;max-width:380px;width:100%;padding:30px 24px 26px;text-align:center;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.45)}'
    + '.exit-x{position:absolute;top:10px;right:15px;border:0;background:none;font-size:27px;cursor:pointer;color:#aaa;line-height:1}'
    + '.exit-card .em{font-size:46px;line-height:1}'
    + '.exit-card h3{font-size:22px;margin:8px 0 10px;color:#0c1526;font-weight:800}'
    + '.exit-card p{font-size:15px;color:#555;line-height:1.55;margin-bottom:18px}'
    + '.exit-card p b{color:#0c1526}'
    + '.exit-cta{width:100%;border:0;border-radius:14px;padding:15px 18px;font-size:16px;font-weight:800;cursor:pointer;background:#e1283c;color:#fff}'
    + '.exit-wa{display:block;margin-top:13px;color:#16a34a;font-weight:700;text-decoration:none;font-size:14px}';
  document.head.appendChild(st);

  var mostrado = false;
  function yaCompro() {
    var p = document.getElementById('pedir');
    return !!(p && p.querySelector('.listo'));
  }
  function mostrar() {
    if (mostrado || yaCompro()) return;
    try {
      if (sessionStorage.getItem('jaye_exit')) return;
      sessionStorage.setItem('jaye_exit', '1');
    } catch (e) { /* navegacion privada: se muestra igual, una vez */ }
    mostrado = true;
    var ov = document.createElement('div');
    ov.className = 'exit-ov';
    ov.innerHTML = '<div class="exit-card"><button class="exit-x" aria-label="Cerrar">&times;</button>'
      + '<div class="em">🎁</div><h3>¡Espera! No te vayas todavía</h3>'
      + '<p>Esta promoción con <b>envío gratis</b> es <b>solo por hoy</b>. '
      + 'No pagas nada ahora: <b>pagas al recibir</b> en tu casa.</p>'
      + '<button class="exit-cta">Quiero completar mi pedido</button>'
      + '<a class="exit-wa" href="' + WA + '" target="_blank" rel="noopener">o escríbenos por WhatsApp</a></div>';
    document.body.appendChild(ov);
    function cerrar() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    ov.querySelector('.exit-x').onclick = cerrar;
    ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
    ov.querySelector('.exit-cta').onclick = function () {
      cerrar();
      var p = document.getElementById('pedir');
      if (p) p.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  }

  document.addEventListener('mouseout', function (e) {
    if (e.clientY <= 0 && !e.relatedTarget) mostrar();
  });
  /* el boton de atras: se deja una entrada extra en el historial para poder
     atraparlo sin sacar al cliente de la pagina */
  try {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', function () {
      if (!mostrado) { mostrar(); history.pushState(null, '', location.href); }
    });
  } catch (e) {}
})();

/* ====== VENTANA POST-COMPRA: oferta del Gel Sellador ======
   Sale DESPUES de que el pedido entro, igual que la del Parche Adelgazante.
   El cliente ya compro: aqui solo se le ofrece agregarlo con un toque, sin
   volver a llenar nada. Va en el mismo envio, asi que no paga flete aparte. */
function abrirUpsell(nombre, telWA, upsell) {
  /* el upsell llega desde la ficha segun el producto; si no viene, se cae al
     del sellador para no romper nada que lo llamara con dos argumentos */
  var U = upsell || window.UPSELL_SELLADOR; if (!U) return;
  var money = function (n) { return '$' + Math.round(n).toLocaleString('es-CL'); };
  var fb = function (ev, obj) { try { if (window.fbq) window.fbq('track', ev, obj); } catch (e) {} };

  var st = document.createElement('style');
  st.textContent =
    '@keyframes upIn{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:none}}'
  + '@keyframes upFade{from{opacity:0}to{opacity:1}}'
  + '.upov{position:fixed;inset:0;background:rgba(4,10,24,.74);z-index:99999;display:flex;'
  + 'align-items:center;justify-content:center;padding:14px;overflow:auto;animation:upFade .18s ease}'
  + '.upcard{position:relative;background:#fff;border-radius:24px;max-width:360px;width:100%;'
  + 'padding:0 0 20px;text-align:center;color:#1b2432;overflow:hidden;'
  + 'box-shadow:0 30px 80px rgba(4,10,24,.55);animation:upIn .26s cubic-bezier(.2,.9,.3,1.15)}'
  + '.upcard .cab{background:linear-gradient(135deg,#0B1A3F,#1E4A8C);padding:16px 18px 14px}'
  /* el texto es largo: con radio de capsula y 3 lineas se veia mal. Radio
     mediano, letra un punto menor y menos espaciado para que entre en dos. */
  + '.upcard .tag{display:inline-block;background:#fff;color:#10265A;font-weight:800;'
  + 'border-radius:13px;padding:7px 14px;font-size:11px;letter-spacing:.3px;'
  + 'line-height:1.4;max-width:100%;text-wrap:balance}'
  + '.upcard h3{font-size:19px;margin:9px 0 0;font-weight:800;line-height:1.25;color:#fff}'
  /* La foto se limita en alto: a tamano completo empujaba la opcion de dos
     unidades debajo del pliegue en celular, y ahi esta el margen. Con
     'contain' la placa se ve entera, solo mas chica. */
  + '.upcard .foto{display:block;width:100%;height:auto;max-height:240px;'
  + 'object-fit:contain;background:#0a1020;margin:0}'
  + '.upcard .sub{font-size:13px;color:#68788e;margin:14px 22px 12px;line-height:1.5}'
  + '.upcard .precio{font-size:33px;font-weight:800;color:#10265A;letter-spacing:-.6px;margin:2px 0 0}'
  + '.upcard .precio small{font-size:12.5px;color:#68788e;font-weight:500;display:block;'
  + 'margin-top:5px;letter-spacing:0}'
  + '.upbtns{margin:16px 22px 0}'
  + '.upsi,.updos{width:100%;border:0;border-radius:15px;font-weight:800;cursor:pointer;'
  + 'transition:transform .14s ease,box-shadow .22s ease,filter .22s ease,border-color .22s ease}'
  + '.upsi{padding:16px;font-size:15px;background:linear-gradient(135deg,#12306E,#2563C7);'
  + 'color:#fff;box-shadow:0 10px 24px rgba(18,48,110,.38)}'
  + '.upsi:hover{filter:brightness(1.09);box-shadow:0 14px 30px rgba(18,48,110,.46)}'
  + '.upsi:active{transform:translateY(2px);box-shadow:0 5px 12px rgba(18,48,110,.34)}'
  + '.updos{margin-top:10px;padding:14px;font-size:13.5px;background:#fff;color:#12306E;'
  + 'border:2px solid #cfdcf2;display:flex;align-items:center;justify-content:center;gap:9px}'
  + '.updos:hover{border-color:#2563C7;background:#f6f9ff}'
  + '.updos:active{transform:translateY(2px)}'
  + '.updos .ah{background:#e8f7ee;color:#1c7a3e;font-size:11.5px;font-weight:800;'
  + 'border-radius:999px;padding:4px 9px}'
  /* El NO tiene que verse y poder tocarse. Estaba en gris #93a1b5 (contraste
     2.6 sobre blanco: casi invisible) y con 16px de alto, imposible de
     acertar con el dedo. Ahora llega a 4.9 de contraste y a 46px de alto,
     que es el minimo para tocar. Sigue siendo el boton secundario: no
     compite con el de comprar, pero el que no lo quiere puede salir. */
  + '.upno{width:100%;border:0;background:none;color:#5a6a80;margin-top:10px;'
  + 'font-size:14px;font-weight:600;padding:13px 8px;min-height:46px;cursor:pointer;'
  + 'border-radius:12px;text-decoration:underline;text-underline-offset:3px}'
  + '.upno:hover{color:#3d4a5c;background:#f3f5f8}'
  /* la X pasa de 29 a 42px: 29 no se acierta con el dedo */
  + '.upx{position:absolute;top:9px;right:10px;border:0;background:rgba(255,255,255,.24);color:#fff;'
  + 'width:44px;height:44px;min-width:44px;border-radius:50%;font-size:22px;line-height:1;cursor:pointer;z-index:2}'
  + '.upx:hover{background:rgba(255,255,255,.34)}'
  + '@media (prefers-reduced-motion:reduce){.upcard,.upov{animation:none}'
  + '.upsi,.updos{transition:none}}';
  document.head.appendChild(st);

  var uno = U.opciones[0].precio, dos = U.opciones[1].precio;
  var ov = document.createElement('div'); ov.className = 'upov';
  ov.innerHTML = '<div class="upcard">'
    + '<button class="upx" id="upX" aria-label="Cerrar">&times;</button>'
    + '<div class="cab">'
    +   '<span class="tag">TE GANASTE ESTA PROMOCI\u00d3N POR TU COMPRA</span>'
    +   '<h3>' + U.nombre + '</h3>'
    + '</div>'
    + (U.foto ? '<img class="foto" src="' + U.foto + '" alt="' + U.nombre + '" onerror="this.remove()">' : '')
    + '<p class="sub">Antes de despachar tu paquete, agr\u00e9galo con un toque. '
    +   'Va en el mismo env\u00edo, sin costo extra de despacho.</p>'
    + '<div class="precio">+' + money(uno)
    +   '<small>lo pagas al recibir, junto con tu pedido</small></div>'
    + '<div class="upbtns">'
    +   '<button class="upsi" id="upSi">S\u00cd, AGREGARLO A MI PEDIDO</button>'
    +   '<button class="updos" id="upDos">Mejor dos por ' + money(dos)
    +     '<span class="ah">ahorra ' + money(uno * 2 - dos) + '</span></button>'
    +   '<button class="upno" id="upNo">No gracias, solo mi pedido</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(ov);
  fb('ViewContent', { content_name: U.nombre, content_type: 'product', value: uno, currency: 'CLP' });

  function cerrar() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
  function agregar(cant, precio, boton) {
    boton.disabled = true; boton.textContent = 'Agregando\u2026';
    fetch(U.webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefono: telWA, cantidad: String(cant) }) })
      .catch(function () { /* si falla el aviso, el pedido base ya esta a salvo */ })
      .then(function () {
        fb('Purchase', { content_name: U.nombre, value: precio, currency: 'CLP' });
        ov.querySelector('.upcard').innerHTML =
          '<div class="cab"><h3>\u00a1Agregado a tu pedido!</h3></div>'
          + '<p class="sub">Tu ' + U.nombre + ' va en el mismo env\u00edo. '
          + 'Lo pagas al recibir, junto con lo dem\u00e1s.</p>'
          + '<div class="upbtns"><button class="upsi" id="upOk">Listo</button></div>';
        ov.querySelector('#upOk').addEventListener('click', cerrar);
      });
  }
  ov.querySelector('#upNo').addEventListener('click', cerrar);
  ov.querySelector('#upX').addEventListener('click', cerrar);
  ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
  ov.querySelector('#upSi').addEventListener('click', function () { agregar(1, uno, this); });
  ov.querySelector('#upDos').addEventListener('click', function () { agregar(2, dos, this); });
}

/* ====== CARRITO ABANDONADO ======
   Esto no existia en la ficha. El app.js viejo si lo tenia, y por eso el
   ultimo carrito guardado es del 29 de junio: justo cuando se migro a esta
   pagina. Desde entonces, toda la gente que dejo su telefono y se fue sin
   comprar se perdio. Hoy fueron 18 personas al formulario y cero guardadas.

   Se manda cuando el cliente ya escribio un telefono con 8 digitos o mas y
   una de dos: cambia de campo despues de escribirlo, o se va de la pagina.
   Se reenvia si completa mas datos, y el mismo sid actualiza la misma fila
   en vez de duplicarla.

   Si alcanza a comprar, no se manda nada: para eso esta la marca de compra. */
(function () {
  var URL = 'https://n8n-production-8a42.up.railway.app/webhook/abandonado';
  var SID = 'AB' + Date.now() + Math.floor(Math.random() * 1e6);
  var yaCompro = false, ultimo = '';
  function val(id) { var e = document.getElementById(id); return e ? String(e.value || '').trim() : ''; }
  function datos() {
    var tel = val('fTel').replace(/\D/g, '');
    var cor = val('fCorreo');
    /* sirve con el telefono O con el correo: hay gente que deja uno y no el
       otro, y si exigimos los dos se pierden igual que antes */
    var hayCorreo = cor.indexOf('@') > 0 && cor.indexOf('.') > cor.indexOf('@');
    if (tel.length < 8 && !hayCorreo) return null;
    var pack = (window.PACK_ELEGIDO || {});
    /* los nombres van completos: son los que lee el flujo Abandonado -> PG */
    return {
      sid: SID, telefono: tel, indicativo: val('fCod') || '+56',
      nombre: val('fNombre'), producto: (window.PRODUCTO_NOMBRE || document.title || ''),
      cantidad: String(pack.cant || ''), total: String(pack.precio || ''),
      direccion: val('fDir'), comuna: val('fComuna'), region: val('fRegion'),
      referencia: val('fRef'), correo: cor,
      fecha: new Date().toLocaleString('es-CL'), estado: 'INCOMPLETO',
    };
  }
  function mandar() {
    if (yaCompro) return;
    var d = datos(); if (!d) return;
    var firma = JSON.stringify(d).replace(/"fecha":"[^"]*"/, '');
    if (firma === ultimo) return;          /* nada nuevo que contar */
    ultimo = firma;
    try {
      var cuerpo = JSON.stringify(d);
      /* OJO, esto tenia el orden al reves y por eso no entraba UN SOLO carrito
         desde el 28-jul: sendBeacon con un Blob 'application/json' obliga al
         navegador a pedir permiso CORS antes, y sendBeacon no sabe hacer eso,
         asi que descarta el envio SIN avisar. Ni error en consola, ni
         ejecucion en n8n. Ahora manda fetch con keepalive, que tambien
         sobrevive al cierre de la pestana y si hace el permiso; sendBeacon
         queda de respaldo y con 'text/plain', que es de los que no lo piden. */
      fetch(URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                   body: cuerpo, keepalive: true })
        .catch(function () {
          try { if (navigator.sendBeacon) navigator.sendBeacon(URL, new Blob([cuerpo], { type: 'text/plain' })); } catch (e) {}
        });
    } catch (e) {}
  }
  ['fTel', 'fNombre', 'fDir', 'fComuna', 'fRegion', 'fRef', 'fCorreo'].forEach(function (id) {
    document.addEventListener('blur', function (e) {
      if (e.target && e.target.id === id) mandar();
    }, true);
  });

  /* EL TELEFONO SE CAPTURA APENAS LO ESCRIBE, sin esperar a que cambie de
     campo ni a que se vaya. Antes, si escribia el numero y se quedaba ahi
     pensando —o cerraba de golpe en un celular, donde el pagehide no siempre
     alcanza a salir—, no quedaba NADA y ese cliente se perdia entero.
     Se espera 1,2 s desde la ultima tecla para no mandar un envio por
     digito, y solo cuando ya hay 8 numeros o mas. */
  (function () {
    var tel = document.getElementById('fTel');
    if (!tel) return;
    var t;
    tel.addEventListener('input', function () {
      clearTimeout(t);
      if (tel.value.replace(/\D/g, '').length < 8) return;
      t = setTimeout(mandar, 1200);
    });
  })();
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') mandar();
  });
  window.addEventListener('pagehide', mandar);
  /* si compro, esto deja de mandarse */
  window.marcarCompra = function () { yaCompro = true; };
})();
