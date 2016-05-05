import {EMPTY_VOTER} from './../services/restaurantService';


export const DISPLAY_TYPES = {success: "success", error: "error" };

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

export function saveRestaurant(restaurant)
{
    
    return {
        'type': "RESTAURANT_SAVED",
        'payload': restaurant
    }
    
    
    
}

export function cancelSelectRestaurant(restaurant)
{
    
    return {
        'type': "RESTAURANT_SELECTION_CANCELED",
        'payload': restaurant
    }
    
    
    
}


// const EMPTY_MESSAGE = {type: null , text: null}
export function displayMessage(type,text)
{
    
    return {
        'type': "DISPLAY_MESSAGE",
        'payload': {type,text}
    }
    
    
    
}
