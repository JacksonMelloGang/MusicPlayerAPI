var config = require('../../.env');
const sql = require('mysql');

var config = {
    "host": process.env.databasehost,
    "user": process.env.databaseuser,
    "password": process.env.databasepassword,
    "dbname": process.env.databasename,
}

var pool = sql.createPool({
    connectionLimit: 100,
    timeout: 1000,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.dbname
});

pool.getConnection(function(err, pool){
    
    if(err){
        console.error("Couldn't connect to the database: ", err.code);
        console.error("__________________________________________________");
        console.error("Complete Stacktrack:\n", err);
        process.exit(-1);
    }
});

module.exports = pool;