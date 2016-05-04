import { combineReducers } from 'redux';
import restaurants from './restaurants';
import currentRestaurant from './currentRestaurant'; 
import actionMode from './actionMode'; 

const restaurantAppReducers = combineReducers({
    restaurants,
    currentRestaurant,
    actionMode
    
})

export function cloneJSON(j)
{
   return  JSON.parse(JSON.stringify(j ));  
    
} 

export default restaurantAppReducers