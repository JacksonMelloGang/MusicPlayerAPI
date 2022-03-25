import sql from "../../database/";

function getSongs(callback){
    var query = "SELECT * FROM song"
    sql.query(query, function(err, result){
        if(err) return callback(err.code, null);

        if(result.length == 0) return callback(null, false);

        return callback(null, result);

    });
}

function getSongsByAuthorName(authorName, callback){
    var query = "SELECT * FROM song WHERE authorName=?";
    sql.query(query, [authorName], function(err, result){
        if(err) return callback(err.code, null);

        if(result.length == 0) return callback(null, false);

        return callback(null, result);

    })
}

function getSong(songName){
    var query = "SELECT * FROM song WHERE songName=?";
    sql.query(query, [songName], function(err,result){
        if(err) return callback(err.code, null);

        if(result.length == 0) return callback(null, false);

        return callback(null, result);
    });
}

function getSongName(songId, callback){
    var query = "SELECT songName FROM song WHERE songId=?";
    sql.query(query, [songId], function(err, result){
        if(err) return callback(err.code, null);

        if(result.length == 0) return callback(null, false);

        return callback(null, result[0]);
    })
}

function getSongAuthor(songName, callback){
    var query = "SELECT songAuthor FROM song WHERE songName=?";
    sql.query(query, [songName], function(err, result){
        if(err) return callback(err.code, null);

        if(result.length == 0) return callback(null, false);

        return callback(null, result);
    });
}

function CreateSong(songName, authorName="Unknow Author", callback){
    var query = "INSERT INTO song(songName, songAuthor) VALUES(?, ?);";
    sql.query(query, [songName, authorName], function(err, result){
        if(err) return callback(err.code, null);

        if(result.length == 0) return callback(null, false);

        return callback(null, true);
    });
}

function DeleteSong(songName){
    var query = "DELETE FROM song WHERE songName=?"
    sql.query(query, [songName], function(err, result){
        if(err) return callback(err.code, null);

        if(result.affectedRows == 0) return callback(null, false);

        return callback(null, true);
    });
}

export default {
    songs: getSongs,
    song: getSong,
    songAuthor: getSongsByAuthorName,
    name: getSongName,
    author: getSongAuthor,
    create: CreateSong,
    delete: DeleteSong
}