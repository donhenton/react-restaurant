import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router'; 

      
  export default class MenuBar extends Component {

         
      constructor()
      {
          super();
          this.id = 20;
      }
         
 

        render() {
        return (
                <div className="menuBarContainer">
                      <ul className="menubar">
                         <li className="menubar-item">
                           <Link to="/" className="menu-item-target" >Home</Link>
                         </li>
                
                         <li className="menubar-item">
                           <span className="menu-item-target" onclick >List Demos</span>
                           <ul className="menu">
                             <li className="menu-item">
                               <Link to="/listdemoRow" className="menu-item-target" >List Demo with Row</Link>
                            </li>
                            <li className="menu-item">
                               <Link to="/listdemoNoRow" className="menu-item-target" >List Demo with No Row</Link>
                            </li>
                           </ul>
                         </li>
                
                
                
                
                
                      </ul>
                
      
      <Link to="/page2" className="mainMenuItem" >
        Page2
      </Link>
      <Link to={`/page2/${this.id}`} className="mainMenuItem" >
        Page2 with 20
      </Link>
      <Link to="/listdemoRow" className="mainMenuItem" >
        List Demo with Row
      </Link>
      <Link to="/listdemoNoRow" className="mainMenuItem" >
        List Demo with No Row
      </Link>
      
      </div>

                );
        }
        }
      
      
      /*
       
       
           <Link to="/page2" className="mainMenuItem" >
        Page2
      </Link>
      <Link to={`/page2/${this.id}`} className="mainMenuItem" >
        Page2 with 20
      </Link>
      <Link to="/listdemoRow" className="mainMenuItem" >
        List Demo with Row
      </Link>
      <Link to="/listdemoNoRow" className="mainMenuItem" >
        List Demo with No Row
      </Link>
      
      </div>
       
       
       
       
       
       */