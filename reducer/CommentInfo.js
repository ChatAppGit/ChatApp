const CommentInfo = (state =[],action)=>{
    switch(action.type)
    {
        case 'SET_COMMENTLIKE':
          return[action.payload]
                 
        case 'Show_COMMENTLIKE':
           return state  
        default:
         return state  
    }


}

export default CommentInfo;