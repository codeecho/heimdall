import React from 'react';

import Explorer from './Explorer';
import FileViewer from './FileViewer';
import DatabaseViewer from './DatabaseViewer';
import Map from './Map';

const TerminalWindow = ({terminal}) => {
    return (
        <div class="terminal-window">
            <ActiveTab terminal={terminal} />
        </div>
    )
}

const ActiveTab = ({terminal}) => {
    const activeTab = terminal.activeTab;
    if(activeTab == 'explorer'){
        return <Explorer directory={terminal.currentDirectory} />
    } else if (activeTab == 'fileViewer'){
        return <FileViewer file={terminal.currentFile} />
    } else if (activeTab == 'databaseViewer'){
        return <DatabaseViewer database={terminal.currentFile} filters={terminal.filters} />
    } else if (activeTab == 'map'){
        return <Map location={terminal.currentLocation} devices={terminal.devices} />
    }
}

export default TerminalWindow;