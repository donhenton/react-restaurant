import React from 'react';
import { Component } from 'react';
import { createStore } from 'redux'
import Provider , { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RestaurantItem from './restaurantItem';
import WaitIndicator from './waitIndicator';
import EditRestaurantForm from './editRestaurantForm';
import {addRestaurant} from './../actions';
import DisplayMessage from './displayMessageContainer';

class ReduxRestaurantApp extends Component {
            
            
            constructor()
            {
                super();
                
                 
            }
            
            componentWillReceiveProps (nextProps) {
      
                //console.log(" 1 "+JSON.stringify(nextProps.restaurants[0] ))
                //this.prop.restaurants =  nextProps.restaurants ;
             
            }
            
             componentWillUpdate(nextProps,nextState)
            {
                // console.log(" 2 "+JSON.stringify(nextProps.restaurants[0] ))
                // dont set state here it will cause a infinite loop
               // this.prop.restaurants =  nextProps.restaurants ;
            }
            
    
            componentWillMount()
            {
                let me = this;
                this.state = {errorMessage: null};
                this.props.restaurantDispatcher.initialize();
               
            
            }
            
            render()
            {
                
                return (
                      
                
                        
                <div className='restaurantApp grouping'>

                <WaitIndicator />
                    <div className='restaurantListContainer'>
                        <div>
                            <DisplayMessage />
                            <button onClick={()=>this.props.addRestaurant() } className="editButton addButton">Add Record</button>
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
                                        this.props.restaurants.map((restaurant,i) => {
                                            return (
                                            
                                                     <RestaurantItem key={restaurant.id} restaurantDispatcher={this.props.restaurantDispatcher}  restaurant={restaurant} /> 
                                                )
                                        })
                                        
                                    }

                                    </tbody>

                                    </table>
                                </div>
                        </div>
                        



                    </div>   

                    <EditRestaurantForm reviewDispatcher={this.props.reviewDispatcher}  restaurantDispatcher={this.props.restaurantDispatcher} />

                </div> 

                    
                        
                        
                        
                        
                        
                        
                        
                )
                
            }
            
            
    }

////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
   
  return {
     restaurants: state.restaurants
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ addRestaurant }, dispatch);
}

 
    
export default connect(mapStateToProps,mapDispatchToProps)(ReduxRestaurantApp);