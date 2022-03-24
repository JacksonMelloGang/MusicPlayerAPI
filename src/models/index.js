/*
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

export default {
  users,
  messages,
};
*/

import apikey from "./keymodel.js";
import album from "./albummodel.js";
import playlist from "./playlistmodel.js";
import user from "./usermodel.js";

module.exports = {
  apikey: apikey,
  album: album,
  playlist: playlist,
  user: user
};

