/*
 {
 "starRating": 2,
 "reviewListing": "bonzo liked it",
 "id": 7
 }
 */

var rp = require('request-promise');
export default class ReviewService {

    constructor(baseURL) {
        this.data = { data: 'get a job' };
        this.rootURL = baseURL;
        let me = this;

    }

    //{changedReview: this.state.item.reviewDTOs[this.state.currentReviewIdx],restaurantId: this.state.item.id}  
    processSaveReview(reviewId, restaurantId, changedReview) {
        //okay 6
        delete changedReview['id'];
        delete changedReview['restaurantId']
        let urlValue = this.rootURL + "/" + restaurantId + '/review/' + reviewId;
        var options = {
            method: 'PUT',
            uri: urlValue,
            body: changedReview,
            json: true // Automatically stringifies the body to JSON 
        };
        return rp(options)


    }
    processDeleteReview(restaurantId, reviewId) {
        //okay 7
        let urlValue = this.rootURL + "/" + restaurantId + '/review/' + reviewId;
        var options = {
            method: 'DELETE',
            uri: urlValue
        };
        return rp(options)

    }
    processAddReview(restaurantId, newReview) {

        //okay 8
        delete newReview['id'];
        delete newReview['restaurantId']
        newReview['stampDate'] = (new Date()).toISOString();
        let urlValue = this.rootURL + "/" + restaurantId + '/review';
        var options = {
            method: 'POST',
            uri: urlValue,
            body: newReview,
            json: true // Automatically stringifies the body to JSON 
        };
        return rp(options);

    }

}

export const EMPTY_REVIEW = { starRating: 2, reviewListing: "", stampDate: "", id: -1 };