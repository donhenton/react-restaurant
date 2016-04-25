import postal from 'postal';
import Immutable from 'immutable';
var rp = require('request-promise');
export default class RestaurantService
{

        constructor()
        {
        this.data = {data: 'get a job' };
        }





        getAllRestaurants()
        {
            return rp('http://donhenton-springmvc3.herokuapp.com:80/app/backbone/restaurant');
        }

}

export const EMPTY_RESTAURANT = function()
{
    return {name:"", zipCode:"", city: "", state: "", version: 2, id: null , reviewDTOs: []};
}

