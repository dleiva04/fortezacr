import type { Zone } from '../../../data/quoteConfig';
import { RangeSlider, ZoneSelect, CheckboxGroup } from '../QuoteInputs';

export interface CommercialData {
  commercialType: string;
  area: number;
  zone: Zone | '';
  extras: string[];
}

interface Props {
  step: number;
  data: CommercialData;
  onChange: (data: Partial<CommercialData>) => void;
}

const commercialTypes = [
  { id: 'oficina',    label: 'Oficina corporativa' },
  { id: 'local',      label: 'Local comercial' },
  { id: 'bodega',     label: 'Bodega / Centro logístico' },
  { id: 'restaurante',label: 'Restaurante' },
  { id: 'otro',       label: 'Otro tipo de negocio' },
];

const extraOptions = [
  { id: 'acIndustrial',   label: 'A/C industrial' },
  { id: 'cargaElectrica', label: 'Carga eléctrica especial' },
  { id: 'mezzanine',      label: 'Mezzanine' },
];

export default function StepCommercial({ step, data, onChange }: Props) {
  if (step === 1) return (
    <fieldset>
      <legend className="font-medium text-gray-700 mb-3 block">¿Qué tipo de espacio comercial necesitas?</legend>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
        {commercialTypes.map((opt) => (
          <li key={opt.id}>
            <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-forteza-green ${
              data.commercialType === opt.id ? 'border-forteza-green bg-green-50' : 'border-gray-200 hover:border-forteza-green/50'
            }`}>
              <input
                type="radio"
                name="commercialType"
                value={opt.id}
                checked={data.commercialType === opt.id}
                onChange={() => onChange({ commercialType: opt.id })}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${data.commercialType === opt.id ? 'border-forteza-green bg-forteza-green' : 'border-gray-300'}`} aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );

  if (step === 2) return (
    <RangeSlider
      label="Área aproximada (m²)"
      min={30} max={5000} step={10}
      value={data.area}
      onChange={(v) => onChange({ area: v })}
    />
  );

  if (step === 3) return (
    <ZoneSelect value={data.zone} onChange={(z) => onChange({ zone: z as Zone })} />
  );

  if (step === 4) return (
    <CheckboxGroup
      legend="Requisitos especiales"
      options={extraOptions}
      value={data.extras}
      onChange={(extras) => onChange({ extras })}
    />
  );

  return null;
}
