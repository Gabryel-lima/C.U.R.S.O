//Post De Guia
export const postVeterinarioModel = async(conexaoDB, veterinario) => {
  const sql = 'INSERT INTO guia(id, nome,registro) VALUES (?,?)';
  
  try {
      const resultado = await conexaoDB.execute(sql, [veterinario.getID(), veterinario.getNome(), veterinario.getRegistro()]);
      
      return resultado[0].affectedRows;
  } catch (error) {
      throw error;
  }
