Criador de Personagens Skyfall RPG

Aplicativo web interativo para criar personagens de Skyfall RPG de nível 1, com visualização em tempo real e exportação em JSON.

🎭 Funcionalidades

6 Etapas de Criação: Identidade → Legado → Classe → Maldição → Atributos → Resumo
(com suporte a Herança e Antecedente já previstos na estrutura de dados)

Visualização em Tempo Real: painel lateral que acompanha todas as mudanças

11 Legados Disponíveis: Anuro, Draco, Elfe, Gnomo, Humani, Kishin, Sanguir, Tatsunoko, Tôra, Urodelo, Walshie

3 Classes: Combatente, Especialista, Ocultista

Maldições opcionais: Aetherídeo, Górgon, Retornado, Sombrio

Distribuição de Atributos: 27 pontos para distribuir entre FOR, DEX, RES, INT, SAB, CAR

Exportação em JSON: salve seu personagem para usar em outros sistemas ou ferramentas

🎨 Design

O site segue um visual neogótico contemplativo, com:

Paleta de cores:

Negro profundo #0a0a0a

Ouro antigo #c9a961

Cinza chumbo #2a2a3e

Tipografia:

Crimson Text para títulos

Inter para textos

JetBrains Mono para campos de dados e estatísticas

Animações suaves e transições discretas, priorizando legibilidade

Layout com painel de visualização fixo e área principal para o fluxo de criação

🚀 Como usar

Acesse o site e clique em “Iniciar Criação” na página de boas-vindas.

Preencha as 6 etapas:

Etapa 1 – Identidade: nome, resumo e (opcionalmente) uma imagem do personagem

Etapa 2 – Legado e Herança: escolha o Legado e uma Herança disponível

Etapa 3 – Classe: selecione entre Combatente, Especialista ou Ocultista

Etapa 4 – Maldição (opcional): escolha uma Maldição ou prossiga sem

Etapa 5 – Atributos: distribua 27 pontos entre FOR, DEX, RES, INT, SAB, CAR

Etapa 6 – Resumo: revise todos os dados antes de salvar

Acompanhe tudo em tempo real: o painel à direita mostra o personagem sendo montado conforme você escolhe Legado, Classe, Maldição, atributos etc.

Exporte o personagem: ao final, você pode gerar um JSON com todos os dados.

📊 Estrutura de dados
Personagem
{
  "nome": "string",
  "foto": "string (URL)",
  "resumo": "string",
  "legado": "string (id)",
  "heranca": "string (id)",
  "antecedente": "string (id)",
  "classe": "string (id)",
  "maldicao": "string (id, opcional)",
  "atributos": {
    "FOR": "number",
    "DEX": "number",
    "RES": "number",
    "INT": "number",
    "SAB": "number",
    "CAR": "number"
  },
  "pontos_vida": "number",
  "pericias": ["string"],
  "bonus": {},
  "idiomas": ["string"],
  "descricao_pessoal": "string"
}

🔧 Desenvolvimento
Stack

React com TypeScript

Tailwind CSS para estilos utilitários

(Opcional) shadcn/ui para componentes de interface

Vite para build e ambiente de desenvolvimento

Arquivos principais

client/src/pages/CharacterCreator.tsx – Página principal de criação

client/src/pages/Welcome.tsx – Página de boas-vindas

client/src/contexts/CharacterContext.tsx – Contexto e estado do personagem

client/src/components/CharacterPreview.tsx – Painel de visualização em tempo real

skyfall_data.json – Base de dados com Legados, Heranças, Classes, etc.

Executar localmente
pnpm install
pnpm dev


Acesse: http://localhost:3000

(Use npm ou yarn se preferir, ajustando os comandos conforme seu gerenciador de pacotes.)

📖 Sobre Skyfall RPG

Skyfall RPG é um jogo de fantasia trágica criado pela CapyCat Games.
Este criador de personagens é um projeto não-oficial, feito apenas para auxiliar na criação de personagens de nível 1 seguindo o livro base.

Para mais informações sobre Skyfall RPG, visite:
https://www.capycat.games/

📝 Licença

Este projeto é fan-made e não-oficial.
Skyfall RPG é Copyright © 2024 CapyCat Games. Todos os direitos pertencem aos seus respectivos criadores.

🤝 Contribuições

Sugestões, issues e PRs são bem-vindos. A ideia é ir refinando a experiência de criação de personagem até que montar um herói trágico em Opath seja tão fluido quanto rolar um d20.

Criado com 🖤, dados na mesa e um pouco de desespero existencial — como todo bom jogo de Skyfall.