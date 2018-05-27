class ProxyFactory {

    static create(object, props, action) {
        //  Retorna um proxy para realizar automaticamente os updates
        return new Proxy(object, {
            get(target, prop, receiver) {
                //  Verifica se é um dos métodos a serem interceptados
                if(props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        //  Executa a ação passada por parâmetro
                        return action(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    target[prop] = value;
                    action(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static isFunction(func) {
        return typeof(func == typeof(Function));
    }

}