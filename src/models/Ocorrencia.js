const BaseModel = require('./BaseModel');

/** Representa uma ocorrência
 *  @author Gabriel Lima
 *  @file Ocorrencia.js
 *  @date 2026-04-07
 *  @description Modelo de dados para uma ocorrência, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único da ocorrência (gerado pelo banco de dados)
 *  @param {number} id_atendente - Identificador do atendente responsável
 *  @param {string|Date|null} data_resgate - Data do resgate
 *  @param {string} informacao - Informações adicionais sobre a ocorrência
 *  @function validate - Valida os dados da ocorrência, lançando erros se inválidos
 *  @function toRow - Converte a instância para um formato adequado para inserção no banco de dados
 *  @returns {Ocorrencia} Instância do modelo Ocorrencia
 */
class Ocorrencia extends BaseModel {
  constructor({ id = null, id_atendente, data_resgate, informacao } = {}) {
    super();
    this.id = id;
    this.id_atendente = id_atendente;
    this.data_resgate = data_resgate;
    this.informacao = informacao;
  }

  /** Valida os campos do modelo Ocorrencia.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertPositiveInteger(this.id_atendente, 'id_atendente');
    BaseModel.assertOptionalDateTime(this.data_resgate, 'data_resgate');
    BaseModel.assertNonEmptyString(this.informacao, 'informacao');
  }

  /** Converte a instância do modelo Ocorrencia para uma linha de banco de dados.
   * @returns {Object} Objeto representando a linha de banco de dados
   */
  toRow() {
    return {
      id: this.id,
      id_atendente: Number(this.id_atendente),
      data_resgate: this.data_resgate || undefined,
      informacao: this.informacao.trim()
    };
  }
}

module.exports = Ocorrencia;
