import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {cloneJSON} from './restaurantUtils';
import {EMPTY_RESTAURANT} from './restaurantService';

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
            this.state = {
                originalItem: this.props.item ,
                currentReviewIdx: -1,
                item: itemVar 
            }           


        }
        componentWillReceiveProps (nextProps) {
            //got a prop change send it to state
            let itemVar = cloneJSON(nextProps.item) ;
           // console.log(JSON.stringify(nextProps))
            let newState = {
                originalItem: nextProps.item ,
                currentReviewIdx: -1,
                item: itemVar 
            }   
            this.setState(newState)
            
        }
        
        componentWillUpdate(nextProps,nextState)
        {
        
                // dont set state here it will cause a infinite loop
                // invoked before rendering, prep right before an update
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
            this.setState({ currentReviewIdx: idx})
        }
        saveReview(idx,ev)
        {
             
        }
        deleteReview(idx,ev)
        {
             
        } 
        cancelEdit(idx,ev)
        {
             this.setState({currentReviewIdx: -1, item: cloneJSON(this.state.originalItem)});
        } 

        processField(fieldName,ev)
        {
              let  copyState = cloneJSON( this.state );  
              copyState.item.reviewDTOs[copyState.currentReviewIdx][fieldName] = ev.target.value;
              this.setState(copyState);
        }


        render()
        {
           let me = this;
           return (  
                   
                    
            <section className="editReviewContainer">
            <h4>Reviews</h4>
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
            </section>
    
            )

        }
  
  }