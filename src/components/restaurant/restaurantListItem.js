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
     // this.callbacks = null;
     
  }
  
  componentWillUnMount()
  {
      this._isMounted = false;
     
     this.subscriptions.map((sub) => {postal.unsubscribe(sub)})
  }
  
   componentDidMount()
  {
      this._isMounted = true;
      
  }
  
  componentWillMount()
  {
      let me = this;
     // this.state = {item: this.props.item,highLighted: this.props.highlighted};
      
      
  }
  
  
     componentWillReceiveProps (nextProps) {
        // if (nextProps.highlighted)
        //     console.log("component will receive props "+JSON.stringify(nextProps))
        }
        
    componentWillUpdate(nextProps,nextState)
    {
       
       // dont set state here it will cause a infinite loop
       
    }
  
  
 
  editItem(item,e)
  {
      this.props.editCallback(this.props.item)
      postal.publish({
        channel: "restaurants-system",
        topic: "edit.Item" ,
        data: this.props.item 
    });
     
  }
  
  checkHighLight(itemId)
  {
      
      if (this.props.highlighted)
      {
          return "restaurantRow highLighted";
      }
      return "restaurantRow";
      
  }
 
  deleteItem( )
  {
      this.props.deleteCallback(this.props.item);
 
  }
        
  render() {
      let item = this.props.item;
      let me = this;
     // console.log("ff render")
      return (
        
                    
            <tr className={me.checkHighLight()}>  
                    <td  onClick={this.editItem.bind(this)} className="nameItem">{item.name} </td> 
                    <td  onClick={this.editItem.bind(this)} className="cityItem">{item.city}</td> 
                    <td  onClick={this.editItem.bind(this)} className="stateItem">{item.state}</td> 
                    <td  onClick={this.editItem.bind(this)} className="zipCodeItem">{item.zipCode}</td> 
                    <td  onClick={this.editItem.bind(this)} className="versionItem">{item.version}</td> 

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