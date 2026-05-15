export interface Canton {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
  cantons: Canton[];
}

export const provinces: Province[] = [
  {
    code: '1',
    name: 'San José',
    cantons: [
      { code: '01', name: 'San José' },
      { code: '02', name: 'Escazú' },
      { code: '03', name: 'Desamparados' },
      { code: '04', name: 'Puriscal' },
      { code: '05', name: 'Tarrazú' },
      { code: '06', name: 'Aserrí' },
      { code: '07', name: 'Mora' },
      { code: '08', name: 'Goicoechea' },
      { code: '09', name: 'Santa Ana' },
      { code: '10', name: 'Alajuelita' },
      { code: '11', name: 'Vázquez De Coronado' },
      { code: '12', name: 'Acosta' },
      { code: '13', name: 'Tibás' },
      { code: '14', name: 'Moravia' },
      { code: '15', name: 'Montes De Oca' },
      { code: '16', name: 'Turrubares' },
      { code: '17', name: 'Dota' },
      { code: '18', name: 'Curridabat' },
      { code: '19', name: 'Pérez Zeledón' },
      { code: '20', name: 'León Cortés Castro' },
    ],
  },
  {
    code: '2',
    name: 'Alajuela',
    cantons: [
      { code: '01', name: 'Alajuela' },
      { code: '02', name: 'San Ramón' },
      { code: '03', name: 'Grecia' },
      { code: '04', name: 'San Mateo' },
      { code: '05', name: 'Atenas' },
      { code: '06', name: 'Naranjo' },
      { code: '07', name: 'Palmares' },
      { code: '08', name: 'Poás' },
      { code: '09', name: 'Orotina' },
      { code: '10', name: 'San Carlos' },
      { code: '11', name: 'Zarcero' },
      { code: '12', name: 'Sarchí' },
      { code: '13', name: 'Upala' },
      { code: '14', name: 'Los Chiles' },
      { code: '15', name: 'Guatuso' },
      { code: '16', name: 'Río Cuarto' },
    ],
  },
  {
    code: '3',
    name: 'Cartago',
    cantons: [
      { code: '01', name: 'Cartago' },
      { code: '02', name: 'Paraíso' },
      { code: '03', name: 'La Unión' },
      { code: '04', name: 'Jiménez' },
      { code: '05', name: 'Turrialba' },
      { code: '06', name: 'Alvarado' },
      { code: '07', name: 'Oreamuno' },
      { code: '08', name: 'El Guarco' },
    ],
  },
  {
    code: '4',
    name: 'Heredia',
    cantons: [
      { code: '01', name: 'Heredia' },
      { code: '02', name: 'Barva' },
      { code: '03', name: 'Santo Domingo' },
      { code: '04', name: 'Santa Bárbara' },
      { code: '05', name: 'San Rafael' },
      { code: '06', name: 'San Isidro' },
      { code: '07', name: 'Belén' },
      { code: '08', name: 'Flores' },
      { code: '09', name: 'San Pablo' },
      { code: '10', name: 'Sarapiquí' },
    ],
  },
  {
    code: '5',
    name: 'Guanacaste',
    cantons: [
      { code: '01', name: 'Liberia' },
      { code: '02', name: 'Nicoya' },
      { code: '03', name: 'Santa Cruz' },
      { code: '04', name: 'Bagaces' },
      { code: '05', name: 'Carrillo' },
      { code: '06', name: 'Cañas' },
      { code: '07', name: 'Abangares' },
      { code: '08', name: 'Tilarán' },
      { code: '09', name: 'Nandayure' },
      { code: '10', name: 'La Cruz' },
      { code: '11', name: 'Hojancha' },
    ],
  },
  {
    code: '6',
    name: 'Puntarenas',
    cantons: [
      { code: '01', name: 'Puntarenas' },
      { code: '02', name: 'Esparza' },
      { code: '03', name: 'Buenos Aires' },
      { code: '04', name: 'Montes De Oro' },
      { code: '05', name: 'Osa' },
      { code: '06', name: 'Quepos' },
      { code: '07', name: 'Golfito' },
      { code: '08', name: 'Coto Brus' },
      { code: '09', name: 'Parrita' },
      { code: '10', name: 'Corredores' },
      { code: '11', name: 'Garabito' },
    ],
  },
  {
    code: '7',
    name: 'Limón',
    cantons: [
      { code: '01', name: 'Limón' },
      { code: '02', name: 'Pococí' },
      { code: '03', name: 'Siquirres' },
      { code: '04', name: 'Talamanca' },
      { code: '05', name: 'Matina' },
      { code: '06', name: 'Guácimo' },
    ],
  },
];
