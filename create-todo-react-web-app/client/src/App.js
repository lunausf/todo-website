import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      todoListName: '',
      todoListDescription: '',
      addTodoListResponse: '',
      todoItemId: '',
      todoItemListId: '',
      todoItemDescription: '',
      todoItemStatus: '',
      addTodoItemResponse: '',
      updateToDoItemResponse: '',
      deleteToDoItemResponse: '',
      deleteToDoListResponse: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.addToDoListHandleSubmit = this.addToDoListHandleSubmit.bind(this)
  }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async() => {
  //   const response = await fetch('/api/hello');

  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  handleChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({[name]: val});
  }

  addToDoListHandleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/addToDoList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: this.state.todoListName,
        description: this.state.todoListDescription
       }),
    });
    const body = await response.text();
    this.setState({addTodoListResponse: body });
  };

  addToDoItemHandleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/addToDoItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        listId: this.state.todoItemListId,
        description: this.state.todoItemDescription,
        status: this.state.todoItemStatus
       }),
    });
    const body = await response.text();
    this.setState({addTodoItemResponse: body});
  };

  updateToDoItemHandleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`/api/v1/updateItem/${this.state.todoItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        status: this.state.todoItemStatus
       }),
    });
    const body = await response.text();
    this.setState({updateToDoItemResponse: body});
  };

  deleteToDoItemHandleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`/api/v1/deleteToDoItem/${this.state.todoItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.text();
    this.setState({deleteToDoItemResponse: body});
  };

  deleteToDoListHandleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`/api/v1/deleteToDoList/${this.state.todoItemListId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.text();
    this.setState({deleteToDoListResponse: body});
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.addToDoListHandleSubmit}>
          <p>
           <strong>Add a todolist {this.state.todoListName}: {this.state.todoListDescription}</strong>
          </p>
          <p>Enter todolist name:</p>
          <input
            type="text"
            name="todoListName"
            onChange={this.handleChange}
          />
          <p>Enter todoList description:</p>
          <input
            type="text"
            name="todoListDescription"
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.addTodoListResponse}</p>

        <form onSubmit={this.addToDoItemHandleSubmit}>
          <p>
            <strong>Add a todoItem {this.state.todoItemListId}: {this.state.todoItemDescription}: {this.state.todoItemStatus}</strong>
          </p>
          <p>Enter a todoListId for the todoItem:</p>
          <input
            type="text"
            name="todoItemListId"
            onChange={this.handleChange}
          />
          <p>Enter todoItem description:</p>
          <input
            type="text"
            name="todoItemDescription"
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit">Submit</button>
          </form>
          <p>{this.state.addTodoItemResponse}</p>

          <form onSubmit={this.updateToDoItemHandleSubmit}>
          <p>
            <strong>Update a todoItem status{this.state.todoItemId}: {this.state.todoItemStatus}</strong>
          </p>
          <p>Enter a todoItem Id for update:</p>
          <input
            type="text"
            name="todoItemId"
            onChange={this.handleChange}
          />
          <p>Enter update status:</p>
          <input
            type="text"
            name="todoItemStatus"
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit">Submit</button>
          </form>
          <p>{this.state.updateToDoItemResponse}</p>


          <form onSubmit={this.deleteToDoItemHandleSubmit}>
          <p>
            <strong>Delete a todoItem{this.state.todoItemId}</strong>
          </p>
          <p>Enter a todoItem Id for deleting:</p>
          <input
            type="text"
            name="todoItemId"
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit">Submit</button>
          </form>
          <p>{this.state.deleteToDoItemResponse}</p>

          <form onSubmit={this.deleteToDoListHandleSubmit}>
          <p>
            <strong>Delete a todoList{this.state.todoItemListId}</strong>
          </p>
          <p>Enter a todoListId for deleting:</p>
          <input
            type="text"
            name="todoItemListId"
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit">Submit</button>
          </form>
          <p>{this.state.deleteToDoListResponse}</p>


      </div>
    );
  }
}

export default App;
