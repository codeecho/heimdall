import DiskItem from './DiskItem';

export default class Directory extends DiskItem{

    constructor(name, children){
        super(name);
        this.children = children || [];
        this.children.forEach((child) => child.parent = this);
    }

    isDirectory(){
        return true;
    }

    get type(){
        return 'Directory';
    }

}