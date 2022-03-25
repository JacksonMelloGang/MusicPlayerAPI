import { Router } from "express";
import model from "../../models"

const router = Router();

router.post('/', function(req, res){
    // check if apikey is defined
    if(typeof req.header['authorization'] === undefined) return res.status(401).json({error: "Not allowed to Create a ressource."});

    // if arg title of song missing in request, cancel task and return error 404
    if(typeof req.body['songtitle'] === undefined) return res.status(404).json({error: "Missing Song Name"});
    
    var songTitle = req.body['title'];
    var songAuthor = req.body['author'] !== undefined ? req.body['songauthor'] : "";

    model.song.create(songTitle, songAuthor, function(err, result){
        if(err) return res.status(500).json({error: err});

        if(result){
            return res.status(200).json({success: "succesfully inserted new song " + songTitle + " : " +songAuthor});
        }

        return res.status(500).json({error: "Couldn't insert new song " + songTitle, err: err});
    });
});



export default router;