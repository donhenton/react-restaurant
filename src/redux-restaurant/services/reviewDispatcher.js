
import {initialized,initializing,displayMessage,DISPLAY_TYPES,clearMessage,actionSuccessful,saveReview,deleteReview} from '../actions';
import ReviewService from './reviewService';



export default class ReviewDispatcher
{

    constructor(storeVar,restaurantDispatcherVar)
    {
        
        this.store = storeVar;
        this.reviewService = new ReviewService();
        this.restaurantDispatcher = restaurantDispatcherVar;
    }



    requestSave(reviewId, restaurantId, changedReview)
    {
         
        let me = this;
        me.store.dispatch(saveReview(reviewId, restaurantId, changedReview));
        me.store.dispatch(initializing());
        this.reviewService.processSaveReview(reviewId, restaurantId, changedReview)
            .then(function()
             {
                 me.store.dispatch(displayMessage(DISPLAY_TYPES.success, "review saved!!"))
                 return me.restaurantDispatcher.initialize();
             }) 
             .catch(function(err) {

                 //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"

                 me.store.dispatch(displayMessage(DISPLAY_TYPES.error, err.message))

             })
        
        
    }







}