class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(listaNegociacoes) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${this._criaTabela(listaNegociacoes.negociacoes)}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${listaNegociacoes.negociacoes.reduce((total, n) => total + n.volume, 0.0)}
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
