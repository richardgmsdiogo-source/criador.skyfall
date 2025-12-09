// Design Philosophy: Neogótico Contemplativo
// Página de boas-vindas com apresentação do criador de personagens

import { Button } from "@/components/ui/button";

// IMPORTANDO AS IMAGENS DO VITE (usa client/src/assets)
import heroSkyfall from "@/assets/hero-skyfall.png";
import legacyShowcase from "@/assets/legacy-showcase.png";
import classesTrio from "@/assets/classes-trio.png";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Conteúdo principal */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <img
            src={heroSkyfall}
            alt="Skyfall Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />

          <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto px-4">
            <div className="space-y-4">
              <h1 className="font-serif text-6xl font-bold text-[#c9a961]">
                SKYFALL
              </h1>
              <p className="font-serif text-2xl text-gray-300">
                Criador de Personagens
              </p>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              Uma jornada começa com uma escolha. Você foi escolhido por uma
              força maior. Crie seu personagem e prepare-se para enfrentar os
              perigos de Opath em uma fantasia trágica sem igual.
            </p>

            <Button
              onClick={onStart}
              className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-12 py-3 text-lg rounded"
            >
              Iniciar Criação →
            </Button>
          </div>
        </section>

        {/* Legados Section */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-serif text-4xl font-bold text-[#c9a961]">
                Escolha Seu Legado
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Cada legado carrega uma melancolia única, um lamento pela deusa
                Vida perdida. Escolha qual criatura você é.
              </p>
            </div>

            <div className="relative">
              <img
                src={legacyShowcase}
                alt="Legados"
                className="w-full rounded border border-[#c9a961]/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60 rounded" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {[
                "Anuro",
                "Draco",
                "Elfe",
                "Gnomo",
                "Humani",
                "Kishin",
                "Sanguir",
                "Tatsunoko",
                "Tôra",
                "Urodelo",
                "Walshie",
              ].map((legado) => (
                <div
                  key={legado}
                  className="p-3 bg-[#2a2a3e]/50 rounded border border-[#c9a961]/20 text-center text-[#c9a961]"
                >
                  {legado}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classes Section */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-serif text-4xl font-bold text-[#c9a961]">
                Escolha Seu Caminho
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Três caminhos se abrem diante de você. Cada um oferece uma forma
                única de sobreviver aos perigos de Opath.
              </p>
            </div>

            <div className="relative">
              <img
                src={classesTrio}
                alt="Classes"
                className="w-full rounded border border-[#c9a961]/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60 rounded" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  nome: "Combatente",
                  desc: "Usa atributos físicos e técnicas de combate para vencer inimigos.",
                },
                {
                  nome: "Especialista",
                  desc: "Usa conhecimentos e artimanhas para superar desafios.",
                },
                {
                  nome: "Ocultista",
                  desc: "Usuário de magia que usa poderes arcanos para sobreviver.",
                },
              ].map((classe) => (
                <div
                  key={classe.nome}
                  className="p-6 bg-[#2a2a3e]/50 rounded border border-[#c9a961]/20 space-y-3"
                >
                  <h3 className="font-serif text-xl font-bold text-[#c9a961]">
                    {classe.nome}
                  </h3>
                  <p className="text-gray-300 text-sm">{classe.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-[#0a0a0a] border-t border-[#c9a961]/30">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-serif text-4xl font-bold text-[#c9a961]">
                Como Funciona
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  numero: "1",
                  titulo: "Identidade",
                  desc: "Escolha o nome, foto e resumo de seu personagem.",
                },
                {
                  numero: "2",
                  titulo: "Legado",
                  desc: "Selecione seu legado (raça) e herança entre 11 legados diferentes.",
                },
                {
                  numero: "3",
                  titulo: "Maldição",
                  desc: "Opcionalmente, escolha uma maldição que marca seu personagem.",
                },
                {
                  numero: "4",
                  titulo: "Antecedente",
                  desc: "Defina o antecedente: a origem, o contexto social e o passado recente do seu personagem.",
                },
                {
                  numero: "5",
                  titulo: "Classe",
                  desc: "Escolha seu caminho: Combatente, Especialista ou Ocultista.",
                },
                {
                  numero: "6",
                  titulo: "Atributos",
                  desc: "Distribua 27 pontos entre os 6 atributos (FOR, DES, RES, INT, SAB, CAR).",
                },
                {
                  numero: "7",
                  titulo: "Resumo",
                  desc: "Revise seu personagem completo e exporte sua ficha em formato digital.",
                },
              ].map((step) => (
                <div key={step.numero} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#c9a961] text-[#0a0a0a] font-bold text-lg">
                      {step.numero}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#c9a961]">
                      {step.titulo}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] border-t border-[#c9a961]/30">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-4xl font-bold text-[#c9a961]">
                Pronto para Sua Jornada?
              </h2>
              <p className="text-gray-300 text-lg">
                Crie seu personagem agora e comece sua aventura em Opath.
              </p>
            </div>

            <Button
              onClick={onStart}
              className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-12 py-3 text-lg rounded"
            >
              Criar Personagem →
            </Button>
          </div>
        </section>
      </main>

      {/* Rodapé de direitos / uso não oficial */}
      <footer className="border-t border-[#c9a961]/30 bg-[#04040a]">
        <div className="max-w-6xl mx-auto px-4 py-6 text-[11px] md:text-xs text-gray-400 flex flex-col md:flex-row gap-3 md:gap-4 md:justify-between">
          <p className="md:max-w-md leading-relaxed">
            Skyfall RPG é um jogo de fantasia trágica criado pela CapyCat Games.
            Este criador de personagens é um projeto não-oficial para auxiliar na
            criação de personagens nível 1 seguindo as regras do livro base. Para
            mais informações sobre Skyfall RPG, visite:
            <span className="text-[#c9a961]">
              {" "}
              https://www.capycat.games/
            </span>
          </p>

          <p className="md:text-right leading-relaxed">
            Este criador de personagens é uma ferramenta{" "}
            <span className="italic">não oficial</span>, desenvolvida de forma
            independente por{" "}
            <span className="text-[#c9a961]">Richard Alex (@richard.gms)</span>{" "}
            para uso pessoal e em mesas de jogo. O site, seu código e layout são
            de autoria do desenvolvedor da ferramenta e não possuem vínculo
            comercial ou institucional com os detentores de Skyfall RPG.
          </p>
        </div>
      </footer>
    </div>
  );
}
