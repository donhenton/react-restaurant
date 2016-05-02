import { combineReducers } from 'redux';
import voters from './voters';
import currentVoter from './currentVoter';

const reduxListApp = combineReducers({
   voters, 
   currentVoter
})

 

export default reduxListApp