import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import {EMPTY_DATA,cleanDisplay} from './services/utils'
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

export default class EditForm extends Component {
   
       
  constructor()
  {
      super();
      
     
  }
  
   processSelectItem(data,envelope)
   {
         
         let  copyState =   
         {itemDisplay: data, itemData: data,backup: data};
         this.setState(copyState);
        // console.log("envelope: "+JSON.stringify(envelope));
         this.setState({"addEditStateViaMessage": envelope.addEditState});
         if (envelope.replyTo)
         {
             this.setState({replyTo: envelope.replyTo})
         }
         else
         {
             this.setState({replyTo: null})
         }

   }
    
      processSaveComplete(data,envelope)
    {
         
          
         this.setState(this.getBlankData());
 

    }
  
  componentWillMount()
  {
      
      this.state = this.getBlankData();
      this.state.replyTo = null;
     // console.log(" willmount " + JSON.stringify(this.state));
      let me = this;
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "select.Item",
            callback: function (data, envelope) {
                me.processSelectItem(data,envelope)
            }
        }); 
        
         this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.save.request.complete",
            callback: function (data, envelope) {
                me.processSaveComplete(data,envelope)
            }
        }); 
         this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "item.add.request.complete",
            callback: function (data, envelope) {
                me.processSaveComplete(data,envelope)
            }
        }); 
        
  }
  
  getBlankData()
  {
      return {itemDisplay: cleanDisplay(EMPTY_DATA), itemData: EMPTY_DATA,backup: EMPTY_DATA};
  }
  
  componentDidMount()
  {
      //refs allows you to find specific references to items they are
      //defined on the objects in the jsx code
      // console.log("did mount "+this.refs['partySelect'])
      //let selectNode = this.refs['partySelect'];
     // selectNode.value = this.state.itemDisplay.party;
  }
  
  processName(ev)
  {
     let  copyState = JSON.parse(JSON.stringify( this.state ));  
     copyState.itemDisplay.name = ev.target.value;
     copyState.itemData.name = ev.target.value;
     this.setState(copyState);
      
  }
  
    processAge(ev)
  {
     let  copyState = JSON.parse(JSON.stringify( this.state ));  
     copyState.itemDisplay.age = ev.target.value;
     copyState.itemData.age = ev.target.value;
     this.setState(copyState);
      
  }
  
  processParty(ev)
  {
      let  copyState = JSON.parse(JSON.stringify( this.state ));  
      copyState.itemDisplay.party = ev.target.value;
      copyState.itemData.party = ev.target.value;
      this.setState(copyState);
 
  }
  
  
  
  cancelItem(e)
  {
      e.preventDefault();
      let me = this.state.replyTo;
 
      this.setState(this.getBlankData());
      
      //general cancel 
        postal.publish({
        channel: "restaurants",
        topic: "item.edit.cancel",
        data: {} 
    });
    
    //direct to list item to shut down the temp subscription
        postal.publish({
        channel: "restaurants",
        topic: this.state.replyTo,
        edit_action: "CANCEL",
        data: {} 
    });
   
      
      
     // console.log("cancel "+this.state.itemData.id +" "+JSON.stringify(e.target))
  }
 saveItem(id,e)
  {
      e.preventDefault();
       
      let topicRequest = "item.save.request";
      if (this.state.addEditStateViaMessage === "ADD")
      {
        topicRequest = "item.add.request";
      } 
      var envelope = {
        channel: "restaurants",
        replyTo: this.state.replyTo,
        edit_action: "SAVE",
        topic: topicRequest,
        data: this.state.itemData 
      }

        postal.publish(envelope);
  }
  
componentDidUpdate(e){
 // let selectNode = React.findDOMNode(this.refs.selectingComponent.refs.selectTag);
  //selectNode.value = this.state.someValue;
  // console.log(e)
}
 
  render() {
      
      var stateBanner;
      if (this.state.addEditStateViaMessage === "EDIT")
      {
        stateBanner = <tr><th>Id:</th><td>{this.state.itemDisplay.id}</td></tr>
      }
      
      
      return (
            <section>
            <div>Props: {this.props.addEditStateViaProps} Message: {this.state.addEditStateViaMessage}</div>
           <form id='editForm' noValidate>
                <table>
                <tbody>
                {stateBanner}
                <tr><th>Name:</th><td><input type='text' className="inputName" value={this.state.itemDisplay.name} onChange={this.processName.bind(this)} /></td></tr>
                <tr><th>Age:</th><td><input type='text' className="inputAge" value={this.state.itemDisplay.age} onChange={this.processAge.bind(this)} /></td></tr>
                 
                
 
                <tr><th>Party:</th><td> 
                    <select ref="partySelect" value={this.state.itemDisplay.party} onChange={this.processParty.bind(this)} >
                    <option value="Democrat">Democrat</option>
                    <option value="Republican">Republican</option>
                    <option value="Communist">Communist</option>
                    </select>
                    
                    </td> 
                </tr>
        
                <tr>
                     <td> <button className="deleteButton" onClick={this.cancelItem.bind(this)}>Cancel</button> </td>
                    <td> <button className="editButton"   onClick={this.saveItem.bind(this,this.state.itemData.id)}>Save</button> </td>
                
                </tr>
        
                </tbody>
                </table>
           
           
           </form>
            </section>        
                    
                    )
      
  }
  
  }