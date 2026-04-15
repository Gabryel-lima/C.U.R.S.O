import { dbConnectionPool } from "../../../config/dbConfig.mjs";
import { Guia } from "../lib/Guia.mjs";
import { postGuiaModel } from "../models/Guia.mjs";

export const postGuiaControler = async(id , nome , registro ) => {

    const guia = new Guia();
    guia.setID(id);
    guia.setNome(nome);
    guia.setRegistro(registro);

    const conexaoDB = await dbConnectionPool.getConnection();
    try {
        await conexaoDB.beginTransaction();
        const resultadoQuery = await postGuiaModel(conexaoDB, guia);
        if(resultadoQuery == 1){
            await conexaoDB.commit();
    }
        return resultadoQuery;

    } catch (error) {
        await conexaoDB.rollback();
        throw error;

    }finally{
        conexaoDB.realese();
    }
};