import File from './File';

export default class TextFile extends File{

    constructor(name, text){
        super(name);
        this.text = text;
    }

    get type(){
        return 'TextFile';
    }

}