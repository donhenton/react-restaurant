
import {initialize} from '../actions';
import ReviewService from './reviewService';
import RestaurantService from './restaurantService';

export default class RestaurantDispatcher
{

    constructor(storeVar)
    {
        
        this.store = storeVar;
        this.restaurantService = new RestaurantService();
    }

    initialize()
    {
       let me = this;
       this.restaurantService.getAllRestaurants()
       .then(function(parsedBody)
        {
           let payload = JSON.parse(parsedBody);
           
           me.store.dispatch(initialize(payload))
        }) 
        .catch(function(err) {

           
           throw err;

             
        }) 
        
       // store.dispatch(initialize);
    }

}
