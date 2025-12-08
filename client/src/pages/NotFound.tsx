// Design Philosophy: Neogótico Contemplativo
// Página 404 - Página não encontrada

import { Button } from "@/components/ui/button";

interface NotFoundProps {
  onHome?: () => void;
}

export default function NotFound({ onHome }: NotFoundProps) {
  const handleGoHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="font-serif text-7xl font-bold text-[#c9a961]">404</h1>
          <h2 className="font-serif text-2xl font-bold text-white">
            Caminho Perdido
          </h2>
        </div>

        <p className="text-gray-300 leading-relaxed">
          A página que você procura não existe. Talvez tenha sido perdida nas
          sombras de Opath.
        </p>

        <div className="p-4 bg-[#2a2a3e]/50 rounded border border-[#c9a961]/20">
          <p className="text-sm text-gray-400 italic">
            "Nem todos os caminhos levam aonde esperamos."
          </p>
        </div>

        <Button
          onClick={handleGoHome}
          className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-8 py-2 rounded"
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}
