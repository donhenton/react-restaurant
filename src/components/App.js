import React from 'react';
import { Component } from 'react';
import ListService from './listdemo/services/listService';

export default class App extends Component {
        
  constructor()
  {
      super();
      this.service = new ListService();
  }
        
  render() {
    return (
      <div className="container p-y-1">
        {this.props.children}
      </div>
    );
  }
}