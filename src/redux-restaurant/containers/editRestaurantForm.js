import React from 'react';
import { Component } from 'react';
import {cloneJSON} from './../services/utils';
import {EMPTY_RESTAURANT} from './../services/restaurantService';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import {cancelSelectRestaurant} from './../actions';
import EditReviewForm from './editReviewForm';

class EditRestaurantForm extends Component {
   
       
        constructor()
        {
        super();
        }


        componentWillReceiveProps(nextProps)
        {
        this.setState({currentRestaurant: nextProps.currentRestaurant});
        }


        componentWillMount()
        {

            this.state = {currentRestaurant: EMPTY_RESTAURANT };
        }


        displayEditFormCSS()
        {
        
                if (this.props.actionMode)
                {
                return "editRestaurantContainer";
                }
                else
                {
                return "hidden";
                }

        }
        

        processItem(fieldName, ev)
        {
            let  copyState = cloneJSON(this.state);
                copyState.currentRestaurant[fieldName] = ev.target.value;
                this.setState(copyState);
        }

        cancelItem(ev)
        {
            ev.preventDefault();
            this.props.cancelSelectRestaurant(this.props.currentRestaurant);
        }

        saveItem(ev)
        {
            ev.preventDefault();
            if (this.props.actionMode === "ADD")
            {
                this.props.restaurantDispatcher.requestAdd(this.state.currentRestaurant);
            }
            else
            {
                this.props.restaurantDispatcher.requestSave(this.state.currentRestaurant);
            }
        }
        showReviewForm()
        {
            if (this.props.actionMode === "EDIT")
            {
                return <EditReviewForm reviewDispatcher={this.props.reviewDispatcher}  />
            }
            else
            {
                return null;
            }
        }
  

        render() {

            let me = this;
            let item = this.state.currentRestaurant;
            return (
                 <div id="editControlGroup" className="grouping">
                  <section className={me.displayEditFormCSS()}>
  
                 <form id='editForm' noValidate>
                      <table className="editTable">
                      <tbody>

                      <tr>
                      
                            <th>Name: </th><td><input type='text' className="inputName" value={item.name} onChange={this.processItem.bind(this,"name")} /></td>
                            <th>City: </th><td><input type='text' className="inputCity" value={item.city} onChange={this.processItem.bind(this,"city")} /></td> 
                      </tr>
                      <tr>
                      
                            <th>State: </th><td><input type='text' className="inputState" value={item.state} onChange={this.processItem.bind(this,"state")} /></td>
                            <th>ZipCode: </th><td><input type='text' className="inputZipCode" value={item.zipCode} onChange={this.processItem.bind(this,"zipCode")} /></td> 
                      </tr>


                      <tr><th>Version:</th><td> 
                          <select value={item.version} onChange={this.processItem.bind(this,"version")} >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          </select>

                          </td> 
                      </tr>

                      <tr>
                           <td> <button className="warnButton"  onClick={this.cancelItem.bind(this)}>Cancel</button> </td>
                          <td> <button className="editButton"   onClick={this.saveItem.bind(this)}>Save</button> </td>

                      </tr>

                      </tbody>
                      </table>


                 </form>
                  </section>  
                      {this.showReviewForm()} 
                  </div>
                        
                    
            
  
                  )

        }

  }
  ////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
   
  return {
     currentRestaurant: state.currentRestaurant,
     actionMode: state.actionMode
  };
}

function mapDispatchToProps(dispatch) {
   
  return bindActionCreators({cancelSelectRestaurant }, dispatch);
}
 
    
export default connect(mapStateToProps,mapDispatchToProps)(EditRestaurantForm);