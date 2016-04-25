import React from 'react';
import { Component } from 'react';
import ListService from './listdemo/services/listService';
import RestaurantService from './restaurant/restaurantService';

export const LIST_SERVICE = new ListService();
export const RESTAURANT_SERVICE = new RestaurantService();
export default class App extends Component {
        
  constructor()
  {
      super();
       
  }
        
  render() {
    return (
      <div className="mainAppContainer">
        {this.props.children}
      </div>
    );
  }
}