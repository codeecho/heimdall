import Terminal from './Terminal';

export default class TerminalManager{

    constructor(logger, network){
        this.logger = logger;
        this.terminals = [
            new Terminal(1, logger, network),
            new Terminal(2, logger, network),
            new Terminal(3, logger, network),
            new Terminal(4, logger, network),
            new Terminal(5, logger, network)
        ]
    }

    openTerminal(){
        const terminal = this.terminals.find(terminal => !terminal.isOpen);
        if(terminal){
            terminal.open();
            this.activateTerminal(terminal);
        }
    }

    activateTerminal(terminal){
        this.terminals.filter(t => t.id != terminal.id).forEach(t => t.deactivate());
        terminal.activate();
    }

}