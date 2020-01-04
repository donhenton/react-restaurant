  var rp = require('request-promise');
  export default class RestaurantService {
      // let baseURL = "https://lrhr6r709b.execute-api.us-east-2.amazonaws.com/dev/restaurant";

      constructor(baseURL) {
          this.data = { data: 'get a job' };
          this.rootURL = baseURL;
          let me = this;

      }


      getAllRestaurants() {
          //okay 1
          return rp(this.rootURL);

      }

      getRestaurantById(id) {
          //okay 2
          return rp(this.rootURL + "/" + id);
      }



      //message processing routine restaurants /////////////////////////////////////////

      processSaveRequest(newItem) {

          //okay 3
          var options = {
              method: 'PUT',
              uri: this.rootURL + "/" + newItem.id,
              body: newItem,
              json: true // Automatically stringifies the body to JSON 
          };
          return rp(options);


      }
      processAddRequest(newItem) {

          //okay 4
          var options = {
              method: 'POST',
              uri: this.rootURL,
              body: newItem,
              json: true // Automatically stringifies the body to JSON 
          };
          return rp(options);


      }
      processDeleteRequest(delItem) {

          //okay 5
          var options = {
              method: 'DELETE',
              uri: this.rootURL + "/" + delItem.id

          };
          return rp(options);

      }


  }

  export const EMPTY_RESTAURANT = { name: "", zipCode: "", city: "", state: "", version: 2, id: null, reviewDTOs: [] };