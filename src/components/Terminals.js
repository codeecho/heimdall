import React from 'react';
import Terminal from './Terminal';

const Terminals = ({terminals, activateTerminal, closeTerminal}) => {

    return (
        <div>
            {
                terminals.map(terminal => {
                    return <Terminal key={terminal.id} terminal={terminal} activateTerminal={activateTerminal} closeTerminal={closeTerminal} />
                })
            }
        </div>
    )

}

export default Terminals;