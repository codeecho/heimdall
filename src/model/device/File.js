import DiskItem from './DiskItem';

export default class File extends DiskItem{

    constructor(name){
        super(name);
    }

    isDirectory(){
        return false;
    }

    get type(){
        return 'File';
    }

}