class BindHelper {

    //  Faço uso do rest operator para gerar o array dos parâmetros a partir do 3 parâmetro
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(
            model,
            props,
            model => view.update(model)
        );
        //  Antes de retornar a proxy atualizo para gerar a tabela no caso
        //  da NegociacoesView
        view.update(model);
        return proxy;
    }

}