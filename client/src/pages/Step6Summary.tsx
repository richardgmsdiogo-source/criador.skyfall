// Design Philosophy: Neogótico Contemplativo
// Etapa 7: Resumo Final em formato de Ficha Skyfall (1ª página)
// Mostra identidade, retrato grande, antecedente, legado, classe, atributos, PV e maldição
// Inclui bloco de Proficiências e botão de "Exportar PDF" usando window.print()

import { useCharacter } from "@/contexts/CharacterContext";
import { useSkyfalData } from "@/hooks/useSkyfalData";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";

// IMPORTANDO AS IMAGENS DO VITE (usa client/src/assets)
// só as que você REALMENTE tem na pasta
import anuroImg from "@/assets/Anuro.png";
import dracoImg from "@/assets/Draco.png";
import elfeImg from "@/assets/Elfe.png";
import gnomoImg from "@/assets/Gnomo.png";
import humaniImg from "@/assets/Humani.png";
import kishinImg from "@/assets/Kishin.png";
import sanguirImg from "@/assets/Sanguir.png";
import tatsunokoImg from "@/assets/Tatsunoko.png";
// ⚠️ Tora removido por enquanto
import toraImg from "@/assets/Tora.png";
import urodeloImg from "@/assets/Urodelo.png";
import walshieImg from "@/assets/Walshie.png";

interface Step6SummaryProps {
  onPrev: () => void;
  onReset: () => void;
}

// Mapa de legado → imagem padrão (usando os imports acima)
const LEGADO_IMAGENS: Record<string, string> = {
  anuro: anuroImg,
  draco: dracoImg,
  elfe: elfeImg,
  gnomo: gnomoImg,
  humani: humaniImg,
  kishin: kishinImg,
  sanguir: sanguirImg,
  tatsunoko: tatsunokoImg,
  tora: toraImg, 
  urodelo: urodeloImg,
  walshie: walshieImg,
};


// Normaliza chave de legado (remove acento e deixa minúsculo)
function normalizarLegadoKey(valor: string): string {
  return valor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Lista básica de proficiências para o jogador escolher
const TODAS_PROFICIENCIAS: string[] = [
  "Arcanismo",
  "Cultura",
  "Doutrinas",
  "Medicina",
  "Natureza",
  "Apresentação",
  "Intimidação",
  "Furtividade",
  "Malandragem",
  "Diplomacia",
  "Intuição",
  "Percepção",
  "Preparo Físico",
];

export default function Step6Summary({ onPrev, onReset }: Step6SummaryProps) {
  const { personagem, atualizarPersonagem } = useCharacter();
  const { data } = useSkyfalData();

  if (!data) {
    return (
      <div className="text-center text-gray-400">
        Carregando dados...
      </div>
    );
  }

  const legado = data.legados.find((l) => l.id === personagem.legado);
  const classe = data.classes.find((c) => c.id === personagem.classe);
  const maldicao = data.maldicoes.find((m) => m.id === personagem.maldicao);

  const nivel = personagem.nivel ?? 1;

  // Nome do antecedente para título e cabeçalho
  const antecedenteNome =
    (personagem as any).antecedenteNome ||
    (personagem as any).antecedente ||
    personagem.antecedente ||
    "—";

  const calcularPontosVida = () => {
    if (!classe) return 0;
    const resValor = personagem.atributos?.RES ?? 10;
    const resMod = Math.floor((resValor - 10) / 2);
    const baseHP =
      classe.id === "combatente"
        ? 12
        : classe.id === "especialista"
        ? 8
        : 6;
    return baseHP + resMod;
  };

  // Exportar usando a caixa de impressão do navegador
  const handleExportar = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  const atributosEntries = Object.entries(personagem.atributos || {});

  // Foto enviada pelo jogador (tenta vários campos possíveis vindos da etapa 1)
  const fotoUploadSrc =
    (personagem as any).fotoDataUrl ||
    (personagem as any).foto ||
    (personagem as any).retratoUrl ||
    (personagem as any).retrato ||
    (personagem as any).portrait ||
    (personagem as any).imagem ||
    undefined;

  // Descobre uma chave de legado a partir do id / nome
  const legadoKeyRaw =
    (personagem.legado as any) ||
    (legado?.id as any) ||
    (legado?.nome as any) ||
    "";

  const legadoKey =
    typeof legadoKeyRaw === "string" || typeof legadoKeyRaw === "number"
      ? normalizarLegadoKey(String(legadoKeyRaw))
      : "";

  // Imagem padrão do legado (se existir)
  const retratoPadraoLegado = legadoKey ? LEGADO_IMAGENS[legadoKey] : undefined;

  // Fallback final: foto enviada > imagem padrão do legado > nada
  const retratoSrc = fotoUploadSrc || retratoPadraoLegado;

  // Proficiências selecionadas (array de strings salvo no personagem)
  const profsSelecionadas: string[] =
    ((personagem as any).proficienciasSelecionadas as string[]) || [];

  const toggleProf = (nome: string) => {
    const atuais =
      ((personagem as any).proficienciasSelecionadas as string[]) || [];
    const jaTem = atuais.includes(nome);

    const novaLista = jaTem
      ? atuais.filter((p) => p !== nome) // se já tem, remove
      : [...atuais, nome]; // se não tem, adiciona

    atualizarPersonagem({ proficienciasSelecionadas: novaLista });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      {/* Cabeçalho da etapa */}
      <div className="text-center space-y-3 border-b border-[#c9a961]/30 pb-6">
        <div className="inline-block">
          <div className="text-[#c9a961] text-sm font-bold uppercase tracking-widest">
            Etapa 7 de 7
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">
          Ficha de Personagem — Visão Geral
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Este resumo é apenas um apoio visual à criação de personagem. Consulte
          sempre a ficha oficial e o livro de regras para conferir os detalhes.
        </p>
      </div>

      {/* "Página" da ficha */}
      <div
        id="ficha-imprimivel"
        className="rounded-xl border border-[#c9a961]/40 bg-[#0c0c12] p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.7)] space-y-6"
      >
        {/* Linha 1 — Retrato grande + bloco de identidade + info de origem */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Retrato bem maior */}
          <div className="md:col-span-4 border border-[#c9a961]/40 rounded-lg p-3 bg-black/40 flex flex-col">
            <p className="text-[10px] tracking-widest text-gray-400 uppercase">
              Retrato
            </p>
            <div className="mt-2 w-full max-h-[60vh] rounded-md overflow-hidden bg-[#151521] flex items-center justify-center">
              {retratoSrc ? (
                <img
                  src={retratoSrc}
                  alt={personagem.nome || "Retrato do personagem"}
                  className="max-h-[60vh] w-auto object-contain"
                />
              ) : (
                <span className="text-xs text-gray-500 italic px-2 text-center">
                  Nenhum retrato definido e nenhuma imagem padrão encontrada
                  para o Legado.
                </span>
              )}
            </div>
          </div>

          {/* Direita: Nome / Jogador / Legado + Melancolia / Herança / Classe / Antecedente */}
          <div className="md:col-span-8 flex flex-col gap-4">
            {/* Identidade básica */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 border border-[#c9a961]/40 rounded-lg px-3 py-2 bg-black/40">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Nome da Personagem
                </p>
                <p className="text-xl text-[#f7f4e9] font-normal">
                  {personagem.nome || "—"}
                </p>
              </div>

              <div className="md:col-span-3 border border-[#c9a961]/40 rounded-lg px-3 py-2 bg-black/40">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Jogador(a)
                </p>
                <p className="text-sm text-gray-200 font-normal">
                  {personagem.jogador || "—"}
                </p>
              </div>

              {/* Legado */}
              <div className="md:col-span-3 border border-[#c9a961]/40 rounded-lg px-3 py-2 bg-black/40">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Legado
                </p>
                <p className="text-sm text-[#f7f4e9] font-normal">
                  {legado?.nome || "—"}
                </p>
              </div>
            </div>

            {/* Linha logo abaixo: Melancolia / Herança / Classe / Antecedente */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3 border border-[#c9a961]/40 rounded-lg px-3 py-2 bg-black/40">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Melancolia
                </p>
                <p className="text-sm text-[#f7f4e9] font-normal">
                  {legado?.melancolia || "—"}
                </p>
              </div>

              <div className="md:col-span-3 border border-[#c9a961]/40 rounded-lg px-3 py-2 bg-black/40">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Herança
                </p>
                <p className="text-sm text-gray-200 font-normal">
                  {personagem.herancaNome || "—"}
                </p>
              </div>

              <div className="md:col-span-3 border border-[#c9a961]/40 rounded-lg px-3 py-2 bg-black/40">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Classe
                </p>
                <p className="text-sm text-[#f7f4e9] font-normal">
                  {classe?.nome || "—"}
                </p>
                {classe && (
                  <p className="text-[11px] text-gray-400 mt-1 font-normal">
                    Perícias iniciais: {classe.pericias_iniciais}
                  </p>
                )}
              </div>

              <div className="md:col-span-3 border border-[#c9a961]/40 rounded-lg px-3 py-2 bg-black/40">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Antecedente
                </p>
                <p className="text-sm text-[#f7f4e9] font-normal">
                  {antecedenteNome}
                </p>
              </div>
            </div>

            {/* Bloco: Proficiências selecionáveis */}
            <div className="border border-[#c9a961]/40 rounded-lg px-3 py-3 bg-black/40 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Proficiências
                </p>
                <span className="text-[11px] text-[#c9a961]">
                  {profsSelecionadas.length} selecionadas
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Marque aqui apenas as proficiências que sua personagem realmente
                possui, conferindo sempre o limite concedido pelo Legado,
                Antecedente e Classe.
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {TODAS_PROFICIENCIAS.map((nome) => {
                  const selecionada = profsSelecionadas.includes(nome);
                  return (
                    <button
                      key={nome}
                      type="button"
                      onClick={() => toggleProf(nome)}
                      className={`text-xs px-3 py-1 rounded-full border transition ${
                        selecionada
                          ? "bg-[#c9a961] text-black border-[#e0c27a]"
                          : "bg-transparent text-gray-200 border-[#c9a961]/40 hover:bg-[#c9a961]/10"
                      }`}
                    >
                      {nome}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Linha 2 — Atributos + PV + Maldição (detalhes) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Atributos */}
          <div className="md:col-span-5 border border-[#c9a961]/40 rounded-lg p-4 bg-black/50 space-y-3">
            <h2 className="text-lg font-bold text-[#c9a961] border-b border-[#c9a961]/30 pb-1">
              Atributos
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {atributosEntries.map(([key, valor]) => {
                const v = Number(valor ?? 10);
                const mod = Math.floor((v - 10) / 2);
                return (
                  <div
                    key={key}
                    className="rounded-md border border-[#c9a961]/40 bg-[#14141f] py-2 px-2 text-center"
                  >
                    <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                      {key}
                    </p>
                    <p className="text-2xl font-bold text-[#f7f4e9] leading-none">
                      {v}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {mod >= 0 ? `+${mod}` : mod}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vitalidade */}
          <div className="md:col-span-3 border border-[#c9a961]/40 rounded-lg p-4 bg-black/50 space-y-3">
            <h2 className="text-lg font-bold text-[#c9a961] border-b border-[#c9a961]/30 pb-1">
              Vitalidade
            </h2>
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-full border-4 border-[#8b5a2b] flex items-center justify-center bg-[#1a1a2e]">
                <span className="text-3xl font-extrabold text-[#f7f4e9]">
                  {calcularPontosVida()}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 text-center leading-snug">
                Pontos de Vida no 1º nível,
                <br />
                considerando {classe?.nome || "classe"} + modificador de RES.
              </p>
            </div>
          </div>

          {/* Maldição / Marca - detalhes */}
          <div className="md:col-span-4 border border-[#ff6b6b]/40 rounded-lg p-4 bg-[#2a1515]/60 space-y-3">
            <h2 className="text-lg font-bold text-[#ff6b6b] border-b border-[#ff6b6b]/40 pb-1">
              Maldição
            </h2>
            {maldicao ? (
              <>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Tipo
                </p>
                <p className="text-sm text-[#f7f4e9] font-normal">
                  {maldicao.nome}
                </p>
                <p className="text-sm text-gray-200 mt-2 font-normal">
                  {maldicao.descricao}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Nenhuma maldição selecionada — sua ficha fica um pouco menos
                trágica… por enquanto.
              </p>
            )}
          </div>
        </div>

        {/* Linha 3 — Detalhes do Antecedente */}
        <div className="border border-[#c9a961]/40 rounded-lg p-4 bg-black/50 space-y-2">
          <div className="flex items-center justify-between border-b border-[#c9a961]/30 pb-1">
            <h2 className="text-lg font-bold text-[#c9a961]">
              Antecedente — {antecedenteNome}
            </h2>
            <span className="text-[11px] text-gray-400 uppercase tracking-widest">
              Nível {nivel}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-200">
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-[#c9a961]">
                  Resumo:{" "}
                </span>
                {personagem.antecedentesResumo || "—"}
              </p>
              <p>
                <span className="font-semibold text-[#c9a961]">
                  Proficiências (do antecedente):{" "}
                </span>
                {personagem.antecedentesFocoPericias || "—"}
              </p>
              <p>
                <span className="font-semibold text-[#c9a961]">
                  Idiomas:{" "}
                </span>
                {personagem.antecedentesIdiomas || "—"}
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <span className="font-semibold text-[#c9a961]">
                  Equipamento inicial:{" "}
                </span>
                {personagem.antecedentesEquipamento || "—"}
              </p>
              <p>
                <span className="font-semibold text-[#c9a961]">
                  Evento marcante:{" "}
                </span>
                {personagem.antecedentesEventoMarcante || "—"}
              </p>
              <p>
                <span className="font-semibold text-[#c9a961]">
                  Habilidade-chave:{" "}
                </span>
                {personagem.antecedentesHabilidadeChave || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Linha 4 — Resumo / notas (se houver) */}
        {personagem.resumo && (
          <div className="border border-[#c9a961]/40 rounded-lg p-4 bg-black/40">
            <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-1">
              Resumo de Conceito / Notas da Mesa
            </p>
            <p className="text-sm text-gray-200 whitespace-pre-line font-normal">
              {personagem.resumo}
            </p>
          </div>
        )}
      </div>

      {/* Controles finais */}
      <div className="flex justify-between gap-4 pt-6 border-t border-[#c9a961]/30">
        <div className="flex gap-2">
          <Button
            onClick={onPrev}
            variant="outline"
            className="border-[#c9a961]/30 text-[#c9a961] hover:bg-[#c9a961]/10"
          >
            ← Voltar
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="border-[#c9a961]/30 text-[#c9a961] hover:bg-[#c9a961]/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Novo Personagem
          </Button>
        </div>

        <Button
          onClick={handleExportar}
          className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-8"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
      </div>
    </div>
  );
}
