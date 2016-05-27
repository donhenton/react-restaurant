
import {initialized,initializing,displayMessage,DISPLAY_TYPES,clearMessage,actionSuccessful,updateRestaurant,setReviewMode} from '../actions';
import ReviewService from './reviewService';
import RestaurantService from './restaurantService';


export default class ReviewDispatcher
{

    constructor(storeVar,baseURL)
    {
        
        this.store = storeVar;
        this.reviewService = new ReviewService(baseURL);
        this.restaurantService = new RestaurantService(baseURL);
        
    }


    refreshList(id)
    {
        
        let me = this;
        me.store.dispatch(initializing())
       
       
       return this.restaurantService.getRestaurantById(id)
       .then(function(parsedBody)
        {
           let payload = JSON.parse(parsedBody);
           
           me.store.dispatch(updateRestaurant(payload));
            console.log("save is done for reload in initialize")
        }) 
        .catch(function(err) {

           me.store.dispatch(initialized([]));
           me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message));

             
        }) 
        
    }


    requestSave(reviewId, restaurantId, changedReview)
    {
         
        let me = this;
        me.store.dispatch(setReviewMode("EDIT_REVIEW"));
        me.store.dispatch(initializing());
        this.reviewService.processSaveReview(reviewId, restaurantId, changedReview)
            .then(function()
             {
                 console.log("save is done for review 1")
                 me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "review saved!!"))
                 me.store.dispatch(setReviewMode("FINISHED_REVIEW"));
                 return me.refreshList(restaurantId);
             }) 
             .catch(function(err) {

                 //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"
                 me.store.dispatch(setReviewMode("FINISHED_REVIEW"));
                 me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message))

             })
        
        
    }


    requestAdd(restaurantId, newReview)
    {
         
        let me = this;
        me.store.dispatch(setReviewMode("ADD_REVIEW"));
        me.store.dispatch(initializing());
        this.reviewService.processAddReview(restaurantId, newReview)
            .then(function()
             {
                 me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "review added!!"));
                 me.store.dispatch(setReviewMode("FINISHED_REVIEW"));
                 return me.refreshList(restaurantId);
             }) 
             .catch(function(err) {

                 //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"

                 me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message))

             })
        
        
    }

    requestDelete(restaurantId, reviewId)
    {
         
        let me = this;
        me.store.dispatch(setReviewMode("DELETE_REVIEW"));
        me.store.dispatch(initializing());
        this.reviewService.processDeleteReview(restaurantId, reviewId)
            .then(function()
             {
                 me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "review deleted!!"));
                 me.store.dispatch(setReviewMode("FINISHED_REVIEW"));
                 return me.refreshList(restaurantId);
             }) 
             .catch(function(err) {

                 //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"

                 me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message))

             })
        
        
    }



}