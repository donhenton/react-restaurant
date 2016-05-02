import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './listItem'
 
class ListApp extends Component {
    
    
  render() {
    return (
       
       
       
                   <div className='listMainContainer grouping'>
                    <div className='restaurantListContainer'>
                    <div>
                    <button   className="editButton addButton">Add Record</button>
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

// Anything returned from this function will end up as props
// on the ListApp container
//function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
//  return bindActionCreators({ selectBook: selectBook }, dispatch);
//}

// Promote ListApp from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
//export default connect(mapStateToProps, mapDispatchToProps)(ListApp);
    
export default connect(mapStateToProps, null)(ListApp);