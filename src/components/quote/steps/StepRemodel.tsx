import { RangeSlider, ZoneSelect } from '../QuoteInputs';

export interface RemodelData {
  remodelType: string;
  area: number;
  condition: 'bueno' | 'regular' | 'deteriorado' | '';
  zone: string;
}

interface Props {
  step: number;
  data: RemodelData;
  onChange: (data: Partial<RemodelData>) => void;
}

const remodelTypes = [
  { id: 'cocina',      label: 'Cocina' },
  { id: 'banos',       label: 'Baño(s)' },
  { id: 'fachada',     label: 'Fachada' },
  { id: 'cuartos',     label: 'Ampliación de cuartos' },
  { id: 'completa',    label: 'Remodelación completa' },
];

const conditions = [
  { id: 'bueno',       label: 'Bueno',        desc: 'Solo cambio de acabados' },
  { id: 'regular',     label: 'Regular',       desc: 'Algunas reparaciones estructurales' },
  { id: 'deteriorado', label: 'Deteriorado',   desc: 'Requiere trabajo estructural mayor' },
];

export default function StepRemodel({ step, data, onChange }: Props) {
  if (step === 1) return (
    <fieldset>
      <legend className="font-medium text-gray-700 mb-3 block">¿Qué tipo de remodelación necesitas?</legend>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
        {remodelTypes.map((opt) => (
          <li key={opt.id}>
            <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-forteza-green ${
              data.remodelType === opt.id ? 'border-forteza-green bg-green-50' : 'border-gray-200 hover:border-forteza-green/50'
            }`}>
              <input
                type="radio"
                name="remodelType"
                value={opt.id}
                checked={data.remodelType === opt.id}
                onChange={() => onChange({ remodelType: opt.id })}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${data.remodelType === opt.id ? 'border-forteza-green bg-forteza-green' : 'border-gray-300'}`} aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );

  if (step === 2) return (
    <RangeSlider
      label="Área aproximada a remodelar (m²)"
      min={10} max={500} step={5}
      value={data.area}
      onChange={(v) => onChange({ area: v })}
    />
  );

  if (step === 3) return (
    <fieldset>
      <legend className="font-medium text-gray-700 mb-3 block">Estado actual del espacio</legend>
      <div className="space-y-3">
        {conditions.map((c) => (
          <label key={c.id} className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-forteza-green ${
            data.condition === c.id ? 'border-forteza-green bg-green-50' : 'border-gray-200 hover:border-forteza-green/50'
          }`}>
            <input
              type="radio"
              name="condition"
              value={c.id}
              checked={data.condition === c.id}
              onChange={() => onChange({ condition: c.id as RemodelData['condition'] })}
              className="sr-only"
            />
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${data.condition === c.id ? 'border-forteza-green bg-forteza-green' : 'border-gray-300'}`} aria-hidden="true" />
            <div>
              <p className="font-medium text-sm text-gray-800">{c.label}</p>
              <p className="text-xs text-gray-500">{c.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );

  if (step === 4) return (
    <ZoneSelect value={data.zone} onChange={(z) => onChange({ zone: z })} />
  );

  return null;
}
