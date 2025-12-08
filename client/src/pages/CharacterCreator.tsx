// Design Philosophy: Neogótico Contemplativo
// Página principal que gerencia o fluxo de criação de personagem
// Coordena as 7 etapas (sem painel lateral de prévia)

import { useState } from 'react';
import { useCharacter } from '@/contexts/CharacterContext';

import Step1Identity from './Step1Identity';
import Step2Legacy from './Step2Legacy';
import Step4Curse from './Step4Curse';
import StepAntecedent from './StepAntecedent';
import Step3Class from './Step3Class';
import Step5Attributes from './Step5Attributes';
import Step6Summary from './Step6Summary';

const TOTAL_STEPS = 7;

export default function CharacterCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const { resetarPersonagem } = useCharacter();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    resetarPersonagem();
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center">
      {/* Área Principal (centralizada) */}
      <main className="w-full max-w-4xl p-8 overflow-y-auto">
        {/* Indicador de Progresso */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step === currentStep
                      ? 'bg-[#c9a961] text-[#0a0a0a]'
                      : step < currentStep
                      ? 'bg-[#8b5a2b] text-[#c9a961]'
                      : 'bg-[#2a2a3e] text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < TOTAL_STEPS && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-[#8b5a2b]' : 'bg-[#2a2a3e]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo das Etapas */}
        <div className="animate-fade-in">
          {/* 1 — Identidade (nome, jogador, conceito) */}
          {currentStep === 1 && <Step1Identity onNext={handleNext} />}

          {/* 2 — Legado */}
          {currentStep === 2 && (
            <Step2Legacy onNext={handleNext} onPrev={handlePrev} />
          )}

          {/* 3 — Maldição / Marca */}
          {currentStep === 3 && (
            <Step4Curse onNext={handleNext} onPrev={handlePrev} />
          )}

          {/* 4 — Antecedente (oficial de Skyfall, só bônus) */}
          {currentStep === 4 && (
            <StepAntecedent onNext={handleNext} onPrev={handlePrev} />
          )}

          {/* 5 — Classe */}
          {currentStep === 5 && (
            <Step3Class onNext={handleNext} onPrev={handlePrev} />
          )}

          {/* 6 — Atributos */}
          {currentStep === 6 && (
            <Step5Attributes onNext={handleNext} onPrev={handlePrev} />
          )}

          {/* 7 — Resumo final */}
          {currentStep === 7 && (
            <Step6Summary onPrev={handlePrev} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* Estilos de Animação */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
