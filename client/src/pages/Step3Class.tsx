// Design Philosophy: Neogótico Contemplativo
// Terceira etapa: Escolha da Classe
// Apresenta os três caminhos de combate

import { useCharacter } from '@/contexts/CharacterContext';
import { useSkyfalData } from '@/hooks/useSkyfalData';
import { Button } from '@/components/ui/button';

interface Step3ClassProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Step3Class({ onNext, onPrev }: Step3ClassProps) {
  const { personagem, atualizarPersonagem } = useCharacter();
  const { data } = useSkyfalData();

  const handleClasseChange = (classeId: string) => {
    atualizarPersonagem({ classe: classeId });
  };

  const isComplete = personagem.classe.length > 0;

  if (!data) {
    return <div className="text-center text-gray-400">Carregando dados...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-[#c9a961]/30 pb-8">
        <div className="inline-block">
          <div className="text-[#c9a961] text-sm font-serif font-bold uppercase tracking-widest">
            Etapa 3 de 6
          </div>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white">
          Seu Caminho
        </h1>
        <p className="text-gray-300 max-w-md mx-auto">
          Escolha como você enfrentará os perigos de Opath. Cada classe oferece
          uma forma única de sobreviver.
        </p>
      </div>

      {/* Classes */}
      <div className="space-y-4">
        <h2 className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
          Selecione sua Classe
        </h2>
        <div className="grid gap-4">
          {data.classes.map((classe) => (
            <button
              key={classe.id}
              onClick={() => handleClasseChange(classe.id)}
              className={`p-6 rounded border-2 transition-all text-left ${
                personagem.classe === classe.id
                  ? 'border-[#c9a961] bg-[#c9a961]/10'
                  : 'border-[#c9a961]/30 bg-[#2a2a3e]/50 hover:border-[#c9a961]/60'
              }`}
            >
              <h3 className="font-serif text-2xl font-bold text-white">
                {classe.nome}
              </h3>
              <p className="text-gray-300 mt-2">{classe.descricao}</p>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Atributos Primários
                  </p>
                  <p className="text-sm text-[#8b5a2b] font-semibold">
                    {classe.atributos_primarios.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Perícias Iniciais
                  </p>
                  <p className="text-sm text-[#8b5a2b] font-semibold">
                    {classe.pericias_iniciais}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between pt-8 border-t border-[#c9a961]/30">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-[#c9a961]/30 text-[#c9a961] hover:bg-[#c9a961]/10"
        >
          ← Voltar
        </Button>
        <Button
          onClick={onNext}
          disabled={!isComplete}
          className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-8"
        >
          Próxima Etapa →
        </Button>
      </div>
    </div>
  );
}
