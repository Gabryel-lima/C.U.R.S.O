const BaseModel = require('./BaseModel');

/** Representa um profissional
 *  @author Gabriel Lima
 *  @file Profissional.js
 *  @date 2026-04-07
 *  @description Modelo de dados para um profissional, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único do profissional (gerado pelo banco de dados)
 *  @param {string} nome - Nome completo do profissional
 *  @param {string|number} registro - Número de registro do profissional
 *  @function validate - Valida os dados do profissional, lançando erros se inválidos
 *  @function toRow - Converte a instância para um formato adequado para inserção no banco de dados
 *  @returns {Profissional} Instância do modelo Profissional
 */
class Profissional extends BaseModel {
  constructor({ id = null, nome, registro } = {}) {
    super();
    this.id = id;
    this.nome = nome;
    this.registro = registro;
  }

  /** Valida os campos do modelo Profissional.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertNonEmptyString(this.nome, 'nome');
    BaseModel.assertRequiredIdentifier(this.registro, 'registro');
  }

  /** Converte a instância do modelo Profissional para uma linha de banco de dados.
   * @returns {Object} Objeto representando a linha de banco de dados
   */
  toRow() {
    return {
      id: this.id,
      nome: this.nome.trim(),
      registro: String(this.registro).trim()
    };
  }
}

module.exports = Profissional;
