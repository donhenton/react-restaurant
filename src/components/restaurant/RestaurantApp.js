    import React from 'react';
    import { Component } from 'react';

     
    import {EMPTY_RESTAURANT} from './restaurantService';
    import {arrayToIterable} from './restaurantUtils';
    import postal from 'postal';
    import EditRestaurantForm from './editRestaurantForm';
    import ListItem from './restaurantListItem';
    import RestaurantService from './restaurantService';
    import ReviewService from './reviewService';

    export default class RestaurantApp extends Component {

    constructor()
    {
        super();
        this.restaurantService = new RestaurantService();
        this.reviewService = new ReviewService();

    }
    
   editItemRequest(selectedItem)
   {
      // console.log("hit edit "+JSON.stringify(item))
       let highlighting = [];
       let me = this;
       let processedItems = this.state.items.map((item) => 
               {    
                   
                     
                    highlighting.push(false); 
                    if (item.id == selectedItem.id)
                    {
                        highlighting[highlighting.length-1] = true;
                         
                    } 
                    return item;
                    
       
               });
       
       this.setState({highlighting,actionMode:"EDIT",errorMessage: null});
      
      
   }
   
   deleteItemRequest(item)
   {
       postal.publish({
            channel: "restaurants-system",
            topic: "item.delete.request" ,
            data:  item 
        });
   } 
   
    
    componentWillMount()
    {
            let me = this;
            this.state = {items: [EMPTY_RESTAURANT()],actionMode: null,isLoading: true,errorMessage: null};
            this.state.highlighting = [];
            this.state.errorMessage = null;
            
            this.callbacks = {
                        deleteItem: this.deleteItemRequest.bind(this),
                        editItem: this.editItemRequest.bind(this) 
                         
                }
            
            
           me.restaurantService.getAllRestaurants()

            .then(function (data) {

                let preppedData =  JSON.parse(data);
                let newHighlighting = [];
                for(var i=0;i<preppedData.length;i++)
                {
                    newHighlighting.push(false);
                }

                    me.setState({items: preppedData,actionMode: null,isLoading: false,highlighting: newHighlighting}, function() {


                    })

            })
            .catch(function (err) {
            throw err;
            });


            //register postal listeners
            
            
            postal.subscribe({
                channel: "restaurants-system",
                topic: "cancel.edit.Item",
                callback: function (data, envelope) {
                 
                let highlighting = [];    
                for(var i=0;i<me.state.items.length;i++)
                {
                    highlighting.push(false);
                }
                    
                    me.setState({actionMode: null,highlighting,errorMessage: null});
                }
            }); 
            
 
            postal.subscribe({
                channel: "restaurants-system",
                topic: "review.update",
                callback: function (newItem, envelope) {
                     
                     let updatedItems = me.state.items.map((item,i) =>
                            { 
                                    if (item.id == newItem.id)
                                    {
                                        return newItem    
                                    }
                                    else
                                    {
                                        return item;
                                    }
                            
                            } 
                            
                            );
                    
                     me.setState({items: updatedItems});
                    
                }
            }); 
 
 
            postal.subscribe({
                channel: "restaurants-system",
                topic: "item.save.request.complete",
                callback: function (data, envelope) {
                    if (!me.checkForError(data))
                        me.processSaveComplete(data.confirmedData)
                   // console.log("in save.request.complete "+JSON.stringify(data))
                }
            }); 
            
            postal.subscribe({
                channel: "restaurants-system",
                topic: "item.add.request.complete",
                callback: function (data, envelope) {
                    if (!me.checkForError(data))
                       me.processAddComplete(data.confirmedData)
                   // console.log("in save.request.complete "+JSON.stringify(data))
                }
            }); 
            
             postal.subscribe({
                channel: "restaurants-system",
                topic: "item.delete.request.complete",
                callback: function (data, envelope) {
                    if (!me.checkForError(data))
                       me.processDeleteComplete(data.confirmedData)
                        
                   // console.log("in save.request.complete "+JSON.stringify(data))
                }
            }); 
            
            //handle save and add messages from the restaurant form
             postal.subscribe({
                channel: "restaurants-system",
                topic: "item.*.request",
                callback: function (data, envelope) {
                    if (!me.checkForError(data))
                      me.setState({isLoading: true});
                   
                }
            }); 
 
    }
    
    checkForError(data)
    {
        let me = this;
        if (data.error)
        {
            
            me.setState({errorMessage: data.error,isLoading: false})
            return true;
        }
        else
        {
            me.setState({errorMessage: null,isLoading: false})
            return false;
        }
    }
    
    
    processAddComplete(newDataItem)
    {
        
       let me = this;
       let processedItems  = [newDataItem].concat(this.state.items);
       
       this.setState({items: processedItems,  actionMode:null,isLoading: false});
        
        
    }
    
    
    
    processDeleteComplete(delItem)
    {
       let highlighting = [];
       let me = this;
       
       let processedItems = this.state.items.filter((item) => item.id != delItem.id);   
       this.setState({items: processedItems, highlighting,isLoading: false,actionMode: null});
        
        
    }
    processSaveComplete(newDataItem)
    {
       let highlighting = [];
       let me = this;
       let processedItems = this.state.items.map((item) => 
               {    
                   
                     
                    highlighting.push(false); 
                    if (item.id == newDataItem.id)
                    {
                       // highlighting[highlighting.length-1] = true;
                     //  console.log("process save complete hit "+JSON.stringify(newDataItem))
                       return newDataItem;
                         
                    } 
                    return item;
                    
       
               });
       
       this.setState({items: processedItems, highlighting,actionMode:null,isLoading: false});
        
        
    }

    hideWaitIndicator()
    {
     if (this.state.isLoading)
     {
         return "waitIndicator";
     }
     return "waitIndicator hidden";
    }

    displayEditFormCSS()
    {
      //console.log("display css "+this.state.inEditMode);
      if (this.state.actionMode)
      {
         return "editContainer";
      }
      else
      {
          return "editContainer hidden"; 
      }

    }
    
    addRestaurant()
    {
        let me = this;
        let highlighting = [];    
        for(var i=0;i<me.state.items.length;i++)
        {
            highlighting.push(false);
        }

        me.setState({actionMode: "ADD",highlighting,errorMessage: null});
        postal.publish({
            channel: "restaurants-system",
            topic: "add.Item" ,
            data: EMPTY_RESTAURANT()
        });
        
    }

        render() {
            let me = this;

        return (


            <div className='restaurantApp grouping'>
            <div className="waitIndicator" className={this.hideWaitIndicator()} />
                <div className='restaurantListContainer'>
                    <div>
                        <span className="errorMessage">{this.state.errorMessage}</span>
                        <button  onClick={this.addRestaurant.bind(this)} className="editButton addButton">Add Record</button>
                    </div>

                    <div id="restaurantScrollList">
                            <div id="tHeadContainer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className="nameItem">Name</th> 
                                            <th className="cityItem">City</th> 
                                            <th className="stateItem">State</th> 
                                            <th className="zipCodeItem">Zip Code</th>
                                            <th className="versionItem">Version</th>
                                            <th className="actionItems">&nbsp;</th> 
                                            <th className="actionItems">&nbsp;</th> 

                                        </tr>
                                    </tbody>
                                 </table>    
                            </div>    
                            <div id='tbodyContainer'>
                            <table>
                            <tbody>
                                {


                                    this.state.items.map((item,i) => (

                                        <ListItem 
                                             editCallback={this.editItemRequest.bind(this)} 
                                             deleteCallback={this.deleteItemRequest.bind(this)} 
                                             highlighted={this.state.highlighting[i]}
                                             key={item.id} item={item} />
                                    ))


                                }
                            </tbody>

                            </table>
                            </div>
                    </div>




                </div>   
                <div className={me.displayEditFormCSS()}>
                    
                       <EditRestaurantForm />
                                
                </div>


            </div> 




                );
        }
    }


