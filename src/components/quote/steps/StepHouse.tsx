import type { Zone } from '../../../data/quoteConfig';
import { zoneLabels } from '../../../data/quoteConfig';
import { Counter, RangeSlider, ZoneSelect, CheckboxGroup } from '../QuoteInputs';

export interface HouseData {
  floors: 1 | 2 | 3;
  area: number;
  zone: Zone | '';
  bedrooms: number;
  bathrooms: number;
  extras: string[];
}

interface Props {
  step: number;
  data: HouseData;
  onChange: (data: Partial<HouseData>) => void;
}

const extraOptions = [
  { id: 'garaje',        label: 'Garaje' },
  { id: 'piscina',       label: 'Piscina' },
  { id: 'areaServicio',  label: 'Área de servicio' },
  { id: 'terraza',       label: 'Terraza' },
];

export default function StepHouse({ step, data, onChange }: Props) {
  if (step === 1) return (
    <div className="space-y-6">
      <div>
        <p className="font-medium text-gray-700 mb-3">¿Cuántos pisos tendrá la casa?</p>
        <div className="flex gap-3" role="group" aria-label="Número de pisos">
          {([1, 2, 3] as const).map((n) => (
            <button
              key={n}
              onClick={() => onChange({ floors: n })}
              className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green ${
                data.floors === n ? 'border-forteza-green bg-green-50 text-forteza-green' : 'border-gray-200 text-gray-600 hover:border-forteza-green/50'
              }`}
              aria-pressed={data.floors === n}
            >
              {n === 3 ? '3+' : n} {n === 1 ? 'piso' : 'pisos'}
            </button>
          ))}
        </div>
      </div>
      <RangeSlider
        label="Área aproximada del terreno (m²)"
        min={50} max={2000} step={10}
        value={data.area}
        onChange={(v) => onChange({ area: v })}
      />
    </div>
  );

  if (step === 2) return (
    <ZoneSelect value={data.zone} onChange={(z) => onChange({ zone: z as Zone })} />
  );

  if (step === 3) return (
    <div className="space-y-6">
      <Counter label="Habitaciones" value={data.bedrooms} min={1} max={10} onChange={(v) => onChange({ bedrooms: v })} />
      <Counter label="Baños" value={data.bathrooms} min={1} max={8} onChange={(v) => onChange({ bathrooms: v })} />
    </div>
  );

  if (step === 4) return (
    <CheckboxGroup
      legend="Extras opcionales"
      options={extraOptions}
      value={data.extras}
      onChange={(extras) => onChange({ extras })}
    />
  );

  return null;
}
