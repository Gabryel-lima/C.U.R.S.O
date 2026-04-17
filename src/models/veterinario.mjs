class Veterinario {
  constructor({ id = null, nome, registro } = {}) {
    this.id = id;
    this.nome = nome;
    this.registro = registro;
  }

  toRow() {
    return {
      id: this.id,
      nome: this.nome.trim(),
      registro: String(this.registro).trim()
    };
  }
}

export default { Veterinario };
