 import postal from 'postal';
export default class Utils
{

    constructor()
    {
       
    }


     



}

export const EMPTY_DATA = {id: -1,
                  name: '',
                  party: 'Communist',
                  age: 21};
              
export function cleanDisplay  (d)  
{
    let retVal = {};
    if (d.id && d.id < 1)
    {
        retVal.id = "";
    }
    else
    {
        return retVal.id + "";
    }
    retVal.name = d.name;
    retVal.party = d.party;
     
    if (d.age && d.age < 1)
    {
        retVal.age = "";
    }
    else
    {
        retVal.age = d.age +"";
    }
    
    return retVal;
}

export function arrayToIterable(arr)
{
    if (typeof arr == 'Array')
        return Array.prototype.slice.call(arr);
    else
        throw new Error("not array is "+ (typeof arr))
}


//let itemArray = Array.prototype.slice.call(this.menuItems);