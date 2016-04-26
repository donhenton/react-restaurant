import postal from 'postal';
        import Immutable from 'immutable';
        var rp = require('request-promise');
        export default class RestaurantService
        {

        constructor()
        {
        this.data = {data: 'get a job' };
                this.rootURL = "http://donhenton-springmvc3.herokuapp.com:80/app/backbone/restaurant";
                let me = this;
                postal.subscribe({
                channel: "restaurants-system",
                        topic: "item.save.request",
                        callback: function (data, envelope) {
                        me.processSaveRequest(data, envelope)
                        }
                });
        }

        getAllRestaurants()
        {
        return rp(this.rootURL);
        }




      
        //message processing routine /////////////////////////////////////////

        processSaveRequest(newItem, envelope)
        {
         // console.log("service " + JSON.stringify(newItem) + " " + envelope.replyTo);
                
            var options = {
                method: 'PUT',
                uri: this.rootURL+"/"+newItem.id,
                body:  newItem,
                json: true // Automatically stringifies the body to JSON 
                };    
            rp(options)    
            .then(function(parsedBody)
            {
                postal.publish({
                    channel: "restaurants-system",
                    topic: "item.save.request.complete" ,
                    data: {confirmedData: newItem} 
                });
            }) 
            .catch(function(err) {
                postal.publish({
                    channel: "restaurants-system",
                    topic: "item.save.request.complete" ,
                    data: {err: err}
                });
            })
                
        }



        }

export const EMPTY_RESTAURANT = function()
{
    return {name:"", zipCode:"", city: "", state: "", version: 2, id: null, reviewDTOs: []};
}

