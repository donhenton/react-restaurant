import postal from 'postal';
import Immutable from 'immutable';
export default class ListService
{

        constructor()
        {
            
            
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
             postal.subscribe({
               channel: "restaurants",
                       topic: "item.delete.request",
                       callback: function (data, envelope) {
                       me.processDeleteRequest(data, envelope)
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
        
         processDeleteRequest(deletedRecord, envelope)
        {
            let me = this;
             
            console.log("listservice delete "+deletedRecord.name);
             this.data.items = this.data.items.filter((x) => x.id != deletedRecord.id)
            
            postal.publish({
                channel: "restaurants",
                topic: "item.save.request.complete",
                data: me.getData()
            });


        }
        
        
        
         processAddRequest(newRecord, envelope)
        {
            console.log("did add "+JSON.stringify(newRecord))
            let me = this;
            if (this.data.items.length == 0)
            {
                newRecord.id = 1;
            }
            else
            {
                
            
                var idArray = this.data.items.map((o) => o.id);
                var maxId = Math.max.apply(null,idArray);
                newRecord.id = maxId + 1;
            }
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
            var replyTo = envelope.replyTo ? envelope.replyTo: null;
            console.log("did save "+JSON.stringify(newRecord)+ " replyTo "+replyTo)
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
            //let the list know if needed, as well as the edit form
            
            var destEnvelope ={
                channel: "restaurants",
                replyTo: replyTo,
                topic: "item.save.request.complete",
                data: me.getData()
            }
            
            postal.publish(destEnvelope);

            //let the row element know to update
            var singleRecordUpdate = {
                replyTo: null,
                data: newRecord,
                topic: replyTo,
                channel: "restaurants"
            }
            
            postal.publish(singleRecordUpdate);


        }
        
      getData()
      {
           return   JSON.parse(JSON.stringify( this.data )); 
      }
        
}
 
