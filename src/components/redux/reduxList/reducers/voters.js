/**
 * this reducer targets the voter element of state
 */

import {simpleAction} from '../actions'
import {cloneJSON} from '.'

const voterData = 
        [
            {id: 1,
                    name: 'manny',
                    party: 'Democrat',
                    age:35},
            {id: 2,
                    name: 'moe',
                    party: 'Republican',
                    age: 15},
            {id: 3,
                    name: 'jack',
                    party: 'Communist',
                    age: 46}]
        
const voters = (state = [], action) => {
console.log("voters reducer action is "+action.type);
  switch (action.type) {
    case "VOTER_SAVED"  :
      //let copyState = cloneJSON(state); 
      let newData = state.map((voter) => {
          if (voter.id === action.payload.id)
          {
              return action.payload;
          }
          else
          {
              return voter;
          }
          
      })
       
      return newData;
      
   case "REPORT_ERROR"  :
            
       
      return state;
           
    case "VOTER_SELECTION_CANCELED":
      return state ;
    default:
      return voterData;
  }
}

export default voters