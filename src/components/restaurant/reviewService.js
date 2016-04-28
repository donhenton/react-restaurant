
/*
 {
 "starRating": 2,
 "reviewListing": "bonzo liked it",
 "id": 7
 }
 */
import postal from 'postal';
        import Immutable from 'immutable';
        var rp = require('request-promise');
        export default class RestaurantService
        {

        constructor()
        {
        this.data = {data: 'get a job' };
                this.rootURL = "http://donhenton-springmvc3.herokuapp.com:80/app/backbone/restaurant/review";
                let me = this;
                postal.subscribe({
                channel: "restaurants-system",
                        topic: "item.save.request.review",
                        callback: function (data, envelope) {
                        me.processSaveRequestReview(data, envelope)
                        }
                });
                postal.subscribe({
                channel: "restaurants-system",
                        topic: "item.add.request.review",
                        callback: function (data, envelope) {
                        me.processAddRequestReview(data, envelope)
                        }
                });
                postal.subscribe({
                channel: "restaurants-system",
                        topic: "item.delete.request.review",
                        callback: function (data, envelope) {
                        me.processDeleteRequestReview(data, envelope)
                        }
                });
        }

        //{changedReview: this.state.item.reviewDTOs[this.state.currentReviewIdx],restaurantId: this.state.item.id}  
        processSaveRequestReview(newItem, envelope)
        {
        let urlValue = this.rootURL + "/" + newItem.restaurantId + "/" + newItem.changedReview.id;
                var options = {
                method: 'PUT',
                        uri: urlValue,
                        body:  newItem.changedReview,
                        json: true // Automatically stringifies the body to JSON 
                };
                rp(options)
                .then(function(parsedBody)
                {
                postal.publish({
                channel: "restaurants-system",
                        topic: "item.save.request.complete.review",
                        data: { confirmedData: newItem }
                });
                })
                .catch(function(err) {

                //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"


                postal.publish({
                channel: "restaurants-system",
                        topic: "item.save.request.complete",
                        data: {error: err.message}
                });
                })




        }
        processDeleteRequestReview(deletedItem, envelope)
        {
                let urlValue = this.rootURL + "/" + deletedItem.restaurantId + "/" + deletedItem.changedReview.id;
                var options = {
                method: 'DELETE',
                        uri: urlValue 
                };
                rp(options)
                .then(function(parsedBody)
                {
                    postal.publish({
                        channel: "restaurants-system",
                        topic: "item.delete.request.complete.review" ,
                        data: {confirmedData:deletedItem.changedReview} 
                    });
                }) 
                .catch(function(err) {
                    postal.publish({
                        channel: "restaurants-system",
                        topic: "item.save.request.complete" ,
                        data: {error: err.message}
                    });
                })

        }
        processAddRequestReview(newItem, envelope)
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
                rp(options)
                .then(function(parsedBody)
                {
                let newReviewWithId = newReview;
                        newReviewWithId["id"] = parsedBody.id;
                        postal.publish({
                        channel: "restaurants-system",
                                topic: "item.add.request.complete.review",
                                data: { confirmedData: newReviewWithId }
                        });
                })
                .catch(function(err) {

                //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"


                postal.publish({
                channel: "restaurants-system",
                        topic: "item.save.request.complete",
                        data: {error: err.message}
                });
                })



        }

        }

export const EMPTY_REVIEW = function()
        {
        return {starRating: 2, reviewListing:"", stampDate:"", id: - 1};
                }