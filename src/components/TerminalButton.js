import React from 'react';

let terminalImage = require('../images/terminal.png');

const TerminalButton = ({openTerminal}) => {
    return (
        <div id="terminal-button" onClick={openTerminal}>
          <img src={terminalImage} />
        </div>
    )
}

export default TerminalButton;