
import {initialize} from '../actions';
import ReviewService from './reviewService';
import RestaurantService from './restaurantService';

export default class RestaurantDispatcher
{

    constructor(storeVar)
    {
        
        this.store = storeVar;
    }

    initialize()
    {
       // store.dispatch(action);
    }

}
