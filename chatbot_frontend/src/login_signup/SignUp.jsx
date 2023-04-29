import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
//import { GoogleLogin } from 'react-google-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../login_signup/login_signup.css';
const clientId = '970384278739-o4gq3a5khefgmahhlrp8k3fnsnssbgjq.apps.googleusercontent.com';


const SignUp = () => {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhone_number] = useState("");
	const [password, setPassword] = useState("");


// <================state for showing error messages==================================>

   const [firstnameError, setFirstnameError] = useState("")
   const [lastnameError, setLastnameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [phone_numberError, setPhone_numberError] = useState("");
   const [passwordError, setPasswordError] = useState("");




	const navigate = useNavigate();
	// const dispatch = useDispatch();

	const Base_url = process.env.REACT_APP_BASE_URL;





	const handleSign_up = async (e) => {
		e.preventDefault();
		if(!firstName){
			setFirstnameError("*please enter first name")
		}
		else if(!lastName){
			setLastnameError("*please enter last name")
		}
		else if(!email){
			setEmailError("*please enter email")
		}
		else if(!phone_number){
			setPhone_numberError("*please enter phone number")
		}
		else if(!password){
			setPasswordError("*please enter password")
		}
		else{
		try {
			const object = {
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone_number: phone_number,
				password: password
			}
			const response = await axios.post(`${Base_url}/user/signup`, object);
			console.log("res>>>>>", response)
			if (response.data.success === true) {

				const user_id = response.data.user._id;
				const first_name = response.data.user.first_name;

				localStorage.setItem("login", true)
				localStorage.setItem("username", (first_name))
				localStorage.setItem("userId", (user_id))
				navigate('/home')
			}

		} catch (error) {
			console.log("error", error)
			if (error.response.status === 400) {
				toast.error(error.response.data.message)
			}

		}
	}
	}


	const onSuccess = async (res) => {
		console.log("res>>>>>",res)
		console.log("gdgffgj>>>>>>", res.profileObj)
		console.log(">>>>>>>>>>>>>>", res.accessToken);
		try {
			let obj = {
				first_name: res.profileObj.givenName,
				last_name: res.profileObj.familyName,
				email: res.profileObj.email,
				phone_number: '',
				type:"google",
				password: res.profileObj.googleId,

			}

			const result = await axios.post(`${Base_url}/user/login`, obj)
			console.log(">result>>>", result)
			if(result.data.success===true){
				const user_id = result.data.user._id;
				const first_name = result.data.user.first_name;

				localStorage.setItem("login", true)
				localStorage.setItem("username", (first_name))
				localStorage.setItem("userId", (user_id))
				navigate('/home')
			}

		}
		catch (error) {
			console.log(error)
			console.log("status>>>", error.response.status)
			console.log("message>>>", error.response.data.message)

			if (error.response.status === 400) {
				toast.error(error.response.data.message)
			}
		}
	}

	const onFailure = (res) => {
		console.log("Login Failer!", res)
	}




	const handleInputFocus = (stateVariableName) => {
		setFirstnameError('')
		setLastnameError('')
		setEmailError('')
		setPhone_numberError('')
		setPasswordError('')
	  };






	return (
		<>
			<form>
				<div className='form-group login_outer'>
					<div className='login-form signupform'>
						<h2 className='signup-form'>Sign up</h2>
						<div className='signup login-page'>

							<div className='signup-page'>
                                <div className='form_list'>
                                <div className='left_side'>
								<lable for="First Name">First Name</lable>
								<input type="text" className="form-control" placeholder="First Name" name="firstname"
								onFocus={()=>handleInputFocus("firstname")}
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
								{firstnameError && <p id="error_message">{firstnameError}</p>}
								</div>
                                <div className='right_side'>
								<lable for="Last Name">Last Name</lable>
								<input type="text" className="form-control" placeholder="Last Name" name="lastname"
								onFocus={()=>handleInputFocus("lastname")}
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
								{lastnameError && <p id="error_message">{lastnameError}</p>}
								</div>
                                </div>
                                
                                
                                <div className='form_list'>
                                 <div className='left_side'>
								<lable for="Email">Email</lable>
								<input type="text" className="form-control" placeholder="Email" name="email"
								    onFocus={()=>handleInputFocus("email")}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								{emailError && <p id="error_message">{emailError}</p>}
								</div>
                                
                                <div className='right_side'>
								<lable for="phoneNumber">Phone</lable>
								<input type="number" className="form-control" placeholder="Phone Number" name="phone_number"
									onFocus={()=>handleInputFocus("phone_number")}
									value={phone_number}
									onChange={(e) => setPhone_number(e.target.value)}
								/>
								{phone_numberError && <p id="error_message">{phone_numberError}</p>}
								</div>
                                </div>
                                <div className='form_list'>
								<lable for="password">Password</lable>
								<input type="password" className="form-control" placeholder="Password" name="password"
									onFocus={()=>handleInputFocus("password")}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								{passwordError && <p id="error_message">{passwordError}</p>}
								</div>
                                
                                <div className='form_list btn_list'>
                                 <div className='signUp_button'>
								<button className='btn btn-default' onClick={handleSign_up}>Sign Up</button>
								</div>
                                </div>
								<p className="or_text">or</p>
								{/* <button className="btn btn-primary" >
						<span>Sing up with Google</span>
					</button> */}
								<div id="signInButton">

									{/* <GoogleLogin
										clientId={clientId}
										buttonText="Signup with Google"
										onSuccess={onSuccess}
										onFailure={onFailure}
										cookiePolicy={'single_host_origin'}
										prompt="select_account"
									/> */}
									<ToastContainer />
								</div>
								<p className="link_here">
									Already Have Account ? <Link to="/login">Log In</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
                
			</form>
		</>
	)
}

export default SignUp
