import { useState } from 'react';
import type { ProjectType } from '../../data/quoteConfig';
import StepProjectType from './steps/StepProjectType';
import StepHouse, { type HouseData } from './steps/StepHouse';
import StepRemodel, { type RemodelData } from './steps/StepRemodel';
import StepBuilding, { type BuildingData } from './steps/StepBuilding';
import StepCommercial, { type CommercialData } from './steps/StepCommercial';
import StepContact, { type ContactData } from './steps/StepContact';
import QuoteResult from './QuoteResult';

// Each flow ends with the shared "Datos de contacto" step
const stepsPerType: Record<string, string[]> = {
  casa:         ['Tipo de proyecto', 'Tamaño y terreno', 'Zona', 'Habitaciones y baños', 'Extras', 'Sus datos'],
  remodelacion: ['Tipo de proyecto', 'Tipo de remodelación', 'Área', 'Estado actual', 'Zona', 'Sus datos'],
  edificio:     ['Tipo de proyecto', 'Escala del proyecto', 'Uso del edificio', 'Zona', 'Sus datos'],
  comercial:    ['Tipo de proyecto', 'Tipo de espacio', 'Área', 'Zona', 'Requisitos especiales', 'Sus datos'],
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div aria-label={`Paso ${current} de ${total}`}>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Paso {current} de {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-forteza-green h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

const defaultHouseData: HouseData = { floors: 1, area: 200, zone: '', bedrooms: 3, bathrooms: 2, extras: [] };
const defaultRemodelData: RemodelData = { remodelType: '', area: 50, condition: '', zone: '' };
const defaultBuildingData: BuildingData = { floors: 4, units: 12, buildingType: '', zone: '' };
const defaultCommercialData: CommercialData = { commercialType: '', area: 200, zone: '', extras: [] };
// Zone is now a full location string like "San José · Escazú"
const defaultContact: ContactData = { name: '', phone: '' };

// ─── WhatsApp message builder ──────────────────────────────────────────────

const typeLabels: Record<string, string> = {
  casa:         'Casa / Residencia',
  remodelacion: 'Remodelación / Ampliación',
  edificio:     'Edificio / Condominio',
  comercial:    'Proyecto Comercial',
};

const remodelTypeLabels: Record<string, string> = {
  cocina:   'Cocina',
  banos:    'Baño(s)',
  fachada:  'Fachada',
  cuartos:  'Ampliación de cuartos',
  completa: 'Remodelación completa',
};

const conditionLabels: Record<string, string> = {
  bueno:       'Bueno (solo acabados)',
  regular:     'Regular (algunas reparaciones)',
  deteriorado: 'Deteriorado (trabajo mayor)',
};

const buildingTypeLabels: Record<string, string> = {
  residencial: 'Solo residencial',
  mixto:       'Mixto comercial',
};

const commercialTypeLabels: Record<string, string> = {
  oficina:     'Oficina corporativa',
  local:       'Local comercial',
  bodega:      'Bodega / Centro logístico',
  restaurante: 'Restaurante',
  otro:        'Otro',
};

const houseExtraLabels: Record<string, string> = {
  garaje:       'Garaje',
  piscina:      'Piscina',
  areaServicio: 'Área de servicio',
  terraza:      'Terraza',
};

const commercialExtraLabels: Record<string, string> = {
  acIndustrial:   'A/C industrial',
  cargaElectrica: 'Carga eléctrica especial',
  mezzanine:      'Mezzanine',
};

interface SummaryItem { label: string; value: string }

function buildSummaryAndMessage(
  projectType: ProjectType,
  houseData: HouseData,
  remodelData: RemodelData,
  buildingData: BuildingData,
  commercialData: CommercialData,
  contact: ContactData,
): { summary: SummaryItem[]; message: string } {
  const summary: SummaryItem[] = [];
  const lines: string[] = [];

  lines.push('Hola Forteza CR 👋, me interesa cotizar un proyecto:');
  lines.push('');
  lines.push(`*Tipo de proyecto:* ${typeLabels[projectType]}`);
  summary.push({ label: 'Tipo de proyecto', value: typeLabels[projectType] });

  if (projectType === 'casa') {
    const floorTxt = `${houseData.floors} ${houseData.floors === 1 ? 'piso' : 'pisos'}`;
    const zoneTxt = houseData.zone || '-';
    const extrasTxt = houseData.extras.length
      ? houseData.extras.map((e) => houseExtraLabels[e] ?? e).join(', ')
      : 'Ninguno';
    lines.push(`*Pisos:* ${floorTxt}`);
    lines.push(`*Área aproximada:* ${houseData.area} m²`);
    lines.push(`*Zona:* ${zoneTxt}`);
    lines.push(`*Habitaciones:* ${houseData.bedrooms}`);
    lines.push(`*Baños:* ${houseData.bathrooms}`);
    lines.push(`*Extras:* ${extrasTxt}`);
    summary.push({ label: 'Pisos', value: floorTxt });
    summary.push({ label: 'Área aproximada', value: `${houseData.area} m²` });
    summary.push({ label: 'Zona', value: zoneTxt });
    summary.push({ label: 'Habitaciones / Baños', value: `${houseData.bedrooms} hab · ${houseData.bathrooms} baños` });
    summary.push({ label: 'Extras', value: extrasTxt });
  }

  if (projectType === 'remodelacion') {
    const typeTxt = remodelTypeLabels[remodelData.remodelType] ?? remodelData.remodelType;
    const condTxt = conditionLabels[remodelData.condition] ?? remodelData.condition;
    const zoneTxt = remodelData.zone || '-';
    lines.push(`*Tipo de remodelación:* ${typeTxt}`);
    lines.push(`*Área a remodelar:* ${remodelData.area} m²`);
    lines.push(`*Estado actual:* ${condTxt}`);
    lines.push(`*Zona:* ${zoneTxt}`);
    summary.push({ label: 'Tipo de remodelación', value: typeTxt });
    summary.push({ label: 'Área a remodelar', value: `${remodelData.area} m²` });
    summary.push({ label: 'Estado actual', value: condTxt });
    summary.push({ label: 'Zona', value: zoneTxt });
  }

  if (projectType === 'edificio') {
    const useTxt = buildingTypeLabels[buildingData.buildingType] ?? buildingData.buildingType;
    const zoneTxt = buildingData.zone || '-';
    lines.push(`*Pisos:* ${buildingData.floors}`);
    lines.push(`*Unidades:* ${buildingData.units}`);
    lines.push(`*Uso:* ${useTxt}`);
    lines.push(`*Zona:* ${zoneTxt}`);
    summary.push({ label: 'Pisos', value: String(buildingData.floors) });
    summary.push({ label: 'Unidades / Apartamentos', value: String(buildingData.units) });
    summary.push({ label: 'Uso del edificio', value: useTxt });
    summary.push({ label: 'Zona', value: zoneTxt });
  }

  if (projectType === 'comercial') {
    const typeTxt = commercialTypeLabels[commercialData.commercialType] ?? commercialData.commercialType;
    const zoneTxt = commercialData.zone || '-';
    const extrasTxt = commercialData.extras.length
      ? commercialData.extras.map((e) => commercialExtraLabels[e] ?? e).join(', ')
      : 'Ninguno';
    lines.push(`*Tipo de espacio:* ${typeTxt}`);
    lines.push(`*Área aproximada:* ${commercialData.area} m²`);
    lines.push(`*Zona:* ${zoneTxt}`);
    lines.push(`*Requisitos especiales:* ${extrasTxt}`);
    summary.push({ label: 'Tipo de espacio', value: typeTxt });
    summary.push({ label: 'Área aproximada', value: `${commercialData.area} m²` });
    summary.push({ label: 'Zona', value: zoneTxt });
    summary.push({ label: 'Requisitos especiales', value: extrasTxt });
  }

  lines.push('');
  lines.push(`*Nombre:* ${contact.name}`);
  lines.push(`*Teléfono:* +506 ${contact.phone}`);

  summary.push({ label: 'Nombre', value: contact.name });
  summary.push({ label: 'Teléfono', value: `+506 ${contact.phone}` });

  return { summary, message: lines.join('\n') };
}

// ─── Main wizard ───────────────────────────────────────────────────────────

export default function QuoteWizard() {
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [houseData, setHouseData] = useState<HouseData>(defaultHouseData);
  const [remodelData, setRemodelData] = useState<RemodelData>(defaultRemodelData);
  const [buildingData, setBuildingData] = useState<BuildingData>(defaultBuildingData);
  const [commercialData, setCommercialData] = useState<CommercialData>(defaultCommercialData);
  const [contact, setContact] = useState<ContactData>(defaultContact);

  const totalSteps = projectType ? stepsPerType[projectType].length : 1;
  const isLastStep = projectType ? step >= stepsPerType[projectType].length - 1 : false;
  const currentStepLabel = projectType && step > 0 ? stepsPerType[projectType][step] : 'Tipo de proyecto';

  const canAdvance = (): boolean => {
    if (step === 0) return projectType !== null;
    if (!projectType) return false;

    // Contact step (always last)
    if (isLastStep) return contact.name.trim() !== '' && contact.phone.trim() !== '';

    if (projectType === 'casa') {
      if (step === 2) return houseData.zone !== '';
      return true;
    }
    if (projectType === 'remodelacion') {
      if (step === 1) return remodelData.remodelType !== '';
      if (step === 3) return remodelData.condition !== '';
      if (step === 4) return remodelData.zone !== '';
      return true;
    }
    if (projectType === 'edificio') {
      if (step === 2) return buildingData.buildingType !== '';
      if (step === 3) return buildingData.zone !== '';
      return true;
    }
    if (projectType === 'comercial') {
      if (step === 1) return commercialData.commercialType !== '';
      if (step === 3) return commercialData.zone !== '';
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 0 && projectType) { setStep(1); return; }
    if (isLastStep) { setShowResult(true); return; }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  const handleReset = () => {
    setProjectType(null);
    setStep(0);
    setShowResult(false);
    setHouseData(defaultHouseData);
    setRemodelData(defaultRemodelData);
    setBuildingData(defaultBuildingData);
    setCommercialData(defaultCommercialData);
    setContact(defaultContact);
  };

  if (showResult && projectType) {
    const { summary, message } = buildSummaryAndMessage(
      projectType, houseData, remodelData, buildingData, commercialData, contact,
    );
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
        <QuoteResult summary={summary} waMessage={message} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto" aria-live="polite">
      {/* Progress */}
      <div className="mb-6">
        <ProgressBar current={step + 1} total={totalSteps} />
        <h2 className="text-lg font-semibold text-forteza-green mt-4">
          {step === 0 ? '¿Qué tipo de proyecto tienes en mente?' : currentStepLabel}
        </h2>
      </div>

      {/* Step content */}
      <div className="min-h-[260px]">
        {step === 0 && (
          <StepProjectType value={projectType} onChange={(t) => setProjectType(t)} />
        )}
        {projectType === 'casa' && step > 0 && !isLastStep && (
          <StepHouse step={step} data={houseData} onChange={(d) => setHouseData((p) => ({ ...p, ...d }))} />
        )}
        {projectType === 'remodelacion' && step > 0 && !isLastStep && (
          <StepRemodel step={step} data={remodelData} onChange={(d) => setRemodelData((p) => ({ ...p, ...d }))} />
        )}
        {projectType === 'edificio' && step > 0 && !isLastStep && (
          <StepBuilding step={step} data={buildingData} onChange={(d) => setBuildingData((p) => ({ ...p, ...d }))} />
        )}
        {projectType === 'comercial' && step > 0 && !isLastStep && (
          <StepCommercial step={step} data={commercialData} onChange={(d) => setCommercialData((p) => ({ ...p, ...d }))} />
        )}
        {isLastStep && (
          <StepContact data={contact} onChange={(d) => setContact((p) => ({ ...p, ...d }))} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-forteza-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Atrás
        </button>

        <button
          onClick={handleNext}
          disabled={!canAdvance()}
          className="flex items-center gap-2 bg-forteza-green hover:bg-forteza-green-light disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green"
        >
          {isLastStep ? 'Ver resumen' : 'Siguiente'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
