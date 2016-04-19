import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListItem from './listItem';
import EditForm from './editForm';
import {getData} from './services/listService'

export default class ListDemo extends Component {
        
  constructor()
  {
      super();
      
     
  }
  componentWillMount()
  {
       this.state = getData();
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
                    <EditForm />
                    </div>
            </div>
           
      </Container>
      </section>
      
       
    );
  }
}

