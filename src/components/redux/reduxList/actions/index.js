 
export function selectVoter(voter)
{
    //console.log("action selectVoter "+JSON.stringify(voter))
    return {
        'type': "VOTER_SELECTED",
        'payload': voter
    }
    
    
    
}


/*
  repeat as necessary
 export function doSomething(x)
{
    return {
        'type': "SOMETHING",
        'payload': x
    }
    
    
    
} 
   
 */