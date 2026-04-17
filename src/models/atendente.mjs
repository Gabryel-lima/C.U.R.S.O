class Atendente {
  constructor({ id = null, endereco, nome, numero } = {}) {
    this.id = id;
    this.endereco = endereco
    this.nome = nome;
    this.numero = numero;
  }
  toRow() {
    return {
      id: this.id,
      endereco: this.endereco.trim(),
      nome: this.nome.trim(),
      numero: String(this.numero).trim()
    };
  }
}

export default { Atendente };
