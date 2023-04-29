import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
//import { GoogleLogin } from 'react-google-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../login_signup/login_signup.css';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../state';

const clientId = '970384278739-o4gq3a5khefgmahhlrp8k3fnsnssbgjq.apps.googleusercontent.com';


const Login = () => {

	const [inputField, setInputField] = useState({
		email: "",
		phone_number: ""
	});
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [errorPassword, setErrorPassword] = useState("")
	const Base_url = process.env.REACT_APP_BASE_URL;

	const navigate = useNavigate();
    const dispatch = useDispatch();


	const handleLogin = async (e) => {
		e.preventDefault();
		const isPhoneNumber = /^\d{10}$/.test(inputField);
		const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputField);

		if (!isPhoneNumber && !isEmail) {
			// alert('Please enter a valid phone number or email address');
			setError('*Please enter a valid phone number or email address')
		}
		else if(!password){
			setErrorPassword("*please enter a valid password")
		}		
		else {

			try {
				const object = {
					email: inputField,
					phone_number: inputField,
					password: password
				}

				const response = await axios.post(`${Base_url}/user/login`, object);
				console.log("response>>>>", response.data)
				if (response.data.success === true) {
					// alert(response.data.message)

					console.log("userid", response.data.user._id)
					console.log("firstname", response.data.user.first_name)

					const user_id = response.data.user._id;
					const first_name = response.data.user.first_name;
                      
					dispatch(actionCreators.loginState(true))
					dispatch(actionCreators.userName(first_name))
					dispatch(actionCreators.userId(user_id))
					localStorage.setItem("loginDetails",JSON.stringify({name:first_name, userId:user_id}));
					localStorage.setItem("login", true);
					localStorage.setItem("username", (first_name))
					localStorage.setItem("userId", (user_id))

							navigate("/home");
								}

			} catch (error) {
				console.log("error>>>>", error)
				toast.error(error.response.data.message)
			}
		}

	}


	const onLoginSuccess = async (res) => {
		console.log("profileobj>>>", res.profileObj)

		try {
			const obj = {
				
				email: res.profileObj.email,
				// email:"anna@gmail.com"											
			}

			const result = await axios.post(`${Base_url}/user/login`, obj);
			console.log("result>>>>", result.data)
			if (result.data.success === true) {
				
				const user_id = result.data.user._id;
				const first_name = result.data.user.first_name;

				localStorage.setItem("login", true)
				localStorage.setItem("username", (first_name))
				localStorage.setItem("userId", (user_id))

				navigate('/home')
			}
		} catch (error) {
			console.log("error>>>", error)
			console.log(error)
			console.log("status>>>", error.response.status)
			console.log("message>>>", error.response.data.message)

			if (error.response.status === 400) {
				toast.error(error.response.data.message)
			}
		}

	}



	const onLoginFailure = (res) => {
		console.log("Login Failer!", res)
	}



	return (
		<>
			<form>
				<div className='form-group login_outer'>
					<div className='login-form'>
						<div className='login-container'>

							<div className='login-page'>
								<h2 className='login-member'>Log in</h2>
                                  <div className='form_list'>
								<lable for="email or phone">Email or Phone Number</lable>
								<input type="text" className='form-control' placeholder="Email or Phone Number"
									value={inputField.email || inputField.phone_number}
									onChange={(e) => setInputField(e.target.value)}
                                    />
									{error && <p id="error_message">{error}</p>}
									</div>
                                  <div className='form_list'>
								<lable for="password">Password</lable>
								<input type="password" className='form-control' placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
                                    />
									{errorPassword && <p id="error_message">{errorPassword}</p>}
									</div>
                                  <div className='form_list btn_list'>
								<button className='button btn' onClick={handleLogin}>Log In</button>
                                </div>
								<p className="or_text">or</p>
								{/* <button className='google-btn'>
									<span>Log in with Google</span>
								</button> */}
								<div id="signInButton">

									{/* <GoogleLogin
										clientId={clientId}
										buttonText="Signin with Google"
										onSuccess={onLoginSuccess}
										onFailure={onLoginFailure}
										cookiePolicy={'single_host_origin'}
										prompt="select_account"
									/> */}
									<ToastContainer />
								</div>
								<p className="link_here">
									New Here ? <Link to="/signup">Sign Up</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	)
}

export default Login
