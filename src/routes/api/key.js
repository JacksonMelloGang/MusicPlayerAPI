import { Router } from "express";
import sql from "../../database";
import help from "../../misc/help";
import model from "../../models";

const router = Router();

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

function createnewkey(key, ismasterkey = false){
    // define if we create a master key based on input parameter is masterkey
    if(ismasterkey == false){ismasterkey = 0} else {ismasterkey = 1};

    sql.query("INSERT INTO `apikey`(`key`, ismasterkey) VALUES (?, ?)", [key, sql.escape(ismasterkey)] , function(err, result){
        // if err return function, with err as first parameter and null as second parameter (key)
        if(err) throw err;
        console.log("Successfully inserted new key, key id: " + result.insertId);
    });
}

function isMasterkey(key, callback){
    var query = "SELECT ismasterkey AS allowed FROM `apikey` WHERE `key`="+sql.escape(key);
    sql.query(query, function(err, result, fields){
        // if error return function, with err as first parameter and null as second parameter (key)
        if(err) callback(err, null);

        //if result is not empty
        if(result.length != 0){
            //if provided key is a master key (==1)
            if(result[0].allowed == 1){
                return callback(null, true)
            }
        }
        return callback(null, false);
    });    
}



//------------------------------------------------------------------------------------------------



// Get Key Route 
router.get('/', (req, res) => {
    var key = null;

    if(req.query['apikey'] == 'undefined'){
        key = req.query['apikey'];
    } else {
        return res.status(200).json(help.keyhelp);
    }

    model.apikey.keyinfo(key, function(err, keyinfo){
        if(keyinfo == false){
            res.status(200).json({"success": "no information about the key"});
            return;
        }

        var masterkey = keyinfo[0].ismasterkey == 1 ? true : false;
        var keyid = keyinfo[0].id;

        res.status(200).json({"success": {
            "id": keyid,
            "key": key,
            "masterkey": masterkey
        }})

    });
});

router.put('/', (req, res) => {
    // check if the key allowed to create a new key
    if(typeof req.headers['authorization'] !== 'undefined'){
            var key = generateRandomString(30);

            var masterkey = req.body['ismasterkey'] ? true : false;

            if(isMasterkey(req.headers['authorization'])){
                createnewkey(key, true)
                res.status(200).json({"success": "Key successfully created", "key": key.toString()});                
            } else {
                res.status(400).json({"error": "The key provided doesn't have permission to create a new key"});                
            }
    } else {
            res.status(400).json({"error": "Not allowed."});
    }
});

router.delete('/', (req, res) => {
    if(typeof req.headers['authorization'] !== 'undefined'){
        if(typeof req.body['key'] !== 'undefined'){
            models.apikey.delete(req.body['key'], function(err, result){
                if(result){
                    res.status(200).json({"success": "succesfully deleted key " + req.body['key']});
                } else {
                    res.status(404).json({"error": "key not found in database"});
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