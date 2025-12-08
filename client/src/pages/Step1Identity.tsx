// Design Philosophy: Neogótico Contemplativo
// Primeira etapa: Nome, Jogador, Foto e Resumo do Personagem
// Foto vem de upload local, salva como dataURL no personagem

import { useState } from 'react';
import { useCharacter } from '@/contexts/CharacterContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Step1IdentityProps {
  onNext: () => void;
}

export default function Step1Identity({ onNext }: Step1IdentityProps) {
  const { personagem, atualizarPersonagem } = useCharacter();

  // usa qualquer coisa que já tenha sido salva (voltar etapas, etc.)
  const [fotoPreview, setFotoPreview] = useState<string>(
    (personagem as any).fotoDataUrl || personagem.foto || ''
  );

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    atualizarPersonagem({ nome: e.target.value });
  };

  const handleJogadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    atualizarPersonagem({ jogador: e.target.value });
  };

  const handleFotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFotoPreview('');
      atualizarPersonagem({ fotoDataUrl: '', foto: '' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFotoPreview(result);
      // guardamos em um campo serializável
      atualizarPersonagem({
        fotoDataUrl: result,
        foto: result, // opcional: mantém compatível com outras partes que usam "foto"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleResumoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    atualizarPersonagem({ resumo: e.target.value });
  };

  const isComplete = (personagem.nome || '').trim().length > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-[#c9a961]/30 pb-8">
        <div className="inline-block">
          <div className="text-[#c9a961] text-sm font-serif font-bold uppercase tracking-widest">
            Etapa 1 de 7
          </div>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white">
          Escolha do Divino
        </h1>
        <p className="text-gray-300 max-w-md mx-auto">
          Toda jornada começa com um nome, um rosto e alguém por trás da ficha.
          Quem é essa figura que o destino puxou para dentro de Skyfall?
        </p>
      </div>

      {/* Formulário */}
      <div className="space-y-8">
        {/* Nome do personagem */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
              Nome do Personagem
            </span>
            <span className="text-xs text-gray-400 ml-2">*</span>
          </label>
          <Input
            type="text"
            value={personagem.nome || ''}
            onChange={handleNomeChange}
            placeholder="Digite o nome de seu personagem..."
            className="bg-[#2a2a3e] border-[#c9a961]/30 text-white placeholder:text-gray-500 focus:border-[#c9a961] focus:ring-[#c9a961]/20"
          />
          <p className="text-xs text-gray-400">
            Este nome será exibido em toda a sua ficha de personagem.
          </p>
        </div>

        {/* Nome do jogador */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
              Nome do Jogador(a)
            </span>
            <span className="text-xs text-gray-400 ml-2">(opcional)</span>
          </label>
          <Input
            type="text"
            value={personagem.jogador || ''}
            onChange={handleJogadorChange}
            placeholder="Seu nome (ou apelido na mesa)..."
            className="bg-[#2a2a3e] border-[#c9a961]/30 text-white placeholder:text-gray-500 focus:border-[#c9a961] focus:ring-[#c9a961]/20"
          />
          <p className="text-xs text-gray-400">
            Vai aparecer na ficha final, pra ninguém esquecer quem é o dono
            dessa desgraça maravilhosa.
          </p>
        </div>

        {/* Foto por upload local */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
              Retrato do Personagem
            </span>
            <span className="text-xs text-gray-400 ml-2">(opcional)</span>
          </label>

          <Input
            type="file"
            accept="image/*"
            onChange={handleFotoFileChange}
            className="bg-[#2a2a3e] border-[#c9a961]/30 text-white file:bg-[#181828] file:border-0 file:px-3 file:py-1 file:text-xs file:text-[#c9a961] file:cursor-pointer"
          />

          {fotoPreview && (
            <div className="mt-4 rounded border border-[#c9a961]/30 overflow-hidden max-w-sm mx-auto">
              <div className="w-full aspect-[3/4] bg-black flex items-center justify-center">
                <img
                  src={fotoPreview}
                  alt="Preview do personagem"
                  className="w-full h-full object-cover"
                  onError={() => {
                    setFotoPreview('');
                    atualizarPersonagem({ fotoDataUrl: '', foto: '' });
                  }}
                />
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400">
            Escolha uma imagem do seu computador. Ela será usada como retrato
            grande na ficha final. O quadro se ajusta mantendo o enquadramento
            sem distorcer a foto.
          </p>
        </div>

        {/* Resumo */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-serif font-bold text-[#c9a961] uppercase tracking-wider">
              Resumo do Personagem
            </span>
            <span className="text-xs text-gray-400 ml-2">(opcional)</span>
          </label>
          <Textarea
            value={personagem.resumo || ''}
            onChange={handleResumoChange}
            placeholder="Descreva brevemente quem é seu personagem, seus objetivos ou características marcantes..."
            className="bg-[#2a2a3e] border-[#c9a961]/30 text-white placeholder:text-gray-500 focus:border-[#c9a961] focus:ring-[#c9a961]/20 min-h-24 resize-none"
          />
          <p className="text-xs text-gray-400">
            Isso aparece no resumo final da ficha, ótimo pra dar o tom pro mestre.
          </p>
        </div>
      </div>

      {/* Botão */}
      <div className="flex justify-end pt-8 border-t border-[#c9a961]/30">
        <Button
          onClick={onNext}
          disabled={!isComplete}
          className="bg-[#c9a961] hover:bg-[#8b5a2b] text-[#0a0a0a] font-bold px-8 py-2 rounded"
        >
          Próxima Etapa →
        </Button>
      </div>
    </div>
  );
}
