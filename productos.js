/* ============================================================
   CATALOGO DE LA TIENDA · JAYE GROUP CHILE
   Los precios son la escalera aprobada, la misma que usa Camila.
   Para agregar un producto nuevo: se copia un bloque y listo.
   La tienda y las campañas apuntan aca — no hay que tocar nada mas.
   ============================================================ */
window.PRODUCTOS = [
  {
    id: 'mascara',
    nombre: 'Máscara de Pestañas Flamenco',
    sub: 'Volumen real sin grumos, a prueba de agua',
    categoria: 'Belleza',
    etiqueta: 'Más vendido',
    etiquetaOro: true,
    foto: 'img/prod-mascara.webp',
    packs: [
      { cant: 2, precio: 23500, antes: 35000, texto: '2 unidades' },
      { cant: 4, precio: 34900, antes: 47000, texto: '4 unidades' },
      { cant: 6, precio: 44900, antes: 70500, texto: '6 unidades' },
    ],
    nota: 'Viene en pack de 2. No hay unidad suelta.',
  },
  {
    id: 'lentes',
    nombre: 'Lentes One Power',
    sub: 'Un solo par para leer y para manejar',
    categoria: 'Hogar',
    foto: 'img/prod-lentes.webp',
    packs: [
      { cant: 1, precio: 18500, antes: 27000, texto: '1 par' },
      { cant: 2, precio: 24500, antes: 37000, texto: '2 pares' },
      { cant: 3, precio: 29500, antes: 48000, texto: '3 pares' },
    ],
  },
  {
    id: 'antena',
    nombre: 'Antena TV Digital HD',
    sub: 'Canales chilenos en alta definición, sin mensualidad',
    categoria: 'Tecnología',
    foto: 'img/prod-antena.webp',
    packs: [
      { cant: 2, precio: 24500, antes: 38000, texto: '2 antenas' },
      { cant: 4, precio: 34500, antes: 60000, texto: '4 antenas' },
      { cant: 6, precio: 44500, antes: 84000, texto: '6 antenas' },
    ],
    nota: 'Viene en pack de 2. No hay unidad suelta.',
  },
  {
    id: 'cargador',
    nombre: 'Cargador Reparador 12V',
    sub: 'Recupera la batería del auto o la moto',
    categoria: 'Auto',
    foto: 'img/prod-cargador.webp',
    packs: [
      { cant: 1, precio: 28500, antes: 42000, texto: '1 unidad' },
      { cant: 2, precio: 38500, antes: 62000, texto: '2 unidades' },
      { cant: 3, precio: 49500, antes: 84000, texto: '3 unidades' },
    ],
  },
  {
    id: 'foco',
    nombre: 'Foco Solar Tipo Cámara',
    sub: '77 LED con sensor de movimiento, se carga con el sol',
    categoria: 'Hogar',
    etiqueta: 'Nuevo',
    foto: 'img/prod-foco.webp',
    packs: [
      { cant: 1, precio: 22500, antes: 33000, texto: '1 unidad' },
      { cant: 2, precio: 24500, antes: 46000, texto: '2 unidades' },
      { cant: 3, precio: 29990, antes: 66000, texto: '3 unidades' },
    ],
  },
];

/* Los precios aprobados, para que nada se salga de la lista */
window.PRECIOS_APROBADOS = [23500,34900,44900, 18500,24500,29500, 34500,44500, 28500,38500,49500, 22500,29990];
