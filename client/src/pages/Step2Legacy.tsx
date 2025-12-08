// Design Philosophy: Neogótico Contemplativo
// Segunda etapa: Escolha do Legado (Raça) e Herança
// Apresenta as diferentes criaturas abençoadas

import { useState } from "react";
import { useCharacter } from "@/contexts/CharacterContext";
import { useSkyfalData } from "@/hooks/useSkyfalData";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Step2LegacyProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2Legacy({ onNext, onPrev }: Step2LegacyProps) {
  const { personagem, atualizarPersonagem } = useCharacter();
  const { data } = useSkyfalData();
  const [expandedLegado, setExpandedLegado] = useState<string | null>(null);

  // --- DEFENSIVO: garante que sempre temos um array de legados ---
  const legadosBrutos: any[] = Array.isArray((data as any)?.legados)
    ? (data as any).legados
    : [];

  const legadosNormalizados = legadosBrutos.map((legado: any) => {
    const herancasRaw =
      legado.herancas ??
      legado.heranças ??
      legado["herancas"] ??
      legado["heranças"] ??
      [];

    const herancasArray = Array.isArray(herancasRaw) ? herancasRaw : [];

    return {
      ...legado,
      herancas: herancasArray.map((h: any) => ({
        id: h.id ?? "",
        nome: h.nome ?? "",
        descricao: h.descricao ?? "",
        tamanho: h.tamanho ?? "",
        caracteristicas: Array.isArray(h.caracteristicas)
          ? h.caracteristicas
          : [],
      })),
    };
  });

  const legadoSelecionado = legadosNormalizados.find(
    (l) => l.id === personagem.legado
  );

  const handleLegadoChange = (legadoId: string) => {
    atualizarPersonagem({
      legado: legadoId,
      heranca: "", // resetar herança ao trocar legado
    });
    setExpandedLegado(legadoId);
  };

  const handleHerancaChange = (herancaId: string, herancaNome: string) => {
    atualizarPersonagem({
      heranca: herancaId,
      herancaNome,
    });
  };

  const isComplete = !!(personagem.legado && personagem.heranca);

  // Se nem o hook trouxe dados ainda, mostra só um feedback genérico
  if (!data && legadosNormalizados.length === 0) {
    return (
      <div className="text-center text-gray-400">
        Carregando dados de legado...
      </div>
    );
  }

  // Se por algum motivo não tiver legado nenhum, não quebra a tela
  if (legadosNormalizados.length === 0) {
    return (
      <div className="text-center text-gray-400">
        Não foi possível carregar os Legados. Verifique o arquivo de dados
        (legados) ou o hook useSkyfalData.
      </div>
    );
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
          Seu Legado
        </h1>
        <p className="text-gray-300 max-w-md mx-auto">
          Escolha qual criatura você é. Cada legado carrega uma melancolia
          única, um lamento pela deusa Vida perdida.
        </p>
      </div>

      {/* Legados */}
      <div className="space-y-4">
        <h2 className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
          Selecione seu Legado
        </h2>
        <div className="grid gap-3">
          {legadosNormalizados.map((legado) => (
            <div key={legado.id} className="space-y-2">
              <button
                type="button"
                onClick={() => handleLegadoChange(legado.id)}
                className={`w-full p-4 rounded border-2 transition-all text-left ${
                  personagem.legado === legado.id
                    ? "border-[#c9a961] bg-[#c9a961]/10"
                    : "border-[#c9a961]/30 bg-[#2a2a3e]/50 hover:border-[#c9a961]/60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {legado.nome}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {legado.descricao}
                    </p>
                    <p className="text-xs text-[#8b5a2b] mt-2">
                      Melancolia: {legado.melancolia}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#c9a961] transition-transform flex-shrink-0 ${
                      expandedLegado === legado.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Heranças */}
              {expandedLegado === legado.id && legado.herancas.length > 0 && (
                <div className="ml-4 space-y-2 p-4 bg-[#1a1a2e] rounded border border-[#c9a961]/20">
                  <p className="text-xs font-serif font-bold text-[#c9a961] uppercase tracking-wider">
                    Escolha sua Herança
                  </p>
                  {legado.herancas.map((heranca: any) => (
                    <button
                      key={heranca.id}
                      type="button"
                      onClick={() =>
                        handleHerancaChange(heranca.id, heranca.nome)
                      }
                      className={`w-full p-3 rounded border transition-all text-left ${
                        personagem.heranca === heranca.id
                          ? "border-[#8b5a2b] bg-[#8b5a2b]/10"
                          : "border-[#c9a961]/20 bg-[#2a2a3e]/30 hover:border-[#8b5a2b]/60"
                      }`}
                    >
                      <h4 className="font-bold text-white">{heranca.nome}</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {heranca.descricao}
                      </p>
                      {heranca.tamanho && (
                        <p className="text-xs text-gray-500 mt-2">
                          Tamanho: {heranca.tamanho}
                        </p>
                      )}
                      {heranca.caracteristicas?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {heranca.caracteristicas.map(
                            (carac: string, idx: number) => (
                              <li key={idx} className="text-xs text-gray-400">
                                • {carac}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info do Legado Selecionado */}
      {legadoSelecionado && (
        <div className="p-4 bg-[#2a2a3e]/50 rounded border border-[#c9a961]/20">
          <p className="text-sm text-gray-300">
            <span className="font-bold text-[#c9a961]">Abençoado por:</span>{" "}
            {legadoSelecionado.deusa}
          </p>
        </div>
      )}

      {/* Botões */}
      <div className="flex justify-between pt-8 border-t border-[#c9a961]/30">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          className="border-[#c9a961]/30 text-[#c9a961] hover:bg-[#c9a961]/10"
        >
          ← Voltar
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={!isComplete}
          className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima Etapa →
        </Button>
      </div>
    </div>
  );
}
