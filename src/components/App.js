import React from 'react';
import { Component } from 'react';

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