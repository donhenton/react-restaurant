import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './listItem'
import EditForm from './editForm'
import Message from './message'
import { addVoter } from '../actions/index'; 
 
 
class ListApp extends Component {
    
    
  render() {
    return (
       
       
       
                   <div className='listMainContainer grouping'>
                    <div className='restaurantListContainer'>
                    <div>
                    <Message />
                    <button  onClick={() => this.props.addVoter()} className="editButton addButton">Add Record</button>
                    </div>
                    <table className="displayTable">
                        <thead>
                        <tr>
                        <th>Name</th> 
                        <th>Age</th> 
                        <th>Party</th> 
                        <th>Delete</th><th>Edit</th></tr>
                        </thead>

                    <tbody>

                    {

                        this.props.voters.map((voter,i) => { 

                          return  (<ListItem key={voter.id}   voter={voter} /> )
                        })


                    }
                    </tbody>
                    </table>
                    </div>
                     
                     <div id="editForm">
                        <EditForm />
                     </div>
                     
            </div>

       
       
       
       
       
       
       
       
       
    );
  } //end render;
  
}

////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of this react container
  return {
    voters: state.voters
  };
}

 function mapDispatchToProps(dispatch) {
 
   return bindActionCreators({ addVoter: addVoter }, dispatch);
 }

 
    
export default connect(mapStateToProps, mapDispatchToProps)(ListApp);