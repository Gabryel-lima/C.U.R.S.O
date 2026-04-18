//equipe_protecao = Equipe de Protecao

export const postEquipeProtecaoModel = async (conexaoDB, equipe_protecao) => {
    const sql = 'INSERT INTO equipe_protecao(nome,registro) VALUES (?, ?)';

    try {
        const resultado = await conexaoDB.execute(sql, [equipe_protecao.getID(), equipe_protecao.getNome(), equipe_protecao.getRegistro()]);

        return resultado[0].affectedRows;
    } catch (error) {
        throw error;
    }
}