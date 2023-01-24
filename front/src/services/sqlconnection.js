/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
const baseUrl = "http://localhost:3060/api" //-produção

export default () => {

    return {
        pegarToken: () => {
            return localStorage.getItem('token');
        },

        validToken: async() => {
            let token = localStorage.getItem('token');
            let json = await requisicao('post', '/validate', {}, token);
            return json;
        },

        login: async(usuario, senha) => {
            let json = await requisicao('post', '/login', { usuario, senha });
            console.log(json);
            debugger
            return json;
        },

        pegaPeriodos: async(filial, centrocusto) => {
            let json = await requisicao('post', '/periodos', { filial, centrocusto });
            console.log(json)
            return json;
        },

        pegaPeriodosAtestados: async(filial, centrocusto) => {
            let json = await requisicao('post', '/periodos', { filial, centrocusto });
            console.log(json)
            return json;
        },

        pegaFuncionarios: async(filial, centrocusto) => {
            let json = await requisicao('post', '/funcionarios', { filial, centrocusto });
            console.log(json)
            return json;
        },

        pegaMarcacoes: async(filial, centrocusto, Periodo, Tipo) => {
            let json = await requisicao('post', '/marcacoes', { filial, centrocusto, Periodo, Tipo });
            console.log(json)
            return json;
        },

        pegaBancoHoras: async(filial, matricula) => {
            let json = await requisicao('post', '/bancohoras', { filial, matricula });
            console.log(json)
            return json;
        },

        pegaBancoHorasTotal: async(filial, matricula, positivoNegativo) => {
            let json = await requisicao('post', '/bancohorastotal', { filial, matricula, positivoNegativo });
            console.log(json)                   
            return json;
        },  

        pegaApontamentos: async(filial, matricula, periodo) => {
            let json = await requisicao('post', '/apontamentos', { filial, matricula, periodo });
            console.log(json)
            return json;
        },

        pegaAbonos: async(cloja) => {
            let json = await requisicao('post', '/abonos', {cloja});
            console.log(json)
            return json;
        },

        pegaUsuarios: async() => {
            let json = await requisicao('post', '/usuarios', {});
            return json;
        },

        salvarImage: async(formData) => {
            debugger
            const res = await fetch( `${baseUrl}/upload-image`, { method: 'POST', body: formData });
            const data = await res.json();
            console.log('salvando imagem- ', data);
        },

        salvarAtestado: async(formData) => {
            debugger
            const res = await fetch( `${baseUrl}/atestados`, { method: 'POST', body: formData });
            const data = await res.json();
            console.log(data);
        },


        salvarUsuario: async(nome, email, senha, funcao, imageAvatar, avatarUrl, adm, loja, centrocustos, gestor, file, fileName, formData) => {
            debugger
            // const retorno = await fetch( `${baseUrl}/upload-image`, { method: 'POST', body: formData });
            // const person = await retorno.json()
            let json = await requisicao('post', '/salvarUsuario', { nome, email, senha, funcao, imageAvatar, avatarUrl, adm, loja, centrocustos, gestor, file, fileName, formData} )
            return json
        },

        logout: async() => {
            let token = localStorage.getItem('token');
            let json = await requisicao('post', '/logout', {}, token);
            localStorage.removeItem('token');
            return json;
        },

        getUsuarios: async() => {
            let token = localStorage.getItem('token');
            let json = await requisicao('get', '/usuarios', {}, token);
            return json;

        },

        gravaAbono: async(usuario, motAbono, justificativa, matricula, periodo, dataAbono, dtapontamento, verba) => {
            debugger
            let json = await requisicao('post', '/justificar', { usuario, motAbono, justificativa, matricula, periodo, dataAbono, dtapontamento, verba });
            console.log(json)
            return json;

        },

        qtditens: async(matricula, periodo) => {
            debugger
            let json = await requisicao('post', '/qtsjustificados', { matricula, periodo });
            return json;

        },

        ajustStatusZZQ: async(matricula, periodo, status) => {
            debugger
            let json = await requisicao('post', '/justificarZZQ', { matricula, periodo, status });
            return json;

        },


    }
}

//função de requisição generica, pode requisitar
const requisicao = async(method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch (method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
            break;
        case 'put':
        case 'post':
        case 'delete':
            body = JSON.stringify(params);
           break;
    }

    let headers = { 'Content-Type': 'application/json' }
    let req = await fetch(fullUrl, { method, headers, body })
    let json = await req.json();
    return json;

}