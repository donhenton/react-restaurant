import React from 'react';
import { Component } from 'react';
import ListElement from './listElement';
import {cloneJSON} from './../listdemo/services/utils';
 
export default class ListMain  extends Component {
        
  constructor()
  {
      super();
      this.parentAction = {}; 
      this.message = "fred "
      this.highlightInfo = {};
      this.initialItems = [{id: 1, text: 'alpha'},{id: 2, text: 'beta'},{id: 3,text: 'gamma'}] ;
      this.initialHighlighting = [false,false,false];
  }
  
    componentWillMount()
   {
       this.state = {items: this.initialItems,
                     highlighting: this.initialHighlighting,
                     selectedItem: {id: -99,text:""}};
              
       
       this.parentAction = {reportSelection: this.reportSelection.bind(this)};
   }
   
   
   reportSelection(selectedItem)
   {
       //console.log("reportSelection "+this.message+" "+t);
       //let cloneState = cloneJSON(this.state);
       let highlighting = [];
       let me = this;
       let processedItems = this.state.items.map((item) => 
               {    
                   
                     
                    highlighting.push(false); 
                    if (item.id == selectedItem.id)
                    {
                        highlighting[highlighting.length-1] = true;
                        return selectedItem;
                    }
                    else
                    {
                        return item;
                    }
       
               });
       
       this.setState({items: processedItems,selectedItem: selectedItem,highlighting});
   }
        
  render() {
    return (
      <div className="listMainContainer">
      
        <div className="block1">
        <table>
            <tbody>
            <tr><th>Input</th><td><input type="text" value="alpha" /></td><td><button className="editButton">Send</button></td></tr>
            </tbody>
        
        </table>
        </div>
          <div className="block2">
          You selected {this.state.selectedItem.id > 0 ? this.state.selectedItem.id : ''}
          </div>
      
        <div className="commDemoList">
        
        <table>
            <tbody>
                {

                        this.state.items.map((item,i) => (

                         <ListElement parentAction = {this.parentAction} key={item.id} highlighted={this.state.highlighting[i]} item={item} />
                        ))


                }
           </tbody>
        
        </table>
         
        </div> 
         
         
      </div>
    );
  }
}