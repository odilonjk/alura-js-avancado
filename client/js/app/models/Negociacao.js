class Negociacao {
    constructor(data, quantidade, valor) {
        //  Criando um novo objeto data para impedir alterações por parte do usuário
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        //  Congela o objeto para deixar ele imutável
        Object.freeze(this);
    }

    get volume() {
        return Math.round((this._quantidade * this._valor)*100)/100;
    }

    get data() {
        //  O Object.freeze() não congela "sub objetos"
        //  Criando um novo objeto para retornar, impede que o usuário altere este valor
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return Math.round(this._valor*100)/100;
    }

}