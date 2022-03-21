import { Router } from "express";
import sql from "../../database";

const router = Router();
const help = {
    "insert": {
        "method": "PUT",
        "routes": "/key",
        "header": {"authorization": "masterkey"},
        "return": "new key"
    },
    "delete": {
        "method": "DELETE",
        "routes": "/key",
        "header": {"authorization": "masterkey"},
        "body": "key to delete",
        "return": "success or error"
    },
    "get": {
        "method": "GET",
        "routes": "/key",
        "return": "new key"
    },
    "get": {
        "method": "GET",
        "routes": "/key/?{key}",
        "body": "key",
        "return": "information about the specified key or error"
    }
 }

function generateRandomString(myLength){
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
};

function createnewkey(key, ismasterkey = 0){
    sql.query("INSERT INTO `apikey`(`key`, ismasterkey) VALUES (?, ?)", [key, sql.escape(ismasterkey)] , function(err, result){
        if(err) throw err;
        console.log("Successfully inserted new key, key id: " + result.insertId);
    });
}

function isMasterkey(key, newkey=false, keyvalue=generateRandomString(30), newmasterkey=0){
    var query = "SELECT ismasterkey AS allowed FROM `apikey` WHERE `key`="+sql.escape(key);
    sql.query(query, function(err, result, fields){
        // check if key exist or not
        if(result.length != 0){
            // check if key has permission
            if(result[0].allowed == 1){
                // if we want to createa new key
                if(newkey === true){
                    if(key == "" || typeof key == 'undefined') return;
                    // if we want to create a new master key or not 
                    if(newmasterkey == 1){
                        createnewkey(keyvalue, 1);
                        return;
                    } 
                    // else just create a new key without admin permissions
                    createnewkey(keyvalue, 0);
                }
            }
        } 

    });    
}


router.get('/', (req, res) => {
    return res.status(200).json(help);
});

router.get('/:keyId', (req, res) => {
    var keyinfo = "";

    // key if not undefined, key = key from param, otherwise if req.body key is not undefined key = 
    var key = ""
    if(req.params['key'] !== 'undefined'){
        key = req.params['key'];
    } else {
        if(req.body['key'] !== 'undefined'){
            key = req.body['key'];
        } else {
            key = "nokey";
        }
    }
    
        sql.query("SELECT `key` AS iskeyin FROM `apikey` WHERE `key`=" + sql.escape(key), (err, result) => {
            if(err) throw err;

            // if no result
            if(result.length != 0){
                
            }
            res.status(200).json({"": ""});
            return
        });
});

router.put('/', (req, res) => {
    // check if the key allowed to create a new key
    if(typeof req.headers['authorization'] !== 'undefined'){
            // if parameter masterkey is present, it means he want to create a new master key, so we set ismasterkey to 1 and allow create masterkey,
            // otherwise we just create a new key without privileges
            let mk = req.body['masterkey'] == 1 ? 1 : 0;
            let newmk = mk == 1 ? true : false;
            var newkey = generateRandomString(30);

            isMasterkey(req.headers['authorization'], newmk, newkey, mk);
            res.status(200).json({"success": "Key successfully created", "key": newkey.toString()});
    } else {
            res.status(503).json({"error": "Not allowed."});
    }
});

router.delete('/', (req, res) => {
    if(typeof req.headers['authorization'] !== 'undefined'){
        if(typeof req.body['key'] !== 'undefined'){
            var query = "SELECT ismasterkey AS allowed FROM `apikey` WHERE `key`="+sql.escape(req.headers['authorization']);
            sql.query(query, function(err, result, fields){
                if(err) throw err;
                // check if key exist or not
                if(result.length != 0){
                    // check if key has permission
                    if(result[0].allowed == 1){
    
                        sql.query("DELETE FROM `apikey` WHERE `key`="+sql.escape(req.body['key']), function(err, results){
                            if(err) res.status(503).json({"error": "Couldn't delete key: " + req.body['key'], "details":err.message});
                            if(results.affectedRows == 0){
                                res.status(404).json({"error": "key not found in database"});
                            } else {
                                res.status(200).json({"success": "succesfully deleted key " + results.affectedRows});
                            }
                            return;
                        });
                    }
                } 
            });   
        } else {
            res.status(503).json({"error": "API key to delete not specified"});
        }
        
    } else {
        res.status(503).json({"error": "Not allowed."});
    }
});



export default router; 