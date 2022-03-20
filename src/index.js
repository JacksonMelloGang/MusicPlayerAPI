import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';
import database from './database';
import fs from "fs";

const app = express();
const time = Date.now();

// https://swagger.io/ -- to generate documentation for the api

function writelog(text){
  if(!fs.existsSync("../log")) fs.mkdirSync("../log");

  fs.appendFileSync("../log/log-"+ time +".txt", text+"\n", function(err){
    if(err) throw err;
  });
}


// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use("/", (req,res, next) => {
  writelog("Got Connection from " + req.ip.toString());
  let token = req.headers['authorization'];
  let query = "SELECT `key` FROM apikey WHERE `key`="+database.escape(token);

  database.query(query, function(error, results, fields){
      if(error){
          res.status(200).json({"error": "couldn't establish contact with the database"});
          return
      }

      if(results.length != 0 && results[0].key === token){
          next();
      } else {
          res.status(403).json({"error": "API Key not valid !"})
      }
  });
});


// * Routes * //
app.use('/key', routes.key);
app.use('/users', routes.user);
app.use('/playlist', routes.playlist);
app.use('/album', routes.album);

app.use('/session', routes.session);
app.use('/messages', routes.message);

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Rest API Ready to listen on port ${process.env.PORT}!`),
);
