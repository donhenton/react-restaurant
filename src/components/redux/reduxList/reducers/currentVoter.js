/**
 * this reducer targets the current voter element of state
 */


const voters = (state = {}, action) => {
  switch (action.type) {
    case "VOTER_SELECTED":
      //console.log("in reducer "+JSON.stringify(action.payload))
      return action.payload;
    case 'Ted':
      return state ;
    default:
      return state;
  }
}

export default voters