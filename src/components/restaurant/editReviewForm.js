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
            let itemVar = [].concat(this.props.item) ;
            this.state = {
                originalItem: this.props.item ,
                item: itemVar[0]
            }           


        }
        componentWillReceiveProps (nextProps) {
            //got a prop change send it to state
            let itemVar = [].concat(nextProps.item) ;
           // console.log(JSON.stringify(nextProps))
            let newState = {
                originalItem: nextProps.item ,
                item: itemVar[0]
            }   
            this.setState(newState)
            
        }
        
        componentWillUpdate(nextProps,nextState)
        {
        
                // dont set state here it will cause a infinite loop
         
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

                                       <tr key={review.id}><td className="rating">{review.starRating}</td><td className="listing">{review.reviewListing}</td></tr>
                                    )) 
           
                    
                         
              }
              </tbody>
              </table>
            </section>
    
            )

        }
  
  }