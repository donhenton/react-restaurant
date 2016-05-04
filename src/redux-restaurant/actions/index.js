import {EMPTY_VOTER} from './../services/restaurantService';

export function initialize(restaurants)
{
    return {
        'type': 'INITIALIZE',
        'payload':restaurants
    }
}


export function selectRestaurant(restaurant)
{
    
    return {
        'type': "RESTAURANT_SELECTED",
        'payload': restaurant
    }
    
    
    
}



export function cancelSelectVoter(restaurant)
{
    
    return {
        'type': "RESTAURANT_SELECTION_CANCELED",
        'payload': restaurant
    }
    
    
    
}
