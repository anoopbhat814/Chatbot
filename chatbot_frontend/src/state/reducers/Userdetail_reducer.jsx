const Userdetail_reducer=(state={userName:"",userId:""},action)=>{
   if(action.type==="userName"){
      return state={...state,userName:action.payload}
   }
   else if(action.type==="userId"){
    return state={...state,userId:action.payload}
   }
   else{
    return state;
   }
}
export default Userdetail_reducer;