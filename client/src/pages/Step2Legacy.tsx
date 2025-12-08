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
        tipo: h.tipo ?? null, // importante pro Gnomo (maior/menor)
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
      heranca: "",
      herancaNome: "",
      herancasGnomo: [],
    });
    setExpandedLegado(legadoId);
  };

  // --- REGRA ESPECIAL PARA GNOMO: 1 maior + 2 menores OU 2 maiores ---
  const validarHerancasGnomo = (
    legadoGnomo: any,
    idsSelecionados: string[]
  ): boolean => {
    const todas = legadoGnomo?.herancas ?? [];
    const selecionadas = todas.filter((h: any) =>
      idsSelecionados.includes(h.id)
    );

    const qtdMaiores = selecionadas.filter((h: any) => h.tipo === "maior")
      .length;
    const qtdMenores = selecionadas.filter((h: any) => h.tipo === "menor")
      .length;

    if (qtdMaiores === 1 && qtdMenores === 2) return true;
    if (qtdMaiores === 2 && qtdMenores === 0) return true;

    return false;
  };

  const handleHerancaClick = (legadoId: string, heranca: any) => {
    const legado = legadosNormalizados.find((l) => l.id === legadoId);
    if (!legado) return;

    // CASO GERAL (não-gnomo): escolhe UMA herança
    if (legadoId !== "gnomo") {
      atualizarPersonagem({
        heranca: heranca.id,
        herancaNome: heranca.nome,
      });
      return;
    }

    // CASO ESPECIAL: GNOMO (heranças maiores/menores)
    const atuais: string[] =
      ((personagem as any).herancasGnomo as string[]) || [];
    const jaTem = atuais.includes(heranca.id);

    let novas = jaTem
      ? atuais.filter((id) => id !== heranca.id)
      : [...atuais, heranca.id];

    // limite duro de no máximo 3 seleções
    if (novas.length > 3) {
      return;
    }

    const herancasSelecionadasObj = legado.herancas.filter((h: any) =>
      novas.includes(h.id)
    );
    const herancaNomeComposto = herancasSelecionadasObj
      .map((h: any) => h.nome)
      .join(" / ");

    atualizarPersonagem({
      herancasGnomo: novas,
      heranca: novas.length === 1 ? novas[0] : novas.join("+"),
      herancaNome: herancaNomeComposto,
    });
  };

  // --- COMPLETUDE DA ETAPA ---
  let isComplete = false;
  if (personagem.legado) {
    if (personagem.legado !== "gnomo") {
      isComplete = !!personagem.heranca;
    } else {
      const legadoGnomo = legadosNormalizados.find((l) => l.id === "gnomo");
      const herancasGnomo: string[] =
        ((personagem as any).herancasGnomo as string[]) || [];
      isComplete =
        !!legadoGnomo && validarHerancasGnomo(legadoGnomo, herancasGnomo);
    }
  }

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

  // heranças gnomo selecionadas (highlight)
  const herancasGnomoSelecionadas: string[] =
    ((personagem as any).herancasGnomo as string[]) || [];

  // texto da descrição da melancolia (campo "desc.melancolia" no JSON)
  const descMelancolia: string | null =
    legadoSelecionado &&
    (legadoSelecionado["desc.melancolia"] ||
      legadoSelecionado.descMelancolia ||
      null);

  // --- COMPONENTE DO CARD DE MELANCOLIA ---
  const MelancoliaCard = () => (
    <div className="relative p-5 rounded-lg border border-[#c9a961]/50 bg-gradient-to-b from-black/70 via-[#161622] to-[#1f1f2e] shadow-[0_0_25px_rgba(0,0,0,0.7)]">
      <div className="text-[11px] font-serif tracking-[0.25em] uppercase text-[#c9a961]/80">
        Melancolia
      </div>

      {legadoSelecionado ? (
        <>
          <h3 className="mt-2 font-serif text-2xl font-bold text-[#f5e6c5]">
            {legadoSelecionado.melancolia}
          </h3>

          {descMelancolia ? (
            <p className="mt-3 text-sm text-gray-200 leading-relaxed whitespace-pre-line">
              {descMelancolia}
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-400">
              Este legado ainda não tem uma descrição detalhada de melancolia
              cadastrada no JSON. Você pode adicioná-la no campo{" "}
              <code>“desc.melancolia”</code>.
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-[#c9a961]/30 text-xs text-gray-300">
            <span className="font-semibold text-[#c9a961]">Abençoado por:</span>{" "}
            {legadoSelecionado.deusa}
          </div>
        </>
      ) : (
        <>
          <h3 className="mt-2 font-serif text-xl font-bold text-[#f5e6c5]">
            Lamento à espera de um rosto
          </h3>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Escolha um legado à esquerda para contemplar a melancolia que o
            abraça: a forma como o mundo partido decide quebrar, aos poucos, a
            sua personagem.
          </p>
          <p className="mt-3 text-xs text-gray-500 italic">
            Cada legado traz um tipo diferente de dor — ambição, esquecimento,
            testemunho, fúria, vazio. A mecânica é regra, mas o drama é todo
            seu.
          </p>
        </>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
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

      {/* Conteúdo principal: lista de legados (esquerda) + melancolia flutuando (direita) */}
      <div className="relative">
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
          {/* Coluna esquerda: legados + heranças */}
          <div className="space-y-4">
            <h2 className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
              Selecione seu Legado
            </h2>
            <div className="grid gap-3">
              {legadosNormalizados.map((legado) => {
                const isGnomo = legado.id === "gnomo";

                return (
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
                      <div className="flex items-start justify-between gap-2">
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
                          {isGnomo && (
                            <p className="text-[11px] text-gray-400 mt-1">
                              Heranças gnômicas: escolha{" "}
                              <span className="text-[#c9a961]">
                                1 herança maior e 2 menores
                              </span>{" "}
                              ou{" "}
                              <span className="text-[#c9a961]">
                                2 heranças maiores
                              </span>
                              .
                            </p>
                          )}
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#c9a961] transition-transform flex-shrink-0 ${
                            expandedLegado === legado.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Heranças */}
                    {expandedLegado === legado.id &&
                      legado.herancas.length > 0 && (
                        <div className="ml-4 space-y-2 p-4 bg-[#1a1a2e] rounded border border-[#c9a961]/20">
                          <p className="text-xs font-serif font-bold text-[#c9a961] uppercase tracking-wider">
                            {isGnomo
                              ? "Escolha suas Heranças (Gnomo)"
                              : "Escolha sua Herança"}
                          </p>
                          {legado.herancas.map((heranca: any) => {
                            const isSelected = !isGnomo
                              ? personagem.heranca === heranca.id
                              : herancasGnomoSelecionadas.includes(
                                  heranca.id
                                );

                            return (
                              <button
                                key={heranca.id}
                                type="button"
                                onClick={() =>
                                  handleHerancaClick(legado.id, heranca)
                                }
                                className={`w-full p-3 rounded border transition-all text-left ${
                                  isSelected
                                    ? "border-[#8b5a2b] bg-[#8b5a2b]/10"
                                    : "border-[#c9a961]/20 bg-[#2a2a3e]/30 hover:border-[#8b5a2b]/60"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className="font-bold text-white">
                                    {heranca.nome}
                                  </h4>
                                  {heranca.tipo && (
                                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#c9a961]/40 text-[#c9a961]">
                                      {heranca.tipo === "maior"
                                        ? "Herança Maior"
                                        : "Herança Menor"}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                  {heranca.descricao}
                                </p>
                                {heranca.caracteristicas?.length > 0 && (
                                  <ul className="mt-2 space-y-1">
                                    {heranca.caracteristicas.map(
                                      (carac: string, idx: number) => (
                                        <li
                                          key={idx}
                                          className="text-xs text-gray-400"
                                        >
                                          • {carac}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>

            {/* MOBILE: melancolia em fluxo normal */}
            <div className="mt-6 lg:hidden">
              <MelancoliaCard />
            </div>
          </div>

          {/* DESKTOP: melancolia flutuando no meio da tela, à direita */}
          <div className="hidden lg:block">
            <div className="pointer-events-none fixed inset-y-0 right-[max(5vw,2.5rem)] flex items-center">
              <div className="pointer-events-auto w-[320px] max-w-sm">
                <MelancoliaCard />
              </div>
            </div>
          </div>
        </div>
      </div>

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
