/** Classe base para modelos de dados. 
 *  @author Gabriel Lima
 *  @date 2026-04-7
 *  @file BaseModel.js
 *  @description Fornece métodos utilitários para validação 
 *  de campos e conversão entre objetos e linhas de banco de dados.
 *  @param {Object} data - Dados para inicializar o modelo
 *  @function fromRow - Cria uma instância do modelo a partir de uma linha de banco de dados
 *  @function toJSON - Converte a instância do modelo para um formato JSON
 *  @function assertNonEmptyString - Valida que um campo é uma string não vazia
 *  @returns {BaseModel} Instância do modelo inicializada com os dados fornecidos
*/
class BaseModel {
  /** Cria uma instância do modelo a partir de uma linha de banco de dados.
   * @param {Object} row - Linha do banco de dados
   * @returns {BaseModel|null} Instância do modelo ou null se a linha for inválida
   */
  static fromRow(row) {
    if (!row) return null;
    return new this(row);
  }

  /** Converte a instância do modelo para um formato JSON.
   * @returns {Object} Objeto JSON representando a instância do modelo
   */
  toJSON() {
    return this.toRow();
  }

  /** Valida que um campo é uma string não vazia.
   * @param {string} value - Valor a ser validado
   * @param {string} fieldName - Nome do campo
   * @throws {Error} Se o valor não for uma string não vazia
   */
  static assertNonEmptyString(value, fieldName) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`Campo ${fieldName} é obrigatório.`);
    }
  }

  /** Valida que um campo é um identificador obrigatório.
   * @param {any} value - Valor a ser validado
   * @param {string} fieldName - Nome do campo
   * @throws {Error} Se o valor não for um identificador válido
   */
  static assertRequiredIdentifier(value, fieldName) {
    if (value === undefined || value === null || String(value).trim() === '') {
      throw new Error(`Campo ${fieldName} é obrigatório.`);
    }
  }

  /** Valida que um campo é um inteiro positivo.
   * @param {any} value - Valor a ser validado
   * @param {string} fieldName - Nome do campo
   * @throws {Error} Se o valor não for um inteiro positivo
   */
  static assertPositiveInteger(value, fieldName) {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
      throw new Error(`Campo ${fieldName} deve ser um inteiro positivo.`);
    }
  }

  /** Valida que um campo é um número não negativo.
   * @param {any} value - Valor a ser validado
   * @param {string} fieldName - Nome do campo
   * @throws {Error} Se o valor não for um número não negativo
   */
  static assertNonNegativeNumber(value, fieldName) {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue) || parsedValue < 0) {
      throw new Error(`Campo ${fieldName} deve ser um número maior ou igual a zero.`);
    }
  }

  /** Valida que um campo é uma data válida ou vazio.
   * @param {any} value - Valor a ser validado
   * @param {string} fieldName - Nome do campo
   * @throws {Error} Se o valor não for uma data válida
   */
  static assertOptionalDateTime(value, fieldName) {
    if (value === undefined || value === null || value === '') return;

    if (Number.isNaN(Date.parse(value))) {
      throw new Error(`Campo ${fieldName} deve ser uma data válida.`);
    }
  }
}

module.exports = BaseModel;
