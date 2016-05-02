import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectVoter } from '../actions/index';
 
class Message extends Component {
  
  
  
    
    
  render() {
    let voter = this.props.voter;
    return (
            
                 <span>{this.props.displayMessage}</span>
            
            )
  }
  
  
  
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props value 
  // inside this container
  return {displayMessage: state.displayMessage};
}

 


export default connect(mapStateToProps, null)(Message);