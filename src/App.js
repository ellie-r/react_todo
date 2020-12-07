import React, {Component} from 'react';
import './App.css';
import {AddNewTaskForm} from './Components/AddNewTaskForm';
import {Header} from "./Components/Header.js";
import {TaskList} from "./Components/TaskList.js";
import {Button} from "./Components/Button.js";
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], headerName: 'Tasks', taskType: 'todo', nextView: 'View Complete Tasks', buttonName: 'complete', visibility: 'visible'}
        fetch('http://localhost:3000/task')
            .then( res => res.json())
            .then( res => {
                if (res.success) {
                    this.setState({tasks: res.data})
                } else {
                    this.setError(res.message)
                }
            }).catch( (e) => {
            this.setError('Unexpected error occurred, please try again');
        })
    }

    updateTasks = () => {
        let url = 'http://localhost:3000/task'
        if (this.state.taskType == 'completed') {
            url += '?completed=1';
        }
        fetch(url)
            .then( res => res.json())
            .then( res => {
                if (res.success) {
                    this.setState({tasks: res.data})
                } else {
                    this.setError(res.message)
                }
            }).catch( (e) => {
            this.setError('Unexpected error occurred, please try again');
        })
    }

    changeTaskList = () => {
        let url = 'http://localhost:3000/task';
        if (this.state.taskType == 'todo') {
            url += '?completed=1';
            this.setState( {headerName: 'Completed Tasks', taskType: 'completed', buttonName: 'delete', nextView: 'View All Tasks', visibility: 'hidden'})
        } else {
            this.setState( {headerName: 'Tasks',taskType: 'todo', buttonName: 'complete', nextView: 'View Completed Tasks', visibility: 'visible'})
        }
        fetch(url)
            .then( res => res.json())
            .then( res => {
                if (res.success) {
                    this.setState({tasks: res.data})
                } else {
                    this.setError(res.message)
                }
            }).catch( (e) => {
            this.setError('Unexpected error occurred, please try again');
        })
    }

    sortTasksAlphabetically = () => {
        this.setState({tasks: this.state.tasks.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : (a.name.toLowerCase() === b.name.toLowerCase()) ? ((a._id > b._id) ? 1 : -1) : -1 )})
    }

    setError = (errMsg) => {
        this.setState({hasError: errMsg});
    }

    render () {
      return (
          <div className="App">
              {this.state.hasError && <h3 className="error"> {this.state.hasError} </h3>}
              <AddNewTaskForm className={this.state.visibility} update={this.updateTasks} setError={this.setError}/>
              <div className="taskListTop">
                  <Header title={this.state.headerName}/>
                  <div className="buttons">
                      <Button buttonName={this.state.nextView} onClick={this.changeTaskList}/>
                      <Button buttonName='Sort A-Z' onClick={this.sortTasksAlphabetically} />
                  </div>
              </div>
              <TaskList taskType={this.state.taskType} taskList={this.state.tasks} update={this.updateTasks} buttonName={this.state.buttonName} setError={this.setError}/>
          </div>
      );
  }
}

export default App;
