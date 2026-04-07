const BaseModel = require('./BaseModel');

/** Representa um diagnóstico
 *  @author Gabriel Lima
 *  @file Diagnostico.js
 *  @date 2026-04-07
 *  @description Modelo de dados para um diagnóstico, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único do diagnóstico (gerado pelo banco de dados)
 *  @param {number} id_veterinario - Identificador do veterinário responsável
 *  @param {number} id_cuidador - Identificador do cuidador responsável
 *  @param {number} id_urso - Identificador do urso
 *  @param {string|Date|null} data_resgate - Data do resgate
 *  @param {string} estado_saude - Estado de saúde do urso
 *  @param {string} tratamento - Tratamento recomendado
 *  @param {string} status_atual - Status atual do diagnóstico
 *  @function validate - Valida os dados do diagnóstico, lançando erros se inválidos
 *  @function toRow - Converte a instância para um formato adequado para inserção no banco de dados
 *  @returns {Diagnostico} Instância do modelo Diagnostico
 */
class Diagnostico extends BaseModel {
  constructor({
    id = null,
    id_veterinario,
    id_cuidador,
    id_urso,
    data_resgate,
    estado_saude,
    tratamento,
    status_atual
  } = {}) {
    super();
    this.id = id;
    this.id_veterinario = id_veterinario;
    this.id_cuidador = id_cuidador;
    this.id_urso = id_urso;
    this.data_resgate = data_resgate;
    this.estado_saude = estado_saude;
    this.tratamento = tratamento;
    this.status_atual = status_atual;
  }

  /** Valida os campos do modelo Diagnostico.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertPositiveInteger(this.id_veterinario, 'id_veterinario');
    BaseModel.assertPositiveInteger(this.id_cuidador, 'id_cuidador');
    BaseModel.assertPositiveInteger(this.id_urso, 'id_urso');
    BaseModel.assertOptionalDateTime(this.data_resgate, 'data_resgate');
    BaseModel.assertNonEmptyString(this.estado_saude, 'estado_saude');
    BaseModel.assertNonEmptyString(this.tratamento, 'tratamento');
    BaseModel.assertNonEmptyString(this.status_atual, 'status_atual');
  }

  /** Converte a instância do modelo Diagnostico para uma linha de banco de dados.
   * @returns {Object} Objeto representando a linha de banco de dados
   */
  toRow() {
    return {
      id: this.id,
      id_veterinario: Number(this.id_veterinario),
      id_cuidador: Number(this.id_cuidador),
      id_urso: Number(this.id_urso),
      data_resgate: this.data_resgate || undefined,
      estado_saude: this.estado_saude.trim(),
      tratamento: this.tratamento.trim(),
      status_atual: this.status_atual.trim().toLowerCase()
    };
  }
}

module.exports = Diagnostico;
