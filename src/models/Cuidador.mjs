/** Model `Cuidador` — responsável por alimentar, higienizar e acompanhar o bem-estar dos animais. */
import { Funcionario } from './Funcionario.mjs';

/**
 * @author Gabryel-lima
 * @date 2026-03-31
 * @file Cuidador.js
 * @description Modelo para cuidadores responsáveis por alimentar, higienizar
 *              e registar observações sobre os animais sob seus cuidados.
 * @param {Object} props
 * @param {number|null} props.id
 * @param {string} props.nome
 * @param {string} props.papel - e.g. 'cuidador'
 * @param {string|null} props.registro
 * @param {string|null} props.email
 * @param {string|null} props.telefone
 */
class Cuidador extends Funcionario {
  constructor({ id = null, 
                nome, 
                papel = 'cuidador', 
                registro = null, 
                email = null, 
                telefone = null } = {}) {
    super({ id, nome, papel, registro, email, telefone });
  }

  /**
   * Registra uma alimentação para um animal.
   * @param {number|string} animalId - Identificador do animal
   * @param {string} alimento - Tipo de alimento fornecido
   * @param {string|number|null} quantidade - Quantidade (opcional)
   * @returns {Object} Registro de alimentação
   */
  alimentar(animalId, alimento, quantidade = null) {
    const registro = {
      animalId,
      alimento,
      quantidade,
      cuidador: this.nome,
      data: new Date().toISOString(),
    };

    console.log('Alimentação registrada:', registro);
    return registro;
  }

  /**
   * Registra uma higienização para um animal.
   * @param {number|string} animalId
   * @param {string} detalhes - Detalhes do procedimento
   * @returns {Object} Registro de higienização
   */
  higienizar(animalId, detalhes = '') {
    const registro = {
      animalId,
      detalhes,
      cuidador: this.nome,
      data: new Date().toISOString(),
    };

    console.log('Higienização registrada:', registro);
    return registro;
  }

  /**
   * Registra uma observação sobre o animal (comportamento, sinais clínicos, etc.).
   * @param {number|string} animalId
   * @param {string} observacao
   * @returns {Object} Observação registrada
   */
  registrarObservacao(animalId, observacao) {
    const obs = {
      animalId,
      observacao,
      registradoPor: this.nome,
      registradoEm: new Date().toISOString(),
    };

    console.log('Observação registrada:', obs);
    return obs;
  }

  /**
   * Constrói uma instância de Cuidador a partir de uma linha do DB.
   * @param {Object} row
   * @returns {Cuidador|null}
   */
  static fromRow(row) {
    if (!row) return null;
    return new Cuidador({
      id: row.id,
      nome: row.nome,
      papel: row.papel || 'cuidador',
      registro: row.registro,
      email: row.email,
      telefone: row.telefone,
    });
  }

  /**
   * Converte a instância em um objeto simples adequado para inserção no DB ou JSON
   * @returns {Object} Objeto com os campos do cuidador
   */
  toRow() {
    return super.toRow();
  }
}

/** Exemplo de uso:
 * const c = new Cuidador({ nome: 'Pedro' });
 * c.alimentar(42, 'ração', '500g');
 */

export { Cuidador };
