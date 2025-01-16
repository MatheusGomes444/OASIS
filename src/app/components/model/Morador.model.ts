export interface Morador {
  id: number;
  Nome: string;
  CPF: string;
  RG: string;
  Telefone: number;
  Endereco: string;
  alojamentoNome: string;
  Sexo: string;
  Idade: number;
  Nacionalidade: string;
  Observacoes: string;
  AlojamentoId: number; // Campo obrigatório no back-end
}
