import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListItem from './listItem';
import EditForm from './editForm';
import ListService from './services/listService'
import postal from 'postal';
import Immutable from 'immutable';
import {LIST_SERVICE} from './../App';
import classnames from 'classnames';
import {EMPTY_DATA,cleanDisplay} from './services/utils'

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
       this.state["inEditMode"] = false;
       this.state["inAddMode"] = false;
       console.log("component will mount list no row "+this.state.inEditMode)
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.save.request.complete",
            callback: function (data, envelope) {
                me.processSaveComplete(data,envelope)
            }
        }); 
        
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.edit.cancel",
            callback: function (data, envelope) {
                me.processEditCancel(data,envelope)
            }
        }); 
  }
  
  processEditCancel(newItems,env)
  {
        
       this.resetAddEditState();
  }
 
  processSaveComplete(newItems,env)
  {
        let me = this;
      //  console.log("process save complete "+this.state.inEditMode)
       //set state merges the requested items with the current state
       //so inEditMode is false at this point false was set in componentWill Mount
        me.setState(newItems);
       this.resetAddEditState();
  }
  
  
  displayEditFormCSS()
  {
      //console.log("display css "+this.state.inEditMode);
      if (this.state.inEditMode || this.state.inAddMode)
      {
         return "editRestaurantContainer";
      }
      else
      {
          return "editRestaurantContainer hidden"; 
      }
      
  }
  
  addItem(ev)
  {
      this.setState({'inAddMode': true,'inEditMode':false},function( )
       {
        console.log("in add item")
        postal.publish({
            channel: "restaurants",
            topic: "select.Item",
            addEditState:  this.determineEditState(),
            data:    EMPTY_DATA
        });
           
           
       })
      
      
  }
  
  resetAddEditState()
  {
      this.setState({inAddMode: false, inEditMode: false});
  }
  
        editItem(item, ev)
        {
        //the function is a callback once state is complete
        this.setState({'inAddMode': false, 'inEditMode':true}, function()
        {
        console.log("edit " + item.id + " edit mode " + this.state.inEditMode);
                postal.publish({
                channel: "restaurants",
                        topic: "select.Item",
                        addEditState:  this.determineEditState(),
                        data:  item
                });
        })
       
       
       
       
     
  }
 
  deleteItem(e)
  {
     // console.log(this.state.item.id +" "+JSON.stringify(e.target))
  }
  
  determineEditState()
  {
      if (this.state.inEditMode)
      {
          return "EDIT"
      }
      if (this.state.inAddMode)
      {
          return "ADD";
      }
  }
        
  render() {
    return (
      <section>
      
      <Container>
      
            <h2>List Demonstration</h2>
            <div className='grouping'>
                    <div className='restaurantListContainer'>
                    <div>
                    <button onClick={this.addItem.bind(this)} className="editButton addButton">Add Record</button>
                    </div>
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
                
                    <td className="tableName">{item.name}</td>
                    <td className="tableAge">{item.age}</td>
                    <td className="tableParty">{item.party}</td>
                    <td className="tableBtn"><button className="deleteButton" onClick={this.deleteItem.bind(this,item)}>Delete</button></td>
                    <td className="tableBtn"><button className="editButton"   onClick={this.editItem.bind(this,item)}>Edit</button></td>
                </tr>  
                          
                        ))


                    }
                    </tbody>
                    </table>
                    </div>
            
                   
            
            
            
                    <div className={this.displayEditFormCSS()}>
                    <EditForm addEditStateViaProps={this.determineEditState() }/>
                    </div>
            </div>
           
      </Container>
      </section>
      
       
    );
  }
}

