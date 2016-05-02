 
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


export function saveSelectVoter(voter)
{
    
    return {
        'type': "VOTER_SAVE_REQUESTED",
        'payload': voter
    }
    
    
    
}


export function simpleAction(type,payload)
{
    return {type,payload}
}

