import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListItem from './listItem';
import EditForm from './editForm';
import {LIST_SERVICE} from './../App';
import postal from 'postal';
import Immutable from 'immutable';
import {EMPTY_DATA,cleanDisplay} from './services/utils'
//http://brewhouse.io/blog/2015/03/24/best-practices-for-component-state-in-reactjs.html 

export default class ListContainerRow extends Component {
        
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
       postal.subscribe({
            channel: "restaurants",
            topic: "item.save.request.complete",
            callback: function (data, envelope) {
                me.processSaveComplete(data,envelope)
            }
        }); 
        
        postal.subscribe({
            channel: "restaurants",
            topic: "item.edit.cancel",
            callback: function (data, envelope) {
                me.processEditCancel(data,envelope)
            }
        }); 
        
        postal.subscribe({
            channel: "restaurants",
            topic: "select.Item",
            callback: function (data, envelope) {
                
                me.setState({'inAddMode': false,'inEditMode':true},function( )
                    {
                            console.log("in select item")
             
           
           
                    })
                
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
 
    resetAddEditState()
     {
         this.setState({inAddMode: false, inEditMode: false});
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
  
  addItem(ev)
  {
      this.setState({'inAddMode': true,'inEditMode':false},function( )
       {
        console.log("in add item")
        postal.publish({
            channel: "restaurants",
            topic: "select.Item",
            addEditState:  "ADD",
            data:    EMPTY_DATA
        });
           
           
       })
      
      
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

                         <ListItem key={item.id} item={item} />
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

