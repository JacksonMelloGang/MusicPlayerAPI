var config = require('../.env');
const sql = require('mysql');

var config = {
    "host": process.env.databasehost,
    "user": process.env.databaseuser,
    "password": process.env.databasepassword,
    "dbname": process.env.databasename,
}

var pool = sql.createPool({
    connectionLimit: 100,
    timeout: 10000,
    host: config.host,
    user: config.user,
    password: config.password,
    dbname: config.dbname
})

module.exports = pool;