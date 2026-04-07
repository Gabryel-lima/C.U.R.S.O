const BaseModel = require('./BaseModel');

/** Representa um cidadão 
 *  @author ana daniel
 *  @file Cidadao.js
 *  @date 2026-03-31
 *  @description Modelo de dados para um cidadão, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único do cidadão (gerado pelo banco de dados)
 *  @param {string} nome - Nome completo do cidadão
 *  @param {string|number} numero - Número de identificação do cidadão (CPF, RG, etc.)
 *  @returns {Cidadao} Instância do modelo Cidadao
*/
class Cidadao extends BaseModel {
  constructor({ id = null, nome, numero } = {}) {
    super();
    this.id = id;
    this.nome = nome;
    this.numero = numero;
  }

  /** Valida os campos do modelo Cidadao.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertNonEmptyString(this.nome, 'nome');
    BaseModel.assertRequiredIdentifier(this.numero, 'numero');
  }

  /** Converte a instância do modelo Cidadao para uma linha de banco de dados.
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

module.exports = Cidadao;
