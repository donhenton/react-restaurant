import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {cloneJSON} from './restaurantUtils';
import {EMPTY_RESTAURANT} from './restaurantService';
import EditReviewForm from './editReviewForm';


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
      postal.subscribe({
            channel: "restaurants-system",
            topic: "edit.Item",
            callback: function (data, envelope) {
                 me.processFormItem(data,envelope,"EDIT")
            }
        }); 
         
        postal.subscribe({
            channel: "restaurants-system",
            topic: "add.Item",
            callback: function (data, envelope) {
                 me.processFormItem(data,envelope,"ADD")
            }
        });  
        
        postal.subscribe({
                channel: "restaurants-system",
                topic: "review.update",
                callback: function (data, envelope) {
                     
                    me.setState({item: data})
                }
            }); 
  }
  
  
   processFormItem(data,envelope,actionMode)
   {
         if (!this._isMounted)
             return;
         
         let  copyState =   
         {item: cloneJSON(data),actionMode};
         this.setState(copyState);
       
    

   }
    
  
        processItem(fieldName,ev)
        {
              let  copyState = cloneJSON( this.state );  
              copyState.item[fieldName] = ev.target.value;
              this.setState(copyState);
        }

        cancelItem(ev)
        {
             ev.preventDefault();
             postal.publish({
                channel: "restaurants-system",
                topic: "cancel.edit.Item" ,
                data: this.state.item 
             });
        }
        
        saveItem(id,ev)
        {
            ev.preventDefault();
            let topic = "item.save.request";
            if (this.state.actionMode == "ADD")
            {
                topic = "item.add.request";
            }
            postal.publish({
                channel: "restaurants-system",
                topic: topic ,
                data: this.state.item 
             });
        }
        
        showReviewForm()
        {
            if (this.props.actionMode === "EDIT")
            {
                return <EditReviewForm item={this.state.item}  />
            }
            else
            {
                return null;
            }
        }

        render() {

            let me = this;

            return (
                 <div id="editControlGroup">
                  <section className="editRestaurantContainer">

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
                    {this.showReviewForm()}
                  </div>
                        
                    
            
  
                  )

        }

  }