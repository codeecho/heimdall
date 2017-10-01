import React from 'react';
import Draggable from 'react-draggable'
import toClassString from '../Utils/Utils';

import TerminalWindow from './TerminalWindow';
import Shell from './Shell';

class Terminal extends React.Component{

    constructor(props){
        super(props);
        this.props.terminal.setView(this);
    }

    activate(){
        if(!this.props.terminal.isActive){
            this.props.activateTerminal(this.props.terminal);
        }
    }

    close(){
        this.props.closeTerminal(this.props.terminal);
    }

    changeDirectory(directory){
        this.props.terminal.changeDirectory(directory);
        this.forceUpdate();
    }

    openFile(file){
        this.props.terminal.openFile(file);
        this.forceUpdate();
    }

    closeFile(){
        this.props.terminal.closeFile();
        this.forceUpdate();
    }

    filter(filters){
        this.props.terminal.filters = filters;
        this.forceUpdate();
    }

    connect(ipAddress){
        this.props.terminal.connect(ipAddress);
        this.forceUpdate();
    }

    disconnect(){
        this.props.terminal.disconnect();
        this.forceUpdate();
    }

    locateAddress(number, areaCode){
        this.props.terminal.showAddress(number, areaCode);
        this.forceUpdate();
    }

    scanLocation(){
        this.props.terminal.showDevices();
        this.forceUpdate();
    }

    render() {
        const terminal = this.props.terminal;
        const terminalClasses = toClassString({
            terminal: true,
            modal: true,
            in: terminal.isOpen,
            active: terminal.isActive
        });
        const dragStyle = {cursor: 'move'};
        return (
            <Draggable handle=".modal-header">
                <div tabIndex="-1" role="dialog" data-backdrop="false" class={terminalClasses} onClick={this.activate.bind(this)}>
                    <div role="document" class="modal-dialog">
                        <div class="modal-content">
                            <div style={dragStyle} class="modal-header">Terminal {terminal.id}
                                <button type="button" data-dismiss="modal" aria-label="Close" class="close" onClick={this.close.bind(this)}><span aria-hidden="true">×</span></button>
                                <h4 class="modal-title"> </h4>
                            </div>
                            <div class="modal-body">
                                <TerminalWindow terminal={terminal} />
                            </div>
                            <div class="modal-footer">
                                <Shell shell={terminal.shell} close={this.close.bind(this)} changeDirectory={this.changeDirectory.bind(this)} openFile={this.openFile.bind(this)}
                                    closeFile={this.closeFile.bind(this)} filter={this.filter.bind(this)} connect={this.connect.bind(this)} 
                                    disconnect={this.disconnect.bind(this)} locateAddress={this.locateAddress.bind(this)} scanLocation={this.scanLocation.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default Terminal;