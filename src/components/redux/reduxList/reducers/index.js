import { combineReducers } from 'redux';
import voters from './voters';
import currentVoter from './currentVoter';
import actionMode from './actionMode';

const reduxListApp = combineReducers({
   voters, 
   currentVoter,
   actionMode
})

export function cloneJSON(j)
{
   return  JSON.parse(JSON.stringify(j ));  
    
} 

export default reduxListApp