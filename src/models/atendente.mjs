import { Basemodel } from "./BaseModel.mjs";

class Atendente extends Basemodel {
  constructor({ id = null, endereco, nome, numero } = {}) {
    super();
    this.id = id;
    this.endereco = endereco
    this.nome = nome;
    this.numero = numero;
  }

  validate() {
    Basemodel.assertNonEmptyString(this.endereco, 'endereco')
    Basemodel.assertNonEmptyString(this.nome, 'nome');
    Basemodel.assertRequiredIdentifier(this.numero, 'numero');
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
