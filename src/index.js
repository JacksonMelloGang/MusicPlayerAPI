import 'dotenv/config';
import express from 'express';
import fs from "fs";
import routes from './routes';
import middleware from './middleware';
import Log from './log';

const app = express();
const time = Date.now();

const log = new Log(time);

// Express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

      // https://swagger.io/ -- to generate documentation for the api

// * Routes * //
app.use('/key', routes.key);
app.use('/user', routes.user);
app.use('/playlist', routes.playlist);
app.use('/album', routes.album);

app.use('/session', routes.session);
app.use('/messages', routes.message);

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Rest API Ready to listen on port ${process.env.PORT}!`),
);
 