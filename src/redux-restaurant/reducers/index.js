import { combineReducers } from 'redux';
import restaurants from './restaurants';
import currentRestaurant from './currentRestaurant'; 
import actionMode from './actionMode'; 
import isProcessing from './isProcessing'; 

const restaurantAppReducers = combineReducers({
    restaurants,
    currentRestaurant,
    actionMode,
    isProcessing
    
})



export default restaurantAppReducers