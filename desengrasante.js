/* ============================================================
   DESENGRASANTE EN ESPUMA · opción B (skill ui-ux-pro-max 03-10 "Desengrasante Impacto": Motion-Driven,
   negro + naranja de la lata, Bebas Neue / Source Sans 3). Corre DESPUÉS de ficha.js; si el producto no es
   el desengrasante, se va. No toca el encabezado (.top), el pie (.pie), los precios ni el formulario.

   Lo que hace (James 03-10):
     1. HÉROE: titular montado sobre la foto de las latas (OpenAI, lata real de referencia), halo que respira,
        rayos de estudio, destello sobre las latas y BURBUJAS DE ESPUMA en un canvas: nacen en la nube de
        espuma de la foto, suben tornasoladas y revientan. Al tocar el héroe sale un chorro de burbujas.
        La galería de la ficha se va; la cabecera (nombre, estrellas, precio) queda pegada debajo, como en el zapatero.
     2. "Cómo se usa": las 3 fotos con su título (PASO 1-2-3) dentro de esa sección.
     3. barra de avance + rótulos de capítulo (la página se lee como historia).
     4. RULETA de entrada: todas las casillas son cosas que el cliente igual recibe; siempre cae en "2 regalos"
        y muestra la foto de los dos (pasta para ollas + esponja). Una vez por visita.
     5. CIRCULITO "¡Ganaste tu regalo!": vuelve a mostrar la foto. En la página NO aparecen los regalos.
     6. al completar el pedido: "Tus regalos van con tu pedido", con su foto.
   ============================================================ */
(function () {
  function slug() { try { return window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; } }
  if (slug() !== 'desengrasante') return;
  document.body.classList.add('p-dg');

  var FOTO_HEROE = 'img/dg-heroe.webp?v=1';
  var FOTO_REGALOS = 'img/dg-regalos.webp?v=4';
  var NOMBRES = 'Pasta para ollas + esponja anti óxido';
  var guardar = function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} };
  var leer = function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  var menos = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. héroe ---------- */
  function heroe(prod) {
    if (prod.querySelector('.dg-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var h = document.createElement('section');
    h.className = 'dg-heroe';
    h.innerHTML =
      '<div class="dg-rayos" aria-hidden="true"></div><div class="dg-halo" aria-hidden="true"></div>'
      + '<span class="dg-kicker">Campana · Horno · Cocina</span>'
      + '<h1 class="dg-h1" aria-label="Adiós a la grasa pegada"><span aria-hidden="true"><i>Adiós a</i></span><span aria-hidden="true"><i>la grasa</i></span><span aria-hidden="true"><i>pegada</i></span></h1>'
      + '<p class="dg-sub">Rocías, esperas y pasas un paño. La espuma se queda pegada sobre la grasa.</p>'
      + '<div class="dg-latas"><img src="' + FOTO_HEROE + '" alt="Dos latas de desengrasante en espuma Limpiador Antigrasa Cocina de 400 ml, con espuma saliendo" width="1024" height="1536" fetchpriority="high">'
      +   '<div class="dg-nube" aria-hidden="true"></div><div class="dg-brillo" aria-hidden="true"></div></div>'
      + '<div class="dg-datos">'
      +   '<div class="dg-dato"><b>400 ML</b>por lata</div>'
      +   '<div class="dg-dato"><b>LIMÓN</b>aroma</div>'
      +   '<div class="dg-dato"><b>$24.500</b>por 2 latas</div>'
      + '</div>'
      + '<canvas class="dg-burbujas" aria-hidden="true"></canvas>';
    if (arriba) {
      arriba.parentNode.insertBefore(h, arriba);
      ['.gal', '.miniz'].forEach(function (s) { var el = arriba.querySelector(s); if (el) el.remove(); });
    } else prod.insertBefore(h, prod.firstChild);
    if (!menos) { burbujas(h); profundidad(h); }
  }

  /* BURBUJAS DE ESPUMA: canvas encima del héroe. Nacen dentro de la nube de espuma de la foto, suben
     meciéndose con un borde tornasol, y revientan en un anillo con gotitas. Tocar el héroe lanza un chorro
     y revienta la burbuja tocada. Se detiene si el héroe no se ve o la pestaña está de fondo. */
  function burbujas(h) {
    var cv = h.querySelector('.dg-burbujas'), ctx = cv.getContext && cv.getContext('2d');
    if (!ctx) return;
    var img = h.querySelector('.dg-latas img');
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, lista = [], pops = [], visible = true, t0 = 0;
    function medir() { W = h.clientWidth; H = h.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    /* la nube de espuma en la foto: x 33-56 %, y 12-44 % de la imagen */
    function nube() {
      var r = img.getBoundingClientRect(), b = h.getBoundingClientRect();
      return { x: r.left - b.left + r.width * (.33 + Math.random() * .23), y: r.top - b.top + r.height * (.14 + Math.random() * .3) };
    }
    function nueva(x, y, vx, vy, r) {
      lista.push({ x: x, y: y, vx: vx || (Math.random() - .5) * .3, vy: vy || -(.35 + Math.random() * .9), r: r || 3 + Math.pow(Math.random(), 2) * 16,
        fase: Math.random() * 6.28, tono: Math.random() * 360, vida: 0, max: 160 + Math.random() * 260 });
    }
    function reventar(b) {
      pops.push({ x: b.x, y: b.y, r: b.r, f: 0 });
      b.vida = 1e9;
    }
    function dibujar(b) {
      var g = ctx.createRadialGradient(b.x - b.r * .3, b.y - b.r * .3, b.r * .1, b.x, b.y, b.r);
      g.addColorStop(0, 'rgba(255,255,255,0.02)'); g.addColorStop(.75, 'rgba(255,255,255,0.06)'); g.addColorStop(1, 'rgba(255,255,255,0.22)');
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
      var l = ctx.createLinearGradient(b.x - b.r, b.y - b.r, b.x + b.r, b.y + b.r);
      l.addColorStop(0, 'hsla(' + b.tono + ',95%,72%,.75)'); l.addColorStop(.5, 'hsla(' + (b.tono + 120) + ',95%,72%,.6)'); l.addColorStop(1, 'hsla(' + (b.tono + 240) + ',95%,72%,.75)');
      ctx.lineWidth = Math.max(1, b.r * .08); ctx.strokeStyle = l; ctx.stroke();
      ctx.beginPath(); ctx.arc(b.x - b.r * .35, b.y - b.r * .35, b.r * .28, 3.4, 4.9); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = Math.max(1, b.r * .1); ctx.stroke();
    }
    function cuadro(t) {
      if (!visible) { t0 = 0; return; }
      requestAnimationFrame(cuadro);
      if (t - t0 < 16) return; t0 = t;
      ctx.clearRect(0, 0, W, H);
      if (lista.length < 34 && Math.random() < .22) { var p = nube(); nueva(p.x, p.y); }
      for (var i = lista.length - 1; i >= 0; i--) {
        var b = lista[i];
        b.vida++; b.fase += .05; b.tono = (b.tono + .6) % 360;
        b.x += b.vx + Math.sin(b.fase) * .35; b.y += b.vy; b.vy *= .999;
        if (b.vida > b.max || b.y < -b.r * 2) { if (b.vida <= b.max + 1e8 && b.y > 0 && b.vida < 1e9) reventar(b); lista.splice(i, 1); continue; }
        dibujar(b);
      }
      for (var j = pops.length - 1; j >= 0; j--) {
        var q = pops[j]; q.f++;
        var k = q.f / 12, a = 1 - k;
        ctx.beginPath(); ctx.arc(q.x, q.y, q.r * (1 + k * .9), 0, 6.2832); ctx.strokeStyle = 'rgba(255,255,255,' + (a * .7) + ')'; ctx.lineWidth = 1.2; ctx.stroke();
        for (var d = 0; d < 6; d++) {
          var an = d * 1.047 + q.r; ctx.beginPath();
          ctx.arc(q.x + Math.cos(an) * q.r * (1 + k * 1.8), q.y + Math.sin(an) * q.r * (1 + k * 1.8), 1.4, 0, 6.2832);
          ctx.fillStyle = 'rgba(255,255,255,' + a + ')'; ctx.fill();
        }
        if (q.f >= 12) pops.splice(j, 1);
      }
    }
    function arrancar() { if (!t0) requestAnimationFrame(cuadro); }
    medir(); addEventListener('resize', medir);
    for (var n = 0; n < 14; n++) { var p0 = nube(); nueva(p0.x, p0.y - Math.random() * 120); }
    /* tocar: revienta la burbuja tocada y lanza un chorro desde ahí */
    h.addEventListener('pointerdown', function (e) {
      var b = h.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
      lista.forEach(function (u) { if (Math.hypot(u.x - x, u.y - y) < u.r + 8) reventar(u); });
      for (var i = 0; i < 14; i++) { var an = Math.random() * 6.28, v = .6 + Math.random() * 1.8; nueva(x, y, Math.cos(an) * v, Math.sin(an) * v - 1, 3 + Math.random() * 12); }
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting && !document.hidden; if (visible) arrancar(); }).observe(h);
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; if (visible) arrancar(); });
    arrancar();
  }

  /* profundidad: las latas se mueven un poco con el dedo/mouse y al bajar (parallax en capas, Motion-Driven) */
  function profundidad(h) {
    var latas = h.querySelector('.dg-latas'), halo = h.querySelector('.dg-halo'), mx = 0, my = 0, pend = false;
    function pintar() {
      pend = false;
      var s = Math.min(scrollY, 800);
      latas.style.transform = 'translate(' + (mx * 12).toFixed(1) + 'px,' + (my * 8 + s * .08).toFixed(1) + 'px)';
      halo.style.marginTop = (s * .15).toFixed(1) + 'px';
    }
    function pedir() { if (!pend) { pend = true; requestAnimationFrame(pintar); } }
    addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; pedir(); }, { passive: true });
    addEventListener('scroll', pedir, { passive: true });
  }

  /* ---------- 2. "Cómo se usa": las 3 fotos dentro de su sección ---------- */
  function pasos(prod) {
    var sec = prod.querySelector('.form-sec');
    if (!sec || sec.querySelector('.dg-pasos')) return;
    var d = document.createElement('div'); d.className = 'dg-pasos';
    d.innerHTML = [
      ['img/dg-campana.webp?v=4', 'Paso 1: rocía la espuma sobre la grasa de la campana'],
      ['img/dg-horno.webp?v=4', 'Paso 2: deja actuar unos minutos para que afloje la grasa'],
      ['img/dg-cocina.webp?v=4', 'Paso 3: pasa un paño y la grasa aflojada sale'],
    ].map(function (f) { return '<figure><img src="' + f[0] + '" alt="' + f[1] + '" loading="lazy" width="1024" height="1024"></figure>'; }).join('');
    var ref = sec.querySelector('.sub2') || sec.querySelector('.tit2');
    ref.parentNode.insertBefore(d, ref.nextSibling);
  }

  /* James 03-10: debajo del precio de arriba se dice POR CUÁNTO es ("$24.500 por 2 latas"), porque la gente no
     lo identificaba. Sigue al precio: si el cliente elige el combo de 4 o 6 en el formulario, el texto cambia solo. */
  var POR = { 24500: 2, 34500: 4, 44500: 6 };
  function porCuanto(prod) {
    var top = prod.querySelector('.precioTop'), ahora = document.getElementById('pcAhora');
    if (!top || !ahora || document.getElementById('dgPor')) return;
    var el = document.createElement('p'); el.className = 'dg-por'; el.id = 'dgPor';
    top.insertAdjacentElement('afterend', el);
    function pintar() {
      var n = POR[parseInt(ahora.textContent.replace(/\D/g, ''), 10)] || 2;
      el.innerHTML = 'por <b>' + n + ' latas</b> de 400 ml';   /* sin regalos: arriba no se anuncian (James) */
    }
    pintar();
    if ('MutationObserver' in window) new MutationObserver(pintar).observe(ahora, { childList: true, characterData: true, subtree: true });
    /* la caja de promoción usa el nombre del pack ("Combo 4 espumas antigrasa + 4 regalos"): arriba va sin los regalos */
    var qt = prod.querySelector('.promo-sec .promo-qt');
    if (qt) { var i = qt.textContent.indexOf(' + '); if (i > 0) qt.textContent = qt.textContent.slice(0, i); }
  }

  /* el VIDEO real (TikTok, nuestra misma lata) con su título arriba, como en el zapatero */
  function video(prod) {
    var v = prod.querySelector('.vid-wrap');
    if (!v || v.querySelector('.dg-vtit')) return;
    v.insertAdjacentHTML('afterbegin', '<div class="dg-vtit"><p class="dg-cap"><b>En video</b>&nbsp;· la lata real</p><h2>Mira cómo afloja la grasa</h2></div>');
  }

  /* dos fotos del producto en uso, JUSTO ARRIBA de las reseñas (James 03-10). Las reseñas siguen sin foto.
     Rótulo neutro "Así se usa en casa": son fotos de uso hechas con IA, NO se presentan como clientes. */
  function enCasa(prod) {
    var rev = prod.querySelector('.rev-sec');
    if (!rev || prod.querySelector('.dg-casa')) return;
    var s = document.createElement('section'); s.className = 'bloque dg-casa';
    s.innerHTML = '<p class="dg-cap"><b>En casa</b>&nbsp;· campana, horno y azulejos</p><h2>Así se usa en casa</h2>'
      + '<div class="dg-casa-g">'
      + '<img src="img/dg-casa1.webp?v=1" alt="Hombre limpiando la puerta del horno con un paño y la lata de espuma antigrasa en la mano" loading="lazy" width="1024" height="1024">'
      + '<img src="img/dg-casa2.webp?v=1" alt="Mujer limpiando los azulejos de la cocina con un paño y la lata de espuma antigrasa" loading="lazy" width="1024" height="1024">'
      + '</div>';
    rev.parentNode.insertBefore(s, rev);
  }

  /* ---------- 3. barra de avance y capítulos ---------- */
  var av = document.createElement('div'); av.className = 'dg-avance'; document.body.appendChild(av);
  var tic = false;
  function avance() {
    tic = false;
    var h = document.documentElement.scrollHeight - innerHeight;
    av.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0) + ')';
  }
  addEventListener('scroll', function () { if (!tic) { tic = true; requestAnimationFrame(avance); } }, { passive: true });

  function capitulos(prod) {
    var marcas = [
      ['section.desc', 'Capítulo 1', 'la grasa pegada', true],
      ['.form-sec', 'Capítulo 2', 'cómo se usa', true],
      ['.ba-sec', 'Capítulo 3', 'el resultado', false],
      ['.promo-sec', 'Tu combo', 'la promoción', false],
    ];
    marcas.forEach(function (m) {
      var el = prod.querySelector(m[0]); if (!el) return;
      var viejo = el.querySelector('.dg-cap'); if (viejo) viejo.remove();
      var eb = el.querySelector(':scope > .eyebrow'); if (eb) eb.remove();   /* el rótulo genérico de la ficha sobra */
      var c = document.createElement('p'); c.className = 'dg-cap'; c.innerHTML = '<b>' + m[1] + '</b>&nbsp;· ' + m[2];
      el.insertBefore(c, el.firstChild);
      if (m[3] && !el.querySelector('.dg-mini')) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'dg-mini'; b.textContent = 'Ver los combos';
        b.addEventListener('click', irAlPedido); el.appendChild(b);
      }
    });
    if (menos || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('dg-on'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    prod.querySelectorAll(':scope > section, :scope > .bloque').forEach(function (s) {
      if (s.classList.contains('dg-heroe')) return;
      var r = s.getBoundingClientRect(); if (r.top < innerHeight) return;   /* lo que ya se ve, no se mueve */
      s.classList.add('dg-entra'); io.observe(s);
    });
  }

  /* ---------- 4. ruleta ---------- */
  var CASILLAS = ['Pasta para ollas', '2 regalos', 'Envío gratis', 'Esponja anti óxido', 'Pago al recibir', '2 regalos'];
  var COLORES = ['#18181B', '#F26A1B', '#27272A', '#18181B', '#27272A', '#F26A1B'];
  function ruedaSVG() {
    var n = CASILLAS.length, R = 130, out = '';
    for (var i = 0; i < n; i++) {
      var a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
      var x0 = R + R * Math.cos(a0), y0 = R + R * Math.sin(a0), x1 = R + R * Math.cos(a1), y1 = R + R * Math.sin(a1);
      out += '<path d="M' + R + ',' + R + ' L' + x0.toFixed(1) + ',' + y0.toFixed(1) + ' A' + R + ',' + R + ' 0 0,1 ' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' Z" fill="' + COLORES[i] + '" stroke="#3F3F46" stroke-width="2"/>';
      /* texto DERECHO (sin rotar) en el centro de cada casilla, para que se lea antes y después de girar */
      var am = (a0 + a1) / 2, tx = R + R * .6 * Math.cos(am), ty = R + R * .6 * Math.sin(am);
      var colorTxt = COLORES[i] === '#F26A1B' ? '#000000' : '#FAFAFA';
      var pal = CASILLAS[i].split(' '), l1 = pal.slice(0, Math.ceil(pal.length / 2)).join(' '), l2 = pal.slice(Math.ceil(pal.length / 2)).join(' ');
      out += '<text x="' + tx.toFixed(1) + '" y="' + (ty - (l2 ? 5 : -5)).toFixed(1) + '" fill="' + colorTxt + '" font-family="Bebas Neue,Impact,sans-serif" font-size="17" letter-spacing=".5" text-anchor="middle">'
        + '<tspan x="' + tx.toFixed(1) + '">' + l1.toUpperCase() + '</tspan>' + (l2 ? '<tspan x="' + tx.toFixed(1) + '" dy="16">' + l2.toUpperCase() + '</tspan>' : '') + '</text>';
    }
    out += '<circle cx="' + R + '" cy="' + R + '" r="22" fill="#000000" stroke="#3F3F46" stroke-width="2"/><circle cx="' + R + '" cy="' + R + '" r="8" fill="#F26A1B"/>';
    return '<svg class="dg-rueda" viewBox="0 0 260 260" role="img" aria-label="Ruleta de regalos">' + out + '</svg>';
  }
  /* James 03-10: la ruleta gira tocando EN CUALQUIER PARTE (no solo el botón). El premio NO lleva botón:
     solo la foto de los regalos con burbujas de festejo; al tocar donde sea se cierra y el cliente queda
     arriba, en el héroe, para ver la página entera (no se le manda directo a comprar). */
  var caja = null, girando = false, burbujeo = null;
  function abrir(modo) {
    if (!caja) {
      caja = document.createElement('div'); caja.className = 'dg-ruleta'; caja.setAttribute('role', 'dialog'); caja.setAttribute('aria-modal', 'true');
      document.body.appendChild(caja);
      caja.addEventListener('click', function (e) {
        if (e.target.closest('.dg-cerrar')) { cerrar(); return; }
        if (caja.dataset.modo === 'ruleta') girar(); else cerrar();
      });
      addEventListener('keydown', function (e) { if (e.key === 'Escape' && !caja.hidden) cerrar(); });
    }
    caja.dataset.modo = modo;
    caja.hidden = false;
    caja.innerHTML = modo === 'gano' ? htmlGano() :
      '<div class="dg-rbox"><button class="dg-cerrar" aria-label="Cerrar">×</button>'
      + '<h3>Gira y descubre tus regalos</h3><p>Todas las casillas ganan: van gratis con tu combo.</p>'
      + '<div class="dg-rueda-wrap"><span class="dg-flecha" aria-hidden="true"></span>' + ruedaSVG() + '</div>'
      + '<button class="dg-girar" type="button">Toca para girar</button></div>';
    if (modo === 'gano') festejar(); else pararFestejo();
    /* James 03-10: el regalo no puede trabar la entrada. Se va solo a los 5 segundos (o antes si toca) */
    clearTimeout(autoCierre);
    if (modo === 'gano') autoCierre = setTimeout(function () { if (!caja.hidden && caja.dataset.modo === 'gano') cerrar(); }, 5000);
  }
  var autoCierre = null;
  function htmlGano() {
    return '<div class="dg-rbox dg-gano"><button class="dg-cerrar" aria-label="Cerrar">×</button>'
      + '<h3>¡Ganaste 2 regalos!</h3>'
      + '<img src="' + FOTO_REGALOS + '" alt="Tus regalos: pasta para ollas y esponja anti óxido" width="580" height="580">'
      + '<p class="dg-nombres">' + NOMBRES + '</p>'
      + '<p class="dg-nota">Van gratis con tu pedido al completar tu compra. En los combos de 4 y 6 espumas, los regalos se duplican y triplican.</p>'
      + '<p class="dg-toca">Toca en cualquier parte para seguir</p></div>';
  }
  /* burbujas de premio mientras se ve el regalo: una ráfaga grande al abrir y después tandas chicas */
  function festejar() {
    pararFestejo(); festejo(26);
    if (!menos) burbujeo = setInterval(function () { festejo(7); }, 900);
  }
  function pararFestejo() { if (burbujeo) { clearInterval(burbujeo); burbujeo = null; } }
  /* burbujas que salen volando del centro cuando gana */
  function festejo(cuantas) {
    if (menos) return;
    for (var i = 0; i < (cuantas || 26); i++) {
      var s = document.createElement('span'), an = Math.random() * 6.28, d = 120 + Math.random() * 200, t = 8 + Math.random() * 16;
      s.className = 'dg-pop';
      s.style.cssText = 'left:50%;top:45%;width:' + t + 'px;height:' + t + 'px;--x:' + (Math.cos(an) * d).toFixed(0) + 'px;--y:' + (Math.sin(an) * d).toFixed(0) + 'px;animation-delay:' + (Math.random() * .2).toFixed(2) + 's';
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }, 1700, s);
    }
  }
  function girar() {
    var b = caja.querySelector('.dg-girar'), r = caja.querySelector('.dg-rueda'); if (!b || !r || girando) return;
    girando = true; b.disabled = true; b.textContent = 'Girando…';
    /* cae en la casilla "2 regalos" (índice 1): su centro está a 90° del arriba; vueltas extra para la emoción */
    var paso = 360 / CASILLAS.length, centro = paso * 1 + paso / 2, final = 360 * 6 + (360 - centro);
    if (menos) { r.style.transition = 'none'; }
    requestAnimationFrame(function () { r.style.transform = 'rotate(' + final + 'deg)'; });
    setTimeout(function () { girando = false; guardar('dg_gano', '1'); primera = true; abrir('gano'); badge(); }, menos ? 300 : 4400);
  }
  var primera = false;
  function cerrar() {
    pararFestejo(); clearTimeout(autoCierre);
    if (caja) caja.hidden = true;
    badge();
    /* la primera vez que reclama el regalo, queda arriba en el héroe para ver toda la página */
    if (primera) { primera = false; scrollTo({ top: 0, behavior: menos ? 'auto' : 'smooth' }); }
  }
  function irAlPedido() {
    var d = document.querySelector('.promo-sec') || document.getElementById('pedir');
    if (d) d.scrollIntoView({ behavior: menos ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- 5. circulito flotante ---------- */
  var bd = null;
  function badge() {
    if (!leer('dg_gano')) return;
    if (!bd) {
      bd = document.createElement('button'); bd.className = 'dg-badge'; bd.type = 'button'; bd.setAttribute('aria-label', 'Ver tus regalos');
      bd.innerHTML = '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>¡Ganaste tu regalo!</span>';
      bd.addEventListener('click', function () { abrir('gano'); });
      document.body.appendChild(bd);
    }
    bd.hidden = false;
  }

  /* ---------- 6. aviso al completar el pedido ---------- */
  function vigilarPedido() {
    var pd = document.getElementById('pedir'); if (!pd || !('MutationObserver' in window)) return;
    new MutationObserver(function () {
      var ok = pd.querySelector('.listo'); if (!ok || ok.querySelector('.dg-regalo-ok')) return;
      var d = document.createElement('div'); d.className = 'dg-regalo-ok';
      d.innerHTML = '<img src="' + FOTO_REGALOS + '" alt="Tus regalos" width="144" height="144"><div><b>¡Tus regalos van con tu pedido!</b><span>' + NOMBRES + ', gratis.</span></div>';
      ok.appendChild(d); if (bd) bd.hidden = true;
    }).observe(pd, { childList: true, subtree: true });
  }

  function arrancar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;   /* ficha.js todavía no pinta */
    heroe(prod); porCuanto(prod); pasos(prod); video(prod); enCasa(prod); capitulos(prod); avance(); vigilarPedido();
    /* ?sinruleta=1 solo para las capturas de revisión */
    if (/[?&]sinruleta=1/.test(location.search)) return true;
    if (leer('dg_gano')) badge();
    else setTimeout(function () { if (!leer('dg_gano')) abrir('ruleta'); }, 1400);
    return true;
  }
  function intentar() {
    if (arrancar()) return;
    var n = 0, reloj = setInterval(function () { n++; if (arrancar() || n > 60) clearInterval(reloj); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
