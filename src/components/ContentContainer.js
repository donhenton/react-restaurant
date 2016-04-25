import React from 'react';
import { Component } from 'react';
import TopNav from './topnav/xml/TopNav';

export default class ContentContainer extends Component {
        
   constructor()
     {
         super();
          
       
       this.menuXML = 
               '<menu type="topNav">'+

                    '<menuItem href="/">Home</menuItem>'+
                    '<menuItem href="/listDemoRow">Row Demo</menuItem>' +
                    

            '</menu>';
     }
        
  render() {
    return (
      <div className="mainContainer">      
      <TopNav xml={this.menuXML} />
      <div>
       {this.props.children}
      </div>
      </div>
       
    );
  }
}
