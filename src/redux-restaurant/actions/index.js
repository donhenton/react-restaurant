import {EMPTY_RESTAURANT} from './../services/restaurantService';


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

export function addRestaurant(restaurant)
{
    
    return {
        'type': "RESTAURANT_ADD",
        'payload': EMPTY_RESTAURANT
    }
    
    
    
}

export function cancelSelectRestaurant(restaurant)
{
    
    return {
        'type': "RESTAURANT_SELECTION_CANCELED",
        'payload': restaurant
    }
    
    
    
}

export function clearMessage()
{
    return {
        'type': "CLEAR_MESSAGE" 
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

export function actionSuccessful()
{
        return {
        'type': "ACTION_SUCCESSFUL" 
    }
}
///////////////////////////////////////////
//Reviews
//"EDIT_REVIEW" "ADD_REVIEW" "FINISHED_REVIEW"
export function setReviewMode(mode)
{
    return {
        'type':  mode
    }
    
    
}
 
    