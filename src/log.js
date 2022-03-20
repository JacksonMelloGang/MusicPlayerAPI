import fs from 'fs';
class Log {

    static Time;

    constructor(time){
        Log.Time = time;
    }

    static TYPE = {
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info',
        LOG: 'log'
    };

    static Time(){
        return Log.time;
    }

    static addlog(type, text){
        if(!fs.existsSync("../log")) fs.mkdirSync("../log");
      
        var validtype = Object.keys(Log.TYPE).findIndex(type) === -1 ? type : Log.TYPE.INFO; 
        var prefix = "";

        switch(validtype){
            case Log.TYPE.ERROR:
                prefix = "[ERROR]";
                break;
            case Log.TYPE.WARNING:
                prefix = "[WARNING]";
                break;
            case Log.TYPE.INFO:
                prefix = "[INFO]";
                break;
            case Log.TYPE.LOG:
                prefix = "[LOG]";
                break;
        }


        fs.appendFileSync("../log/log-"+ Log.time() +".txt", text+"\n", function(err){
          if(err) throw err;
        });
      }    



}

module.exports = Log;