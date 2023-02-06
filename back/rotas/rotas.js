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

const blackList = [];
routers.post('/logout', function(req, res) {
        blackList.push(req.headers.authorization);
        res.json({ auth: false });
})

module.exports = routers