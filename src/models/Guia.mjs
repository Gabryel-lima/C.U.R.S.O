export const postGuiaModel = async(conexaoDB, guia) => {
    const sql = 'INSERT INTO guia(nome,registro) VALUES (?,?)';
    
    try {
        const resultado = await conexãoDB.execute(sql, [guia.get])
        
    } catch (error) {
        
    }
}