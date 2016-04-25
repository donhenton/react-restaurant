import React from 'react';
        import { Component } from 'react';
        import Container from './components/ContentContainer';
        import {RESTAURANT_SERVICE} from './components/App';
        import {EMPTY_RESTAURANT} from './components/restaurant/restaurantService';
        import {arrayToIterable} from './components/restaurant/restaurantUtils';
        import postal from 'postal';
        export default class RestaurantApp extends Component {

        constructor()
        {
        super();
                // this.keyMap = {};

        }
        componentWillMount()
        {
        let me = this;
                this.state = {items: [EMPTY_RESTAURANT()],actionMode: null};
                RESTAURANT_SERVICE.getAllRestaurants()

                .then(function (data) {
                    
                    var preppedData =  JSON.parse(data);
                         
                        me.setState({items: preppedData,actionMode: null})
                        
                })
                .catch(function (err) {
                throw err;
                });
            ;
        }

 displayEditFormCSS()
  {
      //console.log("display css "+this.state.inEditMode);
      if (this.state.actionMode)
      {
         return "editRestaurantContainer";
      }
      else
      {
          return "editRestaurantContainer"; 
      }
      
  }

        render() {
            let me = this;
           
        return (
                < Container >
                < h2 > Restaurant Demo < /h2>
            <div className='restaurantApp grouping'>
                <div className='restaurantListContainer'>
                    <div>
                        <button   className="editButton addButton">Add Record</button>
                    </div>
            
                    <div id="restaurantScrollList">
                            <div id="tHeadContainer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className="nameItem">Name</th> 
                                            <th className="cityItem">City</th> 
                                            <th className="stateItem">State</th> 
                                            <th className="zipCodeItem">Zip Code</th>
                                            <th className="versionItem">Version</th>
                                            <th className="actionItems">&nbsp;</th> 
                                            <th className="actionItems">&nbsp;</th> 
                                             
                                        </tr>
                                    </tbody>
                                 </table>    
                            </div>    
                            <div id='tbodyContainer'>
                            <table>
                            <tbody>
                                {

                                    me.state.items.map((item,i) => (

                                        <tr key={item.id}>
                                           <td className="nameItem">{item.name}</td> 
                                           <td className="cityItem">{item.city}</td> 
                                           <td className="stateItem">{item.state}</td> 
                                           <td className="zipCodeItem">{item.zipCode}</td> 
                                           <td className="versionItem">{item.version}</td> 
                                           
                                           <td className="actionItems">
                                           <button className="editButton">Edit</button>
                                           </td>
                                           <td className="actionItems">
                                           <button className="warnButton">Delete</button>
                                            </td> 
                                        </tr>
                                    ))


                                }
                            </tbody>

                            </table>
                            </div>
                    </div>
                    
            
            
            
                </div>    
             <div className={me.displayEditFormCSS()}>
                        editform
                    </div>
                  
            
            </div> 
                < /Container>



                );
        }
        }


