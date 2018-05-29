class NegociacaoService {

    obterNegociacoesDaSemana() {
        return this.getNegocicacoes('negociacoes/semana');
    }
    
    obterNegociacoesDaSemanaPassada() {
        return this.getNegocicacoes('negociacoes/passada');
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this.getNegocicacoes('negociacoes/retrasada');
    }

    getNegocicacoes(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Erro ao obter negociações da semana.');
                    }
                }
            };
            xhr.send();
        });
    }
}