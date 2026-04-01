/** Model `Atendente` — responsável por receber chamadas e encaminhar ocorrências. */
import { Funcionario } from './Funcionario.mjs';

/**
 * @author Gabryel-lima
 * @date 2026-03-31
 * @file Atendente.js
 * @description Modelo para atendentes que recebem chamadas, registram chamados
 *              e encaminham ocorrências para as equipes responsáveis.
 * @param {Object} props
 * @param {number|null} props.id
 * @param {string} props.nome
 * @param {string} props.papel - e.g. 'atendente'
 * @param {string|null} props.registro
 * @param {string|null} props.email
 * @param {string|null} props.telefone
 */
class Atendente extends Funcionario {
  constructor({ id = null, 
                nome, 
                papel = 'atendente', 
                registro = null, 
                email = null, 
                telefone = null } = {}) {
    super({ id, nome, papel, registro, email, telefone });
  }

  /**
   * Recebe uma chamada e cria um registro simples do chamado.
   * @param {string} descricao - Descrição da situação
   * @param {string} localizacao - Local onde o animal/ocorrência foi observado
   * @param {string|null} solicitante - Nome do solicitante (opcional)
   * @returns {Object} Objeto representando o chamado recebido
   */
  receberChamada(descricao, localizacao, solicitante = null) {
    const chamado = {
      descricao,
      localizacao,
      solicitante,
      atendente: this.nome,
      recebidoEm: new Date().toISOString(),
    };

    console.log('Chamada recebida:', chamado);
    return chamado;
  }

  /**
   * Encaminha uma ocorrência para a equipe responsável (p.ex. resgate).
   * @param {Object} ocorrencia - Objeto da ocorrência
   * @param {string} equipe - Nome da equipe a quem encaminhar
   * @returns {Object} Registro do encaminhamento
   */
  encaminharOcorrencia(ocorrencia, equipe = 'resgate') {
    const encaminhamento = {
      ocorrencia,
      encaminhadoPor: this.nome,
      equipe,
      encaminhadoEm: new Date().toISOString(),
    };

    console.log('Ocorrência encaminhada:', encaminhamento);
    return encaminhamento;
  }

  /**
   * Constrói uma instância de Atendente a partir de uma linha do DB.
   * @param {Object} row
   * @returns {Atendente|null}
   */
  static fromRow(row) {
    if (!row) return null;
    return new Atendente({
      id: row.id,
      nome: row.nome,
      papel: row.papel || 'atendente',
      registro: row.registro,
      email: row.email,
      telefone: row.telefone,
    });
  }

  /**
   * Converte a instância em um objeto simples adequado para inserção no DB ou JSON
   * @returns {Object} Objeto com os campos do atendente
   */
  toRow() {
    return super.toRow();
  }
}

/** Exemplo de uso:
 * const a = new Atendente({ nome: 'Maria' });
 * const chamado = a.receberChamada('Urso ferido', 'Praça Central', 'João');
 */

export { Atendente };
