import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './../reducers' 
import ReduxRestaurantApp from './../containers/reduxRestaurantApp'
import RestaurantDispatcher from './../services/restaurantDispatcher';

export default class RestaurantHolder extends Component {
        
    constructor()
    {
        super();
        this.store = createStore(reducers);
        this.restaurantDispatcher = new RestaurantDispatcher(this.store);
    }
    
     
  render() {
    return (
      
      
       
        <Provider store={this.store}>
           <ReduxRestaurantApp restaurantDispatcher={this.restaurantDispatcher} />
        </Provider>
       
      
       
    );
  }
  
  
}