const sql = require('mssql')

//FREITAS
const config = "Server=172.30.0.112;Database=DADOSADV;User Id=sa;Password=f431T@s@#2022;encrypt=false;";

//CASA
//const config = "Server=localhost;Database=DADOSADV;User Id=sa;Password=freit@s@2015;encrypt=false;";

// async/await style:
const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect();
let query = '';

module.exports = {
    async dbConect(query) {
        pool1Connect;
        try {
            const request = await pool1.request(); // or: new sql.Request(pool1)
            const result = await request.query(query)
            // console.log('deu certo')
            return result;
        } catch (err) {
            console.error('SQL error', err);
        }
    },
    dbCloseConect() {
        pool1.close()
    }

}
