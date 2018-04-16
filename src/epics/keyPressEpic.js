import { Observable } from 'rxjs';
import * as actions from '../actions';

const keyPressEpic = (action$, store) =>
  action$
    .filter(action => action.type === actions.KEY_PRESS)
    .switchMap(action => {
        const {event} = action;
        const {key, code} = event;
        if(key.match(/^[a-zA-Z0-9!\"£$%^&*()-_=+ "]$/)) return Observable.of(actions.characterTyped(key));
        if(key === 'Enter') {
            const state = store.getState();
            const terminal = state.terminals.find(terminal => terminal.active);
            const command = terminal.command;   
            return Observable.of(actions.sendCommand(command));
        }
        console.log('Unknown Key', event);
        return Observable.of(actions.noop());
    });   
    
function matches(string, regexes){
    for(let i=0; i < regexes.length; i++){
        if(string.match(regexes[i])){
            return true;
        }
    }
    return false;
}
    
export default keyPressEpic;