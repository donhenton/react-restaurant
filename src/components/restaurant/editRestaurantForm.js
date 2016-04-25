import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {EMPTY_RESTAURANT} from './restaurantService';

export default class EditRestaurantForm extends Component {
   
       
        constructor()
        {
            super();
            this._isMounted = false;

        }
        
    componentWillUnMount()
  {
      this._isMounted = false;
      
  }
  
   componentDidMount()
  {
      this._isMounted = true;
      // console.log("didMount "+this._isMounted);
  }      
        
        
  componentWillMount()
  {
      
      this.state = {item: EMPTY_RESTAURANT()};
      
      this.state.replyTo = null;
     // console.log(" willmount " + JSON.stringify(this.state));
      let me = this;
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "edit.Item",
            callback: function (data, envelope) {
                 me.processEditItem(data,envelope)
            }
        }); 
        
         this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.save.request.complete",
            callback: function (data, envelope) {
               // me.processSaveComplete(data,envelope)
            }
        }); 
         this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.add.request.complete",
            callback: function (data, envelope) {
               // me.processSaveComplete(data,envelope)
            }
        }); 
        
  }
  
  
     processEditItem(data,envelope)
   {
         if (!this._isMounted)
             return;
         
         let  copyState =   
         {item: data,actionMode:"EDIT"};
         this.setState(copyState);
       
         if (envelope.replyTo)
         {
             this.setState({replyTo: envelope.replyTo})
         }
         else
         {
             this.setState({replyTo: null})
         }

   }
  
  
        processItem(fieldName,ev)
        {
              let  copyState = JSON.parse(JSON.stringify( this.state ));  
              copyState.item[fieldName] = ev.target.value;
              this.setState(copyState);
        }

        cancelItem()
        {
            
        }
        
        saveItem(id)
        {
            
        }


        render() {



            return (
                  <section>

                 <form id='editForm' noValidate>
                      <table className="editTable">
                      <tbody>

                      <tr>
                      
                            <th>Name: </th><td><input type='text' className="inputName" value={this.state.item.name} onChange={this.processItem.bind(this,"name")} /></td>
                            <th>City: </th><td><input type='text' className="inputCity" value={this.state.item.city} onChange={this.processItem.bind(this,"city")} /></td> 
                      </tr>
                      <tr>
                      
                            <th>State: </th><td><input type='text' className="inputState" value={this.state.item.state} onChange={this.processItem.bind(this,"state")} /></td>
                            <th>ZipCode: </th><td><input type='text' className="inputZipCode" value={this.state.item.zipCode} onChange={this.processItem.bind(this,"zipCode")} /></td> 
                      </tr>


                      <tr><th>Version:</th><td> 
                          <select value={this.state.item.version} onChange={this.processItem.bind(this,"version")} >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          </select>

                          </td> 
                      </tr>

                      <tr>
                           <td> <button className="warnButton" onClick={this.cancelItem.bind(this)}>Cancel</button> </td>
                          <td> <button className="editButton"   onClick={this.saveItem.bind(this,this.state.item.id)}>Save</button> </td>

                      </tr>

                      </tbody>
                      </table>


                 </form>
                  </section>        

                          )

        }

  }