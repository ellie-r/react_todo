import React, {Component} from 'react';

export class Input extends Component {
    render() {
        return (
            <input type="text" id="newTask" value={this.props.input}/>
        )
    }
}