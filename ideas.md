# Brainstorm de Design - Criador de Personagens Skyfall

## Contexto
Skyfall RPG é um jogo de fantasia trágica onde os personagens são criaturas escolhidas por deusas e titãs, marcadas pela melancolia. O criador de personagens deve refletir essa atmosfera sombria, contemplativa e épica, enquanto mantém a usabilidade clara para o preenchimento de múltiplas etapas.

---

## <response>

### Ideia 1: Neogótico Contemplativo
**Probabilidade: 0.08**

#### Design Movement
Neogótico digital com influências de iluminação renascentista — um cruzamento entre a melancolia das catedrais medievais e a precisão moderna de interfaces de RPG.

#### Core Principles
1. **Profundidade através da sombra**: Usar escuridão como elemento estrutural, não apenas como fundo
2. **Hierarquia clara via contraste**: Luz dourada/âmbar contra negro profundo para destacar escolhas importantes
3. **Ornamentação funcional**: Bordas decorativas e divisores que reforçam a estrutura, não apenas embelezam
4. **Ritmo narrativo**: Cada etapa é uma "cena" com transições suaves que contam a história da criação

#### Color Philosophy
- **Paleta primária**: Negro profundo (quase #0a0a0a), ouro antigo (#c9a961), cinza chumbo (#2a2a3e)
- **Acentos**: Âmbar queimado (#8b5a2b) para ações, púrpura escura (#4a1a5c) para maldições
- **Raciocínio**: O ouro representa a escolha divina; o negro representa a melancolia; o púrpura conecta ao arcano

#### Layout Paradigm
- **Estrutura assimétrica**: Painel de personagem à direita (fixo), formulário à esquerda (scrollável)
- **Divisor vertical decorativo**: Uma linha ornamentada separa os dois painéis, criando tensão visual
- **Profundidade em camadas**: Cada seção tem um "frame" com sombra interna, como páginas de um grimório

#### Signature Elements
1. **Brasões e símbolos**: Pequenos ícones heráldicos representam legados, classes e maldições
2. **Tipografia em duas camadas**: Títulos em serif elegante (Crimson Text), corpo em sans-serif moderno (JetBrains Mono para dados)
3. **Iluminação de borda**: Glow sutil em ouro ao redor de elementos selecionados

#### Interaction Philosophy
- Cliques revelam informações gradualmente (fade-in de descrições)
- Seleções são confirmadas com animações de "gravação" (como tinta secando)
- Hover effects mostram detalhes adicionais sem poluir a interface

#### Animation
- **Transições de página**: Fade + slide suave (300ms) com easing ease-in-out
- **Seleção de opções**: Pulse sutil em ouro ao selecionar
- **Visualização do personagem**: Atualiza com transição de opacidade (não instantâneo)
- **Maldições**: Efeito de "corrosão" visual ao adicionar (glitch suave + cor vermelha)

#### Typography System
- **Display**: Crimson Text Bold para títulos principais (h1, h2)
- **Heading**: Crimson Text Regular para subtítulos
- **Body**: Inter Regular para descrições e textos longos
- **Data**: JetBrains Mono para valores numéricos e atributos
- **Hierarquia**: h1 (28px), h2 (22px), body (16px), small (14px)

---

## </response>

## <response>

### Ideia 2: Minimalismo Arcano
**Probabilidade: 0.07**

#### Design Movement
Minimalismo contemporâneo com elementos de design de livros de magia modernos — limpo, respirável, mas carregado de significado simbólico.

#### Core Principles
1. **Espaço negativo como narrativa**: O vazio é tão importante quanto o preenchido
2. **Tipografia como estrutura**: Fontes grandes e ousadas criam hierarquia sem necessidade de cores
3. **Monocromia com um acento**: Preto, branco e cinza com um único destaque (azul elétrico ou verde fluorescente)
4. **Funcionalidade pura**: Cada elemento existe por uma razão; nada é decorativo

#### Color Philosophy
- **Paleta primária**: Branco puro (#ffffff), preto profundo (#0d0d0d), cinza neutro (#4a4a4a)
- **Acento único**: Azul elétrico (#00d9ff) para ações e seleções
- **Raciocínio**: O minimalismo reflete a clareza do propósito divino; o azul elétrico é a "magia" que permeia tudo

#### Layout Paradigm
- **Grid simples 2 colunas**: Formulário (60%) + Visualização (40%), ambos scrolláveis independentemente
- **Linhas horizontais como separadores**: Divisões claras entre seções sem caixas
- **Tipografia como divisor**: Títulos grandes criam espaço visual naturalmente

#### Signature Elements
1. **Ícones minimalistas em linha**: Símbolos muito simples (1-2 cores) para cada legado/classe
2. **Números grandes**: Atributos e pontos exibidos em tipografia gigante (48px+)
3. **Animações de linha**: Linhas que "desenham" ao carregar seções

#### Interaction Philosophy
- Cliques são confirmados com mudança de cor do acento
- Hover effects são sutis (mudança de peso da fonte, não cor)
- Feedback visual é minimalista (um ponto de cor, não animações complexas)

#### Animation
- **Transições**: Fade simples (200ms) sem movimento
- **Seleção**: Mudança de cor do acento com transição suave
- **Carregamento**: Linha que "desenha" da esquerda para a direita
- **Atualização de dados**: Número "flipa" com transição rápida

#### Typography System
- **Display**: Poppins Bold para títulos (h1)
- **Heading**: Poppins SemiBold para subtítulos (h2)
- **Body**: Inter Regular para descrições
- **Data**: IBM Plex Mono para valores numéricos
- **Hierarquia**: h1 (36px), h2 (24px), body (16px), small (12px)

---

## </response>

## <response>

### Ideia 3: Sombra Orgânica
**Probabilidade: 0.06**

#### Design Movement
Realismo digital com influências de arte conceitual de jogos — texturas naturais, iluminação cinematográfica, e uma sensação de profundidade tátil.

#### Core Principles
1. **Texturas como identidade**: Papel envelhecido, metal oxidado, pedra — cada elemento tem uma "materialidade"
2. **Iluminação narrativa**: Luz vem de uma fonte única, criando drama e foco
3. **Cores dessaturadas**: Tons naturais (ocre, cinza-azul, verde musgo) em vez de cores vibrantes
4. **Movimento orgânico**: Animações seguem curvas naturais, não lineares

#### Color Philosophy
- **Paleta primária**: Ocre envelhecido (#3d3d2d), cinza-azul (#4a5568), verde musgo (#5a6b4a)
- **Acentos**: Cobre oxidado (#8b6f47) para ações, sangue escuro (#6b2c2c) para maldições
- **Raciocínio**: Cores naturais refletem a conexão com a natureza de Opath; o cobre oxidado é transformação

#### Layout Paradigm
- **Assimetria natural**: Formulário em coluna esquerda (variável), painel de personagem em coluna direita (fixo com efeito parallax)
- **Molduras irregulares**: Bordas não são retas; têm uma qualidade "rasgada" ou "orgânica"
- **Camadas de profundidade**: Sombras e texturas criam sensação de múltiplos planos

#### Signature Elements
1. **Texturas de fundo**: Papel envelhecido, metal oxidado, pedra — cada seção tem uma textura diferente
2. **Ilustrações estilizadas**: Pequenas ilustrações de criaturas/símbolos em estilo de arte conceitual
3. **Efeito de tinta**: Descrições aparecem como se fossem "escritas" com tinta

#### Interaction Philosophy
- Cliques revelam conteúdo com efeito de "revelação" (como tinta se espalhando)
- Seleções são confirmadas com mudança sutil de iluminação
- Hover effects mostram detalhes com efeito de "foco de luz"

#### Animation
- **Transições**: Fade + movimento suave com easing ease-out (400ms)
- **Seleção**: Mudança de iluminação com glow sutil
- **Visualização**: Atualiza com efeito de "revelação" (como tinta se espalhando)
- **Maldições**: Efeito de "corrosão" com partículas sutis

#### Typography System
- **Display**: Playfair Display Bold para títulos (h1)
- **Heading**: Lora SemiBold para subtítulos (h2)
- **Body**: Lato Regular para descrições
- **Data**: Source Code Pro para valores numéricos
- **Hierarquia**: h1 (32px), h2 (24px), body (16px), small (13px)

---

## </response>

---

## Decisão Final

Após análise das três abordagens, **escolho a Ideia 1: Neogótico Contemplativo** como a direção visual para o Criador de Personagens Skyfall.

### Justificativa
A abordagem neogótica contemplativa melhor captura a essência de Skyfall RPG: uma fantasia trágica onde personagens são escolhidos por divindades e marcados pela melancolia. O uso de ouro contra negro profundo cria uma tensão visual que reflete a dualidade do jogo (divino vs. melancólico), enquanto a ornamentação funcional reforça a estrutura narrativa de cada etapa de criação. A hierarquia clara via contraste garante que usuários entendam facilmente o fluxo, e as animações contemplativas (fade, pulse) mantêm o ritmo narrativo sem distrair.

### Implementação
- **Paleta**: Negro (#0a0a0a), Ouro (#c9a961), Cinza Chumbo (#2a2a3e), Âmbar (#8b5a2b), Púrpura (#4a1a5c)
- **Tipografia**: Crimson Text (títulos) + Inter (corpo) + JetBrains Mono (dados)
- **Layout**: Painel de personagem fixo à direita, formulário scrollável à esquerda
- **Elementos**: Brasões heráldicos, divisor ornamentado, iluminação de borda em ouro
- **Animações**: Fade + slide (300ms), pulse em ouro, efeito de "gravação" para seleções

