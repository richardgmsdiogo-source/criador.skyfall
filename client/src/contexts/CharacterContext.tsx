// Design Philosophy: Neogótico Contemplativo
// Contexto que gerencia o estado do personagem em tempo real
// Permite que o painel de visualização acompanhe todas as mudanças

import React, { createContext, useContext, useState } from 'react';
import { Personagem, AtributosPersonagem } from '@/types/character';

interface CharacterContextType {
  personagem: Personagem;
  atualizarPersonagem: (dados: Partial<Personagem>) => void;
  atualizarAtributos: (atributos: Partial<AtributosPersonagem>) => void;
  resetarPersonagem: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

const personagemInicial: Personagem = {
  nome: '',
  foto: '',
  resumo: '',
  legado: '',
  heranca: '',
  antecedente: '',
  classe: '',
  maldicao: '',
  atributos: {
    FOR: 8,
    DEX: 8,
    RES: 8,
    INT: 8,
    SAB: 8,
    CAR: 8,
  },
  pontos_vida: 0,
  pericias: [],
  bonus: {},
  idiomas: [],
  descricao_pessoal: '',
};

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [personagem, setPersonagem] = useState<Personagem>(personagemInicial);

  const atualizarPersonagem = (dados: Partial<Personagem>) => {
    setPersonagem((prev) => ({
      ...prev,
      ...dados,
    }));
  };

  const atualizarAtributos = (atributos: Partial<AtributosPersonagem>) => {
    setPersonagem((prev) => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        ...atributos,
      },
    }));
  };

  const resetarPersonagem = () => {
    setPersonagem(personagemInicial);
  };

  return (
    <CharacterContext.Provider
      value={{
        personagem,
        atualizarPersonagem,
        atualizarAtributos,
        resetarPersonagem,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter deve ser usado dentro de CharacterProvider');
  }
  return context;
}
