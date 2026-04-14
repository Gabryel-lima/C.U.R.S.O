import { Basemodel } from "./BaseModel.mjs";

class Veterinario extends Basemodel {
  constructor({ id = null, nome, registro } = {}) {
    super();
    this.id = id;
    this.nome = nome;
    this.registro = registro;
  }

  validate() {
    Basemodel.assertNonEmptyString(this.id, 'id')
    Basemodel.assertNonEmptyString(this.nome, 'nome');
    Basemodel.assertRequiredIdentifier(this.registro, 'registro');
  }

  toRow() {
    return {
      id: this.id,
      nome: this.nome.trim(),
      registro: String(this.registro).trim()
    };
  }
}

export default { Veterinário };
