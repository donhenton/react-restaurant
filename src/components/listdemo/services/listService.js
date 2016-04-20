import postal from 'postal';
import Immutable from 'immutable';
export default class ListService
{

        constructor()
        {
            
            console.log("did setup in ListService");
               let me = this;
                postal.subscribe({
               channel: "restaurants",
                       topic: "item.save.request",
                       callback: function (data, envelope) {
                       me.processSaveRequest(data, envelope)
                       }
              });
             postal.subscribe({
               channel: "restaurants",
                       topic: "item.add.request",
                       callback: function (data, envelope) {
                       me.processAddRequest(data, envelope)
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
        
        
         processAddRequest(newRecord, envelope)
        {
            let me = this;
            var idArray = this.data.items.map((o) => o.id);
            
            var maxId = Math.max.apply(null,idArray);
            newRecord.id = maxId + 1;
            this.data.items.push(newRecord);
            postal.publish({
                channel: "restaurants",
                topic: "item.save.request.complete",
                data: me.getData()
            });


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
 
