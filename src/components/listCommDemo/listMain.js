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
      
        <table>
            <tbody>
            <tr><th>Input</th><td><input type="text" value="alpha" onChange="" /></td><td><button className="editButton">Send</button></td></tr>
            </tbody>
        
        </table>
      
      
        <div className="commDemoList">
        
        <table>
            <tbody>
                <ListElement />
                <ListElement />
                <ListElement />
           </tbody>
        
        </table>
         
        </div> 
         
         
      </div>
    );
  }
}