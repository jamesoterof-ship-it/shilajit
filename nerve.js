/* ============================================================
   NEURAZENX NERVE SUPPORT · POR PÁGINA · 28-10 (3er rediseño). James: "yo quiero unos diseños diferentes" y "si" al diseño
   que la skill eligió de su catálogo. Plano del script ui-ux-pro-max (opción #73 del candado, design-system/.../neurazenx-noche):
   estilo DARK MODE (OLED), colores "Night indigo + dream violet" (fondo #0F172A, índigo #4338CA / #6366F1, botón #7C3AED), Inter.
   Patrón: Héroe > Problema > Solución > Opiniones > Botón.
   Este archivo arma el HÉROE: el PRODUCTO SOLO de borde a borde (James 28-10), el titular que entra en cascada y el efecto
   del producto (destellos que arrancan agitados, el hormigueo, y se van calmando). Debajo, la franja
   de 3 cifras, los sellos de confianza, el bloque "El problema / La solución", el 2º video y los rótulos del antes y después.
   Corre DESPUÉS de ficha.js y solo en ?p=nerve. No toca el encabezado, el pie, los precios ni el formulario.
   🔴 Suplemento alimentario: nada de "cura", "trata" ni "previene".
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'nerve') return;
  document.body.classList.add('p-nerve');

  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ic = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };

  /* parte el título en letras (cada palabra en su .nz-w para que nunca se corte a la mitad) */
  function letras(el) {
    var k = 0;
    function partir(nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (pal) {
            if (!pal) return;
            if (/^\s+$/.test(pal)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'nz-w';
            pal.split('').forEach(function (c) { var l = document.createElement('span'); l.className = 'nz-l'; l.style.setProperty('--k', k++); l.textContent = c; w.appendChild(l); });
            frag.appendChild(w);
          });
          nodo.replaceChild(frag, n);
        } else if (n.nodeType === 1) partir(n);
      });
    }
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    partir(el);
    return k;
  }

  function portada(prod) {
    if (prod.querySelector('.nz-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var s = document.createElement('section');
    s.className = 'nz-heroe';
    s.innerHTML =
        '<div class="nz-marco">'
      +   '<img class="nz-foto" src="img/nerve-heroe-noche.webp?v=2" alt="Frasco de NeuraZenx Nerve Support con cápsulas sobre piedra oscura, de noche" width="1024" height="1536" fetchpriority="high">'
      +   '<canvas class="nz-chispas" aria-hidden="true"></canvas>'
      +   '<div class="nz-sobre"><p class="nz-rot nz-sube" style="--d:.05s">' + ic('<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>') + 'NeuraZenx · Nerve Support</p>'
      +   '<h1 class="nz-h1">Cuando el hormigueo <em>no te deja dormir.</em></h1></div>'
      + '</div>'
      + '<ul class="nz-datos">'
      +   '<li class="nz-sube" style="--i:0"><b>600</b><span>ácido alfa lipoico</span></li>'
      +   '<li class="nz-sube" style="--i:1"><b>60</b><span>cápsulas por frasco</span></li>'
      +   '<li class="nz-sube" style="--i:2"><b>20 en 1</b><span>con Bioperine</span></li>'
      + '</ul>';
    if (arriba) {
      arriba.parentNode.insertBefore(s, arriba);
      ['.gal', '.miniz'].forEach(function (q) { var el = arriba.querySelector(q); if (el) el.remove(); });
    } else prod.insertBefore(s, prod.firstChild);

    var n = letras(s.querySelector('.nz-h1'));
    var fin = (0.25 + n * 0.035 + 0.4).toFixed(2) + 's';
    Array.prototype.forEach.call(s.querySelectorAll('.nz-datos .nz-sube'), function (el) { el.style.setProperty('--d', fin); });
    if (!calma) {
      s.classList.add('nz-anda');
      setTimeout(function () { s.classList.remove('nz-anda'); }, 6000);   // red de seguridad: a los 6 s todo queda visible
    }
    chispas(s.querySelector('.nz-chispas'), s.querySelector('.nz-marco'));
  }


  /* destellos celestes a los costados del frasco: arrancan rápidos y nerviosos (el hormigueo) y en ~5 s se calman a un brillo lento */
  function chispas(cv, marco) {
    if (!cv || !cv.getContext || calma) return;
    var cx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), P = [], t0 = performance.now();
    function medir() { W = marco.clientWidth; H = marco.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    /* nacen a los COSTADOS del frasco y en su base, nunca encima de la etiqueta (el frasco ocupa ~el 50 % central) */
    var img = marco.querySelector('.nz-foto');
    function nueva() {
      var top = img ? img.offsetTop : 0, ih = img ? img.offsetHeight : H, lado = Math.random() < 0.5 ? -1 : 1, x, y;
      if (Math.random() < 0.75) { x = W * (0.5 + lado * (0.29 + Math.random() * 0.17)); y = top + ih * (0.36 + Math.random() * 0.5); }
      else { x = W * (0.2 + Math.random() * 0.6); y = top + ih * (0.84 + Math.random() * 0.06); }
      return { x: x, y: y, vx: 0, vy: 0, vida: 0, max: 40 + Math.random() * 60, tam: 0.8 + Math.random() * 1.6 };
    }
    medir(); window.addEventListener('resize', medir);
    for (var i = 0; i < 60; i++) { var q = nueva(); q.vida = Math.random() * q.max; P.push(q); }
    (function paso(t) {
      if (!cv.isConnected) return;
      var s = (t - t0) / 1000, nervio = Math.max(0.12, 1 - s / 5);   // 1 = hormigueo, baja hasta 0,12 = calma
      cx.clearRect(0, 0, W, H);
      P.forEach(function (q, i) {
        q.vx += (Math.random() - 0.5) * 2.4 * nervio; q.vy += (Math.random() - 0.5) * 2.4 * nervio - 0.02;
        q.vx *= 0.86; q.vy *= 0.86; q.x += q.vx; q.y += q.vy; q.vida++;
        var al = Math.sin(Math.PI * q.vida / q.max) * (0.35 + 0.65 * nervio);
        if (nervio > 0.5 && Math.random() < 0.08 * nervio) {   // pequeños chispazos mientras hay hormigueo
          cx.strokeStyle = 'rgba(124,58,237,' + (al * 0.8).toFixed(3) + ')'; cx.lineWidth = 1;
          cx.beginPath(); cx.moveTo(q.x, q.y); cx.lineTo(q.x + (Math.random() - 0.5) * 18, q.y + (Math.random() - 0.5) * 18); cx.stroke();
        }
        var g = cx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.tam * 5);
        g.addColorStop(0, 'rgba(255,255,255,' + (al * 0.95).toFixed(3) + ')'); g.addColorStop(0.35, 'rgba(99,102,241,' + al.toFixed(3) + ')'); g.addColorStop(1, 'rgba(99,102,241,0)');
        cx.fillStyle = g; cx.beginPath(); cx.arc(q.x, q.y, q.tam * 5, 0, Math.PI * 2); cx.fill();
        if (q.vida >= q.max) P[i] = nueva();
      });
      requestAnimationFrame(paso);
    })(t0);
  }

  function irAlFormulario() { var f = document.getElementById('pedir') || document.querySelector('section.form'); if (f) f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' }); }
  function antesDe(prod, sel, s) { var ref = prod.querySelector(sel); if (ref) ref.parentNode.insertBefore(s, ref); else prod.appendChild(s); }

  /* ---------- 2 · PRUEBA (patrón del script: sellos y cifras de confianza) ---------- */
  function prueba(prod) {
    if (prod.querySelector('.nz-b0')) return;
    var S = [
      [ic('<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>'), 'Frasco sellado', 'Llega con sello de seguridad de fábrica.'],
      [ic('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>'), 'Pagas al recibir', 'O con tarjeta y ahorras 10 %.'],
      [ic('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>'), 'Envío gratis', 'A todo Chile, en 2 a 4 días hábiles.'],
      [ic('<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v4h4"/>'), '30 días de garantía', 'Si no quedas conforme, lo devuelves.'],
    ];
    var s = document.createElement('section'); s.className = 'nz-bloque nz-b0';
    s.setAttribute('aria-label', 'Por qué comprar con confianza');
    s.innerHTML = '<ul class="nz-sellos">' + S.map(function (x) { return '<li class="nz-entra">' + x[0] + '<b>' + x[1] + '</b><span>' + x[2] + '</span></li>'; }).join('') + '</ul>';
    antesDe(prod, '.desc', s);
  }

  /* ---------- 3 · EL PROBLEMA / LA SOLUCIÓN ---------- */
  function solucion(prod) {
    if (prod.querySelector('.nz-b1')) return;
    var s = document.createElement('section'); s.className = 'nz-bloque nz-b1';
    s.innerHTML = '<p class="nz-num">¿Te pasa?</p><h2>Pies que hormiguean, manos que arden y <em>noches cortas.</em></h2>'
      + '<figure class="nz-foto2 nz-entra"><img src="img/nerve-problema.webp?v=1" alt="Señor sentado en la cama de noche sobándose el pie, sin poder dormir" width="900" height="900" loading="lazy"></figure>'
      + '<ul class="nz-lista">'
      +   '<li class="nz-entra">' + ic('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>') + '<span><b>De noche:</b> el hormigueo en los pies aparece justo cuando te acuestas.</span></li>'
      +   '<li class="nz-entra">' + ic('<path d="M13 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path d="M7 21l3-7 3 3v5M10 14l1-5 4 3 3 1"/>') + '<span><b>Al caminar:</b> ardor o pies dormidos después de estar de pie todo el día.</span></li>'
      +   '<li class="nz-entra">' + ic('<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2-4a1.5 1.5 0 0 1 2.6-1.5L8 15"/>') + '<span><b>En las manos:</b> dedos adormecidos al escribir, cocinar o tomar el celular.</span></li>'
      + '</ul>'
      + '<div class="nz-sol nz-entra"><p class="nz-num nz-num--v">La ayuda diaria</p>'
      +   '<figure class="nz-foto2"><img src="img/nerve-solucion.webp?v=1" alt="Señora en su cocina con un vaso de agua y el frasco de NeuraZenx en la mano" width="900" height="900" loading="lazy"></figure>'
      +   '<p>NeuraZenx es un suplemento con <b>ácido alfa lipoico 600</b> en una fórmula 20 en 1 con Bioperine, para apoyar el bienestar de tus nervios <b>todos los días</b>.</p>'
      +   '<button type="button" class="nz-boton">Lo quiero, pago al recibir' + ic('<path d="M5 12h14M13 5l7 7-7 7"/>') + '</button></div>';
    antesDe(prod, '.desc', s);
    s.querySelector('.nz-boton').addEventListener('click', irAlFormulario);
  }

  /* James 28-10: en la PÁGINA va UN solo video (el de la ficha); los 2 videos son para la CAMPAÑA. El segundo clip limpio
     (img/nerve-video2.mp4) queda guardado para los anuncios. */

  /* ---------- 4 · ANTES Y DESPUÉS: los rótulos van en la página (James 28-10: nada de letras dentro de las imágenes) ---------- */
  function cambio(prod) {
    var caja = prod.querySelector('.ba-sec .ba-img');
    if (!caja || caja.querySelector('.nz-ba-rot')) return;
    caja.classList.add('nz-ba');
    caja.insertAdjacentHTML('beforeend', '<span class="nz-ba-rot nz-ba-rot--a">Antes</span><span class="nz-ba-rot nz-ba-rot--d">Después</span>');
    caja.insertAdjacentHTML('afterend',
        '<div class="nz-ba-lista"><ul class="nz-ba-col nz-ba-col--a"><li>' + ic('<path d="M18 6L6 18M6 6l12 12"/>') + 'Despierta de noche por el hormigueo</li><li>' + ic('<path d="M18 6L6 18M6 6l12 12"/>') + 'Se soba los pies para poder dormir</li></ul>'
      + '<ul class="nz-ba-col nz-ba-col--d"><li>' + ic('<path d="M20 6L9 17l-5-5"/>') + 'Su frasco junto a la cama, todos los días</li><li>' + ic('<path d="M20 6L9 17l-5-5"/>') + 'Una rutina simple para cuidar sus nervios</li></ul></div>'
      + '<p class="nz-ba-nota">Imagen ilustrativa. Es un suplemento alimentario: cada persona lo vive distinto.</p>');
  }

  /* entrada al aparecer en pantalla; a los 4 s se muestra todo aunque el navegador no avise */
  function mover(prod) {
    var els = prod.querySelectorAll('.nz-entra');
    if (calma || !('IntersectionObserver' in window)) return;
    document.body.classList.add('nz-js');
    var obs = new IntersectionObserver(function (l) { l.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add('nz-visto'); obs.unobserve(it.target); } }); }, { rootMargin: '0px 0px -10% 0px' });
    Array.prototype.forEach.call(els, function (e, i) { e.style.transitionDelay = (i % 4) * 60 + 'ms'; obs.observe(e); });
    setTimeout(function () { Array.prototype.forEach.call(els, function (e) { e.classList.add('nz-visto'); }); }, 4000);
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;
    portada(prod); prueba(prod); solucion(prod); cambio(prod); mover(prod);
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
