const cateringData = [
  {
    id: 1,
    nombre: "Catering Fiesta",
    imagen: "https://images.unsplash.com/photo-1507501336603-6e31db2be093",
    categoria: "Eventos sociales",
    tiposEvento: ["Boda", "Cumpleaños", "Quinceañera", "Fiesta privada"],
    ubicacion: "📌San José",
    precioMinimo: 120000,
    precioMaximo: 450000,
    capacidadMinima: 20,
    capacidadMaxima: 300,
    descripcionCorta: "Servicio de banquetes para bodas, cumpleaños y fiestas.",
    imagenes: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    ],
    info: "Nos especializamos en banquetes para celebraciones sociales: bodas, cumpleaños, quinceañeras y fiestas privadas. Incluye montaje de mesas, mantelería, menú personalizado y servicio de meseros. Capacidad de 20 a 300 invitados, con al menos 15 días de anticipación.",
    contacto: { telefono: "8888-8888", whatsapp: "https://wa.me/50688888888" }
  },
  {
    id: 2,
    nombre: "Delicias Catering",
    imagen: "https://images.unsplash.com/photo-1555244162-803834f70033",
    categoria: "Eventos corporativos",
    tiposEvento: ["Evento corporativo", "Coffee break", "Almuerzo ejecutivo", "Lanzamiento de producto"],
    ubicacion: "📌Heredia",
    precioMinimo: 90000,
    precioMaximo: 380000,
    capacidadMinima: 15,
    capacidadMaxima: 250,
    descripcionCorta: "Catering profesional para reuniones y eventos empresariales.",
    imagenes: [
      "https://images.unsplash.com/photo-1555244162-803834f70033",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Servicio orientado a empresas: coffee breaks, almuerzos ejecutivos, lanzamientos de producto y eventos de fin de año. Menús adaptables a dietas especiales y facturación corporativa. Cobertura en GAM, reserva mínima 1 semana antes.",
    contacto: { telefono: "8777-7777", whatsapp: "https://wa.me/50687777777" }
  },
  {
    id: 3,
    nombre: "Sabor Gourmet",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    categoria: "Gourmet",
    tiposEvento: ["Cena privada", "Aniversario", "Maridaje", "Evento exclusivo"],
    ubicacion: "📌Escazú",
    precioMinimo: 180000,
    precioMaximo: 600000,
    capacidadMinima: 10,
    capacidadMaxima: 50,
    descripcionCorta: "Menús especiales y experiencias gastronómicas personalizadas.",
    imagenes: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
    ],
    info: "Experiencias culinarias de autor para eventos exclusivos: cenas privadas, maridajes y menús degustación. Chef a cargo del diseño del menú según la ocasión. Ideal para grupos reducidos (10-50 personas) que buscan algo fuera de lo tradicional.",
    contacto: { telefono: "8666-6666", whatsapp: "https://wa.me/50686666666" }
  },
  {
    id: 4,
    nombre: "Eventos La Mesa",
    imagen: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    categoria: "Bodas",
    tiposEvento: ["Boda", "Recepción", "Aniversario", "Fiesta privada"],
    ubicacion: "📌Cartago",
    precioMinimo: 250000,
    precioMaximo: 850000,
    capacidadMinima: 50,
    capacidadMaxima: 400,
    descripcionCorta: "Servicio completo de alimentación para bodas y celebraciones.",
    imagenes: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde"
    ],
    info: "Paquetes integrales para bodas: banquete, decoración de mesas, pastel y barra de bebidas. Coordinación con el resto de proveedores del evento el día de la boda. Reserva con al menos 1 mes de anticipación por temporada alta.",
    contacto: { telefono: "8555-5555", whatsapp: "https://wa.me/50685555555" }
  },
  {
    id: 5,
    nombre: "Catering Express",
    imagen: "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
    categoria: "Eventos rápidos",
    tiposEvento: ["Coffee break", "Almuerzo rápido", "Reunión de trabajo", "Evento relámpago"], 
    ubicacion: "📌Alajuela",
    precioMinimo: 60000,
    precioMaximo: 200000,
    capacidadMinima: 5,
    capacidadMaxima: 100,
    descripcionCorta: "Soluciones rápidas de catering para reuniones y eventos improvisados.",
    imagenes: [
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Servicio de catering ágil para eventos de última hora: coffee breaks, almuerzos rápidos y reuniones de trabajo. Menús sencillos y adaptables a cualquier horario. Ideal para empresas y particulares que necesitan soluciones inmediatas.",
    contacto: { telefono: "8444-4444", whatsapp: "https://wa.me/50684444444" }
  },

  {
    id: 6,
    nombre: "Catering Verde",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    categoria: "Catering ecológico",
    tiposEvento: ["Evento sostenible", "Catering vegano", "Fiesta ecológica", "Reunión verde"],
    ubicacion: "📌Santa Ana",
    precioMinimo: 100000,
    precioMaximo: 400000,
    capacidadMinima: 20,
    capacidadMaxima: 200,
    descripcionCorta: "Catering con enfoque ecológico y sostenible para eventos conscientes.",
    imagenes: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Servicio de catering ecológico y sostenible para eventos conscientes: menús veganos, ingredientes locales y empaques reciclables. Coordinación con proveedores sostenibles y prácticas de reducción de residuos.",
    contacto: { telefono: "8333-3333", whatsapp: "https://wa.me/50683333333" }
  },
  {
    id: 7,
    nombre: "Brunch & Co.",
    imagen: "https://images.unsplash.com/photo-1533920379810-6bedac961555",
    categoria: "Brunch y desayunos",
    tiposEvento: ["Brunch", "Desayuno empresarial", "Baby shower", "Despedida de soltera"],
    ubicacion: "📌San Pedro",
    precioMinimo: 75000,
    precioMaximo: 280000,
    capacidadMinima: 10,
    capacidadMaxima: 120,
    descripcionCorta: "Brunches frescos y desayunos especiales para celebraciones de día.",
    imagenes: [
      "https://images.unsplash.com/photo-1533920379810-6bedac961555",
      "https://images.unsplash.com/photo-1525351484163-7529414344d8"
    ],
    info: "Brunches artesanales con repostería, frutas, opciones saladas y estaciones de café. Ideal para reuniones matutinas, baby showers y celebraciones íntimas. Ofrecemos montaje sencillo y opciones vegetarianas.",
    contacto: { telefono: "8222-2222", whatsapp: "https://wa.me/50682222222" }
  },
  {
    id: 8,
    nombre: "Rueda Libre Food Truck",
    imagen: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb",
    categoria: "Food truck",
    tiposEvento: ["Festival", "Feria gastronómica", "Fiesta juvenil", "Evento al aire libre"],
    ubicacion: "📌San José",
    precioMinimo: 85000,
    precioMaximo: 320000,
    capacidadMinima: 30,
    capacidadMaxima: 500,
    descripcionCorta: "Comida urbana preparada al momento para eventos dinámicos y al aire libre.",
    imagenes: [
      "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9"
    ],
    info: "Food truck con hamburguesas, tacos, papas y opciones vegetarianas preparadas al momento. Una alternativa entretenida para festivales, ferias y fiestas al aire libre. Incluye personal de servicio y menú definido por cantidad de invitados.",
    contacto: { telefono: "8111-1111", whatsapp: "https://wa.me/50681111111" }
  },
  {
    id: 9,
    nombre: "PequeChef Eventos",
    imagen: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
    categoria: "Eventos infantiles",
    tiposEvento: ["Fiesta infantil", "Cumpleaños temático", "Comunión", "Actividad escolar"],
    ubicacion: "📌Alajuela",
    precioMinimo: 65000,
    precioMaximo: 240000,
    capacidadMinima: 10,
    capacidadMaxima: 150,
    descripcionCorta: "Menús divertidos y prácticos para fiestas infantiles y actividades familiares.",
    imagenes: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
      "https://images.unsplash.com/photo-1559628233-8297f5d9a8f9"
    ],
    info: "Paquetes para fiestas infantiles con mini hamburguesas, pizza, frutas, dulces y bebidas. Adaptamos la presentación al tema de la celebración y ofrecemos alternativas para alergias alimentarias con solicitud previa.",
    contacto: { telefono: "8000-9090", whatsapp: "https://wa.me/50680009090" }
  },
  {
    id: 10,
    nombre: "Mesa Mediterránea",
    imagen: "https://images.unsplash.com/photo-1547592180-85f173990554",
    categoria: "Cocina mediterránea",
    tiposEvento: ["Cena familiar", "Evento vegetariano", "Aniversario", "Reunión privada"],
    ubicacion: "📌Curridabat",
    precioMinimo: 110000,
    precioMaximo: 420000,
    capacidadMinima: 12,
    capacidadMaxima: 180,
    descripcionCorta: "Sabores mediterráneos con opciones frescas, vegetarianas y para compartir.",
    imagenes: [
      "https://images.unsplash.com/photo-1547592180-85f173990554",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
    ],
    info: "Menús mediterráneos con hummus, ensaladas, panes artesanales, pastas y platos para compartir. Diseñamos propuestas vegetarianas y flexibles para cenas familiares, aniversarios y reuniones privadas.",
    contacto: { telefono: "8999-1212", whatsapp: "https://wa.me/50689991212" }
  },
  {
    id: 11,
    nombre: "Mar y Fuego Catering",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    categoria: "Mariscos y parrilla",
    tiposEvento: ["Cena de mariscos", "Parrillada", "Fiesta familiar", "Evento frente al mar"],
    ubicacion: "📌Puntarenas",
    precioMinimo: 160000,
    precioMaximo: 580000,
    capacidadMinima: 20,
    capacidadMaxima: 220,
    descripcionCorta: "Parrilla y mariscos frescos para celebraciones con un menú memorable.",
    imagenes: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
    ],
    info: "Especialistas en mariscos frescos, parrilladas y estaciones de cocina en vivo. Propuesta ideal para celebraciones familiares y eventos costeros, con menús que se ajustan a la temporada y al presupuesto.",
    contacto: { telefono: "8770-4545", whatsapp: "https://wa.me/50687704545" }
  },
  {
    id: 12,
    nombre: "Punto Ejecutivo",
    imagen: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    categoria: "Alimentación empresarial",
    tiposEvento: ["Almuerzo empresarial", "Capacitación", "Conferencia", "Reunión ejecutiva"],
    ubicacion: "📌La Sabana",
    precioMinimo: 70000,
    precioMaximo: 350000,
    capacidadMinima: 10,
    capacidadMaxima: 300,
    descripcionCorta: "Alimentación puntual y organizada para reuniones, capacitaciones y conferencias.",
    imagenes: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Soluciones empresariales con desayunos, coffee breaks, almuerzos individuales y menús para conferencias. Entrega puntual, opciones de facturación y empaques prácticos para oficinas y centros de reuniones.",
    contacto: { telefono: "8660-7878", whatsapp: "https://wa.me/50686607878" }
  }
];



export default cateringData;
