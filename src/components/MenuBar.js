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
                <div>
      <Link to="/" className="mainMenuItem" >
        Home
      </Link>
      <Link to="/page2" className="mainMenuItem" >
        Page2
      </Link>
      <Link to={`/page2/${this.id}`} className="mainMenuItem" >
        Page2 with 20
      </Link>
      <Link to="/page3" className="mainMenuItem" >
        Page3
      </Link>
      
      
      </div>

                );
        }
        }
      