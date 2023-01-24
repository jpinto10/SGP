const conn = require('../utils/db');
const connDadosadv = require('../utils/dbDADOSADV');
const express = require('express');
const routers = express.Router();
const cors = require('cors');
const SECRET = 'SGPCONSULT';

const multer = require('multer'); 

//middware de configuração do MULTER
const Uploader = require('../middleware/uploaderImages')
///

let userController = require('../controll/userControl');

routers.get('/', function(req, res) {
    let resposta = { msg: 'usuário ' + req.id + " - " + req.nome + ' fez a requisição..' };
    res.send(resposta);
});


//-------------- CLIENTES CLUB FIDELIDADE - INICIO --------------
//Consulta e LEVA PARA GRID OS CLIENTES DO CLUB FIDELIDADE
routers.post('/pegaClientesClub', async function(req, res) {
   
    let sqlPeriodo = `
        SELECT CAST(R_E_C_N_O_ as INT) AS ID,  A1_NOME, A1_END, A1_CGC, A1_EMAIL, A1_YCEL FROM SA1010
        WHERE D_E_L_E_T_=''
        AND A1_YCLUBE = 'S' `
    const rowsClientes = await connDadosadv.dbConect(sqlPeriodo)
    console.log('select - ', sqlPeriodo)

    if (rowsClientes.recordset.length) {
        let dadosClientes = rowsClientes.recordset
        return res.status(200).json({ auth: true, dadosClientes });
    } else {
        return res.status(400).json({ auth: false });
    };
});

//Gravar CLIENTES CLUB FIDELIDADE
routers.post('/salvarClientesClub', async function(req, res) {
    const _nome = req.body.nome
    const _email = req.body.email
    const _cpf = req.body.cpf
    const _celular = req.body.celular
    const _endereco = req.body.endereco
    
    console.log('olahi ender - ', _endereco )
    

    // const _cep = req.body.cep
    const _numero= req.body.numero 
    const _bairro= req.body.bairro 
    // const _loja = req.body.loja
    const _numCli = req.body._numCli
    let lCPF = false
    let lCpfZCA = false
    
    
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear() +1 ;
    let anoZCA = data.getFullYear() ;

    let sqlCPF = `SELECT A1_CGC FROM DADOSADV.dbo.SA1010  
    WHERE D_E_L_E_T_='' AND A1_CGC = '${_cpf}' `
    const rowCPf = await connDadosadv.dbConect(sqlCPF)
    if (rowCPf.recordset.length) {
        lCPF = true
    }

    let sqlCPFZCA = `SELECT ZCA_CODSA1 FROM DADOSADV.dbo.ZCA010  
    WHERE D_E_L_E_T_='' AND ZCA_CODSA1 = '${_numCli}' `
    const rowCPfzca = await connDadosadv.dbConect(sqlCPFZCA)
    if (rowCPfzca.recordset.length) {
        lCpfZCA = true
    }

    //campos fixos
    _pessoa = 'F'
    _tipo   = 'F'
    _yvldclub = ano+mes+dia
    _yclube = 'S'
    _inscr = 'ISENTO'
    _codpais = '01058'
    _tipcli = '1'
    _est = 'CE' //req.body.estado
    _cod_mun = '04400'
    _mun = 'FORTALEZA'//req.body.cidade
    _pais = '105'
    _loja = '01'
    _tabela = '007'
    _complemen = '' //req.body.complemento

    _cep    = '60000000'//req.body.cep
    _ddd    = '85'

    //DADOS ZCA
    _DTASSINA = anoZCA+mes+dia
    _STATUS = 'V'
    _NIVEL = '01'
    _LOJASINA = req.body.cLoja //'010120'
    _DESCLJAS = req.body.cDescLoja //'LOJA 20'
    _FREAL = '0.02'
    _APLICDES = 'N'
    _USUAR = req.body.cCodProtheus //'000714'
    
    console.log(lCPF)

    if(lCPF){
        const sql = `
        UPDATE DADOSADV.dbo.SA1010 
           SET A1_YVLDCLU='${_yvldclub}', A1_YCLUBE='${_yclube}'
        WHERE D_E_L_E_T_='' AND A1_CGC = '${_cpf}'   `
        console.log('SA1 - ', sql)
        const rows = await connDadosadv.dbConect(sql)

        if(!sqlCPFZCA){
            const sqlZCA = `INSERT INTO DADOSADV.dbo.ZCA010 (ZCA_CODSA1, ZCA_LOJSA1, ZCA_STATUS, ZCA_DTASSI, ZCA_NIVEL, ZCA_DTVALI, ZCA_LOJASS,
            ZCA_DLJASS, ZCA_FREAL, ZCA_DSCAPL, ZCA_USR, R_E_C_N_O_ )
            VALUES ( '${_numCli}', '${_loja}', '${_STATUS}', '${_DTASSINA}', '${_NIVEL}', '${_yvldclub}', '${_LOJASINA}',
            '${_DESCLJAS}', '${_FREAL}', '${_APLICDES}', '${_USUAR}', ${_RECNZCA} ) `
            console.log(sqlZCA)
            const rows3 = await connDadosadv.dbConect(sqlZCA)
        }

        if (rows.rowsAffected.length) {
            return res.status(200).json({ auth: true });
        } else {
            return res.status(200).json({ auth: false });
        };
        conn.dbCloseConect();

    } else{

        // const sql1 = `SELECT MAX(A1_COD) as item FROM DADOSADV.dbo.SA1010 `
        // const rows1 = await connDadosadv.dbConect(sql1)
        // const _item = rows1.recordset[0].item
        // const aitem = _item.split('')
        const sql1 = `SELECT max(R_E_C_N_O_) as QTD FROM DADOSADV.dbo.SA1010 
        WHERE D_E_L_E_T_='' `
        const rows1 = await connDadosadv.dbConect(sql1)
        let _itloj = parseInt(rows1.recordset[0].QTD) + 1 

        // const sql1 = `SELECT MAX(A1_COD) as item FROM DADOSADV.dbo.SA1010 `
        // const rows1 = await connDadosadv.dbConect(sql1)
        // const _item = rows1.recordset[0].item
        // const aitem = _item.split('')
        const sql2 = `SELECT max(R_E_C_N_O_) as QTD FROM DADOSADV.dbo.ZCA010 
        WHERE D_E_L_E_T_='' `
        const rows2 = await connDadosadv.dbConect(sql2)
        let _RECNZCA = parseInt(rows2.recordset[0].QTD) + 1 

        const sql = `INSERT INTO DADOSADV.dbo.SA1010 (A1_COD, A1_LOJA,  A1_NOME, A1_END, A1_CGC, A1_EMAIL, A1_YCEL,
                        A1_PESSOA, A1_TIPO, A1_YVLDCLU, A1_YCLUBE, A1_INSCR, A1_CODPAIS, A1_TIPCLI, 
                        A1_EST, A1_COD_MUN, A1_MUN, A1_PAIS, R_E_C_N_O_, A1_TABELA, A1_CEP, A1_DDD, A1_TEL, A1_BAIRRO, A1_COMPLEM )
        VALUES ( '${_numCli}', '${_loja}', '${_nome}', '${_endereco + '- ' + _numero}', '${_cpf}', '${_email}', '${_celular}',
        '${_pessoa}', '${_tipo}', '${_yvldclub}', '${_yclube}', '${_inscr}', '${_codpais}', '${_tipcli}', '${_est}',
        '${_cod_mun}', '${_mun}', '${_pais}', ${_itloj}, '${_tabela}', ${_cep}, ${_ddd}, '${_celular}', '${_bairro}', '${_complemen}' ) `
        console.log(sql)
        const rows = await connDadosadv.dbConect(sql)

        const sqlZCA = `INSERT INTO DADOSADV.dbo.ZCA010 (ZCA_CODSA1, ZCA_LOJSA1, ZCA_STATUS, ZCA_DTASSI, ZCA_NIVEL, ZCA_DTVALI, ZCA_LOJASS,
            ZCA_DLJASS, ZCA_FREAL, ZCA_DSCAPL, ZCA_USR, R_E_C_N_O_ )
            VALUES ( '${_numCli}', '${_loja}', '${_STATUS}', '${_DTASSINA}', '${_NIVEL}', '${_yvldclub}', '${_LOJASINA}',
            '${_DESCLJAS}', '${_FREAL}', '${_APLICDES}', '${_USUAR}', ${_RECNZCA} ) `
            console.log(sqlZCA)

        const rows3 = await connDadosadv.dbConect(sqlZCA)

        if (rows.rowsAffected.length) {
            return res.status(200).json({ gravado: true, _nome });
        } else {
            return res.status(200).json({ gravado: false });
        };
    }

});

//-------------- CLIENTES CLUB FIDELIDADE - FINAL ---------------


//rotas usuário

//marcações dos usuários
routers.post('/marcacoes', async function(req, res) {
    let sql = '';

    let cPeriodo = req.body.Periodo
    let cTipo = req.body.Tipo

    //14/04/22 - MONTAGEM DA FUNÇÃO QUE PEGA O PERIODO, COM BASE NA TABELA DO PONTO
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    dataAtual = ano + mes + dia;
    let sqlPeriodo = `SELECT * FROM MAPA.dbo.PERIODO 
    WHERE FILIAL = '${req.body.filial}' AND DTINICIAL <= '${dataAtual}' AND DTFINAL >=  '${dataAtual}'  `
    const rowsPeriodo = await connDadosadv.dbConect(sqlPeriodo)

    if (req.body.centrocusto) {
        sql = `SELECT *, SUBSTRING(ZZQ_PERIOD,7,2) +'/' + SUBSTRING(ZZQ_PERIOD,5,2) + '/' + SUBSTRING(ZZQ_PERIOD,1,4) + ' a ' + 
        SUBSTRING(ZZQ_PERIOD,16,2) +'/' + SUBSTRING(ZZQ_PERIOD,14,2) + '/' + SUBSTRING(ZZQ_PERIOD,10,4) AS PERIODO FROM DADOSADV.dbo.ZZQ010 
        INNER JOIN SRA010 ON RA_FILIAL = ZZQ_FILIAL AND RA_MAT=ZZQ_MAT
        WHERE ZZQ_FILIAL = '${req.body.filial}' AND RA_CC = '${req.body.centrocusto}' AND RA_SITFOLH <> 'D'
        AND ZZQ_PERIOD = '${cPeriodo}' `           
    } else {
        sql = `SELECT *, SUBSTRING(ZZQ_PERIOD,7,2) +'/' + SUBSTRING(ZZQ_PERIOD,5,2) + '/' + SUBSTRING(ZZQ_PERIOD,1,4) + ' a ' + 
        SUBSTRING(ZZQ_PERIOD,16,2) +'/' + SUBSTRING(ZZQ_PERIOD,14,2) + '/' + SUBSTRING(ZZQ_PERIOD,10,4) AS PERIODO FROM DADOSADV.dbo.ZZQ010 
        INNER JOIN SRA010 ON RA_FILIAL = ZZQ_FILIAL AND RA_MAT=ZZQ_MAT
        WHERE ZZQ_FILIAL = '${req.body.filial}' AND RA_SITFOLH <> 'D' 
        AND ZZQ_PERIOD = '${cPeriodo}' `
    }   

    if(cTipo==='C'){
        sql += `AND ZZQ_PENDEN = 'S' AND ZZQ_STATUS = 'I'` 
    }
    if(cTipo==='S'){
        sql += `AND ZZQ_PENDEN = 'N' ` 
    }


    const rows = await connDadosadv.dbConect(sql)
    console.log('select - ', sql)
    if (rows.recordset.length) {
        let dadosMarcacoes = rows.recordset
        return res.status(200).json({ auth: true, dadosMarcacoes });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});

//salda as imagens que farão a identificação do usuário
routers.post("/upload-image", Uploader.single('fotos'), async (req, res, next) => {
    // debugger
    console.log('olhai ', req.file)
    if (req.file) {
        return res.status(200).json({
            erro: false,
            arquivoImagem: req.file.filename,
            mensagem: "Upload realizado com sucesso!"
        });
        
    } else{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
        });
    }
});

//periodos das marcações - identificando mais de um periodo a ser tratado
routers.post('/periodos', async function(req, res) {
   
    let sqlPeriodo = `SELECT DISTINCT(ZZQ_PERIOD) FROM ZZQ010 
    WHERE D_E_L_E_T_='' AND ZZQ_FILIAL = '${req.body.filial}'  `
    const rowsPeriodo = await connDadosadv.dbConect(sqlPeriodo)
    console.log('select - ', sqlPeriodo)

    if (rowsPeriodo.recordset.length) {
        let dadosPeriodos = rowsPeriodo.recordset
        return res.status(200).json({ auth: true, dadosPeriodos });
    } else {
        return res.status(400).json({ auth: false });
    };
});

//Gravar usuários
routers.post('/salvarUsuario', async function(req, res) {
    // debugger
    //valores
    const _email = req.body.email
    const _senha = req.body.senha
    const _imagem = 'http://localhost:3060/projeto_Portal_Back/'+req.body.fileName //(req.body.avatarUrl ? req.body.avatarUrl : '')
    const _dtblqueio = (req.body.isBloqueado ? new Date().toLocaleString().substr(0, 10) : '')
    const _nome = req.body.nome
    const _loja = req.body.loja
    const _trocaSenha = (req.body.trocaSenha ? 'SIM' : 'NAO')
    const _Admin = (req.body.adm ? 'SIM' : 'NAO')
    const _funcao = req.body.funcao

    const _centrocustos = req.body.centrocustos
    const _gestor = req.body.gestor

    const sql0 = `SELECT COUNT(id) as item FROM MAPA.dbo.USUARIOS WHERE email = '${_email}'  `
    const rows0 = await connDadosadv.dbConect(sql0)
    const _temUser = rows0.recordset[0].item

    if (_temUser > 0) {
        return res.status(200).json({ gravado: false });
    }

    const sql1 = `SELECT MAX(id) as item FROM MAPA.dbo.USUARIOS `
    const rows1 = await connDadosadv.dbConect(sql1)
    const _item = rows1.recordset[0].item + 1

    const sql = `INSERT INTO MAPA.dbo.USUARIOS (id, nome, email, senha, funcao, imagem, Admin, loja, centrocusto, gestor)
    VALUES ( ${_item}, '${_nome}', '${_email}', '${_senha}', '${_funcao}', '${_imagem}', '${_Admin}', '${_loja}', '${_centrocustos}', '${_gestor}') `
    console.log(sql)
    const rows = await connDadosadv.dbConect(sql)

    if (rows.rowsAffected.length) {
        return res.status(200).json({ gravado: true, _nome });
    } else {
        return res.status(200).json({ gravado: false });
    };

});

//consulta os usuarios - traz todos ativos
routers.post('/usuarios', async function(req, res) {
    const sql = `SELECT email, nome, loja, funcao, dtblqueio FROM MAPA.dbo.USUARIOS WHERE dtblqueio = '' `
    const rows = await connDadosadv.dbConect(sql)

    if (rows.recordset.length) {
        let dados = rows.recordset
        return res.status(200).json({ auth: true, dados });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

})

routers.post('/abonos', async function(req, res) {
    const sql = `SELECT P6_CODIGO, P6_DESC
                FROM DADOSADV.dbo.SP6010 WHERE D_E_L_E_T_='' AND P6_FILIAL = '${req.body.cloja}' AND P6_ABOPORT = 'S' AND P6_MSBLQL <> '1' 
                ORDER BY P6_DESC `
    const rows = await connDadosadv.dbConect(sql)

    if (rows.recordset.length) {
        let dadosMotivosApontamento = rows.recordset
        return res.status(200).json({ auth: true, dadosMotivosApontamento });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});

//apontamentos dos usuários
routers.post('/apontamentos', async function(req, res) {
    const sql = `SELECT ZZR_FILIAL, ZZR_STATUS, ZZR_DTAPON, ZZR_PD, ZZR_DESCVE, 
                ZZR_BAT01, ZZR_BAT02, ZZR_BAT03, ZZR_BAT04, ZZR_BAT05, ZZR_BAT06,
                ZZR_DTJUST, ZZR_ABONO, ZZR_JUSTIF, ZZR_MAT, ZZR_PERIOD, 
                SUBSTRING(ZZR_DTAPON,7,2) +'/' + SUBSTRING(ZZR_DTAPON,5,2) + '/' + SUBSTRING(ZZR_DTAPON,1,4) as DTAPONTAMENTO 
                FROM DADOSADV.dbo.ZZR010 WHERE D_E_L_E_T_='' AND ZZR_FILIAL = '${req.body.filial}' 
                AND ZZR_MAT = '${req.body.matricula}' AND ZZR_PERIOD = '${req.body.periodo}'`
    const rows = await conn.dbConect(sql)
    console.log(sql)

    if (rows.recordset.length) {
        let dadosApontamentos = rows.recordset
        return res.status(200).json({ auth: true, dadosApontamentos });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});

//BANCO DE HORAS DOS USUÁRIOS - SPI 
routers.post('/bancohoras', async function(req, res) {
    const sql = ` SELECT PI_FILIAL, PI_MAT, RA_NOME, 
                SUBSTRING(PI_DATA,7,2) +'/' + SUBSTRING(PI_DATA,5,2) + '/' + SUBSTRING(PI_DATA,1,4) as P_DATA
                , PI_PD, P9_DESC, P9_TIPOCOD, PI_CC, PI_QUANT FROM DADOSADV.dbo.SPI010 TPI 
                INNER JOIN DADOSADV.dbo.SP9010 SP9 
                ON PI_PD = P9_CODIGO 
                INNER JOIN DADOSADV.dbo.SRA010 SRA
                ON PI_FILIAL = RA_FILIAL AND PI_MAT = RA_MAT
                WHERE TPI.D_E_L_E_T_='' AND SP9.D_E_L_E_T_='' AND SRA.D_E_L_E_T_=''
                AND PI_DTBAIX=''
                AND PI_FILIAL='${req.body.filial}' 
                AND PI_MAT = '${req.body.matricula}' 
                ORDER BY PI_DATA`
    const rows = await conn.dbConect(sql)
    console.log(sql)
    // debugger

    if (rows.recordset.length) {
        let dadosBancoHoras = rows.recordset
        return res.status(200).json({ auth: true, dadosBancoHoras });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});
//

//total do banco de horas
routers.post('/bancohorastotal', async function(req, res) {
    const sql = `SELECT PI_QTDPOSI, PI_QTDNEGA, PI_SALDOHORAS FROM MAPA.dbo.ZPI010 
                WHERE PI_FILIAL='${req.body.filial}' 
                AND PI_MAT = '${req.body.matricula}' `
    const rows = await conn.dbConect(sql)
    // console.log(sql)
    // console.log(rows.recordset[0].total)
    // debugger
    if (rows.recordset.length) {
        // let totalBancoHoras = rows.recordset[0].total
        let positivo = rows.recordset[0].PI_QTDPOSI
        let negativo = rows.recordset[0].PI_QTDNEGA
        let saldo = rows.recordset[0].PI_SALDOHORAS
        if(positivo===null){
            positivo = 0.00
        } 
        if(negativo===null){
            negativo = 0.00
        } 
        if(saldo===null){
            saldo = 0.00
        } 
        return res.status(200).json({ auth: true, positivo, negativo, saldo });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});
//

routers.post('/login', async function(req, res) {
    const sql = `SELECT * FROM MAPA.dbo.USUARIOS WHERE email = '${req.body.email}' AND senha = '${req.body.senha}' `
    const rows = await conn.dbConect(sql)

    if (rows.recordset.length) {
        let dadosUser = rows.recordset[0]
        return res.status(200).json({ auth: true, dadosUser });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});

const blackList = [];
routers.post('/logout', function(req, res) {
        blackList.push(req.headers.authorization);
        res.json({ auth: false });
    })
    //rotas usuário


//rota dashboard
routers.get('/dashboard', function(req, res) {

    })
    
    //rota dashboard

//rotas de JUSTIFICATIVA - inicio

//INCLUIR A JUSTIFICATIVA
routers.post('/justificar', async function(req, res) {
    //console.log(req)
    const sql = `
                UPDATE DADOSADV.dbo.ZZR010 
                   SET ZZR_ABONO = '${req.body.motAbono}',  ZZR_JUSTIF = '${req.body.justificativa}',
                       ZZR_STATUS = 'A', ZZR_DTINTE = '${req.body.dataAbono}', ZZR_USER = '${req.body.usuario}'  
                WHERE D_E_L_E_T_='' AND ZZR_MAT = '${req.body.matricula}' AND ZZR_PERIOD = '${req.body.periodo}' 
                        AND ZZR_DTAPON = '${req.body.dtapontamento}' AND ZZR_PD = '${req.body.verba}'
                `
    console.log('zzr - ', sql)
    const rows = await connDadosadv.dbConect(sql)

    if (rows.rowsAffected.length) {
        return res.status(200).json({ auth: true });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});

routers.post('/qtsjustificados', async function(req, res) {
    console.log(req)
    const sql = `
                SELECT * FROM DADOSADV.dbo.ZZR010 
                WHERE D_E_L_E_T_='' AND ZZR_STATUS IN ('', 'I') AND ZZR_MAT = '${req.body.matricula}' AND ZZR_PERIOD = '${req.body.periodo}' 
                `
    const rows = await connDadosadv.dbConect(sql)

    if (rows.recordset.length) {
        return res.status(200).json({ retorno: 'maiorqzero' });
    } else if (rows.recordset.length === 0) {
        return res.status(200).json({ retorno: 'zero' });
    };
    conn.dbCloseConect();

});

routers.post('/justificarZZQ', async function(req, res) {
    console.log(req)
    const sql = `
                UPDATE DADOSADV.dbo.ZZQ010 
                   SET ZZQ_STATUS = '${req.body.status}'  
                WHERE D_E_L_E_T_='' AND ZZQ_MAT = '${req.body.matricula}' AND ZZQ_PERIOD = '${req.body.periodo}' 
                `
    const rows = await connDadosadv.dbConect(sql)
    console.log(sql)

    if (rows.rowsAffected.length) {
        return res.status(200).json({ auth: true });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect();

});


//alterar
routers.put('/atestado/:id', function(req, res) {
    atestadoController.salvar(req.body).then(result => {
        let mensagem = `Atestado de: - ${req.body.nome} alterado com sucesso`
        console.log(mensagem)
        res.json({
            status: 'INCLUIDO',
            mensagem
        })
    }).catch(erro => {
        res.json({
            status: "ERRO"
        })
    })
})

//excluir
routers.delete('/atestado/:id', function(req, res) {
        atestadoController.excluir(req.body).then(result => {
            let mensagem = `Atestado de: - ${req.body.id} excluido com sucesso`
            res.json({
                'status': 'EXCLUIDO',
                mensagem
            })
        }).catch(erro => {
            res.json({
                status: "ERRO"
            })
        })
    })
    
//listar todos funcionários, para aplicar atestados
routers.post('/funcionarios', async function(req, res) {
    let sql=''
    if(!!req.body.centrocusto){
        sql = `
        SELECT * FROM DADOSADV.dbo.SRA010    
        WHERE D_E_L_E_T_='' AND RA_SITFOLH <>'D' AND RA_FILIAL = '${req.body.filial}' AND RA_CC = '${req.body.centrocusto}' 
    `
    } else {
        sql = `
            SELECT * FROM DADOSADV.dbo.SRA010 
            WHERE D_E_L_E_T_='' AND RA_SITFOLH <>'D' AND RA_FILIAL = '${req.body.filial}'  
            `
    }
    const rows = await conn.dbConect(sql)
    // debugger
    if (rows.recordset.length) {
        let func = rows.recordset
        return res.status(200).json({ auth: true, func });
    } else {
        return res.status(200).json({ auth: false });
    };
    conn.dbCloseConect()

})
    
    //listart um por id do Cliente
routers.get('/atestado/:codCli', function(req, res) {
    atestadoController.listarPorId(req.params.codCli).then(res => {
        res.json({ res, status: "EXISTE" })
    }).catch(erro => {
        let messagem = erro.sqlMessage
        res.json({
            status: "ERRO",
            messagem
        })
    })
})

//rotas de atestado - final 

module.exports = routers