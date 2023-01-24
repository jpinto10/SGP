const sql = require('mssql')

//CASA
const config = "Server=192.168.100.71;Database=SGP;User Id=sa;Password=sa;encrypt=false";

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
            return result;
        } catch (err) {
            console.error('SQL error', err);
        }
    },
    dbCloseConect() {
        pool1.close()
    }

}
