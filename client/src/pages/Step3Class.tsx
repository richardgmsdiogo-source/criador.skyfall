// Design Philosophy: Neogótico Contemplativo
// Terceira etapa: Escolha da Classe
// Apresenta os três caminhos de combate

import { useCharacter } from "@/contexts/CharacterContext";
import { useSkyfalData } from "@/hooks/useSkyfalData";
import { Button } from "@/components/ui/button";

interface Step3ClassProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Step3Class({ onNext, onPrev }: Step3ClassProps) {
  const { personagem, atualizarPersonagem } = useCharacter();
  const { data } = useSkyfalData();

  // --- DEFENSIVO: garante array de classes ---
  const classesBrutas: any[] = Array.isArray((data as any)?.classes)
    ? (data as any).classes
    : [];

  const classesNormalizadas = classesBrutas.map((classe: any) => {
    const vida = classe.vida ?? {};
    const enfase = classe.enfase ?? {};
    const prof = classe.proficiencias ?? {};

    return {
      id: classe.id ?? "",
      nome: classe.nome ?? "",
      descricao: classe.descricao ?? "",
      atributos_primarios: Array.isArray(classe.atributos_primarios)
        ? classe.atributos_primarios
        : [],
      pericias_iniciais: classe.pericias_iniciais ?? 0,
      papel: classe.papel ?? "",
      resumo: Array.isArray(classe.resumo) ? classe.resumo : [],
      vida: {
        dado_vida: vida.dado_vida ?? "",
        pv_nivel_1: vida.pv_nivel_1 ?? "",
        pv_por_nivel: vida.pv_por_nivel ?? "",
      },
      enfase: {
        pontos_por_nivel: enfase.pontos_por_nivel ?? 3,
      },
      proficiencias: {
        armaduras: prof.armaduras ?? "",
        armas: prof.armas ?? "",
        protecoes: prof.protecões ?? prof.protecoes ?? "",
        pericias_fixas: Array.isArray(prof.pericias_fixas)
          ? prof.pericias_fixas
          : [],
        pericias_escolha: Array.isArray(prof.pericias_escolha)
          ? prof.pericias_escolha
          : [],
        extras: prof.extras ?? "",
      },
      exemplos_personagem: Array.isArray(classe.exemplos_personagem)
        ? classe.exemplos_personagem
        : [],
    };
  });

  const handleClasseChange = (classeId: string) => {
    atualizarPersonagem({ classe: classeId });
  };

  const classeSelecionada = classesNormalizadas.find(
    (c) => c.id === personagem.classe
  );

  const isComplete = !!personagem.classe;

  if (!data && classesNormalizadas.length === 0) {
    return (
      <div className="text-center text-gray-400">Carregando dados...</div>
    );
  }

  if (classesNormalizadas.length === 0) {
    return (
      <div className="text-center text-gray-400">
        Não foi possível carregar as classes. Verifique o arquivo de dados ou o
        hook useSkyfalData.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-[#c9a961]/30 pb-8">
        <div className="inline-block">
          <div className="text-[#c9a961] text-sm font-serif font-bold uppercase tracking-widest">
            Etapa 4 de 6
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

      {/* Layout em duas colunas: lista à esquerda, detalhes à direita */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Lista de Classes */}
        <div className="space-y-4">
          <h2 className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
            Selecione sua Classe
          </h2>
          <div className="grid gap-4">
            {classesNormalizadas.map((classe) => {
              const selecionada = personagem.classe === classe.id;

              return (
                <button
                  key={classe.id}
                  type="button"
                  onClick={() => handleClasseChange(classe.id)}
                  className={`w-full p-5 rounded border-2 transition-all text-left ${
                    selecionada
                      ? "border-[#c9a961] bg-[#c9a961]/10 shadow-[0_0_25px_rgba(201,169,97,0.35)]"
                      : "border-[#c9a961]/30 bg-[#2a2a3e]/50 hover:border-[#c9a961]/60 hover:bg-[#2a2a3e]/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {classe.nome}
                      </h3>
                      <p className="text-xs mt-1 text-[#c9a961] uppercase tracking-wide">
                        {classe.papel}
                      </p>
                      <p className="text-sm text-gray-300 mt-2">
                        {classe.descricao}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-400 flex flex-col gap-1">
                      <div>
                        <span className="block uppercase tracking-wide text-[10px] text-gray-500">
                          Atributos
                        </span>
                        <span className="font-semibold text-[#8b5a2b]">
                          {classe.atributos_primarios.join(" / ")}
                        </span>
                      </div>
                      <div>
                        <span className="block uppercase tracking-wide text-[10px] text-gray-500">
                          Perícias iniciais
                        </span>
                        <span className="font-semibold text-[#8b5a2b]">
                          {classe.pericias_iniciais}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mini resumo em bullets curtos */}
                  {classe.resumo.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {classe.resumo.slice(0, 3).map((linha: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-400 flex gap-1"
                        >
                          <span className="text-[#c9a961]">◆</span>
                          <span>{linha}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel de Detalhes da Classe Selecionada */}
        <div className="space-y-4">
          <h2 className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
            Detalhes da Classe
          </h2>

          {classeSelecionada ? (
            <div className="p-5 rounded border border-[#c9a961]/30 bg-[#1a1a2e]/80 space-y-4">
              {/* Título + papel */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Classe escolhida
                </p>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {classeSelecionada.nome}
                </h3>
                {classeSelecionada.papel && (
                  <p className="text-sm text-[#c9a961] mt-1">
                    {classeSelecionada.papel}
                  </p>
                )}
              </div>

              {/* Resumo rápido */}
              {classeSelecionada.resumo.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#c9a961] uppercase tracking-wider">
                    Resumo rápido
                  </p>
                  <ul className="mt-2 space-y-1">
                    {classeSelecionada.resumo.map((linha: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-300 flex gap-1"
                      >
                        <span className="text-[#c9a961]">●</span>
                        <span>{linha}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vida e Ênfase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
                <div className="space-y-1">
                  <p className="font-semibold text-[#c9a961] uppercase tracking-wider">
                    Vida
                  </p>
                  {classeSelecionada.vida.dado_vida && (
                    <p>
                      <span className="text-gray-400">Dado de Vida:</span>{" "}
                      {classeSelecionada.vida.dado_vida}
                    </p>
                  )}
                  {classeSelecionada.vida.pv_nivel_1 && (
                    <p>
                      <span className="text-gray-400">PV 1º nível:</span>{" "}
                      {classeSelecionada.vida.pv_nivel_1}
                    </p>
                  )}
                  {classeSelecionada.vida.pv_por_nivel && (
                    <p>
                      <span className="text-gray-400">PV por nível:</span>{" "}
                      {classeSelecionada.vida.pv_por_nivel}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#c9a961] uppercase tracking-wider">
                    Ênfase
                  </p>
                  <p>
                    <span className="text-gray-400">Pontos por nível:</span>{" "}
                    {classeSelecionada.enfase.pontos_por_nivel}
                  </p>
                </div>
              </div>

              {/* Proficiências */}
              <div className="space-y-1 text-xs text-gray-300">
                <p className="font-semibold text-[#c9a961] uppercase tracking-wider">
                  Proficiências
                </p>
                {classeSelecionada.proficiencias.armaduras && (
                  <p>
                    <span className="text-gray-400">Armaduras:</span>{" "}
                    {classeSelecionada.proficiencias.armaduras}
                  </p>
                )}
                {classeSelecionada.proficiencias.armas && (
                  <p>
                    <span className="text-gray-400">Armas:</span>{" "}
                    {classeSelecionada.proficiencias.armas}
                  </p>
                )}
                {classeSelecionada.proficiencias.protecoes && (
                  <p>
                    <span className="text-gray-400">Proteções:</span>{" "}
                    {classeSelecionada.proficiencias.protecoes}
                  </p>
                )}

                {classeSelecionada.proficiencias.pericias_fixas.length > 0 && (
                  <p>
                    <span className="text-gray-400">Perícias fixas:</span>{" "}
                    {classeSelecionada.proficiencias.pericias_fixas.join(", ")}
                  </p>
                )}

                {classeSelecionada.proficiencias.pericias_escolha.length > 0 && (
                  <p>
                    <span className="text-gray-400">Perícias à escolha:</span>{" "}
                    {classeSelecionada.proficiencias.pericias_escolha.join(", ")}
                  </p>
                )}

                {classeSelecionada.proficiencias.extras && (
                  <p className="text-[11px] text-gray-400 mt-1">
                    {classeSelecionada.proficiencias.extras}
                  </p>
                )}
              </div>

              {/* Exemplos de personagem */}
              {classeSelecionada.exemplos_personagem.length > 0 && (
                <div className="pt-2 border-t border-[#c9a961]/20">
                  <p className="text-xs font-semibold text-[#c9a961] uppercase tracking-wider">
                    Exemplos de personagem
                  </p>
                  <ul className="mt-2 space-y-1">
                    {classeSelecionada.exemplos_personagem.map(
                      (ex: string, idx: number) => (
                        <li key={idx} className="text-xs text-gray-300">
                          • {ex}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="p-5 rounded border border-dashed border-[#c9a961]/30 bg-[#1a1a2e]/40 text-sm text-gray-400">
              Nenhuma classe selecionada ainda. Escolha uma à esquerda para ver
              detalhes de vida, proficiências e estilo de jogo.
            </div>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between pt-8 border-t border-[#c9a961]/30 mt-4">
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
