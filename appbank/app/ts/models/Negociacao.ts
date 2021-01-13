class Negociacao {

    constructor(private _data: Date, private _quantidade: number, private _valor: number) {
    }

    get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }
}

/*
    private _data: Date;
    private _quantidade: number;
    private _valor: number;
    
    constructor(data: Date, quantidade: number, valor: number) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;

    }

string number = literais (primitivo)
String Number = objeto
variavel = document.querySelector('a tag ou elemento (id) que vc quer buscar');
variavel.textContent ('retorna o que há entre a tag, ou no elemento')
*/