import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import {EMPTY_DATA,cleanDisplay} from './services/utils'

export default class EditForm extends Component {
   
       
  constructor()
  {
      super();
       
     
  }
  
  componentWillMount()
  {
      
      this.state = {itemDisplay: cleanDisplay(EMPTY_DATA), itemData: EMPTY_DATA};
    //  console.log(" xx " + this.state.itemData.id)
  }
  
  processName(ev)
  {
     let  copyState = JSON.parse(JSON.stringify( this.state ));  
     copyState.itemDisplay.name = ev.target.value;
     this.setState(copyState);
      
  }
  
  cancelItem(e)
  {
      e.preventDefault();
      console.log("cancel "+this.state.itemData.id +" "+JSON.stringify(e.target))
  }
 saveItem(id,e)
  {
      e.preventDefault();
      console.log("save "+ id +" "+JSON.stringify(e.target))
  }
 
  render() {
      return (
              
           <form id='editForm' noValidate>
                <table>
                <tbody>
                <tr><th>Id:</th><td>{this.state.itemDisplay.id}</td></tr>
                <tr><th>Name:</th><td><input type='text' size='30' value={this.state.itemDisplay.name} onChange={this.processName.bind(this)} /></td></tr>
                <tr><th>Age:</th><td>{this.state.itemDisplay.age}</td></tr>
                <tr>
                     <td> <button className="deleteButton" onClick={this.cancelItem.bind(this)}>Cancel</button> </td>
                    <td> <button className="editButton"   onClick={this.saveItem.bind(this,this.state.itemData.id)}>Save</button> </td>
                
                </tr>
        
                </tbody>
                </table>
           
           
           </form>
                    
                    
                    )
      
  }
  
  }