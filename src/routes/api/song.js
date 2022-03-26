import { Router } from "express";
const multer  = require('multer');
const path = require('path');
import help from "../../misc/help";
import model from "../../models"

var date = Date.now();

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        date = Date.now();
        cb(null, date  + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = Router();


// Get Key Route
router.get('/', (req, res) => {
    var songid = null;
    res.header("Access-Control-Allow-Origin", "*");
    // check if apikey param has been provided, if that the case, it should evaluate to false
    if (typeof req.query['song'] === undefined) return res.status(200).json(help.songhelp);

    // set var key : to query value
    songid = req.query['song'];

    if(songid == "all"){
        model.song.songs(function(err, result){
            if(err) return res.status(500).json({ error: err});

            var i = 0;
            var jsonresult = {};
            result.forEach(element => {
                jsonresult[i] = {
                    id: element.songId,
                    file: element.songFileName+".mp3",
                    name: element.songName,
                    author: element.songAuthor,
                    url: `http://localhost:${process.env.PORT}/`+element.songFileName+'.mp3'
                }
                i++;
            });

            res.status(200).json(jsonresult);
        });
    }
});

router.post('/', upload.single('musicfile'), function(req, res, next) {
    
    // check if apikey is defined
    if(typeof req.header['authorization'] === undefined){
        return res.status(401).json({error: "Not allowed to Create a ressource."});
    }
    //check if provided apikey is allowed to upload
    

    // if arg title of song missing in request, cancel task and return error 404
    if(typeof req.body['title'] === undefined || typeof req.body['author'] === undefined){
        return res.status(404).json({error: "Missing Song Name/Author"});
    }

    // check if any file have been provided
    if(typeof req.file === undefined || req.file == ""){
        return res.status(401).json({error: "Where is my song file !"});
    }

    var songTitle = req.body['title'] !== undefined ? req.body['title'] : "";
    var songAuthor = req.body['author'] !== undefined ? req.body['author'] : "Unknow Author";

    model.song.create(songTitle, songAuthor, date, function(err, result){
        if(err) return res.status(500).json({error: err});

        if(result){
            return res.status(200).json({success: "succesfully inserted new song " + songTitle + " : " +songAuthor});
        }
 
        return res.status(500).json({error: "Couldn't insert new song " + songTitle, err: err});
    });
});



export default router;