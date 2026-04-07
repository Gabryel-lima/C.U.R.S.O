const BaseModel = require('./BaseModel');

/** Representa um urso
 *  @author Gabriel Lima
 *  @file Urso.js
 *  @date 2026-04-07
 *  @description Modelo de dados para um urso, 
 *  com validação e conversão para formato 
 *  de banco de dados.
 *  @param {number|null} id - Identificador único do urso (gerado pelo banco de dados)
 *  @param {string} nome - Nome do urso
 *  @param {string} especie - Espécie do urso
 *  @param {number} idade - Idade do urso
 *  @param {string} sexo - Sexo do urso
 *  @function validate - Valida os dados do urso, lançando erros se inválidos
 *  @function toRow - Converte a instância para um formato adequado para inserção no banco de dados
 *  @returns {Urso} Instância do modelo Urso
 */
class Urso extends BaseModel {
  constructor({ id = null, nome, especie, idade, sexo } = {}) {
    super();
    this.id = id;
    this.nome = nome;
    this.especie = especie;
    this.idade = idade;
    this.sexo = sexo;
  }

  /** Valida os campos do modelo Urso.
   * @throws {Error} Se algum campo for inválido
   */
  validate() {
    BaseModel.assertNonEmptyString(this.nome, 'nome');
    BaseModel.assertNonEmptyString(this.especie, 'especie');
    BaseModel.assertNonNegativeNumber(this.idade, 'idade');
    BaseModel.assertNonEmptyString(this.sexo, 'sexo');
  }

  /** Converte a instância do modelo Urso para uma linha de banco de dados.
   * @returns {Object} Objeto representando a linha de banco de dados
   */
  toRow() {
    return {
      id: this.id,
      nome: this.nome.trim(),
      especie: this.especie.trim(),
      idade: Number(this.idade),
      sexo: this.sexo.trim().toLowerCase()
    };
  }
}

module.exports = Urso;
