import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListItem from './listItem';
import EditForm from './editForm';
import {getData} from './services/listService'
import postal from 'postal';
import Immutable from 'immutable';
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
       this.state = getData();
       console.log("type of "+JSON.stringify(this.state))
//        this.state.items.map(function(d,i)
//        {
//            me.keyMap[d.id] = d;
//        })
//       
       
         this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "save.edit.Item",
            callback: function (data, envelope) {
                me.processSaveEditMessage(data,envelope)
            }
        }); 
  }
 
  processSaveEditMessage(data,env)
  {
         
      
          me.setState((previousState, currentProps) =>
          {

              let newState =  previousState.items.map((d ) => {
              if (d.id == data.id)
              {
                  return data;
              }
              else
              {
                  return d;
              }
          });
          
          return {items: newState};
          
        })
              
        
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

                         <ListItem key={item.id} item={item} />
                        ))


                    }
                    </tbody>
                    </table>
                    </div>
                    <div className="editRestaurantContainer">
                    <EditForm />
                    </div>
            </div>
           
      </Container>
      </section>
      
       
    );
  }
}

