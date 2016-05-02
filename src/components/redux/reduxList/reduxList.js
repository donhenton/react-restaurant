import React from 'react';
import { Component } from 'react';
import Container from './../../ContentContainer';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers' 
import ListApp from './containers/ListApp'

export default class ReduxList extends Component {
        
    constructor()
    {
        super();
        this.store = createStore(reducers);
    }
    
     
  render() {
    return (
      
      <Container>
      <h3>Redux List</h3>
       
        <Provider store={this.store}>
           <ListApp />
        </Provider>
      </Container>
      
       
    );
  }
  
  
}


 