const conn = require('../utils/db');
const path = require('path');
const mysql = require('mysql2');

module.exports = {

    renderizar(req, res, error, sucess){
        res.render('/atestado', {   
            title: 'SGP - Academia',
            body: req.body,
            error:error,
            sucess:sucess
        });

    },
    
    salvar(fields){
        return new Promise( (resolve, reject)=>{
            // debugger
            let img = ''
            let cValido = ''
            if (fields.imagem){
                img = fields.imagem;
            } else {
                img = 'teste.png';
            }

            if  (fields.valido){
                cValido = fields.valido
            } else{
                cValido = 'SIM'
            }
            dtInclusao = new Date();  //data atual
            let query, parametros;

            if(parseInt(fields.id) > 0){
                query = `
                UPDATE ATESTADO 
                SET valido = ?, nomeCliente = ?
                WHERE ID = ?    
            `;
                parametros = [
                    fields.valido,
                    fields.nomeCliente,
                    fields.id

                ];
            } else {
                query = `
                    INSERT INTO ATESTADO (codCliente, nomeCliente, nomeMedico, imagem, valido, dtInclusao ) 
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                    parametros = [
                        fields.codCliente, 
                        fields.nomeCliente, 
                        fields.nomeMedico, 
                        img,
                        cValido,
                        dtInclusao
                    ];
            };
            conn.query(query, parametros, (err, results)=>{
                //console.log("query - " + query)
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
                query = ` DELETE from ATESTADO WHERE id = ? `;
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
            conn.query(`SELECT DATE_FORMAT(STR_TO_DATE(dtinclusao, '%Y-%m-%d'), '%d/%m/%Y') as dtInclusao, valido, codcliente, nomeCliente, id FROM atestado`, (erro, result)=>{
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
            conn.query(`SELECT * FROM ATESTADO WHERE AND id = ? `, [id]),
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
            conn.query(`SELECT * FROM ATESTADO WHERE and nomeCliente LIKE '% ? %' `, [nome]),
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