export type ProjectCategory = 'residencial' | 'condominio' | 'comercial' | 'remodelacion';

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  zone: string;
  year: number;
  area: number; // m²
  description: string;
  highlights: string[];
  image: string;
  gallery: string[];
  before?: string;
  after?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'residencia-santa-ana',
    name: 'Residencia Santa Ana',
    category: 'residencial',
    zone: 'Santa Ana, San José',
    year: 2024,
    area: 280,
    description:
      'Casa de dos pisos con diseño contemporáneo, materiales de primera calidad y amplias zonas verdes. Proyecto llave en mano entregado en 10 meses.',
    highlights: ['2 pisos', '4 habitaciones', 'Piscina', 'Garaje doble'],
    image: '/images/project-house-1.jpg',
    gallery: ['/images/project-house-1.jpg', '/images/project-house-2.jpg'],
    featured: true,
  },
  {
    slug: 'villa-escazu',
    name: 'Villa Escazú',
    category: 'residencial',
    zone: 'Escazú, San José',
    year: 2023,
    area: 420,
    description:
      'Residencia de lujo en las alturas de Escazú con vistas panorámicas al Valle Central. Acabados importados y domótica integrada.',
    highlights: ['3 pisos', '5 habitaciones', 'Terraza panorámica', 'Área de servicio'],
    image: '/images/project-house-2.jpg',
    gallery: ['/images/project-house-2.jpg', '/images/project-house-1.jpg'],
    featured: true,
  },
  {
    slug: 'condominio-heredia-verde',
    name: 'Condominio Heredia Verde',
    category: 'condominio',
    zone: 'San Pablo, Heredia',
    year: 2024,
    area: 3200,
    description:
      '24 unidades habitacionales de 2 y 3 dormitorios con áreas comunes, gimnasio y seguridad 24/7. Proyecto completo en 18 meses.',
    highlights: ['24 apartamentos', 'Gimnasio', 'Piscina comunal', 'Seguridad 24/7'],
    image: '/images/project-condo.jpg',
    gallery: ['/images/project-condo.jpg'],
    featured: true,
  },
  {
    slug: 'oficinas-lindora',
    name: 'Oficinas Corporativas Lindora',
    category: 'comercial',
    zone: 'Lindora, Santa Ana',
    year: 2023,
    area: 1800,
    description:
      'Complejo de oficinas de tres plantas para empresa multinacional. Diseño open-space, salas de reuniones equipadas y parqueo subterráneo.',
    highlights: ['3 plantas', '1800 m²', 'Open-space', 'Parqueo subterráneo'],
    image: '/images/project-commercial.jpg',
    gallery: ['/images/project-commercial.jpg'],
    featured: false,
  },
  {
    slug: 'remodelacion-cocina-curridabat',
    name: 'Remodelación Integral – Curridabat',
    category: 'remodelacion',
    zone: 'Curridabat, San José',
    year: 2024,
    area: 45,
    description:
      'Transformación completa de cocina y área social. Gabinetes de madera laminada, isla central con mármol y nueva iluminación LED.',
    highlights: ['Cocina nueva', 'Isla central', 'Iluminación LED', 'Plazo 6 semanas'],
    image: '/images/project-remodel-after.jpg',
    gallery: ['/images/project-remodel-after.jpg'],
    before: '/images/project-remodel-before.jpg',
    after: '/images/project-remodel-after.jpg',
    featured: false,
  },
  {
    slug: 'remodelacion-banos-alajuela',
    name: 'Remodelación de Baños – Alajuela',
    category: 'remodelacion',
    zone: 'Alajuela Centro',
    year: 2023,
    area: 20,
    description:
      'Renovación de dos baños con porcelanato italiano, grifería de diseño y ducha rain. Trabajo terminado en 3 semanas sin interrumpir la rutina del hogar.',
    highlights: ['Porcelanato italiano', 'Grifería importada', 'Ducha rain', '3 semanas'],
    image: '/images/project-remodel2-after.jpg',
    gallery: ['/images/project-remodel2-after.jpg'],
    before: '/images/project-remodel2-before.jpg',
    after: '/images/project-remodel2-after.jpg',
    featured: false,
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  residencial: 'Residencial',
  condominio: 'Condominio',
  comercial: 'Comercial',
  remodelacion: 'Remodelación',
};
