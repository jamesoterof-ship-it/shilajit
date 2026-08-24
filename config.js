/* ============================================================
   CONFIG — ANTENA TV DIGITAL HD · Chile
   Mismo molde que la landing de la máscara. Paleta celeste/negro,
   la misma de los anuncios de la antena.
   Precios aprobados: 2 antenas $24.500 · 4 $34.500 · 6 $44.500
   ============================================================ */
window.CONFIG = {
  /* ---- Identidad ---- */
  marca: "Jaye Group",
  producto: "Antena TV Digital HD",
  productoCorto: "Antena TV Digital HD",
  seoTitle: "Antena TV Digital HD · Canales chilenos gratis sin mensualidad | Pago contra entrega Chile",
  seoDesc: "Ve los canales de la TV abierta chilena gratis y en HD, sin mensualidad ni contrato. Se instala en 2 minutos. Cada pack trae 2 antenas. Envío gratis y pago al recibir en todo Chile.",

  /* ---- Motor de diseño (celeste / negro de los anuncios) ---- */
  paleta: { pri:"#2196c9", sec:"#4fc3f7", acc:"#7fd6fb", priD:"#04141f", ink:"#050f16" },

  /* ---- País / moneda ---- */
  pais: { nombre:"Chile", cc:"cl", prefijo:"+56", moneda:"CLP", locale:"es-CL" },

  /* ---- Hero ---- */
  heroKicker: "Tele abierta, sin pagar mensualidad",
  heroTitle: 'Canales chilenos <span class="hl">gratis y en HD</span>',
  heroLead: "La conectas al televisor, la pones cerca de la ventana y listo. Cada pack trae 2 antenas. Pagas al recibir.",
  heroTag: "Envío gratis a todo Chile",
  badges: ["📺 Canales gratis", "⚡ 2 minutos", "🚚 Pago al recibir"],

  /* ---- Precios / packs (escalera aprobada) ---- */
  precioUnidad: 24500,
  packs: [
    { qty:1, price:24500, was:24500, label:"2 antenas",  sub:"La promo del anuncio", tag:"MÁS VENDIDO" },
    { qty:2, price:34500, was:49000, label:"4 antenas",  sub:"Ahorra 30%",  tag:"" },
    { qty:3, price:44500, was:73500, label:"6 antenas",  sub:"Ahorra 39%",  tag:"MEJOR PRECIO" }
  ],

  /* ---- Imágenes ---- */
  img: {
    logo:    "",
    hero:    "img/hero.webp",
    oferta:  "img/oferta.webp",
    galeria: ["img/c1.webp","img/c2.webp","img/c3.webp","img/c4.webp"],
    packThumb1: "img/unidad.png",
    packThumb2: "img/duo.webp"
  },

  /* ---- Trust strip (4) ---- */
  trust: [
    { em:"🚚", b:"Envío gratis", s:"a todo Chile" },
    { em:"💵", b:"Paga al recibir", s:"contra entrega" },
    { em:"📺", b:"Canales gratis", s:"sin mensualidad" },
    { em:"⚡", b:"2 minutos", s:"y funciona" }
  ],

  /* ---- Beneficios (3) ---- */
  benTitle: "Por qué los chilenos la piden",
  benSub: "Los canales de la televisión abierta son gratis: lo único que falta es la antena correcta.",
  beneficios: [
    { ic:"📺", t:"Canales nacionales en HD", d:"Recibe la señal digital de la TV abierta chilena, con imagen nítida y sin pixeleo." },
    { ic:"💸", t:"Se paga una sola vez", d:"Nada de mensualidades ni contratos. La compras y la usas para siempre." },
    { ic:"🔌", t:"Sin técnico ni instalación", d:"Se conecta al televisor, se pone cerca de una ventana y se buscan canales. Listo en 2 minutos." }
  ],

  /* ---- Cómo actúa (intro + 3 pasos) ---- */
  howTitle: "¿Cómo se instala?",
  howIntro: "Tres pasos y estás viendo tele. Sirve en televisor antiguo o smart TV.",
  howSteps: [
    { t:"Conecta", d:"Enchufa el cable de la antena en la entrada de antena de tu televisor." },
    { t:"Ubica", d:"Pon la antena cerca de una ventana; la base magnética se agarra donde quieras." },
    { t:"Busca canales", d:"Entra al menú del televisor, dale a buscar canales y aparecen los nacionales." }
  ],

  /* ---- Oferta ---- */
  offerTitle: "La promo del anuncio: 2 antenas",
  offerSub: "2 antenas por $24.500, una para cada tele. Envío gratis y pagas al recibir.",
  offerWas: 0,
  offerNew: 24500,

  /* ---- Stats (contadores) ---- */
  statTitle: "Lo que dicen quienes ya la tienen",
  stats: [
    { em:'<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>', valor:93, suf:"%", d:"ve los canales nacionales sin problema." },
    { em:'<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>', valor:96, suf:"%", d:"la instaló solo, sin llamar a un técnico." },
    { em:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>', valor:90, suf:"%", d:"la tuvo funcionando en menos de 5 minutos." },
    { em:'<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.2 5.8.9-4.2 4 1 5.7-5.2-2.7-5.2 2.7 1-5.7-4.2-4 5.8-.9z"/></svg>', valor:94, suf:"%", d:"la recomienda para ahorrarse el cable." }
  ],

  /* ---- Comparativa ---- */
  cmpTitle: "¿Qué la hace diferente?",
  comparativa: [
    "Pago único: lo que gastas en un mes de cable vale más que la antena completa.",
    "Cada pack trae 2 antenas, así cubres el living y la pieza con una sola compra.",
    "Base magnética y cable largo: la ubicas donde mejor agarre señal, sin taladrar nada."
  ],

  /* ---- Reseñas ---- */
  revScore: 4.7,
  revSeed: 168,

  /* ---- Garantía ---- */
  garDias: 30,
  garTitle: "Garantía de satisfacción",
  garText: "Si la antena no funciona en tu zona, te devolvemos tu dinero dentro de los primeros 30 días. Sin preguntas.",

  /* ---- FAQ ---- */
  faq: [
    { q:"¿Qué canales voy a ver?", a:"Los canales de la televisión abierta chilena que se transmiten en tu zona: los nacionales y los regionales que tengan señal digital donde vives. No incluye canales de cable ni streaming." },
    { q:"¿Sirve en cualquier televisor?", a:"Sí, mientras tenga entrada de antena y sintonizador digital. Funciona en televisores antiguos y en smart TV." },
    { q:"¿De verdad no pago mensualidad?", a:"Así es. La señal de TV abierta es gratuita: pagas la antena una sola vez y la usas siempre." },
    { q:"¿Y si vivo lejos de la ciudad?", a:"La cantidad de canales depende de la cobertura de tu zona: mientras más cerca de las antenas transmisoras, más canales. En zonas muy alejadas puede captar menos." },
    { q:"¿Hacen envíos a regiones?", a:"Sí, llegamos a todo Chile con envío gratis y pagas cuando recibes tu pedido en la puerta de tu casa." }
  ],

  /* ---- Transportadoras ---- */
  carriers: ["img/logo-bluexpress.png", "img/logo-starken.png"],

  /* ---- Contacto / footer ---- */
  footTitle: "JAYE GROUP — CHILE",
  footAddr: "Av. Providencia 1208, Oficina 16, Santiago, RM.",
  footMail: "gerencia@jayegroup.com.co",
  whatsapp: "56964775539",

  /* ---- Backend: mismo circuito que la máscara ---- */
  dropiId:   145445,
  sheetUrl:  "",
  orderWebhook: "https://n8n-production-8a42.up.railway.app/webhook/pedido-web-antena",
  n8nConfirm:"",
  panelUrl:  "",
  pixelId:   "1249894010361489",

  /* ---- Sin upsell por ahora (se enciende poniendo un precio) ---- */
  upsell: { nombre:"", precio: 0 }
};
