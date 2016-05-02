import {EMPTY_VOTER} from './../reducers/currentVoter';
export function selectVoter(voter)
{
    
    return {
        'type': "VOTER_SELECTED",
        'payload': voter
    }
    
    
    
}

export function cancelSelectVoter(voter)
{
    
    return {
        'type': "VOTER_SELECTION_CANCELED",
        'payload': voter
    }
    
    
    
}

export function addVoter()
{
    
    return {
        'type': "REQUEST_VOTER_ADD",
        'payload': EMPTY_VOTER
    }
    
    
    
}

export function saveSelectVoter(voter)
{
    
    return {
        'type': "VOTER_SAVED",
        'payload': voter
    }
    
    
    
}


export function simpleAction(type,payload)
{
    return {type,payload}
}

export function reportError(voter,validationResult)
{
    return { 'type':"REPORT_ERROR", voter, validationResult};
    
    
}