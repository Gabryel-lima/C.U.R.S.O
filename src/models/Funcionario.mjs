/** Model base `Funcionario` — base para outros tipos de funcionários. */
class Funcionario {
  /**
   * @author Gabryel-lima
   * @date 2026-04-31
   * @file Funcionario.js
   * @description Modelo base para funcionários do centro de preservação dos ursos, como atendentes, cuidadores, veterinários e guias.
   *              Contém campos comuns e métodos de validação e conversão.
   * @param {Object} props
   * @param {number|null} props.id
   * @param {string} props.nome
   * @param {string} props.papel - e.g. 'atendente', 'cuidador', 'veterinario', 'guia'
   * @param {string|null} props.registro
   * @param {string|null} props.email
   * @param {string|null} props.telefone
   */
  constructor({ id = null, nome, papel = 'funcionario', registro = null, email = null, telefone = null } = {}) {
    this.id = id;
    this.nome = nome;
    this.papel = papel;
    this.registro = registro;
    this.email = email;
    this.telefone = telefone;
  }

  /** Valida os campos do funcionário 
   * Lança erro se algum campo obrigatório for inválido.
   * @param {Funcionario} this
   * @throws {Error} Se nome ou papel forem inválidos.
   * @returns {void} void
  */
  validate() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      throw new Error('Nome inválido para Funcionario');
    }
    if (!this.papel || typeof this.papel !== 'string') {
      throw new Error('Papel inválido para Funcionario');
    }
  }

  /** Converte uma linha do banco de dados em uma instância de Funcionario 
   * @param {Object} row - Objeto representando uma linha do banco de dados, com campos correspondentes.
   * @returns {Funcionario|null} Instância de Funcionario ou null se a linha for inválida.
  */
  static fromRow(row) {
    if (!row) return null;
    return new Funcionario({
      id: row.id,
      nome: row.nome,
      papel: row.papel || row.role,
      registro: row.registro,
      email: row.email,
      telefone: row.telefone
    });
  }

  /** Converte a instância em um objeto simples adequado para inserção no DB ou JSON
   * @returns {Object} Objeto com os campos do funcionário
   */
  toRow() {
    return {
      id: this.id,
      nome: this.nome,
      papel: this.papel,
      registro: this.registro,
      email: this.email,
      telefone: this.telefone
    };
  }

  /** Sobrescreve o método toJSON para garantir que a conversão para JSON use os campos corretos
   * @returns {Object} Objeto com os campos do funcionário
   */
  toJSON() {
    return this.toRow();
  }
}

/** Exemplo de uso:
const funcionario = new Funcionario({ nome: 'João Silva', papel: 'atendente', email: 'joao@exemplo.com' });
funcionario.validate();
console.log(funcionario.toJSON());
*/
export { Funcionario };
