export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  image: string;
  icon: string; // icon name key
}

export const services: Service[] = [
  {
    id: 'residencial',
    title: 'Casas y Residencias',
    shortDescription: 'Construimos el hogar que siempre imaginaste, adaptado a tu terreno y presupuesto.',
    longDescription:
      'Desde la planificación arquitectónica hasta la entrega de llaves, acompañamos cada etapa de la construcción de tu casa. Trabajamos con ingenieros y arquitectos certificados, materiales de primera calidad y plazos cumplidos. Proyectos en toda el Gran Área Metropolitana y zonas de playa.',
    features: [
      'Diseño arquitectónico personalizado',
      'Permisos y trámites municipales',
      'Construcción llave en mano',
      'Garantía de obra de 5 años',
      'Supervisión técnica permanente',
    ],
    image: '/images/services-residential.jpg',
    icon: 'home',
  },
  {
    id: 'edificios',
    title: 'Edificios y Condominios',
    shortDescription: 'Proyectos de gran escala con estándares internacionales de ingeniería y diseño.',
    longDescription:
      'Especializados en construcción vertical residencial y mixta. Desarrollamos condominios, torres de apartamentos y proyectos de uso mixto con los más altos estándares estructurales. Coordinamos toda la cadena: diseño, permisos CFIA, construcción y gestión de garantías.',
    features: [
      'Ingeniería estructural certificada',
      'Gestión CFIA y permisos',
      'Áreas comunes y amenidades',
      'Cumplimiento norma sísmica CR',
      'Coordinación con desarrolladoras',
    ],
    image: '/images/services-buildings.jpg',
    icon: 'building',
  },
  {
    id: 'comercial',
    title: 'Proyectos Comerciales',
    shortDescription: 'Oficinas, locales comerciales y bodegas construidos para rendir al máximo.',
    longDescription:
      'Entendemos que cada negocio tiene necesidades únicas. Construimos espacios comerciales funcionales y atractivos: oficinas corporativas, locales en centros comerciales, bodegas industriales y restaurantes. Nos adaptamos a los requerimientos técnicos de cada industria.',
    features: [
      'Oficinas y coworking',
      'Locales y plazas comerciales',
      'Bodegas e instalaciones industriales',
      'Instalaciones especializadas (A/C, eléctrico)',
      'Remodelación de espacios existentes',
    ],
    image: '/images/services-commercial.jpg',
    icon: 'store',
  },
  {
    id: 'remodelacion',
    title: 'Remodelaciones y Ampliaciones',
    shortDescription: 'Transformamos tu espacio actual con mínima interrupción y máximo resultado.',
    longDescription:
      'Ya sea una cocina nueva, baños renovados, una ampliación de cuartos o una remodelación integral, nuestro equipo de remodelación trabaja con rapidez y limpieza. Usamos materiales nacionales e importados según tu presupuesto, y te mostramos el resultado esperado antes de iniciar.',
    features: [
      'Cocinas y baños',
      'Ampliaciones y segundos pisos',
      'Fachadas y exteriores',
      'Pisos y cielos rasos',
      'Instalaciones eléctricas y plomería',
    ],
    image: '/images/services-remodel.jpg',
    icon: 'wrench',
  },
];
