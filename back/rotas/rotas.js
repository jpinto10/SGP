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
        const rows1 = await conn.dbConect(sql1)
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
        const sql = `SELECT * FROM FORNECEDOR WHERE DELETADO = '' ORDER BY CODIGO, DESCRICAO `
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
        
        const sql0 = `SELECT COUNT(id) as item FROM FORNECEDOR WHERE cnpj = '${_CNPJ}' `
        const rows0 = await conn.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
           
            const _DESCRICAO        = req.body.descricao 
            const _FONE             = req.body.fone
            const _EMAIL            = req.body.email
            const _ENDERECO         = req.body.endereco
            const _CONTATO          = req.body.contato
        
            const sql1 = `SELECT MAX(id) as item FROM FORNECEDOR `
            const rows1 = await conn.dbConect(sql1)
            const _ID = rows1.recordset[0].item + 1
            
            if(req.body.codigo){
                _CODIGO = req.body.codigo
            }else {
                const segCodigo = '000000'
                const _CODIGO = segCodigo.slice(6-length(_ID)) + _ID
            }

            const sql = `INSERT INTO FORNECEDOR(CODIGO, CNPJ, DESCRICAO, FONE, EMAIL, ENDERECO, CONTATO, DELETADO ) VALUES(
                '${_CODIGO}', '${_CNPJ}', '${_DESCRICAO}', '${_FONE}', '${_EMAIL}', '${_ENDERECO}', '${_CONTATO}', '') `
            const rows = await conn.dbConect(sql)

            if (rows.rowsAffected.length) {
                return res.status(200).json({ auth: true  });
            } else {
                return res.status(200).json({ auth: false });
            };
        } else {
            const _DESCRICAO        = req.body.descricao 
            const _FONE             = req.body.fone
            const _EMAIL            = req.body.email
            const _ENDERECO         = req.body.endereco
            const _CONTATO          = req.body.contato
            
            const sql = `UPDATE FORNECEDOR SET 
                CNPJ            = '${_CNPJ}', 
                CPF             = '${_CNPJ}',
                DESCRICAO       = '${_DESCRICAO}',
                FONE            = '${_FONE}',
                EMAIL           = '${_EMAIL}',
                ENDERECO        = '${_ENDERECO}',
                CONTATO         = '${_CONTATO}'
                WHERE cnpj = '${_CNPJ}' `
            const rows = await conn.dbConect(sql)
            if (rows.rowsAffected.length) {
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
        
        const sql0 = `SELECT COUNT(id) as item FROM FORNECEDOR WHERE cnpj = '${_CNPJ}' `
        const rows0 = await conn.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
            return res.status(200).json({ auth: false });
        } else {
            const sql = `UPDATE FORNECEDOR SET 
                DELETADO        = '*' 
                WHERE cnpj = '${_CNPJ}' `
            const rows = await conn.dbConect(sql)
            if (rows.rowsAffected.length) {
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


    //-------------------
    //CLIENTE - INICIO
    //-------------------
    routers.post('/pegacodigocliente', async function(req, res) {
        const sql1 = `SELECT MAX(id) as item FROM SGP.dbo.cliente `
        const rows1 = await conn.dbConect(sql1)
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

    routers.post('/cliente', async function(req, res) {
        const sql = `SELECT * FROM cliente WHERE DELETADO = '' ORDER BY CODIGO, DESCRICAO `
        const rows = await conn.dbConect(sql)

        if (rows.recordset.length) {
            let dadoscliente = rows.recordset
            return res.status(200).json({ auth: true, dadoscliente });
        } else {
            return res.status(200).json({ auth: false });
        };
        conn.dbCloseConect();

    });

    //inc alt cliente - inclui e eltera cliente
    routers.post('/incaltcliente', async function(req, res) {
        //MONTAGE DOS DADOS PARA GRAVAÇÃO 
        const _CNPJ = req.body.cnpj
        
        const sql0 = `SELECT COUNT(id) as item FROM cliente WHERE cnpj = '${_CNPJ}' `
        const rows0 = await conn.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
           
            const _DESCRICAO        = req.body.descricao 
            const _FONE             = req.body.fone
            const _EMAIL            = req.body.email
            const _ENDERECO         = req.body.endereco
            const _CONTATO          = req.body.contato
        
            const sql1 = `SELECT MAX(id) as item FROM cliente `
            const rows1 = await conn.dbConect(sql1)
            const _ID = rows1.recordset[0].item + 1
            
            if(req.body.codigo){
                _CODIGO = req.body.codigo
            }else {
                const segCodigo = '000000'
                const _CODIGO = segCodigo.slice(6-length(_ID)) + _ID
            }

            const sql = `INSERT INTO cliente(CODIGO, CNPJ, DESCRICAO, FONE, EMAIL, ENDERECO, CONTATO, DELETADO ) VALUES(
                '${_CODIGO}', '${_CNPJ}', '${_DESCRICAO}', '${_FONE}', '${_EMAIL}', '${_ENDERECO}', '${_CONTATO}', '') `
            const rows = await conn.dbConect(sql)

            if (rows.rowsAffected.length) {
                return res.status(200).json({ auth: true  });
            } else {
                return res.status(200).json({ auth: false });
            };
        } else {
            const _DESCRICAO        = req.body.descricao 
            const _FONE             = req.body.fone
            const _EMAIL            = req.body.email
            const _ENDERECO         = req.body.endereco
            const _CONTATO          = req.body.contato
            
            const sql = `UPDATE cliente SET 
                CNPJ            = '${_CNPJ}', 
                CPF             = '${_CNPJ}',
                DESCRICAO       = '${_DESCRICAO}',
                FONE            = '${_FONE}',
                EMAIL           = '${_EMAIL}',
                ENDERECO        = '${_ENDERECO}',
                CONTATO         = '${_CONTATO}'
                WHERE cnpj = '${_CNPJ}' `
            const rows = await conn.dbConect(sql)
            if (rows.rowsAffected.length) {
                return res.status(200).json({ auth: true });
            } else {
                return res.status(200).json({ auth: false });
            };
            
        }
        conn.dbCloseConect();

    });

    routers.post('/exccliente', async function(req, res) {
        //MONTAGE DOS DADOS PARA GRAVAÇÃO 
        const _CNPJ = req.body.cnpj
        const _CPF = req.body.cpf
        
        const sql0 = `SELECT COUNT(id) as item FROM cliente WHERE cnpj = '${_CNPJ}' `
        const rows0 = await conn.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
            return res.status(200).json({ auth: false });
        } else {
            const sql = `UPDATE cliente SET 
                DELETADO        = '*' 
                WHERE cnpj = '${_CNPJ}' `
            const rows = await conn.dbConect(sql)
            if (rows.rowsAffected.length) {
                return res.status(200).json({ auth: true });
            } else {
                return res.status(200).json({ auth: false });
            };
        };
        conn.dbCloseConect();
    });
    //-------------------
    //CLIENTE - FINAL
    //-------------------



    //-------------------
    //PRODUTO - INICIO
    //-------------------
    routers.post('/pegacodigoproduto', async function(req, res) {
        const sql1 = `SELECT MAX(id) as item FROM SGP.dbo.produto `
        const rows1 = await conn.dbConect(sql1)
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

    routers.post('/produto', async function(req, res) {
        const sql = `SELECT * FROM produto WHERE DELETADO = '' ORDER BY CODIGO, DESCRICAO `
        const rows = await conn.dbConect(sql)

        if (rows.recordset.length) {
            let dadosproduto = rows.recordset
            return res.status(200).json({ auth: true, dadosproduto });
        } else {
            return res.status(200).json({ auth: false });
        };
        conn.dbCloseConect();

    });

    //inc alt produto - inclui e eltera produto
    routers.post('/incaltproduto', async function(req, res) {
        //MONTAGE DOS DADOS PARA GRAVAÇÃO 
        const _CODIGO = req.body.codigo
        
        const sql0 = `SELECT COUNT(id) as item FROM produto WHERE codigo = '${_CODIGO}' `
        const rows0 = await conn.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
           
            const _DESCRICAO        = req.body.descricao 
            const _UNIDADEDEMEDIDA  = req.body.unidademedida
            const _FONE             = req.body.fone
            const _CONTATO          = req.body.contato
            const _RESPONSAVEL      = req.body.responsavel
            const _ALMOXARIFADO     = req.body.almoxarifado
        
            const sql1 = `SELECT MAX(id) as item FROM produto `
            const rows1 = await conn.dbConect(sql1)
            const _ID = rows1.recordset[0].item + 1
            
            if(!req.body.codigo){
                const segCodigo = '000000'
                const _CODIGO = segCodigo.slice(6-length(_ID)) + _ID
            }

            const sql = `INSERT INTO produto(CODIGO, UNIDADEMEDIDA, DESCRICAO, FONE, ALMOXARIFADO, CONTATO, RESPONSAVEL, DELETADO ) VALUES(
                '${_CODIGO}', '${_UNIDADEDEMEDIDA}', '${_DESCRICAO}', '${_FONE}', '${_ALMOXARIFADO}', '${_CONTATO}', '${_RESPONSAVEL}', '') `
            const rows = await conn.dbConect(sql)

            if (rows.rowsAffected.length) {
                return res.status(200).json({ auth: true  });
            } else {
                return res.status(200).json({ auth: false });
            };
        } else {

            const _FONE             = req.body.fone
            const _UNIDADEDEMEDIDA  = req.body.unidademedida
            const _CONTATO          = req.body.contato
            const _RESPONSAVEL      = req.body.responsavel
            const _ALMOXARIFADO     = req.body.almoxarifado                   
            const _DESCRICAO        = req.body.descricao 
            
            const sql = `UPDATE produto SET 
                DESCRICAO       = '${_DESCRICAO}',
                FONE            = '${_FONE}',
                RESPONSAVEL     = '${_RESPONSAVEL}',
                ALMOXARIFADO    = '${_ALMOXARIFADO}',
                CONTATO         = '${_CONTATO}',
                UNIDADEMEDIDA   = '${_UNIDADEDEMEDIDA}'
                WHERE codigo = '${_CODIGO}' `
            const rows = await conn.dbConect(sql)
            if (rows.rowsAffected.length) {
                return res.status(200).json({ auth: true });
            } else {
                return res.status(200).json({ auth: false });
            };
            
        }
        conn.dbCloseConect();

    });

    routers.post('/excproduto', async function(req, res) {
        //MONTAGE DOS DADOS PARA GRAVAÇÃO 
        const _CNPJ = req.body.cnpj
        const _CPF = req.body.cpf
        
        const sql0 = `SELECT COUNT(id) as item FROM produto WHERE codigo = '${_CODIGO}' `
        const rows0 = await conn.dbConect(sql0)
        const _temFornece = rows0.recordset[0].item
    
        if (_temFornece === 0) {
            return res.status(200).json({ auth: false });
        } else {
            const sql = `UPDATE produto SET 
                DELETADO        = '*' 
                WHERE cnpj = '${_CNPJ}' `
            const rows = await conn.dbConect(sql)
            if (rows.rowsAffected.length) {
                return res.status(200).json({ auth: true });
            } else {
                return res.status(200).json({ auth: false });
            };
        };
        conn.dbCloseConect();
    });
    //-------------------
    //PRODUTO - FINAL
    //-------------------



    const blackList = [];
    routers.post('/logout', function(req, res) {
            blackList.push(req.headers.authorization);
            res.json({ auth: false });
    })

module.exports = routers