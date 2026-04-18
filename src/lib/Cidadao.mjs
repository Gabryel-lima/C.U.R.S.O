export class Cidadao {

    constructor(id = '', nome = '', numero = ''){
        this.id = id;
        this.nome = nome;
        this.numeoro = numero;
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

    getNumero(){
        return this.numero;
    }

    setNumero(numero){
        this.numero = numero;
    }
}

const cidadao_novo = new Cidadao()