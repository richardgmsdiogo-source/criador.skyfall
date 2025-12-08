// Design Philosophy: Neogótico Contemplativo
// Quinta etapa: Distribuição de Atributos
// Método: point buy 27 pontos (padrão 5e/Skyfall)

import { useCharacter } from '@/contexts/CharacterContext';
import { useSkyfalData } from '@/hooks/useSkyfalData';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface Step5AttributesProps {
  onNext: () => void;
  onPrev: () => void;
}

// total de pontos do point buy padrão
const TOTAL_PONTOS = 27;

// custo TOTAL de cada valor de atributo (regra 5e)
function custoPorValor(valor: number): number {
  switch (valor) {
    case 8:
      return 0;
    case 9:
      return 1;
    case 10:
      return 2;
    case 11:
      return 3;
    case 12:
      return 4;
    case 13:
      return 5;
    case 14:
      return 7;
    case 15:
      return 9;
    default:
      return Infinity; // fora da faixa permitida
  }
}

export default function Step5Attributes({ onNext, onPrev }: Step5AttributesProps) {
  const { personagem, atualizarAtributos } = useCharacter();
  const { data } = useSkyfalData();

  const atributosOrdenados: Array<keyof typeof personagem.atributos> = [
    'FOR',
    'DEX',
    'RES',
    'INT',
    'SAB',
    'CAR',
  ];

  // garante que sempre tenha um valor válido (base 8)
  const getValor = (atributo: keyof typeof personagem.atributos) => {
    const bruto = personagem.atributos?.[atributo];
    return typeof bruto === 'number' && bruto > 0 ? bruto : 8;
  };

  // calcula o custo total atual
  const custoAtualTotal = atributosOrdenados.reduce((acc, atributo) => {
    const v = getValor(atributo);
    return acc + custoPorValor(v);
  }, 0);

  const pontosRestantes = TOTAL_PONTOS - custoAtualTotal;
  const isComplete = pontosRestantes === 0;

  const handleAumentar = (atributo: keyof typeof personagem.atributos) => {
    const valorAtual = getValor(atributo);

    // limite superior
    if (valorAtual >= 15) return;

    const novoValor = valorAtual + 1;
    const custoAntes = custoPorValor(valorAtual);
    const custoDepois = custoPorValor(novoValor);

    const delta = custoDepois - custoAntes;

    // se o aumento custar mais pontos do que temos, bloqueia
    if (delta > pontosRestantes) return;

    atualizarAtributos({
      [atributo]: novoValor,
    });
  };

  const handleDiminuir = (atributo: keyof typeof personagem.atributos) => {
    const valorAtual = getValor(atributo);

    // limite inferior
    if (valorAtual <= 8) return;

    const novoValor = valorAtual - 1;

    atualizarAtributos({
      [atributo]: novoValor,
    });
    // não precisamos mexer em pontosRestantes manualmente,
    // ele é recalculado a partir dos atributos.
  };

  const handleReset = () => {
    atualizarAtributos({
      FOR: 8,
      DEX: 8,
      RES: 8,
      INT: 8,
      SAB: 8,
      CAR: 8,
    });
    // pontosRestantes volta a 27 automaticamente, porque o custo total será 0
  };

  if (!data) {
    return <div className="text-center text-gray-400">Carregando dados...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-[#c9a961]/30 pb-8">
        <div className="inline-block">
          <div className="text-[#c9a961] text-sm font-serif font-bold uppercase tracking-widest">
            Etapa 5 de 6
          </div>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white">
          Seus Atributos
        </h1>
        <p className="text-gray-300 max-w-md mx-auto">
          Método de compra por pontos (27) padrão do 5e/Skyfall.
          Todos os atributos começam em 8. Subir custa mais caro conforme o valor:
          máximo 15 antes de bônus de legado/classe.
        </p>
      </div>

      {/* Painel de pontos restantes */}
      <div className="flex items-center justify-between p-4 rounded bg-black/40 border border-[#c9a961]/40">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Pontos Restantes
          </p>
          <p className="text-3xl font-bold text-[#c9a961]">{pontosRestantes}</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-[11px] text-gray-400">
          <span>Custo total: 8→0, 9→1, 10→2, 11→3, 12→4, 13→5, 14→7, 15→9.</span>
          <Button
            variant="outline"
            size="sm"
            className="border-[#c9a961]/60 text-[#c9a961] mt-1"
            onClick={handleReset}
          >
            Resetar
          </Button>
        </div>
      </div>

      {/* Lista de atributos */}
      <div className="space-y-4">
        {atributosOrdenados.map((atributo) => {
          const valor = getValor(atributo);
          const modificador = Math.floor((valor - 10) / 2);

          const nomeCompleto =
            atributo === 'FOR'
              ? 'Força'
              : atributo === 'DEX'
              ? 'Destreza'
              : atributo === 'RES'
              ? 'Resistência'
              : atributo === 'INT'
              ? 'Inteligência'
              : atributo === 'SAB'
              ? 'Sabedoria'
              : 'Carisma';

          const podeAumentar =
            valor < 15 &&
            custoPorValor(valor + 1) - custoPorValor(valor) <= pontosRestantes;

          const podeDiminuir = valor > 8;

          return (
            <div
              key={atributo}
              className="flex items-center justify-between p-4 rounded bg-[#2a2a3e]/60 border border-[#c9a961]/30"
            >
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {atributo}
                </p>
                <p className="text-lg font-serif font-bold text-white">
                  {nomeCompleto}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Modificador:{' '}
                  {modificador >= 0 ? `+${modificador}` : modificador}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="border-[#c9a961]/60 text-[#c9a961]"
                  disabled={!podeDiminuir}
                  onClick={() => handleDiminuir(atributo)}
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="w-12 text-center">
                  <span className="text-2xl font-bold text-white">
                    {valor}
                  </span>
                </div>

                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="border-[#c9a961]/60 text-[#c9a961]"
                  disabled={!podeAumentar}
                  onClick={() => handleAumentar(atributo)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navegação */}
      <div className="flex justify-between pt-4 border-t border-[#c9a961]/30">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white"
          onClick={onPrev}
        >
          Voltar
        </Button>
        <Button
          variant={isComplete ? 'default' : 'outline'}
          className={
            isComplete
              ? 'bg-[#c9a961] text-black hover:bg-[#e0c27a]'
              : 'border-[#c9a961]/60 text-[#c9a961]'
          }
          disabled={!isComplete}
          onClick={onNext}
        >
          {isComplete ? 'Continuar' : 'Use todos os pontos para avançar'}
        </Button>
      </div>
    </div>
  );
}
