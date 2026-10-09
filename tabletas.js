/* ============================================================
   TABLETAS LIMPIA LAVADORA · skill ui-ux-pro-max 09-10 (aprobada por James): azul profundo #0369A1, celeste agua #38BDF8,
   CTA verde #16A34A, Lora + Raleway. Corre DESPUÉS de ficha.js y solo en ?p=tabletas. No toca el encabezado, el pie,
   los precios ni el formulario.
     1. Héroe: "Tu lavadora se ve limpia… hasta que ves lo que sale", la foto de la tableta en la mano con burbujas que suben
        y tres datos cortos. La galería de la ficha se va (la foto ya está arriba y el video tiene su propia sección).
     2. Debajo del precio: cuántas tabletas y cajas trae el pack elegido (sigue al pack).
     3. "Cómo se usa": los 3 pasos con su foto (tableta al tambor · ciclo largo · ropa fresca).
     4. El video real con su título. Las secciones entran suave al llegar.
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'tabletas') return;
  document.body.classList.add('p-tab');

  var PACK = { 19500: [48, 4], 24500: [72, 6], 29500: [120, 10] };
  var PASOS = [
    ['img/tab-uso1.webp?v=1', 'Una tableta al tambor', 'Con la lavadora vacía, sin ropa, la echas directo al tambor.', 'Mano echando una tableta azul y blanca al tambor vacío de la lavadora'],
    ['img/tab-uso2.webp?v=1', 'Un ciclo largo', 'Agua caliente o el ciclo de limpieza de tambor. La tableta burbujea y suelta la mugre.', 'Dedo apretando el botón de inicio de la lavadora con agua y espuma celeste en el tambor'],
    ['img/tab-uso3.webp?v=1', 'Lavadora limpia, ropa fresca', 'Se van el sarro, los restos de detergente y el mal olor.', 'Mujer sacando toallas blancas limpias de la lavadora y oliéndolas'],
  ];
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function heroe(prod) {
    if (prod.querySelector('.tab-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var s = document.createElement('section');
    s.className = 'tab-heroe';
    /* 09-10 James: la portada lleva las letras DENTRO de la imagen (opción B, hecha por la IA, sin precio impreso).
       El h1 queda para Google y lectores de pantalla, sin verse. */
    s.innerHTML =
        '<h1 class="tab-oculto">Tu lavadora se ve limpia… hasta que ves lo que sale. Tabletas limpia lavadora</h1>'
      + '<img class="tab-portada" src="img/tab-portada.webp?v=1" alt="Mano sosteniendo una tableta limpia lavadora frente a una lavadora abierta, con burbujas: tu lavadora se ve limpia hasta que ves lo que sale, 1 tableta al mes, carga superior y frontal" width="1024" height="1536" fetchpriority="high">';
    if (arriba) {
      arriba.parentNode.insertBefore(s, arriba);
      ['.gal', '.miniz'].forEach(function (q) { var el = arriba.querySelector(q); if (el) el.remove(); });
    } else prod.insertBefore(s, prod.firstChild);
  }

  /* 09-10 James: "muy pocas imágenes". Tres imágenes con sus letras (IA, sin precio), cada una en su sección. */
  function imagenes(prod) {
    if (prod.querySelector('.tab-img')) return;
    var IMG = [
      ['section.tab-desc', 'img/tab-esconde.webp?v=1', 'Sello de goma de la lavadora con moho, sarro, restos de detergente y mal olor: lo que se esconde en tu lavadora', 'fin'],
      ['section.tab-fq-sec', 'img/tab-dostipos.webp?v=1', 'Lavadora de carga superior y de carga frontal: la tableta sirve para las dos, con el tambor vacío', 'titulo'],
      ['section.desc:not(.tab-desc)', 'img/tab-ropa.webp?v=1', 'Mujer oliendo toallas recién lavadas: ropa que huele a limpio porque el tambor también está limpio', 'titulo'],
    ];
    IMG.forEach(function (x) {
      var sec = prod.querySelector(x[0]); if (!sec) return;
      var f = document.createElement('figure'); f.className = 'tab-img';
      f.innerHTML = '<img src="' + x[1] + '" alt="' + x[2] + '" width="900" height="900" loading="lazy">';
      var h = sec.querySelector('h2');
      if (x[3] === 'titulo' && h) h.insertAdjacentElement('afterend', f); else sec.appendChild(f);
    });
  }

  function cuantas(prod) {
    var top = prod.querySelector('.precioTop'), ahora = document.getElementById('pcAhora');
    if (!top || !ahora || document.getElementById('tabCuantas')) return;
    var el = document.createElement('p'); el.className = 'tab-cuantas'; el.id = 'tabCuantas';
    top.insertAdjacentElement('afterend', el);
    function pinta() {
      var v = PACK[parseInt(ahora.textContent.replace(/\D/g, ''), 10)] || PACK[24500];
      el.innerHTML = 'son <b>' + v[0] + ' tabletas</b> (' + v[1] + ' cajas) · envío gratis';
    }
    pinta();
    if ('MutationObserver' in window) new MutationObserver(pinta).observe(ahora, { childList: true, characterData: true, subtree: true });
  }

  function pasos(prod) {
    var sec = prod.querySelector('.form-sec');
    if (!sec || sec.querySelector('.tab-pasos')) return;
    var ul = document.createElement('ul'); ul.className = 'tab-pasos';
    ul.innerHTML = PASOS.map(function (x) {
      return '<li><img src="' + x[0] + '" alt="' + x[3] + '" width="1024" height="1024" loading="lazy"><div><h3>' + x[1] + '</h3><p>' + x[2] + '</p></div></li>';
    }).join('');
    var ref = sec.querySelector('.sub2') || sec.querySelector('.tit2');
    if (ref) ref.insertAdjacentElement('afterend', ul); else sec.insertBefore(ul, sec.firstChild);
  }

  function video(prod) {
    var v = prod.querySelector('.vid-wrap');
    if (!v || v.querySelector('.tab-vtit')) return;
    v.insertAdjacentHTML('afterbegin', '<div class="tab-vtit"><small>Video real</small><h2>Mira lo que sale del tambor</h2></div>');
  }

  /* ---------- 09-10 (James: "siempre el mismo diseño"): las secciones de abajo dejan de ser el molde común ----------
     Idea: la página es una LAVADORA. La promo es el panel con su pantalla, el antes y después se desliza dentro
     del tambor, la garantía es la perilla de programas, la comparación son burbujas que suben y las reseñas son
     globos de conversación. Los id que usa ficha.js (cH, cM, cS, btnPromo, listaRs, masRs…) no se tocan. */
  var CHK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  function descripcion(prod) {
    var d = prod.querySelector('section.desc');
    if (!d || d.querySelector('.tab-ojo')) return;
    d.classList.add('tab-desc');
    var f = document.createElement('figure'); f.className = 'tab-ojo';
    f.innerHTML = '<img src="img/tab-uso2.webp?v=1" alt="Tambor de la lavadora con agua y espuma celeste mientras la tableta se disuelve" width="1024" height="1024" loading="lazy"><figcaption>Así trabaja por dentro</figcaption>';
    var h = d.querySelector('.tit2'); if (h) h.insertAdjacentElement('afterend', f);
  }

  function promoPanel(prod) {
    var c = prod.querySelector('.promo-card');
    if (!c || c.querySelector('.tab-perillas')) return;
    c.insertAdjacentHTML('afterbegin', '<div class="tab-perillas" aria-hidden="true"><i></i><i></i><i></i><span>Programa oferta</span><b class="tab-led"></b></div>');
    var cu = c.querySelector('.cuenta');
    if (cu) {
      cu.insertAdjacentHTML('beforebegin', '<p class="tab-lcd-rot">La oferta termina en</p>');
      var cajas = Array.prototype.slice.call(cu.children);
      if (cajas.length === 3) { cajas[0].insertAdjacentHTML('afterend', '<em aria-hidden="true">:</em>'); cajas[1].insertAdjacentHTML('afterend', '<em aria-hidden="true">:</em>'); }
    }
  }

  function compara(prod) {
    var s = prod.querySelector('.cmp-sec'), t = s && s.querySelector('table.cmp');
    if (!t) return;
    var filas = Array.prototype.map.call(t.querySelectorAll('tbody td:first-child'), function (td) { return td.textContent; });
    var ul = document.createElement('ol'); ul.className = 'tab-burbujas-lista';
    ul.innerHTML = filas.map(function (x, i) { return '<li style="--i:' + i + '"><span class="tab-gota">' + CHK + '</span><p>' + x.replace(/[<>&]/g, '') + '</p></li>'; }).join('');
    t.replaceWith(ul);
    s.insertAdjacentHTML('afterbegin', '<span class="eyebrow">Mejor que el vinagre y el cloro</span>');
  }

  function resultados(prod) {
    var s = prod.querySelector('.res-sec');
    if (!s || s.querySelector('.tab-ola')) return;
    s.classList.add('tab-agua');
    s.insertAdjacentHTML('afterbegin', '<svg class="tab-ola" viewBox="0 0 390 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22c32-14 65-14 97 0s65 14 98 0 65-14 97 0 66 14 98 0V0H0z"/></svg>');
  }

  function garantia(prod) {
    var g = prod.querySelector('.gar-sec .gseal');
    if (!g || g.classList.contains('tab-perilla')) return;
    g.classList.add('tab-perilla');
    var marcas = '';
    for (var k = 0; k < 30; k++) {
      var a = (k / 30) * Math.PI * 2 - Math.PI / 2, r1 = k % 5 ? 86 : 80, r2 = 94;
      marcas += '<line x1="' + (110 + r1 * Math.cos(a)).toFixed(1) + '" y1="' + (110 + r1 * Math.sin(a)).toFixed(1) + '" x2="' + (110 + r2 * Math.cos(a)).toFixed(1) + '" y2="' + (110 + r2 * Math.sin(a)).toFixed(1) + '"' + (k % 5 ? '' : ' class="larga"') + '/>';
    }
    g.innerHTML = '<svg viewBox="0 0 220 220" role="img" aria-label="Garantía de 30 días">'
      + '<circle cx="110" cy="110" r="104" class="aro"/>'
      + '<g class="marcas">' + marcas + '</g>'
      + '<circle cx="110" cy="110" r="66" class="perilla"/>'
      + '<circle cx="110" cy="110" r="66" class="brillo"/>'
      + '<rect x="106" y="48" width="8" height="22" rx="4" class="aguja"/>'
      + '<text x="110" y="116" text-anchor="middle" class="num">30</text>'
      + '<text x="110" y="137" text-anchor="middle" class="dias">DÍAS</text>'
      + '</svg>';
    var s = prod.querySelector('.gar-sec');
    if (s && !s.querySelector('.eyebrow')) s.insertAdjacentHTML('afterbegin', '<span class="eyebrow">Programa sin riesgo</span>');
  }

  function cambio(prod) {
    var box = prod.querySelector('.ba-sec .ba-img');
    if (!box || box.classList.contains('tab-tambor')) return;
    var src = (box.querySelector('img') || {}).getAttribute ? box.querySelector('img').getAttribute('src') : 'img/tab-ba.webp?v=1';
    box.classList.add('tab-tambor');
    box.innerHTML = '<div class="tab-cara tab-despues" style="background-image:url(\'' + src + '\')" role="img" aria-label="Tambor limpio después de usar la tableta"></div>'
      + '<div class="tab-cara tab-antes" style="background-image:url(\'' + src + '\')" role="img" aria-label="Tambor sucio con sarro y moho antes de la tableta"></div>'
      + '<span class="tab-chip tab-chip-a">Antes</span><span class="tab-chip tab-chip-d">Después</span>'
      + '<span class="tab-mango" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg></span>'
      + '<input type="range" min="0" max="100" value="50" class="tab-rango" aria-label="Desliza para comparar antes y después">';
    var r = box.querySelector('.tab-rango');
    function pon(v) { box.style.setProperty('--corte', v + '%'); }
    r.addEventListener('input', function () { box.classList.add('tocado'); pon(r.value); });
    pon(50);
    box.insertAdjacentHTML('afterend', '<p class="tab-desliza">Desliza el círculo para ver el cambio</p>');
  }

  function preguntas(prod) {
    var fq = prod.querySelector('.fq');
    if (!fq || fq.classList.contains('tab-fq')) return;
    fq.classList.add('tab-fq');
    var s = fq.closest('section'); if (s) s.classList.add('tab-fq-sec');
  }

  function llegada(prod) {
    if (calma || !('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (lista) {
      lista.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add('tab-listo'); obs.unobserve(it.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    prod.querySelectorAll(':scope > section, :scope > .bloque').forEach(function (sec) {
      if (sec.classList.contains('tab-heroe') || sec.getBoundingClientRect().top < innerHeight) return;
      sec.classList.add('tab-baja-in'); obs.observe(sec);
    });
  }

  function listo() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2')) return false;
    heroe(prod); cuantas(prod); pasos(prod); video(prod);
    descripcion(prod); promoPanel(prod); compara(prod); resultados(prod); garantia(prod); cambio(prod); preguntas(prod); imagenes(prod);
    llegada(prod);
    return true;
  }
  function esperar() {
    if (listo()) return;
    var n = 0, t = setInterval(function () { n++; if (listo() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', esperar); else setTimeout(esperar, 50);
})();
