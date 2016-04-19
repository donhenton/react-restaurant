import React from 'react';
import { Component } from 'react';
import postal from 'postal';

export default class ListItem extends Component {
   
       
  constructor()
  {
      super();
       
     
  }
  
  componentWillMount()
  {
      
      this.state = {item: this.props.item};
      
  }
 
  editItem(id)
  {
      console.log("edit "+id+" "+this.state.item.id);
      postal.publish({
        channel: "restaurants",
        topic: "select.Item",
        data: this.state.item 
    });
  }
 
  deleteItem(e)
  {
      console.log(this.state.item.id +" "+JSON.stringify(e.target))
  }
        
  render() {
      return (
              
          <tr>
                
                    <td className="tableItem"> {this.state.item.name} </td>
                    <td className="tableItem"> <button className="deleteButton" onClick={this.deleteItem.bind(this)}>Delete</button> </td>
                    <td className="tableItem"> <button className="editButton"   onClick={this.editItem.bind(this,this.state.item.id)}>Edit</button> </td>
                </tr>          
                    
                    
                    
                    )
      
  }
  
  }