/**
 * this reducer targets the action mode element of state
 */
 
const displayMessage = (state = {}, action) => {
  switch (action.type) {
     
     
    case "REPORT_ERROR" :
        return action.voter.name + " problem " + action.validationResult.message 
    default:
      return null;
  }
}

export default displayMessage