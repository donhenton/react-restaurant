import React from 'react';
import { Component } from 'react';
import ListService from './listdemo/services/listService';

export const LIST_SERVICE = new ListService();
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