const conn = require('../utils/db');
const path = require('path');
const mysql = require('mysql2');

module.exports = {
    //metodos
    renderizar(req, res, error, sucess){
        res.render('/ctasreceber', { 
            title: 'SGP - Academia',
            body: req.body,
            error:error,
            sucess:sucess
        });

    },
    salvar(fields){
        return new Promise( (resolve, reject)=>{
            dtinclusao = new Date();  //data atual
            let query, parametros;

            if(parseInt(fields.idAluno) > 0){
                console.log(fields)
                query = `
                UPDATE ctasreceber 
                    SET dtVencimento = ?, historico = ?
                WHERE ID = ?    
            `;

                //validações das informações
                let dtPagamento = ''
                if(fields.dtPagamento !== 'null' && fields.dtPagamento !== '' && fields.dtPagamento !== ''){
                    dtPagamento = fields.dtPagamento
                } else {
                    dtPagamento = null
                }
                let vlrAcrescimo = ''
                if(fields.vlrAcrescimo !== 'null' && fields.vlrAcrescimo !== '' && fields.vlrAcrescimo !== ''){
                    vlrAcrescimo = fields.vlrAcrescimo
                } else {
                    vlrAcrescimo = '0.00'
                }

                let vlrDesconto = ''
                if(fields.vlrDesconto !== 'null' && fields.vlrDesconto !== '' && fields.vlrDesconto !== ''){
                    vlrDesconto = fields.vlrDesconto
                } else {
                    vlrDesconto = '0.00'
                }

                let chistorico = ''
                if(fields.historico !== 'null' && fields.historico !== '' && fields.historico !== ''){
                    chistorico = fields.historico
                } else {
                    chistorico = ''
                }

                parametros = [
                    fields.dtvencimento,
                    chistorico, 
                    fields.idAluno
            ];

            } else {

                //validações das informações
                let dtPagamento = ''
                if(fields.dtPagamento !== 'null' && fields.dtPagamento !== '' && fields.dtPagamento !== ''){
                    dtPagamento = fields.dtPagamento
                } else {
                    dtPagamento = null
                }
                let vlrAcrescimo = ''
                if(fields.vlrAcrescimo !== 'null' && fields.vlrAcrescimo !== '' && fields.vlrAcrescimo !== ''){
                    vlrAcrescimo = fields.vlrAcrescimo
                } else {
                    vlrAcrescimo = '0.00'
                }

                let vlrDesconto = ''
                if(fields.vlrDesconto !== 'null' && fields.vlrDesconto !== '' && fields.vlrDesconto !== ''){
                    vlrDesconto = fields.vlrDesconto
                } else {
                    vlrDesconto = '0.00'
                }

                let chistorico = ''
                if(fields.historico !== 'null' && fields.historico !== '' && fields.historico !== ''){
                    chistorico = fields.historico
                } else {
                    chistorico = ''
                }


                query = `
                    INSERT INTO ctasreceber (codCliente, nomeCliente, dtEmissao, dtVencimento, historico,  
                                             parcela, saldo, TipoPagamento, valorPago, vlrAcrescimo, vlrDesconto  ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                    parametros = [
                        fields.codigo, 
                        fields.nome,
                        fields.dtEmissao,
                        fields.dtvencimento,
                        chistorico, 
                        fields.parcela, 
                        fields.valorTitulo,
                        fields.tipoPagamento, 
                        fields.valorTitulo,
                        vlrAcrescimo, 
                        vlrDesconto
                    ];
            };
            conn.query(query, parametros, (err, results)=>{
                console.log(query + " " + parametros)
                console.log(results)
                console.log(err + "00")
                if(err){
                    reject(err);
                }else {
                    resolve(results)
                }
            });
        });
    },

    Baixar(fields){
        return new Promise( (resolve, reject)=>{
            dtinclusao = new Date();  //data atual
            let query, parametros;

            if(parseInt(fields.id) > 0){
                console.log(fields + ' baixar')
                query = `
                UPDATE ctasreceber 
                    SET historico = ?, dtPagamento = ?, TipoPagamento = ?, vlrAcrescimo = ?, vlrDesconto = ?, 
                    saldo = ?
                WHERE ID = ?    
            `;

                //validações das informações
                let dtPagamento = ''
                if(fields.dtPagamento !== 'null' && fields.dtPagamento !== '' && fields.dtPagamento !== ''){
                    dtPagamento = fields.dtPagamento
                } else {
                    dtPagamento = null
                }
                let vlrAcrescimo = ''
                if(fields.vlrAcrescimo !== 'null' && fields.vlrAcrescimo !== '' && fields.vlrAcrescimo !== ''){
                    vlrAcrescimo = fields.vlrAcrescimo
                } else {
                    vlrAcrescimo = '0.00'
                }

                let vlrDesconto = ''
                if(fields.vlrDesconto !== 'null' && fields.vlrDesconto !== '' && fields.vlrDesconto !== ''){
                    vlrDesconto = fields.vlrDesconto
                } else {
                    vlrDesconto = '0.00'
                }

                let chistorico = ''
                if(fields.historico !== 'null' && fields.historico !== '' && fields.historico !== ''){
                    chistorico = fields.historico
                } else {
                    chistorico = ''
                }

                parametros = [
                    chistorico, 
                    dtPagamento, 
                    fields.tipoPagamento, 
                    vlrAcrescimo, 
                    vlrDesconto,
                    0,
                    fields.id
                ];

            } 
            conn.query(query, parametros, (err, results)=>{
                console.log(query + " " + parametros)
                console.log(results)
                console.log(err + "00")
                if(err){
                    reject(err);
                }else {
                    resolve(results)
                }
            });
        });
    },    
    
    excluir(fields){
        return new Promise( (resolve, reject)=>{
            let query, parametros;

            if(parseInt(fields.id) > 0){
                console.log(fields)
                query = ` DELETE from ctasreceber WHERE id = ? `;
                parametros = [fields.id];
            }
            conn.query(query, parametros, (err, results)=>{
                console.log(query)
                if(err){
                    console.log(err)
                    reject(err);
                }else {
                    console.log(results)
                    resolve(results)
                }
            });
        });
    },

    listarTodos(){
        return new Promise( ( resolv, reject ) =>{
            conn.query(`SELECT * FROM ctasreceber `, (erro, result)=>{
                if(erro){
                    reject(erro);
                } else{
                    resolv(result);
                }
            })
        })
    }, 

    listarPorId(id){
        return new Promise( (resolve, reject)=>{
            conn.query(`SELECT * FROM ctasreceber WHERE id = ? `, [id]),
            (erro, result)=>{
                if(erro){
                    reject(erro);
                } else {
                    resolve(result);
                }
            }
        });
    },

    listarPorCodigo(codigo){
        return new Promise( (resolve, reject)=>{
            let query, parametros;
            query = `SELECT * FROM ctasreceber WHERE codigo = ? `
            parametros = [codigo]
            conn.query(query, parametros, (erro, result)=>{
                if(erro){
                    reject(erro);
                } else {
                    resolve("CODIGO JA EXISTE");
                }
            })
        })
    },

    ListarPorNome(nome){
        return new Promise( (resolve, rejecte)=>{
            conn.query(`SELECT * FROM ctasreceber WHERE descricao LIKE '% ? %' `, [nome]),
            (erro, resulte)=>{
                if(erro){
                    rejecte(erro);
                } else {
                    resolve(resulte);
                }
            }
        } )

    }

}