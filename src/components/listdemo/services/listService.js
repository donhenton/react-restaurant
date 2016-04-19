import postal from 'postal';
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
        console.log("process "+JSON.stringify(envelope));

    }
}

export function getData()
{
    return {items: [
                {id: 1,
                  name: 'manny',
                  age:35} ,
                {id: 2,
                  name: 'moe',
                  age: 15},
                {id: 3,
                  name: 'jack',
                  age: 46}]};
  
}



