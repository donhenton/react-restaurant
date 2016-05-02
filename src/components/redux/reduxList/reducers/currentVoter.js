/**
 * this reducer targets the current voter element of state
 */



export const EMPTY_VOTER = {id: -1,
                  name: '',
                  party: 'Communist',
                  age: 21};

const voters = (state = EMPTY_VOTER, action) => {
  console.log("currentVoter reducer action is "+action.type);
  switch (action.type) {
    case "VOTER_SELECTED":
      
      return action.payload;
    case "VOTER_SELECTION_CANCELED":
      return EMPTY_VOTER ;
    
    case "VOTER_SAVED"  :
      
      return EMPTY_VOTER;
      
    case "REQUEST_VOTER_ADD"  :
      
      return EMPTY_VOTER;
    
    case "REPORT_ERROR"  :
      
      return state;
    
    default:
      return EMPTY_VOTER;
  }
}

export default voters