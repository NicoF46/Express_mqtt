var Pool = require('pg').Pool
const config = require("./../../config");
const DB_ENV = config.services.DATABASE.POSTGRES;
console.log(DB_ENV);
var pool = new Pool({
    host: DB_ENV.HOST,
    user: DB_ENV.USERNAME,
    password: DB_ENV.PASSWORD,
    database: DB_ENV.DBNAME,
    port: DB_ENV.PORT
})

pool.connect((err, connection) => {
    console.log("Iniciando la conexion con la base de datos ");
    if (err) {
        console.error('Ha ocurrido un error no esperado en la conexion con la base de datos');
        if (connection) {
            connection.release();
        }
        return;
    }
    console.log("Se ha creado la conexion hacia la base de datos correctamente")
});
module.exports = pool;
