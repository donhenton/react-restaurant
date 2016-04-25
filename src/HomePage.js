import React from 'react';
        import { Component } from 'react';
        import Container from './components/ContentContainer';
        import {RESTAURANT_SERVICE} from './components/App';
        import {EMPTY_RESTAURANT} from './components/restaurant/restaurantService';
        import {arrayToIterable} from './components/restaurant/restaurantUtils';
        import postal from 'postal';
        import EditRestaurantForm from './components/restaurant/editRestaurantForm';
        import ListItem from './components/restaurant/restaurantListItem';
        
        export default class RestaurantApp extends Component {

        constructor()
        {
        super();
         

        }
        componentWillMount()
        {
                let me = this;
                this.state = {items: [EMPTY_RESTAURANT()],actionMode: null,hideList: true};
                RESTAURANT_SERVICE.getAllRestaurants()

                .then(function (data) {
                    
                    var preppedData =  JSON.parse(data);
                         
                        me.setState({items: preppedData,actionMode: null,hideList: false}, function() {
                             
                            
                        })
                        
                })
                .catch(function (err) {
                throw err;
                });
                
                
                //register postal listeners
                
                postal.subscribe({
                    channel: "restaurants",
                    topic: "item.save.request.complete",
                    callback: function (data, envelope) {
                        me.processSaveComplete(data,envelope)
                    }
                }); 

                postal.subscribe({
                    channel: "restaurants",
                    topic: "item.edit.cancel",
                    callback: function (data, envelope) {
                        me.processEditCancel(data,envelope)
                    }
                }); 

                postal.subscribe({
                    channel: "restaurants",
                    topic: "edit.Item",
                    callback: function (data, envelope) {

                        me.setState({'actionMode': "EDIT"},function( )
                            {
                                  //this is called when state is finally set



                            })

                       }
                    }); 

                
                
                
                
                
                
                
             
        }
        
 hideTableClass()
 {
     if (this.state.hideList)
     {
         return "hidden";
     }
     return null;
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
          return "editRestaurantContainer hidden"; 
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
                            <div id='tbodyContainer' className={this.hideTableClass()}>
                            <table>
                            <tbody>
                                {

                                     
                                    this.state.items.map((item,i) => (

                                        <ListItem key={item.id} item={item} />
                                    ))


                                }
                            </tbody>

                            </table>
                            </div>
                    </div>
                    
            
            
            
                </div>    
             <div className={me.displayEditFormCSS()}>
                        <EditRestaurantForm />
                    </div>
                  
            
            </div> 
                < /Container>



                );
        }
        }

