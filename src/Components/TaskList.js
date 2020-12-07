import React, {Component} from 'react';
import {TaskItem} from "./TaskItem";
import './TaskList.css';

export class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: ''}
    }
    onButtonClick = (e) => {
        let taskId = e.target.parentElement.id;
        let method;
        if (this.props.buttonName === 'complete') {
            method = 'put';
        } else {
            method = 'delete';
        }
        fetch('http://localhost:3000/task/' + taskId,
            {
                method: method
            }).then(response => {
            return response.json()})
            .then( res => {
                if (res.success) {
                    this.props.setError('');
                    this.props.update();
                } else {
                    this.props.setError(res.message);
                }
            })
            .catch(err => {
                this.props.setError('Unexpected error occurred, please try again');
        })
    }

    render() {

        return (
            <div>
                {this.state.hasError && <h3 className="error"> {this.state.hasError} </h3>}
                <ul>
                    {this.props.taskList.map((task) => {
                    return <TaskItem name={task.name} taskId={task._id} buttonName={this.props.buttonName} onClick={this.onButtonClick.bind(this)}/>
                }) }
                </ul>
            </div>
        )
    }
}