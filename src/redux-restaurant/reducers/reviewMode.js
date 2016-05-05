/**
 * this reducer targets the action mode element of state
 */
 
const actionMode = (state = null, action) => {
  switch (action.type) {
    case "EDIT_REVIEW":
      
        return "EDIT_REVIEW";
      
    case "ADD_REVIEW" :
        
        return "ADD_REVIEW";
        
    case "FINISHED_REVIEW":
        return null;
        
    default:
      return state;
  }
}

export default actionMode