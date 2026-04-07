const BaseModel = require('./BaseModel');

/** Representa um funcionário
 *  @author Gabriel Lima
 *  @file Funcionario.js
 *  @date 2026-04-07
 *  @description Modelo de dados para um funcionário, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único do funcionário (gerado pelo banco de dados)
 *  @param {string} nome - Nome completo do funcionário
 *  @param {string} papel - Papel do funcionário (atendente, cuidador, guia, veterinario)
 *  @param {string|number} registro - Número de registro do funcionário
 *  @function validate - Valida os dados do funcionário, lançando erros se inválidos
 *  @function toRow - Converte a instância para um formato adequado para inserção no banco de dados
 *  @returns {Funcionario} Instância do modelo Funcionario
 */
class Funcionario extends BaseModel {
  constructor({ id = null, nome, papel, registro } = {}) {
    super();
    this.id = id;
    this.nome = nome;
    this.papel = papel;
    this.registro = registro;
  }

  /** Valida os campos do modelo Funcionario.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertNonEmptyString(this.nome, 'nome');
    BaseModel.assertNonEmptyString(this.papel, 'papel');
    BaseModel.assertRequiredIdentifier(this.registro, 'registro');
  }

  /** Converte a instância do modelo Funcionario para uma linha de banco de dados.
   * @returns {Object} Objeto representando a linha de banco de dados
   */
  toRow() {
    return {
      id: this.id,
      nome: this.nome.trim(),
      papel: this.papel.trim(),
      registro: String(this.registro).trim()
    };
  }
}

module.exports = Funcionario;
