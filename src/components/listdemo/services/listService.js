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


