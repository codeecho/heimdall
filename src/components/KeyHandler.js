import React, {Component} from 'react';

export default class KeyHandler extends Component{
    
    componentDidMount(){
        document.body.addEventListener('keypress', this.props.keyPress);
        document.body.addEventListener('keydown', this.props.keyDown);        
    }
    
    render(){
        return null;
    }
    
}