import File from './File';

export default class Conversation extends File{

    constructor(name, messages){
        super(name);
        this.messages = [];
        messages.forEach(this.addMessage.bind(this));
    }

    addMessage(message){
        this.messages.push(message);
        this.lastMessageTime = message.time;
    }

    get type(){
        return 'Conversation';
    }

}