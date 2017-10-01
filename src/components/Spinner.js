import React from 'react';

export default class Spinner extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            value: props.startingValue || 0
        };
        const updateInterval = this.props.updateInterval || 10000
        if(updateInterval > 0){
            setInterval(() => {
                const newValue = Math.floor(Math.random()*80);
                this.setState({value: newValue})
            }, updateInterval);
        }
    }

    render(){
        return (
            <div class="loader-wrapper">
                <div class="loader"> </div>
                <div class="loader-text">{this.props.text}</div>
                <div class="loader-value">{this.state.value}%</div>
            </div>
        );    
    }

}