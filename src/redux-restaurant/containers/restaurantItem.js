import React from 'react';
import { Component } from 'react';
import  { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {selectRestaurant} from './../actions';

export default class RestaurantItem extends Component {
   
       
  constructor()
  {
      super();
       
     
  }
  
  componentWillUnMount()
  {
      
  }
  
   componentDidMount()
  {
     
      
  }
  
  componentWillMount()
  {
      
      
      
  }
  
  
    componentWillReceiveProps (nextProps) {
      // if (nextProps.highlighted)
      //     console.log("component will receive props "+JSON.stringify(nextProps))
    }
        
    componentWillUpdate(nextProps,nextState)
    {

       // dont set state here it will cause a infinite loop

    }
  
 
  
  highLightRow()
  {
      let info = "in highlight returning "
      let retValue = "restaurantRow";
      if (this.props.restaurant.id === this.props.currentRestaurant.id)
      {
          retValue =  "restaurantRow highLighted";
      }
      //console.log(info + retValue+" "+ this.props.currentRestaurant.name)
      return retValue;
  }
  
  
  
   
 
  deleteItem( )
  {
      
 
  }
   
  render() {
      let item = this.props.restaurant;
      let me = this;
     
      return (
        
                    
            <tr className={me.highLightRow()}>  
                    <td  onClick={()=>this.props.selectRestaurant(this.props.restaurant) }className="nameItem">{item.name} </td> 
                    <td  onClick={()=>this.props.selectRestaurant(this.props.restaurant) } className="cityItem">{item.city}</td> 
                    <td  onClick={()=>this.props.selectRestaurant(this.props.restaurant) } className="stateItem">{item.state}</td> 
                    <td  onClick={()=>this.props.selectRestaurant(this.props.restaurant) } className="zipCodeItem">{item.zipCode}</td> 
                    <td  onClick={()=>this.props.selectRestaurant(this.props.restaurant) } className="versionItem">{item.version}</td> 

                    <td className="actionItems">
                    <button onClick={()=>this.props.selectRestaurant(this.props.restaurant) } className="editButton">Edit</button>
                    </td>
                    <td className="actionItems">
                    <button onClick={this.deleteItem.bind(this)} className="warnButton">Delete</button>
                     </td> 
            </tr>        
                    
                    )
      
  }

  }
  
  ////////////////////////////////////////////////////////////////////////////
  function mapStateToProps(state) {
 
  return {
    currentRestaurant: state.currentRestaurant
  };
}

 
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ selectRestaurant }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantItem);