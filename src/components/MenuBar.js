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
        <Link to="/topNav" className="mainMenuItem" >
          Top Nav
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