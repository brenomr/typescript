class Negociacoes {

    private _negociacoes: Array<Negociacao> = [];
    // private _negociacoes: Negociacao[] = [] ===> Forma mais simples de declarar

    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao);
    }

    // Infiro que o retorno de paraArray é um objeto negociacao do tipo array ==> Negociacao[]
    paraArray(): Negociacao[]  {
        return [].concat(this._negociacoes);
    }
}