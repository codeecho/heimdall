import Database from './Database';

export default class MailBox extends Database{

    constructor(name, conversations){
        super(name, ['name', 'lastMessageTime'], conversations);
    }

    get type(){
        return 'MailBox';
    }

}