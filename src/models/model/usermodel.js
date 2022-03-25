import sql from "../database/";

function getUsersInfos(callback) {
    var query = "SELECT * FROM `user`;"
    sql.query(query, function(err, result){
        if(err) return callback(err, null);

        return callback(null, result);
    });
}


function getUserInfo(userid, callback){
    var query = "SELECT * from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result);
    });
}

function getUserPseudo(userid, callback){
    var query = "SELECT userPseudo from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);
        
        return callback(null, result[0].userPseudo);
    });
}

function getUserName(userid, callback){
    var query = "SELECT userName from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);
        
        return callback(null, result[0].userName);
    });
}

function getUserLastName(userid, callback){
    var query = "SELECT userName, userLastname from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);
        
        return callback(null, result[0].userLastname);
    });
}

function getUserEmail(userid, callback){
    var query = "SELECT userEmail from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].userEmail);
    });
}

function getUserPassword(userid, callback){
    var query = "SELECT userPassword from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].userPassword);
    });
}

function getUserToken(userid, callback){
    var query = "SELECT userToken from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].userToken);
    });
}

function getUserVerifiedAt(userid, callback){
    var query = "SELECT userVerifiedAt from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].userVerifiedAt);
    });
}

function getUserGroups(userid, callback){
    var query = "SELECT userGroupName, groupDescription, groupPermission from `usergroup` WHERE `userId`=";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result);
    });
}

function isUserAdmin(userid, callback){
    var query = "SELECT  from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].isUserAdmin);
    });
}

function isUserPremium(userid, callback){
    var query = "SELECT * from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].isUserPremium);
    });
}

function isUserSinger(userid, callback){
    var query = "SELECT * from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].isUserSinger);
    });
}

function isUserBanned(userid, callback){
    var query = "SELECT * from `user` WHERE `userId`=?";
    sql.query(query, userid, function(err, result){
        if(err) return callback(err, null);

        // return false if no result
        if(result.length == 0) return callback(null, false);

        return callback(null, result[0].isUserBanned);
    });
}

function createUser(userPseudo, userName="", userLastname="", userEmail, userPassword, userToken, userGroup=0, userIsAdmin=0, userIsPremium=0, userIsSinger=0, userIsBanned=0, callback){
    var query = "INSERT INTO `user`(userPseudo, userName, userLastname, userEmail, userPassword, userToken, userVerifiedAt, userGroup, userIsAdmin, userIsPremium, userIsBanned) VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?)";
    sql.query(query, [userPseudo, userName, userLastname, userEmail, userPassword, userToken, userGroup, userIsAdmin, userIsPremium, userIsSinger, userIsBanned], function(err, result){
        if(err) return callback(err, null);

        if(result.insertId == 0 || result.insertId === undefined) return callback(null, false);

        return callback(null, true);
    });
}

function deleteUser(userPseudo){
    var query = "DELETE FROM `user` WHERE `userPseudo`=?";
    sql.query(query, [userPseudo], function(err, result){
        if(err) return callback(err, null);

        if(result.affectedRows == 0) return callback(null, false);

        return callback(null, true);
    });
}

export default {
    usersinfo: getUsersInfos,
    userinfo: getUserInfo,

    createuser: createUser,
    deleteuser: deleteUser,
    
    isBanned: isUserBanned,
    isSinger: isUserSinger,
    isPremium: isUserPremium,
    isAdmin: isUserAdmin,
    getgroups: getUserGroups,
    verifiedAt: getUserVerifiedAt,
    token: getUserToken,
    password: getUserPassword,
    email: getUserEmail,
    lastname: getUserLastName,
    name: getUserName,
    pseudo: getUserPseudo
} 

