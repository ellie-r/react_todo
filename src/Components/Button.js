import React, {Component} from 'react';
import './Button.css';

export class Button extends Component {

    render() {
        return (
            <button type="button" className={this.props.buttonName} onClick={this.props.onClick}>{this.props.buttonName}</button> //button tag has click=doThing
        )
    }
}