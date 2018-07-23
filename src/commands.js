import * as actions from './actions';

const commands = [
    {
        command: 'help',
        action: actions.SHOW_HELP
    },{
        command: 'history',
        action: actions.SHOW_COMMAND_HISTORY
    },{
        command: 'clear',
        action: actions.CLEAR_CONSOLE
    },{
        command: 'cd',
        action: actions.CHANGE_DIRECTORY
    },{
        command: 'open',
        action: actions.OPEN_FILE
    }
];

export default commands;