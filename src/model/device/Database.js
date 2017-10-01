import Directory from './Directory';

export default class Database extends Directory{

    constructor(name, columns, children){
        super(name, children);
        this.columns = columns;
    }

    getFilteredChildren(filters){
        if(filters == null || filters.length == 0){
            return this.children;
        }
        return this.children.filter((child) => {
            var match = true;
            filters.forEach((filter) => {
                if(!match){
                    return;
                }
                var filterMatch = false;
                this.columns.forEach((column) => {
                    filterMatch = filterMatch || child[column].indexOf(filter) > -1;
                });
                match = filterMatch;
            });
            return match;
        })
    }

    get type(){
        return 'Database';
    }

    get isDatabase(){
        return true;
    }

}