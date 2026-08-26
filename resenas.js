/* ============================================================
   RESEÑAS DE LA TIENDA · Jaye Group Chile

   Mismo molde que la landing de la máscara: un juego de nombres y de
   textos por producto, y de ahí sale la lista completa. Las que escriben
   los clientes desde la página se guardan aparte y salen primero.

   Para agregar fotos: ponlas en img/resenas/ y agrégalas a FOTOS.
   ============================================================ */
(function () {
  'use strict';

  var NOMBRES = [
    'Camila Muñoz','Valentina Soto','Francisca Contreras','Catalina Silva','Javiera Sepúlveda',
    'Constanza Rodríguez','Fernanda Fuentes','Antonia Torres','María José Flores','Daniela Valenzuela',
    'Carolina Tapia','Josefa Gutiérrez','Paula Vargas','Andrea Núñez','Marcela Riquelme',
    'Pía Cáceres','Bárbara Salazar','Rocío Fuentealba','Claudia Bravo','Sofía Vera',
    'Isidora Pizarro','Macarena Aravena','Romina Sandoval','Verónica Miranda','Loreto Ortiz',
    'Ximena Vergara','Amanda Cisternas','Gabriela Lagos','Pamela Maturana','Nicole Fuentes',
    'Karina Poblete','Ignacia Espinoza','Alejandra Rojas','Trinidad Castillo','Paulina Herrera',
    'Florencia Reyes','Victoria Morales','Raquel Pérez','Fernanda Díaz','Montserrat Bravo',
    'Rodrigo Cáceres','Matías Fuentes','Sebastián Rojas','Cristian Muñoz','Felipe Araya',
    'Nicolás Pinto','Diego Salinas','Ignacio Reyes','Gonzalo Tapia','Álvaro Méndez',
    'Patricio Soto','Marcelo Vera','Esteban Cortés','Hernán Lagos','Rubén Castillo',
    'Jorge Sepúlveda','Mauricio Herrera','Cristóbal Vidal','Andrés Peña','Claudio Bustos'
  ];

  var COMUNAS = [
    'Maipú','Puente Alto','La Florida','Ñuñoa','Providencia','Viña del Mar','Valparaíso',
    'Concepción','Temuco','Antofagasta','La Serena','Rancagua','Talca','Puerto Montt',
    'Iquique','Arica','Chillán','Osorno','Quilpué','San Bernardo','Peñalolén','Macul',
    'Recoleta','Independencia','Llaillay','Melipilla','Curicó','Los Ángeles','Calama','Copiapó'
  ];

  /* Un juego de textos por producto: lo que dice la gente de una máscara no
     tiene nada que ver con lo que dice de una antena. */
  var TEXTOS = {
    'Máscara de Pestañas Flamenco': [
      'Me encantó, cero grumos y el volumen se nota al tiro.',
      'Aguanta el día entero, ni con la llovizna se me corrió.',
      'Tengo pestañas cortas y de verdad se ven el doble de largas.',
      'El cepillo separa una por una, quedan de abanico.',
      'Por fin una máscara que no me deja las pestañas pegadas.',
      'Dejé las postizas por esta, mucho más cómodo.',
      'No mancha los párpados como otras que he probado.',
      'De noche sale fácil con agua tibia, no maltrata.',
      'A mis 45 mis pestañas se veían ralas, con esta se ven pobladas.',
      'Me veo más despierta hasta sin sombra ni delineador.',
      'El pack de dos conviene, una para mí y una en la cartera.',
      'Se nota la diferencia desde la primera pasada.',
      'Lloré en un matrimonio y no se corrió nada.',
      'Mis pestañas quedan con curva sin usar encrespador.',
      'Después de un mes sigue rindiendo, no se seca.'
    ],
    'Lentes One Power': [
      'Los uso para leer el celular y ya no tengo que alejarlo.',
      'Se ajustan solos, no tuve que ir al óptico.',
      'Mi papá los usa para el diario y quedó feliz.',
      'Livianos, no me molestan en la nariz después de horas.',
      'Los tengo en el auto para leer letreros de cerca.',
      'Vienen con su estuche, se guardan bien.',
      'Sirven para leer y para trabajar en el computador.',
      'Compré el pack de dos, uno para la casa y otro para el trabajo.',
      'Se ven serios, no parecen lentes baratos.',
      'Dejé de pedirle a mi señora que me leyera las etiquetas.',
      'A mi edad ya no veía de cerca, con estos leo tranquilo.',
      'Buena calidad para lo que cuestan.',
      'Los armé en dos minutos siguiendo las instrucciones.',
      'Los uso para coser y ahora enhebro sin pelear.',
      'El graduado se ajusta a cada ojo, eso me sorprendió.'
    ],
    'Antena TV Digital': [
      'Agarró todos los canales abiertos sin cable ni nada.',
      'La puse en la ventana y sintoniza perfecto.',
      'Nos ahorramos el cable, en la casa vemos todo gratis.',
      'Se instala en cinco minutos, ni herramientas usé.',
      'En regiones también agarra bien, yo estoy en Chillán.',
      'La imagen se ve nítida, mejor que la antena vieja.',
      'Compré dos, una para el living y otra para la pieza.',
      'Es chica y no se ve fea colgada en la pared.',
      'Los partidos se ven sin cortes.',
      'Mi mamá la usa en su departamento y agarra parejo.',
      'Por el precio, hace lo que promete.',
      'Ya no pago suscripción para ver los canales normales.',
      'Llegó rápido y funcionando de una.',
      'En el campo agarra menos canales pero igual sirve.',
      'Se conecta directo al televisor, sin decodificador.'
    ],
    'Cargador de Baterías': [
      'Cargo las pilas de los controles y del reloj sin problema.',
      'Se apaga solo cuando termina, eso me da tranquilidad.',
      'Dejé de comprar pilas todos los meses.',
      'Sirve para varios tamaños, eso no lo esperaba.',
      'Las luces te dicen cuándo está lista cada pila.',
      'Lo uso para las pilas de los juguetes de mis hijos.',
      'No se calienta como otros que he tenido.',
      'Compacto, no ocupa espacio en el enchufe.',
      'Cargué pilas que creía muertas y revivieron.',
      'Buena compra, se paga solo en pilas ahorradas.',
      'Lo tengo hace un mes y funciona igual de bien.',
      'Vino todo completo, no faltó nada.',
      'Lo pedí desconfiado y salió bueno.',
      'Cargo cuatro a la vez, me rinde harto.',
      'Sencillo de usar, lo enchufas y listo.'
    ],
    'Foco Solar': [
      'Se carga de día y alumbra toda la noche.',
      'Lo puse en la entrada y prende solo cuando pasa alguien.',
      'Aguantó la lluvia sin problema.',
      'No hay que pasar cables, eso fue lo mejor.',
      'Alumbra harto para lo chico que es.',
      'Puse dos en el patio y quedó todo iluminado.',
      'Se ve como una cámara, eso también espanta.',
      'La luz dura toda la noche si tuvo sol en el día.',
      'Se instala con dos tornillos, muy fácil.',
      'En invierno alumbra menos horas, pero igual sirve.',
      'Ya no dejo la luz del patio prendida toda la noche.',
      'Lo puse en la reja y no lo he tenido que tocar más.',
      'Buena luz, blanca y pareja.',
      'Llegó bien embalado y andando.',
      'Lo compré para el galpón y quedó perfecto.'
    ]
  };

  var GENERICOS = [
    'El pago contra entrega me dio confianza para pedir.',
    'Llegó a regiones sin problema, muy buena atención.',
    'Atención por WhatsApp muy rápida, llegó en dos días.',
    'Pedido fácil, pagué al recibir, todo perfecto.',
    'Llegó bien embalado y antes de lo esperado.',
    'Vale cada peso, ya lo volví a pedir.',
    'Me avisaron cuando salió el despacho, muy ordenados.',
    'Todo tal cual la página, sin sorpresas.'
  ];

  /* Fotos de clientes. Se reparten entre las reseñas: no todas llevan foto,
     igual que en la vida real. */
  var FOTOS = ['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10']
    .map(function (n) { return 'img/resenas/' + n + '.webp'; });

  /* Numeros fijos, no al azar: si cambian en cada visita se nota y se ve mal. */
  function pseudo(i, m) { return (i * 2654435761 % 4294967296) % m; }

  function generar(cuantas) {
    var prods = Object.keys(TEXTOS), out = [];
    for (var i = 0; i < cuantas; i++) {
      var prod = prods[pseudo(i + 11, prods.length)];
      var lista = TEXTOS[prod];
      var usaGenerico = pseudo(i + 29, 7) === 0;
      var texto = usaGenerico ? GENERICOS[pseudo(i + 37, GENERICOS.length)]
                              : lista[pseudo(i + 3, lista.length)];
      var e = pseudo(i + 5, 22);
      var estrellas = e === 0 ? 3 : (e < 4 ? 4 : 5);
      var dia = pseudo(i + 7, 28) + 1, mes = pseudo(i + 13, 8) + 1;
      out.push({
        nombre: NOMBRES[pseudo(i + 1, NOMBRES.length)],
        comuna: COMUNAS[pseudo(i + 17, COMUNAS.length)],
        producto: prod,
        texto: texto,
        estrellas: estrellas,
        fecha: String(dia).padStart(2, '0') + '/' + String(mes).padStart(2, '0') + '/2026',
        foto: pseudo(i + 19, 4) === 0 ? FOTOS[pseudo(i + 23, FOTOS.length)] : ''
      });
    }
    return out;
  }

  window.RESENAS = generar(512);
  window.RESENAS_PROMEDIO = (window.RESENAS.reduce(function (a, r) { return a + r.estrellas; }, 0)
                             / window.RESENAS.length).toFixed(1);
})();
