import React, {Component} from 'react';

import logger from '../utils/logger';

export default class Log extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            messages: []
        }       
    }
    
    componentDidMount(){
        logger.addListener(messages => this.setState({messages}));
    }
    
    render(){
        return (
            <div className='log-messages'>
                {this.state.messages.map((message, i) => <div key={i} className={`log-message ${message.level}`}>{message.message}</div>)}
            </div>
        );
    }
    
    
}