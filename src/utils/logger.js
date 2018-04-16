const DEBUG = 'debug';
const INFO = 'info';
const WARNING = 'warning';
const ERROR = 'error';

class Logger{
    
    constructor(){
        this.listeners = [];
        this.messages = [{level: INFO, message: 'Testing'}];
    }
    
    log(level, message){
        this.messages.push({level, message});
        this.listeners.forEach(listener => listener(this.messages, {level, message}));
    }
    
    debug(message){
        this.log(DEBUG, message);
    }
    
    info(message){
        this.log(INFO, message);
    }
    
    warn(message){
        this.log(WARNING, message);
    }
    
    error(message){
        this.log(ERROR, message);
    }
    
    addListener(listener){
        this.listeners.push(listener);
        listener(this.messages);
    }
    
}

const logger = new Logger();

export default logger;