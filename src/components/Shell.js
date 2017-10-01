import React from 'react';

class Shell extends React.Component{

    componentDidMount(){
        const shell = this.props.shell;
        shell.initialise(this);
    }

    render(){
        const id = this.props.shell.id;
        const panelId = 'shell-panel' + id;
        const viewId = 'shell-view' + id;
        const cliId = 'shell-cli' + id;
        return (
            <div id={panelId} class="shell-panel">
                <div>Type <code>help</code> or hit <code>TAB</code> for a list of commands.</div>
                <div id={viewId} class="shell-view">
                    <div id={cliId} class="shell-cli"><span class="prompt">[1] $</span><span class="input"><span class="left"></span><span class="cursor"> </span><span class="right"></span></span></div>
                </div>
            </div>
        )
    }

}

export default Shell;