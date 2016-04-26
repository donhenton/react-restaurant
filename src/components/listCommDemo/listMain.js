import React from 'react';
import { Component } from 'react';
import ListElement from './listElement';
 
export default class ListMain  extends Component {
        
  constructor()
  {
      super();
       
  }
        
  render() {
    return (
      <div className="listMainContainer">
      
       
      
      
       
         <ListElement />
         <ListElement />
         <ListElement />
      </div>
    );
  }
}