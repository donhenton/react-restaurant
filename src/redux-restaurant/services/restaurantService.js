  
    var rp = require('request-promise');
    export default class RestaurantService
    {

    constructor()
    {
            this.data = {data: 'get a job' };
            this.rootURL = "http://donhenton-springmvc3.herokuapp.com:80/app/backbone/restaurant";
            let me = this;
             
    }


    getAllRestaurants(actionToDispatch)
    {
        return rp(this.rootURL);
                   
    }





    //message processing routine restaurants /////////////////////////////////////////

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
            
        }) 
        .catch(function(err) {

            //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"


             
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
            
        }) 
        .catch(function(err) {
            
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
             
        }) 
        .catch(function(err) {
             
        })

    }


    }

export const EMPTY_RESTAURANT =  {name:"", zipCode:"", city: "", state: "", version: 2, id: null, reviewDTOs: []};
 

