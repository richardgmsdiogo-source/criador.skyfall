// Design Philosophy: Neogótico Contemplativo
// Etapa 2: Escolha de Antecedente (só mecânica)
// Foca em nome + bônus (proficiências, idiomas, equipamento, evento, habilidade)

import { useCharacter } from '@/contexts/CharacterContext';
import { Button } from '@/components/ui/button';

// ================ TIPOS E CONFIG ================

type AntecedenteId =
  | 'agente_organizacao'
  | 'agouro'
  | 'aristocrata'
  | 'artista'
  | 'assistente_magitec'
  | 'cacador'
  | 'comerciante'
  | 'contrabandista'
  | 'cosmopolita'
  | 'detetive'
  | 'devedor'
  | 'erudito'
  | 'estudioso_feerico'
  | 'heroi_do_povo'
  | 'juramentado'
  | 'militar'
  | 'navegante'
  | 'procurado'
  | 'proletario'
  | 'viajante_intrepido';

interface AntecedenteConfig {
  id: AntecedenteId;
  nome: string;
  resumo: string;
  proficiencias: string;
  idiomas: string;
  equipamento: string;
  eventoMarcante: string;
  habilidadeChave: string;
}

const ANTECEDENTES: AntecedenteConfig[] = [
  {
    id: 'agente_organizacao',
    nome: 'Agente de Organização',
    resumo:
      'Ex-agente de um grupo poderoso, ainda caçado ou vigiado por ele.',
    proficiencias: 'Proficiências: Apresentação ou Intimidação.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: item de até T$ 30 com o símbolo da organização; 1 contato influente; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando sua ligação com a organização te coloca em risco ou você oculta sua identidade, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Máscaras / Esconder-se na Multidão: testes para descobrir sua identidade têm desvantagem; em multidões, pode ficar Invisível.',
  },
  {
    id: 'agouro',
    nome: 'Agouro',
    resumo:
      'Marcado por um ritual macabro; seu corpo carrega sigilos malignos.',
    proficiencias: 'Proficiências: Arcanismo ou Doutrinas.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: materiais ritualísticos (magias de CONTROLE) e 1 poção de cura; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando as marcas causam problemas ou você descobre algo novo sobre elas, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Marcas Terríveis (1 PE): resistência contra efeitos NECRÓTICOS ou ataques contra SAB até o fim do próximo turno.',
  },
  {
    id: 'aristocrata',
    nome: 'Aristocrata',
    resumo:
      'Nobre de alta sociedade, acostumado a etiqueta, privilégios e intrigas.',
    proficiencias: 'Proficiências: Cultura ou Diplomacia.',
    idiomas: 'Idiomas: Comum e mais 3 idiomas à escolha.',
    equipamento:
      'Equipamento: carta de linhagem, roupas finas, presente de até T$ 30; T$ 3d10+30.',
    eventoMarcante:
      'Evento: quando seguir etiqueta nobre te ajuda muito ou te coloca em perigo, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Etiquetudo: melhora atitude de aliados da aristocracia, piora a de inimigos ou nobres rivais.',
  },
  {
    id: 'artista',
    nome: 'Artista',
    resumo:
      'Vive de arte e performance: palco, pintura, música, qualquer expressão.',
    proficiencias: 'Proficiências: Apresentação ou uma Aptidão à escolha.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: ferramentas de arte (até T$ 20), uma obra/lembrança, roupas ou fantasia; T$ 3d6.',
    eventoMarcante:
      'Evento: quando sua arte te coloca em perigo ou emociona alguém profundamente, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Animar a Plateia: gasta 1 ênfase para Encantar uma multidão enquanto performa (teste CD 10+).',
  },
  {
    id: 'assistente_magitec',
    nome: 'Assistente Magitec',
    resumo:
      'Trabalhou com tecnologia magitec, projetos e engenhocas perigosas.',
    proficiencias: 'Proficiências: Arcanismo ou Magitec.',
    idiomas: 'Idiomas: Comum e Vampyr.',
    equipamento:
      'Equipamento: kit de magitec, frasco alquímico desconhecido, projeto magitec incompleto; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando uma engenhoca resolve grande problema ou quase explode tudo, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Engenhoqueiro: começa com engenhoca de até T$ 50 e pode trocá-la a cada nível em descanso longo na cidade.',
  },
  {
    id: 'cacador',
    nome: 'Caçador',
    resumo:
      'Criado nos ermos, acostumado a rastrear, caçar e sobreviver na natureza.',
    proficiencias: 'Proficiências: Furtividade ou Natureza.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: roupas de viagem, armadilha de caça, corrente de 3 m, arma simples; T$ 3d6.',
    eventoMarcante:
      'Evento: quando caça uma presa à altura ou vira a presa, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Dia de Caçador: pode usar Caça e Coleta como ação livre 1x/rodada em Exploração; resistência a fome/falta de recursos/fadiga.',
  },
  {
    id: 'comerciante',
    nome: 'Comerciante',
    resumo:
      'Negociante experiente, entende fluxo de bens, pessoas e fofoca.',
    proficiencias: 'Proficiências: Diplomacia ou Manipulação.',
    idiomas: 'Idiomas: Comum e mais 2 idiomas à escolha.',
    equipamento:
      'Equipamento: itens para venda (arma, armadura/escudo, etc. até T$ 20), baú trancado com tesouro de até T$ 80; T$ 3d6+30.',
    eventoMarcante:
      'Evento: quando uma negociação vira o jogo a favor do grupo, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Oferta Relâmpago: gasta 1 catarse para reduzir em –1 o custo de ênfase de todas as suas habilidades até o fim do turno (mín. 1).',
  },
  {
    id: 'contrabandista',
    nome: 'Contrabandista',
    resumo:
      'Moveu mercadorias proibidas em rotas que ninguém deveria conhecer.',
    proficiencias: 'Proficiências: Aptidão (qualquer) ou Malandragem.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: engenhoca contrabandeada (até T$ 150, com defeito), arma simples de até T$ 20; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando faz coisas/pessoas passarem por onde não deviam, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Crime que Compensa: em becos sombrios, vende pelo preço cheio e compra armas/armaduras/escudos com 25% de desconto (QUEBRADIÇO).',
  },
  {
    id: 'cosmopolita',
    nome: 'Cosmopolita',
    resumo:
      'Filho da metrópole, cheio de contatos, atalhos e festas.',
    proficiencias: 'Proficiências: Diplomacia ou Intuição.',
    idiomas: 'Idiomas: Comum e mais 3 idiomas à escolha.',
    equipamento:
      'Equipamento: convite para festa exclusiva, anel com insígnia importante, roupas chiques; T$ 3d6+90.',
    eventoMarcante:
      'Evento: quando contatos urbanos ajudam ou complicam o grupo, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Popularidade: em Interação Social, o primeiro sucesso já melhora atitude de uma das criaturas na cena.',
  },
  {
    id: 'detetive',
    nome: 'Detetive',
    resumo:
      'Investigador de casos sujos, seja como polícia, agência ou freelancer.',
    proficiencias: 'Proficiências: Intuição ou Percepção.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: arquivos de casos, identificação oficial, roupas discretas, Lampadinha quebrada; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando descobre algo novo sobre o caso não resolvido ou isso te coloca em risco, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Investigação Precisa: 1x/rodada pode ter vantagem em teste de INT/SAB/CAR ligado a investigar/achar info.',
  },
  {
    id: 'devedor',
    nome: 'Devedor',
    resumo:
      'Você deve uma quantia absurda de dinheiro ou favores, e cobram isso.',
    proficiencias: 'Proficiências: Furtividade ou Malandragem.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: T$ 10d6+30 iniciais; esse valor ×10 é o tamanho da dívida.',
    eventoMarcante:
      'Evento: quando a dívida te coloca em perigo, é paga ou aumenta, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Quem Deve, Teme: qualquer resultado 9 ou menor na iniciativa conta como 10.',
  },
  {
    id: 'erudito',
    nome: 'Erudito',
    resumo:
      'Acadêmico dedicado a história, geografia, biologia ou área semelhante.',
    proficiencias:
      'Proficiências: escolha 2 entre Arcanismo, Cultura, Doutrinas, Medicina ou Natureza.',
    idiomas: 'Idiomas: Comum e mais 3 idiomas à escolha.',
    equipamento:
      'Equipamento: mochila para livros, compêndio de estudos, lanterna (5 cenas); T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando aprende algo novo sobre seu foco de estudo e isso importa ou te coloca em risco, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Eureka: pode gastar 1 ênfase para ter vantagem em testes de INT/SAB ligados a conhecimento/pesquisa.',
  },
  {
    id: 'estudioso_feerico',
    nome: 'Estudioso Feérico',
    resumo:
      'Especialista em criaturas e magias feéricas.',
    proficiencias: 'Proficiências: Arcanismo ou Natureza.',
    idiomas: 'Idiomas: Comum, Élfico e Feérico.',
    equipamento:
      'Equipamento: asas de fada guerreira e componentes de magias UTILITÁRIAS; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando o estudo de fadas causa problemas ou revela algo novo, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Reconhecer Encantos: proficiência em Proteção de SAB ou INT contra encantos.',
  },
  {
    id: 'heroi_do_povo',
    nome: 'Herói do Povo',
    resumo:
      'Famoso por um ato heroico; as pessoas te veem como salvador.',
    proficiencias:
      'Proficiências: 1 perícia à escolha ligada ao ato heroico.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: presente do povo (carta, troféu etc.), 1 equipamento com Sigilo de 1º grau (última carga); T$ 2d6.',
    eventoMarcante:
      'Evento: quando salva alguém ou se sacrifica por uma causa heroica, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Chamado Heroico: ao usar catarse em ação heroica, ganha PV temporários iguais ao dado de catarse (1x/cena).',
  },
  {
    id: 'juramentado',
    nome: 'Juramentado',
    resumo:
      'Vive em função de um juramento sagrado a alguém, causa ou instituição.',
    proficiencias: 'Proficiências: Percepção ou Medicina.',
    idiomas: 'Idiomas: Comum e mais 2 idiomas à escolha.',
    equipamento:
      'Equipamento: escudo leve ou pesado, kit de curandeiro, símbolo do juramento; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando se coloca em risco para cumprir seu juramento, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Honrar Promessa: proficiente com todos os escudos e 1 Proteção da classe; perde se quebrar o juramento, recupera só ao fim de um Arco.',
  },
  {
    id: 'militar',
    nome: 'Militar',
    resumo:
      'Veterano de milícia ou exército, com cicatrizes físicas e mentais.',
    proficiencias: 'Proficiências: Medicina ou Preparo Físico.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: arma simples ou marcial, kit de primeiros socorros, insígnia militar importante; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando o passado bélico complica sua vida ou sua tática salva o grupo, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Veterano de Campo: melhor iniciativa e leitura tática no início do combate.',
  },
  {
    id: 'navegante',
    nome: 'Navegante',
    resumo:
      'Condutor de veículos terrestres, aquáticos ou aéreos, sempre em jornada.',
    proficiencias:
      'Proficiências: Aptidão (Navegação de um tipo de veículo) ou Cultura.',
    idiomas: 'Idiomas: Comum e mais 2 idiomas à escolha.',
    equipamento:
      'Equipamento: veículo pequeno quebrado guardado em local seguro, arma simples (até T$ 20), lanterna; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando seu conhecimento de rotas e jornadas faz diferença, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Carteira Opathiana de Habilitação: gasta 1 ênfase para ganhar proficiência (ou expertise) em pilotar o veículo até o fim da cena.',
  },
  {
    id: 'procurado',
    nome: 'Procurado',
    resumo:
      'Seu rosto está em cartazes de “procura-se”; você vive fugindo.',
    proficiencias: 'Proficiências: Furtividade ou Malandragem.',
    idiomas: 'Idiomas: Comum e mais 2 idiomas à escolha.',
    equipamento:
      'Equipamento: item de até T$ 20 ligado ao crime/acusação; T$ 3d6+10.',
    eventoMarcante:
      'Evento: quando é reconhecido ou se arrisca para não ser descoberto, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Sempre em Fuga: pode gastar 1 ênfase no começo do turno para ganhar +3 m de deslocamento até o fim do turno.',
  },
  {
    id: 'proletario',
    nome: 'Proletário',
    resumo:
      'Trabalhador de chão de fábrica, fazenda ou porto, acostumado a ralar.',
    proficiencias: 'Proficiências: Preparo Físico ou uma Aptidão à escolha.',
    idiomas: 'Idiomas: Comum e mais 1 idioma à escolha.',
    equipamento:
      'Equipamento: ferramentas de trabalho (até T$ 20), arma simples/marcial ligada ao ofício, objeto querido do esforço; T$ 6d6+10.',
    eventoMarcante:
      'Evento: quando o conhecimento do ofício salva o dia, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Descanso Merecido: em Descanso, aliados rolam dados de vida duas vezes (usa o melhor) e recuperam +1 ênfase por dado.',
  },
  {
    id: 'viajante_intrepido',
    nome: 'Viajante Intrépido',
    resumo:
      'Explorador que vive buscando terras e caminhos desconhecidos.',
    proficiencias: 'Proficiências: Natureza ou Percepção.',
    idiomas: 'Idiomas: Comum, Bo e mais 2 idiomas à escolha.',
    equipamento:
      'Equipamento: roupas de viajante de uma região visitada, 5d6+30 T$ em equipamentos de exploração.',
    eventoMarcante:
      'Evento: quando aprende algo novo sobre um lugar inédito, ganha 1 ponto de catarse.',
    habilidadeChave:
      'Pé na Estrada: em Exploração, pode usar Suporte como ação livre 1x/rodada e reduz em 1 passo as consequências de viagens longas.',
  },
];

// ================ COMPONENTE ================

interface StepAntecedentProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function StepAntecedent({ onNext, onPrev }: StepAntecedentProps) {
  const { personagem, atualizarPersonagem } = useCharacter();

  const selecionado = ANTECEDENTES.find(
    (a) => a.id === personagem.antecedenteId
  );

  const handleSelectAntecedente = (cfg: AntecedenteConfig) => {
    atualizarPersonagem({
      antecedenteId: cfg.id,
      antecedente: cfg.nome,
      antecedentesResumo: cfg.resumo,
      antecedentesFocoPericias: cfg.proficiencias,
      antecedentesIdiomas: cfg.idiomas,
      antecedentesEquipamento: cfg.equipamento,
      antecedentesEventoMarcante: cfg.eventoMarcante,
      antecedentesHabilidadeChave: cfg.habilidadeChave,
    });
  };

  const isComplete = !!selecionado;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Cabeçalho */}
      <div className="text-center space-y-3 border-b border-[#c9a961]/30 pb-6">
        <div className="inline-block">
          <div className="text-[#c9a961] text-sm font-serif font-bold uppercase tracking-widest">
            Etapa 2 de 7
          </div>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white">
          Antecedente — Quem você era?
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Escolha um único antecedente oficial de Skyfall. Aqui você define os
          bônus de proficiências, idiomas, equipamento inicial e habilidade
          especial de origem.
        </p>
      </div>

      {/* Lista de antecedentes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
            Lista de antecedentes
          </span>
          {selecionado && (
            <span className="text-[11px] text-[#c9a961]">
              Selecionado: {selecionado.nome}
            </span>
          )}
        </div>

        <div className="max-h-[460px] overflow-y-auto pr-1 space-y-2">
          {ANTECEDENTES.map((cfg) => {
            const isSelected = selecionado?.id === cfg.id;
            return (
              <button
                key={cfg.id}
                type="button"
                onClick={() => handleSelectAntecedente(cfg)}
                className={`w-full text-left rounded-lg border px-3 py-3 transition-colors ${
                  isSelected
                    ? 'bg-[#c9a961]/20 border-[#c9a961] text-[#f7f4e9]'
                    : 'bg-black/40 border-[#c9a961]/30 text-gray-200 hover:bg-black/70'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif font-semibold text-sm">
                      {cfg.nome}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{cfg.resumo}</p>
                  <p className="text-[11px] text-[#c9a961] mt-1">
                    {cfg.proficiencias}
                  </p>
                  <p className="text-[11px] text-gray-300">
                    {cfg.idiomas}
                  </p>
                  <p className="text-[11px] text-gray-300">
                    {cfg.equipamento}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {cfg.eventoMarcante}
                  </p>
                  <p className="text-[11px] text-gray-300 italic">
                    {cfg.habilidadeChave}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-gray-400">
          Os detalhes numéricos (dados de T$, CDs exatas etc.) seguem o livro de
          Skyfall. Aqui você tem um resumo rápido para a ficha.
        </p>
      </div>

      {/* Navegação */}
      <div className="flex justify-between pt-4 border-t border-[#c9a961]/30">
        <Button
          type="button"
          variant="ghost"
          className="text-gray-300 hover:text-white"
          onClick={onPrev}
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
