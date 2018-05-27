class ProxyFactory {

    static create(object, props, action) {
        //  Retorna um proxy para realizar automaticamente os updates
        return new Proxy(object, {
            get(target, prop, receiver) {
                //  Verifica se é um dos métodos a serem interceptados
                if(props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function() {
                        let reflectReturn = Reflect.apply(target[prop], target, arguments);
                        //  Executa a ação passada por parâmetro
                        action(target);
                        return reflectReturn;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let reflectReturn = Reflect.set(target, prop, value, receiver);;    
                if(props.includes(prop)) action(target);
                return reflectReturn;
            }
        });
    }

    static isFunction(func) {
        return typeof(func == typeof(Function));
    }

}