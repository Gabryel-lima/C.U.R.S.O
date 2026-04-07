const BaseModel = require('./BaseModel');

/** Representa uma emergência
 *  @author Gabriel Lima
 *  @file Emergencia.js
 *  @date 2026-04-07
 *  @description Modelo de dados para uma emergência, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único da emergência (gerado pelo banco de dados)
 *  @param {number} id_cidadao - Identificador do cidadão responsável
 *  @param {string} localizacao - Localização da emergência
 *  @param {string} informacao - Informações adicionais sobre a emergência
 *  @function validate - Valida os dados da emergência, lançando erros se inválidos
 *  @function toRow - Converte a instância para um formato adequado para inserção no banco de dados
 *  @returns {Emergencia} Instância do modelo Emergencia
 */
class Emergencia extends BaseModel {
  constructor({ id = null, id_cidadao, localizacao, informacao } = {}) {
    super();
    this.id = id;
    this.id_cidadao = id_cidadao;
    this.localizacao = localizacao;
    this.informacao = informacao;
  }

  /** Valida os campos do modelo Emergencia.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertPositiveInteger(this.id_cidadao, 'id_cidadao');
    BaseModel.assertNonEmptyString(this.localizacao, 'localizacao');
    BaseModel.assertNonEmptyString(this.informacao, 'informacao');
  }

  /** Converte a instância do modelo Emergencia para uma linha de banco de dados.
   * @returns {Object} Objeto representando a linha de banco de dados
   */
  toRow() {
    return {
      id: this.id,
      id_cidadao: Number(this.id_cidadao),
      localizacao: this.localizacao.trim(),
      informacao: this.informacao.trim()
    };
  }
}

module.exports = Emergencia;
