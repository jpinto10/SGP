var conn = require('../utils/db');
var mysql = require('mysql2');
var path = require('path');

module.exports = {

    //metodo para listagem de usuários
    ListUsers(){
        return new Promise((resolve, reject)=>{
            conn.query(`
                SELECT * FROM usuarios WHERE ativo = 'SIM' OR ativo = '';
            `, (erro, results) =>{
                if (erro){
                    reject(erro);
                }else{
                    resolve(results);
                }
            } )
        })
    },

    //metodo de renderizar
    renderizar(req, res, error, sucess){
        res.render('admin/login', { 
            title: 'SGP - Construtora',
            body: req.body,
            error:error,
            sucess:sucess
        });

    },
    
    //metodo
    // login(email, senha){
    //     //console.log("01 - " + email + " - senha: " + senha)
    //     return new Promise((resolve, reject)=>{
    //         conn.query(`
    //         SELECT * FROM WHERE email = ?           
    //         `, [ email ], (error, results)=>{                
    //             if(error){
    //                 reject(error);
    //             }else{
    //                 if(!results.length > 0){                       
    //                     reject("userContoll.js - Linha:44 - Usuário ou senhas incorretos");
    //                 }else{
    //                     let row = results[0];
    //                     if(row.senha !== senha){
    //                         reject("userControl.js - Linha:48 - Usuário ou senhas incorretos")
    //                     }else{
    //                         resolve(row);
    //                     }

    //                 }
    //             }

    //         } );
    //     });
    // }, 

    login(email, senha){
        let resLog
        return (
            resLog =  conn.execSqlquery('SELECT * FROM SGP.dbo.USUARIOS', resLog)
        )
    },

    save(fields){

        return new Promise((resolve, reject)=>{
            //console.log('linha 62 - userControl.js ', fields.senha.length );
            dtinclusao = new Date();  //data atual
            bloq = 'SIM';
            let query, parametros;
            if ( parseInt(fields.id) > 0 && (fields.senha).length === 0) {
                query = `
                UPDATE usuarios 
                SET nome = ?, 
                    usuario = ?, 
                    senha = ?, 
                    foto = ? 
                WHERE ID = ?    
            `;
                parametros = [fields.nome, 
                    fields.usuario, 
                    fields.senha, 
                    fields.id
                ];

            } else if ( parseInt(fields.id) > 0 && (fields.senha).length > 0) {

                if (fields.senha !== fields.passwordConfirm){
                    reject('Senhas Diferentes');
                }else{
                    query =`UPDATE users SET senha = ? WHERE ID = ?`;
                    parametros = [ fields.senha, fields.id ]
                }

            } else {
                // //caso não tenha foto, escolhe padrão
                // if((files.foto.nome).length === 0){
                //     imagens = `/admin/dist/images/user.png`;
                // }else{
                //     imagens = `/admin/dist/images/${path.parse(files.foto.path).base}`;
                // }
                query =`
                        INSERT INTO users (nome, usuario, senha, dtinclusao, ativo ) 
                        VALUES (?, ?, ?, ?, ?)
                    `; 
                parametros = [fields.nome, 
                        fields.usuario, 
                        fields.senha, 
                        dtinclusao,
                        bloq
                    ]
            };
            conn.query(query, parametros, (err, results)=>{
                if(err){
                    reject(err);
                }else {
                    resolve(results)
                }
            });
        });
    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`DELETE FROM usuarios WHERE ID = ?`, 
            [id], 
            (err, results)=>{
                if(err){
                    reject(err);
                }else {
                    resolve(results)
                }
            });

        })

    }

}