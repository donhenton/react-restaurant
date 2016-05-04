import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import Immutable from 'immutable';

export default class RestaurantItem extends Component {
   
       
  constructor()
  {
      super();
       
     
  }
  
  componentWillUnMount()
  {
      
  }
  
   componentDidMount()
  {
     
      
  }
  
  componentWillMount()
  {
      
      
      
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
      
 
  }
        
  render() {
      let item = this.props.restaurant;
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