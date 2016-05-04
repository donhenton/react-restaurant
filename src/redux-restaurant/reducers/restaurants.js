/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



const restaurants = (state = [], action) => {
    
    switch (action.type)
    {
        case "INITIALIZE" :
            
            return action.payload;
            
        default:
            return state;
    }
    
    
}


export default restaurants;