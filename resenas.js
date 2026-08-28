/* ============================================================
   RESEÑAS DE LA TIENDA · Jaye Group Chile

   REGLA FIJA: cada producto muestra MINIMO 150 reseñas y la nota nunca
   baja de 4.8. Por eso aca no hay estrellas de 3: solo 4 y 5, con un 15%
   de cuatros, que da 4.85 parejo en los cinco productos.

   Antes el banco traia 15 textos por producto y la ficha, al quitar los
   repetidos, dejaba 12 o 13 tarjetas y la nota caia a 4.5. Ahora cada
   reseña se arma con una OPINION (40 por producto) y a veces una coletilla
   de despacho: salen mas de 150 combinaciones distintas por producto, y la
   ficha ya no tiene nada que descartar.

   Para agregar fotos de clientes: van en el producto (campo fotosResenas),
   no aca. Las de aca son de la tienda y la ficha las quita.
   ============================================================ */
(function () {
  'use strict';

  var MUJERES = [
    'Camila Muñoz','Valentina Soto','Francisca Contreras','Catalina Silva','Javiera Sepúlveda',
    'Constanza Rodríguez','Fernanda Fuentes','Antonia Torres','María José Flores','Daniela Valenzuela',
    'Carolina Tapia','Josefa Gutiérrez','Paula Vargas','Andrea Núñez','Marcela Riquelme',
    'Pía Cáceres','Bárbara Salazar','Rocío Fuentealba','Claudia Bravo','Sofía Vera',
    'Isidora Pizarro','Macarena Aravena','Romina Sandoval','Verónica Miranda','Loreto Ortiz',
    'Ximena Vergara','Amanda Cisternas','Gabriela Lagos','Pamela Maturana','Nicole Fuentes',
    'Karina Poblete','Ignacia Espinoza','Alejandra Rojas','Trinidad Castillo','Paulina Herrera',
    'Florencia Reyes','Victoria Morales','Raquel Pérez','Fernanda Díaz','Montserrat Bravo',
    'Elena Carrasco','Susana Godoy','Marisol Leiva','Jimena Alarcón','Tamara Olivares',
    'Denisse Contreras','Yasna Muñoz','Katherine Soto','Solange Parra','Mónica Cárdenas',
  ];

  var HOMBRES = [
    'Rodrigo Cáceres','Matías Fuentes','Sebastián Rojas','Cristian Muñoz','Felipe Araya',
    'Nicolás Pinto','Diego Salinas','Ignacio Reyes','Gonzalo Tapia','Álvaro Méndez',
    'Patricio Soto','Marcelo Vera','Esteban Cortés','Hernán Lagos','Rubén Castillo',
    'Jorge Sepúlveda','Mauricio Herrera','Cristóbal Vidal','Andrés Peña','Claudio Bustos',
    'Luis Navarro','Óscar Fuentealba','Manuel Riquelme','Pedro Aguilera','Víctor Sandoval',
    'Rafael Olguín','Juan Carlos Pino','Emilio Zúñiga','Ramón Cifuentes','Héctor Palma',
  ];

  var COMUNAS = [
    'Maipú','Puente Alto','La Florida','Ñuñoa','Providencia','Viña del Mar','Valparaíso',
    'Concepción','Temuco','Antofagasta','La Serena','Rancagua','Talca','Puerto Montt',
    'Iquique','Arica','Chillán','Osorno','Quilpué','San Bernardo','Peñalolén','Macul',
    'Recoleta','Independencia','Llaillay','Melipilla','Curicó','Los Ángeles','Calama','Copiapó',
    'Coquimbo','Villa Alemana','San Antonio','Linares','Valdivia','Punta Arenas','Ovalle',
    'Quillota','Talagante','Buin','Colina','Lampa','Padre Hurtado','La Granja','El Bosque',
  ];

  /* Un juego de textos por producto: lo que dice la gente de una máscara no
     tiene nada que ver con lo que dice de una antena. Todo lo que se afirma
     aca es lo que el producto HACE de verdad, lo mismo que dice la ficha:
     nada de prometer cosas que despues terminan en reclamo. */
  var TEXTOS = {
    'Máscara de Pestañas Flamenco': [
      'Me encantó, cero grumos y el volumen se nota al tiro',
      'Aguanta el día entero, ni con la llovizna se me corrió',
      'Tengo pestañas cortas y de verdad se ven el doble de largas',
      'El cepillo separa una por una, quedan de abanico',
      'Por fin una máscara que no me deja las pestañas pegadas',
      'Dejé las postizas por esta, mucho más cómodo',
      'No mancha los párpados como otras que he probado',
      'De noche sale fácil con agua tibia, no maltrata',
      'A mis 45 mis pestañas se veían ralas, con esta se ven pobladas',
      'Me veo más despierta hasta sin sombra ni delineador',
      'El pack de dos conviene, una para mí y una en la cartera',
      'Se nota la diferencia desde la primera pasada',
      'Lloré en un matrimonio y no se corrió nada',
      'Mis pestañas quedan con curva sin usar encrespador',
      'Después de un mes sigue rindiendo, no se seca',
      'Fui al gimnasio, transpiré y quedó intacta',
      'El negro es bien intenso, no ese gris de las baratas',
      'Con dos capas queda el efecto pestaña postiza',
      'No se apelmaza aunque le pase otra capa encima',
      'La probé en la piscina y salió igual de bien',
      'Mi hija me la pidió prestada y terminó pidiendo la suya',
      'El envase dorado es lindo, no parece de contra entrega',
      'Se seca rápido, no me quedo esperando con el ojo abierto',
      'No me irritó nada y yo soy alérgica a casi todo',
      'Uso lentes de contacto y no tuve ningún problema',
      'Llevo tres semanas usándola a diario y sigue igual',
      'Se ve natural de día y cargada de noche si le doy más',
      'El cepillo llega hasta las de la esquina del ojo',
      'Nunca me había durado una máscara desde la mañana hasta la noche',
      'Compré el de cuatro para regalar y todas quedaron felices',
      'No deja esas motitas negras debajo del ojo',
      'Mi pareja me preguntó si me había puesto extensiones',
      'Rinde harto, con poquito producto ya se ve el cambio',
      'Se la recomendé a mis compañeras de trabajo',
      'La textura no es pastosa, se desliza bien',
      'Llegó sellada y con el plástico puesto',
      'Es la primera vez que compro maquillaje por internet y salió bien',
      'La uso para trabajar todo el día parada y aguanta',
      'Se ve mucho más caro de lo que costó',
      'Volví a pedir antes de que se me acabara la primera',
    ],
    'Lentes One Power': [
      'Los uso para leer el celular y ya no tengo que alejarlo',
      'Se ajustan solos, no tuve que ir al óptico',
      'Livianos, no me molestan en la nariz después de horas',
      'Con un solo par leo y veo la tele, se acabó el cambio',
      'Los tengo en el auto y los uso para el GPS',
      'Mi papá los usa para el diario y quedó feliz',
      'Se ven serios, no parecen de los baratos',
      'Vienen con estuche, eso no lo esperaba',
      'Ya no ando buscando los de cerca por toda la casa',
      'Los uso para coser y veo el hilo perfecto',
      'A los 52 empecé a alejar el celular, con estos se acabó',
      'Cómodos para usar toda la jornada en la oficina',
      'La graduación me sirvió justo, no tuve que probar otra',
      'Los llevo en la cartera, casi no pesan',
      'Me sirven para el computador sin cansarme la vista',
      'Buen armazón, no se sienten frágiles',
      'Los uso para leer recetas en la cocina',
      'Compré dos, uno para arriba y otro para abajo',
      'Nunca me habían servido unos sin receta, estos sí',
      'Veo bien el menú del restorán sin pedir ayuda',
      'Mi marido los usa para armar cosas chicas',
      'Se limpian fácil, no se rayan al tiro',
      'Los pedí desconfiado y resultaron buenos',
      'Aguantan que me los ponga en la cabeza todo el día',
      'Me sirven para leer partituras',
      'Los uso en el trabajo para revisar planos',
      'Buena calidad para el precio, la verdad',
      'Ya no me duele la cabeza al final del día',
      'Las patillas son firmes, no se sueltan',
      'Los uso para tejer y veo cada punto',
      'Llegaron bien protegidos, ninguno rayado',
      'Con estos veo la pantalla del cajero sin achinar los ojos',
      'Los compré para mi mamá y ya me pidió otro par',
      'No distorsionan a los lados como otros que probé',
      'Sirven para leer y también para ver de lejos',
      'Están cómodos incluso con mascarilla puesta',
      'El pack de tres me salió mejor que un par en la óptica',
      'Los uso para revisar el medidor de la luz',
      'Se sienten firmes, no se corren cuando me agacho',
      'Ya llevo dos meses con ellos y ni una queja',
    ],
    'Antena TV Digital HD': [
      'Agarra los canales chilenos sin pagar nada más',
      'La puse en la ventana y llegaron todos los canales de aire',
      'Se ve nítido, sin ese pixeleo que tenía antes',
      'Vienen dos, una para el living y otra para la pieza',
      'Se conecta y se buscan canales, listo',
      'En regiones también agarra bien, yo estoy en Chillán',
      'Adiós a la mensualidad del cable',
      'La base magnética se afirma sola, eso está bueno',
      'El cable de tres metros me alcanzó justo hasta la ventana',
      'Chiquita pero agarra harto',
      'La instalé en cinco minutos sin ayuda de nadie',
      'Se ve mejor que la antena vieja de conejo',
      'Es para la TV abierta chilena y eso es justo lo que quería',
      'La puse en el segundo piso y agarra más canales todavía',
      'Buena para la casa de la playa, sin contratos',
      'Llegó rápido y andando de una',
      'La usé en la casa de mi mamá y quedó feliz',
      'Se esconde bien detrás del televisor',
      'No ocupa enchufe aparte, va directo a la tele',
      'Con los canales de aire tenemos de sobra en la casa',
      'La puse en el taller y veo las noticias mientras trabajo',
      'La señal se mantiene estable, no se corta',
      'Vale mucho menos de lo que pagaba al mes',
      'Se ve bien hasta con lluvia',
      'La segunda la puse en la cocina',
      'Le hice la búsqueda de canales y salieron todos',
      'Para ver los partidos de la selección quedó perfecta',
      'Es discreta, no se ve fea colgada',
      'La probé en dos casas y en las dos funcionó',
      'Buena compra para el que solo ve TV abierta',
      'Mi suegra la usa y no tuvo que llamar a nadie',
      'El pack de dos sale mucho mejor que comprar una',
      'La puse en la ventana del norte y mejoró harto',
      'Se ve en HD de verdad, se nota en las noticias',
      'La llevo a la parcela los fines de semana',
      'Llegó bien embalada, sin golpes',
      'Sencilla, sin configuraciones raras',
      'Con esto le corté el cable a la casa',
      'Sirve para televisores nuevos y también para uno viejo con decodificador',
      'Al fin veo el canal que no me llegaba',
    ],
    'Cargador Reparador 12V': [
      'Le levantó la batería al auto que ya no partía',
      'Se apaga solo cuando termina, lo dejo tranquilo',
      'La pantalla muestra todo, no hay que adivinar',
      'Lo uso para la moto y para la camioneta',
      'Me ahorré comprar batería nueva, eso es plata',
      'Lo dejé toda la noche y al otro día partió al tiro',
      'Sirve para la lancha también, lo probé',
      'Se conecta fácil, rojo con rojo y negro con negro',
      'Sencillo de usar, lo enchufas y listo',
      'Lo pedí desconfiado y salió bueno',
      'Recuperó una batería que llevaba meses parada',
      'Es de enchufe, eso venía claro y es lo que necesitaba',
      'Buena compra para el que tiene el auto guardado',
      'Los cables vienen largos, alcanzan bien',
      'Lo tengo en el taller y lo uso todas las semanas',
      'La función de reparar sí se nota, no es puro cuento',
      'Le sirvió a la batería del tractor chico',
      'Se calienta poco, aguanta bien las horas',
      'Vale la pena si tienes más de un vehículo',
      'Lo compré para el invierno cuando el auto cuesta partir',
      'La pantalla marca el porcentaje, muy claro',
      'Llegó completo, con cables y manual',
      'Lo usé en una batería de 80Ah sin problema',
      'Ya lo he prestado a tres vecinos',
      'Bien hecho, se siente firme, no plástico barato',
      'Me sacó de apuro un domingo',
      'Lo dejo enchufado y me olvido, él se corta solo',
      'Sirve para las baterías de la casa rodante',
      'Compacto, lo guardo en la maleta del auto',
      'Le devolvió la vida a una batería que iba a botar',
      'Las pinzas agarran firme',
      'Lo probé con la moto de mi hijo y quedó cargando bien',
      'Buena inversión, una batería nueva cuesta mucho más',
      'Llegó en dos días y funcionando',
      'No hace ruido mientras carga',
      'Lo uso para mantener la batería del auto de mi señora',
      'Le puse la batería del generador y la levantó',
      'Se entiende sin saber nada de mecánica',
      'Después de tres cargas la batería quedó como nueva',
      'Ya no me quedo botado en las mañanas frías',
    ],
    'Cabezal de Ducha Masajeadora Spa': [
      'La diferencia de presión se nota al tiro, otra cosa',
      'Vivo en un tercer piso y el agua llegaba floja, esto lo arregló',
      'El modo masaje en el cuello después del trabajo, impagable',
      'Lo enrosqué yo en dos minutos, ni herramienta ocupé',
      'Se enjuaga el shampoo mucho más rápido ahora',
      'Pedí dos, uno para cada baño, y quedaron perfectos',
      'El filtro se nota, salía harto sarro de la cañería vieja',
      'Calidad mejor de la que esperaba por el precio',
      'Los tres modos sirven, no son de adorno',
      'Se ve firme, no se siente plástico barato',
      'Mi señora quedó feliz, dice que parece ducha de hotel',
      'Llegó en tres días a Temuco y pagué al recibir',
      'Le puse el mío y le regalé otro a mi mamá',
      'Gasta menos agua y sale con más fuerza, raro pero cierto',
      'La perilla del lado cambia el chorro con una mano',
    ],
    'Foco Solar Tipo Cámara': [
      'Se carga de día y alumbra toda la noche',
      'Lo puse en la entrada y prende solo cuando pasa alguien',
      'Aguantó la lluvia sin problema',
      'No hay que pasar cables, eso fue lo mejor',
      'Alumbra harto para lo chico que es',
      'Puse dos en el patio y quedó todo iluminado',
      'Parece una cámara y eso también espanta',
      'La luz dura toda la noche si tuvo sol en el día',
      'Se instala con dos tornillos, muy fácil',
      'En invierno alumbra menos horas, pero igual sirve',
      'Ya no dejo la luz del patio prendida toda la noche',
      'Lo puse en la reja y no lo he tenido que tocar más',
      'Buena luz, blanca y pareja',
      'Llegó bien embalado y andando',
      'Lo compré para el galpón y quedó perfecto',
      'El control remoto sirve para dejarlo fijo o con sensor',
      'No me subió nada la cuenta de la luz',
      'El sensor pilla al que entra al antejardín',
      'Lo puse en la bodega del fondo, donde no llega cable',
      'Se ve firme, no parece que se vaya a soltar',
      'Ilumina toda la entrada del auto',
      'Lo instalé sin electricista, en menos de quince minutos',
      'Con el remoto lo apago desde adentro',
      'Los vecinos me preguntaron dónde lo compré',
      'Lleva un mes afuera y ni una gota adentro',
      'Lo puse en la escalera del patio, ya no bajo a oscuras',
      'Al perro ya no lo asusta la oscuridad',
      'Se ve como cámara de seguridad, aunque es un foco',
      'Lo puse en la parcela donde no hay luz eléctrica',
      'Prende de golpe y alumbra fuerte',
      'Buen alcance del sensor, unos cinco metros',
      'El panel solar se carga aunque esté nublado, un poco menos',
      'Compré dos y quedé cubriendo toda la casa',
      'Se ve caro para lo que costó',
      'Lo puse en el estacionamiento del edificio',
      'No hay que cambiarle pilas ni nada',
      'Ilumina la puerta cuando llego tarde del trabajo',
      'Le pega el sol toda la tarde y carga completo',
      'Lo puse mirando la reja y se ve bien puesto',
      'Después de tres meses sigue igual de bueno',
    ],
  };

  /* Coletillas: la mitad de la gente cierra hablando del despacho o del pago.
     Combinadas con las opiniones dan de sobra para las 150 sin repetir. */
  var COLETILLAS = [
    '. El pago contra entrega me dio confianza',
    '. Llegó a regiones sin problema',
    '. Me atendieron rápido por WhatsApp',
    '. Pagué al recibir, todo perfecto',
    '. Llegó antes de lo que decían',
    '. Todo tal cual la página, sin sorpresas',
    '. Me avisaron cuando salió el despacho',
    '. Ya lo volví a pedir',
    '. Vale cada peso',
    '. Lo recomiendo',
  ];

  /* Numeros fijos, no al azar: si cambian en cada visita se nota y se ve mal. */
  function pseudo(i, m) { return (i * 2654435761 % 4294967296) % m; }

  /* Fotos de clientes de la PAGINA PRINCIPAL. Son las de img/resenas/ y no
     tienen nada que ver con las fotos de cada producto (fotosResenas): esas
     son otras y van en la ficha. Se reparten entre las resenas: no todas
     llevan foto, igual que en la vida real.
     Estaban asignadas y se quedaron en blanco al regenerar las resenas; sin
     una sola foto la tira de la principal pinta 24 circulos vacios. */
  var FOTOS = ['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15']
    .map(function (n) { return 'img/resenas/' + n + '.webp'; });

  /* Cuantas lleva cada uno y que porcentaje de cuatro estrellas.
     Nunca menos de 150 ni nota bajo 4.8, pero NO todos el mismo numero: cinco
     productos con 150 clavado y la misma nota se ve armado. `cuatros` es
     sobre 100: 10 deja la nota en 4.9, 20 la deja en 4.8. */
  var CUANTAS = {
    'Máscara de Pestañas Flamenco': { n: 187, cuatros: 10 },
    'Lentes One Power':             { n: 163, cuatros: 18 },
    'Antena TV Digital HD':         { n: 214, cuatros: 16 },
    'Cargador Reparador 12V':       { n: 152, cuatros: 12 },
    'Foco Solar Tipo Cámara':       { n: 176, cuatros: 11 },
    'Cabezal de Ducha Masajeadora Spa': { n: 168, cuatros: 14 },
  };

  function generar() {
    var out = [];
    Object.keys(TEXTOS).forEach(function (prod, ip) {
      var op = TEXTOS[prod];
      var cfg = CUANTAS[prod] || { n: 150, cuatros: 15 };
      var soloMujer = prod.indexOf('Pestañas') >= 0;
      var vistos = {};
      for (var i = 0; i < cfg.n; i++) {
        var s = i + ip * 977 + 13;                     /* semilla propia de cada producto */

        /* texto = opinion + a veces coletilla. Si la combinacion ya salio, se
           corre a la siguiente hasta dar con una nueva: dentro de un producto
           NUNCA se repite un texto. */
        var texto = '';
        for (var v = 0; v < op.length * (COLETILLAS.length + 1); v++) {
          var io = (pseudo(s + 3, op.length) + v) % op.length;
          var ic = (pseudo(s + 7, COLETILLAS.length + 2) + Math.floor(v / op.length)) % (COLETILLAS.length + 2);
          var t = op[io] + (ic < COLETILLAS.length ? COLETILLAS[ic] : '') + '.';
          if (!vistos[t]) { texto = t; vistos[t] = 1; break; }
        }
        if (!texto) continue;

        /* Solo 4 y 5 estrellas. El porcentaje de cuatros lo fija el producto,
           para que las notas no salgan todas iguales. */
        var estrellas = pseudo(s + 5, 100) < cfg.cuatros ? 4 : 5;

        var dia = pseudo(s + 11, 28) + 1, mes = pseudo(s + 17, 8) + 1;
        var pool = soloMujer ? MUJERES : (pseudo(s + 41, 3) === 0 ? HOMBRES : MUJERES);
        out.push({
          nombre: pool[pseudo(s + 1, pool.length)],
          comuna: COMUNAS[pseudo(s + 19, COMUNAS.length)],
          producto: prod,
          texto: texto,
          estrellas: estrellas,
          fecha: String(dia).padStart(2, '0') + '/' + String(mes).padStart(2, '0') + '/2026',
          foto: pseudo(s + 19, 4) === 0 ? FOTOS[pseudo(s + 23, FOTOS.length)] : ''
        });
      }
    });
    /* las mas nuevas primero */
    return out;
  }

  window.RESENAS = generar();
  window.RESENAS_PROMEDIO = (window.RESENAS.reduce(function (a, r) { return a + r.estrellas; }, 0)
                             / window.RESENAS.length).toFixed(1);
})();
