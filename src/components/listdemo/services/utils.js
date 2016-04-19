 import postal from 'postal';
export default class Utils
{

    constructor()
    {
       
    }


     



}

export const EMPTY_DATA = {id: -1,
                  name: '',
                  age: -1};
              
export function cleanDisplay  (d)  
{
    let retVal = {};
    if (d.id && d.id < 1)
    {
        retVal.id = "";
    }
    retVal.name = d.name;
    if (d.age && d.age < 1)
    {
        retVal.age = "";
    }
    
    return retVal;
}