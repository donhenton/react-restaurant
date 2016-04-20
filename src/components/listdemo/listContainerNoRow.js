import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListItem from './listItem';
import EditForm from './editForm';
import ListService from './services/listService'
import postal from 'postal';
import Immutable from 'immutable';
import {LIST_SERVICE} from './../App';

export default class ListContainerNoRow extends Component {
        
  constructor()
  {
      super();
     // this.keyMap = {};
     
  }
  componentWillMount()
  {
       let me = this;
       this.state =  LIST_SERVICE.getData();
     
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.save.request.complete",
            callback: function (data, envelope) {
                me.processSaveComplete(data,envelope)
            }
        }); 
  }
 
  processSaveComplete(newItems,env)
  {
        let me = this;
    
        me.setState(newItems);
  }
  
  editItem(item,ev)
  {
       console.log("edit "+item.id+" "+JSON.stringify(ev.target));
       postal.publish({
         channel: "restaurants",
         topic: "select.Item",
         data:  item 
     });
  }
 
  deleteItem(e)
  {
     // console.log(this.state.item.id +" "+JSON.stringify(e.target))
  }
  
  
        
  render() {
    return (
      <section>
      
      <Container>
      
            <h2>List Demonstration</h2>
            <div className='grouping'>
                    <div className='restaurantListContainer'>
                    <table className="displayTable">
                        <thead>
                        <tr>
                        <th>Name</th> 
                        <th>Age</th> 
                        <th>Party</th> 
                        <th>Delete</th><th>Edit</th></tr>
                        </thead>

                    <tbody>

                   {

                        this.state.items.map((item,i) => (
                    <tr key={item.id}>
                
                    <td className="tableName"> {item.name} </td>
                    <td className="tableAge"> {item.age} </td>
                    <td className="tableParty"> {item.party} </td>
                    <td className="tableBtn"> <button className="deleteButton" onClick={this.deleteItem.bind(this,item)}>Delete</button> </td>
                    <td className="tableBtn"> <button className="editButton"   onClick={this.editItem.bind(this,item)}>Edit</button> </td>
                </tr>  
                          
                        ))


                    }
                    </tbody>
                    </table>
                    </div>
            
                   
            
            
            
                    <div className="editRestaurantContainer">
                    <EditForm embedded="noRow" />
                    </div>
            </div>
           
      </Container>
      </section>
      
       
    );
  }
}

