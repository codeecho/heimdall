import React from 'react';

import {Modal} from 'react-bootstrap';

import Draggable from 'react-draggable';

import FileViewer from '../containers/FileViewer';

export default function Terminal(props){
    
    const {displayed, active, connection, path, cursorIndex, command, output, activate, close} = props;
    
    if(!displayed) return null;
    
    const beforeCursor = command.substring(0, cursorIndex);
    let cursorCharacter = command.length > cursorIndex ? command.substring(cursorIndex, cursorIndex + 1): ' ';
    if(cursorCharacter === ' ') cursorCharacter = <span>&nbsp;</span>;
    const afterCursor = command.length > cursorIndex + 1 ? command.substring(cursorIndex + 1, command.length): '';
    
    return (
        <Draggable handle=".modal-header">
              <Modal.Dialog className={`terminal ${active && 'active'}`}>
                <Modal.Header closeButton onClick={activate} onHide={close}>
                    <div><span className="connection"> {connection}</span>:{path}</div>
                </Modal.Header>
            
                <Modal.Body onClick={activate}>
                    <FileViewer connection={connection} path={path}/>
                </Modal.Body>
            
                <Modal.Footer onClick={activate}>
                    <div className="console-wrapper">
                        <div className="console">
                            {output.map((text, i) => <div key={i}>{text}</div>)}
                        </div>
                    </div>
                    <div className="command-line">
                        <span className="prompt"><span className="connection"> {connection}</span>:{path} $ </span>
                        <span className="command-input">
                            <span className="before-cursor">{beforeCursor}</span>
                            <span className="cursor-character">{cursorCharacter}</span>
                            <span className="after-cursor">{afterCursor}</span>                
                        </span>
                    </div>
                </Modal.Footer>
              </Modal.Dialog>
        </Draggable>
    );
    
}