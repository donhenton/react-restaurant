import { combineReducers } from 'redux';
import restaurants from './restaurants';
import currentRestaurant from './currentRestaurant'; 
import actionMode from './actionMode'; 
import isProcessing from './isProcessing'; 
import displayMessage from './displayMessage';

const restaurantAppReducers = combineReducers({
    restaurants,
    currentRestaurant,
    actionMode,
    isProcessing,
    displayMessage
    
})



export default restaurantAppReducers