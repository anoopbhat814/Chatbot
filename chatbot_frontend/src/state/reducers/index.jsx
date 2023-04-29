import { combineReducers } from "redux";
import login_reducer from "./login_reducer";
import Userdetail_reducer from "./Userdetail_reducer";


const reducers = combineReducers({
    login:login_reducer,
    userDetail:Userdetail_reducer
})

export default reducers;