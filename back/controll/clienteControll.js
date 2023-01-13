const conn = require('../utils/db');
const path = require('path');
const mysql = require('mysql2');

module.exports = {
    //metodos
    renderizar(req, res, error, sucess){
        res.render('/clientes', { 
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

            if(parseInt(fields.id) > 0){
                query = `
                UPDATE clientes 
                SET nome = ?, 
                    email = ?, 
                    responsavelfinanceiro = ?, 
                    dtpagamento = ?, 
                    fone = ?
                WHERE ID = ?    
            `;
                parametros = [fields.nome, 
                    fields.email,
                    fields.responsavelfinanceiro, 
                    fields.dtpagamentoCliente, 
                    fields.fone, 
                    fields.id
                ];
            } else {
                query = `
                    INSERT INTO clientes (codigo, nome, email, responsavelfinanceiro, dtentrada, valorContrato, fone, dtultimopagamento, dtpagamento  ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                    parametros = [
                        fields.codigo, 
                        fields.nome, 
                        fields.email, 
                        fields.responsavelfinanceiro,
                        dtinclusao,
                        fields.valorcontrato,
                        fields.fone,
                        fields.dtultimopagamento,
                        fields.dtpagamentoCliente
                    ];
            };
            conn.query(query, parametros, (err, results)=>{
                if(err){
                    console.log("erro " + err)
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
                query = ` DELETE from clientes WHERE id = ? `;
                parametros = [fields.id];
            }
            conn.query(query, parametros, (err, results)=>{
                console.log(query)
                if(err){
                    console.log(err)
                    reject(err);
                }else {
                    resolve(results)
                }
            });

        });
    },

    listarTodos(){
        return new Promise( ( resolv, reject ) =>{
            conn.query(`SELECT * FROM clientes WHERE dtsaida is null `, (erro, result)=>{
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
            conn.query(`SELECT * FROM clientes WHERE dtsaida = '' AND id = ? `, [id]),
            (erro, result)=>{
                if(erro){
                    reject(erro);
                } else {
                    resolve(result);
                }
            }
        });
    },

    ListarPorNome(nome){
        return new Promise( (resolve, rejecte)=>{
            conn.query(`SELECT * FROM clientes WHERE dtsaida = '' and NOME LIKE '% ? %' `, [nome]),
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