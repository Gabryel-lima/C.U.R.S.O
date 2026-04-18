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

export const deleteEquipeProtecaoModel = async(conexaoDB, equipe_protecao) => {
    const sql = 'DELETE INTO equipe_protecao '
}

export const getEquipeProtecaoModel = async(conexaoDB) => { 

    const sql = 'SELECT id, nome, registro FROM equipe_protecao';

    try {
        const resultado = await conexaoDB.execute(sql);
        console.log(resultado[0]);
        return resultado[0];
    } catch (error) {
        console.log(error.message);
        throw error;
    }

}