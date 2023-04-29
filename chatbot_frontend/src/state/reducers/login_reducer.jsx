const login_reducer = (state=false,action)=>{
     if(action.type=='login'){
        return state=action.payload;
     }
     else{
        return state;
     }
}

export default login_reducer;