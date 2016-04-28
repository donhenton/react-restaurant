import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {cloneJSON} from './restaurantUtils';
import {EMPTY_RESTAURANT} from './restaurantService';
import {EMPTY_REVIEW} from './reviewService';

export default class EditReviewForm extends Component {
   
       
        constructor()
        {
            super();
            this._isMounted = false;
             

        }
        
        componentWillUnMount()
        {
            this._isMounted = false;

        }

        componentDidMount()
        {
            this._isMounted = true;
            //after initial rendering AJAX calls here
        }      


        componentWillMount()
        {
            let itemVar = cloneJSON(this.props.item) ;
            let me = this;
            this.state = {
                originalItem: itemVar ,
                currentReviewIdx: -1,
                actionType: null,
                item: itemVar 
            }     
            
            postal.subscribe({
                channel: "restaurants-system",
                topic: "item.save.request.complete.review",
                callback: function (data, envelope) {
                    if (!me.checkForError(data))
                        me.processSaveReviewComplete(data.confirmedData)
                   
                }
            }); 
            
             postal.subscribe({
                channel: "restaurants-system",
                topic: "item.add.request.complete.review",
                callback: function (data, envelope) {
                    if (!me.checkForError(data))
                        me.processAddReviewComplete(data.confirmedData)
                    
                }
            }); 
            
             postal.subscribe({
                channel: "restaurants-system",
                topic: "item.delete.request.complete.review",
                callback: function (data, envelope) {
                    if (!me.checkForError(data))
                        me.processDeleteReviewComplete(data.confirmedData)
                    
                }
            }); 
            


        }
        componentWillReceiveProps (nextProps) {
            //got a prop change send it to state
            let itemVar = cloneJSON(nextProps.item) ;
            
            let newState = {
                originalItem: nextProps.item ,
                currentReviewIdx: -1,
                actionType: null,
                item: itemVar 
            }   
            this.setState(newState)
            
        }
        
        componentWillUpdate(nextProps,nextState)
        {
        
                // dont set state here it will cause a infinite loop
                // invoked before rendering, prep right before an update
        }
        
        processDeleteReviewComplete(reviewToDelete)
        {
            let newItem = cloneJSON(this.state.item);
            //itemWithId.reviewDTOs[this.state.currentReviewIdx].id = data.id;
            let newReviews = newItem.reviewDTOs.filter((review) => review.id != reviewToDelete.id)
            newItem.reviewDTOs = newReviews;
         
            this.setState({currentReviewIdx: -1,actionType:null, originalItem: newItem, item: newItem } );
               
            postal.publish({
                channel: "restaurants-system",
                topic: "review.update" ,
                actionType: "DELETE",
                data: newItem 
             });
        }
        processAddReviewComplete(data)
        {
            //state is not maintained, so rebuild from scratch
            let itemWithId = cloneJSON(this.state.item);
         
            itemWithId.reviewDTOs = [data].concat(itemWithId.reviewDTOs)
 
         
            this.setState({currentReviewIdx: -1,actionType:null, originalItem: itemWithId, item: itemWithId } );
               
            postal.publish({
                channel: "restaurants-system",
                topic: "review.update" ,
                actionType: "ADD",
                data: itemWithId 
             });
        }
        processSaveReviewComplete(data)
        {
            //console.log("complete "+JSON.stringify(data)) 
            let newReview = data.changedReview;
            let newItem = cloneJSON(this.state.item);
            let newReviews = newItem.reviewDTOs.map((review) => 
                    {
                        if (review.id === newReview.id)
                        {
                            return newReview;
                        }
                        else
                        {
                            return review;
                        }
                    }
                    
                    )
            newItem.reviewDTOs = newReviews;
            this.setState({currentReviewIdx: -1,actionType:null, originalItem: newItem, item: newItem });
               
            postal.publish({
                channel: "restaurants-system",
                topic: "review.update" ,
                actionType: "SAVE",
                data: this.state.item 
             });
        
        }
        
        checkForError(data)
        {
            let me = this;
            if (data.error)
            {

               // me.setState({errorMessage: data.error,isLoading: false})
                return true;
            }
            else
            {
               // me.setState({errorMessage: null,isLoading: false})
                return false;
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
            this.setState({ currentReviewIdx: idx,actionType: "EDIT"})
        }
        saveReview(idx,ev)
        {
            let topic = "item.save.request.review";
            if (this.state.actionType && this.state.actionType == "ADD") 
            {
              topic = "item.add.request.review";
            }
               
            postal.publish({
                 channel: "restaurants-system",
                 topic: topic ,
                 data: {changedReview: this.state.item.reviewDTOs[this.state.currentReviewIdx],restaurantId: this.state.item.id}  
              });
             
        }
        deleteReview(idx,ev)
        {
              
            let reviewToDelete = this.state.item.reviewDTOs[idx];
            
              postal.publish({
                 channel: "restaurants-system",
                 topic: "item.delete.request.review" ,
                 data: {changedReview: reviewToDelete,restaurantId: this.state.item.id}  
              });
        } 
        cancelEdit(idx,ev)
        {
             this.setState({currentReviewIdx: -1, actionType: null, item: cloneJSON(this.state.originalItem)});
        } 

        processField(fieldName,ev)
        {
              let  copyState = cloneJSON( this.state );  
              copyState.item.reviewDTOs[copyState.currentReviewIdx][fieldName] = ev.target.value;
              this.setState(copyState);
        }
        
        addReview()
        {
            let newItem = cloneJSON(this.state.originalItem);
            newItem.reviewDTOs = [EMPTY_REVIEW()].concat(newItem.reviewDTOs);
            let newState = {currentReviewIdx: 0, item: newItem,actionType: "ADD"}
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
                   
           
                   me.state.item.reviewDTOs.map((review,i) => (

                                       <tr key={review.id}>
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