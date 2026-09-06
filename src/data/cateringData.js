const cateringData = [
  {
    id: 1,
    nombre: "Catering Fiesta",
    imagen: "https://images.unsplash.com/photo-1507501336603-6e31db2be093",
    categoria: "Eventos sociales",
    tiposEvento: ["Boda", "Cumpleaños", "Quinceañera", "Fiesta privada"],
    tiposMenu: ["Tradicional", "Personalizado"],
    ubicacion: "📌San José",
    precioMinimo: 120000,
    precioMaximo: 450000,
    capacidadMinima: 20,
    capacidadMaxima: 300,
    calificacion: 4.8,
    diasDisponibles: [0, 5, 6],
    descripcionCorta: "Servicio de banquetes para bodas, cumpleaños y fiestas.",
    imagenes: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    ],
    info: "Nos especializamos en banquetes para celebraciones sociales: bodas, cumpleaños, quinceañeras y fiestas privadas. Incluye montaje de mesas, mantelería, menú personalizado y servicio de meseros. Capacidad de 20 a 300 invitados, con al menos 15 días de anticipación.",
    servicios: ["Montaje de mesas", "Mantelería", "Servicio de meseros", "Vajilla", "Decoración básica"],
    restricciones: ["Vegetariano", "Vegano", "Sin gluten bajo solicitud"],
    menus: [
      { nombre: "Paquete Esencial", precio: 120000, descripcion: "Entrada, plato fuerte y bebida." },
      { nombre: "Paquete Celebración", precio: 250000, descripcion: "Entrada, plato fuerte, postre, bebidas y servicio de meseros." },
      { nombre: "Paquete Premium", precio: 450000, descripcion: "Menú personalizado, montaje completo, postre, bebidas y atención integral." }
    ],
    resenas: [
      { autor: "María", puntuacion: 5, comentario: "Excelente atención y muy buena presentación de los alimentos." },
      { autor: "Carlos", puntuacion: 4, comentario: "El servicio fue puntual y el menú gustó mucho a los invitados." }
    ],
    contacto: { telefono: "8888-8888", whatsapp: "https://wa.me/50688888888" }
  },
  {
    id: 2,
    nombre: "Delicias Catering",
    imagen: "https://images.unsplash.com/photo-1555244162-803834f70033",
    categoria: "Eventos corporativos",
    tiposEvento: ["Evento corporativo", "Coffee break", "Almuerzo ejecutivo", "Lanzamiento de producto"],
    tiposMenu: ["Ejecutivo", "Coffee break"],
    ubicacion: "📌Heredia",
    precioMinimo: 90000,
    precioMaximo: 380000,
    capacidadMinima: 15,
    capacidadMaxima: 250,
    calificacion: 4.6,
    diasDisponibles: [1, 2, 3, 4, 5],
    descripcionCorta: "Catering profesional para reuniones y eventos empresariales.",
    imagenes: [
      "https://images.unsplash.com/photo-1555244162-803834f70033",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Servicio orientado a empresas: coffee breaks, almuerzos ejecutivos, lanzamientos de producto y eventos de fin de año. Menús adaptables a dietas especiales y facturación corporativa. Cobertura en GAM, reserva mínima 1 semana antes.",
    servicios: ["Coffee break", "Almuerzos ejecutivos", "Entrega programada", "Facturación corporativa", "Montaje básico"],
    restricciones: ["Vegetariano", "Bajo en azúcar", "Sin lactosa bajo solicitud"],
    menus: [
      { nombre: "Coffee Break", precio: 90000, descripcion: "Repostería, frutas, café y bebidas naturales." },
      { nombre: "Ejecutivo", precio: 190000, descripcion: "Plato fuerte, guarniciones, postre y bebida." },
      { nombre: "Corporativo Completo", precio: 380000, descripcion: "Coffee break, almuerzo, estación de bebidas y personal de apoyo." }
    ],
    resenas: [
      { autor: "Andrea", puntuacion: 5, comentario: "Muy organizados y puntuales para nuestra capacitación." },
      { autor: "Luis", puntuacion: 4, comentario: "Buena calidad y fácil coordinación con el equipo." }
    ],
    contacto: { telefono: "8777-7777", whatsapp: "https://wa.me/50687777777" }
  },
  {
    id: 3,
    nombre: "Sabor Gourmet",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    categoria: "Gourmet",
    tiposEvento: ["Cena privada", "Aniversario", "Maridaje", "Evento exclusivo"],
    tiposMenu: ["Gourmet", "Degustación"],
    ubicacion: "📌Escazú",
    precioMinimo: 180000,
    precioMaximo: 600000,
    capacidadMinima: 10,
    capacidadMaxima: 50,
    calificacion: 4.9,
    diasDisponibles: [2, 3, 4, 5, 6],
    descripcionCorta: "Menús especiales y experiencias gastronómicas personalizadas.",
    imagenes: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
    ],
    info: "Experiencias culinarias de autor para eventos exclusivos: cenas privadas, maridajes y menús degustación. Chef a cargo del diseño del menú según la ocasión. Ideal para grupos reducidos (10-50 personas) que buscan algo fuera de lo tradicional.",
    servicios: ["Chef privado", "Diseño de menú", "Maridaje", "Montaje gourmet", "Servicio en mesa"],
    restricciones: ["Vegetariano", "Vegano", "Sin gluten", "Menú personalizado"],
    menus: [
      { nombre: "Experiencia Gourmet", precio: 180000, descripcion: "Tres tiempos y bebida de cortesía." },
      { nombre: "Menú Degustación", precio: 350000, descripcion: "Cinco tiempos diseñados por el chef." },
      { nombre: "Experiencia Premium", precio: 600000, descripcion: "Menú degustación, maridaje y servicio personalizado." }
    ],
    resenas: [
      { autor: "Sofía", puntuacion: 5, comentario: "Una experiencia excelente de principio a fin." },
      { autor: "Daniel", puntuacion: 5, comentario: "El menú fue creativo y el servicio impecable." }
    ],
    contacto: { telefono: "8666-6666", whatsapp: "https://wa.me/50686666666" }
  },
  {
    id: 4,
    nombre: "Eventos La Mesa",
    imagen: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    categoria: "Bodas",
    tiposEvento: ["Boda", "Recepción", "Aniversario", "Fiesta privada"],
    tiposMenu: ["Banquete", "Buffet"],
    ubicacion: "📌Cartago",
    precioMinimo: 250000,
    precioMaximo: 850000,
    capacidadMinima: 50,
    capacidadMaxima: 400,
    calificacion: 4.7,
    diasDisponibles: [5, 6, 0],
    descripcionCorta: "Servicio completo de alimentación para bodas y celebraciones.",
    imagenes: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde"
    ],
    info: "Paquetes integrales para bodas: banquete, decoración de mesas, pastel y barra de bebidas. Coordinación con el resto de proveedores del evento el día de la boda. Reserva con al menos 1 mes de anticipación por temporada alta.",
    servicios: ["Banquete", "Decoración de mesas", "Pastel", "Barra de bebidas", "Coordinación del evento"],
    restricciones: ["Vegetariano", "Sin gluten bajo solicitud"],
    menus: [
      { nombre: "Boda Clásica", precio: 250000, descripcion: "Banquete, bebidas y montaje de mesas." },
      { nombre: "Boda Completa", precio: 520000, descripcion: "Banquete, pastel, bebidas y decoración." },
      { nombre: "Boda Premium", precio: 850000, descripcion: "Servicio integral con coordinación y menú personalizado." }
    ],
    resenas: [
      { autor: "Valeria", puntuacion: 5, comentario: "La coordinación fue muy buena y todo salió a tiempo." },
      { autor: "Esteban", puntuacion: 4, comentario: "Excelente presentación y muy buen trato." }
    ],
    contacto: { telefono: "8555-5555", whatsapp: "https://wa.me/50685555555" }
  },
  {
    id: 5,
    nombre: "Catering Express",
    imagen: "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
    categoria: "Eventos rápidos",
    tiposEvento: ["Coffee break", "Almuerzo rápido", "Reunión de trabajo", "Evento relámpago"],
    tiposMenu: ["Rápido", "Ejecutivo"],
    ubicacion: "📌Alajuela",
    precioMinimo: 60000,
    precioMaximo: 200000,
    capacidadMinima: 5,
    capacidadMaxima: 100,
    calificacion: 4.3,
    diasDisponibles: [1, 2, 3, 4, 5, 6],
    descripcionCorta: "Soluciones rápidas de catering para reuniones y eventos improvisados.",
    imagenes: [
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Servicio de catering ágil para eventos de última hora: coffee breaks, almuerzos rápidos y reuniones de trabajo. Menús sencillos y adaptables a cualquier horario. Ideal para empresas y particulares que necesitan soluciones inmediatas.",
    servicios: ["Entrega rápida", "Coffee break", "Almuerzos", "Bebidas", "Empaque individual"],
    restricciones: ["Vegetariano bajo solicitud"],
    menus: [
      { nombre: "Express", precio: 60000, descripcion: "Bocadillos, bebida y entrega." },
      { nombre: "Ejecutivo Express", precio: 120000, descripcion: "Almuerzo completo y bebida." },
      { nombre: "Reunión Completa", precio: 200000, descripcion: "Coffee break, almuerzo y bebidas para el grupo." }
    ],
    resenas: [
      { autor: "Jorge", puntuacion: 4, comentario: "Respondieron rápido y entregaron a tiempo." },
      { autor: "Natalia", puntuacion: 4, comentario: "Buena opción para reuniones pequeñas." }
    ],
    contacto: { telefono: "8444-4444", whatsapp: "https://wa.me/50684444444" }
  },
  {
    id: 6,
    nombre: "Catering Verde",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    categoria: "Catering ecológico",
    tiposEvento: ["Evento sostenible", "Catering vegano", "Fiesta ecológica", "Reunión verde"],
    tiposMenu: ["Vegano", "Vegetariano"],
    ubicacion: "📌Santa Ana",
    precioMinimo: 100000,
    precioMaximo: 400000,
    capacidadMinima: 20,
    capacidadMaxima: 200,
    calificacion: 4.8,
    diasDisponibles: [1, 2, 3, 4, 5, 6],
    descripcionCorta: "Catering con enfoque ecológico y sostenible para eventos conscientes.",
    imagenes: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Servicio de catering ecológico y sostenible para eventos conscientes: menús veganos, ingredientes locales y empaques reciclables. Coordinación con proveedores sostenibles y prácticas de reducción de residuos.",
    servicios: ["Ingredientes locales", "Empaques reciclables", "Montaje sostenible", "Gestión de residuos"],
    restricciones: ["Vegano", "Vegetariano", "Sin gluten bajo solicitud"],
    menus: [
      { nombre: "Verde Esencial", precio: 100000, descripcion: "Menú vegetariano con ingredientes locales." },
      { nombre: "Vegano Completo", precio: 220000, descripcion: "Entrada, plato fuerte, postre y bebida vegana." },
      { nombre: "Evento Sostenible", precio: 400000, descripcion: "Menú completo, montaje ecológico y gestión de residuos." }
    ],
    resenas: [
      { autor: "Paula", puntuacion: 5, comentario: "Muy buena propuesta y excelente manejo de opciones veganas." },
      { autor: "Mario", puntuacion: 5, comentario: "Nos gustó mucho el enfoque sostenible." }
    ],
    contacto: { telefono: "8333-3333", whatsapp: "https://wa.me/50683333333" }
  },
  {
    id: 7,
    nombre: "Brunch & Co.",
    imagen: "https://images.unsplash.com/photo-1533920379810-6bedac961555",
    categoria: "Brunch y desayunos",
    tiposEvento: ["Brunch", "Desayuno empresarial", "Baby shower", "Despedida de soltera"],
    tiposMenu: ["Brunch", "Desayuno"],
    ubicacion: "📌San Pedro",
    precioMinimo: 75000,
    precioMaximo: 280000,
    capacidadMinima: 10,
    capacidadMaxima: 120,
    calificacion: 4.5,
    diasDisponibles: [0, 1, 2, 3, 4, 5, 6],
    descripcionCorta: "Brunches frescos y desayunos especiales para celebraciones de día.",
    imagenes: [
      "https://images.unsplash.com/photo-1533920379810-6bedac961555",
      "https://images.unsplash.com/photo-1525351484163-7529414344d8"
    ],
    info: "Brunches artesanales con repostería, frutas, opciones saladas y estaciones de café. Ideal para reuniones matutinas, baby showers y celebraciones íntimas. Ofrecemos montaje sencillo y opciones vegetarianas.",
    servicios: ["Repostería", "Frutas", "Estación de café", "Montaje sencillo", "Servicio de mesa"],
    restricciones: ["Vegetariano", "Sin lactosa bajo solicitud"],
    menus: [
      { nombre: "Desayuno Ligero", precio: 75000, descripcion: "Repostería, fruta, café y jugo." },
      { nombre: "Brunch Clásico", precio: 160000, descripcion: "Opciones dulces y saladas, fruta y bebidas." },
      { nombre: "Brunch Premium", precio: 280000, descripcion: "Estación completa, bebidas y montaje especial." }
    ],
    resenas: [
      { autor: "Camila", puntuacion: 5, comentario: "Todo estaba fresco y la mesa quedó muy bonita." },
      { autor: "Fernanda", puntuacion: 4, comentario: "Muy buena atención para nuestro baby shower." }
    ],
    contacto: { telefono: "8222-2222", whatsapp: "https://wa.me/50682222222" }
  },
  {
    id: 8,
    nombre: "Rueda Libre Food Truck",
    imagen: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb",
    categoria: "Food truck",
    tiposEvento: ["Festival", "Feria gastronómica", "Fiesta juvenil", "Evento al aire libre"],
    tiposMenu: ["Urbano", "Vegetariano"],
    ubicacion: "📌San José",
    precioMinimo: 85000,
    precioMaximo: 320000,
    capacidadMinima: 30,
    capacidadMaxima: 500,
    calificacion: 4.4,
    diasDisponibles: [4, 5, 6, 0],
    descripcionCorta: "Comida urbana preparada al momento para eventos dinámicos y al aire libre.",
    imagenes: [
      "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9"
    ],
    info: "Food truck con hamburguesas, tacos, papas y opciones vegetarianas preparadas al momento. Una alternativa entretenida para festivales, ferias y fiestas al aire libre. Incluye personal de servicio y menú definido por cantidad de invitados.",
    servicios: ["Food truck", "Cocina en vivo", "Personal de servicio", "Menú por cantidad de invitados"],
    restricciones: ["Vegetariano"],
    menus: [
      { nombre: "Street Básico", precio: 85000, descripcion: "Hamburguesa o taco, papas y bebida." },
      { nombre: "Street Mix", precio: 180000, descripcion: "Selección de hamburguesas, tacos, papas y bebidas." },
      { nombre: "Festival", precio: 320000, descripcion: "Servicio completo del food truck para grupos grandes." }
    ],
    resenas: [
      { autor: "Kevin", puntuacion: 4, comentario: "Muy buena opción para eventos al aire libre." },
      { autor: "Laura", puntuacion: 5, comentario: "La comida salió rápido y gustó mucho." }
    ],
    contacto: { telefono: "8111-1111", whatsapp: "https://wa.me/50681111111" }
  },
  {
    id: 9,
    nombre: "PequeChef Eventos",
    imagen: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
    categoria: "Eventos infantiles",
    tiposEvento: ["Fiesta infantil", "Cumpleaños temático", "Comunión", "Actividad escolar"],
    tiposMenu: ["Infantil", "Temático"],
    ubicacion: "📌Alajuela",
    precioMinimo: 65000,
    precioMaximo: 240000,
    capacidadMinima: 10,
    capacidadMaxima: 150,
    calificacion: 4.5,
    diasDisponibles: [5, 6, 0],
    descripcionCorta: "Menús divertidos y prácticos para fiestas infantiles y actividades familiares.",
    imagenes: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
      "https://images.unsplash.com/photo-1559628233-8297f5d9a8f9"
    ],
    info: "Paquetes para fiestas infantiles con mini hamburguesas, pizza, frutas, dulces y bebidas. Adaptamos la presentación al tema de la celebración y ofrecemos alternativas para alergias alimentarias con solicitud previa.",
    servicios: ["Menú infantil", "Presentación temática", "Bebidas", "Dulces", "Montaje sencillo"],
    restricciones: ["Alergias alimentarias bajo solicitud", "Sin azúcar bajo solicitud"],
    menus: [
      { nombre: "Mini Fiesta", precio: 65000, descripcion: "Mini hamburguesa, papas, bebida y dulce." },
      { nombre: "Fiesta Temática", precio: 140000, descripcion: "Pizza, frutas, dulces y presentación temática." },
      { nombre: "Celebración Completa", precio: 240000, descripcion: "Menú completo, bebidas y montaje temático." }
    ],
    resenas: [
      { autor: "Mónica", puntuacion: 5, comentario: "A los niños les encantó la presentación." },
      { autor: "José", puntuacion: 4, comentario: "Muy atentos con las restricciones alimentarias." }
    ],
    contacto: { telefono: "8000-9090", whatsapp: "https://wa.me/50680009090" }
  },
  {
    id: 10,
    nombre: "Mesa Mediterránea",
    imagen: "https://images.unsplash.com/photo-1547592180-85f173990554",
    categoria: "Cocina mediterránea",
    tiposEvento: ["Cena familiar", "Evento vegetariano", "Aniversario", "Reunión privada"],
    tiposMenu: ["Mediterráneo", "Vegetariano"],
    ubicacion: "📌Curridabat",
    precioMinimo: 110000,
    precioMaximo: 420000,
    capacidadMinima: 12,
    capacidadMaxima: 180,
    calificacion: 4.7,
    diasDisponibles: [1, 2, 3, 4, 5, 6],
    descripcionCorta: "Sabores mediterráneos con opciones frescas, vegetarianas y para compartir.",
    imagenes: [
      "https://images.unsplash.com/photo-1547592180-85f173990554",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
    ],
    info: "Menús mediterráneos con hummus, ensaladas, panes artesanales, pastas y platos para compartir. Diseñamos propuestas vegetarianas y flexibles para cenas familiares, aniversarios y reuniones privadas.",
    servicios: ["Buffet mediterráneo", "Panes artesanales", "Ensaladas", "Servicio de mesa"],
    restricciones: ["Vegetariano", "Vegano bajo solicitud"],
    menus: [
      { nombre: "Mediterráneo Ligero", precio: 110000, descripcion: "Hummus, ensalada, panes y bebida." },
      { nombre: "Mesa Compartida", precio: 240000, descripcion: "Entradas, pastas, ensaladas y postre." },
      { nombre: "Mediterráneo Premium", precio: 420000, descripcion: "Menú completo para compartir con servicio de mesa." }
    ],
    resenas: [
      { autor: "Ricardo", puntuacion: 5, comentario: "Sabores muy frescos y buena variedad." },
      { autor: "Ana", puntuacion: 4, comentario: "Excelente opción vegetariana para reuniones." }
    ],
    contacto: { telefono: "8999-1212", whatsapp: "https://wa.me/50689991212" }
  },
  {
    id: 11,
    nombre: "Mar y Fuego Catering",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    categoria: "Mariscos y parrilla",
    tiposEvento: ["Cena de mariscos", "Parrillada", "Fiesta familiar", "Evento frente al mar"],
    tiposMenu: ["Mariscos", "Parrilla"],
    ubicacion: "📌Puntarenas",
    precioMinimo: 160000,
    precioMaximo: 580000,
    capacidadMinima: 20,
    capacidadMaxima: 220,
    calificacion: 4.6,
    diasDisponibles: [4, 5, 6, 0],
    descripcionCorta: "Parrilla y mariscos frescos para celebraciones con un menú memorable.",
    imagenes: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
    ],
    info: "Especialistas en mariscos frescos, parrilladas y estaciones de cocina en vivo. Propuesta ideal para celebraciones familiares y eventos costeros, con menús que se ajustan a la temporada y al presupuesto.",
    servicios: ["Mariscos frescos", "Parrilla", "Cocina en vivo", "Servicio de mesa"],
    restricciones: ["Sin gluten bajo solicitud"],
    menus: [
      { nombre: "Parrilla Clásica", precio: 160000, descripcion: "Selección de carnes, guarniciones y bebida." },
      { nombre: "Mar y Tierra", precio: 320000, descripcion: "Mariscos, carnes, ensaladas y bebidas." },
      { nombre: "Experiencia Mar y Fuego", precio: 580000, descripcion: "Cocina en vivo y menú completo premium." }
    ],
    resenas: [
      { autor: "Gabriela", puntuacion: 5, comentario: "Los mariscos estaban excelentes y muy frescos." },
      { autor: "Óscar", puntuacion: 4, comentario: "Muy buena parrilla y atención." }
    ],
    contacto: { telefono: "8770-4545", whatsapp: "https://wa.me/50687704545" }
  },
  {
    id: 12,
    nombre: "Punto Ejecutivo",
    imagen: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    categoria: "Alimentación empresarial",
    tiposEvento: ["Almuerzo empresarial", "Capacitación", "Conferencia", "Reunión ejecutiva"],
    tiposMenu: ["Ejecutivo", "Empresarial"],
    ubicacion: "📌La Sabana",
    precioMinimo: 70000,
    precioMaximo: 350000,
    capacidadMinima: 10,
    capacidadMaxima: 300,
    calificacion: 4.4,
    diasDisponibles: [1, 2, 3, 4, 5],
    descripcionCorta: "Alimentación puntual y organizada para reuniones, capacitaciones y conferencias.",
    imagenes: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    info: "Soluciones empresariales con desayunos, coffee breaks, almuerzos individuales y menús para conferencias. Entrega puntual, opciones de facturación y empaques prácticos para oficinas y centros de reuniones.",
    servicios: ["Desayunos", "Coffee breaks", "Almuerzos", "Facturación", "Entrega programada"],
    restricciones: ["Vegetariano", "Bajo en azúcar bajo solicitud"],
    menus: [
      { nombre: "Reunión Básica", precio: 70000, descripcion: "Coffee break con bebida y bocadillos." },
      { nombre: "Ejecutivo", precio: 180000, descripcion: "Almuerzo individual, postre y bebida." },
      { nombre: "Conferencia", precio: 350000, descripcion: "Coffee break, almuerzo y bebidas para jornada completa." }
    ],
    resenas: [
      { autor: "Patricia", puntuacion: 4, comentario: "Muy puntuales y fáciles de coordinar." },
      { autor: "Roberto", puntuacion: 5, comentario: "Funcionó muy bien para nuestra conferencia." }
    ],
    contacto: { telefono: "8660-7878", whatsapp: "https://wa.me/50686607878" }
  }
];

export default cateringData;
