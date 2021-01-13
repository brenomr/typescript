abstract class View<T> {
    protected _elemento: JQuery;

    constructor(seletor: string) {
    //this._elemento = document.querySelector(seletor);
    this._elemento = $(seletor);
    }

    update(model: T) {
        //this._elemento.innerHTML = this.template(model);
        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;
        // Lembrete: classes ou métodos abstratos não podem ser
        // instanciados diretamente. Precisam ser preenchidos
}