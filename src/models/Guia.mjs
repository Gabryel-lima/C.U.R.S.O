//Post De Guia 
export const postGuiaModel = async(conexaoDB, guia) => {
    const sql = 'INSERT INTO guia(nome,registro) VALUES (?,?)';
    
    try {
        const resultado = await conexãoDB.execute(sql, [guia.getID(), guia.getNome(), guia.getRegistro()]);
        
        return resultado[0].affectedRows;
    } catch (error) {
        throw error;
        
    }
}