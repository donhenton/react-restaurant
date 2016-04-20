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
  
   processMessage(data,envelope)
    {
         
         let  copyState =   
         {itemDisplay: data, itemData: data};
     //    console.log("editForm recieved copy "+JSON.stringify(copyState));
         this.setState(copyState);
        // let selectNode = this.refs['partySelect'];
        // selectNode.value = data.party;

    }
  
  componentWillMount()
  {
      
      this.state = {itemDisplay: cleanDisplay(EMPTY_DATA), itemData: EMPTY_DATA};
      console.log(" willmount " + this.state.itemDisplay.party);
      let me = this;
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "select.Item",
            callback: function (data, envelope) {
                me.processMessage(data,envelope)
            }
        }); 
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
  
  processParty(ev)
  {
      let  copyState = JSON.parse(JSON.stringify( this.state ));  
      copyState.itemDisplay.party = ev.target.value;
      copyState.itemData.party = ev.target.value;
      this.setState(copyState);
//      console.log("party 1 " +JSON.stringify(this.state))
//      this.state.itemDisplay.party = e.target.value;
//      console.log("party " +this.state.itemDisplay.party)
//      this.state.itemData.party = e.target.value;
//      let selectNode = ReactDOM.findDOMNode(this.refs['partySelect']);
//      selectNode.value = e.target.value;
  }
  
  
  
  cancelItem(e)
  {
      e.preventDefault();
      console.log("cancel "+this.state.itemData.id +" "+JSON.stringify(e.target))
  }
 saveItem(id,e)
  {
      e.preventDefault();
      console.log("save "+ id +" "+JSON.stringify(e.target));
        postal.publish({
        channel: "restaurants",
        topic: "save.edit.Item",
        data: this.state.itemData 
    });
  }
  
componentDidUpdate(e){
 // let selectNode = React.findDOMNode(this.refs.selectingComponent.refs.selectTag);
  //selectNode.value = this.state.someValue;
  // console.log(e)
}
 
  render() {
      return (
              
           <form id='editForm' noValidate>
                <table>
                <tbody>
                <tr><th>Id:</th><td>{this.state.itemDisplay.id}</td></tr>
                <tr><th>Name:</th><td><input type='text' className="inputName" value={this.state.itemDisplay.name} onChange={this.processName.bind(this)} /></td></tr>
                <tr><th>Age:</th><td>{this.state.itemDisplay.age}</td></tr>
                <tr><th>Party:</th><td>{this.state.itemDisplay.party}</td></tr>
 
                <tr><th>Party 2:</th><td> 
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
                    
                    
                    )
      
  }
  
  }