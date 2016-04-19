import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListItem from './listItem';


export default class ListDemo extends Component {
        
  constructor()
  {
      super();
      
      this.state = {items: [
                {id: 1,
                  name: 'manny',
                  age:35} ,
                {id: 2,
                  name: 'moe',
                  age: 15},
                {id: 3,
                  name: 'jack',
                  age: 46}]}
  }
  
 
  
        
  render() {
    return (
      <section>
      
      <Container>
      
            <h2>List Demonstration</h2>
            <div className='grouping'>
                    <div className='restaurantListContainer'>
                    <table className="displayTable">
                        <thead>
                        <tr><th>Name</th><th>Delete</th><th>Edit</th></tr>
                        </thead>

                    <tbody>

                    {

                        this.state.items.map((item,i) => (
                         <ListItem key={item.id} item={item} />
                        ))


                    }
                    </tbody>
                    </table>
                    </div>
                    <div className="editRestaurantContainer">
                    get a job
                    </div>
            </div>
           
      </Container>
      </section>
      
       
    );
  }
}

