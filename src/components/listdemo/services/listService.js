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
                       topic: "item.save.request",
                       callback: function (data, envelope) {
                       me.processSaveRequest(data, envelope)
                       }
              });
            
            
            this.data =
            {items: [
            {id: 1,
                    name: 'manny',
                    party: 'Democrat',
                    age:35},
            {id: 2,
                    name: 'moe',
                    party: 'Republican',
                    age: 15},
            {id: 3,
                    name: 'jack',
                    party: 'Communist',
                    age: 46}]};

        }

        processSaveRequest(newRecord, envelope)
        {
            let me = this;
            this.data.items = this.data.items.map((d,i) => {
                
               if (d.id == newRecord.id)
               {
                   return newRecord;
               }
               else
               {
                   return d;
               }
                
                
            })
            
            
            
            postal.publish({
                channel: "restaurants",
                topic: "item.save.request.complete",
                data: me.getData()
            });


        }
        
      getData()
      {
           return   JSON.parse(JSON.stringify( this.data )); 
      }
        
}
 
