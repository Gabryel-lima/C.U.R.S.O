class Cidadao {
  constructor({ id = null, nome, numero } = {}) {
    super();
    this.id = id;
    this.nome = nome;
    this.numero = numero;
  }
  
  toRow() {
    return {
      id: this.id,
      nome: this.nome.trim(),
      numero: String(this.numero).trim()
    };
  }
}

export default { Cidadao };
