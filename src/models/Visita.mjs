/** Representa uma visita 
 *  @author ana daniel
 *  @file Visita.mjs
 *  @date 2026-03-31
 *  @description Modelo de dados para uma visita, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único da visita (gerado pelo banco de dados)
 *  @param {string} nome - Nome completo do visitante
 *  @param {string|number} numero - Número de identificação do visitante (CPF, RG, etc.)
 *  @returns {Visita} Instância do modelo Visita
*/
class Visita {
  constructor({ id = null, nome, numero } = {}) {
    this.id = id;
    this.nome = nome;
    this.numero = numero;
  }

  /** Valida os campos do modelo Visita.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertNonEmptyString(this.nome, 'nome');
    BaseModel.assertRequiredIdentifier(this.numero, 'numero');
  }

  /** Converte a instância do modelo Visita para uma linha de banco de dados.
   * @returns {Object} Objeto representando a linha de banco de dados
   */
  toRow() {
    return {
      id: this.id,
      nome: this.nome.trim(),
      numero: String(this.numero).trim()
    };
  }
}

/** Exemplo de uso:
 *  const visita = Visita.fromRow({ id: 1, nome: 'Ana', numero: '123456789' });
 *  console.log(visita.toJSON());
 */

// Exporta a classe Visita para ser utilizada em outras partes da aplicação
export default { Visita };
