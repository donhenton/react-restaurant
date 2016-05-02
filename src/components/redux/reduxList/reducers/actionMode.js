/**
 * this reducer targets the action mode element of state
 */
 
const actionMode = (state = {}, action) => {
  switch (action.type) {
    case "VOTER_SELECTED":
      
      return "EDIT";
      
    case "VOTER_SELECTION_CANCELED":
       
       return null;
       
    case "VOTER_SAVED":
    
        return null;
        
    case "REPORT_ERROR":
    
        return state;
 
    default:
      return null;
  }
}

export default actionMode