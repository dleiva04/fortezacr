import type { ProjectType } from '../../../data/quoteConfig';
import { IconHome, IconBuilding, IconStore, IconWrench } from '../../shared/Icons';

interface Props {
  value: ProjectType | null;
  onChange: (type: ProjectType) => void;
}

const options: { type: ProjectType; Icon: React.ComponentType<{ className?: string }>; label: string; description: string }[] = [
  { type: 'casa',         Icon: IconHome,     label: 'Casa / Residencia',       description: 'Construcción nueva de casa o residencia unifamiliar' },
  { type: 'remodelacion', Icon: IconWrench,   label: 'Remodelación / Ampliación', description: 'Renovación o ampliación de espacio existente' },
  { type: 'edificio',     Icon: IconBuilding, label: 'Edificio / Condominio',    description: 'Proyecto residencial vertical o de uso mixto' },
  { type: 'comercial',    Icon: IconStore,    label: 'Proyecto Comercial',       description: 'Oficina, local, bodega o restaurante' },
];

export default function StepProjectType({ value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="sr-only">Tipo de proyecto</legend>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
        {options.map(({ type, Icon, label, description }) => (
          <li key={type}>
            <label
              className={`flex flex-col gap-2 p-5 rounded-xl border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-forteza-green ${
                value === type
                  ? 'border-forteza-green bg-green-50'
                  : 'border-gray-200 hover:border-forteza-green/50 bg-white'
              }`}
            >
              <input
                type="radio"
                name="projectType"
                value={type}
                checked={value === type}
                onChange={() => onChange(type)}
                className="sr-only"
                aria-label={label}
              />
              <span className={value === type ? 'text-forteza-green' : 'text-gray-400'}>
                <Icon className="w-8 h-8" />
              </span>
              <span className="font-semibold text-forteza-green">{label}</span>
              <span className="text-sm text-gray-500">{description}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
