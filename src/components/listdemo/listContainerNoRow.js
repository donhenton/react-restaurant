import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListItem from './listItem';
import EditForm from './editForm';
import {getData} from './services/listService'
import postal from 'postal';
import Immutable from 'immutable';
 

export default class ListContainerNoRow extends Component {
        
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
                me.processMessage(data,envelope)
            }
        }); 
  }
 
  processMessage(data,env)
  {
        let me = this;
        let  copyState = JSON.parse(JSON.stringify(me.state.items ));  
        let newState =  copyState.map((d ) => {
              if (d.id == data.id)
              {
                  console.log('got a hit')
                  return data;
              }
              else
              {
                  return d;
              }
        })
        
         console.log('new State '+JSON.stringify(newState))
        //this.keyMap[data.id] = data;
        me.setState({items: newState});
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

