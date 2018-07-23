import React from 'react';

import KeyHandler from '../containers/KeyHandler';
import Log from './Log';
import Terminal from '../containers/Terminal';

const terminalImage = require('../assets/terminal.png');

export default function Page(props){
    
    const {terminals, activateTerminal, closeTerminal, openTerminal} = props;
    
    return (
        <div>
            <KeyHandler />
            <Log />
            {terminals.map((terminal, i) => <Terminal key={i} {...terminal} />)}
            <button className="open-terminal-button" onClick={openTerminal} ><img src={terminalImage} /></button>
        </div>
    );
    
}