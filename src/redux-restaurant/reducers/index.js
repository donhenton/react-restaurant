import { combineReducers } from 'redux';
import restaurants from './restaurants';
import currentRestaurant from './currentRestaurant'; 
import actionMode from './actionMode'; 
import isProcessing from './isProcessing'; 
import displayMessage from './displayMessage';
import reviewMode from './reviewMode';

const restaurantAppReducers = combineReducers({
    restaurants,
    currentRestaurant,
    actionMode,
    isProcessing,
    displayMessage,
    reviewMode
    
})



export default restaurantAppReducers