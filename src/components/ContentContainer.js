import React from 'react';
import { Component } from 'react';
import MenuBar from './MenuBar';

export default class ContentContainer extends Component {
        
  
        
  render() {
    return (
      <div>      
      <MenuBar />
      <div>
       {this.props.children}
      </div>
      </div>
       
    );
  }
}
