import React from 'react';

export default function TextFileViewer(props){
    const {file} = props;
    const {content} = file;
    return (
        <div>{content}</div>
    );
}