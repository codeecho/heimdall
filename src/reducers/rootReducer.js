import * as actions from '../actions';
import commands from '../commands';

import logger from '../utils/logger';

const MAX_HISTORY = 10;
const MAX_OUTPUT = 50;

const initialState = {
    network: [{
        hostname: 'localhost',
        files: [{
            type: 'directory',
            name: 'root',
            path: '/root',
        },{
            name:'dir1',
            type:'directory',
            path:'/root/dir1',
        },{
            name:'file1.txt',
            type:'file',
            path:'/root/dir1/file1.txt',
            contentType: 'text',
            content: 'This is a test text file'
        },{
            name:'file1.txt',
            type:'file',
            path:'/root/file1.txt',
            contentType: 'text',
            content: 'This is a test text file'
        },{
            name:'file2.txt',
            type:'file',
            path:'/root/file2.txt',
            contentType: 'text',
            content: 'This is a test text file'
        },{
            name:'email',
            type:'messages',
            path:'/root/email'
        },{
            name:'Todd',
            type:'message',
            path:'/root/email/Todd',
            messages: [{
                author: 'Todd',
                time: new Date(),
                text: 'This is a test message'
            },{
                author: 'Jess',
                time: new Date(),                
                text: 'This is a test reply'
            }]
        },{
            name:'messages',
            type:'messages',
            path:'/root/messages'
        },{
            name:'John',
            type:'message',
            path:'/root/messages/John',
            messages: [{
                author: 'John',
                time: new Date(),
                text: 'This is a test message'
            },{
                author: 'Jess',
                time: new Date(),                
                text: 'This is a test reply'
            }]
        },{
            name:'directory',
            type:'db',
            path:'/root/directory'
        },{
            name:'record1',
            type:'file',
            path:'/root/directory/record1',
            contentType: 'text',
            content: 'This is a test database record'
        }]

    }],
    terminals: [{
        id: 1,
        displayed: true,
        active: true,
        cursorIndex: 0,
        command: '',
        output: [],
        history: [],
        connection: 'localhost',
        path: '/root'
    },{
        id: 2,
        displayed: false,
        active: false,
        cursorIndex: 0,
        command: '',
        output: [],
        history: [],
        connection: 'localhost',
        path: '/root'
    },{
        id: 3,
        displayed: false,
        active: false,
        cursorIndex: 0,
        command: '',
        output: [],
        history: [],
        connection: 'localhost',
        path: '/root'
    },{
        id: 4,
        displayed: false,
        active: false,
        cursorIndex: 0,
        command: '',
        output: [],
        history: [],
        connection: 'localhost',
        path: '/root'
    },{
        id: 5,
        displayed: false,
        active: false,
        cursorIndex: 0,
        command: '',
        output: [],
        history: [],
        connection: 'localhost',
        path: '/root'
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
                const output = `${terminal.connection}:${terminal.path} $ ${command}`;
                return { command: '', cursorIndex: 0, output: terminal.output.concat(output), history: terminal.history.concat(command).slice(0, MAX_HISTORY)};
            });
        }
        case actions.WRITE_TO_CONSOLE: {
            const {text} = action;
            return updateActiveTerminal(state, terminal => {
                return appendTerminalOutput(terminal, text);
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
                return appendTerminalOutput(terminal, output);
            });
        }
        case actions.SHOW_COMMAND_HISTORY: {
            return updateActiveTerminal(state, terminal => {
                const output = terminal.history.concat();
                return appendTerminalOutput(terminal, output);
            });
        }
        case actions.CHANGE_DIRECTORY: {
            const {args} = action;
            return updateActiveTerminal(state, terminal => {
                if(args.length === 0) return appendTerminalError(terminal, 'You must specify a directory');
                const arg = args[0];
                let path = terminal.path + '/' + arg;
                if(arg === '..' || arg === '../'){
                    path = terminal.path.substring(0, terminal.path.lastIndexOf('/'));
                }
                if(path === '') path = '/';
                const device = state.network.find(device => device.hostname === terminal.connection);
                const file = device.files.find(file => file.path === path);
                if(!file) return appendTerminalError(terminal, `Directory ${arg} not found`);
                if(file.type !== 'directory') return appendTerminalError(terminal, `${arg} is not a directory`);                
                return {
                    path
                };
            });
        }
        case actions.OPEN_FILE: {
            const {args} = action;
            return updateActiveTerminal(state, terminal => {
                if(args.length === 0) return appendTerminalError(terminal, 'You must specify a file');
                const arg = args[0];
                const path = terminal.path + '/' + arg;
                const device = state.network.find(device => device.hostname === terminal.connection);
                const file = device.files.find(file => file.path === path);
                if(!file) return appendTerminalError(terminal, `File ${arg} not found`);
                if(file.type === 'directory') return appendTerminalError(terminal, `${arg} is not a file`);                
                return {
                    path
                };
            });
        }
        case actions.AUTOCOMPLETE: {
            return updateActiveTerminal(state, terminal => {
                const cmd = terminal.command;
                const tokens = cmd.split(' ');
                const isFirstArg = tokens.length === 1;
                const arg = tokens[tokens.length - 1];
                let possibleCommands = [];
                if(isFirstArg){
                    possibleCommands = commands.map(command => command.command);
                }else{
                    const device = state.network.find(device => device.hostname === terminal.connection);
                    const files = device.files.filter(file => file.path === terminal.path + '/' + file.name)
                    possibleCommands = files.map(file => file.name);
                }
                const matchingCommands = possibleCommands.filter(command => command.indexOf(arg) > -1);
                if(matchingCommands.length === 0) return terminal;
                if(matchingCommands.length === 1){
                    const matchingCommand = matchingCommands[0];
                    const newCmd = tokens.slice(0, tokens.length-1).concat(matchingCommand).join(' ');
                    return {command: newCmd, cursorIndex: newCmd.length};
                }
                return appendTerminalOutput(terminal, matchingCommands);
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

function appendTerminalOutput(terminal, output){
    return {output: terminal.output.concat(output).slice(0, MAX_OUTPUT)};
}

function appendTerminalError(terminal, error){
    return appendTerminalOutput(terminal, 'ERROR: ' + error);
}

export default rootReducer;