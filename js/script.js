let buscar = document.querySelector('#buscar');
let vlInput = document.querySelector('#vlInput');
let perfil = document.querySelector('#perfil');
const URL = 'https://api.github.com/users/';

vlInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        return ajaxApi(URL + vlInput.value);
    }
})

vlInput.addEventListener('focus', () => {
    if (vlInput.value === 'USUARIO NÃO ENCONTRADO') {
        vlInput.value = '';
        vlInput.style.background = "white";
    }
})


buscar.addEventListener('click', () => {
    ajaxApi(URL + vlInput.value)
})


const ajaxApi = (urlChamada) => {
    let config = { method: "GET" }

    fetch(urlChamada, config)
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json()
            }
        })
        .then(dados => montaCard(dados))
        .catch(() => tratamentoERRO())
}


const montaCard = (dados) => {

    let data = new Date(dados.updated_at);
    let ultAtualizacao = ((data.getDate()) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear());
    let dataC = new Date(dados.created_at);
    let criado = ((dataC.getDate()) + "/" + ((dataC.getMonth() + 1)) + "/" + dataC.getFullYear());

    perfil.innerHTML = `
    <a href="${dados.html_url === null ? 'Dados não encontrados' : dados.html_url}" target="_blank">
    <div id=card>
        <img id="imgPerfil" src="${dados.avatar_url}" alt="avatar"  title="${dados.name}">
        <ul id="dadosSimples">
        <li>Login: <span>${dados.login === null ? 'Dados não encontrados' : dados.login}</span></li>
            <li>Nome: <span>${dados.name === null ? 'Dados não encontrados' : dados.name}</span></li>
            <li>Localização: <span>${dados.location === null ? 'Dados não encontrados' : dados.location}</span></li>
            <li>Twitter: <span>${dados.twitter_username === null ? 'Dados não encontrados' :
            dados.twitter_username}</span></li>
            <li>Blog: <span>${dados.blog === null ? 'Dados não encontrados' : dados.blog}</span></li>
            <li>Email: <span>${dados.email === null ? 'Dados não encontrados' : dados.email}</span></li>
            <li>Seguidores: <span>${dados.followers === null ? 'Dados não encontrados' : dados.followers}</span></li>
            <li>Seguindo: <span>${dados.following === null ? 'Dados não encontrados' : dados.following}</span></li>
            <li>Criado: <span>${criado === null ? 'Dados não encontrados' : criado}</span></li>
            <li>Última atualização: <span>${ultAtualizacao === null ? 'Dados não encontrados' : ultAtualizacao}</span>
            </li>
            <li>Companhia: <span>${dados.company === null ? 'Dados não encontrados' : dados.company}</span></li>
            <li>Repositórios: <span>${dados.public_repos === null ? 'Dados não encontrados' : dados.public_repos}</span>
            </li>
            <li>URL: <span>${dados.html_url === null ? 'Dados não encontrados' : dados.html_url}</span> </li>
        </ul>
        <ul id="dados">
            <li>Bio: <span>${dados.bio === null ? 'Dados não encontrados' : dados.bio}</span></li>
        </ul>
        </div>
        </a>
`
}

const tratamentoERRO = () => {
    vlInput.value = '';
    vlInput.value = 'USUARIO NÃO ENCONTRADO';
    vlInput.style.background = 'red';
    perfil.innerHTML = '';
}