import sql from "../../database/";

function getApiKeys(callback) {
    var query = "SELECT * FROM `apikey`;";
    sql.query(query, function(err, result) {
        if(err) return callback(err.code, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result);
    });
}

function getKeyId(key, callback){
    var query = "SELECT * FROM `apikey` WHERE `key`=?";
    sql.query(query, [key], function(err, result){
        if(err) return callback(err.code, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].id);
    })
}

function getKeyInfo(key, callback){
    var query = "SELECT * FROM `apikey` WHERE `key`=?";
    sql.query(query, [key], function(err, result){
        if(err) return callback(err.code, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result);
    });
}

function getKey(keyid, callback){
    var query = "SELECT `key` FROM `apikey` WHERE `id`=?";

    sql.query(query, [keyid], function(err, result){
        if(err) return callback(err.code, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].key);
    })
}

function isMasterkey(key, callback){
    var query = "SELECT ismasterkey FROM `apikey` WHERE `key`=?";
    sql.query(query, [key], function(err, result){
        if(err) return callback(err.code, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        // if result is 1, then set mk to true otherwise set to false
        var mk = result[0].ismasterkey == 1 ? true : false; 

        return callback(null, mk);
    })    
}

function DeleteKey(key, callback){
    var query = "DELETE FROM `apikey` WHERE `key`=?";
    sql.query(query, [key], function(err, result){
        if(err) return callback(err.code, null);

        // Success if AffectedRow is not equals to 0
        if(result.affectedRows != 0) return callback(null, true);

        return callback(null, false);
    });
}

function CreateKey(key, masterkey, callback){
    var query = "INSERT INTO `apikey`(`key`, ismasterkey) VALUES(?, ?)";
    sql.query(query, [key, masterkey], function(err, result){
        if(err) return callback(err.code, null);

        if(result.affectedRows != 0) return callback(null, true);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export default {
    keys: getApiKeys,
    keyid: getKeyId,
    key: getKey,
    keyinfo: getKeyInfo,
    ismasterkey: isMasterkey,
    delete: DeleteKey,
    create: CreateKey
}