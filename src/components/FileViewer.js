import React from 'react';

import DirectoryViewer from './DirectoryViewer';

import TextFileViewer from './TextFileViewer';

export default function FileViewer(props){
    
    const {isDirectory, file, children} = props;
    
    if(isDirectory){
        return <DirectoryViewer directory={file} children={children} />
    }
    
    const {contentType} = file;
    
    if(contentType === 'text'){
        return <TextFileViewer file={file} />
    }
    
    return (
        <div>Unable to read file</div>
    )
    
}