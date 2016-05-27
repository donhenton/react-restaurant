/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



const restaurants = (state = [], action) => {
    
    switch (action.type)
    {
        case "INITIALIZED" :
            
            return action.payload;
        
        
        case "RESTAURANT_UPDATED":
            let newList = state.map((restaurant) =>{
                if (restaurant.id == action.payload.id)
                {
                    return action.payload;
                }
                else
                {
                    return restaurant;
                }


            })


            return newList;
        
        
        
        
        default:
            return state;
    }
    
    
}


export default restaurants;