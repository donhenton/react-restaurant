import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import RestaurantHolder from './redux-restaurant/components/restaurantHolder';


ReactDOM.render(
    
        <RestaurantHolder />
   
  , document.querySelector('#reactRestaurantContainer'));
