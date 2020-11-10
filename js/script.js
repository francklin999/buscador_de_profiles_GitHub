let buscar = document.querySelector('#buscar');
let vlInput = document.querySelector('#vlInput');
let perfil = document.querySelector('#perfil');
let body = document.querySelector('body');

body.addEventListener('keyup', e => {
    if (vlInput.value === 'USUARIO NÃO ENCONTRADO') {
        vlInput.value = '';
        vlInput.style.background = "white";
    }
    if (e.keyCode === 13) {
        return consomeAPI();
    }
})

vlInput.addEventListener('focus', () => {
    if (vlInput.value === 'USUARIO NÃO ENCONTRADO') {
        vlInput.value = '';
        vlInput.style.background = "white";
    }
})

buscar.addEventListener('click', () => {
    return consomeAPI();
})

const consomeAPI = () => {
    let config = {
        method: "GET"
    }

    if (vlInput.value === '' || vlInput.value === null) {
        alert("Insira um nome para buscar")
    } else {

        let resposta = fetch('https://api.github.com/users/' + vlInput.value, config)
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                if (dados.message === "Not Found") {
                    vlInput.value = '';
                    vlInput.value = "USUARIO NÃO ENCONTRADO";
                    vlInput.style.background = "red";

                } else {
                    montaCard(dados);
                }
            })
    }
}

const montaCard = (dados) => {

    let data = new Date(dados.updated_at);
    let ultAtualizacao = ((data.getDate()) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear());
    let dataC = new Date(dados.created_at);
    let criado = ((dataC.getDate()) + "/" + ((dataC.getMonth() + 1)) + "/" + dataC.getFullYear());

    perfil.innerHTML = `
<div id=card>
<div id="imgP"><img src="${dados.avatar_url}" alt="avatar" width="300px"  title="${dados.name}"></div>
<ul id="dados">
<li>Login: <span>${dados.login === null ? 'Dados não encontrados' : dados.login}</span></li>
<li>Nome: <span>${dados.name === null ? 'Dados não encontrados' : dados.name}</span></li>
<li>Localização: <span>${dados.location === null ? 'Dados não encontrados' : dados.location}</span></li>
<li>Twitter: <span>${dados.twitter_username === null ? 'Dados não encontrados' : dados.twitter_username}</span></li>
<li>Blog: <span>${dados.blog === null ? 'Dados não encontrados' : dados.blog}</span></li>
<li>Email: <span>${dados.email === null ? 'Dados não encontrados' : dados.email}</span></li>
<li>Bio: <span>${dados.bio === null ? 'Dados não encontrados' : dados.bio}</span></li>
<li>Companhia: <span>${dados.company === null ? 'Dados não encontrados' : dados.company}</span></li>
<li>Repositórios: <span>${dados.public_repos === null ? 'Dados não encontrados' : dados.public_repos}</span></li>
<li>Seguidores: <span>${dados.followers === null ? 'Dados não encontrados' : dados.followers}</span></li>
<li>Seguindo: <span>${dados.following === null ? 'Dados não encontrados' : dados.following}</span></li>
<li>Criado: <span>${criado === null ? 'Dados não encontrados' : criado}</span></li>
<li>Última atualização: <span>${ultAtualizacao === null ? 'Dados não encontrados' : ultAtualizacao}</span></li>
<li>URL: <span><a href="${dados.html_url === null ? 'Dados não encontrados' : dados.html_url}" target="_blank" >${dados.html_url === null ? 'Dados não encontrados' : dados.html_url}</a></span> </li>
</ul>
</div>
`
}