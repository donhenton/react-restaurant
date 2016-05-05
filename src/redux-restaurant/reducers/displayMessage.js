 
 const EMPTY_MESSAGE = {type: null , text: null}
 
const actionMode = (state = EMPTY_MESSAGE, action) => {
  switch (action.type) {
      
   case "REMOVE_MESSAGE" :
      return EMPTY_MESSAGE;
    
    case "DISPLAY_MESSAGE":
      
      return  action.payload;
     
    default:
      return state;
  }
}

export default actionMode