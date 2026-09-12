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
      { q: '¿Hay que pagar mensualidad?', a: 'No. Los canales chilenos se ven gratis, sin mensualidad y sin contrato.' },
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
      /* la antena SI se vende suelta: Dropi 32763 ($2.000), mismo proveedor.
         Los packs no dan descuento (145445 vale el doble, 86375 el triple),
         pero se montan igual para que vaya en menos bultos. */
      { cant: 1, precio: 18500, antes: 27000, texto: '1 antena' },
      { cant: 2, precio: 24500, antes: 39000, texto: '2 antenas' },
      { cant: 3, precio: 29500, antes: 48000, texto: '3 antenas' },
    ],
    popular: 0,
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
    antesDespues: 'img/prod-foco-ba.webp?v=1',
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
    foto: 'img/prod-foco.webp?v=1',
    fotos: ['img/prod-foco.webp', 'img/prod-foco-2.webp', 'img/prod-foco-3.webp'],
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
    id: 'organizador', unidad: 'caja', promo: 6,
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
    antesDespuesSub: 'Cómo se siente el día cuando la digestión anda pesada, y cómo se siente cuando no.',
    preguntas: [
      { q: '¿Cómo se toma?', a: 'Se disuelve en un vaso de agua fría y queda de un verde intenso. Puedes tomarlo en la mañana o en cualquier momento del día. La dosis sugerida viene indicada en la etiqueta del frasco.' },
      { q: '¿A qué sabe?', a: 'A menta suave. No sabe a pasto ni deja regusto amargo, que es lo que la mayoría teme antes de probarla.' },
      { q: '¿Cuánto dura un frasco?', a: 'El frasco trae 60 ml con gotero dosificador. Con un uso diario normal te rinde alrededor de un mes.' },
      { q: '¿Tiene alcohol o gluten?', a: 'No. Es libre de alcohol y libre de gluten, así viene declarado en el envase del fabricante.' },
      { q: '¿Se puede llevar en la cartera?', a: 'Sí. Son 60 ml en un frasco de vidrio con gotero, así que cabe en cualquier bolso y lo usas donde estés.' },
      { q: '¿Quién no debería tomarlo?', a: 'Por norma chilena, los suplementos alimentarios no se recomiendan para menores de 8 años, embarazadas ni mujeres amamantando, salvo indicación de un profesional. Y no reemplaza una alimentación balanceada.' },
    ],
    formulaRotulo: 'Qué es',
    formulaTitulo: 'Clorofila líquida, en gotas, con sabor a menta.',
    formulaSub: 'Suplemento alimentario en formato líquido. Se disuelve en agua y no reemplaza una alimentación balanceada.',
    formula: [
      ['hoja', 'Clorofila líquida', 'El pigmento verde de las plantas, en presentación concentrada de 60 ml.'],
      ['gota', 'Gotero dosificador', 'El frasco trae su propio gotero: mides sin tener que calcular a ojo.'],
      ['hoja', 'Sabor menta', 'No sabe a pasto. Es lo primero que pregunta todo el mundo.'],
      ['escudo', 'Sin alcohol', 'Declarado en el envase del fabricante.'],
      ['escudo', 'Sin gluten', 'Declarado en el envase del fabricante.'],
      ['pluma', 'Cabe en la cartera', 'Frasco de 60 ml: lo llevas al trabajo, al gimnasio o de viaje.'],
    ],
    comparaTitulo: 'Por qué en gotas y no en polvo',
    compara: [
      'Se disuelve al instante en agua fría, sin grumos ni batidora.',
      'El gotero dosifica solo: no hay que medir cucharadas.',
      'Sabor menta, sin alcohol y sin gluten.',
    ],
    nombre: 'Clorofila Líquida Benevolent',
    sub: 'Sabor menta, en gotas, para tu vaso de agua del día',
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
    desc: 'Clorofila líquida Benevolent en frasco de 60 ml con gotero dosificador. Se disuelve en un vaso de agua fría y lo deja de un verde intenso, con sabor a menta suave: no sabe a pasto ni deja regusto amargo. Es libre de alcohol y libre de gluten, así viene declarado en el envase del fabricante. El frasco es chico, cabe en la cartera y lo usas donde estés. Es un suplemento alimentario: acompaña tu rutina diaria y no reemplaza una alimentación balanceada. La dosis sugerida viene en la etiqueta.',
    puntos: [
      'Frasco de 60 ml con gotero dosificador',
      'Se disuelve al instante en agua fría',
      'Sabor menta suave: no sabe a pasto',
      'Sin alcohol y sin gluten, declarado por el fabricante',
      'Cabe en la cartera: lo llevas a cualquier parte',
      'Un frasco rinde alrededor de un mes',
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
    desc: 'PARA QUÉ SIRVE. Lymphoria es un drenaje linfático en gotas: está pensado para apoyar el funcionamiento del sistema linfático, acompañar el equilibrio natural de líquidos del organismo y sumarse a una rutina de alimentación equilibrada y actividad física. Así lo declara su propio envase, «traditional lymphatic support». QUÉ ES. Un suplemento alimentario líquido de extractos de hierbas, en frasco de vidrio ámbar de 60 ml con gotero. Su fórmula son cuatro hierbas de la herbolaría clásica: cleavers (Galium aparine), flor de trébol rojo (Trifolium pratense), raíz de stillingia (Stillingia sylvatica) y corteza de fresno espinoso (Zanthoxylum americanum), 300 mg de mezcla por porción, en base líquida con sabor a miel. CÓMO SE TOMA. Unas gotas en tu vaso de agua o de jugo: nada de cápsulas que tragar ni de polvos que quedan con grumos. Es un suplemento alimentario, no un medicamento: acompaña tu alimentación y no la reemplaza.',
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
];
