import React from 'react';
import { Component } from 'react';
import Container from './../../ContentContainer';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

export default class TodoRedux extends Component {
        
    constructor()
    {
        super();
        this.store = createStore(todoApp);
    }
    
     
  render() {
    return (
      
      <Container>
      <h3>Todo App</h3>
      <p>http://redux.js.org/docs/basics/ExampleTodoList.html</p>
        <Provider store={this.store}>
            <App />
        </Provider>
      </Container>
      
       
    );
  }
  
  
}


 