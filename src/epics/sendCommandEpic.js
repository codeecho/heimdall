import { Observable } from 'rxjs';
import * as actions from '../actions';
import commands from '../commands';

const sendCommandEpic = (action$, store) =>
  action$
    .filter(action => action.type === actions.SEND_COMMAND)
    .switchMap(action => {
        const {command} = action;
        const tokens = command.split(' ');
        const executable = tokens[0];
        const args = tokens.length > 1 ? tokens.slice(1) : args;
        const matchingCommand = commands.find(command => command.command === executable);
        if(matchingCommand) return Observable.of({ type: matchingCommand.action, executable, args});
        return Observable.of(actions.writeToConsole(`Unrecognised command: ${executable}`));
    });   
    
export default sendCommandEpic;