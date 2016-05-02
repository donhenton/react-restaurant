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
                    
                    '<subMenu text="List Demos">'+
                        '<subMenuItem href="/listDemoRow">List Demo Using React Object</subMenuItem>'+
                        '<subMenuItem href="/listDemoNoRow">List Demo No Object</subMenuItem>'+
                        '<subMenuItem href="/listCommDemo">List Communications Demo</subMenuItem>'+
                    '</subMenu>'+
                    '<subMenu text="Redux Demos">'+
                        '<subMenuItem href="/redux/SimpleRedux">Simple Redux Demo</subMenuItem>'+
                          
                    '</subMenu>' +

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
