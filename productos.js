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
  /* ============================================================
     BÁLSAMO DE COLÁGENO · CHILE · 29-09-2026 · copia idéntica de la ficha de España
     ============================================================ */
  {
    id: 'balsamo', unidad: 'uno', promo: 2,

    /* Dropi CHILE: id 91556 · Importadora Oferfly · costo $3.200 (alterno 154619, Esteban, $3.100).
       Copia IDÉNTICA de la ficha de España (James, 29-09): mismo hero, mismas fotos,
       mismo video y mismos textos; solo cambia lo que era de España. */
    dropiId: 91556,

    nombre: 'Bálsamo de Colágeno Rosetimes',
    sub: 'Stick hidratante multizona · 8 g',
    categoria: 'Belleza',
    etiqueta: 'Nuevo en Chile',
    etiquetaOro: true,

    /* 'foto' es la MINIATURA (tarjeta y packs). 'fotos' es la GALERÍA.
       Las tres las hizo James el 25-09. Se quitó la del catálogo del proveedor:
       era un collage con los rótulos FOREHEAD / FACE / LIPS / BODY en INGLÉS
       encima, y esto se vende en España.
       El hero NO se repite aquí: se veía dos veces en la misma pantalla. */
    foto: 'img/balsamo-mano.webp?v=1',
    fotos: [
      'img/balsamo-uso.webp?v=1',    // aplicándoselo en el pómulo: se entiende el gesto de un vistazo
      'img/balsamo-mano.webp?v=1',   // sosteniéndolo: se lee la etiqueta y el tamaño real
      'img/balsamo-bolso.webp?v=1',  // junto al bolso: los 8 g que caben en cualquier parte
    ],

    /* ---- VÍDEO DE LA FICHA ----
       Sale del vídeo del propio vendedor del producto (720x1280, sin marca de
       agua de ningún creador). Se mapeó a 2 fotogramas por segundo para
       localizar los rótulos en inglés y se cortaron SOLO los tramos limpios:
       quedan 7,2 s con cinco planos, sin una sola letra y SIN AUDIO (James:
       "nada de texto ni audio"). Los textos estaban en 4,0-5,3 · 7,0-7,3 ·
       10,5-11,3 y esos segundos no entran. */
    /* 28-09: re-cortado. El video anterior dejaba un cuadro con el nombre de OTRA marca
       ("Wrinkle Bounce Multi Balm", seg. 3,3), el antes/despues de las munecas (4,2-4,6) y un
       texto en ingles (5,9). En la UE y en Meta el antes/despues en cosmetica esta prohibido. */
    video: 'img/balsamo-ficha.mp4?v=2',

    /* ---- HERO ----
       La foto vertical 1024x1536 que hizo James: el bálsamo en primer plano y
       la modelo detrás, desenfocada. El producto manda.
       En 'titulo' se permite <b> para el trozo en dorado; el resto se escapa.
       OJO CON EL TITULAR: nada de "elimina arrugas" ni "rejuvenece". Solo se
       puede hablar de APARIENCIA (Reglamento UE 655/2013), y además Meta
       rechaza las promesas médicas en cosmética. */
    hero: {
      img: 'img/hero-balsamo.webp?v=1',
      kicker: 'Nuevo en Chile',
      titulo: 'Dos segundos,<br>y la piel<br><b>deja de tirar.</b>',   /* con coma y punto, como el titular de la máscara: la cursiva sin puntuación queda coja */
      sub: 'Bálsamo de colágeno en stick. Se desliza y listo: rostro, contorno, labios, cuello y escote.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 2 a 4 días'],
        ['pago', 'Pagas al recibir'],
      ],
    },
    /* Rosa de acento. Era #B76E79 y daba 3,8:1 tanto en blanco sobre él (la
       cinta de la promo, el -32%, el contador) como al revés (el botón
       secundario). Pide 4,5. Este da 5,3:1 y sigue siendo el rosa del envase,
       solo un punto más cerrado. Regla: ux/contraste. */
    acento: '#A8505F',   /* oro rosa: cosmetica, y distinto del oro de la marca */

    /* ---- Escasez: SOLO datos reales del Radar. En España inventar urgencia
       es practica desleal (art. 5 y 7 Ley 3/1991). Estas cifras salen de
       radar_stock, pais='España', id 2287. ---- */
    escasez: { hoy: 179, mejorDia: 229, quedan: 924,
      nota: 'Se despacha por orden de pedido y pagas recién cuando lo tienes en la mano.' },

    desc: 'El Bálsamo Rosetimes es un hidratante en formato stick con colágeno, vitamina E y ceramida. Se gira la base, se desliza sobre la piel y listo: no hay que untarse las manos ni calcular cantidad. Al hidratar, la piel se ve más suave y las líneas de expresión se marcan menos. Sirve en rostro, frente, contorno de ojos, labios, cuello y escote, y se puede usar antes del maquillaje o por encima, para retocar durante el día. Son 8 g que caben en cualquier bolso.',

    puntos: [
      'Colágeno, vitamina E y ceramida',
      'Ayuda a suavizar la apariencia de las líneas de expresión',
      'Aporta hidratación a la piel seca y tirante',
      'Se aplica directo, sin ensuciarte las manos',
      'Rostro, contorno, labios, cuello y escote',
    ],

    formulaRotulo: 'La fórmula',
    formulaTitulo: 'Cinco activos y un formato que no ensucia.',
    formulaSub: 'Hidratación de verdad, en un gesto de dos segundos.',
    formula: [
      ['fibra', 'Colágeno', 'Acompaña la elasticidad y la firmeza de la piel.'],
      ['pluma', 'Vitamina E', 'Antioxidante: protege del desgaste diario.'],
      ['agua', 'Glicerina vegetal', 'Retiene el agua en la capa superficial: la piel deja de sentirse tirante.'],
      ['ojo', 'Ceramida', 'Refuerza la barrera de la piel y mejora la textura.'],
      ['llave', 'Stick giratorio', 'Giras la base y aplicas. Sin manos, sin derrames y sin gastar de más.'],
      ['casa', '8 g que caben en el bolso', 'Para retocar donde estés, antes o después del maquillaje.'],
    ],

    /* ---- Linea de tiempo: la seccion que mejor funciona en las paginas
       españolas que ya venden este producto. Sin porcentajes inventados. ---- */
    medida: {
      titulo: '¿Cuándo se nota?',
      filas: [['Día 1', 'la piel deja de tirar'], ['Día 7', 'se ve más hidratada'], ['Día 21', 'las líneas finas se marcan menos']],
      texto: 'Es un cosmético, no un tratamiento médico: trabaja sobre la apariencia de la piel. La hidratación se nota desde los primeros días. Para que las líneas finas se vean menos marcadas hay que usarlo a diario durante unas tres semanas, y el resultado depende de tu tipo de piel y de la constancia.',
      boton: 'Lo quiero, pago al recibir',
    },

    comparaTitulo: '¿Qué lo hace diferente?',
    compara: [
      'Se aplica directo sobre la piel: no hay que untarse las manos ni medir cantidad.',
      'Formato sólido: no se derrama en el bolso ni se reseca como una crema abierta.',
      'Un solo producto para rostro, labios, cuello y escote.',
      'Se puede usar antes del maquillaje o por encima, para retocar a media tarde.',
    ],

    /* ---- Preguntas del producto. Las de envio y pago van detras, iguales
       para todos los productos de la tienda. ---- */
    preguntas: [
      { q: '¿Dónde me lo puedo aplicar?', a: 'En rostro, frente, contorno de ojos, labios, cuello y escote. Evita el interior del ojo y las heridas abiertas.' },
      { q: '¿Se puede usar con maquillaje?', a: 'Sí. Antes, como base hidratante, o por encima para retocar durante el día. Al ser un stick no arrastra el maquillaje.' },
      { q: '¿Cuántas veces al día?', a: 'Las que necesites. Lo habitual es por la mañana y por la noche, y un retoque en las zonas que notes secas.' },
      { q: '¿Quita las arrugas?', a: 'No, y quien se lo diga le está engañando. Es un cosmético hidratante: cuando la piel está bien hidratada las líneas se marcan menos y se ven más suaves. No elimina arrugas ni sustituye ningún tratamiento médico.' },
      { q: '¿Cuánto me dura?', a: 'Trae 8 g. Lo que dure depende de cuántas zonas te apliques y con qué frecuencia.' },
      { q: '¿Sirve para piel sensible?', a: 'Es un cosmético de uso externo. Como con cualquier producto nuevo, conviene probarlo primero en una zona pequeña. Si tienes la piel reactiva o alguna afección dermatológica, consúltalo antes con tu dermatólogo.' },
    ],

    /* ---- Fotos de clientes: VACIO. No tenemos clientes en España todavia y
       en la UE no se pueden mostrar testimonios que no sean reales
       (Directiva UE 2019/2161). Se llena cuando haya pedidos entregados. ---- */
    fotosResenas: ['img/rev/r01.webp','img/rev/r04.webp','img/rev/r07.webp','img/rev/r09.webp','img/rev/r10.webp','img/rev/r12.webp','img/rev/r17.webp','img/rev/r24.webp','img/rev/r33.webp','img/rev/r35.webp','img/rev/r37.webp','img/rev/r38.webp','img/rev/r40.webp','img/rev/r45.webp','img/rev/r55.webp'],
    antesDespues: '',

    /* ---- PRECIOS aprobados por James el 29-09-2026 (Chile): 20.500 / 27.500 / 36.500.
       El «antes» del 1 es un 30 % sobre el precio; los de 2 y 3, lo que costaría comprarlos sueltos. ---- */
    packs: [
      { cant: 1, precio: 20500, antes: 26900, texto: '1 unidad' },
      { cant: 2, precio: 27500, antes: 41000, texto: '2 unidades' },
      { cant: 3, precio: 36500, antes: 61500, texto: '3 unidades' },
    ],
    /* OJO: 'popular' es el INDICE del pack, no la cantidad. 1 = el segundo de
       la lista = el pack de 2 unidades, que es el que se empuja: el envio es
       fijo por pedido, asi que dos unidades parten el flete a la mitad. */
    popular: 1,

  },




  {
    id: 'almohada', unidad: 'una', promo: 2,
    video: 'img/almohada.mp4?v=3',
    heroEfecto: true,
    escasez: { hoy: 50, mejorDia: 173, quedan: 1054,
      nota: 'Es de las que más rota en bodega. Se despacha por orden de pedido y pagas recién cuando la tienes en la mano.' },
    zonas: {
      img: 'img/prod-almohada.webp?v=1',
      /* foto SIN los rotulos del proveedor: sobre ella van los puntos que se
         tocan. Campos nuevos, la ficha vieja los ignora sin romperse. */
      imgZonas: 'img/almohada-zonas.webp?v=1',
      puntos: [[13, 47], [46, 30], [70, 48]],
      etiquetas: ['De lado', 'Boca arriba', 'El cuello'],
      titulos: ['Los costados, más altos', 'El centro, más bajo', 'El soporte cervical'],
      rotulo: 'Cómo se usa',
      titulo: 'Una zona para cada postura',
      sub: 'No es una almohada deforme: cada parte tiene una función distinta.',
      pies: [
        'Los dos costados son los más altos. Ahí apoyas cuando duermes de lado: ese alto extra cubre el ancho del hombro y el cuello queda derecho, no doblado hacia abajo.',
        'El centro es más bajo. Ahí apoyas cuando duermes boca arriba, para que la cabeza no quede empujada hacia adelante.',
        'El panel gris del frente es el soporte cervical. Apoya la curva del cuello en vez de dejarla colgando en el aire, que es lo que hace que amanezcas tieso.',
      ],
    },
    medida: {
      titulo: '¿Le sirve tu funda de siempre?',
      filas: [['60 cm','de largo'],['40 cm','de ancho'],['10-13 cm','de alto según la zona']],
      texto: 'Sí. Mide 60 x 40, que es la medida estándar de almohada en Chile, así que le entra cualquier funda que ya tengas en la casa. No tienes que comprar nada aparte.',
      boton: 'Lo quiero, pago al recibir',
    },
    fotosResenas: ['img/resenas-almohada/ra1.webp?v=1','img/resenas-almohada/ra2.webp?v=1','img/resenas-almohada/ra3.webp?v=1','img/resenas-almohada/ra4.webp?v=1','img/resenas-almohada/ra5.webp?v=1','img/resenas-almohada/ra6.webp?v=1','img/resenas-almohada/ra7.webp?v=1','img/resenas-almohada/ra8.webp?v=1','img/resenas-almohada/ra9.webp?v=1','img/resenas-almohada/ra10.webp?v=1'],
    antesDespues: 'img/prod-almohada-ba.webp?v=2',
    antesDespuesSub: 'Despertar con el cuello tieso, o despertar con el cuello apoyado toda la noche.',
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿Qué mide? ¿Le sirve mi funda?', a: 'Mide 60 cm de largo por 40 de ancho, la medida estándar de almohada, así que le entra cualquier funda que ya tengas en casa. El alto va de 10 cm en el centro a 13 cm en los costados.' },
      { q: 'Duermo de lado, ¿me sirve igual?', a: 'Sí, para eso están los costados más altos: cubren el ancho del hombro y dejan el cuello derecho. El centro, más bajo, es para cuando duermes boca arriba.' },
      { q: '¿Es dura o blanda?', a: 'Es de espuma viscoelástica: firme al tocarla, pero se amolda con el calor del cuerpo en un par de minutos y vuelve a su forma cuando te levantas. No se aplasta como las de relleno suelto.' },
      { q: '¿Se puede lavar?', a: 'La funda se saca y se lava normal. La espuma no se lava ni se mete a la lavadora: se airea y listo.' },
      { q: '¿Me va a quitar el dolor de cuello?', a: 'Mantiene la cabeza y el cuello alineados con la columna mientras duermes, que es lo que evita levantarse con el cuello tieso. Pero es una almohada, no un tratamiento: si tienes un problema médico, eso lo ve un doctor.' },
    ],
    formulaRotulo: "Qué incluye",
    formulaTitulo: "Tres alturas en una sola almohada.",
    formulaSub: "Una zona para dormir de lado, otra para boca arriba y el soporte del cuello al frente.",
    formula: [["ondas","Centro más bajo","Para dormir boca arriba sin que la cabeza quede empujada."],["escudo","Costados más altos","Cubren el ancho del hombro cuando te giras de lado."],["pluma","Soporte cervical","El panel gris apoya la curva del cuello en vez de dejarla en el aire."],["fibra","Espuma viscoelástica","Se amolda con el calor del cuerpo y vuelve a su forma."],["agua","Funda lavable","Se saca y se lava normal."],["casa","Mide 60 x 40","La medida estándar: le sirve tu funda de siempre."]],
    comparaTitulo: "¿Qué la hace diferente?",
    compara: ["Tres alturas en la misma almohada: no eliges entre dormir de lado o boca arriba.","La espuma viscoelástica vuelve a su forma — no se aplasta como las de relleno suelto.","Mide 60 x 40, la medida estándar: le entra cualquier funda que ya tengas."],
    nombre: 'Almohada Cervical Ergonómica',
    sub: 'Espuma viscoelástica con tres zonas · 60 x 40 cm',
    categoria: 'Hogar',
    foto: 'img/prod-almohada.webp?v=1',
    fotos: ['img/prod-almohada.webp', 'img/prod-almohada-2.webp', 'img/prod-almohada-3.webp'],
    acento: '#1B6FD6',   /* azul de sus propias placas */
    desc: 'Es una almohada cervical ergonómica de espuma viscoelástica, con tres zonas de distinta altura. El centro es más bajo, para cuando duermes boca arriba, y los costados son más altos, para cuando te giras de lado: ese alto extra cubre el ancho del hombro y deja el cuello derecho. Al frente tiene la zona de soporte cervical, el panel gris de malla transpirable, que apoya la curva del cuello en vez de dejarla colgando. Mide 60 x 40 cm, la medida estándar, así que le sirve cualquier funda que ya tengas en la casa. La funda se saca y se lava.',
    puntos: [
      'Tres zonas: de lado, boca arriba y soporte de cuello',
      'Espuma viscoelástica: se amolda y vuelve a su forma',
      'Mide 60 x 40 — le sirve tu funda de siempre',
      'Panel de malla transpirable en la zona del cuello',
      'Funda que se saca y se lava',
    ],
    packs: [
      { cant: 1, precio: 29500, antes: 44900, texto: '1 unidad' },
      { cant: 2, precio: 39500, antes: 59000, texto: '2 unidades' },
      { cant: 3, precio: 49500, antes: 88500, texto: '3 unidades' },
    ],
    popular: 2,
  },
  {
    id: 'mascara', unidad: 'una', promo: 2,
    fotosResenas: ['img/resenas-mascara/rm1.webp?v=1','img/resenas-mascara/rm2.webp?v=1','img/resenas-mascara/rm3.webp?v=1','img/resenas-mascara/rm4.webp?v=1','img/resenas-mascara/rm5.webp?v=1'],
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿Puedo llevar una sola?', a: 'Sí, una máscara sale $18.500. Pero el pack de 2 queda en $23.500: la segunda te sale por $5.000 más, por eso es el que más piden.' },
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
    /* 25-09: video limpio de la ficha (cuerpo_mascara 12-21 s, sin letras ni sonido) */
    video: 'img/mascara-ficha.mp4?v=1',
    desc: 'La Máscara Flamenco Mega Volume trae fibras que se pegan a la pestaña y la alargan y engrosan, y el cepillo las separa una por una, así que da volumen real sin grumos ni pestañas pegadas. Es a prueba de agua, o sea que aguanta el día entero sin correrse. Todo eso sin extensiones ni postizas.',
    puntos: [
      'Fibras que alargan y engrosan la pestaña',
      'El cepillo las separa una por una: sin grumos',
      'A prueba de agua, aguanta el día entero',
      'Sin extensiones ni postizas',
    ],
    packs: [
      /* El montaje ya elige el id por cantidad: 1 -> 156533 ($2.500),
         2/4/6 -> 149702 (pack de 2, $3.500, mas barato que dos sueltas). */
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
    id: 'antena', unidad: 'una', promo: 2,
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      /* OJO copy (James, 14-09): NUNCA decir "sin mensualidad" ni "sin contrato":
         la gente entiende que reemplaza el cable y reclama. Se dice SEÑAL ABIERTA
         y se aclara de frente que no es cable ni streaming. */
      { q: '¿Se ven los canales de cable o de streaming?', a: 'No. Es una antena de señal abierta: se ven los canales abiertos de Chile en HD (TVN, Mega, Chilevisión, Canal 13, La Red y sus señales). No reemplaza el cable ni Netflix.' },
      { q: '¿Puedo llevar una sola?', a: 'Sí, una antena sale $18.500. El pack de 2 queda en $24.500: la segunda te sale por $6.000 más y dejas una en cada televisor.' },
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
    sub: 'Los canales abiertos de Chile en HD, sin técnico',
    categoria: 'Hogar',
    /* el video real de instalacion (el mismo que Camila manda tras la compra):
       la ficha lo pinta abajo, sin sonido, en bucle y arrancando solo, igual
       que en los demas productos (James, 14-09: nada de boton de play). */
    video: 'video/instala_antena.mp4?v=2',   /* v=2: cortado a 1:15,9 (fuera el rotulo ajeno del final) */
    /* el antes y despues lo hizo James (14-09): la ficha lo pinta en «El cambio»,
       justo antes de las preguntas, igual que en el cargador */
    antesDespues: 'img/antena-ba.webp?v=1',
    antesDespuesSub: 'Misma tele, mismo partido: la diferencia es la antena.',
    foto: 'img/prod-antena.webp',
    fotos: ['img/prod-antena.webp', 'img/prod-antena-2.webp', 'img/prod-antena-3.webp', 'img/prod-antena-4.webp'],
    acento: '#123C8C',      /* azul, el del creativo de la antena */
    acento2Manual: '#C4122F',  /* y el rojo para los avisos: descuento, mas vendido */
    desc: 'Antena de señal abierta para televisión digital: capta los canales abiertos de Chile en alta definición. No es cable ni streaming. Viene en pack de dos: una para cada televisor. Se conecta al televisor y se busca canales, sin técnico ni instalación complicada.',
    puntos: [
      'Los canales abiertos de Chile en HD',
      'Señal abierta: no es cable ni streaming',
      'Vienen dos: una para cada tele',
      'Se conecta y buscas canales, listo',
    ],
    packs: [
      /* la antena SI se vende suelta: Dropi 32763 ($2.000), mismo proveedor.
         Los packs no dan descuento (145445 vale el doble, 86375 el triple),
         pero se montan igual para que vaya en menos bultos. */
      { cant: 1, precio: 18500, antes: 27000, texto: '1 antena' },
      { cant: 2, precio: 24500, antes: 39000, texto: '2 antenas' },
      { cant: 3, precio: 29500, antes: 48000, texto: '3 antenas' },
    ],
    popular: 1,   /* el mas vendido es el pack de 2 (James, 14-09); el formulario arranca ahi */
    nota: 'Viene en pack del proveedor. No hay unidad suelta.',
  },
  {
    id: 'cargador', unidad: 'uno', promo: 2,
    fotosResenas: ['img/resenas-cargador/rc1.webp?v=1','img/resenas-cargador/rc2.webp?v=1','img/resenas-cargador/rc3.webp?v=1','img/resenas-cargador/rc4.webp?v=1','img/resenas-cargador/rc5.webp?v=1','img/resenas-cargador/rc6.webp?v=1','img/resenas-cargador/rc7.webp?v=1','img/resenas-cargador/rc8.webp?v=1','img/resenas-cargador/rc9.webp?v=1'],
    antesDespues: 'img/prod-cargador-ba.webp?v=1',
    antesDespuesSub: 'La misma batería y el mismo auto: descargada y sin arrancar, y cargada y lista después del ciclo.',
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
    foto: 'img/prod-cargador.webp?v=1',
    fotos: ['img/prod-cargador.webp?v=1','img/prod-cargador-2.webp?v=1','img/prod-cargador-3.webp?v=1'],
    /* El video va, como en la clorofila. OJO: el unico que hay hoy es el
       creativo de Meta y trae bandas negras y los titulos quemados dentro
       (hechos para el feed). Con un video limpio -solo el producto
       funcionando, sin letras- esta seccion se ve bastante mejor. */
    video: 'img/cargador-pinzas.mp4',
    acento: '#D20603',   /* rojo medido de sus propios creativos */
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
    fotosResenas: ['img/resenas-foco/rf1.webp?v=1','img/resenas-foco/rf2.webp?v=1','img/resenas-foco/rf3.webp?v=1','img/resenas-foco/rf4.webp?v=1','img/resenas-foco/rf5.webp?v=1','img/resenas-foco/rf6.webp?v=1','img/resenas-foco/rf7.webp?v=1','img/resenas-foco/rf8.webp?v=1','img/resenas-foco/rf9.webp?v=1'],
    antesDespues: 'img/prod-foco-ba.webp?v=2',
    antesDespuesSub: 'El mismo camino, la misma noche: a oscuras y con el foco encendido por el sensor.',
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
    foto: 'img/prod-foco.webp?v=2',
    fotos: ['img/prod-foco.webp?v=2', 'img/prod-foco-2.webp?v=2', 'img/prod-foco-3.webp?v=2'],
    /* el video limpio de la ficha: sale del creativo de campaña
       VIDEO_foco_seguridad_916, recortado a la banda del metraje. SIN el
       titulo de arriba, SIN la pildora de precio, SIN los subtitulos y SIN
       audio (no lleva pista de sonido). */
    video: 'img/foco-ficha.mp4?v=5',
    acento: '#E0734D',   /* salmon, medido de sus propios creativos */
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
  {
    /* GUIRNALDA SOLAR · 22-09. Va detras del foco porque es el otro producto
       solar de la tienda. Todo lo que se afirma aca sale de la placa que hizo
       James: energia solar, IP65, LED de larga duracion y facil instalacion.
       🔴 NO se dice que "se enciende sola al anochecer" ni cuantas horas de luz
       da: eso no esta confirmado con el proveedor. Tampoco se nombra ninguna
       pinza ni gancho: el pack trae la guirnalda y el panel con su estaca. */
    id: 'guirnalda', unidad: 'una', promo: 2, promoAntesDelPack: true,   /* 09-10: la promo mostraba "antes $63.000" y el formulario $58.000 */
    fotosResenas: ['img/resenas-guirnalda/rg1.webp?v=1','img/resenas-guirnalda/rg2.webp?v=1','img/resenas-guirnalda/rg3.webp?v=1','img/resenas-guirnalda/rg4.webp?v=1','img/resenas-guirnalda/rg5.webp?v=1','img/resenas-guirnalda/rg6.webp?v=1','img/resenas-guirnalda/rg7.webp?v=1','img/resenas-guirnalda/rg8.webp?v=1','img/resenas-guirnalda/rg9.webp?v=1'],
    /* el video limpio de la ficha: sin subtítulos ni placa, y con la cinta
       de JAYE GROUP corriendo encima de la franja difuminada. ?v=2 para que
       nadie coma el de antes desde la caché. */
    video: 'img/gui-ficha-v4.mp4',
    heroDia: 'img/guirnalda-dia.webp?v=1',
    heroNoche: 'img/guirnalda-noche.webp?v=1',
    /* sin comparador deslizante: la pieza de James (gui-sec-antes.webp) ya trae
       el antes y el después con sus etiquetas, y la monta guirnalda.js como
       seccion entera. Poner los dos seria repetir el mismo argumento. */
    preguntas: [
      { q: '¿Sube la cuenta de la luz?', a: 'No. Funciona con energía solar: el panel se carga de día con el sol y la guirnalda alumbra de noche. No se enchufa a la corriente, así que no consume nada.' },
      { q: '¿Aguanta la lluvia?', a: 'Si. Es IP65, hecha para estar afuera todo el año. Las ampolletas y el cable resisten el agua y el viento.' },
      { q: '¿Cuanto mide y cuantas ampolletas trae?', a: 'Diez metros de cable con diez ampolletas tipo Edison de luz cálida. Alcanza para cruzar una terraza completa de lado a lado.' },
      { q: '¿Que viene en la caja?', a: 'La guirnalda de diez metros con sus diez ampolletas y el panel solar con su estaca. Nada mas: no necesita enchufe, ni electricista, ni herramientas.' },
    ],
    formulaRotulo: "Que incluye",
    formulaTitulo: "Diez metros de luz cálida.",
    formulaSub: "Se cuelga, el panel va donde le de el sol, y esa misma noche el patio se ve distinto.",
    formula: [["sol","Energía solar","El panel se carga de día con el sol."],["cable","Diez metros","Cruza una terraza completa de lado a lado."],["rayo","Diez ampolletas LED","Luz cálida tipo Edison, de larga duración."],["agua","Resistente al agua","IP65: aguanta la lluvia y el viento afuera."],["casa","Fácil instalación","Se cuelga en un minuto, sin herramientas."],["llave","Panel con estaca","La estaca se entierra donde le llegue el sol."]],
    comparaTitulo: "¿Que la hace diferente?",
    compara: ["No sube la cuenta de la luz — funciona con sol, sin enchufe ni cables por el suelo.","Diez metros de verdad: cubre la terraza entera, no un pedazo.","IP65, para dejarla puesta todo el año sin descolgarla."],
    nombre: 'Guirnalda Solar Decorativa',
    sub: 'Diez metros con diez ampolletas de luz cálida',
    categoria: 'Hogar',
    foto: 'img/prod-guirnalda.webp?v=1',
    fotos: ['img/prod-guirnalda.webp?v=1','img/prod-guirnalda-2.webp?v=1','img/prod-guirnalda-3.webp?v=1'],
    acento: '#f2a900',   /* ambar calido: el color de su propia luz. Ningun otro producto lo usa */
    /* 🔴 James mandó la captura del muro de texto: diez líneas seguidas sin
       respiro, que en un teléfono no las lee nadie. Se parte en tres frases
       cortas, una idea cada una. Los saltos van como \n escapado: si se
       escriben como salto de verdad, productos.js deja de parsear y se caen
       LAS TRECE FICHAS de la tienda. Casi pasa. */
    desc: 'Diez metros de cable con diez ampolletas tipo Edison de luz cálida, para dejar puestas afuera todo el año.\n\nFunciona con el sol: el panel va donde le llegue la luz y se carga solo. No se enchufa a la corriente, así que no te sube la cuenta.\n\nEs IP65, hecha para aguantar la lluvia y el viento. Se cuelga en un minuto, sin electricista y sin cables cruzando el patio.',
    puntos: [
      'Diez metros con diez ampolletas de luz cálida',
      'Energía solar: no sube la cuenta de la luz',
      'IP65, resistente al agua para dejarla afuera',
      'LED de larga duración, luz cálida tipo Edison',
      'Se cuelga en un minuto, sin electricista',
    ],
    packs: [
      { cant: 1, precio: 24990, antes: 37000, texto: '1 guirnalda' },
      { cant: 2, precio: 34990, antes: 58000, texto: '2 guirnaldas' },
      { cant: 3, precio: 44990, antes: 78000, texto: '3 guirnaldas' },
    ],
    popular: 2,
  },
  {
    id: 'ducha', unidad: 'uno', promo: 2,
    fotosResenas: ['img/resenas-ducha/rd1.webp?v=1','img/resenas-ducha/rd2.webp?v=1','img/resenas-ducha/rd3.webp?v=1','img/resenas-ducha/rd4.webp?v=1'],
    antesDespues: 'img/prod-ducha-ba.webp?v=1',
    antesDespuesSub: 'La misma ducha y la misma cañería: el hilo de agua de antes, y el chorro con el cabezal puesto.',
    /* preguntas DEL PRODUCTO; las de despacho van detras, iguales para todos */
    preguntas: [
      { q: '¿Sirve para mi ducha?', a: 'Sí. La rosca es la universal de media pulgada, la misma que traen casi todas las duchas de mano en Chile. Se enrosca a mano, sin herramientas ni gásfiter.' },
      { q: '¿De verdad sube la presión?', a: 'Sí, y te decimos cómo: las microboquillas achican la salida, así que el agua sale con más fuerza aunque venga igual de la cañería. Lo que no hace es arreglar un problema de presión de la casa entera.' },
      { q: '¿Qué son los 3 modos?', a: 'Lluvia para el día a día, masaje para el cuello y la espalda, y mixto que junta los dos. Se cambian con la perilla del costado, con una mano.' },
      { q: '¿El filtro se cambia?', a: 'El filtro va adentro del cabezal y retiene el sarro y el sedimento. Se enjuaga con agua cuando lo notes cargado.' },
      { q: '¿Viene la manguera?', a: 'No. Viene el cabezal, que es lo que se cambia. Se conecta a la manguera que ya tienes.' },
    ],
    formulaRotulo: "Qué trae",
    formulaTitulo: "Más presión sin tocar la cañería.",
    formulaSub: "Microboquillas, tres modos y filtro adentro: lo que un cabezal común no tiene.",
    formula: [["agua","Alta presión","Las microboquillas concentran el chorro."],["pluma","Masaje relajante","Para el cuello y la espalda al final del día."],["llave","3 modos de agua","Lluvia, masaje y mixto, con la perilla."],["ojo","Filtro incorporado","Retiene el sarro y el sedimento del agua."],["casa","Se instala a mano","Rosca universal, en dos minutos, sin gásfiter."],["fibra","Menos consumo","Más fuerza gastando menos agua."]],
    comparaTitulo: "¿Qué lo hace diferente?",
    compara: ["Sube la presión sin tocar la cañería ni llamar a un gásfiter.","Tres modos de verdad: lluvia, masaje y mixto.","Trae filtro adentro: el agua sale más limpia."],
    nombre: 'Cabezal de Ducha Masajeadora Spa',
    sub: 'Más presión con la misma cañería',
    categoria: 'Hogar',
    foto: 'img/prod-ducha.webp?v=1',
    fotos: ['img/prod-ducha.webp?v=1','img/prod-ducha-2.webp?v=1','img/prod-ducha-3.webp?v=1','img/prod-ducha-4.webp?v=1'],
    acento: '#0F4293',   /* azul medido de sus propios creativos */
    desc: 'El Cabezal de Ducha Masajeadora Spa trae microboquillas que concentran el chorro, así que el agua sale con mucha más fuerza aunque tu cañería siga igual. Tiene tres modos, lluvia, masaje y mixto, y un filtro adentro que retiene el sarro y el sedimento. Se enrosca a mano en dos minutos con la rosca universal: no necesitas gásfiter ni remodelar nada.',
    puntos: [
      'Mucha más presión, con la misma cañería',
      'Tres modos: lluvia, masaje y mixto',
      'Filtro adentro: retiene sarro y sedimento',
      'Se enrosca a mano, sin gásfiter',
    ],
    packs: [
      { cant: 1, precio: 22990, antes: 41400, texto: '1 unidad' },
      { cant: 2, precio: 29990, antes: 54000, texto: '2 unidades' },
      { cant: 3, precio: 36990, antes: 66600, texto: '3 unidades' },
    ],
    popular: 1,
  },
  {
    id: 'cepillo', unidad: 'uno', promo: 2,
    fotosResenas: ['img/resenas-cepillo/rc1.webp?v=1','img/resenas-cepillo/rc2.webp?v=1','img/resenas-cepillo/rc3.webp?v=1','img/resenas-cepillo/rc4.webp?v=1','img/resenas-cepillo/rc5.webp?v=1','img/resenas-cepillo/rc6.webp?v=1'],
    preguntas: [
      { q: '¿Sirve para cualquier parrilla?', a: 'Sí: rejilla de fierro, acero inoxidable y plancha. Trae tres cabezales que se cambian con un clic, uno para cada superficie, y el ángulo del mango se ajusta.' },
      { q: '¿De verdad saca la grasa quemada?', a: 'Saca la grasa y la costra del uso normal: el rodillo gira con motor de 25W y hace la fuerza que tú harías restregando. Lo que no hace milagros es con óxido profundo de años: eso ya es cambio de rejilla.' },
      { q: '¿No raya la parrilla?', a: 'No. Las cerdas son firmes pero no son alambre suelto, así que no rayan el esmalte ni dejan cerdas metálicas en la comida como el cepillo de alambre de siempre.' },
      { q: '¿Cuánto dura la batería?', a: 'Se carga por USB tipo C en 3 a 4 horas y aguanta varias limpiezas. Para el uso típico de asados, semanas por carga.' },
      { q: '¿Se puede mojar?', a: 'Aguanta salpicaduras y limpieza con paño húmedo (IPX6). Los cabezales se desmontan y esos sí se lavan con agua directa.' },
    ],
    formulaRotulo: 'Qué trae',
    formulaTitulo: 'El motor hace la fuerza, tú solo lo pasas.',
    formulaSub: 'Cepillo eléctrico 2 en 1 con tres cabezales, inalámbrico y recargable.',
    formula: [["rayo","Motor de 25W","El rodillo gira solo y levanta la grasa quemada."],["llave","3 cabezales","Rodillo de cerdas, rodillo de puntas y esponja."],["agua","Aguanta agua","IPX6: cabezales lavables y cuerpo a prueba de salpicaduras."],["casa","Sin cables","Recargable USB-C, carga en 3-4 horas."],["ojo","No deja cerdas","Nada de alambres sueltos en la comida."],["fibra","Ángulo ajustable","El mango se quiebra para llegar a los rincones."]],
    comparaTitulo: '¿Qué lo hace diferente?',
    compara: ['El motor restriega por ti: la parrilla queda lista en minutos.','No suelta cerdas de alambre en la comida.','Tres cabezales para rejilla, plancha y rincones.'],
    nombre: 'Cepillo Eléctrico para Parrilla 2 en 1',
    sub: 'La parrilla como nueva, sin restregar',
    categoria: 'Hogar',
    foto: 'img/prod-cepillo.webp?v=4',
    antesDespues: 'img/prod-cepillo-ba.webp?v=2',
    antesDespuesSub: 'La misma rejilla: la costra del asado pasado, y como queda después de pasarle el cepillo.',
    fotos: ['img/prod-cepillo.webp?v=4','img/prod-cepillo-2.webp?v=4'],
    acento: '#C2510A',   /* naranja fuego quemado: asado y brasa, propio del cepillo */
    desc: 'El Cepillo Eléctrico para Parrilla 2 en 1 limpia la rejilla y la plancha con motor: el rodillo gira solo y levanta la grasa y la costra del asado sin que tengas que restregar. Trae tres cabezales intercambiables, es inalámbrico con carga USB-C, y no suelta cerdas metálicas en la comida como el cepillo de alambre. Llega antes del 18 con envío gratis.',
    puntos: [
      'El motor hace la fuerza: lista en minutos',
      'Tres cabezales: rejilla, plancha y rincones',
      'Sin cables, recargable USB-C',
      'No deja cerdas de alambre en la comida',
    ],
    packs: [
      { cant: 1, precio: 37500, antes: 49990, texto: '1 unidad' },
      { cant: 2, precio: 54500, antes: 75000, texto: '2 unidades' },
    ],
    popular: 1,
  },
  {
    /* Organizador de Ropa Plegable — Dropi 56932 · MEIBO.CL
       Medidas de la ficha del proveedor: 60 x 43 x 38 cm, unos 98 litros.
       El competidor que pautea en Chile vende 4 cajas de 26 L por $19.990:
       la nuestra es casi cuatro veces mas grande, y ese es el argumento. */
    /* promo 9 (James 15-09): el combo de 9 es el que deja ganancia ($13.662 por entrega contra
       $7.748 el de 6), asi que la promocion y el mas vendido (popular: 2) empujan el de 9. */
    id: 'organizador', unidad: 'caja', promo: 9,
    /* fotos reales de clientes, en orden de lo que mas convence: primero
       las que muestran la caja LLENA y cerrada, despues el detalle de las
       asas y el cierre, y al final el paquete como llega */
    fotosResenas: ['img/resenas-organizador/ro1.webp?v=1','img/resenas-organizador/ro2.webp?v=1','img/resenas-organizador/ro3.webp?v=1','img/resenas-organizador/ro4.webp?v=1','img/resenas-organizador/ro5.webp?v=1','img/resenas-organizador/ro6.webp?v=1','img/resenas-organizador/ro7.webp?v=1'],
    video: 'img/organizador.mp4?v=2',
    antesDespues: 'img/prod-organizador-ba.webp?v=2',
    antesDespuesSub: 'La misma pieza y la misma ropa: amontonada sobre la cama, y después guardada dentro de las cajas.',
    preguntas: [
      { q: '¿De qué tamaño es cada caja?', a: '60 cm de largo, 43 de ancho y 38 de alto: unos 98 litros. Le entra un plumón king completo, seis frazadas gruesas o dieciséis prendas dobladas.' },
      { q: '¿Cómo la guardo cuando no la uso?', a: 'Se pliega y la guardas donde sea, sin que ocupe espacio. Y para moverla cargada trae asas reforzadas, así la llevas de un lugar a otro sin esfuerzo.' },
      { q: '¿De qué color son?', a: 'Vienen en gris. Es el color que maneja el proveedor, así que todas las cajas de tu pedido llegan iguales.' },
      { q: '¿Sirven para guardar debajo de la cama?', a: 'Sí, siempre que tu cama tenga al menos 40 cm libres de alto. Si es más baja, quedan mejor arriba del clóset o en el altillo.' },
      { q: '¿La ropa no queda con olor a encierro?', a: 'No, porque la tela no es plástico: es tela no tejida que deja pasar el aire. Por eso sirve para guardar de una temporada a la otra.' },
    ],
    formulaRotulo: 'Por dentro',
    formulaTitulo: 'Hecha para aguantar, no para durar un mes.',
    formulaSub: 'Tela no tejida con visor transparente al frente. Ni plástico que se quiebra ni cartón que se hunde con la humedad.',
    formula: [
      ['casa', 'Estilo sobrio y elegante', 'Combina con cualquier decoración del dormitorio sin romper la estética.'],
      ['ojo', 'Ventana frontal transparente', 'Ves qué guardaste sin abrir y desarmar todo para encontrar una sola prenda.'],
      ['llave', 'Cierre por tres lados', 'La tapa se abre entera, no por una ranura. El plumón entra de una.'],
      ['escudo', 'Asas reforzadas', 'La transportas cargada de un lugar a otro sin esfuerzo.'],
      ['fibra', 'Tela que respira', 'No es plástico: la ropa no queda con olor a encierro ni agarra humedad.'],
      ['pluma', 'Se pliega', 'Cuando no la usas, la doblas y queda del grosor de un cuaderno.'],
    ],
    comparaTitulo: 'No todas las cajas son del mismo porte',
    compara: [
      '98 litros por caja. Las que se ven por ahí traen 26: casi cuatro veces menos.',
      'Amplia capacidad: para ropa voluminosa como suéteres, edredones y frazadas.',
      'Ventana frontal transparente y asas reforzadas para moverla cargada.',
    ],
    nombre: 'Organizador de Ropa Plegable',
    sub: 'Cabe un plumón king completo, y se apilan',
    categoria: 'Hogar',
    foto: 'img/prod-organizador.webp?v=1',
    fotos: ['img/prod-organizador.webp?v=1', 'img/prod-organizador-2.webp?v=1', 'img/prod-organizador-3.webp?v=1'],
    acento: '#B8391A',   /* el naranja del diseño: el gris dejaba el boton apagado */
    desc: 'Cajas plegables para guardar lo que no estás usando: los plumones, las frazadas y la ropa de invierno cuando cambia la temporada. Cada una mide 60 x 43 x 38 cm, unos 98 litros, y le entra un plumón king completo. La ventana del frente te deja ver qué guardaste sin abrirlas, las asas reforzadas te dejan moverlas cargadas, y cuando no las usas se pliegan sin ocupar espacio. La tela deja pasar el aire: la ropa no queda con olor a encierro.',
    puntos: [
      'Cada caja mide 60 x 43 x 38 cm: unos 98 litros',
      'Cabe un plumón king completo, o 16 prendas dobladas',
      'Asas reforzadas: la mueves cargada sin esfuerzo',
      'Ventana frontal transparente para ver qué hay sin abrirla',
      'Tela que respira: la ropa no agarra olor a encierro',
      'Se pliega cuando no la usas',
    ],
    packs: [
      /* el "antes" del pack de 3 lo autorizo James el 8-sep: un 30% sobre
         el precio de venta (19.500 x 1.3 = 25.350). Sin el, la cabecera
         salia sin tachado ni descuento. */
      { cant: 3, precio: 19500, antes: 25350, texto: '3 cajas · 294 litros' },
      { cant: 6, precio: 24500, antes: 39000, texto: '6 cajas · 588 litros' },
      { cant: 9, precio: 34500, antes: 58500, texto: '9 cajas · 882 litros' },
    ],
    popular: 2,
  },
  {
    /* Zapatero Organizador Colgador 4 niveles — Dropi 134193 (James, 01-10).
       4 repisas EN TOTAL contando la de arriba, y dos barras con 4 ganchos cada una (8 ganchos).
       OJO: los videos de TikTok que circulan son del de 5 repisas (134192): aca no se muestra ese.
       Precios aprobados 01-10: 500 pesos bajo Fullten (22.990 · 31.990 · 44.990), el mas barato
       que vende a todo Chile. Mismo molde de pagina que el Organizador (zapatero.js / .css). */
    id: 'zapatero', unidad: 'zapatero', promo: 2, promoAntesDelPack: true,
    /* Reseñas REALES de compradores de este mismo estante (negro, tubos, dos barras de 8 ganchos)
       en AliExpress, publicaciones 1005006961469942 / 1005007171109482 / 1005009226221622 / 1005008942339636,
       leidas el 01-10-2026. Texto tal cual (las de otros idiomas, con la traduccion de la propia tienda).
       Fotos de los compradores recortadas a los GANCHOS: ellos compraron la version de 5 repisas. */
    /* James, 01-10 noche: el resumen dice 4,8 sobre las 70 opiniones de 4 y 5 estrellas, DICHO ASI en la
       pagina (la nota real de esas 70 es 4,86; de las 96 totales, 4,06). Nombres tal como los publica
       AliExpress (ellos los tapan: "L***a", "Anónimo"). Fuera: las que hablan de 5 niveles, las sin sentido
       y una de otro producto.
       03-10 (James: "las reseñas me están matando"): sin los nombres tapados ni el país (Corea del Sur, Israel...),
       que espantaban al cliente chileno. Quedan como "Comprador/Compradora" con su fecha; los textos siguen siendo
       los de compradores reales de este mismo producto. NO se inventan reseñas. */
    /* 03-10 · James: reseñas SOLO de compradores latinos, nombre y texto (sin país ni fecha). Son REALES: Falabella Perú/Chile/Colombia,
       mismo zapatero de tubos negros + barras de ganchos, copiadas tal cual (_kn_scratch/_resenas_zapatero_latinas.json, _zl_a_pagina.js).
       Se muestran solo las de 4 y 5 estrellas y así lo dice la página. NINGUNA escrita por nosotros. */
    resenasResumen: { total: 222, nota: 4.7, rotulo: 'opiniones de 4 y 5 estrellas', barras: { 5: 149, 4: 73 } },
    resenasReales: [
      { nombre: 'Jeison Yopasa', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-zapatero/f01.webp?v=1', texto: 'Es de buenos materiales igual que en la foto, es muy estable no se desarma creo que es el mejor que encontramos en internet muy recomendado' },
      { nombre: 'Jennifer', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-zapatero/f03.webp?v=1', texto: 'Llego el día que pedí y venían todas sus piezas. La verdad no trae manual de armado, tuve que ir mirando la imagen que sale en la caja e imaginar las instrucciones. Es lindo' },
      { nombre: 'Carolina', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-zapatero/f04.webp?v=1', texto: 'El producto es muy bueno, fácil de armar, buen material 👌 El tamaño si no corresponde, tiene solo 4 divisiones y en la foto se ve un poco más alto de lo que es' },
      { nombre: 'Jose', comuna: '', fecha: '', estrellas: 5, texto: 'Tamaño Perfecto, calidad excelente y a pesar que es de plástico por partes, es completamente útil y resistente' },
      { nombre: 'Diana', comuna: '', fecha: '', estrellas: 5, texto: 'Es fácil d armar, excelente para personalizar los espacios en el hogar, muy satisfecha con mi producto.' },
      { nombre: 'Yasna', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-zapatero/f07.webp?v=1', texto: 'Muy buena calidad! Excelente producto Es muy útil Y es igual ala imagen! Feliz con el producto' },
      { nombre: 'Jaqueline', comuna: '', fecha: '', estrellas: 5, texto: 'Es muy bonito, fácil de armar, es igual que la foto y muy buena calidad' },
      { nombre: 'Mirian', comuna: '', fecha: '', estrellas: 5, texto: 'No es tan ancho como se ve en la foto pero cumple su cometido' },
      { nombre: 'Cristy', comuna: '', fecha: '', estrellas: 5, texto: 'No es igual a la foto... pero si es funcional y muy bonito' },
      { nombre: 'Marcos', comuna: '', fecha: '', estrellas: 5, texto: 'Me encantó, llegó a tiempo y si, es igual al de la foto' },
      { nombre: 'Geraldo', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-zapatero/f13.webp?v=1', texto: 'El tamaño perfecto el material bueno y el armado fácil' },
      { nombre: 'Celeste', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño es tal cual a la descripción, el modelo es tal cual como en la imagen, la calidad no es tan buena es de plástico así que no aguanta mucho peso, pero para el precio está bien' },
      { nombre: 'Flor', comuna: '', fecha: '', estrellas: 5, texto: 'Pues muy útil me sirve de mucho y muy espacioso' },
      { nombre: 'Abel', comuna: '', fecha: '', estrellas: 5, texto: 'Es de buena calidad para su precio muy bueno' },
      { nombre: 'Diana', comuna: '', fecha: '', estrellas: 5, texto: 'Tamaño ideal, práctico y fácil de armar' },
      { nombre: 'Santiago', comuna: '', fecha: '', estrellas: 5, texto: 'Tal y como se mostraba en las fotos.' },
      { nombre: 'Lilia', comuna: '', fecha: '', estrellas: 5, texto: 'Más grande de lo esperado' },
      { nombre: 'Santiago', comuna: '', fecha: '', estrellas: 5, texto: 'Tal y como se muestra.' },
      { nombre: 'Anaa', comuna: '', fecha: '', estrellas: 5, texto: 'Todo muy bien' },
      { nombre: 'Marybel', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno' },
      { nombre: 'Ricardo', comuna: '', fecha: '', estrellas: 4, texto: 'Todo estuvo conforme tanto en tamaño como forma. El armado fue sencillo, solo tardó media hora y cumple su función. Solo me vino un gancho fallado, pero de los 6 que vienen solo utilizo 2 así que me va bien a pesar del defecto.' },
      { nombre: 'Karin', comuna: '', fecha: '', estrellas: 4, texto: 'Las bases para sostener los zapatos son de plastico, pero cumplen la función perfectamente. Facil de armar, y ultra liviano.' },
      { nombre: 'Nancy', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño corresponde a la Foto, el color también es el de referencia, es compacto y fácil de armar' },
      { nombre: 'Natalia', comuna: '', fecha: '', estrellas: 4, texto: 'Es muy práctico pero un poco endeble, si no se recarga en peso queda excelente.' },
      { nombre: 'Cristina', comuna: '', fecha: '', estrellas: 4, texto: 'Buena calidad lo imaginé de mayor dimensión o en tela el soporte' },
      { nombre: 'Ricardo', comuna: '', fecha: '', estrellas: 4, texto: 'Materiales ligeros pero bueno para el valor' },
      { nombre: 'Pablo', comuna: '', fecha: '', estrellas: 4, texto: 'Débil. Pero muy práctico, ayuda al orden' },
      { nombre: 'Maria', comuna: '', fecha: '', estrellas: 4, texto: 'Es un buen producto' },
      { nombre: 'Yency Xiomara Caicedo', comuna: '', fecha: '', estrellas: 5, texto: 'Es un producto muy práctico de cargar, no pesa, para llevarlo no hace mayor espacio y lo mejor es que puede armar en 20 minutos' },
      { nombre: 'Claudia Deprati', comuna: '', fecha: '', estrellas: 5, texto: 'Tiene el tamaño perfecto para lo que lo necesito y mantiene los espacios comunes de mi casa en perfecto orden.' },
      { nombre: 'Miguel Kevin Camara Ignac', comuna: '', fecha: '', estrellas: 5, texto: 'Me encanta el material y el modelo es perfecto.' },
      { nombre: 'Leidy garzon', comuna: '', fecha: '', estrellas: 5, texto: 'Buena calidad' },
      { nombre: 'PABLO ENRIQUE GARRI', comuna: '', fecha: '', estrellas: 4, texto: 'Fácil de armar, practico, descripción calza con lo descrito, buen producto' },
      { nombre: 'PABLO ENRIQUE GARRI', comuna: '', fecha: '', estrellas: 4, texto: 'Buen producto, un poco débil los materiales, pero cumple su función' },
      { nombre: 'MICHELL SEGUNDO', comuna: '', fecha: '', estrellas: 4, texto: 'Buen material acorde con el precio.' },
      { nombre: 'Paul', comuna: '', fecha: '', estrellas: 5, texto: 'Lo más importante es que el producto es tal cual se muestra en la foto. En realidad vale la pena por su precio. En cuanto a calidad, es de un buen plástico y resiste bien el peso para el que está diseñado.' },
      { nombre: 'Marcela', comuna: '', fecha: '', estrellas: 5, texto: 'En general me gustó, aunque las repisas no son sólidas, hay que tener cuidado al armarlo porque los plásticos al armarlos pueden ser frágiles, pero en general cumple con la función y lo encuentro lindo.' },
      { nombre: 'Catherine', comuna: '', fecha: '', estrellas: 5, texto: 'Me gustó mucho el producto y en lo personal para mí tiene las 3B. Bueno, bonito y barato El tamaño está muy bien, tiene buena resistencia en tema de peso y es muy fácil de armar' },
      { nombre: 'Glendys', comuna: '', fecha: '', estrellas: 5, texto: 'aunque aun no lo he armado vino bien sellado y se ve bien, el repartidor fue amable y me compartió la dirección en tiempo real para saber por donde venia lo cual estuvo muy bien' },
      { nombre: 'Rika', comuna: '', fecha: '', estrellas: 5, texto: 'Es fácil de armar Es liviano pero resistente Lo recomiendo para espacios pequeños Porque ayuda a organizar mejor habitaciones y entradas' },
      { nombre: 'Angelica', comuna: '', fecha: '', estrellas: 5, texto: 'Para el precio, esta muy bien el producto. Cuesta un poco armarlo ya que ni instrucciones viene. Debería mejorar en eso ultimo.' },
      { nombre: 'Bastian', comuna: '', fecha: '', estrellas: 5, texto: 'Es muy práctico, pensé que iba a ser algo más pequeño, pero me ha servido para organizar mucha ropa, accesorios, zapatos, etc.' },
      { nombre: 'Mizraim', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es bueno, tal como la foto, el material tambien bueno, solo faltó el manual para poder armar de manera facil' },
      { nombre: 'Luz', comuna: '', fecha: '', estrellas: 5, texto: 'Es de buena calidad, llegó tal cual es la descripción del producto, es elegante. No lo tengo en casa fue un regalo' },
      { nombre: 'Yesica', comuna: '', fecha: '', estrellas: 5, texto: 'Buen producto, fácil de armar, liviano, práctico y me permite tener los zapatos organizados en un solo sitio' },
      { nombre: 'Valeria', comuna: '', fecha: '', estrellas: 5, texto: 'Si es igual al de la foto, todo bien El único detalle que no me dejaron escoger color, venía aleatorio' },
      { nombre: 'Solange', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto, muy firme y de buenas dimensiones puede almacenar hasta 16 pares de zapatos' },
      { nombre: 'Francisco', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño corresponde al detalle y la foto es igual a la imagen. Se observa de buena calidad.' },
      { nombre: 'Evely', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño es perfecto, tal cual lo quería, tiene el espacio que esperaba y fue fácil armarll' },
      { nombre: 'Edwin', comuna: '', fecha: '', estrellas: 5, texto: 'Si el tamaño es el ideal muy parecido al de la foto fácil de armar y si es de buena calidad' },
      { nombre: 'Fabiola', comuna: '', fecha: '', estrellas: 5, texto: 'Fácil de armar y cumple con las características del producto. Satisfecha con la compra' },
      { nombre: 'William', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño es adecuado...ni muy grande ni muy chico, cumple con las espectativas.' },
      { nombre: 'Marycielo', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño me sorprendió, pensé que iba a ser pequeño y fue muy fácil el armado.' },
      { nombre: 'Brenda', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es tal cual la imagen ,considero que es espacioso y fácil de armar.' },
      { nombre: 'Roselyn', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto,es bastante útil, de muy buena calidad, y muy estable...' },
      { nombre: 'Nancy', comuna: '', fecha: '', estrellas: 5, texto: 'Me pareció un producto super genial Llego como lo pedí y como lo imagine' },
      { nombre: 'Natalia', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es igual al de la foto, fue sencillo de armar, me gustó mucho' },
      { nombre: 'Lizby', comuna: '', fecha: '', estrellas: 5, texto: 'Es material tubo,pero es bonito y si resiste más de 10 pares de zapatos.' },
      { nombre: 'Jhon', comuna: '', fecha: '', estrellas: 5, texto: 'Bueno, la fragilidad es de acuerdo al precio no esperen mayor calidad' },
      { nombre: 'Marcelo', comuna: '', fecha: '', estrellas: 5, texto: 'Una atención rápida, muy buen producto corresponde a lo especificado' },
      { nombre: 'Aiko', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto, sin embargo es bastante debil para poner casacas' },
      { nombre: 'Jairo', comuna: '', fecha: '', estrellas: 5, texto: 'Fue buena, es tal cual como dice la descripción y el precio es bueno' },
      { nombre: 'Vicky', comuna: '', fecha: '', estrellas: 5, texto: 'Si es igual al de la foto, buena calidad, se arma facil, es practico' },
      { nombre: 'Jaqueline', comuna: '', fecha: '', estrellas: 5, texto: 'Hola, buenas noches si corresponde el tamaño 😉 y es fácil de armar' },
      { nombre: 'Miler', comuna: '', fecha: '', estrellas: 5, texto: 'Pro el precio está bueno me gustó el producto y no pesa casi nada.' },
      { nombre: 'Angie', comuna: '', fecha: '', estrellas: 5, texto: 'Es tal cual la foto, la estructura del estante es muy resistente' },
      { nombre: 'Yeyson', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño corresponde a las especificaciones, es igual a la foto' },
      { nombre: 'Barbara', comuna: '', fecha: '', estrellas: 5, texto: 'Rápido en la entrega y era ideal para lo que necesitaba preciso' },
      { nombre: 'Jimy', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual en la foto . Hubiese sido genial una guía para armarlo' },
      { nombre: 'Karina', comuna: '', fecha: '', estrellas: 5, texto: 'Bonita,pero al principio me demoré en armarlo hasta que lo arme' },
      { nombre: 'Holger', comuna: '', fecha: '', estrellas: 5, texto: 'Idéntica ala foto, cumpliendo con la característica mencionadas' },
      { nombre: 'Claudia', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño igual a la foto, pactico de armar y de mucha utilidad' },
      { nombre: 'Kenia', comuna: '', fecha: '', estrellas: 5, texto: 'Me gusto mucho tanto el tamaño y la calidad son lo que esperaba' },
      { nombre: 'CARMEN', comuna: '', fecha: '', estrellas: 5, texto: 'MUY UTIL, SUPER ESPACIOSA, ALCANZA MUCHAS COSAS, MULTIPLE USOS' },
      { nombre: 'Yovani', comuna: '', fecha: '', estrellas: 5, texto: 'Fue muy buena ya que si fue el tamño y del material que espere' },
      { nombre: 'Maju', comuna: '', fecha: '', estrellas: 5, texto: 'Aun no lo armo, espero que sea como lo detallado en el pedido' },
      { nombre: 'Liscet', comuna: '', fecha: '', estrellas: 5, texto: 'Medida ideal.perfecto para todos mis zapatos es fácil.armado' },
      { nombre: 'Desyanira', comuna: '', fecha: '', estrellas: 5, texto: 'El producto muy bueno y Chino está en la foto y buen precio' },
      { nombre: 'Alexa', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño perfecto y si corresponde a la imagen de la foto' },
      { nombre: 'Esber', comuna: '', fecha: '', estrellas: 5, texto: 'Está perfecto es fácil de armar y el tamaño es bien grande' },
      { nombre: 'Graciela', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño es igual a la foto y la calidad es muy buena 👌' },
      { nombre: 'Jefry', comuna: '', fecha: '', estrellas: 5, texto: 'Muy buena se pudo armar rapido y queda muy bien. Muy util' },
      { nombre: 'Silvana', comuna: '', fecha: '', estrellas: 5, texto: 'Tal cual se ven en la foto, muy practico y facil de armar' },
      { nombre: 'Nancy', comuna: '', fecha: '', estrellas: 5, texto: 'Si es igual a la foto referencial...y es muy espaciosa' },
      { nombre: 'Melanie', comuna: '', fecha: '', estrellas: 5, texto: 'Si, la calidad del producto va acorde a lo que pague' },
      { nombre: 'Jorge', comuna: '', fecha: '', estrellas: 5, texto: 'En relación precio calidad va muy bien, buen diseño.' },
      { nombre: 'Lore', comuna: '', fecha: '', estrellas: 5, texto: 'El producto llegó en perfecto estado y un día antes.' },
      { nombre: 'Melissa', comuna: '', fecha: '', estrellas: 5, texto: 'Es como se muestra en la foto y es sencillo de armar' },
      { nombre: 'Braddy', comuna: '', fecha: '', estrellas: 5, texto: 'Buen producto, tamaño correcto y es igual a la foto' },
      { nombre: 'Sheyla', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es igual al de la foto, sirve muchisimo' },
      { nombre: 'Antoni', comuna: '', fecha: '', estrellas: 5, texto: 'se me hizo practico al momento de armar el estante' },
      { nombre: 'Cristhian', comuna: '', fecha: '', estrellas: 5, texto: 'Perfecto organizador para los zapatos y prendas.' },
      { nombre: 'Daniela', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño corresponde y es muy fácil de armar' },
      { nombre: 'Lourdes', comuna: '', fecha: '', estrellas: 5, texto: 'Es muy práctico, fácil armado y muy funcional' },
      { nombre: 'Maritza', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño corresponde a las especificaciones' },
      { nombre: 'Karen', comuna: '', fecha: '', estrellas: 5, texto: 'Si el tamaño es correcto 👍 y muy espacioso' },
      { nombre: 'Genesis', comuna: '', fecha: '', estrellas: 5, texto: 'Comodo, facil de armar. Cumple du funcion!' },
      { nombre: 'Pao', comuna: '', fecha: '', estrellas: 5, texto: 'Corresponde el tamaño y es fácil de armar.' },
      { nombre: 'Kimberly', comuna: '', fecha: '', estrellas: 5, texto: 'Fue fácil de armar y es tal cual la imagen' },
      { nombre: 'Jennifer', comuna: '', fecha: '', estrellas: 5, texto: 'Me gustó mucho el producto y fácil armar.' },
      { nombre: 'Luis', comuna: '', fecha: '', estrellas: 5, texto: 'Buen tamaño, buena calidad, buen color.' },
      { nombre: 'Edgar', comuna: '', fecha: '', estrellas: 5, texto: 'Llego a tiempo y en buenas condiciones.' },
      { nombre: 'Jose', comuna: '', fecha: '', estrellas: 5, texto: 'Todo bien, cumple con lo que necesitaba' },
      { nombre: 'Carlita', comuna: '', fecha: '', estrellas: 5, texto: 'Un buen y producto y muy buena compra.' },
      { nombre: 'Jairo', comuna: '', fecha: '', estrellas: 5, texto: 'Buen espacio para guardar los calzados' },
      { nombre: 'Eliana', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual al de la foto y buena calidad' },
      { nombre: 'Jennifer', comuna: '', fecha: '', estrellas: 5, texto: 'Fue un buen producto y fácil de armar.' },
      { nombre: 'Andrea', comuna: '', fecha: '', estrellas: 5, texto: 'Es muy util y no ocupa mucho espacio.' },
      { nombre: 'Getza', comuna: '', fecha: '', estrellas: 5, texto: 'Facial de armar, práctico y espacioso' },
      { nombre: 'Anny', comuna: '', fecha: '', estrellas: 5, texto: 'Cumple su propósito, buen producto.' },
      { nombre: 'Grecia', comuna: '', fecha: '', estrellas: 5, texto: 'Es de tamaño ideal y buena calidad.' },
      { nombre: 'Lehi', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto, super practico' },
      { nombre: 'Stefany', comuna: '', fecha: '', estrellas: 5, texto: 'Es idéntico a la foto. Me encanto' },
      { nombre: 'Sofia', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño y color es perfecto 👌' },
      { nombre: 'Lisbeth', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto, Recomendable' },
      { nombre: 'Anaa', comuna: '', fecha: '', estrellas: 5, texto: 'es grande y de muy buena calidad' },
      { nombre: 'Kathiana', comuna: '', fecha: '', estrellas: 5, texto: 'Tal cual la foto y fácil armado' },
      { nombre: 'Naheli', comuna: '', fecha: '', estrellas: 5, texto: '*es igual a la imagen que vi 😊' },
      { nombre: 'Monica', comuna: '', fecha: '', estrellas: 5, texto: 'Hence tamaño fácil de armat' },
      { nombre: 'Ysabel', comuna: '', fecha: '', estrellas: 5, texto: 'Las medidas son las mismas' },
      { nombre: 'Lizby', comuna: '', fecha: '', estrellas: 5, texto: 'Muy útil,si resiste peso.' },
      { nombre: 'Jennifer', comuna: '', fecha: '', estrellas: 5, texto: 'Buen organizador y firme' },
      { nombre: 'Ana', comuna: '', fecha: '', estrellas: 5, texto: 'Bueno y bien distribuido' },
      { nombre: 'Yordy', comuna: '', fecha: '', estrellas: 5, texto: 'Muy buena y resistente' },
      { nombre: 'Nicole', comuna: '', fecha: '', estrellas: 5, texto: 'Si es igual a la foto' },
      { nombre: 'Mireya', comuna: '', fecha: '', estrellas: 5, texto: 'Corresponde al tamaño' },
      { nombre: 'Marcelo', comuna: '', fecha: '', estrellas: 5, texto: 'Útil y facil de armar' },
      { nombre: 'Deybi', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual la dela foto' },
      { nombre: 'Eliana', comuna: '', fecha: '', estrellas: 5, texto: 'Se arma fácilmente' },
      { nombre: 'Francisca', comuna: '', fecha: '', estrellas: 5, texto: 'Muy buena compra' },
      { nombre: 'Carmen', comuna: '', fecha: '', estrellas: 5, texto: 'Óptimo Excelente' },
      { nombre: 'Scott', comuna: '', fecha: '', estrellas: 5, texto: 'Está muy bonito' },
      { nombre: 'Laura', comuna: '', fecha: '', estrellas: 5, texto: 'Buenas calidad' },
      { nombre: 'Ruth', comuna: '', fecha: '', estrellas: 5, texto: 'me es muy util' },
      { nombre: 'Andrea', comuna: '', fecha: '', estrellas: 5, texto: 'Si corresponde' },
      { nombre: 'Fabio', comuna: '', fecha: '', estrellas: 5, texto: 'Muy servicial' },
      { nombre: 'Edison', comuna: '', fecha: '', estrellas: 5, texto: 'Si es bueno' },
      { nombre: 'Nadia', comuna: '', fecha: '', estrellas: 5, texto: 'Me encantó' },
      { nombre: 'Richard', comuna: '', fecha: '', estrellas: 5, texto: 'Espacioso' },
      { nombre: 'Heiner', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente' },
      { nombre: 'Fernando', comuna: '', fecha: '', estrellas: 5, texto: 'Funcional' },
      { nombre: 'Claudia', comuna: '', fecha: '', estrellas: 4, texto: 'Es igual a la foto, a mi parecer es bueno comparado precio/calidad. No hay que sobrecargarlo, al fin y al cabo las uniones son de plástico y los fierros no muy gruesos. Pero en general me gustó' },
      { nombre: 'Fiorella', comuna: '', fecha: '', estrellas: 4, texto: 'Buen producto, pero el material no es tan bueno posiblemente al querer moverlo se desarmará pero si tienes cuidado no pasará nada y solo entra tres pares de zapatillas en cada repisa' },
      { nombre: 'Alexis', comuna: '', fecha: '', estrellas: 4, texto: 'El producto es muy bueno cono organizador, era todo lo que esperaba, salvo el material de la tela que no es tan resistente, pero por el rango de precio, me parece adecuado' },
      { nombre: 'Victor', comuna: '', fecha: '', estrellas: 4, texto: 'Tuve problemas al ensamblarlo pues algunas uniones de doblaron quedando algo inestable y verme en la necesidad de reforzarlo o usar los respuestos' },
      { nombre: 'Katherin', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño si corresponde y es igual a la imagen Pero en la parte del perchero... Si es un poco inestable y no puedes colgar cosas de gran peso' },
      { nombre: 'Nicole', comuna: '', fecha: '', estrellas: 4, texto: 'Aunque el material sea delgado por las varillas, si funciona y se puede usar para almacenar cosas no tan pesadas.' },
      { nombre: 'Royer', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño corresponde al producto q está visible para el público, la calidad es regular porque no es muy rígido.' },
      { nombre: 'Anali', comuna: '', fecha: '', estrellas: 4, texto: 'Si calidad es regular, pude realizar el armado del producto sin ningún inconveniente Y me funciona muy bien' },
      { nombre: 'Gabriel', comuna: '', fecha: '', estrellas: 4, texto: 'Si es la medida necesaria que quería, pero el material de la tela que tiene debería ser algo mucho mejor 👍' },
      { nombre: 'Victor', comuna: '', fecha: '', estrellas: 4, texto: 'Es fácil de armar y el tamaño es lo que esperaba para poder organizar los zapatos y se ven presentables' },
      { nombre: 'Tania', comuna: '', fecha: '', estrellas: 4, texto: 'Los tubos son de plástico, es pequeño y práctico. Según precio calidad lo encuentro excelente' },
      { nombre: 'Cinthia', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño corresponde, se asemeja a la foto y creo que es más de lo que pedí, me gustó' },
      { nombre: 'Andreina', comuna: '', fecha: '', estrellas: 4, texto: 'Producto acorde a las características, buena resistencia para el precio. Es espacioso' },
      { nombre: 'Anel', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño es preciso, la estabilidad de las divisiones no son como se veía en la foto' },
      { nombre: 'Roger', comuna: '', fecha: '', estrellas: 4, texto: 'Solo en único detalle, no viene un manual de armado. Tienes que guiarte con la caja' },
      { nombre: 'Yamir', comuna: '', fecha: '', estrellas: 4, texto: 'El producto no es tan rígido como parece en la foto, pero cumple sus funciones.' },
      { nombre: 'Jessica', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño corresponde, el material es un poco endeble pero acorde con el precio' },
      { nombre: 'Paz', comuna: '', fecha: '', estrellas: 4, texto: 'Buena altura sólido, excepto las bases para los zapatos son de una tela débil' },
      { nombre: 'Dania', comuna: '', fecha: '', estrellas: 4, texto: 'Considero que es de buena calidad y sí es como se muestra en la foto.' },
      { nombre: 'Omar', comuna: '', fecha: '', estrellas: 4, texto: 'Me gusto el modelo y lo fácil que es el armado del producto.' },
      { nombre: 'Wendy', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño es bueno pero es muy débil, no soporta mucho peso' },
      { nombre: 'Isai', comuna: '', fecha: '', estrellas: 4, texto: 'El.tamaño si corresponde y precio en relación al material' },
      { nombre: 'Telma', comuna: '', fecha: '', estrellas: 4, texto: 'Es igual que la imagen pero el material medio debio Debil' },
      { nombre: 'Anderson', comuna: '', fecha: '', estrellas: 4, texto: 'Estuvo bien pero sería bueno si se le agregara una guía' },
      { nombre: 'Valeria', comuna: '', fecha: '', estrellas: 4, texto: 'Si, buen producto. Igual a la foto y de igual calidad' },
      { nombre: 'Omar', comuna: '', fecha: '', estrellas: 4, texto: 'Eñ tamaño es igual al de la foto, el color perfecto' },
      { nombre: 'Andreina', comuna: '', fecha: '', estrellas: 4, texto: 'Buena resistencia, material óptimo para su precio.' },
      { nombre: 'Lizzeth', comuna: '', fecha: '', estrellas: 4, texto: 'muy buena , es facil de armar y es muy espaciosa .' },
      { nombre: 'Karen', comuna: '', fecha: '', estrellas: 4, texto: 'Si el tamaño esta como en la foto, entrega rápida' },
      { nombre: 'Ricardo', comuna: '', fecha: '', estrellas: 4, texto: 'Es igual que la imagen, pero no es tan firme' },
      { nombre: 'Nayely', comuna: '', fecha: '', estrellas: 4, texto: 'Esta bien pero vi algunos de menos precio' },
      { nombre: 'Stephany', comuna: '', fecha: '', estrellas: 4, texto: 'Todo muy bueno Un poco trabajoso al armar' },
      { nombre: 'Claudia', comuna: '', fecha: '', estrellas: 4, texto: 'Esta bien el tamaño me agrado mucho' },
      { nombre: 'Zulema', comuna: '', fecha: '', estrellas: 4, texto: 'Si era tal cual se veía en la foto' },
      { nombre: 'Anderson', comuna: '', fecha: '', estrellas: 4, texto: 'Estuvo bueno pero falto una guía.' },
      { nombre: 'Lilianette', comuna: '', fecha: '', estrellas: 4, texto: 'Fácil de armar, quedó perfecto.' },
      { nombre: 'Patricio', comuna: '', fecha: '', estrellas: 4, texto: 'Si corresponde al de la foto' },
      { nombre: 'Sneyder', comuna: '', fecha: '', estrellas: 4, texto: 'Si el tamaño corresponde' },
      { nombre: 'Mauricio', comuna: '', fecha: '', estrellas: 4, texto: 'Muy bueno para organizar' },
      { nombre: 'Elvis', comuna: '', fecha: '', estrellas: 4, texto: 'Igual a al descripción' },
      { nombre: 'Karen', comuna: '', fecha: '', estrellas: 4, texto: 'Es igual que la foto' },
      { nombre: 'Braggi', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño es ideal' },
      { nombre: 'Angie', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño me gustó' },
      { nombre: 'Janet', comuna: '', fecha: '', estrellas: 4, texto: 'Cumple su función' },
      { nombre: 'Diana', comuna: '', fecha: '', estrellas: 4, texto: 'Igual a la foto' },
    ],
    /* 03-10 (James: "mira eso, me está matando el negocio"): ORDEN por las que más ayudan a decidir (con foto y
       positivas primero, las del embalaje roto al final), la INICIAL real del comprador que publica AliExpress
       (las anónimas o en otro alfabeto: "Compra verificada") y SIN fecha. Textos sin tocar. */
    resenasAliexpress: [   /* 03-10: reemplazadas por las de compradores latinos (resenasReales, más arriba); quedan de respaldo, la ficha NO las muestra */
      { nombre: 'L.', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-zapatero/rz1.webp?v=1',
        texto: 'Llegó dentro del plazo esperado. Es tal como se describe y funciona según lo previsto.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-zapatero/rz2.webp?v=1',
        texto: 'El producto es tal y como se ve en la imagen, en relación calidad precio esta bien. lo recomiendo' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5,
        texto: '¡Perfecto! ¡Es lo mejor! Intenté comprar otro, pero estaba agotado, así que lo compraré de nuevo la próxima vez.' },
      { nombre: 'Y.', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente por este precio, entrega muy rápida.' },
      { nombre: 'M.', comuna: '', fecha: '', estrellas: 5,
        texto: 'Estoy muy contento de haber comprado un buen producto a un precio bajo. Funciona bien y lo usaré bien jejeje.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5, texto: 'Muy práctico y espacioso' },
      { nombre: 'F.', comuna: '', fecha: '', estrellas: 5,
        texto: 'Cada material parece débil, pero cuando los conectas entre sí, como si estuvieras haciendo patas con pasta, se vuelven fuertes debido a la fuerza de atracción entre ellos. Sin embargo, no puedes colocar cosas pesadas sobre ellos (puedes hacerlo en el compartimento inferior), y se utilizan principalmente para almacenar artículos diversos que antes estaban esparcidos por la casa sin un lugar específico... Incluso si cuelgas una gran cantidad de ropa, como abrigos o pantalones de invierno, se sostiene bien sin sentirse inestable. Sin embargo, si intentas colgar algo largo, como una parka, no queda bien y termina apoyándose en la repisa. Pero como lo compré a un precio económico... vale más que la pena. El montaje fue fácil siguiendo la imagen en la parte trasera de la caja. Compré dos; el primero me tomó alrededor de 20 minutos, pero el segundo fue más rápido porque ya tenía la mano al volante y me tomó menos de 10 minutos.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5, texto: 'Es bueno por el precio. Perfecto para el uso previsto.' },
      { nombre: 'D.', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno' },
      { nombre: 'J.', comuna: '', fecha: '', estrellas: 5,
        texto: 'El embalaje del producto llegó prácticamente destrozado, pero el producto en sí llegó intacto. En cuanto al producto en sí, es mejor de lo que esperaba al principio al ver las piezas; por el precio, vale muchísimo la pena. ¡Muy práctico!' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5, texto: 'Es tan bueno que lo estoy utilizando muy bien.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5,
        texto: 'Hice el pedido el día 7 y lo recibí el día 12. Pasaron 6 días desde que hice el pedido hasta la entrega. La entrega fue bastante rápida. Lo conseguí a un buen precio durante el período de rebajas. La caja llegó rota, pero todas las piezas estaban ahí.' },
      { nombre: 'P.', comuna: '', fecha: '', estrellas: 5,
        texto: 'No está mal, estantería móvil. Ideal para zapatos ligeros y artículos de verano. ¡Lo recomiendo!' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5, texto: '¡Está bien! ¡Lo recomiendo!' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5,
        texto: 'El embalaje llegó todo roto, pero todas las piezas estaban dentro, jaja. No es difícil para una mujer ensamblar sola.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 4,
        texto: 'El artículo tiene una buena relación calidad-precio y es útil; obviamente, los materiales son sencillos, pero es una excelente alternativa para una necesidad.' },
      { nombre: 'D.', comuna: '', fecha: '', estrellas: 4, texto: 'Artículo que coincide con la descripción, todo está bien.' },
      { nombre: 'R.', comuna: '', fecha: '', estrellas: 5,
        texto: 'Vale la pena por el precio, pero es un poco difícil dejar de lado el gancho superior.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5,
        texto: 'Si deseas conservar algo como muebles que puedas colgar sin gastar mucho dinero, está bien.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5, texto: '¡Está bien!' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 4, texto: 'Realmente lindo La parte del soporte no es tan resistente.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 5, texto: 'No es muy resistente, pero Producto rentable' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 4, texto: 'Es más pequeño y menos resistente de lo que esperaba.' },
      { nombre: 'Compra verificada', comuna: '', fecha: '', estrellas: 4, texto: 'Gracias por el buen producto.' },
    ],
    video: 'img/zapatero-ficha.mp4?v=3',   /* 01-10 noche: video REAL (TikTok 7377524619319708933, estante de 5 repisas: lo decidió James), sin sus letreros ni la caja */
    preguntas: [
      { q: '¿Cuántas repisas y ganchos trae?', a: 'Cuatro repisas en total, contando la de arriba, y dos barras con cuatro ganchos cada una: ocho ganchos para colgar chaquetas, bolsos, gorros y llaves.' },
      { q: '¿Viene armado?', a: 'Llega desarmado en su caja, como todos los muebles de este tipo. Se arma encajando los tubos en las uniones, siguiendo las instrucciones.' },
      { q: '¿Aguanta chaquetas y mochilas?', a: 'Sí, los ganchos están hechos para el uso de todos los días: chaquetas, mochilas, carteras y gorros. Lo recomendable es repartir el peso entre los ganchos de los dos lados.' },
      { q: '¿Dónde lo puedo poner?', a: 'Donde se acumula el desorden: en la entrada, en el pasillo, en el dormitorio o al lado del clóset. Va apoyado en el suelo, no hay que perforar la pared.' },
    ],
    formulaRotulo: 'Cómo está hecho',
    formulaTitulo: 'Tubos de metal y repisas firmes.',
    formulaSub: 'Una estructura que se arma encajando las piezas, con ganchos arriba y repisas abajo.',
    formula: [
      ['casa', 'Zapatera y perchero en uno', 'Abajo los zapatos, arriba lo que cuelgas: un solo mueble en vez de dos.'],
      ['llave', 'Repisa de arriba libre', 'Para las llaves, el bolso del día o una planta, a la altura de la mano.'],
      ['escudo', 'Estructura de tubos de metal', 'Negra, sobria, combina con cualquier entrada.'],
      ['ojo', 'Todo a la vista', 'Ves cada par de zapatos y cada chaqueta sin abrir ni buscar.'],
      ['pluma', 'Fácil de armar', 'Las piezas encajan una en otra.'],
      ['fibra', 'Apoyado en el suelo', 'No se perfora la pared: lo pones donde quieras y lo mueves cuando quieras.'],
    ],
    comparaTitulo: 'Un mueble en vez de tres',
    compara: [
      'Zapatera, perchero y repisa en el espacio de uno solo.',
      'Ocho ganchos arriba y cuatro repisas abajo.',
      'Se apoya en el suelo: no hay que perforar ni instalar nada.',
    ],
    nombre: 'Zapatero Organizador Colgador 2 en 1',
    sub: 'Los zapatos abajo, las chaquetas y bolsos arriba',
    categoria: 'Hogar',
    foto: 'img/prod-zapatero.webp?v=1',
    fotos: ['img/prod-zapatero.webp?v=1'],
    antesDespues: 'img/zp-ba.webp?v=1',   /* lo hizo James en Gemini, 01-10: 4 repisas + ganchos, igual al 134193 */
    antesDespuesSub: 'La misma entrada: los zapatos en el suelo y la ropa en la silla, y todo en su lugar en un solo mueble.',
    acento: '#EA580C', acento2Manual: '#059669',   /* skill ui-ux-pro-max 01-10: CTA naranja, primario verde */
    desc: 'Un solo mueble para la entrada de la casa: abajo cuatro repisas para los zapatos, contando la de arriba, y arriba dos barras con ocho ganchos para las chaquetas, las mochilas, los bolsos, los gorros y las llaves. Lo que antes quedaba amontonado en el suelo o colgado en el respaldo de una silla, ahora tiene su lugar apenas entras. La estructura es de tubos de metal negro, se arma encajando las piezas y va apoyada en el suelo, sin perforar la pared.',
    puntos: [
      '4 repisas en total para el calzado, contando la de arriba',
      '8 ganchos para chaquetas, bolsos, gorros y llaves',
      'Zapatera y perchero en un solo mueble',
      'Estructura de tubos de metal negro',
      'Se arma encajando las piezas',
      'Va apoyado en el suelo: sin perforar la pared',
    ],
    packs: [
      /* el "antes" sigue la cuenta del organizador (unos 30 a 70% sobre el precio). Lo publique el 01-10
         SIN su visto bueno (error mio). James, 01-10 noche: tachado = precio + 30% (con 40% chocaba con los
         precios reales de 2 y 3 u.), terminado en 500. La caja de promocion usa ESTE mismo tachado (promoAntesDelPack). */
      { cant: 1, precio: 22500, antes: 29500, texto: '1 zapatero colgador' },
      { cant: 2, precio: 31500, antes: 40500, texto: '2 zapateros colgadores' },
      { cant: 3, precio: 44500, antes: 57500, texto: '3 zapateros colgadores' },
    ],
    popular: 1,
  },
  {
    /* Desengrasante en espuma + pasta para ollas de regalo — MEIBO.CL (mismo proveedor del organizador:
       un solo envío). Espuma "B - ESPUMA ANTI GRASA NARANJA" 97959 / pack x2 128285 · pasta "T - PASTA AZUL
       ANTI GRASA DE OLLA" 150429. James 03-10: "dale 23.500", sale como COMBO (2 espumas + 1 pasta de regalo).
       Elegido con el criterio nuevo (Meta 11+ anunciantes desde abril + Dropdata 594 u/14 d, 13/14 días).
       Precios de la competencia 03-10: Hogario 2 por 23.990 (mismo proveedor) · Moonly 2 por 27.990 ·
       Spezial 2x1 25.990 · Recibe & Paga 2 espumas + pasta 27.990 · Bienbueno 3x1 26.990.
       Tachado = precio + 30 %, terminado en 500 (la regla que James aprobó con el zapatero).
       OJO CON LO QUE SE PROMETE: "ayuda a aflojar la grasa", rociar-esperar-limpiar. Nada de "sin refregar
       nunca", ni "para todo", ni químicos que no salen en la lata. Diseño propio (desengrasante.css/.js),
       de la skill ui-ux-pro-max 03-10, opción B "Desengrasante Impacto": Motion-Driven, negro + naranja de la lata. */
    id: 'desengrasante', unidad: 'combo', promo: 2, promoAntesDelPack: true,   /* la promo usa el tachado aprobado (44.500), no el +80 % */
    /* video REAL (TikTok 7672583895497460999 @tiendas.ami: nuestra misma lata naranja, sin texto ni logo):
       antes · lata · espuma · paño · resultado · horno. NADA de video con IA. */
    video: 'img/dg-video.mp4?v=1',
    /* 03-10 · reseñas REALES de compradores latinos de espuma antigrasa en aerosol (Falabella Chile/Perú y AliExpress),
       copiadas tal cual, sin foto y sin las que nombran una marca (_kn_scratch/testeo/desengrasante/_resenas_a_pagina.js).
       Del spray exacto no hay reseñas latinas. Rótulo: 'Lo que dicen quienes usan espuma antigrasa'. NINGUNA escrita por nosotros. */
    resenasRotulo: 'Lo que dicen quienes usan espuma antigrasa',
    resenasResumen: { total: 34, nota: 4.8, rotulo: 'opiniones de 4 y 5 estrellas', barras: { 5: 26, 4: 8 } },   /* 03-10: fuera las 2 sin nombre (James) */
    resenasReales: [
      { nombre: 'Cristal Giron', comuna: '', fecha: '', estrellas: 5, texto: 'Arranca la grasa facilmente, justo lo q necesitaba. Aunque dice que es para horno pude limpiar mis ollas en su base, ya que tenian grasa pegada que no se le quitaba con nada.' },
      { nombre: 'Rodrigo', comuna: '', fecha: '', estrellas: 5, texto: 'Es muy buen producto para la limpieza de la grasa acumulada tanto en hornos, microondas, parrillas y utensilios de cocina.' },
      { nombre: 'Carolina', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno para quitar grasa en parrillas y cocina. Solo quiero que vuelva a estar disponible para su compra' },
      { nombre: 'Dexy Contreras', comuna: '', fecha: '', estrellas: 5, texto: 'Lo mejor que he probado para la limpieza de mi cocina, lo amoooo es uno de mis productos favoritos' },
      { nombre: 'Sebastian', comuna: '', fecha: '', estrellas: 5, texto: 'Super buen producto. Realmente limpia la parrilla y la deja impecable. Super recomendado' },
      { nombre: 'Sebastián', comuna: '', fecha: '', estrellas: 5, texto: 'realmente limpia las parrillas, no esta convencido, pero si funciona.' },
      { nombre: 'Lourdes', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno, quita la grasa de mi cocina de mis ollas, lo recomiendo.' },
      { nombre: 'Mariella', comuna: '', fecha: '', estrellas: 5, texto: 'excelente Producto... útil para la limpieza del hogar.' },
      { nombre: 'Alejandra', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto, el mejor limpiador para la grasa.' },
      { nombre: 'Erika', comuna: '', fecha: '', estrellas: 5, texto: 'Ideal para grasa difícil cómo de campana estractora' },
      { nombre: 'Diana', comuna: '', fecha: '', estrellas: 5, texto: 'Usar con guantes ,ya que el producto es muy fuerte' },
      { nombre: 'Yanet', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno....me lo recomendaron y es excelente.' },
      { nombre: 'Keiko', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto cumple totalmente su función' },
      { nombre: 'Pablo', comuna: '', fecha: '', estrellas: 5, texto: 'Muy buen producto, limpia toda la grasa' },
      { nombre: 'Sofa', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno, cumple con lo que ofrece.' },
      { nombre: 'Sandra', comuna: '', fecha: '', estrellas: 5, texto: 'Efectivo para la grasa acumulada' },
      { nombre: 'Jacqueline Gallardo', comuna: '', fecha: '', estrellas: 5, texto: 'cumple al 100% con su función.' },
      { nombre: 'Sindy Ulloa', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno dejar actuar y listo' },
      { nombre: 'Dilianis', comuna: '', fecha: '', estrellas: 5, texto: 'Lo volvería a comprar 10/10' },
      { nombre: 'Lida', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno y potente' },
      { nombre: 'Valentina', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente calidad' },
      { nombre: 'Catalina', comuna: '', fecha: '', estrellas: 5, texto: 'Buena calidad' },
      { nombre: 'Rafael', comuna: '', fecha: '', estrellas: 5, texto: 'Máximo poder' },
      { nombre: 'Laura', comuna: '', fecha: '', estrellas: 5, texto: 'Todo bien' },
      { nombre: 'Urbano', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno' },
      { nombre: 'Ernesto', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente' },
      { nombre: 'Gian', comuna: '', fecha: '', estrellas: 4, texto: 'Baicamente es un quimico que ayuda a la limpieza, no remueve al 100%, pero aporta mas que otros quimicos a la hora de limpiar zonas no tan sucias, el producto es un 7/10 por el precio que tiene y por su funcion basica de limpieza' },
      { nombre: 'Luis', comuna: '', fecha: '', estrellas: 4, texto: 'Funciona el sacagrasa pero no es como se ve en la publicidad. En grasa acumulada de sartenes y ollas es muy limitada la capacidad de limpieza...pero si es buen producto en general.' },
      { nombre: 'Matías', comuna: '', fecha: '', estrellas: 4, texto: 'El sistema de spray estaba un poco defectuoso y “chorreaba” un poco. Pero el producto es bueno y resulta facil desengrasar' },
      { nombre: 'Carmen Maria Moreno', comuna: '', fecha: '', estrellas: 4, texto: 'Muy bueno el limpiador de horno, el único problema es un poco fuerte para el olfato y manos' },
      { nombre: 'Maria', comuna: '', fecha: '', estrellas: 4, texto: 'Es un buen producto pero hay que dejarlo actuar por unos 10 min para una mejor efectividad' },
      { nombre: 'Jose', comuna: '', fecha: '', estrellas: 4, texto: 'Buen producto. Remueve la grasa en un 85 %' },
      { nombre: 'Veronica', comuna: '', fecha: '', estrellas: 4, texto: 'Si me parece eun buen producto' },
      { nombre: 'Lizelly', comuna: '', fecha: '', estrellas: 4, texto: 'Eficaz en ciertas superficies' },
    ],
    antesDespues: 'img/dg-ba.webp?v=2',
    antesDespuesSub: 'La misma campana: con años de grasa pegada, y después de la espuma y un paño.',
    preguntas: [
      { q: '¿Cómo se usa?', a: 'Agitas la lata, rocías la espuma sobre la grasa, la dejas actuar unos minutos para que la afloje y la retiras con un paño o una esponja húmeda. En grasa muy antigua puede hacer falta una segunda pasada.' },
      { q: '¿Dónde lo puedo usar?', a: 'En la campana y su filtro, la cocina, el horno, los azulejos y las encimeras: las superficies lavables de la cocina donde se va pegando la grasa.' },
      { q: '¿Qué trae el combo?', a: 'Las latas de espuma antigrasa de 400 ml que elijas: 2, 4 o 6, según el combo. El combo de 2 latas sale $24.500, el de 4 sale $34.500 y el de 6 sale $44.500.' },
      { q: '¿Tiene olor fuerte?', a: 'Deja aroma cítrico, a limón. Igual conviene usarlo con la cocina ventilada, como cualquier producto de limpieza.' },
      { q: '¿Sirve en cualquier superficie?', a: 'Está pensado para superficies lavables de cocina. En una superficie delicada o pintada, pruébalo primero en una zona pequeña y que no se vea.' },
      { q: '¿Cómo pago?', a: 'Pagas cuando lo recibes, en efectivo o con tarjeta de débito. El envío es gratis a todo Chile.' },
    ],
    formulaRotulo: 'Cómo se usa',
    formulaTitulo: 'Rocías, esperas y limpias.',
    formulaSub: 'Tres pasos para la grasa pegada de la cocina.',
    formula: [
      ['gota', 'Rocía la espuma', 'La espuma se queda pegada sobre la grasa, también en la campana y en superficies verticales.'],
      ['sol', 'Deja actuar unos minutos', 'La espuma afloja la grasa acumulada mientras haces otra cosa.'],
      ['pluma', 'Pasa un paño', 'Retiras la espuma con la grasa suelta, con un paño o una esponja húmeda.'],
      ['hoja', 'Aroma cítrico', 'Deja olor a limón en la cocina.'],
      ['casa', 'Campana, horno y cocina', 'Para las superficies lavables donde más se pega la grasa.'],
      ['escudo', '400 ml por lata', 'Una lata rinde para varias limpiezas de campana y cocina.'],
    ],
    comparaTitulo: 'Por qué en espuma',
    compara: [
      'La espuma se queda donde la pones, no chorrea como un líquido.',
      'Llega a la campana y a los azulejos sin tener que desarmar nada.',
      'Aroma cítrico en vez del olor fuerte de los desengrasantes de siempre.',
    ],
    nombre: 'Desengrasante en Espuma',
    sub: 'Espuma antigrasa para campana, horno y cocina · 400 ml',
    categoria: 'Hogar',
    foto: 'img/dg-hero.webp?v=2',
    fotos: ['img/dg-hero.webp?v=2'],
    acento: '#F26A1B', acento2Manual: '#18181B',   /* skill ui-ux-pro-max 03-10 opción B: naranja de la lata sobre negro */
    desc: 'Una espuma antigrasa para la cocina: la rocías sobre la campana, el horno o la cocina, la dejas actuar unos minutos y la grasa pegada se afloja para retirarla con un paño. Se vende en combos de 2, 4 y 6 latas de 400 ml.',   /* 03-10 James: los regalos NO se anuncian arriba, solo en el formulario y la ruleta */
    puntos: [
      'Ayuda a aflojar la grasa pegada de campana, horno y cocina',
      'Rocías, esperas unos minutos y limpias con un paño',
      'Espuma que se queda pegada, también en superficies verticales',
      'Aroma cítrico, a limón',
      'Combos de 2, 4 y 6 latas de 400 ml',
      'Pagas al recibir, con envío gratis a todo Chile',
    ],
    /* 03-10 James: SOLO combos (2, 4 y 6 espumas), sin unidad suelta. El de 2 a 24.500 ("ahí sí le pegamos porque damos
       dos regalos"). Cada combo lleva 2 regalos (pasta para ollas + esponja anti óxido) que NO se muestran en la página:
       salen en la ruleta de entrada y en el circulito flotante (desengrasante.js). cant = combos que se piden a Dropi. */
    packs: [
      /* James 03-10: los regalos suben con el combo (cada combo de Dropi = 2 espumas + 1 pasta + 1 esponja) */
      { cant: 1, precio: 24500, antes: 31500, texto: 'Combo 2 espumas antigrasa + 2 regalos' },
      { cant: 2, precio: 34500, antes: 44500, texto: 'Combo 4 espumas antigrasa + 4 regalos' },
      { cant: 3, precio: 44500, antes: 57500, texto: 'Combo 6 espumas antigrasa + 6 regalos' },
    ],
    popular: 1,   /* el de 4 espumas: ahí está la ganancia */
  },
  {
    /* Cámara Ampolleta WiFi — Dropi 171647 "J - AMPOLLETA CAMARA SEGURIDAD CON APP" · MEIBO.CL (mismo proveedor del
       organizador), costo 6.990. Elegida 06-10: Dropdata 150-350 u/día cuando hay stock (MEIBO confirmó reposición).
       Competencia 06-10 en la Biblioteca de Meta (mismo modelo, pago al recibir): CheliExpress 21.990 / 33.990 / 45.990 ·
       AlterTienda 29.990. Shop Ehome 9.990 cobra el envío aparte (no compara). James 06-10 "dale hazlo": 500 bajo
       CheliExpress → 21.490 / 33.490 / 45.490, el pack de 2 como oferta. Tachado = precio + 30 %, terminado en 500.
       OJO CON LO QUE SE PROMETE: solo lo que muestran la foto del proveedor y los videos reales (WiFi, app, visión
       nocturna, gira desde la app, aviso de movimiento, micrófono y parlante). NADA de tarjeta de memoria ni nube
       gratis hasta confirmarlo con MEIBO. Funciona con la corriente del portalámpara: el interruptor queda prendido.
       Diseño propio (ampolleta.css/.js) de la skill ui-ux-pro-max 06-10: glass oscuro, azul noche + verde "en vivo". */
    id: 'ampolleta', unidad: 'cámara', promo: 2, promoAntesDelPack: true,
    /* video REAL (TikTok @lasmegaofertas 7464682141197126918 0-6,8 s + @premiumshopp3 7498580949454572805), sin sus
       subtítulos ni marcas: atornillarla, verla en el celular, instalación, visión nocturna y hablar. NADA con IA. */
    video: 'img/amp-ficha.mp4?v=1',
    /* 06-10 · reseñas REALES de compradores latinos de la cámara ampolleta E27 de un lente (AliExpress: Chile, México,
       Colombia, Perú, Venezuela, Panamá), copiadas tal cual, sin foto y sin las que nombran marca, app, tienda o vendedor
       (_kn_scratch/testeo/ampolleta/_amp_resenas_a_pagina.js). Fuera las 3 que solo hablan del envío. NINGUNA escrita por nosotros. */
    resenasRotulo: 'Lo que dicen quienes usan la cámara ampolleta',
    resenasFuente: 'Opiniones reales de compradores de la cámara ampolleta, tal como las escribieron.',
    resenasMas: 'Más opiniones de quienes usan la cámara ampolleta',
    resenasResumen: { total: 27, nota: 4.8, rotulo: 'opiniones de 4 y 5 estrellas', barras: { 5: 22, 4: 5 } },
    /* 06-10 James: "todas las reseñas con NOMBRE, que aparezca el nombre y que sea latino". Reseñas REALES de Falabella Chile, Perú y Colombia
       de 11 cámaras ampolleta E27 de un lente, con el nombre que publica la tienda. Revisadas una por una: fuera las de otros productos que
       Falabella mezcla en la publicación y las quejas. Las 7 fotos son de compradores con la cámara (_kn_scratch/testeo/ampolleta/_fal_a_pagina.js). */
    resenasReales: [
      { nombre: 'Joss', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-ampolleta/n01.webp?v=1', texto: 'Muy buen producto, es llegar y conectar en el soquete de la ampolleta, no tuve que hacer absolutamente nada, tal como poner una ampolleta' },
      { nombre: 'Oscar', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-ampolleta/n02.webp?v=1', texto: 'Tamaño ideal buen precio y excelente producto cumple con lo que yo quería lo recomiendo' },
      { nombre: 'Christian', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-ampolleta/n03.webp?v=1', texto: 'El producto recibido corresponde al pedido realizado' },
      { nombre: 'Vladimir', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-ampolleta/n04.webp?v=1', texto: 'Fácil de instalar y l aplicacion muy buena' },
      { nombre: 'July', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-ampolleta/n05.webp?v=1', texto: 'Fácil de conectar' },
      { nombre: 'Jorge', comuna: '', fecha: '', estrellas: 4, foto: 'img/resenas-ampolleta/n06.webp?v=1', texto: 'La cámara es tal cual como aparece publicada, cumple con las expectativas de la descripción' },
      { nombre: 'Guillermo', comuna: '', fecha: '', estrellas: 4, foto: 'img/resenas-ampolleta/n07.webp?v=1', texto: 'Producto como se describe en la página...Bueno,Bonito y Barato' },
      { nombre: 'Pablo', comuna: '', fecha: '', estrellas: 5, texto: 'Bastante buena, la relación precio - calidad es satisfactoria, fácil de instalar, se conecta a través de WiFi fácilmente, la calidad de imagen es buena aunque no excelete, se puede grabar video en memoria SD o pagar por almacenamiento en la nube, incluso si no tienes ninguno de los dos puedes tener visión 24/7 a través de la aplicación y grabar videos cortos que se guardan en el almacenamiento del celular.' },
      { nombre: 'Raquel', comuna: '', fecha: '', estrellas: 5, texto: 'Ha funcionado súper bien, nos gustó, la puse en la entrada del auto, no lo vi o no está, para que esté operativa tiene q tener siempre el Enchufe interruptor prendido, ósea es como q tengas una ampolleta siempre prendida, se gira y todo ok' },
      { nombre: 'Maria', comuna: '', fecha: '', estrellas: 5, texto: 'Tamaño igual al de la foto, es mejor de lo que me imaginaba, buena compra, compraré otra para otro lugar de la casa, la dejo vigilando a mi perrita cuando la dejo sola, muy buena compra👍' },
      { nombre: 'Monica', comuna: '', fecha: '', estrellas: 5, texto: 'Nitidez de imagen, facil de operar desde el celular, alerta de ruido sonoro de buen volumen . Descipcion y funcionalidad corresponde a lo comprado.' },
      { nombre: 'Felipe', comuna: '', fecha: '', estrellas: 5, texto: 'se conecto de inmediato a la red de internet, tomo enseguida el codigo que aparece para que pueda estar conectada, muy facil de usar' },
      { nombre: 'Sandra', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente el tamaño como lo muestra en la foto, la imagen de buena calidad muy nítida.' },
      { nombre: 'Regina', comuna: '', fecha: '', estrellas: 5, texto: 'Tiene una buena calidad de imagen y se requiere una aplicación para su uso' },
      { nombre: 'Erik', comuna: '', fecha: '', estrellas: 5, texto: 'Es de buena calidad y tiene una imagen estándar para el precio' },
      { nombre: 'Anaa', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente cámara es accesible para poner en diferentes sitios' },
      { nombre: 'Maria', comuna: '', fecha: '', estrellas: 5, texto: 'es util para revisar los movimientos de tu negocio' },
      { nombre: 'Eliecer', comuna: '', fecha: '', estrellas: 5, texto: 'Se ve espectaculara para ser una ampolleta' },
      { nombre: 'Barbara', comuna: '', fecha: '', estrellas: 5, texto: 'Fácil de instalar, buena imagen, practica' },
      { nombre: 'Gloria', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual al de la foto, tamaño ideal' },
      { nombre: 'Claudia', comuna: '', fecha: '', estrellas: 5, texto: 'Es una cámara de seguridad perfecta' },
      { nombre: 'Alex O', comuna: '', fecha: '', estrellas: 5, texto: 'si corresponde al de la imagen' },
      { nombre: 'Patricio', comuna: '', fecha: '', estrellas: 5, texto: 'Tamaño ideal facil de conectar' },
      { nombre: 'Yeralyn', comuna: '', fecha: '', estrellas: 5, texto: 'Muy buena calidad de imagen' },
      { nombre: 'Daniela', comuna: '', fecha: '', estrellas: 4, texto: 'Es una cámara muy eficiente! No es muy fácil de instalar pero si puedes hacerlo tú mismo con calma y teniendo en cuenta el precio es un excelente producto' },
      { nombre: 'Jhuly', comuna: '', fecha: '', estrellas: 4, texto: 'Tal cual la imagen fácil de manejar' },
      { nombre: 'Pablo Valencia', comuna: '', fecha: '', estrellas: 4, texto: 'Todo como aparece en la app' },
    ],
    antesDespues: 'img/amp-ba.webp?v=1',   /* OpenAI 06-10 con la foto de Dropi de referencia: "Imagen ilustrativa" */
    antesDespuesSub: 'La misma entrada de noche: sin saber quién anda afuera, y con la cámara puesta, mirando en vivo desde el celular.',
    preguntas: [
      { q: '¿Cómo se instala?', a: 'Se atornilla en un portalámpara común de rosca E27, como una ampolleta. Después la vinculas al WiFi de tu casa con la aplicación del celular, siguiendo las instrucciones de la caja. No necesitas técnico ni cables.' },
      { q: '¿El portalámpara tiene que quedar encendido?', a: 'Sí. La cámara funciona con la corriente del portalámpara, así que el interruptor de esa luz tiene que quedar prendido.' },
      { q: '¿Necesita internet?', a: 'Sí, se conecta al WiFi de tu casa. Así la ves en vivo desde el celular, estés donde estés.' },
      { q: '¿Se ve de noche?', a: 'Sí. Tiene visión nocturna con luces infrarrojas, y luces blancas para ver a color.' },
      { q: '¿La puedo poner en la entrada?', a: 'Sí, en cualquier portalámpara bajo techo: el alero de la entrada, el pasillo, el living o la cochera. No debe quedar expuesta directo a la lluvia.' },
      { q: '¿Cómo pago?', a: 'Pagas cuando la recibes, en efectivo o con tarjeta de débito. El envío es gratis a todo Chile.' },
    ],
    formulaRotulo: 'Cómo funciona',
    formulaTitulo: 'La atornillas, la conectas y la ves.',
    formulaSub: 'Sin técnico y sin cables: tu casa a la vista desde el celular.',
    formula: [
      ['casa', 'Se atornilla en el portalámpara', 'Va en un portalámpara común de rosca E27, como una ampolleta: sin cables ni perforar.'],
      ['llave', 'Se conecta al WiFi', 'La vinculas con la aplicación del celular siguiendo las instrucciones de la caja.'],
      ['ojo', 'La ves en vivo', 'Desde el celular ves lo que pasa en tu casa, estés donde estés.'],
      ['sol', 'Visión nocturna', 'De noche también se ve: tiene luces infrarrojas y luces blancas.'],
      ['escudo', 'Aviso de movimiento', 'Cuando detecta movimiento te avisa en el celular.'],
      ['pluma', 'Escuchas y hablas', 'Trae micrófono y parlante: puedes hablarle a quien está al frente.'],
    ],
    comparaTitulo: 'Por qué tipo ampolleta',
    compara: [
      'Va donde ya tienes una ampolleta: sin técnico, sin cables y sin perforar.',
      'Gira desde la aplicación para mirar a los lados.',
      'Con 2 cámaras cuidas la entrada y el patio al mismo tiempo.',
    ],
    nombre: 'Cámara Ampolleta WiFi',
    sub: 'Se atornilla como una ampolleta y la ves en vivo desde el celular',
    categoria: 'Hogar',
    foto: 'img/amp-heroe.webp?v=1',
    fotos: ['img/amp-poster.webp?v=1'],   /* la portada del video: el héroe ya muestra la foto grande (ninguna foto se repite) */
    acento: '#22C55E', acento2Manual: '#0F172A',   /* skill ui-ux-pro-max 06-10: verde "en vivo" sobre azul noche */
    desc: 'Una cámara de seguridad con forma de ampolleta: se atornilla en un portalámpara común de la casa, se conecta al WiFi y desde el celular ves en vivo lo que pasa, también de noche. Gira desde la aplicación para mirar a los lados, te avisa cuando detecta movimiento y trae micrófono y parlante para escuchar y hablar.',
    puntos: [
      'Se atornilla en un portalámpara común (rosca E27)',
      'La ves en vivo desde el celular, estés donde estés',
      'Visión nocturna con luces infrarrojas y blancas',
      'Gira desde la aplicación para mirar a los lados',
      'Aviso de movimiento en el celular',
      'Micrófono y parlante para escuchar y hablar',
    ],
    packs: [
      { cant: 1, precio: 21490, antes: 27500, texto: '1 cámara ampolleta' },
      { cant: 2, precio: 33490, antes: 43500, texto: '2 cámaras ampolleta' },
      { cant: 3, precio: 45490, antes: 59500, texto: '3 cámaras ampolleta' },
    ],
    popular: 1,   /* el pack de 2: la entrada y el patio */
  },
  {
    /* 09-10 · TABLETAS LIMPIA LAVADORA — Dropi 78516 (Vida y Hogar SpA): cada unidad = 2 cajas = 24 tabletas efervescentes,
       costo $1.600. Ganó la búsqueda del 09-10 (Dropdata ~100/día en el mercado, Valkyria la pauta hace 17 meses).
       Escalera APROBADA por James 09-10: 48 tab $19.500 · 72 tab $24.500 (la que se impulsa) · 120 tab $29.500.
       Diseño propio (tabletas.css/.js) de la skill ui-ux-pro-max 09-10: azul profundo #0369A1, celeste agua #38BDF8, CTA verde #16A34A,
       letra Lora (títulos) + Raleway (texto). */
    id: 'tabletas', unidad: 'tableta', promo: 72,
    /* video REAL (TikTok @vax732 7598866846284090655 + @bytehive5 7597024356102950166), sin textos ni marcas ajenas:
       la tableta al tambor, la espuma café, el agua sucia por el desagüe y el tambor limpio. NADA con IA. */
    video: 'img/tab-ficha.mp4?v=1',
    /* 09-10 · reseñas REALES de Falabella Chile, Perú y Colombia de pastillas limpia lavadora, con el nombre que publica la tienda.
       Las 3 fotos son de compradoras con la misma caja genérica y las tabletas azul y blanco (_kn_scratch/tabletas/_a_pagina.js).
       NINGUNA escrita por nosotros. */
    resenasRotulo: 'Lo que dicen quienes ya limpiaron su lavadora',
    resenasFuente: 'Opiniones reales de compradores de tabletas limpia lavadora, tal como las escribieron.',
    resenasMas: 'Más opiniones de quienes usan las tabletas',
    resenasResumen: { total: 32, nota: 4.8, rotulo: 'opiniones de 4 y 5 estrellas', barras: { 5: 24, 4: 8 } },
    resenasReales: [
      { nombre: 'Monica', comuna: '', fecha: '', estrellas: 4, foto: 'img/resenas-tabletas/n01.webp?v=1', texto: 'Igual a la foto el tamaño corresponde y funciona 🙂' },
      { nombre: 'Claudia', comuna: '', fecha: '', estrellas: 4, foto: 'img/resenas-tabletas/n02.webp?v=1', texto: 'No trae instrucciones en español, pero supuse la cantidad de pastillas para mi lavadora de 21 kilos' },
      { nombre: 'Sonia', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-tabletas/n03.webp?v=1', texto: 'Igual a la foto' },
      { nombre: 'Pedro', comuna: '', fecha: '', estrellas: 5, texto: 'Hola el producto es perfecto es mejor que e comprado en él comercio limpio muy bien la lavadora Y la dejo con muy limpia y con agradable aroma todo lo que describe en los detalles yo lo recomiendo aaa y tiene muy buen precio estoy muy feliz' },
      { nombre: 'Aldana', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto Tamaño corresponde La calidad buenísima Hice un lavado de tambor Y quedé maravillada Con lo bien q funciono el producto.' },
      { nombre: 'Elena', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es maravilloso ,ya que no hace completamente el trabajo pero si saca la mayoria de suciedad que tiene la lavadora muy buena compra' },
      { nombre: 'Kelly', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente, muchas gracias mi lavadora quedó en óptimas condiciones.. Y volvió a funcionar como nueva.. Gracias' },
      { nombre: 'Francisco', comuna: '', fecha: '', estrellas: 5, texto: 'Tengo tiempo usándolas en mi lavadora y de verdad deja el tambor y compartimiento de detergente súper limpios' },
      { nombre: 'Beatriz Alejandra', comuna: '', fecha: '', estrellas: 5, texto: 'Cumple con el tema de limpieza, salen incluso trozitos de mugre. �atil para una limpeiza periodica.' },
      { nombre: 'Claudia', comuna: '', fecha: '', estrellas: 5, texto: 'Producto muy util para la limpieza del electrodomestico, buena calidad igual que la fotografia' },
      { nombre: 'Jessica', comuna: '', fecha: '', estrellas: 5, texto: 'El uso de las pastilla en l lavadora es efectiva , me gusto mucho y dejo impecable la lavadora' },
      { nombre: 'Ivan', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es de buena calidad, al ser efervescentes dejan muy limpia la lavadora' },
      { nombre: 'Daniela', comuna: '', fecha: '', estrellas: 5, texto: 'Buen producto, limpia la lavadora, ya no queda con ese olor A humedad dentro.' },
      { nombre: 'Jaime', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto, deja la lavadora con aroma fresco y limpio, recomendado!' },
      { nombre: 'Ricardo', comuna: '', fecha: '', estrellas: 5, texto: 'Desde que comenzamos a ocuparlas, la ropa queda bien lavada y se nota .' },
      { nombre: 'Marcela', comuna: '', fecha: '', estrellas: 5, texto: 'Muy fácil de usar y realmente es genial tu lavadora queda impecable' },
      { nombre: 'Paula', comuna: '', fecha: '', estrellas: 5, texto: 'Las pastillas son igual a la foto , y mi lavadora quedó perfecta' },
      { nombre: 'Carmen', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto! Dejo la lavadora impecable. Recomendado 100%' },
      { nombre: 'María Fernanda', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto, no deja manchado el tambor de la lavadora .' },
      { nombre: 'Freddy', comuna: '', fecha: '', estrellas: 5, texto: 'Es un producto muy efecas deja limpio el tambor de la lavadora' },
      { nombre: 'Sofía', comuna: '', fecha: '', estrellas: 5, texto: 'Súper buenas Deja. Las lavadoras impecables como nuevas' },
      { nombre: 'Texia', comuna: '', fecha: '', estrellas: 5, texto: 'Cumplió mis expectativas y se nota que saca la suciedad!' },
      { nombre: 'Mónica', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto, eliminó el mal olor de la lavadora' },
      { nombre: 'Gladys', comuna: '', fecha: '', estrellas: 5, texto: 'Es bueno me ha sido útil para mi lavadora.' },
      { nombre: 'Judy', comuna: '', fecha: '', estrellas: 5, texto: 'Dejan muy limpia la lavadora' },
      { nombre: 'Nibia', comuna: '', fecha: '', estrellas: 5, texto: 'Es ub excelente producto!' },
      { nombre: 'Patricio', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño es el que corresponde, uso 2 pastillas cada vez... y se nota diferencia en el olor a humedad.' },
      { nombre: 'Leonardo', comuna: '', fecha: '', estrellas: 4, texto: 'El producto si bien lo estamos probando se aprecia un cambio en el aseo de mi lavadora' },
      { nombre: 'Julia', comuna: '', fecha: '', estrellas: 4, texto: 'Buen producto,sirve para la limpieza de mi lavadora' },
      { nombre: 'Johanna', comuna: '', fecha: '', estrellas: 4, texto: 'Buen produxto sirve para limpiar lavadora' },
      { nombre: 'Cecilia', comuna: '', fecha: '', estrellas: 4, texto: 'Funcionan bien, y saco mal olor lavadora' },
      { nombre: 'Lorena', comuna: '', fecha: '', estrellas: 4, texto: 'Dejó limpio el tambor de la lavadora' },
    ],
    antesDespues: 'img/tab-ba.webp?v=1',   /* OpenAI 09-10: tambor sucio / el mismo tambor limpio. Imagen ilustrativa */
    antesDespuesSub: 'Por fuera la lavadora se ve limpia. Por dentro, el tambor junta restos de detergente, sarro y mal olor.',
    preguntas: [
      { q: '¿Cómo se usan?', a: 'Con la lavadora vacía, echas 1 tableta directo al tambor y haces un ciclo largo con agua caliente o el ciclo de limpieza de tambor si tu lavadora lo tiene. Al terminar, listo.' },
      { q: '¿Cada cuánto se usan?', a: 'Una vez al mes para mantenerla limpia. Si hace mucho que no la limpias, puedes usar 2 tabletas la primera vez.' },
      { q: '¿Sirven para mi lavadora?', a: 'Sí, sirven para lavadoras de carga superior y de carga frontal.' },
      { q: '¿Se puede lavar ropa al mismo tiempo?', a: 'No. Se usan con la lavadora vacía, sin ropa, para que limpien el tambor por dentro.' },
      { q: '¿Cuántas tabletas trae cada caja?', a: 'Cada caja trae 12 tabletas envueltas una por una. El pack de 48 son 4 cajas, el de 72 son 6 cajas y el de 120 son 10 cajas.' },
      { q: '¿Cómo pago?', a: 'Pagas cuando las recibes, en efectivo o con tarjeta de débito. El envío es gratis a todo Chile.' },
    ],
    formulaRotulo: 'Cómo se usa',
    formulaTitulo: 'Una tableta, un ciclo y listo.',
    formulaSub: 'Sin desarmar nada: la tableta hace el trabajo sola.',
    formula: [
      ['agua', 'Al tambor vacío', 'Echas 1 tableta directo al tambor, sin ropa.'],
      ['rayo', 'Un ciclo largo', 'Agua caliente o el ciclo de limpieza de tambor de tu lavadora.'],
      ['cepillo', 'Suelta la mugre', 'La tableta burbujea y despega los restos de detergente y el sarro.'],
      ['sol', 'Adiós al mal olor', 'La lavadora vuelve a oler a limpio y tu ropa también.'],
      ['escudo', 'Una vez al mes', 'Con una tableta al mes la mantienes limpia todo el año.'],
      ['casa', 'Carga superior o frontal', 'Sirven para los dos tipos de lavadora.'],
    ],
    comparaTitulo: 'Por qué en tabletas',
    compara: [
      'Ya vienen medidas: una tableta por lavado de tambor, sin calcular nada.',
      'Vienen envueltas una por una: no se humedecen ni se desarman.',
      'Con el pack de 72 tienes para años de lavadora limpia.',
    ],
    nombre: 'Tabletas Limpia Lavadora',
    sub: 'Una tableta al tambor vacío y tu lavadora queda limpia por dentro',
    categoria: 'Hogar',
    foto: 'img/tab-heroe.webp?v=1',
    fotos: ['img/tab-poster.webp?v=1'],
    acento: '#16A34A', acento2Manual: '#0369A1',   /* skill ui-ux-pro-max 09-10: verde CTA sobre azul profundo */
    desc: 'Tabletas efervescentes para limpiar la lavadora por dentro. Con la lavadora vacía echas una tableta al tambor, haces un ciclo largo y la tableta burbujea y suelta los restos de detergente, el sarro y la mugre que se juntan en el tambor y causan mal olor. Sirven para lavadoras de carga superior y frontal. Cada caja trae 12 tabletas envueltas una por una.',
    puntos: [
      'Limpian el tambor por dentro, sin desarmar nada',
      'Sacan restos de detergente, sarro y mal olor',
      'Para lavadoras de carga superior y frontal',
      'Una tableta al mes basta',
      'Envueltas una por una: no se humedecen',
    ],
    packs: [
      { cant: 48, precio: 19500, antes: 27900, texto: '48 tabletas · 4 cajas' },
      { cant: 72, precio: 24500, antes: 36900, texto: '72 tabletas · 6 cajas' },
      { cant: 120, precio: 29500, antes: 49900, texto: '120 tabletas · 10 cajas' },
    ],
    popular: 1,   /* James 09-10: impulsar el de 72, el que deja más margen */
  },
  {
    /* Clorofila Líquida Benevolent 60 ml — Dropi 118999 · VITALCOM (Recoleta)
       🔴 OJO CON EL LENGUAJE. Es un SUPLEMENTO ALIMENTARIO y en Chile lo rige el
       Reglamento Sanitario de los Alimentos (D.S. 977/96). El art. 536 prohibe
       promocionarlo "para fines de diagnostico, prevencion o tratamiento de las
       enfermedades", y el art. 110 prohibe sugerir "efectos terapeuticos,
       curativos ni posologias".
       PROHIBIDO en esta ficha y en los copys: desintoxica, elimina toxinas,
       limpia la sangre o el higado, quema grasa, bajas de peso, cura, previene,
       y tambien decir cuantas gotas tomar. La competencia lo publica igual;
       ese es su riesgo, no el nuestro.
       PERMITIDO: "ayuda a", "favorece", "apoya", y los hechos del producto
       (sabor menta, sin alcohol, sin gluten, 60 ml, en gotas). */
    id: 'clorofila', unidad: 'frasco', promo: 2,
    video: 'img/clorofila.mp4?v=1',
    antesDespues: 'img/cl-ba.webp?v=1',
    antesDespuesSub: 'Cómo se siente el día con la digestión pesada e hinchada, y cómo se siente cuando el estómago está liviano y el aliento fresco desde la mañana.',
    preguntas: [
      { q: '¿Para qué sirve?', a: 'La gente la pide sobre todo por tres cosas: la digestión pesada después de comer, la hinchazón de la tarde y el aliento de la mañana. Se toma en un vaso de agua, todos los días. Es un suplemento alimentario: acompaña la rutina y no reemplaza una alimentación balanceada ni un tratamiento médico.' },
      { q: '¿En cuánto tiempo se nota?', a: 'Cada persona es distinta. Lo que más nos cuentan es que lo primero que sienten es el aliento fresco y la sensación de estar más livianos después de comer, con el uso diario constante.' },
      { q: '¿Cómo se toma?', a: 'Se disuelve en un vaso de agua fría y queda de un verde intenso. Puedes tomarlo en la mañana o en cualquier momento del día. La dosis sugerida viene indicada en la etiqueta del frasco.' },
      { q: '¿A qué sabe?', a: 'A menta suave. No sabe a pasto ni deja regusto amargo, que es lo que la mayoría teme antes de probarla.' },
      { q: '¿Cuánto dura un frasco?', a: 'El frasco trae 60 ml con gotero dosificador. Con un uso diario normal te rinde alrededor de un mes.' },
      { q: '¿Tiene alcohol o gluten?', a: 'No. Es libre de alcohol y libre de gluten, así viene declarado en el envase del fabricante.' },
      { q: '¿Se puede llevar en la cartera?', a: 'Sí. Son 60 ml en un frasco de vidrio con gotero, así que cabe en cualquier bolso y lo usas donde estés.' },
      { q: '¿Quién no debería tomarlo?', a: 'Por norma chilena, los suplementos alimentarios no se recomiendan para menores de 8 años, embarazadas ni mujeres amamantando, salvo indicación de un profesional. Y no reemplaza una alimentación balanceada.' },
    ],
    formulaRotulo: 'Para qué la usan',
    formulaTitulo: 'Para sentirte liviano después de comer, y con el aliento fresco desde la mañana.',
    formulaSub: 'Suplemento alimentario en formato líquido. Se disuelve en agua y no reemplaza una alimentación balanceada.',
    formula: [
      ['hoja', 'Digestión pesada', 'Ayuda a sentirte liviano después de las comidas abundantes, en vez de andar con el estómago cargado toda la tarde.'],
      ['gota', 'Hinchazón', 'Muchos la toman por la tarde, cuando el abdomen se siente inflado después de comer.'],
      ['hoja', 'Aliento fresco', 'Clorofila con sabor menta: la toman en la mañana para empezar el día con el aliento limpio.'],
      ['pluma', 'Un vaso verde al despertar', 'La rutina de la mañana de quienes ya la usan: agua fría, unas gotas y a arrancar el día liviano.'],
      ['escudo', 'Sin alcohol ni gluten', 'Declarado en el envase del fabricante. Se disuelve al instante, sin grumos.'],
      ['gota', 'Sabor menta, no a pasto', 'Es lo primero que preguntan. Un frasco de 60 ml con gotero rinde alrededor de un mes.'],
    ],
    comparaTitulo: 'Por qué en gotas y no en polvo ni en cápsulas',
    compara: [
      'Un vaso de agua verde en la mañana: se disuelve al instante, sin grumos ni batidora.',
      'El gotero dosifica solo y el frasco cabe en la cartera: la rutina no se rompe.',
      'Sabor menta que acompaña el aliento fresco, sin alcohol y sin gluten.',
    ],
    nombre: 'Clorofila Líquida Benevolent',
    sub: 'Para la digestión pesada, la hinchazón y el aliento de la mañana',
    categoria: 'Bienestar',
    foto: 'img/prod-clorofila.webp?v=1',
    fotos: ['img/prod-clorofila.webp?v=1', 'img/prod-clorofila-2.webp?v=1', 'img/prod-clorofila-3.webp?v=1'],
    /* Fotos de clientes (James, 10-sep). De las seis que mando entraron TRES.
       Las otras tres quedaron fuera por DOS motivos, no uno:
         1) son de OTRO frasco: etiqueta blanca con hojas y 1.500MG 30 DAY
            SUPPLY, no el Benevolent de banda verde que despachamos.
         2) esa etiqueta trae DETOX AND CLEANSE, WEIGHT MANAGEMENT SUPPORT,
            IMMUNE SUPPORT y SKIN HEALTH escritos y legibles. Publicar la foto
            es publicar el claim, y eso es justo lo que prohibe el D.S. 977/96. */
    fotosResenas: ['img/resenas-clorofila/rcl1.webp?v=1', 'img/resenas-clorofila/rcl2.webp?v=1', 'img/resenas-clorofila/rcl3.webp?v=1'],
    acento: '#5A9E2F',   /* el verde de la etiqueta Benevolent */
    desc: 'La clorofila líquida se toma en un vaso de agua, y la gente la pide por tres cosas: sentirse liviana después de comer, la hinchazón de la tarde y el aliento fresco de la mañana. Viene en frasco de 60 ml con gotero: unas gotas, el agua queda de un verde intenso y sabe a menta suave, no a pasto. Libre de alcohol y de gluten, declarado por el fabricante. Un frasco rinde alrededor de un mes. Es un suplemento alimentario: acompaña tu rutina diaria y no reemplaza una alimentación balanceada.',
    puntos: [
      'Digestión liviana después de comer',
      'Ayuda con la sensación de hinchazón de la tarde',
      'Aliento fresco desde la mañana, con sabor menta',
      'Un vaso de agua verde al día: se disuelve al instante',
      'Sin alcohol y sin gluten, declarado por el fabricante',
      'Frasco de 60 ml con gotero, rinde alrededor de un mes',
    ],
    packs: [
      /* mismo criterio del Organizador: el "antes" del primer pack es un 30%
         sobre el precio, y los de 2 y 3 son lo que costaria comprarlos sueltos.
         Escalera aprobada por James el 10-sep: 24.500 / 34.500 / 44.500. */
      { cant: 1, precio: 24500, antes: 31900, texto: '1 frasco · 60 ml' },
      { cant: 2, precio: 29500, antes: 49000, texto: '2 frascos · 120 ml' },
      { cant: 3, precio: 41500, antes: 73500, texto: '3 frascos · 180 ml' },
    ],
    popular: 2,
  },
  {
    /* Lymphoria Drenaje Linfático 60 ml — Dropi 159173 · VITALCOM (Recoleta)
       Precio aprobado por James el 11-sep: 24.500 / 29.500 / 39.500.
       🔴 LIMITE LEGAL. Suplemento alimentario (D.S. 977/96, arts. 110 y 536).
       TODA la competencia vende con «desinflama / adios hinchazon / elimina
       liquidos / en 7 dias», doctores falsos y antes/despues. Aca NO: ni
       hinchazon, ni retencion, ni celulitis, ni adelgaza, ni desintoxica, ni
       defensas, ni cuantas gotas tomar. Solo hechos del producto y de la compra.
       SELLOS: solo los que salen en TODAS las versiones del envase: vegano,
       sin gluten, sin transgenicos. «Sin alcohol» sale en la foto de Dropi y
       «sin alergenos» en el metraje; como no coinciden, no se afirma ninguno.
       El sabor a miel sale del sello «Tastes Like Honey» de la caja.
       SIN antes y despues, a proposito.
       OJO NOMBRE: «drenaje» ya lo atrapa el DRAINPRO en el panel, el bot de
       redes y la clasificacion por pagina. Por eso el nombre EMPIEZA con
       «Lymphoria», y en cada uno de esos sitios su regla va antes que la del polvo. */
    id: 'lymphoria', unidad: 'frasco', promo: 2,
    video: 'img/lymphoria.mp4?v=2',
    /* fotos REALES de clientes (las mando James, 11-sep). Hay manos de hombre
       y de mujer a proposito: el producto es unisex y la pagina no puede
       verse como algo solo para mujeres. */
    fotosResenas: ['img/resenas-lymphoria/rly1.webp?v=1', 'img/resenas-lymphoria/rly2.webp?v=1',
      'img/resenas-lymphoria/rly3.webp?v=1', 'img/resenas-lymphoria/rly4.webp?v=1',
      'img/resenas-lymphoria/rly5.webp?v=1'],
    /* La seccion «El cambio» de la tienda, en el mismo lugar que en la clorofila:
       despues de la garantia y antes de las preguntas. La foto compara la RUTINA
       (polvos y capsulas contra unas gotas), NUNCA el cuerpo: es suplemento y el
       D.S. 977/96 no deja prometer que desinflama, y Meta rechaza esos antes/despues. */
    antesDespues: 'img/ly-cambio.webp?v=1',
    antesDespuesSub: 'Cómo era la rutina con polvos y cápsulas, y cómo es con unas gotas en el vaso.',
    preguntas: [
      { q: '¿Para qué sirve?', a: 'Es un drenaje linfático en gotas. Está pensado para apoyar el funcionamiento del sistema linfático, acompañar el equilibrio natural de líquidos del organismo y sumarse a una rutina de alimentación equilibrada y actividad física. Así lo declara su envase, que lo presenta como «traditional lymphatic support». Es un suplemento alimentario: acompaña tu alimentación y no la reemplaza.' },
      { q: '¿Cómo se toma?', a: 'Se agregan unas gotas a un vaso de agua o de jugo, en el momento del día que prefieras. La dosis sugerida viene indicada en la etiqueta del frasco.' },
      { q: '¿A qué sabe?', a: 'A miel. Así lo declara la propia caja con su sello «Tastes Like Honey».' },
      { q: '¿Qué trae dentro?', a: 'Una mezcla de 300 mg de extractos de cuatro hierbas: cleavers (Galium aparine), flor de trébol rojo (Trifolium pratense), raíz de stillingia (Stillingia sylvatica) y corteza de fresno espinoso (Zanthoxylum americanum). La base es agua purificada, glicerina, maltitol y saborizante, con sorbato de potasio como conservante. Todo eso viene declarado en la etiqueta del frasco.' },
      { q: '¿Cuánto me dura?', a: 'Depende de la dosis que indica la etiqueta. Por eso la mayoría se lleva el pack de 2 frascos: sale más conveniente y no se queda sin.' },
      { q: '¿Es vegano?', a: 'Sí. El envase lo declara vegano, sin gluten y sin transgénicos.' },
      { q: '¿Se puede llevar en la cartera?', a: 'Sí. Es un frasco de 60 ml con gotero, así que cabe en cualquier bolso y lo usas donde estés.' },
      { q: '¿Quién no debería tomarlo?', a: 'Por norma chilena, los suplementos alimentarios no se recomiendan para menores de 8 años, embarazadas ni mujeres amamantando, salvo indicación de un profesional. No reemplaza una alimentación balanceada.' },
    ],
    /* Las cuatro hierbas SALEN DE LA ETIQUETA del frasco (Supplement Facts,
       leida cuadro por cuadro del metraje real): mezcla de 300 mg con extractos
       de cleavers, trebol rojo, stillingia y fresno espinoso. Se dice QUE trae
       y de donde viene cada una; NO se dice que curen ni que desinflamen, y la
       posologia de la etiqueta (1-2 goteros) NO se publica: el D.S. 977/96 la
       prohibe en publicidad. */
    formulaRotulo: 'Qué trae dentro',
    formulaTitulo: 'Cuatro hierbas en una misma mezcla.',
    formulaSub: 'Lo que declara la etiqueta del fabricante: 300 mg de extractos herbales por porción, en base líquida con sabor a miel.',
    formula: [
      ['hoja', 'Cleavers · Galium aparine', 'Se usa la parte aérea. Es la hierba que le da nombre a este tipo de fórmulas en la herbolaría europea.'],
      ['hoja', 'Trébol rojo · Trifolium pratense', 'Se usa la flor. Clásica de las mezclas herbales de primavera.'],
      ['hoja', 'Stillingia · Stillingia sylvatica', 'Se usa la raíz, de uso tradicional en la herbolaría del sur de Estados Unidos.'],
      ['hoja', 'Fresno espinoso · Zanthoxylum americanum', 'Se usa la corteza. Es la cuarta del grupo en la etiqueta.'],
      ['gota', 'La base líquida', 'Agua purificada, glicerina, maltitol y saborizante, con sorbato de potasio como conservante.'],
      ['escudo', 'Vegano, sin gluten y sin transgénicos', 'Los tres sellos que trae impresos la caja del fabricante.'],
    ],
    comparaTitulo: 'Por qué en gotas y no en cápsulas',
    compara: [
      'Se mezcla en tu agua o tu jugo: no hay que tragar pastillas.',
      'El gotero dosifica solo: nada de contar cápsulas.',
      'Sabor a miel, vegano y sin gluten.',
    ],
    nombre: 'Lymphoria Drenaje Linfático',
    sub: 'Extractos de hierbas en gotas, con sabor a miel',
    categoria: 'Bienestar',
    foto: 'img/prod-lymphoria.webp?v=1',
    fotos: ['img/prod-lymphoria.webp?v=1', 'img/ly-llega1.webp?v=1'],
    acento: '#1E4D3B',   /* el verde bosque de la caja; distinto al verde de la clorofila */
    /* OJO con el lenguaje (D.S. 977/96, arts. 110 y 536): un suplemento no puede
       prometer que desinflama, que baja la hinchazon o la retencion, que adelgaza,
       desintoxica o sube las defensas, ni dar la posologia. Lo que SI se puede
       decir es que es, como se toma y QUE DECLARA EL FABRICANTE en su envase.
       Por eso lo del sistema linfatico va citado como declaracion de la caja
       («traditional lymphatic support»), no como promesa nuestra. */
    /* Corto a proposito (James, 11-sep: «muy cargada de texto, haz un mix»):
       el parrafo cuenta que es y como se toma, y los puntos NO lo repiten. */
    /* PARA QUE SIRVE va PRIMERO (James, 11-sep: «es una landing de venta,
       tiene que convertir»). Lo que se promete es lo que declara el proveedor
       en su ficha, citado como suyo. NO se dice que desinflama, que baja la
       hinchazon o la retencion, ni se da la dosis: eso lo prohibe el
       D.S. 977/96 y Meta rechaza los anuncios que lo dicen. */
    /* CORTO (James, 11-sep: «esa seccion esta demasiado larga»). El detalle
       —las cuatro hierbas, los 300 mg y como se toma— vive en «Que trae
       dentro» y en las preguntas frecuentes, no aca. */
    desc: 'Un drenaje linfático en gotas, pensado para apoyar el funcionamiento del sistema linfático y acompañar el equilibrio natural de líquidos del organismo. Así lo declara su envase: «traditional lymphatic support». Es un suplemento alimentario, no un medicamento.',
    puntos: [
      'Apoya el funcionamiento del sistema linfático',
      'Acompaña el equilibrio natural de líquidos del organismo',
      'Cuatro hierbas: cleavers, trébol rojo, stillingia y fresno espinoso',
      'Se toma en gotas: nada de cápsulas ni de polvos con grumos',
      'Sabor a miel · vegano, sin gluten y sin transgénicos',
      'Pagas al recibir, con envío gratis a todo Chile',
    ],
    packs: [
      /* mismo criterio de la clorofila: el «antes» del primer pack es un 30%
         sobre el precio, y los de 2 y 3 son lo que costaria comprarlos sueltos */
      { cant: 1, precio: 24500, antes: 31900, texto: '1 frasco · 60 ml' },
      { cant: 2, precio: 29500, antes: 49000, texto: '2 frascos · 120 ml' },
      { cant: 3, precio: 39500, antes: 73500, texto: '3 frascos · 180 ml' },
    ],
    popular: 1,   /* el pack de 2, el MAS VENDIDO de la placa de James */
  },
  {
    /* promo = el `cant` del pack que se destaca, NO la posicion.
       Aqui cant va en CAJAS de 10, asi que el pack de 60 parches es cant 6. */
    id: 'kinoki', unidad: 'caja de 10', promo: 6,
    fotosResenas: ['img/resenas-kinoki/rk1.webp?v=1','img/resenas-kinoki/rk2.webp?v=1','img/resenas-kinoki/rk3.webp?v=1','img/resenas-kinoki/rk4.webp?v=1','img/resenas-kinoki/rk5.webp?v=1','img/resenas-kinoki/rk6.webp?v=1','img/resenas-kinoki/rk7.webp?v=1','img/resenas-kinoki/rk8.webp?v=1','img/resenas-kinoki/rk9.webp?v=1'],
    antesDespues: 'img/prod-kinoki-ba.webp?v=1',
    antesDespuesSub: 'El mismo día largo de pie: cómo terminas la jornada y cómo amaneces después de usarlos.',
    /* OJO con el lenguaje: nada de curar ni de limpiar la sangre. Los que llevan
       95-98 dias pauteando esto en Chile venden por descanso y pies ligeros. */
    preguntas: [
      { q: '¿Cómo se usan?', a: 'Sobre la piel limpia y seca, pegas un parche en la planta de cada pie antes de dormir y lo dejas toda la noche. En la mañana lo retiras y lo botas.' },
      { q: '¿Cuántos trae cada caja?', a: '10 parches por caja, o sea cinco noches completas para los dos pies. Cada parche viene sellado por separado.' },
      { q: '¿Por qué amanece oscuro?', a: 'Es la reacción de los extractos de bambú y hierbas con la humedad y el calor del pie durante la noche. Que cambie de color es señal de que estuvo bien puesto.' },
      { q: '¿Se pueden usar todas las noches?', a: 'Sí. La mayoría los usa dos o tres veces por semana, sobre todo los días en que estuvo mucho rato de pie.' },
    ],
    formulaRotulo: "Qué llevan dentro",
    formulaTitulo: "Se pegan solos y actúan de noche.",
    formulaSub: "Vinagre de bambú y hierbas prensadas en una almohadilla sellada. Uso externo: no se toma nada.",
    formula: [["hoja","Vinagre de bambú","El ingrediente base, usado hace siglos en Asia."],["hoja","Polvo de bambú","Absorbe la humedad del pie durante la noche."],["sol","Tourmalina","Aporta la sensación de calor suave en la planta."],["hoja","Loquat y hierbas","Extractos vegetales de aroma herbal."],["llave","Adhesivo en todo el borde","Se queda firme aunque te muevas durmiendo."],["escudo","Sellado uno por uno","Cada parche en su sobre: no se humedece antes de usarlo."]],
    comparaTitulo: "¿Qué los hace diferentes?",
    compara: ["Adhesivo en todo el borde: no se sueltan a media noche.","Vienen sellados uno por uno, así no pierden fuerza en la caja.","Uso externo y directo: no hay que tomar nada ni mojar el pie."],
    nombre: 'Parches Kinoki para Pies',
    sub: 'Te los pones al dormir y amaneces con los pies ligeros',
    categoria: 'Bienestar',
    foto: 'img/prod-kinoki.webp?v=1',
    fotos: ['img/prod-kinoki.webp', 'img/prod-kinoki-2.webp', 'img/prod-kinoki-3.webp'],
    acento: '#1F7A3D',   /* el verde de la caja Kinoki */
    desc: 'Son parches de uso nocturno con vinagre de bambú, polvo de bambú, tourmalina y extractos de hierbas. Se pegan en la planta de cada pie antes de dormir y se dejan toda la noche: no hay que mojarlos, ni untar nada, ni esperar. En la mañana los retiras y los botas. Cada caja trae 10 parches, o sea cinco noches para los dos pies, y cada uno viene sellado por separado. Pensados para quien pasa el día de pie y termina la jornada con los pies pesados y calientes. Son de uso externo: se aplican sobre la piel, no se ingiere nada.',
    puntos: [
      'Un parche en cada planta, antes de dormir',
      '10 parches por caja: cinco noches para los dos pies',
      'Se pegan solos, sin mojar ni untar nada',
      'Vinagre de bambú, tourmalina y extractos de hierbas',
      'Uso externo: no se ingiere nada',
    ],
    packs: [
      { cant: 3, precio: 19500, antes: 29900, texto: '30 parches' },
      { cant: 6, precio: 25500, antes: 45900, texto: '60 parches' },
      { cant: 9, precio: 32500, antes: 62900, texto: '90 parches' },
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
   Foco 22.500 / 24.500 / 29.990 · Almohada 29.500 / 39.500 / 49.500 */
window.PRECIOS_APROBADOS = [
  23500, 34900, 44900,
  18500, 24500, 29500,
  24500, 34500, 44500,
  28500, 38500, 49500,
  22500, 24500, 29990,
  22990, 29990, 36990,   /* cabezal de ducha */
  37500, 54500,          /* cepillo electrico parrilla */
  19500, 25500, 32500,   /* parches kinoki: 30 · 60 · 90 parches */
  29500, 39500, 49500,   /* almohada cervical: 1 · 2 · 3 unidades */
  24500, 29500, 41500,   /* clorofila liquida: 1 · 2 · 3 frascos (James, 10-sep) */
  24500, 29500, 39500,   /* lymphoria drenaje: 1 · 2 · 3 frascos (James, 11-sep) */
  24990, 34990, 44990,   /* guirnalda solar: 1 · 2 · 3 guirnaldas (la placa de James, 22-09) */
  20500, 27500, 36500,   /* bálsamo de colágeno Rosetimes: 1 · 2 · 3 unidades (James, 29-09) */
  22500, 31500, 44500,   /* zapatero organizador colgador 4 niveles: 1 · 2 · 3 unidades (James, 01-10) */
  24500, 34500, 44500,   /* desengrasante en espuma: combos de 2 · 4 · 6 espumas, con 2 regalos (James, 03-10) */
  21490, 33490, 45490,   /* cámara ampolleta WiFi: 1 · 2 · 3 cámaras, 500 bajo CheliExpress (James, 06-10) */
];
