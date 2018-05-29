class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        //  Criando bindings
        this._listaNegociacoes = new BindHelper(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia'
        );
        this._mensagem = new BindHelper(
            new Mensagem(),
            new MensagemView($('#mensagem')),
            'texto',
        );
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    importaNegociacoes() {
        let negociacaoService = new NegociacaoService();
        let promise = negociacaoService.obterNegociacoesDaSemana();
        promise.then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.'
        })
        .catch(erro => this._mensagem.texto = 'Erro ao importar negociações da semana.');
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    limpaLista() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Lista de negociações apagada com sucesso!";
    }

}