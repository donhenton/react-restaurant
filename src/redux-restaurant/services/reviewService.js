
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
        processSaveRequestReview(newItem)
        {
        let urlValue = this.rootURL + "/" + newItem.restaurantId + "/" + newItem.changedReview.id;
                var options = {
                method: 'PUT',
                        uri: urlValue,
                        body:  newItem.changedReview,
                        json: true // Automatically stringifies the body to JSON 
                };
                return rp(options)
                 

        }
        processDeleteRequestReview(deletedItem)
        {
                let urlValue = this.rootURL + "/" + deletedItem.restaurantId + "/" + deletedItem.changedReview.id;
                var options = {
                method: 'DELETE',
                        uri: urlValue 
                };
                return rp(options)
                 
        }
        processAddRequestReview(newItem)
        {
        console.log("processAdd " + JSON.stringify(newItem));
                //changedReview, restaurantId
        let newReview = {starRating: newItem.changedReview.starRating,
                     reviewListing: newItem.changedReview.reviewListing }

        let urlValue = this.rootURL + "/" + newItem.restaurantId;
                var options = {
                method: 'POST',
                        uri: urlValue,
                        body:  newReview,
                        json: true // Automatically stringifies the body to JSON 
               };
               return  rp(options) ;

        }

        }

export const EMPTY_REVIEW = function()
        {
        return {starRating: 2, reviewListing:"", stampDate:"", id: - 1};
                }