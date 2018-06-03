class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';
        //  Criando bindings para monitorar metodos que atualizam a View
        this._listaNegociacoes = new BindHelper(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
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

        //  Utilizando Promise para realizar as chamadas na sequência esperada
        Promise.all([
            negociacaoService.obterNegociacoesDaSemana(),
            negociacaoService.obterNegociacoesDaSemanaPassada(),
            negociacaoService.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes
                .reduce((todasNegociacoes, negociacoes) => todasNegociacoes.concat(negociacoes), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)
            );
        }).catch(erro => this._mensagem.texto = 'Erro ao importar negociações.');
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

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

}