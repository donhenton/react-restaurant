/**
 * this reducer targets the action mode element of state
 */
 
const actionMode = (state = null, action) => {
  switch (action.type) {
    case "RESTAURANT_SELECTED":
      
        return "EDIT";
      
    case "RESTAURANT_ADD" :
        
        return "ADD";
        
    case "RESTAURANT_SELECTION_CANCELED":
       
       return null;
       
    case "ACTION_SUCCESSFUL":
       return null;
 
    default:
      return state;
  }
}

export default actionMode