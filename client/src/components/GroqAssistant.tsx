import { useState, useRef, useEffect } from 'react';
import { useCharacter } from '@/contexts/CharacterContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X, MessageSquare, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function GroqAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou seu assistente de Skyfall. Como posso ajudar na criação do seu personagem hoje?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { personagem } = useCharacter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare context about the current character
      const context = `Você é um assistente especializado no cenário de RPG Skyfall. 
      O usuário está criando um personagem. Aqui estão os dados atuais do personagem:
      Nome: ${personagem.nome || 'Não definido'}
      Jogador: ${personagem.jogador || 'Não definido'}
      Conceito: ${personagem.conceito || 'Não definido'}
      Legado: ${personagem.legado?.nome || 'Não definido'}
      Classe: ${personagem.classe?.nome || 'Não definido'}
      Maldição: ${personagem.maldicao?.nome || 'Não definido'}
      Antecedente: ${personagem.antecedente?.nome || 'Não definido'}
      Atributos: Força ${personagem.atributos.forca}, Agilidade ${personagem.atributos.agilidade}, Inteligência ${personagem.atributos.inteligencia}, Vontade ${personagem.atributos.vontade}.
      
      Responda de forma criativa e útil, mantendo o tom neogótico contemplativo de Skyfall.`;

      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: context },
            ...newMessages.filter(m => m.role !== 'system'),
          ],
        }),
      });

      if (!response.ok) throw new Error('Falha ao comunicar com a API');

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Desculpe, tive um problema ao processar sua solicitação. Verifique se a chave da API está configurada.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 h-[450px] flex flex-col shadow-2xl border-[#c9a961] bg-[#1a1a2e] text-white">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-[#2a2a3e]">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#c9a961]">
              <Bot size={18} />
              Assistente Skyfall
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-gray-400 hover:text-white">
              <X size={18} />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm ${
                        msg.role === 'user'
                          ? 'bg-[#c9a961] text-[#0a0a0a]'
                          : 'bg-[#2a2a3e] text-gray-200 border border-[#3a3a4e]'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#2a2a3e] p-3 rounded-lg">
                      <Loader2 className="h-4 w-4 animate-spin text-[#c9a961]" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-[#2a2a3e] flex gap-2">
              <Input
                placeholder="Peça uma ideia..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="bg-[#0a0a0a] border-[#2a2a3e] text-white focus-visible:ring-[#c9a961]"
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading} className="bg-[#c9a961] hover:bg-[#b08d4a] text-[#0a0a0a]">
                <Send size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-[#c9a961] hover:bg-[#b08d4a] text-[#0a0a0a]"
        >
          <MessageSquare size={24} />
        </Button>
      )}
    </div>
  );
}
