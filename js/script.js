const URL = 'https://api.github.com/users/';

document.querySelector('#vlInput').addEventListener('keyup', (input) => {
    if (input.keyCode === 13) {
        return ajaxApi(URL + input.target.value, input.target);
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
    let vlInput = document.querySelector('#vlInput')
    ajaxApi(URL + vlInput.value, vlInput)
})


const ajaxApi = (urlChamada, input) => {
    let config = { method: "GET" }
    fetch(urlChamada, config)
        .then((resposta) => {
            if (resposta.status === 200) {
                resposta.json().then(dados => montaCard(dados))
            } else {
                return tratamentoERRO(resposta, input)
            }
        })
}

const mapearArray = (obj) => Object.entries(obj).map(el => el[1] === null || el[1] === '' ? el[1] = 'Dados não encontrados' : el[1])

const montaCard = (dados) => {
    let resposta = mapearArray(dados)
    let ultAtualizacao = ((new Date(resposta[31]).getDate()) + "/" + ((new Date(resposta[31]).getMonth() + 1)) + "/" + new Date(resposta[31]).getFullYear());
    let criado = ((new Date(resposta[30]).getDate()) + "/" + ((new Date(resposta[30]).getMonth() + 1)) + "/" + new Date(resposta[30]).getFullYear());

    document.querySelector('#perfil').innerHTML =
        `
        <a href="${resposta[6]}" target="_blank">
        <div id=card>
            <img id="imgPerfil" src="${resposta[3]}" alt="avatar" title="${resposta[18]}">
            <ul id="dadosSimples">
                <li>Login: <span>${resposta[0]}</span></li>
                <li>Nome: <span>${resposta[18]}</span></li>
                <li>Localização: <span>${resposta[21]}</span></li>
                <li>Twitter: <span>${resposta[25]}</span></li>
                <li>Blog: <span>${resposta[20]}</span></li>
                <li>Email: <span>${resposta[22]}</span></li>
                <li>Seguidores: <span>${resposta[28]}</span></li>
                <li>Seguindo: <span>${resposta[29]}</span></li>
                <li>Criado: <span>${criado}</span></li>
                <li>Última atualização: <span>${ultAtualizacao}</span>
                </li>
                <li>Companhia: <span>${resposta[19]}</span></li>
                <li>Repositórios: <span>${resposta[26]}</span>
                </li>
                <li>URL: <span>${resposta[6]}</span> </li>
            </ul>
            <ul id="dados">
                <li>Bio: <span>${resposta[24]}</span></li>
            </ul>
        </div>
    </a>
`
}


const tratamentoERRO = (e, input) => {
    let perfil = document.querySelector('#perfil')
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