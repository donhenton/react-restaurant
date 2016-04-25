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
      console.log("edit id " +this.state.item.id);
      let me = this;
      /*
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
        */
      //tell editform and list container that you are editing
      postal.publish({
        channel: "restaurants",
        replyTo: this.tempTopicId,
        topic: "edit.Item" ,
        data: this.state.item 
    });
  }
 
  deleteItem(item,e)
  {
 
      
     // console.log("save "+ id +" "+JSON.stringify(topicRequest));
        postal.publish({
        channel: "restaurants",
        actionMode: "DELETE",
        topic: "item.delete.request" ,
        data: this.state.item
    });
  }
        
  render() {
      let item = this.state.item;
      return (
        
                    
            <tr>  
                    <td className="nameItem">{item.name}</td> 
                    <td className="cityItem">{item.city}</td> 
                    <td className="stateItem">{item.state}</td> 
                    <td className="zipCodeItem">{item.zipCode}</td> 
                    <td className="versionItem">{item.version}</td> 

                    <td className="actionItems">
                    <button onClick={this.editItem.bind(this)} className="editButton">Edit</button>
                    </td>
                    <td className="actionItems">
                    <button onClick={this.deleteItem.bind(this)} className="warnButton">Delete</button>
                     </td> 
            </tr>        
                    
                    )
      
  }
  
  }