import { combineReducers } from 'redux';
import restaurants from './restaurants';
 

const restaurantAppReducers = combineReducers({
    restaurants
    
})

export function cloneJSON(j)
{
   return  JSON.parse(JSON.stringify(j ));  
    
} 

export default restaurantAppReducers