import React from 'react';
import { Component } from 'react';
import {cloneJSON} from './../services/utils';
import {EMPTY_RESTAURANT} from './../services/restaurantService';
import {EMPTY_REVIEW} from './../services/reviewService';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';

class EditReviewForm extends Component {
   
       
        constructor()
        {
            super();
           
             

        }
        
     


        componentWillMount()
        {
             
            let me = this;
            this.state = {       
                     actionType: this.props.actionType,
                     currentReviews: this.props.currentReviews,
                     reviewBackup:this.props.currentReviews,
                     currentReviewIdx: -1
            }
            
            
            


        }
        componentWillReceiveProps (nextProps) {
            //got a prop change send it to state
            let newIdx = this.state.currentReviewIdx;
            if (!nextProps.actionType)
            {
                newIdx = -1;
            }
            
            let newState = cloneJSON(
            {       actionType: nextProps.actionType ,
                    currentReviews: nextProps.currentReviews,
                    reviewBackup: nextProps.currentReviews,
                    currentReviewIdx: newIdx
            }) ;
             
            this.setState(newState);
            
        }
        
  
        
        
        highLightEditRow(idx,ev)
        {
            if (this.state.actionType)
            {
                if (idx == this.state.currentReviewIdx)
                {
                    return "highlighted"
                }
                else
                {
                     return "dimmed";
                }
            
            }
            else
            {
                return null;
            }
            
            
            
        }
        

        showReviewControls(idx,doShow)
        {
             
            
            if (idx == this.state.currentReviewIdx)
            {
                if (doShow)
                {
                    return null;
                }
                else
                {
                    return "hidden";
                }
            }
            else
            {
                if (doShow)
                {
                    return "hidden";
                }
                else
                {
                    return null;
                }
            }
             
        }
        
        editReview(idx,ev)
        {
            this.setState({ currentReviewIdx: idx,actionType: "EDIT_REVIEW"})
        }
        saveReview(idx,ev)
        {
            let me = this;
            let changedReview =  me.state.currentReviews[idx];
            let reviewId = changedReview.id;
            let restaurantId = me.props.currentRestaurant.id;
            if (this.state.actionType === "EDIT_REVIEW")
            {
                this.props.reviewDispatcher.requestSave(reviewId, restaurantId, changedReview);
            }
            else
            {
                this.props.reviewDispatcher.requestAdd(restaurantId, changedReview);
                
            }
                 
        }
        deleteReview(idx,ev)
        {
              
            let me = this;
            let changedReview =  me.state.currentReviews[idx];
            let reviewId = changedReview.id;
            let restaurantId = me.props.currentRestaurant.id;
            let ok = confirm('Are you sure ?')
            if (ok === true)
            {
                this.props.reviewDispatcher.requestDelete(restaurantId, reviewId);
            }
            
            
 
        } 
        cancelEdit(idx,ev)
        {
              
             this.setState({currentReviewIdx: -1, actionType: null, currentReviews: this.state.reviewBackup})
        } 

        processField(fieldName,ev)
        {
              let  copyState = cloneJSON( this.state );  
              copyState.currentReviews[copyState.currentReviewIdx][fieldName] = ev.target.value;
              this.setState(copyState);
        }
        
        addReview()
        {
            //console.log("empty review "+JSON.stringify(EMPTY_REVIEW))
            let reviewsCopy = cloneJSON(this.state.currentReviews);
            reviewsCopy = [EMPTY_REVIEW].concat(reviewsCopy);
             
            let newState = {currentReviewIdx: 0, currentReviews: reviewsCopy    ,actionType: "ADD_REVIEW"}
            this.setState(newState);
        }


        render()
        {
           let me = this;
           return (  
                   
                    
            <section className="editReviewContainer">
            <span className="editHeader">Reviews</span>
            <button  onClick={me.addReview.bind(this)} className="editButton addButton">Add Review</button>
    
    
    
            <div id="reviewTableHeaderContainer">
               <table>
                <tbody>
                <tr><th className="rating">Stars</th><th className="listing">Review</th><th className="actionButton">&nbsp;</th><th className="actionButton">&nbsp;</th></tr>
                </tbody>
                </table> 
            </div>
    
    
    
              
              <div id="reviewTableBodyContainer">
              <table>
              <tbody>
              {
                   
           
                   me.state.currentReviews.map((review,i) => (

                                       <tr className={me.highLightEditRow.bind(me)(i)} key={review.id}>
                                       <td className="rating">
                                       <span className={me.showReviewControls(i,false )}>{review.starRating}</span>
                                       <span className={me.showReviewControls(i,true)}>
                                       
                                        <select id="starRating" name="starRating" onChange={me.processField.bind(this,"starRating")} value={review.starRating}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                    
                                        </select>
                        
                                       </span>
                               
                                        &nbsp;<i className="fa fa-star-o" aria-hidden="true"></i>
                               
                               
                                       </td> 
                                       <td className="listing">
                                       <span className={me.showReviewControls(i,false )}>{review.reviewListing}</span>
                                       <span className={me.showReviewControls(i,true)}>
                                       
                                        <input onChange={me.processField.bind(this,"reviewListing")}  name="reviewListing" id="reviewListing" type="text" value={review.reviewListing} /> 
                        
                                       </span>
                        
                                       </td> 
                                       <td className="actionButton">
                                            <span className={me.showReviewControls(i,false )}>
                                                <button onClick={me.editReview.bind(me,i)} className='btnEdit'>Edit</button> 
                                            </span>
                                            <span className={me.showReviewControls(i,true )}>
                                                <button onClick={me.saveReview.bind(me,i)} className='btnEdit'>Save</button> 
                                            </span>
                               
                                       </td> 
                                       <td className="actionButton">
                                                 
                                            <span onClick={me.deleteReview.bind(me,i)} className={me.showReviewControls(i,false )}>
                                                <button className='btnDelete'>Delete</button> 
                                            </span>
                                            <span onClick={me.cancelEdit.bind(me,i)} className={me.showReviewControls(i,true )}>
                                                <button className='btnDelete'>Cancel</button> 
                                            </span>
                                       </td> 
                               
                                       </tr>
                                    )) 
           
                    
                         
              }
              </tbody>
              </table>
              </div>
            </section>
    
            )

        }
  
  }
  
    ////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
   
  return {
     
     actionType: state.reviewMode,
     currentRestaurant: state.currentRestaurant,
     currentReviews: state.currentRestaurant.reviewDTOs
  };
}


 
    
export default connect(mapStateToProps)(EditReviewForm);