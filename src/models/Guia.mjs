/** Model `Guia` — responsável por agendar e conduzir visitas orientadas. */
import { Funcionario } from './Funcionario.mjs';

/**
 * @author Gabryel-lima
 * @date 2026-03-31
 * @file Guia.js
 * @description Modelo para guias que agendam e realizam visitas para públicos
 *              ou equipes, além de acompanhar relatórios de visitas.
 * @param {Object} props
 * @param {number|null} props.id
 * @param {string} props.nome
 * @param {string} props.papel - e.g. 'guia'
 * @param {string|null} props.registro
 * @param {string|null} props.email
 * @param {string|null} props.telefone
 */
class Guia extends Funcionario {
  constructor({ id = null, 
                nome, 
                papel = 'guia', 
                registro = null, 
                email = null, 
                telefone = null } = {}) {
    super({ id, nome, papel, registro, email, telefone });
  }

  /**
   * Agenda uma visita.
   * @param {string} local - Local da visita
   * @param {string|Date} data - Data/hora da visita
   * @param {Array<string>} participantes - Lista de participantes (opcional)
   * @returns {Object} Agendamento criado
   */
  agendarVisita(local, data, participantes = []) {
    const agendamento = {
      local,
      data,
      participantes,
      guia: this.nome,
      agendadoEm: new Date().toISOString(),
    };

    console.log('Visita agendada:', agendamento);
    return agendamento;
  }

  /**
   * Registra a realização de uma visita.
   * @param {Object} agendamento - Objeto de agendamento
   * @param {string} notas - Observações sobre a visita
   * @returns {Object} Registro da visita realizada
   */
  realizarVisita(agendamento, notas = '') {
    const registro = {
      agendamento,
      notas,
      realizadoPor: this.nome,
      realizadoEm: new Date().toISOString(),
    };

    console.log('Visita realizada:', registro);
    return registro;
  }

  /**
   * Atualiza o acompanhamento de uma visita (status, observações).
   * @param {number|string} agendamentoId
   * @param {string} status
   * @returns {Object} Objeto de acompanhamento
   */
  acompanharVisita(agendamentoId, status) {
    const acompanhamento = {
      agendamentoId,
      status,
      responsavel: this.nome,
      atualizadoEm: new Date().toISOString(),
    };

    console.log('Acompanhamento de visita:', acompanhamento);
    return acompanhamento;
  }

  /**
   * Constrói uma instância de Guia a partir de uma linha do DB.
   * @param {Object} row
   * @returns {Guia|null}
   */
  static fromRow(row) {
    if (!row) return null;
    return new Guia({
      id: row.id,
      nome: row.nome,
      papel: row.papel || 'guia',
      registro: row.registro,
      email: row.email,
      telefone: row.telefone,
    });
  }

  /**
   * Converte a instância em um objeto simples adequado para inserção no DB ou JSON
   * @returns {Object} Objeto com os campos do guia
   */
  toRow() {
    return super.toRow();
  }
}

/** Exemplo de uso:
 * const g = new Guia({ nome: 'Lucas' });
 * g.agendarVisita('Centro de Visitantes', '2026-04-05', ['Grupo A']);
 */

export { Guia };
