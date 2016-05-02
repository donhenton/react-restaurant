import { combineReducers } from 'redux';
import voters from './voters';
import currentVoter from './currentVoter';
import actionMode from './actionMode';
import displayMessage from './displayMessage';

const reduxListApp = combineReducers({
   voters, 
   currentVoter,
   actionMode,
   displayMessage
})

export function cloneJSON(j)
{
   return  JSON.parse(JSON.stringify(j ));  
    
} 

export default reduxListApp