
/*
 {
 "starRating": 2,
 "reviewListing": "bonzo liked it",
 "id": 7
 }
 */
 
        var rp = require('request-promise');
        export default class ReviewService
        {

        constructor()
        {
        this.data = {data: 'get a job' };
                this.rootURL = "http://donhenton-springmvc3.herokuapp.com:80/app/backbone/restaurant/review";
                let me = this;
                 
        }

        //{changedReview: this.state.item.reviewDTOs[this.state.currentReviewIdx],restaurantId: this.state.item.id}  
        processSaveReview(reviewId, restaurantId,changedReview)
        {
        let urlValue = this.rootURL + "/" + restaurantId + "/" + reviewId;
                var options = {
                method: 'PUT',
                        uri: urlValue,
                        body:  changedReview,
                        json: true // Automatically stringifies the body to JSON 
                };
                return rp(options)
                 

        }
        processDeleteReview(restaurantId, deletedReview)
        {
                let urlValue = this.rootURL + "/" + restaurantId + "/" + deletedReview.id;
                var options = {
                method: 'DELETE',
                        uri: urlValue 
                };
                return rp(options)
                 
        }
        processAddReview(restaurantId, newReview)
        {
         

        let urlValue = this.rootURL + "/" + restaurantId;
                var options = {
                method: 'POST',
                        uri: urlValue,
                        body:  newReview,
                        json: true // Automatically stringifies the body to JSON 
               };
               return  rp(options) ;

        }

        }
        
 export const EMPTY_REVIEW =  {starRating: 2, reviewListing:"", stampDate:"", id: - 1};
 
 
 