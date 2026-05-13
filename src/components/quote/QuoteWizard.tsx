import { useState } from 'react';
import type { ProjectType, Zone } from '../../data/quoteConfig';
import StepProjectType from './steps/StepProjectType';
import StepHouse, { type HouseData } from './steps/StepHouse';
import StepRemodel, { type RemodelData } from './steps/StepRemodel';
import StepBuilding, { type BuildingData } from './steps/StepBuilding';
import StepCommercial, { type CommercialData } from './steps/StepCommercial';
import QuoteResult from './QuoteResult';

const stepsPerType: Record<string, string[]> = {
  casa:         ['Tipo de proyecto', 'Tamaño y terreno', 'Zona', 'Habitaciones', 'Extras'],
  remodelacion: ['Tipo de proyecto', 'Tipo de remodelación', 'Área', 'Estado actual', 'Zona'],
  edificio:     ['Tipo de proyecto', 'Escala del proyecto', 'Uso', 'Zona'],
  comercial:    ['Tipo de proyecto', 'Tipo de espacio', 'Área', 'Zona', 'Requisitos'],
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

export default function QuoteWizard() {
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [step, setStep] = useState(0); // 0 = type selection
  const [showResult, setShowResult] = useState(false);

  const [houseData, setHouseData] = useState<HouseData>(defaultHouseData);
  const [remodelData, setRemodelData] = useState<RemodelData>(defaultRemodelData);
  const [buildingData, setBuildingData] = useState<BuildingData>(defaultBuildingData);
  const [commercialData, setCommercialData] = useState<CommercialData>(defaultCommercialData);

  const totalSteps = projectType ? stepsPerType[projectType].length : 1;
  const currentStepLabel = projectType && step > 0 ? stepsPerType[projectType][step] : 'Tipo de proyecto';

  const canAdvance = (): boolean => {
    if (step === 0) return projectType !== null;
    if (!projectType) return false;
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
    const lastStep = totalSteps - 1;
    if (step >= lastStep) { setShowResult(true); return; }
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
  };

  const getResultProps = () => {
    if (projectType === 'casa')
      return { projectType, zone: houseData.zone as Zone, area: houseData.area, extras: houseData.extras };
    if (projectType === 'remodelacion')
      return { projectType, zone: remodelData.zone as Zone, area: remodelData.area, condition: remodelData.condition };
    if (projectType === 'edificio')
      return { projectType, zone: buildingData.zone as Zone, area: buildingData.floors * buildingData.units * 80 };
    return { projectType: projectType!, zone: commercialData.zone as Zone, area: commercialData.area, extras: commercialData.extras };
  };

  if (showResult && projectType) {
    const props = getResultProps();
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
        <QuoteResult {...props} onReset={handleReset} />
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
        {projectType === 'casa' && step > 0 && (
          <StepHouse step={step} data={houseData} onChange={(d) => setHouseData((prev) => ({ ...prev, ...d }))} />
        )}
        {projectType === 'remodelacion' && step > 0 && (
          <StepRemodel step={step} data={remodelData} onChange={(d) => setRemodelData((prev) => ({ ...prev, ...d }))} />
        )}
        {projectType === 'edificio' && step > 0 && (
          <StepBuilding step={step} data={buildingData} onChange={(d) => setBuildingData((prev) => ({ ...prev, ...d }))} />
        )}
        {projectType === 'comercial' && step > 0 && (
          <StepCommercial step={step} data={commercialData} onChange={(d) => setCommercialData((prev) => ({ ...prev, ...d }))} />
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
          {step >= totalSteps - 1 ? 'Ver mi estimado' : 'Siguiente'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
