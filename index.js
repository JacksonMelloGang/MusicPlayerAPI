// Librairies
const express = require('express');
const mysql = require('mysql');
const app = express();

// Port for expressjs
const port = 3001;

//Settings for express
app.set('json spaces', 2);
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// SQL Connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'musicplayerapi'
})

// Trying to connect to the database
con.connect(function (err) {
    if(err) return console.error(`Couldn't connect: ${err.message}`);
    console.log("Connected to the database !");
})

app.get('/', (req, res) => {
    res.status(200).send("Hello");
});

app.post("/api/key", (req, res) => {
    console.log("Got request from " + req.ip);
    var body = req.body;

    if(body.hasOwnProperty("masterkey") && isMasterKey(con, body)){
        console.log("Master Key detected");
        if(body.hasOwnProperty("registerkey") && body.registernewkey === "true"){
            console.log("New Attempt to register a new api key detected");
            if(body.hasOwnProperty("apikey") && isValidApiKey(con, body)){
                con.query(`INSERT INTO apikey(\`key\`, ismasterkey) VALUES(${body.key}, 0);`, function(err, result){
                    if(result.affectedrows === 0){
                        return res.status(200).json({"success": "Successfully registered new key"});
                    }
                });        
            }   
        }
        return res.status(500).json({"error": "Couldn't add new key, " + err});
    }

    if(body.hasOwnProperty("apikey") && isValidApiKey(con, body)){
        return res.status(200).json({"error": "This Api key is valid !"});
    }    

    return res.status(500).json({"error": "An error occured."});
});

app.put("/user", (res, req) => {
    console.log("Got Put request from " + res.ip);
});

app.post("/user", (res, req) => {
    res.send("got POST request");
});

app.delete("/user", (res, req) => {
    res.send("got DELETE request");
});

app.listen(port, () => function(){
    console.log("Started Listening on port " + port);
});








////////////////////////////////////////////////////////////////////////////////////////////////

/*** 
 * Check if valid master key 
 * @param {mysql.Connection} connection sql connection
 * @param {Array} body body parameters from request (must be json)
 * 
***/
function isMasterKey(con, body) {
      if(body.hasOwnProperty("masterkey")){
        con.query(`SELECT ismasterkey FROM apikey WHERE \`key\`='${body.masterkey}'`, function(err, result, fields){
            
            // if any error from request
            if(err){
                console.error("Couldn't check if the provded key was a masterkey :(" + err.message);
                return;
            };

            // if result of request is -1, (true), return true
            if(Object.keys(result)[0] === -1){
                return true
            };

            return false;
        });
    }
}


/*** 
 * Check if valid api key
 * @param {mysql.Connection} connection sql connection
 * @param {Array} body body parameters from request (must be json)
 * 
***/
function isValidApiKey(con, body) {
    if(body.hasOwnProperty("key")){
        con.query(`SELECT \`key\` FROM apikey WHERE \`key\`='${body.key}'`, function(err, result){
            if(err) throw err;
            
            // if result of request is the same as the key provided in body parameters, return true
            if(Object.keys(result)[0] === body.key){
                return true;
            }
            
            return false;
        });
    }
}