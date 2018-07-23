import React from 'react';

const icons = {
    file: require('../assets/file.png'),
    directory: require('../assets/folder.png'),
    messages: require('../assets/e-mail.png'),
    db: require('../assets/hdd.png'),    
}

export default function DirectoryViewer(props){
    
    const {children} = props;
    
    return (
        <div class="row">
            {children.map(file => <Child file={file} />)}
        </div>
    );
}

function Child(props){
    const {file} = props;
    const {name, type} = file;
    return (
        <div className="file col-md-3">
            <img src={icons[type]} />
            <span>{name}</span>
        </div>
    )
}