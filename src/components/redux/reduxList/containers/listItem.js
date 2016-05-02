import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectVoter } from '../actions/index';
 
class ListItem extends Component {
  
  
  
  highLightRow()
  {
      let info = "in highlight returning "
      let retValue = null;
      if (this.props.voter.id === this.props.currentVoter.id)
      {
          retValue =  "highlighted";
      }
      //console.log(info + retValue+" "+ this.props.voter.name)
      return retValue;
  }
    
    
  render() {
    let voter = this.props.voter;
    return (
            
                <tr className={this.highLightRow()}>
                
                    <td className="tableName">{voter.name}</td>
                    <td className="tableAge">{voter.age}</td>
                    <td className="tableParty">{voter.party}</td>
                    <td className="tableBtn"><button className="deleteButton">Delete</button></td>
                    <td className="tableBtn"><button onClick={() => this.props.selectVoter(voter)}className="editButton" >Edit</button></td>
                </tr>   
            
            )
  }
  
  
  
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props value 
  // inside this container
  return {
    currentVoter: state.currentVoter
  };
}

// Anything returned from this function will end up as a function on props
// on the this container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ selectVoter }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);