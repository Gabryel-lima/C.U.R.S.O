/** Model base `Cidadao` — representa um cidadão que pode solicitar resgates. */
/** 
 * @author ana daniel
 * @date 2026-04-31
 * @file Cidadao.js
 * @description Modelo para cidadãos que podem solicitar resgates de animais. Contém campos básicos e um método para solicitar resgate.
 * @param {string} nome - Nome do cidadão
 * @param {string} cpf - CPF do cidadão
 * @param {string} telefone - Telefone de contato
 * @param {string} email - Email de contato
 * @param {string} endereco - Endereço residencial
*/
class Cidadao {
    constructor({nome, cpf, telefone, email, endereco} = {}) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
    }

    /** Método para solicitar resgate de um animal
     * @param {string} descricao - Descrição da situação do animal
     * @param {string} localizacao - Localização onde o animal está
     * @returns {Object} Objeto representando a ocorrência de resgate
    */
    solicitarResgate(descricao, localizacao) {
        const ocorrencia = {
        descricao: descricao,
        localizacao: localizacao,
        solicitante: this.nome,
        };

        console.log("Resgate solicitado com sucesso!");
        console.log(ocorrencia);
    
        return ocorrencia;
    }
}

/** Exemplo de uso: 
 * Criando um cidadão e solicitando um resgate de animal.
 * const cidadao1 = new Cidadao({
 *   nome: "Ana Daniel",
 *   cpf: "109.089.348-57",
 *   telefone: "(22) 99999-9999",
 *   email: "ana@email.com",
 *   endereco: "Rua Sorteio, 123"
 * });
 */

/** Simulando a solicitação de resgate por parte do cidadão 
 * e o acompanhamento da ocorrência por parte do cidadão.
 * const ocorrencia = cidadao1.solicitarResgate(
 *    "Urso ferido na estrada",
 *    "Rodovia BR-101"
 * );
 */

/** O cidadão acompanha a ocorrência do resgate
 * cidadao1.acompanharOcorrencia(ocorrencia);
 */

export { Cidadao };
