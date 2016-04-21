import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import Immutable from 'immutable';

export default class ListItem extends Component {
   
       
  constructor()
  {
      super();
       
     
  }
  
  componentWillMount()
  {
      let me = this;
      this.state = {item: this.props.item};
       this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.save.request.complete",
            callback: function (data, envelope) {
               // me.processSaveComplete(data,envelope)
            }
        }); 
        
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.edit.cancel",
            callback: function (data, envelope) {
               // me.processEditCancel(data,envelope)
            }
        }); 
      
  }
  
  
  
  
  
 
  editItem()
  {
      //console.log("edit "+id+" "+this.state.item.id);
      postal.publish({
        channel: "restaurants",
        topic: "select.Item",
        addEditState:  "EDIT",
        data: this.state.item 
    });
  }
 
  deleteItem(e)
  {
     // console.log(this.state.item.id +" "+JSON.stringify(e.target))
  }
        
  render() {
      return (
              
          <tr>
                
                    <td className="tableName">{this.state.item.name}</td>
                    <td className="tableAge">{this.state.item.age}</td>
                    <td className="tableParty">{this.state.item.party}</td>
                    <td className="tableBtn"><button className="deleteButton" onClick={this.deleteItem.bind(this)}>Delete</button></td>
                    <td className="tableBtn"><button className="editButton"   onClick={this.editItem.bind(this)}>Edit</button></td>
                </tr>          
                    
                    
                    
                    )
      
  }
  
  }