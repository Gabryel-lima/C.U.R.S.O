import { Connection } from "mysql2";
import { dbConnectionPool} from "../config/dbConfig.mjs";
import { EquipedeProtecao } from "../lib/EquipedeProtecao.mjs";
import { postEquipeProtecaoModel } from "../models/equipeptc.mjs";

export const postEquipeProtecaoController = async(id , nome , registro) => {

    const equipe_protecao =  new EquipedeProtecao();
    equipe_protecao.setID(id);
    equipe_protecao.setNome(nome);
    equipe_protecao.setRegistro(registro);

    const conexaoDB = await dbConnectionPool.getConnection();
    try {
        await conexaoDB.beginTransaction();
        
        const resultadoQuery = await postEquipeProtecaoModel(conexaoDB, equipe_protecao);
        if(resultadoQuery == 1){
            await conexaoDB.commit();
        }
        return resultadoQuery;

    } catch (error) {
        await conexaoDB.rollback();
        throw error;
    }finally{
        conexaoDB.release();
    }
};