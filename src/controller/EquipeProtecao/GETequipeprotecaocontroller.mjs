import { dbConnectionPool } from "../../../config/dbConfig.mjs";
import { getEquipeProtecaoModel } from "../../models/equipeptc.mjs";
import { EquipedeProtecao } from "../../lib/EquipedeProtecao.mjs";

export const getEquipeProtecaoController = async() => {

    const conexaoDB = await dbConnectionPool.getConnection();

    try {
        const equipe = await getEquipeProtecaoModel(conexaoDB) 

        const listaequipe = []

        for(let i = 0; i<equipe.length; i++){
            const equipe_protecao = new EquipedeProtecao();

            equipe_protecao.setID(equipe[i].id)
            equipe_protecao.setNome(equipe[i].nome)
            equipe_protecao.setRegistro(equipe[i].registro)
            
            listaequipe.push(equipe_protecao)
        }

        return listaequipe;
    } catch (error) {
        throw error;
    }finally{
        conexaoDB.release();
    }

}