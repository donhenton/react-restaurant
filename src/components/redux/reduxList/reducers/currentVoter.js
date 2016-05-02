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
    
    case "VOTER_SAVE_REQUESTED"  :
      
      return state;
    
    case "VOTER_SAVE_COMPLETE"  :
      return EMPTY_VOTER;
    
    default:
      return EMPTY_VOTER;
  }
}

export default voters