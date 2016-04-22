import React from 'react';
import { Component } from 'react';
import Container from './ContentContainer';
import TopNav from './topnav/xml/TopNav';

export default class TopNavPage extends Component {
        
     constructor()
     {
         super();
          
       
       this.menuXML = 
               '<menu type="topNav">'+

                    '<menuItem href="/">Home</menuItem>'+
                    '<menuItem href="/page2">Page2</menuItem>'+
                    '<subMenu text="List Demos">'+
                        '<subMenuItem href="/listDemoRow">List Demo With Obj</subMenuItem>'+
                        '<subMenuItem href="/listDemoNoRow">List Demo No Obj</subMenuItem>'+
                    '</subMenu>'+
                    '<menuItem href="/topNav">TopNav</menuItem>' +

            '</menu>';
     }
        
  render() {
    return (
      
      <Container>
        <h3>Menu Component Demo</h3>
        <div className="menu-container">
        <div>
        <TopNav xml={this.menuXML} />
         
        </div>
        </div>
      </Container>
      
       
    );
  }
}
