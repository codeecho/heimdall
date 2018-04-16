import * as actions from '../actions';
import commands from '../commands';

import logger from '../utils/logger';

const MAX_HISTORY = 10;
const MAX_OUTPUT = 50;

const initialState = {
    terminals: [{
        id: 1,
        displayed: true,
        active: true,
        prompt: ' / $ ',
        cursorIndex: 0,
        command: '',
        output: [],
        history: []
    },{
        id: 2,
        displayed: false,
        active: false,
        prompt: ' / $ ',
        cursorIndex: 0,
        command: '',
        output: [],
        history: []
    },{
        id: 3,
        displayed: false,
        active: false,
        prompt: ' / $ ',
        cursorIndex: 0,
        command: '',
        output: [],
        history: []
    },{
        id: 4,
        displayed: false,
        active: false,
        prompt: ' / $ ',
        cursorIndex: 0,
        command: '',
        output: [],
        history: []
    },{
        id: 5,
        displayed: false,
        active: false,
        prompt: ' / $ ',
        cursorIndex: 0,
        command: '',
        output: [],
        history: []
    }]
};

const rootReducer = (state = initialState, action) => {
    const newState = handleAction(state, action);
    return newState;
};

function handleAction(state, action){
    switch (action.type) {
        case actions.CHARACTER_TYPED: {
            return updateActiveTerminal(state, terminal => {
                const {command, cursorIndex} = terminal;
                let newCommand = command.substring(0, cursorIndex) + action.character;
                if(command.length > cursorIndex) newCommand = newCommand + command.substring(cursorIndex, command.length);
                return {
                    command: newCommand,
                    cursorIndex: cursorIndex + 1
                };
            });
        }
        case actions.BACKSPACE: {
            return updateActiveTerminal(state, terminal => {
                const {command, cursorIndex} = terminal;
                if(cursorIndex === 0) return terminal;
                let newCommand = command.substring(0, cursorIndex - 1);
                if(command.length > cursorIndex) newCommand = newCommand + command.substring(cursorIndex, command.length);
                return { command: newCommand, cursorIndex: cursorIndex - 1 };
            });
        }
        case actions.MOVE_CURSOR_BACK: {
            return updateActiveTerminal(state, terminal => {
                return { cursorIndex: Math.max(terminal.cursorIndex - 1, 0)};
            });
        }
        case actions.MOVE_CURSOR_FORWARD: {
            return updateActiveTerminal(state, terminal => {
                return { cursorIndex: Math.min(terminal.cursorIndex + 1, terminal.command.length)};
            });
        }
        case actions.MOVE_CURSOR_TO_START: {
            return updateActiveTerminal(state, terminal => {
                return { cursorIndex: 0};
            });            
        }
        case actions.MOVE_CURSOR_TO_END: {
            return updateActiveTerminal(state, terminal => {
                return { cursorIndex: terminal.command.length};
            });            
        }
        case actions.SEND_COMMAND: {
            return updateActiveTerminal(state, terminal => {
                const command = terminal.command;
                const output = `${terminal.prompt} ${command}`;
                return { command: '', cursorIndex: 0, output: terminal.output.concat(output), history: terminal.history.concat(command).slice(0, MAX_HISTORY)};
            });
        }
        case actions.WRITE_TO_CONSOLE: {
            const {text} = action;
            return updateActiveTerminal(state, terminal => {
                return { output: terminal.output.concat(text).slice(0, MAX_OUTPUT) };
            });
        }
        case actions.CLEAR_CONSOLE: {
            return updateActiveTerminal(state, terminal => {
                return { output: [] };
            });
        }
        case actions.SHOW_HELP: {
            const output = commands.map(command => command.command);
            return updateActiveTerminal(state, terminal => {
                return { output: terminal.output.concat(output).slice(0, MAX_OUTPUT) };
            });
        }
        case actions.SHOW_COMMAND_HISTORY: {
            return updateActiveTerminal(state, terminal => {
                const output = terminal.history.concat();
                return { output: terminal.output.concat(output).slice(0, MAX_OUTPUT) };
            });
        }
        case actions.AUTOCOMPLETE: {
            return updateActiveTerminal(state, terminal => {
                const matchingCommands = commands.filter(command => command.command.indexOf(terminal.command) > -1);
                if(matchingCommands.length === 0) return terminal;
                if(matchingCommands.length === 1){
                    const matchingCommand = matchingCommands[0];
                    return {command: matchingCommand.command, cursorIndex: matchingCommand.command.length};
                }
                const output = matchingCommands.map(command => command.command);
                return {output: terminal.output.concat(output).slice(0, MAX_OUTPUT)};
            });
        }
        case actions.ACTIVATE_TERMINAL: {
            const {terminalId} = action;
            if(!state.terminals.find(terminal => terminal.id == terminalId).displayed) return state;
            const terminals = state.terminals.map(terminal => {
                if(terminal.id === terminalId) return Object.assign({}, terminal, {active: true});
                return Object.assign({}, terminal, {active: false});
            });
            return Object.assign({}, state, {terminals});
        }
        case actions.OPEN_TERMINAL: {
            const terminalToOpen = state.terminals.find(terminal => !terminal.displayed);
            if(!terminalToOpen) return state;
            logger.info('Opening new terminal session...');
            const terminals = state.terminals.map(terminal => {
               if(terminal.active) return Object.assign({}, terminal, {active: false});
               if(terminal.id !== terminalToOpen.id) return terminal;
               return Object.assign({}, terminal, { displayed:true, active: true, cursorIndex: 0, command: '', history: [], output: [] });
            });
            logger.info('New terminal session initialised');
            return Object.assign({}, state, {terminals});
        }
        case actions.CLOSE_TERMINAL: {
            const {terminalId} = action;
            logger.info('Terminating session...');
            const terminals = state.terminals.map(terminal => {
                if(terminal.id !== terminalId) return terminal;
                return Object.assign({}, terminal, {displayed: false});
            });
            const activeTerminal = terminals.find(terminal => terminal.displayed && terminal.active);
            if(!activeTerminal) {
                terminals.forEach(terminal => terminal.active = false);
                const displayedTerminals = terminals.filter(terminal => terminal.displayed);
                if(displayedTerminals.length > 0) displayedTerminals[0].active = true;
            }
            logger.info('Terminal session terminated')
            return Object.assign({}, state, {terminals});
        }
        default: return state;
    }
}

function updateActiveTerminal(state, fn){
    const terminals = state.terminals.map(terminal => {
        if(!terminal.active) return terminal;
        return Object.assign({}, terminal, fn(terminal));
    });
    return Object.assign({}, state, { terminals });
}

export default rootReducer;