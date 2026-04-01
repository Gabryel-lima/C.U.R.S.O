/** Model `Veterinario` — realiza exames, diagnósticos e tratamentos dos animais. */
import { Funcionario } from './Funcionario.mjs';

/**
 * @author Gabryel-lima
 * @date 2026-03-31
 * @file Veterinario.js
 * @description Modelo para veterinários que realizam exames, registram
 *              procedimentos e prescrevem tratamentos para os animais.
 * @param {Object} props
 * @param {number|null} props.id
 * @param {string} props.nome
 * @param {string} props.papel - e.g. 'veterinario'
 * @param {string|null} props.registro
 * @param {string|null} props.email
 * @param {string|null} props.telefone
 */
class Veterinario extends Funcionario {
  constructor({ id = null, 
                nome, 
                papel = 'veterinario', 
                registro = null, 
                email = null, 
                telefone = null } = {}) {
    super({ id, nome, papel, registro, email, telefone });
  }

  /**
   * Registra a realização de um exame.
   * @param {number|string} animalId
   * @param {string} tipoExame
   * @param {Object|null} resultado
   * @returns {Object} Registro do exame
   */
  realizarExame(animalId, tipoExame, resultado = null) {
    const exame = {
      animalId,
      tipoExame,
      resultado,
      veterinario: this.nome,
      data: new Date().toISOString(),
    };

    console.log('Exame realizado:', exame);
    return exame;
  }

  /**
   * Prescreve um tratamento para um animal.
   * @param {number|string} animalId
   * @param {string} descricao - Descrição do tratamento/receita
   * @param {number|null} duracaoDias - Duração estimada em dias
   * @returns {Object} Objeto representando o tratamento prescrito
   */
  prescreverTratamento(animalId, descricao, duracaoDias = null) {
    const tratamento = {
      animalId,
      descricao,
      duracaoDias,
      veterinario: this.nome,
      prescritoEm: new Date().toISOString(),
    };

    console.log('Tratamento prescrito:', tratamento);
    return tratamento;
  }

  /**
   * Registra um procedimento (cirúrgico, curativo, etc.).
   * @param {number|string} animalId
   * @param {string} procedimento
   * @param {string} notas
   * @returns {Object} Registro do procedimento
   */
  registrarProcedimento(animalId, procedimento, notas = '') {
    const registro = {
      animalId,
      procedimento,
      notas,
      veterinario: this.nome,
      data: new Date().toISOString(),
    };

    console.log('Procedimento registrado:', registro);
    return registro;
  }

  /**
   * Constrói uma instância de Veterinario a partir de uma linha do DB.
   * @param {Object} row
   * @returns {Veterinario|null}
   */
  static fromRow(row) {
    if (!row) return null;
    return new Veterinario({
      id: row.id,
      nome: row.nome,
      papel: row.papel || 'veterinario',
      registro: row.registro,
      email: row.email,
      telefone: row.telefone,
    });
  }

  /**
   * Converte a instância em um objeto simples adequado para inserção no DB ou JSON
   * @returns {Object} Objeto com os campos do veterinario
   */
  toRow() {
    return super.toRow();
  }
}

/** Exemplo de uso:
 * const vet = new Veterinario({ nome: 'Dr. Ana' });
 * vet.realizarExame(42, 'ultrassom', { observacoes: 'lesão superficial' });
 */

export { Veterinario };
