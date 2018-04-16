import 'typeface-source-code-pro';
import './App.css'

import React, {Component} from 'react'

import { Provider } from 'react-redux';

import store from './store';

import Page from './containers/Page';

const state = store.getState();

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Page/>
        </Provider>
    )
  }
}

export default App
