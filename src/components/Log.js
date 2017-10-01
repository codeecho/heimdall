import React from 'react';

export default class Log extends React.Component{
    constructor(props){
        super(props);
        this.props.controller.setView(this);
        this.state = {
            messages: []
        }
    }

    update(messages){
        this.setState({
            messages
        });
    }

    render(){
        return (
            <div id="log">
                {this.state.messages.map((message) => <LogMessage message={message}/>)}
            </div>
        );
    }
}

const LogMessage = ({message}) => {
    const classes = 'log-message log-level-' + message.level;
    const level = message.level.toUpperCase()
    return (
        <p class={classes}>[{level}]: {message.message}</p>
    );
}