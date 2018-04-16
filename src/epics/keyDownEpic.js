import { Observable } from 'rxjs';
import * as actions from '../actions';
    
const keyDownEpic = (action$, store) =>
  action$
    .filter(action => action.type === actions.KEY_DOWN)
    .switchMap(action => {
        const {event} = action;
        const {code} = event;
        if(code === 'Backspace') return Observable.of(actions.backspace());
        if(code === 'ArrowLeft') return Observable.of(actions.moveCursorBack());
        if(code === 'ArrowRight') return Observable.of(actions.moveCursorForward());
        if(code === 'Home') return Observable.of(actions.moveCursorToStart());
        if(code === 'End') return Observable.of(actions.moveCursorToEnd());
        if(code === 'Tab') {
            event.preventDefault(); 
            return Observable.of(actions.autocomplete());
        }
        console.log('Unknown key', code, event);
        return Observable.of(actions.noop());
    });    
    
export default keyDownEpic;