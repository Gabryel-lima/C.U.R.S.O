import { Basemodel } from "./BaseModel.mjs";

class Cidadao extends Basemodel {
  constructor({ id = null, nome, numero } = {}) {
    super();
    this.id = id;
    this.nome = nome;
    this.numero = numero;
  }

  validate() {
    Basemodel.assertNonEmptyString(this.nome, 'nome');
    Basemodel.assertRequiredIdentifier(this.numero, 'numero');
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
