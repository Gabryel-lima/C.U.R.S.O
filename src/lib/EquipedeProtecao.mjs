export class EquipedeProtecao{

    constructor(id = '', nome = '', registro = ''){
        this.id = id;
        this.nome = nome;
        this.registro = registro;
    }

    getID(){
        return this.id;
    }

    setID(id){
        this.id = id;
    }

    getNome(){
        return this.nome;
    }

    setNome(nome){
        this.nome = nome;
    }

    getRegistro(){
        return this.registro;
    }

    setRegistro(registro){
        this.registro = registro;
    }

}
// equipeptc = Equipe de Protecao
const equipe_protecao = new EquipedeProtecao()