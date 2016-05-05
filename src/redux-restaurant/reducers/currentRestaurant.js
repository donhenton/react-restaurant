import {EMPTY_RESTAURANT} from './../services/restaurantService'

const currentRestaurant = (state = EMPTY_RESTAURANT, action) => {
  console.log("currentRESTAURANT reducer action is "+action.type);
  switch (action.type) {
    case "RESTAURANT_SELECTED":
    case "RESTAURANT_ADD":
    case "INITIALIZED" :
      
      return action.payload;
    case "RESTAURANT_SELECTION_CANCELED":
      return EMPTY_RESTAURANT ;
    
    default:
      return state;
  }
}

export default currentRestaurant