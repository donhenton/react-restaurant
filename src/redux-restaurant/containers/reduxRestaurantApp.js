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
            
            hideWaitIndicator()
            {
                return "hidden";
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
                                            return (
                                            
                                                    <tr><td>{i}</td></tr>
                                                )
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
// return  (<RestaurantItem key={restaurant.id}   restaurant={restaurant} /> )
////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
   
  return {
     restaurants: state.restaurants
  };
}

 
 
    
export default connect(mapStateToProps)(ReduxRestaurantApp);