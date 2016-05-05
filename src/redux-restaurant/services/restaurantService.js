  
    var rp = require('request-promise');
    export default class RestaurantService
    {

    constructor(baseURL)
    {
            this.data = {data: 'get a job' };
            this.rootURL = baseURL;
            let me = this;
             
    }


    getAllRestaurants()
    {
        return rp(this.rootURL);
                   
    }

    getRestaurantById(id)
    {        
        return rp(this.rootURL+"/"+id);
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
         return rp(options)    ;
        

    }
    processDeleteRequest(delItem)
    {
     

        var options = {
            method: 'DELETE',
            uri: this.rootURL +"/"+delItem.id  

            };    
        return rp(options)    ;
        
    }


    }

export const EMPTY_RESTAURANT =  {name:"", zipCode:"", city: "", state: "", version: 2, id: null, reviewDTOs: []};

 

