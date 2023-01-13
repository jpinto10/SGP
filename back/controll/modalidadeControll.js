const conn = require('../utils/db');
const path = require('path');
const mysql = require('mysql2');

module.exports = {
    //metodos
    renderizar(req, res, error, sucess){
        res.render('/modalidade', { 
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
                console.log(fields)
                query = `
                UPDATE modalidade 
                    SET descricao = ?
                WHERE ID = ?    
            `;
                parametros = [fields.descricao, 
                    fields.id
                ];
            } else {
                console.log(fields)
                query = `
                    INSERT INTO modalidade (codigo, descricao  ) 
                    VALUES (?, ?)
                `;
                    parametros = [
                        fields.codigo, 
                        fields.descricao
                    ];
            };
            conn.query(query, parametros, (err, results)=>{
                console.log(results)
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
                query = ` DELETE from modalidade WHERE id = ? `;
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
            conn.query(`SELECT * FROM modalidade `, (erro, result)=>{
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
            conn.query(`SELECT * FROM modalidade WHERE id = ? `, [id]),
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
            query = `SELECT * FROM modalidade WHERE codigo = ? `
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
            conn.query(`SELECT * FROM modalidade WHERE descricao LIKE '% ? %' `, [nome]),
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