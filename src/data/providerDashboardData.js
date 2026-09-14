export const providerDashboardData = {
  business: {
    name: 'Catering Fiesta',
    description:
      'Servicio especializado en bodas, celebraciones familiares y eventos corporativos.',
    location: 'San José, Costa Rica',
    phone: '+506 8888-0000',
    email: 'contacto@cateringfiesta.cr',
    whatsapp: 'https://wa.me/50688880000',
    minCapacity: 20,
    maxCapacity: 200,
    specialties: ['Cocina costarricense', 'Buffet', 'Repostería'],
    eventTypes: ['Boda', 'Corporativo', 'Cumpleaños'],
    portfolio: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
    ]
  },
  menus: [
    {
      id: 'menu-001',
      name: 'Boda elegante',
      description: 'Menú premium para bodas con opciones gourmet y servicios completos.',
      eventType: 'Boda',
      pricingModel: 'Por persona',
      price: 5500,
      minGuests: 40,
      maxGuests: 150,
      starters: ['Ensalada de quinoa', 'Sopa de calabaza'],
      mains: ['Lomito en salsa de vino', 'Pescado al ajonjolí'],
      desserts: ['Panacota de mango'],
      drinks: ['Jugo natural', 'Refrescos'],
      restrictions: ['Vegetariano', 'Sin gluten'],
      services: ['Vajilla', 'Meseros', 'Decoración']
    },
    {
      id: 'menu-002',
      name: 'Evento corporativo',
      description: 'Menú ejecutivo para eventos con presentación moderna y servicio ágil.',
      eventType: 'Corporativo',
      pricingModel: 'Por paquete',
      price: 180000,
      minGuests: 30,
      maxGuests: 120,
      starters: ['Canapés de queso', 'Mini wraps'],
      mains: ['Pollo al curry', 'Arroz con vegetales'],
      desserts: ['Brownie con café'],
      drinks: ['Café', 'Agua'],
      restrictions: ['Sin lactosa'],
      services: ['Utilería', 'Bartender']
    }
  ],
  transactions: [
    {
      id: 'transaction-001',
      type: 'income',
      eventId: 'event-001',
      date: '2026-09-14',
      concept: 'Anticipo de boda de Ana y Luis',
      amount: 250000,
      category: 'Anticipo'
    },
    {
      id: 'transaction-002',
      type: 'income',
      eventId: 'event-002',
      date: '2026-09-12',
      concept: 'Pago final evento corporativo',
      amount: 320000,
      category: 'Pago final'
    },
    {
      id: 'transaction-003',
      type: 'expense',
      eventId: 'event-001',
      date: '2026-09-10',
      concept: 'Compra de carnes',
      amount: 75000,
      category: 'Insumos'
    },
    {
      id: 'transaction-004',
      type: 'expense',
      eventId: 'event-003',
      date: '2026-09-08',
      concept: 'Alquiler de vajilla',
      amount: 40000,
      category: 'Alquiler'
    },
    {
      id: 'transaction-005',
      type: 'expense',
      eventId: 'event-002',
      date: '2026-09-09',
      concept: 'Pago de personal temporal',
      amount: 68000,
      category: 'Personal'
    }
  ],
  events: [
    {
      id: 'event-001',
      clientName: 'Ana Rodríguez',
      eventType: 'Boda',
      date: '2026-10-18',
      time: '17:00',
      location: 'Heredia',
      guests: 80,
      menuId: 'menu-001',
      menuName: 'Boda elegante',
      status: 'Confirmado',
      notes: 'Dos invitados vegetarianos.',
      services: ['Vajilla', 'Meseros']
    },
    {
      id: 'event-002',
      clientName: 'Grupo Tecno',
      eventType: 'Corporativo',
      date: '2026-10-25',
      time: '18:30',
      location: 'San José',
      guests: 65,
      menuId: 'menu-002',
      menuName: 'Evento corporativo',
      status: 'Confirmado',
      notes: 'Requiere opciones sin lactosa.',
      services: ['Bartender', 'Utilería']
    },
    {
      id: 'event-003',
      clientName: 'Familia Gómez',
      eventType: 'Cumpleaños',
      date: '2026-11-05',
      time: '16:00',
      location: 'Alajuela',
      guests: 40,
      menuId: 'menu-001',
      menuName: 'Boda elegante',
      status: 'Pendiente',
      notes: 'Aún no confirma detalles finales.',
      services: ['Decoración']
    }
  ],
  recipes: [
    {
      menuId: 'menu-001',
      dishes: [
        {
          dishName: 'Lomito en salsa de vino',
          category: 'Plato fuerte',
          ingredients: [
            { name: 'Lomito de res', quantityPerGuest: 0.22, unit: 'kg' },
            { name: 'Salsa de vino', quantityPerGuest: 0.08, unit: 'L' },
            { name: 'Puré de papa', quantityPerGuest: 0.18, unit: 'kg' }
          ]
        },
        {
          dishName: 'Ensalada de quinoa',
          category: 'Entrada',
          ingredients: [
            { name: 'Quinoa', quantityPerGuest: 0.12, unit: 'kg' },
            { name: 'Vegetales mixtos', quantityPerGuest: 0.15, unit: 'kg' }
          ]
        },
        {
          dishName: 'Panacota de mango',
          category: 'Postre',
          ingredients: [
            { name: 'Mango', quantityPerGuest: 0.12, unit: 'kg' },
            { name: 'Crema', quantityPerGuest: 0.05, unit: 'L' }
          ]
        }
      ]
    },
    {
      menuId: 'menu-002',
      dishes: [
        {
          dishName: 'Pollo al curry',
          category: 'Plato fuerte',
          ingredients: [
            { name: 'Pollo', quantityPerGuest: 0.2, unit: 'kg' },
            { name: 'Salsa de curry', quantityPerGuest: 0.07, unit: 'L' }
          ]
        },
        {
          dishName: 'Mini wraps',
          category: 'Entrada',
          ingredients: [
            { name: 'Tortillas', quantityPerGuest: 0.08, unit: 'kg' },
            { name: 'Queso', quantityPerGuest: 0.04, unit: 'kg' }
          ]
        }
      ]
    }
  ],
  quotations: [
    {
      id: 'quote-001',
      clientName: 'María López',
      email: 'maria.lopez@email.com',
      eventType: 'Boda',
      eventDate: '2026-10-21',
      guests: 120,
      location: 'Escazú',
      menuName: 'Boda elegante',
      budget: 185000,
      status: 'Pendiente',
      summary: 'Solicita una propuesta para boda familiar con estilo elegante y servicio completo.',
      requirements: ['Decoración floral', 'Mesa de postres', 'Opción vegetariana'],
      notes: 'Le gustaría incluir una barra de bebidas para el inicio de la recepción.'
    },
    {
      id: 'quote-002',
      clientName: 'Grupo Tecno',
      email: 'compras@grupotecno.cr',
      eventType: 'Corporativo',
      eventDate: '2026-11-05',
      guests: 60,
      location: 'San José',
      menuName: 'Evento corporativo',
      budget: 95000,
      status: 'Aceptada',
      summary: 'Necesitan servicio para evento corporativo con atención ejecutiva y menú ligero.',
      requirements: ['Servicio ejecutivo', 'Coffee break', 'Presentación moderna'],
      notes: 'El cliente ya confirmó la proforma y pidió que se incluya servicio de bartender.'
    },
    {
      id: 'quote-003',
      clientName: 'Familia Castro',
      email: 'familia.castro@email.com',
      eventType: 'Cumpleaños',
      eventDate: '2026-11-17',
      guests: 45,
      location: 'Heredia',
      menuName: 'Cumpleaños familiar',
      budget: 70000,
      status: 'Rechazada',
      summary: 'Solicita un servicio familiar para evento privado con buffet y pastel.',
      requirements: ['Decoración sencilla', 'Pastel', 'Servicio en horario vespertino'],
      notes: 'La proforma fue rechazada por presupuesto fuera del rango esperado.'
    }
  ]
};
