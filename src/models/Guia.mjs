//Post De Guia 
export const postGuiaModel = async(conexaoDB, guia) => {
    const sql = 'INSERT INTO guia(nome,registro) VALUES (?,?)';
    
    try {
        const resultado = await conexaoDB.execute(sql, [guia.getID(), guia.getNome(), guia.getRegistro()]);
        
        return resultado[0].affectedRows;
    } catch (error) {
        throw error;
        
    }
}

export const deleteGuiaModel = async(conexaoDB, guia) => {
    const sql = 'DELETE INTO guia'
}

export const getGuiaModel = async(conexaoDB) => {

    const sql = 'SELECT id, nome, registro FROM guia';

    try {
        const resultado = await conexaoDB.execute(sql);
        console.log(resultado[0]);
        return resultado[0];
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}