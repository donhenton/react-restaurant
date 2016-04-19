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
                
                
      <Link to="/" className="mainMenuItem" >
        Home
      </Link>
      <Link to="/page2" className="mainMenuItem" >
        Page2
      </Link>
      <Link to={`/page2/${this.id}`} className="mainMenuItem" >
        Page2 with 20
      </Link>
      <Link to="/listdemo" className="mainMenuItem" >
        List Demo
      </Link>
      
      
      </div>

                );
        }
        }
      