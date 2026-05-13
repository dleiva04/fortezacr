import { useState } from 'react';
import { IconCalendar, IconLightbulb, IconCheck, IconWarning } from '../shared/Icons';
import {
  type Currency,
  type ProjectType,
  type Zone,
  formatCurrency,
  priceRanges,
  extraCosts,
  conditionMultipliers,
  timelines,
  recommendations,
  zoneLabels,
} from '../../data/quoteConfig';

interface QuoteResultProps {
  projectType: ProjectType;
  zone: Zone;
  area: number;
  extras?: string[];
  condition?: string;
  onReset: () => void;
}

export default function QuoteResult({
  projectType,
  zone,
  area,
  extras = [],
  condition = 'bueno',
  onReset,
}: QuoteResultProps) {
  const [currency, setCurrency] = useState<Currency>('CRC');

  const range = priceRanges[projectType][zone];
  const multiplier = conditionMultipliers[condition] ?? 1;
  const extraTotal = extras.reduce((sum, e) => sum + (extraCosts[e] ?? 0), 0);

  const minUSD = range.min * area * multiplier + extraTotal;
  const maxUSD = range.max * area * multiplier + extraTotal;

  const timeline = timelines[projectType](area);
  const recs = recommendations[projectType];

  const waMessage = encodeURIComponent(
    `Hola Forteza CR, acabo de usar el cotizador y me interesa un proyecto de ${projectType} en ${zoneLabels[zone]}. ¿Me pueden contactar?`
  );

  return (
    <div className="space-y-6" aria-live="polite">
      {/* Currency toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Tu estimado</h3>
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1" role="group" aria-label="Seleccionar moneda">
          {(['CRC', 'USD'] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green ${
                currency === c ? 'bg-forteza-green text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-pressed={currency === c}
            >
              {c === 'CRC' ? '₡ CRC' : '$ USD'}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="bg-forteza-green rounded-xl p-6 text-white text-center">
        <p className="text-sm text-green-200 mb-1">Rango estimado de inversión</p>
        <p className="text-3xl font-bold font-display">
          {formatCurrency(minUSD, currency)}
        </p>
        <p className="text-green-300 mt-1">— hasta —</p>
        <p className="text-3xl font-bold font-display">
          {formatCurrency(maxUSD, currency)}
        </p>
        <p className="text-xs text-green-300 mt-3">
          Basado en {area.toLocaleString('es-CR')} m² · {zoneLabels[zone]}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <IconCalendar className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <div>
          <p className="font-semibold text-gray-700 text-sm">Tiempo estimado</p>
          <p className="text-forteza-cement text-sm">
            {timeline.min} – {timeline.max} meses
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <IconLightbulb className="w-5 h-5 text-forteza-gold" />
          Recomendaciones
        </h4>
        <ul className="space-y-2">
          {recs.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <IconCheck className="w-4 h-4 text-forteza-gold mt-0.5 flex-shrink-0" />
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg p-3 leading-relaxed">
        <IconWarning className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
        <p>Este es un estimado referencial. Los precios finales dependen de especificaciones técnicas, materiales seleccionados y visita al sitio. Forteza CR no garantiza que el costo final sea exactamente este rango.</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/50600000000?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-4 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Hablar con un experto
        </a>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-forteza-green hover:text-forteza-green font-semibold px-4 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green"
        >
          Nueva cotización
        </button>
      </div>
    </div>
  );
}
