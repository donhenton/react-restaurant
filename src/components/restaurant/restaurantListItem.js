import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import Immutable from 'immutable';

export default class ListItem extends Component {
   
       
  constructor()
  {
      super();
      this.tempSubscription = null;
      this._isMounted = false;
      this.highlighted = false;
      this.subscriptions = [];
     
  }
  
  componentWillUnMount()
  {
      this._isMounted = false;
     // console.log("unMount "+this._isMounted);
     this.subscriptions.map((sub) => {postal.unsubscribe(sub)})
  }
  
   componentDidMount()
  {
      this._isMounted = true;
      // console.log("didMount "+this._isMounted);
  }
  
  componentWillMount()
  {
      let me = this;
      this.state = {item: this.props.item,highLighted: false};
      
       
      let messageSub = 
      postal.subscribe({
            channel: "restaurants",
            topic: 'list.item.messages',
            callback: function (data, envelope) {
                
               if (envelope.messageType == "CANCEL")
               {
                 
               }
               if (envelope.messageType == "SAVE")
               {
                   
               }
               if (envelope.messageType == "HIGHLIGHT")
               {
                 //  console.log("fff  message "+me._isMounted);
                    if (me._isMounted)
                    {
                        if (data.id === me.state.item.id)
                        {
                            me.setState({highLighted: true})
                        }
                        else
                        {
                            me.setState({highLighted: false})
                        }
                   }
               }
                
               
               
            }
        });   
       
       me.subscriptions.push(messageSub);
      
  }
  
  
  
  
  
 
  editItem()
  {
      console.log("edit id " +this.state.item.id);
      let me = this;
     // this.setState({highLighted: true})
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
        topic: "edit.Item" ,
        data: this.state.item 
    });
     postal.publish({
        channel: "restaurants",
        messageType: "HIGHLIGHT",
        topic: "list.item.messages" ,
        data: this.state.item 
    });
  }
  
  checkHighLight(itemId)
  {
      
      if (this.state.highLighted)
      {
          return "restaurantRow highLighted";
      }
      return "restaurantRow";
      
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
      let me = this;
     // console.log("ff render")
      return (
        
                    
            <tr onClick={this.editItem.bind(this)} className={me.checkHighLight()}>  
                    <td  className="nameItem">{item.name}</td> 
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