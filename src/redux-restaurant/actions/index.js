import {EMPTY_VOTER} from './../services/restaurantService';

export function initialized(restaurants)
{
    return {
        'type': 'INITIALIZED',
        'payload':restaurants
    }
}
export function initializing()
{
    return {
        'type': 'INITIALIZING' 
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
