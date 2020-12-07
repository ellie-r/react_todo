import React, {Component} from 'react';
import {Label} from './Label';
import {Input} from './Input';
import {Button} from './Button';
import './addNewTaskForm.css';

export class AddNewTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({input: '', hasError: ''})
    }
    addNewTask = (e) => {
        fetch('http://localhost:3000/task/', {
            method: 'post',
            body: JSON.stringify({"taskName": e.target.previousSibling.value}),
            headers: {
                    'Content-Type': 'application/json'
                }
        }).then( response => response.json()).then( res => {
                if (res.success) {
                    e.target.previousSibling.value = '';
                    this.props.setError('');
                    this.props.update();
                } else {
                    this.props.setError(res.message);
                }
        }).catch( (err) => {
            this.props.setError('Unexpected error occurred, please try again');
        });

    }

    render() {
        return (
            <div>
                {this.state.hasError && <h3 className="error"> {this.state.hasError} </h3>}
                <form className={this.props.className}>
                    <Label />
                    <Input value={this.state.input}/>
                    <Button onClick={this.addNewTask} buttonName="Submit"/>
                </form>
            </div>
    )
    }
}