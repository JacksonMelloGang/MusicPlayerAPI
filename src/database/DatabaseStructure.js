var pool = require('./index');

function DropTable(p_tname){
    pool.query("DROP TABLE IF EXISTS " + p_tname, function(err, result){
        if(err) return console.log("Couldn't delete table: " + err.message);
        console.log("Deleted table: " + result)
    });
}
