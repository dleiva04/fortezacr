import type { Zone } from '../../../data/quoteConfig';
import { Counter, ZoneSelect } from '../QuoteInputs';

export interface BuildingData {
  floors: number;
  units: number;
  buildingType: 'residencial' | 'mixto' | '';
  zone: Zone | '';
}

interface Props {
  step: number;
  data: BuildingData;
  onChange: (data: Partial<BuildingData>) => void;
}

export default function StepBuilding({ step, data, onChange }: Props) {
  if (step === 1) return (
    <div className="space-y-6">
      <Counter label="Número de pisos" value={data.floors} min={2} max={25} onChange={(v) => onChange({ floors: v })} />
      <Counter label="Número de unidades / apartamentos" value={data.units} min={2} max={200} step={2} onChange={(v) => onChange({ units: v })} />
    </div>
  );

  if (step === 2) return (
    <fieldset>
      <legend className="font-medium text-gray-700 mb-3 block">Tipo de uso del edificio</legend>
      <div className="space-y-3">
        {[
          { id: 'residencial', label: 'Solo residencial', desc: 'Apartamentos y áreas comunes' },
          { id: 'mixto',       label: 'Mixto comercial',  desc: 'Local o oficinas en planta baja + apartamentos' },
        ].map((opt) => (
          <label key={opt.id} className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-forteza-green ${
            data.buildingType === opt.id ? 'border-forteza-green bg-green-50' : 'border-gray-200 hover:border-forteza-green/50'
          }`}>
            <input
              type="radio"
              name="buildingType"
              value={opt.id}
              checked={data.buildingType === opt.id}
              onChange={() => onChange({ buildingType: opt.id as BuildingData['buildingType'] })}
              className="sr-only"
            />
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${data.buildingType === opt.id ? 'border-forteza-green bg-forteza-green' : 'border-gray-300'}`} aria-hidden="true" />
            <div>
              <p className="font-medium text-sm text-gray-800">{opt.label}</p>
              <p className="text-xs text-gray-500">{opt.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );

  if (step === 3) return (
    <ZoneSelect value={data.zone} onChange={(z) => onChange({ zone: z as Zone })} />
  );

  return null;
}
