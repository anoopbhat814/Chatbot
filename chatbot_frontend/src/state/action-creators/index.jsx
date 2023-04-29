export const loginState=(value)=>{
    return(dispatch)=>{
dispatch({
       type:'login',
       payload:value
})
    }
}


export const userName=(value)=>{
    return(dispatch)=>{
        dispatch({
            type:"userName",
            payload:value,
        })
    }
}


export const userId=(value)=>{
    return(dispatch)=>{
        dispatch({
            type:"userId",
            payload:value,
        })
    }
}