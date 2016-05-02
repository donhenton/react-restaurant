/**
 * this reducer targets the voter element of state
 */

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
  switch (action.type) {
    case 'Fred':
      return state;
    case 'Ted':
      return state ;
    default:
      return voterData;
  }
}

export default voters