import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
 
 


class WaitIndicator extends Component {
            
            
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
                if (this.props.isProcessing)
                {
                    return "waitIndicator";
                }
                return "hidden";
            }
            
            
            render()
            {
                
                return (
                      
                
                        
                 

                <div className={this.hideWaitIndicator()}  />
                 
                        
                        
                        
                        
                        
                        
                )
                
            }
            
            
    }

////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
   
  return {
     isProcessing: state.isProcessing
  };
}

 
 
    
export default connect(mapStateToProps)(WaitIndicator);