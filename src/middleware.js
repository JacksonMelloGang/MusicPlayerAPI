import express from 'express';
const app = express();
import cors from 'cors';

import database from './database';
import models from './models';


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
