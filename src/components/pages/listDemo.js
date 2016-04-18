import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';

const ListItem =  (props) =>
{
    return <li>{props}</li>
}


export default class App extends Component {
        
  constructor()
  {
      super();
      
      this.state = {items: [
                {id: 1,
                  name: 'manny'} ,
                {id: 2,
                  name: 'moe'},
                {id: 3,
                  name: 'jack'}]}
  }
  
 
  deleteItem ()  
  {
              
  }
        
  render() {
    return (
      <section>
      
      <Container>
      
            <h2>List Demonstration</h2>
            <ul>
            {
                this.state.items.map(function(item,i) {
                    return  (<li key={item.id}>{item.name} </li>);
                })
                
                
            }
            </ul>
           
      </Container>
      </section>
      
       
    );
  }
}

