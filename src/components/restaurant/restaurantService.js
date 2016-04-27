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
                postal.subscribe({
                channel: "restaurants-system",
                        topic: "item.add.request",
                        callback: function (data, envelope) {
                        me.processAddRequest(data, envelope)
                        }
                });
                postal.subscribe({
                channel: "restaurants-system",
                        topic: "item.delete.request",
                        callback: function (data, envelope) {
                        me.processDeleteRequest(data, envelope)
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
                
                //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"
                
                
                postal.publish({
                    channel: "restaurants-system",
                    topic: "item.save.request.complete" ,
                    data: {err: err}
                });
            })
                
        }
        processAddRequest(newItem, envelope)
        {
         // console.log("service " + JSON.stringify(newItem) + " " + envelope.replyTo);
                
            var options = {
                method: 'POST',
                uri: this.rootURL ,
                body:  newItem,
                json: true // Automatically stringifies the body to JSON 
                };    
            rp(options)    
            .then(function(parsedBody)
            {
                
                newItem.id = parsedBody.id;
                postal.publish({
                    channel: "restaurants-system",
                    topic: "item.add.request.complete" ,
                    data: {confirmedData: newItem,newId: parsedBody.id} 
                });
            }) 
            .catch(function(err) {
                postal.publish({
                    channel: "restaurants-system",
                    topic: "item.add.request.complete" ,
                    data: {err: err}
                });
            })
                
        }
        processDeleteRequest(delItem, envelope)
        {
         // console.log("service " + JSON.stringify(newItem) + " " + envelope.replyTo);
                
            var options = {
                method: 'DELETE',
                uri: this.rootURL +"/"+delItem.id  
                
                };    
            rp(options)    
            .then(function(parsedBody)
            {
                postal.publish({
                    channel: "restaurants-system",
                    topic: "item.delete.request.complete" ,
                    data: {confirmedData:delItem} 
                });
            }) 
            .catch(function(err) {
                postal.publish({
                    channel: "restaurants-system",
                    topic: "item.delete.request.complete" ,
                    data: {err: err}
                });
            })
                
        }


        }

export const EMPTY_RESTAURANT = function()
{
    return {name:"", zipCode:"", city: "", state: "", version: 2, id: null, reviewDTOs: []};
}

