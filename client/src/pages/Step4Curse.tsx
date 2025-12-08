// Design Philosophy: Neogótico Contemplativo
// Quarta etapa: Escolha de Maldição (opcional)
// Apresenta as maldições que marcam o personagem, com guia de regras e aviso de peso narrativo

import { useCharacter } from '@/contexts/CharacterContext';
import { useSkyfalData } from '@/hooks/useSkyfalData';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Step4CurseProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Step4Curse({ onNext, onPrev }: Step4CurseProps) {
  const { personagem, atualizarPersonagem } = useCharacter();
  const { data } = useSkyfalData();

  const handleMaldicaoChange = (maldicaoId: string) => {
    // Clicar na mesma maldição remove; clicar em outra troca
    atualizarPersonagem({
      maldicao: personagem.maldicao === maldicaoId ? '' : maldicaoId,
    });
  };

  if (!data) {
    return <div className="text-center text-gray-400">Carregando dados...</div>;
  }

  const maldicaoSelecionada = data.maldicoes.find(
    (m) => m.id === personagem.maldicao
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-[#c9a961]/30 pb-8">
        <div className="inline-block">
          <div className="text-[#c9a961] text-sm font-serif font-bold uppercase tracking-widest">
            Etapa 4 de 7
          </div>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white">
          Marcas da Escuridão
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Maldições em Opath não são apenas deformidades mágicas — são destinos
          pesados que misturam poder e desgraça. Escolha uma maldição se quiser
          uma vida mais difícil, porém mais intensa.
        </p>
      </div>

      {/* Layout principal: lado esquerdo cards / lado direito guia */}
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        {/* Coluna principal: Maldições */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
              Maldições Disponíveis
            </h2>
            <span className="text-[11px] text-gray-400 italic">
              Você só pode ter <span className="text-[#ff6b6b] font-semibold">1 maldição</span>.
            </span>
          </div>

          <div className="grid gap-4">
            {data.maldicoes.map((maldicao) => {
              const selecionada = personagem.maldicao === maldicao.id;
              return (
                <button
                  key={maldicao.id}
                  type="button"
                  onClick={() => handleMaldicaoChange(maldicao.id)}
                  className={`p-5 rounded-lg border-2 transition-all text-left group ${
                    selecionada
                      ? 'border-[#ff6b6b] bg-[#6b2c2c]/40 shadow-[0_0_25px_rgba(255,107,107,0.35)]'
                      : 'border-[#6b2c2c]/40 bg-[#2a2a3e]/60 hover:border-[#ff6b6b]/70 hover:bg-[#3a2a3e]/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff6b6b]/80">
                          Maldição
                        </span>
                        {selecionada && (
                          <span className="text-[10px] px-2 py-[2px] rounded-full bg-[#ff6b6b] text-[#0a0a0a] font-semibold">
                            Escolhida
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {maldicao.nome}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {maldicao.descricao}
                      </p>

                      {maldicao.efeitos?.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {maldicao.efeitos.map((efeito, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-gray-300 flex gap-2"
                            >
                              <span className="mt-[3px] text-[#ff6b6b]">◆</span>
                              <span>{efeito}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {selecionada && (
                      <div className="ml-2 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-[#ff6b6b] flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                        <p className="mt-1 text-[10px] text-gray-300 text-center">
                          Clique novamente
                          <br />
                          para remover
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Opção Sem Maldição */}
          <button
            type="button"
            onClick={() => atualizarPersonagem({ maldicao: '' })}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              !personagem.maldicao
                ? 'border-[#c9a961] bg-[#c9a961]/10 shadow-[0_0_18px_rgba(201,169,97,0.3)]'
                : 'border-[#c9a961]/30 bg-[#2a2a3e]/60 hover:border-[#c9a961]/70'
            }`}
          >
            <h3 className="font-serif text-lg font-bold text-white">
              Sem Maldição
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Prosseguir sem carregar um fardo extra. Sua personagem ainda pode
              ser trágica — só não é amaldiçoada pelas forças mais bizarras de Opath.
            </p>
          </button>

          {/* Aviso contextual quando tem maldição */}
          {personagem.maldicao && (
            <div className="p-4 bg-[#6b2c2c]/20 rounded border border-[#ff6b6b]/40">
              <p className="text-sm text-gray-200">
                <span className="font-bold text-[#ff6b6b]">Aviso mecânico:</span>{' '}
                Maldições deixam sua vida mais difícil por design — penalidades
                reais em troca de poderes fortes. Combine com a mesa como isso
                entra no tom da campanha.
              </p>
            </div>
          )}
        </div>

        {/* Coluna lateral: Guia de Maldições */}
        <aside className="space-y-4">
          <div className="rounded-lg border border-[#c9a961]/40 bg-[#11111b]/90 p-4 space-y-3">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#c9a961]">
              Guia de Maldições
            </p>
            <h2 className="font-serif text-xl text-[#f7f4e9]">
              Amaldiçoados em Opath
            </h2>
            <p className="text-sm text-gray-300">
              Criaturas amaldiçoadas carregam um misto de poder e desgraça. Elas
              chamam atenção, ocupam posições de destaque e despertam o interesse
              de entidades divinas, monstros e gente perigosa. Mecânica e
              narrativamente, você está aceitando uma vida mais dura.
            </p>
            <p className="text-xs text-gray-400">
              Não existe preconceito “automático” contra amaldiçoados em Opath.
              Evite cenas de discriminação gratuita — o foco é o peso pessoal da
              maldição, não sofrimento social genérico.
            </p>
          </div>

          <div className="rounded-lg border border-[#c9a961]/40 bg-[#151523]/90 p-4 space-y-3">
            <h3 className="font-serif text-lg text-[#c9a961]">
              Duplicando Resistências e Perícias
            </h3>
            <p className="text-xs text-gray-300">
              Durante a criação (legado, herança, maldição e antecedente), é
              possível que você ganhe o mesmo benefício duas vezes. Use:
            </p>
            <ul className="text-xs text-gray-200 space-y-1 mt-1">
              <li>
                • Se ganhar <span className="text-[#c9a961]">resistência</span> ao mesmo tipo de dano duas vezes,
                você se torna <span className="text-[#c9a961]">imune</span> a esse dano.
              </li>
              <li>
                • Se ficar proficiente na mesma{' '}
                <span className="text-[#c9a961]">perícia</span> duas vezes, torna-se{' '}
                <span className="text-[#c9a961]">expert</span> nela.
              </li>
            </ul>
            <p className="text-[11px] text-gray-400 mt-2">
              Isso só vale para repetições vindas de legado, herança, maldição e
              antecedente. Se a repetição vier de classe, magia ou outro efeito,
              escolha outra perícia ou apenas ignora o “extra”, conforme o livro.
            </p>
          </div>

          <div className="rounded-lg border border-[#ff6b6b]/40 bg-[#2a1515]/90 p-4 space-y-3">
            <h3 className="font-serif text-lg text-[#ff6b6b]">
              Regra Opcional: Catarse da Maldição
            </h3>
            <p className="text-xs text-gray-200">
              Se o grupo quiser reforçar ainda mais o peso da maldição, é
              possível ganhar <span className="text-[#c9a961]">pontos de catarse</span> quando a maldição for
              tensionada em cena.
            </p>
            <ul className="text-[11px] text-gray-300 space-y-1 mt-1">
              <li>• Funciona como a Melancolia: precisa ser dramático e relevante.</li>
              <li>• Só 1 ponto de catarse por cena vindo da maldição.</li>
              <li>
                • Se ganhar catarse pela maldição, não ganha pela Melancolia na
                mesma cena (e vice-versa).
              </li>
            </ul>
            <p className="text-[11px] text-gray-400 mt-2">
              Combine com a Mestre se essa regra opcional estará ativa na
              campanha.
            </p>
          </div>

          {maldicaoSelecionada && (
            <div className="rounded-lg border border-[#ff6b6b]/40 bg-[#1e1010] p-4 space-y-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#ff6b6b]">
                Maldição Escolhida
              </p>
              <p className="text-sm text-gray-200">
                <span className="font-serif font-bold text-[#f7f4e9]">
                  {maldicaoSelecionada.nome}
                </span>{' '}
                será a marca que define seu personagem. Use-a ativamente na
                interpretação: decisões arriscadas, momentos de fraqueza e
                sacrifícios podem girar em torno dela.
              </p>
            </div>
          )}
        </aside>
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
          className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-8"
        >
          Próxima Etapa →
        </Button>
      </div>
    </div>
  );
}
