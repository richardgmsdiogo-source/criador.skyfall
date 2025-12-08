// Design Philosophy: Neogótico Contemplativo
// Painel fixo que mostra o personagem em tempo real
// Atualiza conforme o usuário preenche o formulário

import { useCharacter } from '@/contexts/CharacterContext';
import { useSkyfalData } from '@/hooks/useSkyfalData';
import { Legado, Classe, Maldicao } from '@/types/character';

export function CharacterPreview() {
  const { personagem } = useCharacter();
  const { data } = useSkyfalData();

  // Encontrar objetos selecionados
  const legadoSelecionado = data?.legados.find((l) => l.id === personagem.legado);
  const classeSelecionada = data?.classes.find((c) => c.id === personagem.classe);
  const maldicaoSelecionada = data?.maldicoes.find((m) => m.id === personagem.maldicao);

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] border-l border-[#c9a961]/20 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[#c9a961]/20 bg-[#0a0a0a]/95 backdrop-blur-sm p-6">
        <h2 className="font-serif text-2xl font-bold text-[#c9a961]">Seu Personagem</h2>
        <p className="text-sm text-gray-400 mt-1">Acompanhe a criação em tempo real</p>
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-8">
        {/* Nome e Foto */}
        <section className="space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#c9a961] border-b border-[#c9a961]/30 pb-2">
            Identidade
          </h3>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Nome</p>
            <p className="text-lg font-semibold text-white">
              {personagem.nome || '— Não definido —'}
            </p>
          </div>
          {personagem.foto && (
            <div className="mt-4">
              <img
                src={personagem.foto}
                alt={personagem.nome}
                className="w-full h-48 object-cover rounded border border-[#c9a961]/30"
              />
            </div>
          )}
          {personagem.resumo && (
            <div className="mt-3 p-3 bg-[#2a2a3e]/50 rounded border border-[#c9a961]/20">
              <p className="text-sm text-gray-300 italic">{personagem.resumo}</p>
            </div>
          )}
        </section>

        {/* Legado */}
        {legadoSelecionado && (
          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#c9a961] border-b border-[#c9a961]/30 pb-2">
              Legado
            </h3>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Raça</p>
              <p className="text-lg font-semibold text-white">{legadoSelecionado.nome}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Melancolia</p>
              <p className="text-sm text-gray-300">{legadoSelecionado.melancolia}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Abençoada por</p>
              <p className="text-sm text-[#8b5a2b]">{legadoSelecionado.deusa}</p>
            </div>
          </section>
        )}

        {/* Classe */}
        {classeSelecionada && (
          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#c9a961] border-b border-[#c9a961]/30 pb-2">
              Classe
            </h3>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Caminho</p>
              <p className="text-lg font-semibold text-white">{classeSelecionada.nome}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Perícias Iniciais</p>
              <p className="text-sm text-gray-300">{classeSelecionada.pericias_iniciais}</p>
            </div>
          </section>
        )}

        {/* Maldição */}
        {maldicaoSelecionada && (
          <section className="space-y-3 p-3 bg-[#6b2c2c]/20 rounded border border-[#6b2c2c]/50">
            <h3 className="font-serif text-lg font-bold text-[#ff6b6b] border-b border-[#ff6b6b]/30 pb-2">
              Maldição
            </h3>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Marca</p>
              <p className="text-lg font-semibold text-white">{maldicaoSelecionada.nome}</p>
            </div>
            <p className="text-sm text-gray-300">{maldicaoSelecionada.descricao}</p>
          </section>
        )}

        {/* Atributos */}
        <section className="space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#c9a961] border-b border-[#c9a961]/30 pb-2">
            Atributos
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(personagem.atributos).map(([key, value]) => (
              <div key={key} className="bg-[#2a2a3e]/50 rounded p-2 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider">{key}</p>
                <p className="text-2xl font-bold text-[#c9a961]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pontos de Vida */}
        {personagem.pontos_vida > 0 && (
          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#c9a961]">Pontos de Vida</h3>
            <div className="bg-[#2a2a3e]/50 rounded p-3 text-center">
              <p className="text-3xl font-bold text-[#8b5a2b]">{personagem.pontos_vida}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
