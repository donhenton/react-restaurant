import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import Immutable from 'immutable';

export default class ListItem extends Component {
   
       
  constructor()
  {
      super();
      this.tempSubscription = null;
     
  }
  
  componentWillMount()
  {
      let me = this;
      this.state = {item: this.props.item};
      
      this.tempTopicId = "item.edit.action-"+this.props.item.id;
      
        
       
      
  }
  
  
  
  
  
 
  editItem()
  {
      //console.log("edit "+id+" "+this.state.item.id);
      let me = this;
      this.tempSubscription = postal.subscribe({
            channel: "restaurants",
            topic: this.tempTopicId,
            callback: function (data, envelope) {
               console.log("got message on "+envelope.topic+" in listItem unsubscribing temp");
               if (envelope.edit_action && envelope.edit_action == "CANCEL")
               {
                 
               }
               else
               {
                    me.setState({item: data});
               }
               me.tempSubscription.unsubscribe();
               
            }
        }); 
      //tell editform and list continer that you are editing
      postal.publish({
        channel: "restaurants",
        replyTo: this.tempTopicId,
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