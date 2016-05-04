/**
 * this reducer targets the action mode element of state
 */
 
const isProcessing = (state = false, action) => {
  switch (action.type) {
    
    case "INITIALIZING" :
      return true;
     
    case "INITIALIZED" :
      return false;
 
    default:
      return false;
  }
}

export default isProcessing