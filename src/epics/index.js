import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import keyDownEpic from './keyDownEpic';
import keyPressEpic from './keyPressEpic';
import sendCommandEpic from './sendCommandEpic';

const debugEpic = (action$, store) =>
  action$
    .do(action => console.log('ACTION:', action))
    .switchMap(() => Observable.empty());

const rootEpic = combineEpics(
  debugEpic,
  keyDownEpic,
  keyPressEpic,
  sendCommandEpic
);

export default rootEpic;