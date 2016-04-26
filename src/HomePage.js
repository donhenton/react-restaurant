import React from 'react';
import { Component } from 'react';
import Container from './components/ContentContainer';
import RestaurantApp from './components/restaurant/restaurantApp';

        
        export default class HomePage extends Component {

        constructor()
        {
        super();
         

        }
      

        render() {
            let me = this;
           
        return (
                < Container >
                < h2 > Restaurant Demo < /h2>
                <RestaurantApp />
                < /Container>



                );
        }
        }


