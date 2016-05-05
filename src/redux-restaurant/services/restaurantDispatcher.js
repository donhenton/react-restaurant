
import {initialized,initializing,saveRestaurant,displayMessage,DISPLAY_TYPES} from '../actions';
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
        me.store.dispatch(initializing())
       
       
       return this.restaurantService.getAllRestaurants()
       .then(function(parsedBody)
        {
           let payload = JSON.parse(parsedBody);
           
           me.store.dispatch(initialized(payload));
        }) 
        .catch(function(err) {

           
           throw err;

             
        }) 
        
       
    }
    
    requestSave(newRestaurant)
    {
        let me = this;
        this.restaurantService.processSaveRequest(newRestaurant)
       .then(function(parsedBody)
        {
            me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "record saved!!"))
            return me.initialize();
        }) 
        .catch(function(err) {

            //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"
            throw err;

             
        })
        
        
    }

}
