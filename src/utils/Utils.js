const toClassString = (obj) => {
    var classString = '';
    Object.keys(obj).forEach(prop => {
        const value = obj[prop];
        if(value){
            classString = classString + prop + ' ';
        }
    });
    return classString;
}

export default toClassString;