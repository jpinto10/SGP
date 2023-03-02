const conn = require('../utils/db');
const express = require('express');
const routers = express.Router();
const cors = require('cors');
const SECRET = 'SGPCONSULT';

    routers.get('/', function(req, res) {
        let resposta = { msg: 'usuário ' + req.id + " - " + req.nome + ' fez a requisição..' };
        res.send(resposta);
    });

    routers.post('/login', async function(req, res) {
        const sql = `SELECT * FROM SGP.dbo.USUARIOS WHERE usuario = '${req.body.usuario}' AND senha = '${req.body.senha}' AND ativo = 'SIM' `
        const rows = await conn.dbConect(sql)

        if (rows.recordset.length) {
            let dadosUser = rows.recordset[0]
            return res.status(200).json({ auth: true, dadosUser });
        } else {
            return res.status(200).json({ auth: false });
        };
        conn.dbCloseConect();

    });


    //-------------------
    //FORNECEDOR - INICIO
    //-------------------
    routers.post('/pegacodigofornecedor', async function(req, res) {
        const sql1 = `SELECT MAX(id) as item FROM SGP.dbo.FORNECEDOR `
        const rows1 = await connDadosadv.dbConect(sql1)
        const _ID = rows1.recordset[0].item + 1
        
        const segCodigo = '000000'
        const _CODIGO = segCodigo.slice(6-length(_ID)) + _ID

        if (_CODIGO.length) {
            return res.status(200).json({ auth: true, _CODIGO });
        } else {
            return res.status(200).json({ auth: false });
        };
        conn.dbCloseConect();

    });

    routers.post('/fornecedor', async function(req, res) {
        const sql = `SELECT * FROM FORNECEDOR WHERE DELETADO = '' `
        const rows = await conn.dbConect(sql)

        if (rows.recordset.length) {
            let dadosFornecedor = rows.recordset
            return res.status(200).json({ auth: true, dadosFornecedor });
        } else {
            return res.status(200).json({ auth: false });
        };
        conn.dbCloseConect();

    });

    //inc alt fornecedor - inclui e eltera fornecedor
    routers.post('/incaltfornecedor', async function(req, res) {
        //MONTAGE DOS DADOS PARA GRAVAÇÃO 
        const _CNPJ = req.body.cnpj
        const _CPF = req.body.cpf
        
        const sql0 = `SELECT COUNT(id) as item FROM SGP.dbo.FORNECEDOR WHERE cnpj = '${_CNPJ}' or  cpf = '${_CPF}' `
        const rows0 = await connDadosadv.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
           
            const _DESCRICAO        = req.body.descricao 
            const _FONE             = req.body.fone
            const _EMAIL            = req.body.email
            const _ENDERECO         = req.body.endereco
        
            const sql1 = `SELECT MAX(id) as item FROM SGP.dbo.FORNECEDOR `
            const rows1 = await connDadosadv.dbConect(sql1)
            const _ID = rows1.recordset[0].item + 1
            
            const segCodigo = '000000'
            const _CODIGO = segCodigo.slice(6-length(_ID)) + _ID

            const sql = `INSERT INTO SGP.dbo.FORNECEDOR(ID, CODIGO, CNPJ, CPF, DESCRICAO, FONE, EMAIL, ENDERECO ) VALUES(
                ${_ID}, ${_CODIGO}, ${_CNPJ}, ${_CPF}, ${_DESCRICAO}, ${_FONE}, ${_EMAIL}, ${_ENDERECO}) `
            const rows = await conn.dbConect(sql)

            if (rows.recordset.length) {
                let dadosFornecedor = rows.recordset[0]
                return res.status(200).json({ auth: true  });
            } else {
                return res.status(200).json({ auth: false });
            };
        } else {
            const _DESCRICAO        = req.body.descricao 
            const _FONE             = req.body.fone
            const _EMAIL            = req.body.email
            const _ENDERECO         = req.body.endereco
            
            const sql = `UPDATE SGP.dbo.FORNECEDOR SET 
                CNPJ            = ${_CNPJ}, 
                CPF             = ${_CPF},
                DESCRICAO       = ${_DESCRICAO},
                FONE            = ${_FONE},
                EMAIL           = ${_EMAIL},
                ENDERECO        = ${_ENDERECO} `
            const rows = await conn.dbConect(sql)
            if (rows.recordset.length) {
                let dadosFornecedor = rows.recordset[0]
                return res.status(200).json({ auth: true });
            } else {
                return res.status(200).json({ auth: false });
            };
            
        }
        conn.dbCloseConect();

    });

    routers.post('/excfornecedor', async function(req, res) {
        //MONTAGE DOS DADOS PARA GRAVAÇÃO 
        const _CNPJ = req.body.cnpj
        const _CPF = req.body.cpf
        
        const sql0 = `SELECT COUNT(id) as item FROM SGP.dbo.FORNECEDOR WHERE cnpj = '${_CNPJ}' or  cpf = '${_CPF}' `
        const rows0 = await connDadosadv.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
            return res.status(200).json({ auth: false });
        } else {
            const sql = `UPDATE SGP.dbo.FORNECEDOR SET 
                DELETADO        = '*' `
            const rows = await conn.dbConect(sql)
            if (rows.recordset.length) {
                let dadosFornecedor = rows.recordset[0]
                return res.status(200).json({ auth: true });
            } else {
                return res.status(200).json({ auth: false });
            };
        };
        conn.dbCloseConect();
    });
    //-------------------
    //FORNECEDOR - FINAL
    //-------------------

    const blackList = [];
    routers.post('/logout', function(req, res) {
            blackList.push(req.headers.authorization);
            res.json({ auth: false });
    })

module.exports = routers