export interface JobPosting {
  id: string;
  title: string;
  department: string;
  type: 'Tiempo completo' | 'Medio tiempo' | 'Por proyecto';
  location: string;
  description: string;
  requirements: string[];
}

export const values = [
  {
    title: 'Calidad sin compromiso',
    description: 'Cada proyecto lleva nuestro nombre. Exigimos los más altos estándares en materiales, procesos y acabados.',
    icon: 'star',
  },
  {
    title: 'Equipo primero',
    description: 'Nuestros colaboradores son el corazón de Forteza CR. Invertimos en su crecimiento, seguridad y bienestar.',
    icon: 'handshake',
  },
  {
    title: 'Compromiso con Costa Rica',
    description: 'Construimos país. Priorizamos proveedores locales, respetamos el ambiente y contribuimos a las comunidades donde operamos.',
    icon: 'leaf',
  },
];

export const jobs: JobPosting[] = [
  {
    id: 'maestro-obras',
    title: 'Maestro de Obras',
    department: 'Construcción',
    type: 'Tiempo completo',
    location: 'Gran Área Metropolitana, Costa Rica',
    description:
      'Buscamos un Maestro de Obras con experiencia comprobada en proyectos residenciales y comerciales. Será el responsable de coordinar cuadrillas, controlar avances y garantizar la calidad en sitio.',
    requirements: [
      'Mínimo 5 años de experiencia en construcción',
      'Experiencia liderando cuadrillas de 10+ personas',
      'Conocimiento en lectura de planos',
      'Licencia de conducir (categoría B1)',
      'Disponibilidad para proyectos fuera del GAM ocasionalmente',
    ],
  },
  {
    id: 'ingeniero-civil',
    title: 'Ingeniero Civil',
    department: 'Ingeniería',
    type: 'Tiempo completo',
    location: 'San José, Costa Rica',
    description:
      'Ingeniero Civil para supervisión técnica de proyectos, elaboración de presupuestos, coordinación con arquitectos y gestión de permisos ante el CFIA y municipalidades.',
    requirements: [
      'Título universitario en Ingeniería Civil',
      'Incorporado al CFIA',
      'Mínimo 3 años de experiencia en construcción',
      'Manejo de AutoCAD y software de presupuesto',
      'Excelente comunicación con clientes',
    ],
  },
  {
    id: 'asistente-administrativo',
    title: 'Asistente Administrativo',
    department: 'Administración',
    type: 'Tiempo completo',
    location: 'San José, Costa Rica',
    description:
      'Apoyo administrativo al equipo de proyectos: gestión de proveedores, control de facturas, coordinación de agenda y atención a clientes por teléfono y correo.',
    requirements: [
      'Técnico o bachillerato en administración de empresas',
      'Experiencia mínima de 2 años en puestos similares',
      'Manejo de Office 365 y herramientas de gestión',
      'Excelente ortografía y redacción en español',
      'Proactividad y organización',
    ],
  },
];
