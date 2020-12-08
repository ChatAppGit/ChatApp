const userInfo = (state =[],action)=>{
    switch(action.type)
    {
        case 'SET_USER':
          return[action.payload]
                 
        case 'Show_USER':
           return state  
        default:
         return state  
    }


}

export default userInfo;