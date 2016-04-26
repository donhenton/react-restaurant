import React from 'react';
import { Component } from 'react';
 
 
export default class ListElement extends Component {
        
  constructor()
  {
      super();
       
  }
        
  render() {
    return (
      <tr>
         
         <td><button className="editButton">Action</button></td>
         <td>info</td>
      </tr>
    );
  }
}