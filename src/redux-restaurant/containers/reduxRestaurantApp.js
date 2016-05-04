import React from 'react';
import { Component } from 'react';
import { createStore } from 'redux'
import Provider , { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {RestaurantItem} from './restaurantItem'


class ReduxRestaurantApp extends Component {
            
            
            constructor()
            {
                super();
                
                 
            }
            
            hideWaitIndicator()
            {
                return "hidden";
            }
            componentWillMount()
            {
                let me = this;
                this.state = {errorMessage: null};
               
               
            
            }
            
            render()
            {
                 
                return (
                      
                
                        
                <div className='restaurantApp grouping'>

                <div className="waitIndicator" className={this.hideWaitIndicator()} />
                    <div className='restaurantListContainer'>
                        <div>
                            <span className="errorMessage">{this.state.errorMessage}</span>
                            <button className="editButton addButton">Add Record</button>
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

                                            return  (<ResaurantItem key={restaurant.id}   restaurant={restuarant} /> )
                                         })
                                    }

                                    </tbody>

                                    </table>
                                </div>
                        </div>




                    </div>   



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

 
 
    
export default connect(mapStateToProps)(ReduxRestaurantApp);