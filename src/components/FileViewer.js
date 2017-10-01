import React from 'react';
import Conversation from './Conversation';

const FileViewer = ({file}) => {
    return (
        <div class='file-viewer'>
            <ActiveFileView file={file} />
        </div>
    )
}

const ActiveFileView = ({file}) => {
    if(file.type == 'Conversation'){
        return <Conversation conversation={file} />
    }else{
        return <TextFile file={file} />
    }
};

const TextFile = ({file}) => {
    return <div>{file.text}</div>;
}

export default FileViewer;