class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes: Negociacoes = new Negociacoes(); // Também pode ser declarado: private _negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView')

    constructor() {
        this._inputData = $('#data');  //É passado o id dos elementos no dom (html) // Casting => <HTMLInputElement> converte o tipo genérico para um tipo específico "HTMLInputElement"
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {

        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, '/')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val()),

        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

    }
    
}

/*

Anotações:

Esse arquivo é responsável em interagir com as ações do usuário e construir uma negociação com base nos dados do formulário
Com document os itens do dom: classe é chamada com '.' e o id com '#'. Ex: itens do input no constructor e o form do adiciona(event)

this._negociacoes.paraArray().length = 0; Exemplo de tentativa de deletar a array (alterar o length mexe na estrutura dela)

Bloco utilizado para testar o adiciona() da Negociacoes
this._negociacoes.paraArray().forEach(negociacoes => {
    console.log(negociacao.data);
    console.log(negociacao.quantidade);
    console.log(negociacao.valor);
});

*/ 