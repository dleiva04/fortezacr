export interface ContactData {
  name: string;
  phone: string;
}

interface Props {
  data: ContactData;
  onChange: (data: Partial<ContactData>) => void;
}

export default function StepContact({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <p className="text-gray-500 text-sm">
        Para que un asesor de Forteza CR pueda contactarle y afinar su propuesta.
      </p>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Ej: Juan Pérez"
          autoComplete="name"
          required
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-forteza-green focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
          Número de WhatsApp <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="px-3 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium select-none">
            🇨🇷 +506
          </span>
          <input
            id="contact-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="8888-8888"
            autoComplete="tel"
            required
            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-forteza-green focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Solo se usará para enviarle la propuesta.</p>
      </div>
    </div>
  );
}
