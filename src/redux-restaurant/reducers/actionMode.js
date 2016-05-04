/**
 * this reducer targets the action mode element of state
 */
 
const actionMode = (state = null, action) => {
  switch (action.type) {
    case "RESTAURANT_SELECTED":
      
      return "EDIT";
      
    case "RESTAURANT_SELECTION_CANCELED":
       
       return null;
       
    
 
    default:
      return null;
  }
}

export default actionMode