/* ============================================================
   CATALOGO DE LA TIENDA · JAYE GROUP CHILE

   Los precios son la escalera aprobada, la misma que usa Camila.
   Las descripciones NO son inventadas: salen de la ficha que Camila ya le
   da a los clientes por WhatsApp (prompt del Bot Chile), asi la pagina y el
   bot dicen lo mismo.
   Las preguntas frecuentes salen de lo que los clientes preguntan de verdad
   en las conversaciones (medido sobre 7 dias).

   Para agregar un producto nuevo: se copia un bloque y listo.
   La tienda y las campañas apuntan aca — no hay que tocar nada mas.

   fotos: la primera es la de la tarjeta en la tienda; las demas arman la
   galeria de la ficha. Si un archivo no existe, la galeria lo salta sola.
   ============================================================ */
/* ============================================================
   REGLA FIJA · ESTA ESTRUCTURA NO SE CAMBIA

   Todos los productos usan el MISMO molde de pagina. Lo unico que se puede
   cambiar por producto son los COLORES (de botones y secciones) y el
   contenido de aca abajo. La estructura, el orden de las secciones y el
   formulario se quedan igual para todos.

   Orden de la ficha, para cualquier producto:
     galeria · estrellas · precio y nombre · boton
     que incluye · el cambio · resultados · que lo hace diferente
     descripcion · resenas · garantia 30 dias · preguntas
     con quien se despacha · tambien te puede interesar · formulario
     + boton flotante y WhatsApp

   Para agregar un producto nuevo: se copia un bloque de abajo y se cambian
   sus datos. Hereda toda la pagina solo.

   Campos por producto:
     id, nombre, sub, categoria, foto, fotos[]      lo basico
     acento                                          su color
     desc, puntos[]                                  descripcion
     formulaRotulo, formulaTitulo, formulaSub, formula[]
     comparaTitulo, compara[]                        la tabla
     fotosResenas[]                                  fotos de clientes
     packs[], popular                                precios
   ============================================================ */
window.PRODUCTOS = [
  {
    id: 'mascara', unidad: 'una', promo: 2,
    fotosResenas: ['img/resenas-mascara/rm1.webp?v=1','img/resenas-mascara/rm2.webp?v=1','img/resenas-mascara/rm3.webp?v=1','img/resenas-mascara/rm4.webp?v=1','img/resenas-mascara/rm5.webp?v=1'],
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿Puedo llevar una sola?', a: 'Sí. Una máscara sale $18.500. Pero el pack de 2 queda en $23.500, o sea que la segunda te sale por $5.000 más: por eso es el que más piden.' },
      { q: '¿Hace grumos?', a: 'No. El cepillo peina pestaña por pestaña, así que no quedan grumos ni pestañas pegadas.' },
      { q: '¿Se corre si lloro o me mojo?', a: 'No. Es a prueba de agua: aguanta lluvia, lágrimas y el día completo sin correrse.' },
      { q: '¿Sirve si tengo las pestañas cortas?', a: 'Sí. Las microfibras se pegan a cada pestaña y la alargan y engrosan, sin extensiones ni postizas.' },
      { q: '¿Cómo se saca?', a: 'Con agua tibia. No necesitas desmaquillante especial.' },
    ],
    botonAlt: '#0F0E0C',   /* dorado y negro: nada de azul */
    antesDespues: 'img/prod-mascara-3.webp?v=3',
    antesDespuesSub: 'La misma persona, el mismo día: pestañas naturales y con dos capas de Flamenco Mega Volume.',
    formulaRotulo: "La fórmula",
    formulaTitulo: "Fibras que construyen volumen real.",
    formulaSub: "Microfibras y cepillo separador: el combo que las máscaras comunes no tienen.",
    formula: [["fibra","Microfibras de volumen","Se pegan a cada pestaña y la alargan de verdad."],["cepillo","Cepillo separador","Peina pestaña por pestaña, sin grumos."],["agua","A prueba de agua","Aguanta el día entero sin correrse."],["ojo","Negro intenso","Pigmento profundo que engruesa la mirada."],["pluma","Ligera","Da volumen sin apelmazar ni pesar."],["llave","Sale con agua tibia","Sin desmaquillantes especiales."]],
    comparaTitulo: "¿Qué la hace diferente?",
    compara: ["Fibras de volumen real — las comunes solo pintan.","Cepillo separador profesional: cero grumos, cero pestañas pegadas.","A prueba de agua de verdad: aguanta lluvia, lágrimas y el día completo."],
    nombre: 'Máscara de Pestañas Flamenco',
    sub: 'Volumen real sin grumos, a prueba de agua',
    categoria: 'Belleza',
    etiqueta: 'Más vendido',
    etiquetaOro: true,
    foto: 'img/prod-mascara.webp?v=3',
    fotos: ['img/prod-mascara.webp?v=3','img/prod-mascara-2.webp?v=3','img/prod-mascara-3.webp?v=3','img/prod-mascara-4.webp?v=3','img/prod-mascara-5.webp?v=3','img/prod-mascara-6.webp?v=3'],
    acento: '#D8A52E',   /* dorado y negro, como la marca de la mascara */
    desc: 'La Máscara Flamenco Mega Volume trae fibras que se pegan a la pestaña y la alargan y engrosan, y el cepillo las separa una por una, así que da volumen real sin grumos ni pestañas pegadas. Es a prueba de agua, o sea que aguanta el día entero sin correrse. Todo eso sin extensiones ni postizas.',
    puntos: [
      'Fibras que alargan y engrosan la pestaña',
      'El cepillo las separa una por una: sin grumos',
      'A prueba de agua, aguanta el día entero',
      'Sin extensiones ni postizas',
    ],
    packs: [
      /* la unidad suelta SI existe: Dropi 156533 (VENTMAR), el mismo proveedor
         que el pack de 2. Antes creiamos que solo venia en pack. */
      { cant: 1, precio: 18500, antes: 27000, texto: '1 unidad' },
      { cant: 2, precio: 23500, antes: 35000, texto: '2 unidades' },
      { cant: 4, precio: 34900, antes: 47000, texto: '4 unidades' },
      { cant: 6, precio: 44900, antes: 70500, texto: '6 unidades' },
    ],
    popular: 2,
  },
  {
    id: 'lentes', unidad: 'par', promo: 2,
    fotosResenas: ['img/resenas-lentes/rl1.webp?v=1','img/resenas-lentes/rl2.webp?v=1','img/resenas-lentes/rl3.webp?v=1','img/resenas-lentes/rl4.webp?v=1','img/resenas-lentes/rl5.webp?v=1'],
    antesDespues: 'img/prod-lentes-ba.webp?v=1',
    antesDespuesSub: 'La misma persona, el mismo libro: forzando la vista y leyendo tranquilo con los One Power.',
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿Necesito receta médica?', a: 'No. No necesitas receta ni examen: te los pones y ves.' },
      { q: 'Tengo astigmatismo, ¿me sirven?', a: 'Te lo decimos derecho: no. Son lentes de aumento para vista cansada, no corrigen astigmatismo ni reemplazan unos lentes con fórmula. Si tienes receta médica, lo correcto es mandarla a hacer.' },
      { q: '¿Con un solo par veo de cerca y de lejos?', a: 'Sí. La óptica flexible se ajusta sola a lo que estés mirando: lees el celular y también ves la tele o manejas con el mismo par.' },
      { q: '¿Qué aumento traen?', a: 'Van de 0,5 a 2,75 aumentos.' },
      { q: '¿Pesan o molestan?', a: 'No. El armazón es liviano, se usan todo el día sin molestia.' },
    ],
    formulaRotulo: "La óptica",
    formulaTitulo: "Un solo par para todo el día.",
    formulaSub: "Óptica flexible que se ajusta sola a lo que estés mirando.",
    formula: [["ojo","Óptica flexible","Se ajusta sola a lo que mires, de cerca o de lejos."],["libro","Para leer","El celular, el diario, la receta del remedio."],["auto","Para manejar","La tele y la calle, sin cambiar de anteojos."],["pluma","Armazón liviano","No pesa ni deja marca en la nariz."],["llave","Sin receta médica","Rango de 0,5 a 2,75 aumentos."],["casa","Uno en cada parte","Por eso el pack de 2 es el que más piden."]],
    comparaTitulo: "¿Qué los hace diferentes?",
    compara: ["Un solo par sirve de cerca y de lejos — no andas con dos anteojos.","Sin receta ni examen: te los pones y ves.","Armazón liviano: los usas todo el día sin molestia."],
    nombre: 'Lentes One Power',
    sub: 'Un solo par para ver de cerca y de lejos',
    categoria: 'Salud',
    foto: 'img/prod-lentes.webp?v=1',
    fotos: ['img/prod-lentes.webp?v=1','img/prod-lentes-2.webp?v=1','img/prod-lentes-3.webp?v=1','img/prod-lentes-4.webp?v=1','img/prod-lentes-5.webp?v=1'],
    /* turquesa medido de la caja OnePower (#01B3AC). Solo pinta ESTE producto:
       los colores base de la landing no se tocan. */
    acento: '#01B3AC',
    botonAlt: '#0B3B39',
    desc: 'Los Lentes One Power tienen óptica flexible que se ajusta sola a lo que estés mirando, así que con un solo par ves de cerca para leer o el celular, y de lejos para la tele o manejar. Se acabó el andar con dos anteojos encima. Rango de 0,5 a 2,75 aumentos, armazón liviano y sin receta médica.',
    puntos: [
      'Óptica flexible: se ajusta sola a lo que miras',
      'De cerca para leer y de lejos para manejar',
      'Rango de 0,5 a 2,75 aumentos',
      'Armazón liviano y sin receta médica',
    ],
    packs: [
      { cant: 1, precio: 18500, antes: 27000, texto: '1 par' },
      { cant: 2, precio: 24500, antes: 37000, texto: '2 pares' },
      { cant: 3, precio: 29500, antes: 48000, texto: '3 pares' },
    ],
    popular: 1,
  },
  {
    id: 'antena', unidad: 'una', promo: 4,
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿Hay que pagar mensualidad?', a: 'No. Los canales chilenos se ven gratis, sin mensualidad y sin contrato.' },
      { q: '¿Viene una o vienen dos?', a: 'Vienen dos, una para cada televisor. Es el pack del proveedor, no hay unidad suelta.' },
      { q: '¿Es difícil de instalar?', a: 'No. Se conecta al televisor, buscas canales y listo. La base es magnética y se afirma sola.' },
      { q: '¿Dónde la pongo?', a: 'Donde entre mejor la señal, normalmente cerca de una ventana. Por eso el cable es de 3 metros.' },
    ],
    formulaRotulo: "Qué incluye",
    fotosResenas: ["img/resenas-antena/ra4.webp?v=4","img/resenas-antena/ra6.webp?v=4","img/resenas-antena/ra3.webp?v=4","img/resenas-antena/ra8.webp?v=4","img/resenas-antena/ra7.webp?v=4","img/resenas-antena/ra5.webp?v=4","img/resenas-antena/ra9.webp?v=4","img/resenas-antena/ra10.webp?v=4","img/resenas-antena/ra2.webp?v=4","img/resenas-antena/ra1.webp?v=4"],
    formulaTitulo: "Todo lo que trae la antena.",
    formulaSub: "Base magnética, cable de 3 metros y amplificador: lo que las antenas baratas no traen.",
    formula: [["ondas","Alta definición","Capta los canales chilenos en HD, sin borrosidad."],["torre","Señal estable","Frecuencia VHF 174-230 MHz y UHF 470-862 MHz."],["iman","Base magnética","Se afirma sola donde la pongas, no se cae."],["cable","Cable de 3 metros","Llega hasta la ventana sin alargadores."],["casa","Uso interior","Living, pieza, oficina o taller."],["llave","Se instala sola","La conectas al tele, buscas canales y listo."]],
    comparaTitulo: "¿Qué la hace diferente?",
    compara: ["Base magnética que se afirma sola — las comunes se caen con el cable.","Cable de 3 metros para llegar a la ventana, donde entra la señal.","Viene el pack de 2: una para cada televisor, sin pagar dos veces."],
    nombre: 'Antena TV Digital HD',
    sub: 'Canales chilenos gratis en HD, sin mensualidad',
    categoria: 'Hogar',
    foto: 'img/prod-antena.webp',
    fotos: ['img/prod-antena.webp', 'img/prod-antena-2.webp', 'img/prod-antena-3.webp', 'img/prod-antena-4.webp'],
    acento: '#123C8C',      /* azul, el del creativo de la antena */
    acento2Manual: '#C4122F',  /* y el rojo para los avisos: descuento, mas vendido */
    desc: 'Antena para televisión digital que capta los canales chilenos en alta definición, sin pagar mensualidad y sin contratos. Viene en pack de dos: una para cada televisor. Se conecta al televisor y se busca canales, sin instalación complicada.',
    puntos: [
      'Canales chilenos en HD, gratis',
      'Sin mensualidad ni contrato',
      'Vienen dos: una para cada tele',
      'Se conecta y buscas canales, listo',
    ],
    packs: [
      { cant: 2, precio: 24500, antes: 39000, texto: '2 antenas' },
      { cant: 4, precio: 34500, antes: 56000, texto: '4 antenas' },
      { cant: 6, precio: 44500, antes: 78000, texto: '6 antenas' },
    ],
    popular: 0,
    nota: 'Viene en pack del proveedor. No hay unidad suelta.',
  },
  {
    id: 'cargador', unidad: 'uno', promo: 2,
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿De verdad repara la batería?', a: 'Sí. Manda pulsos que limpian las placas sulfatadas para que la batería vuelva a tomar carga, así te ahorras comprar una nueva.' },
      { q: '¿Para qué vehículos sirve?', a: 'Auto, moto, camioneta y lancha, de 4Ah a 100Ah.' },
      { q: '¿Hay que estar pendiente mientras carga?', a: 'No. Tiene pantalla digital y se apaga solo cuando termina, así que lo dejas conectado tranquilo.' },
      { q: '¿Es una batería portátil?', a: 'No. Funciona conectado a la corriente.' },
    ],
    formulaRotulo: "Cómo funciona",
    formulaTitulo: "No solo carga: repara.",
    formulaSub: "Manda pulsos que limpian las placas sulfatadas y devuelven la carga.",
    formula: [["rayo","Repara la batería","Pulsos que limpian las placas sulfatadas."],["auto","Auto, moto y lancha","De 4Ah a 100Ah, camioneta incluida."],["pantalla","Pantalla digital","Ves la carga en todo momento."],["llave","Se apaga solo","Lo dejas conectado tranquilo."],["casa","Enchufe de casa","No necesita taller ni mecánico."],["escudo","Te ahorra la batería nueva","En vez de comprar otra."]],
    comparaTitulo: "¿Qué lo hace diferente?",
    compara: ["Repara, no solo carga — recupera baterías que ya no tomaban carga.","Se apaga solo al terminar: no hay que estar mirándolo.","Sirve para auto, moto, camioneta y lancha con el mismo equipo."],
    nombre: 'Cargador Reparador 12V',
    sub: 'Revive y repara la batería del auto o la moto',
    categoria: 'Vehículos',
    foto: 'img/prod-cargador.webp',
    fotos: ['img/prod-cargador.webp', 'img/prod-cargador-2.webp', 'img/prod-cargador-3.webp'],
    acento: '#A8480E',
    desc: 'El Cargador Reparador de Baterías 12V no solo carga, también repara: manda pulsos que limpian las placas sulfatadas y hacen que la batería vuelva a tomar carga, así te ahorras comprar una batería nueva. Sirve para auto, moto, camioneta y lancha, de 4Ah a 100Ah, tiene pantalla digital y se apaga solo cuando termina, así que lo dejas conectado tranquilo.',
    puntos: [
      'No solo carga: repara placas sulfatadas',
      'Te ahorra comprar una batería nueva',
      'Auto, moto, camioneta y lancha · 4Ah a 100Ah',
      'Pantalla digital y se apaga solo al terminar',
    ],
    packs: [
      { cant: 1, precio: 28500, antes: 42000, texto: '1 unidad' },
      { cant: 2, precio: 38500, antes: 62000, texto: '2 unidades' },
      { cant: 3, precio: 49500, antes: 84000, texto: '3 unidades' },
    ],
    popular: 1,
    nota: 'Funciona conectado a la corriente. No es una batería portátil.',
  },
  {
    id: 'foco', unidad: 'uno', promo: 3,
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿Sube la cuenta de la luz?', a: 'No. Funciona con energía solar: se carga de día y alumbra de noche, sin cables y sin electricista.' },
      { q: '¿Es una cámara de verdad?', a: 'No. Es un foco con forma de cámara: no graba ni tiene video. Alumbra, y como parece una cámara también sirve para espantar a quien se acerque.' },
      { q: '¿Aguanta la lluvia?', a: 'Sí. Es resistente al agua, está hecho para usarse afuera.' },
      { q: '¿Se enciende solo?', a: 'Sí. Tiene sensor de movimiento que lo prende cuando alguien pasa, y además trae control remoto.' },
    ],
    formulaRotulo: "Qué incluye",
    formulaTitulo: "Alumbra y espanta.",
    formulaSub: "77 leds con forma de cámara de seguridad, sin cables ni electricista.",
    formula: [["sol","Energía solar","Se carga de día y alumbra de noche."],["ojo","Sensor de movimiento","Se enciende solo cuando alguien pasa."],["escudo","Parece una cámara","Espanta a quien se acerque."],["agua","Resistente al agua","Aguanta la lluvia afuera."],["llave","Control remoto","Incluido, para manejarlo desde adentro."],["casa","10 minutos","Se atornilla a la pared y listo."]],
    comparaTitulo: "¿Qué lo hace diferente?",
    compara: ["No sube la cuenta de la luz — funciona con sol, sin cables.","Parece una cámara de verdad: alumbra y además disuade.","Se instala en 10 minutos, sin electricista."],
    nombre: 'Foco Solar Tipo Cámara',
    sub: '77 leds, sensor de movimiento y control remoto',
    categoria: 'Hogar',
    foto: 'img/prod-foco.webp',
    fotos: ['img/prod-foco.webp', 'img/prod-foco-2.webp', 'img/prod-foco-3.webp'],
    acento: '#C4122F',   /* rojo, como lo pidio el dueno */
    desc: 'Es un foco solar LED con forma de cámara de seguridad. Tiene 77 leds, sensor de movimiento que lo enciende solo cuando alguien pasa, control remoto incluido, y es resistente al agua para usar afuera. Funciona con energía solar: se carga de día y alumbra de noche, sin cables, sin electricista y sin subir la cuenta de la luz. Como parece una cámara de verdad, también sirve para espantar a quien se acerque. Ideal para patio, entrada, bodega, taller o parcela. Se instala en 10 minutos: se atornilla a la pared y listo.',
    puntos: [
      '77 leds y sensor de movimiento',
      'Energía solar: no sube la cuenta de la luz',
      'Parece una cámara de verdad: espanta',
      'Resistente al agua · control remoto incluido',
      'Se instala en 10 minutos, sin electricista',
    ],
    packs: [
      { cant: 1, precio: 22500, antes: 34000, texto: '1 unidad' },
      { cant: 2, precio: 24500, antes: 48000, texto: '2 unidades' },
      { cant: 3, precio: 29990, antes: 68000, texto: '3 unidades' },
    ],
    popular: 2,
  },
];

/* Preguntas frecuentes. Salen de lo que los clientes preguntan DE VERDAD por
   WhatsApp: se midieron sobre 7 dias de conversaciones y estan en orden de
   cuanto se repiten (la de cuando llega es de lejos la mas frecuente). */
window.PREGUNTAS = [
  { q: '¿Cuándo me llega?', a: 'En Santiago llega en 2 a 3 días hábiles y en regiones entre 2 y 4 días hábiles. Apenas se despacha te mandamos el número de guía por WhatsApp para que lo sigas.' },
  { q: '¿Tiene garantía?', a: 'Sí. Tienes 30 días desde que lo recibes para pedir la devolución si no quedas conforme. Revisa la Política de Reembolso.' },
  { q: '¿Cómo pago?', a: 'Pagas en efectivo cuando recibes el producto, en tu propia dirección. No pagas nada por adelantado ni dejas datos de tarjeta.' },
  { q: '¿Llegan a mi comuna?', a: 'Despachamos a todo Chile, a todas las regiones y comunas. Si tu comuna es de zona lejana puede demorar un poco más.' },
  { q: '¿Puedo revisarlo antes de pagar?', a: 'Sí. Recibes el paquete, lo revisas y recién ahí pagas.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío es gratis a todo Chile. Solo pagas el valor del producto.' },
  { q: '¿Puedo pedir más de uno?', a: 'Sí, y sale más barato: los packs de 2, 3 o más bajan bastante el precio por unidad.' },
];

/* Candado de precios: la escalera aprobada por el dueno. Si un pack tiene un
   precio que no esta aca, la ficha NO lo vende. Antes esta lista no existia en
   ninguna parte y el candado nunca sirvio.
   Máscara 23.500 / 34.900 / 44.900 · Lentes 18.500 / 24.500 / 29.500
   Antena 24.500 / 34.500 / 44.500 · Cargador 28.500 / 38.500 / 49.500
   Foco 22.500 / 24.500 / 29.990 */
window.PRECIOS_APROBADOS = [
  23500, 34900, 44900,
  18500, 24500, 29500,
  24500, 34500, 44500,
  28500, 38500, 49500,
  22500, 24500, 29990,
];
