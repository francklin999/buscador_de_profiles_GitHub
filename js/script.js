let buscar = document.querySelector('#buscar');
let vlInput = document.querySelector('#vlInput');
let perfil = document.querySelector('#perfil');



buscar.addEventListener('click', () => {
    let config = {
        method: "GET"
    }

    if (vlInput.value === '' || vlInput.value === null) {
        alert("Insira um nome para buscar")
    }else{

    let resposta = fetch('https://api.github.com/users/' + vlInput.value, config)
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (dados.erro) {
                return vlInput.style.background = 'red';

            }

            let data = new Date(dados.updated_at);
            let ultAtualizacao = ( (data.getDate())+ "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear());
            let dataC = new Date(dados.created_at);
            let criado = ( (dataC.getDate())+ "/" + ((dataC.getMonth() + 1)) + "/" + dataC.getFullYear());

            perfil.innerHTML = `
            <div id=card>
    <div id="imgP"><img src="${dados.avatar_url}" alt="avatar" width="300px"  title="${dados.name}"></div>
    <ul id="dados">
        <li>Login: ${dados.login === null ? 'Dados não encontrados' : dados.login}</li>
        <li>Nome: ${dados.name === null ? 'Dados não encontrados' : dados.name}</li>
        <li>Localização: ${dados.location === null ? 'Dados não encontrados' : dados.location}</li>
        <li>Twitter: ${dados.twitter_username === null ? 'Dados não encontrados' : dados.twitter_username}</li>
        <li>Blog: ${dados.blog === null ? 'Dados não encontrados' : dados.blog}</li>
        <li>Email: ${dados.email === null ? 'Dados não encontrados' : dados.email}</li>
        <li>Bio: ${dados.bio === null ? 'Dados não encontrados' : dados.bio}</li>
        <li>Companhia: ${dados.company === null ? 'Dados não encontrados' : dados.company}</li>
        <li>Repositórios: ${dados.public_repos === null ? 'Dados não encontrados' : dados.public_repos}</li>
        <li>Seguidores: ${dados.followers === null ? 'Dados não encontrados' : dados.followers}</li>
        <li>Seguindo: ${dados.following === null ? 'Dados não encontrados' : dados.following}</li>
        <li>Criado: ${criado === null ? 'Dados não encontrados' : criado}</li>
        <li>Última atualização: ${ultAtualizacao === null ? 'Dados não encontrados' : ultAtualizacao}</li>
        <li>URL: <a href="${dados.html_url === null ? 'Dados não encontrados' : dados.html_url}" target="_blank" >${dados.html_url === null ? 'Dados não encontrados' : dados.html_url}</a> </li>
    </ul>
</div>
            `

    })
    }
})
