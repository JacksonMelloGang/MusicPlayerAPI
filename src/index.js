import 'dotenv/config';
import express from 'express';
import fs from "fs";
import routes from './routes';
import cors from 'cors';

const app = express();

      // https://swagger.io/ -- to generate documentation for the api

// * Application-Level Middleware * //
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Third-Party Middleware
app.use(cors());

// Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

// * Public Folders  * //
app.use(express.static(process.cwd()+"\\uploads"));

// * Routes * //
app.use('/key', routes.key);
app.use('/user', routes.user);
app.use('/playlist', routes.playlist);
app.use('/album', routes.album);
app.use('/song', routes.song);
//app.use('/artist', routes.artist);

app.use('/session', routes.session);
app.use('/messages', routes.message);
 
// Just for debug, will have to delete it one day, maybe
app.get('/uploads/song', (req, res) => {
  var songpath = "./uploads";
  fs.readdir(songpath, function(err, files){
      if(err) return res.send("Couldn't read directory " + songpath + "<br>"+err);
     
      var link = "";
      files.forEach(file => {
        link += `<a href='\\${file}'>${file}<br>`;
      });
      res.send(link);
  })
});

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Rest API Ready to listen on port ${process.env.PORT}!`),
);
 