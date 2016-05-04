  
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

    processSaveRequest(newItem)
    {
     

        var options = {
            method: 'PUT',
            uri: this.rootURL+"/"+newItem.id,
            body:  newItem,
            json: true // Automatically stringifies the body to JSON 
            };    
         return rp(options);    
        

    }
    processAddRequest(newItem)
    {
    

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
    processDeleteRequest(delItem)
    {
     

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
 

