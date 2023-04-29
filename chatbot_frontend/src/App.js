import { useEffect } from 'react';
import './App.css';
import './Home.css';
import Home from './Home/Home';
import Login from './login_signup/Login';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import SignUp from './login_signup/SignUp';
import {gapi} from "gapi-script"

const clientId = '970384278739-o4gq3a5khefgmahhlrp8k3fnsnssbgjq.apps.googleusercontent.com'
function App() {

  useEffect(()=>{


    function start(){
      gapi.client.init({
        clientId:clientId,
        scope:''
      })
    }
  
  
  
    gapi.load("client:auth2",start)
  })
  return (
    <div className="App">
      <Router>
        <Routes>
         <Route path='/' element={<Login/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </Router>
     {/* <Home/> */}
    </div>
  );
}

export default App;
