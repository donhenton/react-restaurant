import React from 'react';
import { Component } from 'react';
import postal from 'postal';



export default class App2 extends Component {
        
        
   buttonAction()
   {
       console.log("hit button")
       postal.publish({
            channel: "general",
            topic: "component_change",
            data: {
                text: "new text " + (new Date()).toString()
            }
     });
   }
        
   componentWillMount()
   {
       this.state = {text: 'get a job'}
   }
        
        
  render() {
    return (
      <div className="componentBoxBlue">
      <p>Component 2</p>
                    
               <p>{this.state.text}</p>
                    
               <p><button onClick={this.buttonAction}>Change Component One</button></p>   
                   
       </div>
    );
  }
}
