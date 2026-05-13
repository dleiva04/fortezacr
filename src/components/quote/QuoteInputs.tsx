import { zoneLabels, type Zone } from '../../data/quoteConfig';

// ── Counter ──────────────────────────────────────────────────────────────────
interface CounterProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
}
export function Counter({ label, value, min = 0, max = 100, step = 1, onChange }: CounterProps) {
  return (
    <div>
      <p className="font-medium text-gray-700 mb-3">{label}</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-forteza-green text-forteza-green font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green"
          aria-label={`Reducir ${label}`}
        >
          −
        </button>
        <span className="text-2xl font-bold text-forteza-green w-10 text-center" aria-live="polite" aria-atomic="true">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-forteza-green text-forteza-green font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green"
          aria-label={`Aumentar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── RangeSlider ───────────────────────────────────────────────────────────────
interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}
export function RangeSlider({ label, min, max, step, value, onChange }: RangeSliderProps) {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div>
      <label htmlFor={id} className="font-medium text-gray-700 mb-1 block">
        {label}: <span className="text-forteza-green font-bold">{value.toLocaleString('es-CR')} m²</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-forteza-green h-2 cursor-pointer"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min.toLocaleString('es-CR')} m²</span>
        <span>{max.toLocaleString('es-CR')} m²</span>
      </div>
    </div>
  );
}

// ── ZoneSelect ────────────────────────────────────────────────────────────────
interface ZoneSelectProps {
  value: Zone | '';
  onChange: (z: string) => void;
}
export function ZoneSelect({ value, onChange }: ZoneSelectProps) {
  return (
    <div>
      <label htmlFor="zone-select" className="font-medium text-gray-700 mb-3 block">
        ¿En qué zona de Costa Rica?
      </label>
      <select
        id="zone-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-forteza-green transition-colors"
        aria-required="true"
      >
        <option value="" disabled>Selecciona una zona…</option>
        {Object.entries(zoneLabels).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );
}

// ── CheckboxGroup ─────────────────────────────────────────────────────────────
interface CheckboxGroupProps {
  legend: string;
  options: { id: string; label: string }[];
  value: string[];
  onChange: (v: string[]) => void;
}
export function CheckboxGroup({ legend, options, value, onChange }: CheckboxGroupProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };
  return (
    <fieldset>
      <legend className="font-medium text-gray-700 mb-3 block">{legend} <span className="text-gray-400 font-normal text-sm">(opcional)</span></legend>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
        {options.map((opt) => (
          <li key={opt.id}>
            <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-forteza-green ${
              value.includes(opt.id) ? 'border-forteza-green bg-green-50' : 'border-gray-200 hover:border-forteza-green/50'
            }`}>
              <input
                type="checkbox"
                checked={value.includes(opt.id)}
                onChange={() => toggle(opt.id)}
                className="sr-only"
              />
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                value.includes(opt.id) ? 'border-forteza-green bg-forteza-green' : 'border-gray-300'
              }`} aria-hidden="true">
                {value.includes(opt.id) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </span>
              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
