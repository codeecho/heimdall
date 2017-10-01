require('normalize.css/normalize.css');

import Demo from '../demo/Demo';
import TerminalManager from '../controllers/TerminalManager';
import Logger from '../controllers/Logger';

import React from 'react';
import PerspectiveGrid from './PerspectiveGrid';
import TerminalButton from './TerminalButton';
import Log from './Log';
import Terminals from './Terminals';
import PerformanceMonitor from './PerformanceMonitor'

export default class AppComponent extends React.Component {

  constructor(){
    super();
    this.network = new Demo().network;
    this.logger = new Logger(10);
    this.terminalManager = new TerminalManager(this.logger, this.network);
    this.state = {
      terminals: this.terminalManager.terminals
    };
  }

  openTerminal(){
    this.terminalManager.openTerminal();
    this.forceUpdate();
  }

  closeTerminal(terminal){
    terminal.close();
    this.forceUpdate();
  }

  activateTerminal(terminal){
    this.terminalManager.activateTerminal(terminal);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <PerspectiveGrid/>
        <Log controller={this.logger}/>
        <Terminals terminals={this.state.terminals} activateTerminal={this.activateTerminal.bind(this)} closeTerminal={this.closeTerminal.bind(this)}/>
        <PerformanceMonitor/>
        <TerminalButton openTerminal={this.openTerminal.bind(this)}/>
      </div>
    );
  }

  componentDidMount(){
    this.logger.info("Initialising system...");
    this.logger.info("System initialised");
    this.openTerminal();
  }
}