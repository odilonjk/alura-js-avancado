class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(listaNegociacoes) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${this._criaTabela(listaNegociacoes.negociacoes)}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${listaNegociacoes.volumeTotal}
                </td>
            </tfoot>
        </table>
        `;
    }

    _criaTabela(negociacoes) {
        return negociacoes.map((n) => `
            <tr>
                <td>${DateHelper.dataParaTexto(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
                <td>${n.volume}</td>
            </tr>
        `).join('');
    }

}
