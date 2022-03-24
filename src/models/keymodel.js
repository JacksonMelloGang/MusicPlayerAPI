import sql from "../database/";

function getApiKeys(callback) {
    var query = "SELECT * FROM `apikey`;";
    sql.query(query, function(err, results) {
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, results);
    });
}

function getKeyId(key, callback){
    var query = "SELECT * FROM `apikey` WHERE `key`=?";
    sql.query(query, key, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].id);
    })
}

function getKey(keyid, callback){
    var query = "SELECT key FROM `apikey` WHERE `id`=?";
    sql.query(query, key, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].key);
    })
}

function isMasterkey(key, callback){
    var query = "SELECT ismasterkey FROM `apikey` WHERE `key`=?";
    sql.query(query, key, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].ismasterkey);
    })    
}