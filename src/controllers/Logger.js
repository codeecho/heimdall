export default class Logger{

    constructor(limit){
        this.limit = limit;
        this.messages = [];
    }

    setView(view){
        this.view = view;
    }

    debug(message){
        this.log("debug", message);
    }

    info(message){
        this.log("info", message);
    }

    warn(message){
        this.log("warning", message);
    }

    error(message){
        this.log("error", message);
    }

    log(level, message){
        this.messages.push({
            level,
            message
        });
        if(this.messages.length > this.limit){
            delete this.messages[0]
        }
        this.view.update(this.messages);
    }

}