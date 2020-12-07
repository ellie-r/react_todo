import React, {Component} from 'react';
import {Button} from './Button.js';
import './TaskItem.css';

export class TaskItem extends Component {
    render() {
        return (
            <li id={this.props.taskId}>{this.props.name}<Button buttonName={this.props.buttonName} onClick={this.props.onClick}/></li>
    )
    }
}