import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {EMPTY_MESSAGE} from './../reducers/displayMessage' 
 
// const EMPTY_MESSAGE = {type: null , text: null}

class DisplayMessageContainer extends Component {
            
            
            constructor()
            {
                super();
                
                 
            }
            
            
            
            hideActionMessage()
            {
                 
                if (this.props.displayMessage && this.props.displayMessage.type)
                {
                    return  this.props.displayMessage.type;
                }
                return "hidden";
            }
            
            
            render()
            {
                
                return (
                      
                
                        
                 

                <span id="displayMessage" className={this.hideActionMessage()}>{this.props.displayMessage.text}</span>
                 
                        
                        
                        
                        
                        
                        
                )
                
            }
            
            
    }

////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
  
  return {
      
     displayMessage: state.displayMessage
  };
}

 
 
    
export default connect(mapStateToProps)(DisplayMessageContainer);