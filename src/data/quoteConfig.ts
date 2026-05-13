// All base prices stored in USD per m².
// Update EXCHANGE_RATE periodically to reflect current CRC/USD rate.
export const EXCHANGE_RATE = 520; // 1 USD = 520 CRC (May 2025)

export type Currency = 'CRC' | 'USD';
export type Zone = 'GAM' | 'Guanacaste' | 'Caribe' | 'Pacifico' | 'ZonaNorte';
export type ProjectType = 'casa' | 'remodelacion' | 'edificio' | 'comercial';

export const zoneLabels: Record<Zone, string> = {
  GAM: 'Gran Área Metropolitana (GAM)',
  Guanacaste: 'Guanacaste',
  Caribe: 'Caribe',
  Pacifico: 'Pacífico Central',
  ZonaNorte: 'Zona Norte',
};

// Price per m² in USD by project type and zone
export const priceRanges: Record<
  ProjectType,
  Record<Zone, { min: number; max: number }>
> = {
  casa: {
    GAM:        { min: 650, max: 950 },
    Guanacaste: { min: 700, max: 1050 },
    Caribe:     { min: 580, max: 850 },
    Pacifico:   { min: 680, max: 1000 },
    ZonaNorte:  { min: 550, max: 800 },
  },
  remodelacion: {
    GAM:        { min: 350, max: 650 },
    Guanacaste: { min: 380, max: 700 },
    Caribe:     { min: 300, max: 580 },
    Pacifico:   { min: 360, max: 660 },
    ZonaNorte:  { min: 280, max: 540 },
  },
  edificio: {
    GAM:        { min: 750, max: 1100 },
    Guanacaste: { min: 800, max: 1200 },
    Caribe:     { min: 650, max: 950 },
    Pacifico:   { min: 770, max: 1150 },
    ZonaNorte:  { min: 620, max: 900 },
  },
  comercial: {
    GAM:        { min: 550, max: 850 },
    Guanacaste: { min: 600, max: 920 },
    Caribe:     { min: 480, max: 780 },
    Pacifico:   { min: 560, max: 870 },
    ZonaNorte:  { min: 450, max: 720 },
  },
};

// Extra costs in USD (flat additions per feature)
export const extraCosts: Record<string, number> = {
  piscina:       15000,
  garaje:         4000,
  areaServicio:   5000,
  terraza:        6000,
  acIndustrial:  12000,
  cargaElectrica: 8000,
  mezzanine:     10000,
};

// State multipliers for remodeling
export const conditionMultipliers: Record<string, number> = {
  bueno:       1.0,
  regular:     1.15,
  deteriorado: 1.30,
};

// Timeline estimates in months
export const timelines: Record<ProjectType, (area: number) => { min: number; max: number }> = {
  casa:         (a) => ({ min: Math.max(6,  Math.round(a / 50)),     max: Math.max(8,  Math.round(a / 40)) }),
  remodelacion: (a) => ({ min: Math.max(1,  Math.round(a / 30)),     max: Math.max(2,  Math.round(a / 20)) }),
  edificio:     (a) => ({ min: Math.max(12, Math.round(a / 300)),    max: Math.max(18, Math.round(a / 200)) }),
  comercial:    (a) => ({ min: Math.max(3,  Math.round(a / 150)),    max: Math.max(5,  Math.round(a / 100)) }),
};

// Recommendations shown on result screen
export const recommendations: Record<ProjectType, string[]> = {
  casa: [
    'Solicita un estudio de suelo antes de iniciar — puede ahorrarte hasta un 15% en cimentación.',
    'Diseña pensando en futuras ampliaciones; es más económico predejar instalaciones ahora.',
    'Los paneles solares en Costa Rica tienen retorno de inversión en 5-7 años.',
  ],
  remodelacion: [
    'Revisa el estado de las tuberías antes de cerrar paredes — es el momento ideal para reemplazarlas.',
    'Los materiales nacionales (porcelanato, cerámica) ofrecen excelente calidad a menor costo.',
    'Planifica la remodelación por etapas para no interrumpir tu rutina diaria.',
  ],
  edificio: [
    'Contrata un estudio de impacto vial desde el inicio para evitar problemas con la municipalidad.',
    'El diseño bioclimático puede reducir hasta un 30% el consumo eléctrico del edificio.',
    'Coordina con el ICE y AyA desde la etapa de anteproyecto para evitar retrasos en acometidas.',
  ],
  comercial: [
    'Define los requisitos de carga eléctrica antes del diseño — los cambios posteriores son costosos.',
    'El cumplimiento de la norma INTE de accesibilidad es obligatorio y evita sanciones.',
    'Un sistema de aire acondicionado centralizado suele ser más eficiente que unidades individuales.',
  ],
};

// Utility: format number as currency
export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'CRC') {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(amount * EXCHANGE_RATE);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
