import postal from 'postal';
import Immutable from 'immutable';
export default class ListService
{

    constructor()
    {
        console.log("did setup in ListService");
        let me = this;
        this.subscription = postal.subscribe({
            channel: "restaurants",
            topic: "select.Item",
            callback: function (data, envelope) {
                me.processMessage(data,envelope)
            }
        });
    }


    processMessage(data,envelope)
    {
       //  console.log("list service recieved "+JSON.stringify(envelope));
        

    }
}

export function getData()
{
    return {items: [
                {id: 1,
                  name: 'manny',
                  party: 'Democrat',
                  age:35} ,
                {id: 2,
                  name: 'moe',
                  party: 'Republican',
                  age: 15},
                {id: 3,
                  name: 'jack',
                  party: 'Communist',
                  age: 46}]};
  
}



