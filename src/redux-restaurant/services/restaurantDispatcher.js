
import {initialized,initializing,saveRestaurant,displayMessage,DISPLAY_TYPES,clearMessage,actionSuccessful} from '../actions';
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
            console.log("save is done for reload in initialize")
        }) 
        .catch(function(err) {

           me.store.dispatch(initialized([]));
           me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message));

             
        }) 
        
       
    }
    
    requestSave(newRestaurant)
    {
        let me = this;
         me.store.dispatch(initializing());
        this.restaurantService.processSaveRequest(newRestaurant)
       .then(function(parsedBody)
        {
            me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "record saved!!"))
            me.store.dispatch(actionSuccessful())
            return me.initialize();
        }) 
        .catch(function(err) {

            //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"
             
            me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message))
             
        })
        
        
    }
    
    requestAdd(newRestaurant)
    {
        let me = this;
         me.store.dispatch(initializing())
        this.restaurantService.processAddRequest(newRestaurant)
       .then(function()
        {
            me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "record added!!"))
            me.store.dispatch(actionSuccessful())
            return me.initialize();
        }) 
        .catch(function(err) {

            //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"
             
            me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message))
             
        })
        
        
    }

    requestDelete(newRestaurant)
    {
        let me = this;
         me.store.dispatch(initializing())
        this.restaurantService.processDeleteRequest(newRestaurant)
       .then(function()
        {
            me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "record deleted!!"))
            me.store.dispatch(actionSuccessful())
            return me.initialize();
        }) 
        .catch(function(err) {

            //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"
             
            me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message))
             
        })
        
        
    }



}


