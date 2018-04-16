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
    }
];

export default commands;