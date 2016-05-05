 
 const EMPTY_MESSAGE = {type: null , text: null}
 
const displayMessage = (state = EMPTY_MESSAGE, action) => {
  switch (action.type) {
      
   case "INITIALIZING" :
   case "INITIALIZED" :
   case "ACTION_SUCCESSFUL":
   case "FINISHED_REVIEW":
   case "RESTAURANT_UPDATED":
      return state;
   
  case "CLEAR_MESSAGE":
      return EMPTY_MESSAGE;
 
   
   case "DISPLAY_MESSAGE":
      
      return  action.payload;
     
   default:
      return EMPTY_MESSAGE;
      
  }
}

export default displayMessage