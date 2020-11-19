const URL = 'https://api.github.com/users/';

document.querySelector('#vlInput').addEventListener('keyup', (input) => {
    let perfil = document.querySelector('#perfil')
    if (input.keyCode === 13) {
        return ajaxApi(URL + input.target.value, input.target, perfil);
    }
})

document.querySelector('#vlInput').addEventListener('focus', (e) => {
    limpaInput(e);
})

const limpaInput = (e) => {
    if (e.target.value === 'USUARIO NÃO ENCONTRADO') {
        e.target.value = '';
        e.target.style.background = "white";
    }
}

document.querySelector('#buscar').addEventListener('click', () => {
    let perfil = document.querySelector('#perfil')
    let vlInput = document.querySelector('#vlInput')
    ajaxApi(URL + vlInput.value, vlInput, perfil)
})


const ajaxApi = (urlChamada, input, perfil) => {
    let config = { method: "GET" }
    fetch(urlChamada, config)
        .then((resposta) => {
            if (resposta.status === 200) {
                resposta.json().then(dados => mapearArray(dados, perfil))
                // return resposta.json().then(dados => montaCard(dados, perfil))
            } else {
                return tratamentoERRO(resposta, input, perfil)
            }
        })
}

const mapearArray = (obj, perfil) => {
    let array = []
    array.push(obj)
    array.map(e => {
        array.pop()
        array.push(Object.entries(e).map(el => el[1] === null || el[1] === '' ? el[1] = 'Dados não encontrados' : el[1]))
    })
    montaCard(array[0], perfil)
}

const montaCard = (dados, perfil) => {
    let data = new Date(dados[31]);
    let ultAtualizacao = ((data.getDate()) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear());
    let dataC = new Date(dados[30]);
    let criado = ((dataC.getDate()) + "/" + ((dataC.getMonth() + 1)) + "/" + dataC.getFullYear());

    perfil.innerHTML =
        `
        <a href="${dados[6]}" target="_blank">
        <div id=card>
            <img id="imgPerfil" src="${dados[3]}" alt="avatar" title="${dados[18]}">
            <ul id="dadosSimples">
                <li>Login: <span>${dados[0]}</span></li>
                <li>Nome: <span>${dados[18]}</span></li>
                <li>Localização: <span>${dados[21]}</span></li>
                <li>Twitter: <span>${dados[25]}</span></li>
                <li>Blog: <span>${dados[20]}</span></li>
                <li>Email: <span>${dados[22]}</span></li>
                <li>Seguidores: <span>${dados[28]}</span></li>
                <li>Seguindo: <span>${dados[29]}</span></li>
                <li>Criado: <span>${criado}</span></li>
                <li>Última atualização: <span>${ultAtualizacao}</span>
                </li>
                <li>Companhia: <span>${dados[19]}</span></li>
                <li>Repositórios: <span>${dados[26]}</span>
                </li>
                <li>URL: <span>${dados[6]}</span> </li>
            </ul>
            <ul id="dados">
                <li>Bio: <span>${dados[24]}</span></li>
            </ul>
        </div>
    </a>
`
}





const tratamentoERRO = (e, input, perfil) => {
    console.log('tratamento de erro', e)
    switch (e.status) {
        case 404:
            input.value = '';
            input.value = 'USUARIO NÃO ENCONTRADO';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
        case 304:
            input.value = '';
            input.value = 'NÃO MODIFICADO';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
        case 422:
            input.value = '';
            input.value = 'NÃO PROCESSÁVEL';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
        case 301:
            input.value = '';
            input.value = 'MOVIDO PERMANENTEMENTE';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
        case 403:
            input.value = '';
            input.value = 'ACESSO NEGADO';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
        case 503:
            input.value = '';
            input.value = 'SERVIÇO INDISPONÍVEL';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
        case 410:
            input.value = '';
            input.value = 'INDISPONÍVEL PERMANENTEMENTE';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
        case 204:
            input.value = '';
            input.value = 'SEM CONTEÚDO';
            input.style.background = 'red';
            perfil.style.color = "red"
            perfil.style.marginTop = "20px"
            perfil.innerHTML = `Status: ${e.status} Mensagem: ${e.statusText}`;
            break;
    }

}