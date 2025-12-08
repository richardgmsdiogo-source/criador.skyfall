// Design Philosophy: Neogótico Contemplativo
// Este arquivo define os tipos de dados para a criação de personagens
// Reflete a estrutura do Skyfall RPG com melancolia e escolhas divinas

export interface Atributo {
  id: string;
  nome: string;
  abreviacao: string;
  descricao: string;
}

export interface Heranca {
  id: string;
  nome: string;
  descricao: string;
  tamanho: string;
  caracteristicas: string[];
}

export interface Legado {
  id: string;
  nome: string;
  descricao: string;
  deusa: string;
  melancolia: string;
  deslocamento: number;
  heranças: Heranca[];
}

export interface Maldicao {
  id: string;
  nome: string;
  descricao: string;
  efeitos: string[];
}

export interface Classe {
  id: string;
  nome: string;
  descricao: string;
  atributos_primarios: string[];
  pericias_iniciais: number;
}

export interface Antecedente {
  id: string;
  nome: string;
  descricao: string;
  pericias: string[];
  bonus: Record<string, number>;
}

export interface AtributosPersonagem {
  FOR: number;
  DEX: number;
  RES: number;
  INT: number;
  SAB: number;
  CAR: number;
}

export interface Personagem {
  // Informações Básicas
  nome: string;
  foto?: string;
  resumo: string;

  // Escolhas de Criação
  legado: string;
  heranca?: string;
  antecedente: string;
  classe: string;
  maldicao?: string;

  // Atributos
  atributos: AtributosPersonagem;
  pontos_vida: number;

  // Pericias e Bonus
  pericias: string[];
  bonus: Record<string, number>;

  // Outros
  idiomas: string[];
  descricao_pessoal: string;
}

export interface SkyfalDataSet {
  legados: Legado[];
  maldicoes: Maldicao[];
  classes: Classe[];
  atributos: Atributo[];
}
