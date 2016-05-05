 
 const EMPTY_MESSAGE = {type: null , text: null}
 
const displayMessage = (state = EMPTY_MESSAGE, action) => {
  switch (action.type) {
      
   case "INITIALIZING" :
   case "INITIALIZED" :
      return state;
    
   case "DISPLAY_MESSAGE":
      
      return  action.payload;
     
   default:
      return EMPTY_MESSAGE;
      
  }
}

export default displayMessage