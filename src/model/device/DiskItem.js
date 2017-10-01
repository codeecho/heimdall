export default class DiskItem{

    constructor(name){
        this.name = name;
        this.parent = null;
    }

    isRoot(){
        return this.parent == null;
    }

    get path(){
        if(this.isRoot()){
            return '/' + this.name;
        }else{
            return this.parent.path + '/' + this.name;
        }
    }

}