import React, { useState, useEffect, useRef } from 'react';
import Side_menu from './Side_menu';
import smile from '../images/smile.png';
import Base_url from '../BaseUrl'
import neww from '../images/neww.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { GoogleLogout } from 'react-google-login';
import { useSelector,useDispatch } from 'react-redux';
import { actionCreators } from '../state';




const clientId = '970384278739-o4gq3a5khefgmahhlrp8k3fnsnssbgjq.apps.googleusercontent.com';

const Home = () => {

    const [inputMessage, setInputMessage] = useState("");
    const [token, setToken] = useState('');
    const [lengthofdiv, setLenghtofDiv] = useState()
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
    const [responseMessages, setResponseMessages] = useState([]);
    const [windowHeight, setwindowHeight] = useState(window.visualViewport.height);
    const [toggle, setToggle] = useState(false);
    const [cleared, setCleared] = useState(false);
    const [hasMessages, setHasMessages] = useState(false);
    const [addClass, setAddClass] = useState(false);
    const [heightchanged, setHeightChanged] = useState(false);
    const [originalheight, setOrginalHeight] = useState(window.visualViewport.height - 230)

    // .childNodes.length

    const Base_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const isLogin = localStorage.getItem('login')
    console.log("islogin", isLogin)


    const userName = localStorage.getItem("username")
    console.log("userName", userName)

    const user_id = localStorage.getItem("userId")
    console.log("userid>>", user_id)


    //- ---<----------------------------------------------------------------------------------------------------------------->
const login =useSelector(state=>state.login)
console.log("login>>>>",login)
  const name = useSelector(state=>state.userDetail)
  console.log("name>>>>",name)

    const prevHeightRef = useRef(windowHeight);

const dispatch=useDispatch();

useEffect(() => {
    let islogin=localStorage.getItem('login');
    console.log("islogin",islogin)
    if(islogin){dispatch(actionCreators.loginState(true))}
        let isname=JSON.parse(localStorage.getItem('loginDetails'));
         console.log("isname>>",isname)
        if(isname){dispatch(actionCreators.userName(isname.name))
                   dispatch(actionCreators.userId(isname.userId))
                 }
        
}, [])

// <---------------------------------------------------------------------------------------------------------------->


    useEffect(() => {
        function handleResize() {
            const currentHeight = window.visualViewport.height;
            const prevHeight = prevHeightRef.current;

            if (currentHeight !== prevHeight) {
                setwindowHeight(currentHeight);
                console.log('Window height has changed!');
                // call your function here
                myFunction();
            }
            prevHeightRef.current = currentHeight;
        }

        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // pass an empty dependency array to run only once

    function myFunction() {
        setHeightChanged(!heightchanged)
        console.log('The height of the window has changed!');

    }



    const handleinputChange = (e) => {
        let element = document.getElementById("msg_outer");
        let length = element?.children?.length

        setInputMessage(e.target.value)
        setLenghtofDiv(length)
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            // submit the form or call the function hconsole.log("Enter key pressed");
            handleSendClick()
        }
    }

    useEffect(() => {

        const msgOuterDiv = document.getElementById("msg_outer");
        const lastDiv = msgOuterDiv?.lastElementChild;
        console.log("divetofocus", lastDiv)
        lastDiv?.focus();
        lastDiv?.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest", scrollOffset: "50px" });

    }, [lengthofdiv])


    useEffect(() => {
        const chatLog = document.getElementById("msg_outer");
        const lengthOfDiv = chatLog.children.length - 1;
        if (lengthOfDiv > 0) {
            const lastMsgDiv = chatLog.children[lengthOfDiv - 1];
            setLenghtofDiv(lastMsgDiv.innerText);
        }
    }, [messages]);


    useEffect(() => {
        setwindowHeight(window.visualViewport.height - 230)
    }, [heightchanged]);


    useEffect(() => {
        if (window.innerWidth <= '767') {
            setToggle(false);
        }
    }, []);


    // <=================================================to generate token and mesage===========================>

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            const generatedToken = Math.random().toString(36).substr(2);
            localStorage.setItem('token', generatedToken);
            setToken(generatedToken);
        }

        const storedMessages = localStorage.getItem(`messages${token}`);
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }


        const storedResponse = localStorage.getItem(`response${token}`);
        if (storedResponse) {
            setResponseMessages(JSON.parse(storedResponse));
        }
    }, [token]);



    useEffect(() => {
        localStorage.setItem(`messages${token}`, JSON.stringify(messages));
        localStorage.setItem(`response${token}`, JSON.stringify(responseMessages));
    }, [messages, token, responseMessages]);



    // <==========================================function to send messages==============================>

    const handleSendClick = async () => {
        if (inputMessage) {
            const newMessages = {
                message: inputMessage,
                response: '',
            };

            try {
                let type;
                let chatboxId;
                if (localStorage.getItem('chatbox_id')) {
                    type = "Old";
                    chatboxId = localStorage.getItem('chatbox_id');
                } else {
                    type = "New";
                }
                const obj = {
                    questions: inputMessage,
                    user_id: user_id,
                    chatbox_id: chatboxId || "",
                    type: type
                }

                const response = await axios.post(`${Base_url}/chat/create/`, obj);
                console.log("response>>>", response.data.data)
                const ai_response = response.data.data.response;


                setMessages((prevMessages) => [...prevMessages, newMessages]);

                // const generatedResponseMessage = `Hello from the server! You said: ${inputMessage}`;

                const generatedResponseMessage = ai_response;
                setResponse(generatedResponseMessage);
                setResponseMessages((prevResponseMessages) => [...prevResponseMessages, generatedResponseMessage]);


                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].response = generatedResponseMessage;
                    return updatedMessages;
                });


                if (!hasMessages) {
                    localStorage.setItem('chatbox_id', response.data.data.chatbox_id);
                }


                localStorage.setItem('messages', JSON.stringify(newMessages));
                setInputMessage('');
                setCleared(false)
                setHasMessages(true);

            } catch (error) {
                console.log("error", error)
                setMessages((prevMessages) => [...prevMessages, newMessages]);
                setResponse("");
                setResponseMessages((prevResponseMessages) => [...prevResponseMessages, ""]);

                setInputMessage('');
                setCleared(false);
                setHasMessages(true);
            }

        }

        const msgOuterDiv = document.getElementById("msg_outer");
        const lastDiv = msgOuterDiv?.lastElementChild;
        console.log("divetofocus", lastDiv)
        lastDiv.focus();
        lastDiv.scrollIntoView({ behavior: "smooth", block: "start", scrollOffset: 50 });
    }

    // <==============================================================function for clear messages================>


    const handleClear = () => {
        // setFirst_name(location.state.name)
        // setUser_id(location.state._id)
        setMessages([]);
        setResponse([]);
        setResponseMessages([]);
        setToken('');
        setCleared(true);
        setHasMessages(false);
        localStorage.removeItem('chatbox_id')
        localStorage.removeItem("messages")
        localStorage.removeItem(`messages${token}`);
        localStorage.removeItem(`response${token}`);
    }



    useEffect(() => {
        if (messages.length > 0) {
            setHasMessages(true);
            // setChatbox_id(chatbox_id)
            localStorage.getItem('chatbox_id')
        } else {
            setHasMessages(false);
        }


    }, [messages])
    // <====================================function for toggle========================================================>
    const handleToggle = () => {
        setToggle(prevState => !prevState)
    }
    // <=================================function for add class==========================================>
    const handleaddClass = () => {
        setAddClass(true)
    }

    //  <============================================================================> 


    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("login_detail")
        localStorage.removeItem("username")
        localStorage.removeItem("userId")

        navigate('/login')
    }







    return (
        <>

            <div className={`chat_outer ${addClass ? "chat_outer_new" : ""}`}>

                <div className="header_outer" >
                    <div className="toggle_side">
                        <a href="#" id="toggle_icon" onClick={handleToggle}>
                            <svg width="37" height="41" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.16667 30.75C5.72987 30.75 5.36346 30.586 5.06746 30.258C4.77146 29.93 4.62398 29.5246 4.62501 29.0417C4.62501 28.5576 4.77301 28.1516 5.06901 27.8236C5.36501 27.4956 5.73089 27.3322 6.16667 27.3333H30.8333C31.2701 27.3333 31.6365 27.4973 31.9325 27.8253C32.2285 28.1533 32.376 28.5588 32.375 29.0417C32.375 29.5257 32.227 29.9317 31.931 30.2597C31.635 30.5877 31.2691 30.7511 30.8333 30.75H6.16667ZM6.16667 22.2083C5.72987 22.2083 5.36346 22.0443 5.06746 21.7163C4.77146 21.3883 4.62398 20.9829 4.62501 20.5C4.62501 20.016 4.77301 19.61 5.06901 19.282C5.36501 18.954 5.73089 18.7905 6.16667 18.7917H30.8333C31.2701 18.7917 31.6365 18.9557 31.9325 19.2837C32.2285 19.6117 32.376 20.0171 32.375 20.5C32.375 20.984 32.227 21.39 31.931 21.718C31.635 22.046 31.2691 22.2095 30.8333 22.2083H6.16667ZM6.16667 13.6667C5.72987 13.6667 5.36346 13.5027 5.06746 13.1747C4.77146 12.8467 4.62398 12.4412 4.62501 11.9583C4.62501 11.4743 4.77301 11.0683 5.06901 10.7403C5.36501 10.4123 5.73089 10.2489 6.16667 10.25H30.8333C31.2701 10.25 31.6365 10.414 31.9325 10.742C32.2285 11.07 32.376 11.4755 32.375 11.9583C32.375 12.4424 32.227 12.8484 31.931 13.1764C31.635 13.5044 31.2691 13.6678 30.8333 13.6667H6.16667Z" fill="#4F4F4F" />
                            </svg>
                        </a>
                        <span className="title_name">Chatbot</span>
                        <span className="title_tag">Experiment</span>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-primary " type="button" data-toggle="dropdown">
                            <div className="log_name_side"><span className="user_name">{userName?.charAt(0).toUpperCase()}</span></div>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#" onClick={handleLogout}>LogOut</a></li>
                            {/* <li><GoogleLogout
                                  clientId={clientId}
                                  buttonText='Logout'
                                  onLogoutSuccess={handleLogout}
                                 >
                                </GoogleLogout></li> */}
                        </ul>
                    </div>
                </div>


                <div className="chat_inner">
                    <div className={`side_menu ${toggle ? 'chat-toggle' : ''}`}>
                        <Side_menu handleClear={handleClear} hasMessages={hasMessages} handleaddClass={handleaddClass} setAddClass={setAddClass} setToggle={setToggle} />
                    </div>

                    <div className={`chat_box ${toggle ? 'menu-toggle' : ''}`}>
                        <div className='main_chatbox'>
                            <div className="chat_box_inner">


                                <div className="msg_outer" id="msg_outer" style={{ height: `${windowHeight}px`, overflowY: messages.length > 0 ? 'scroll' : 'none', maxHeight: `${originalheight}px` }} >
                                    {!messages.length > 0 && !cleared > 0 ? <div className="msg_lsitings">
                                        <div className="smile_pic"><img src={smile} alt="" /></div>
                                        <div className="inside_chat">

                                            <p> I’m Chatbot, your creative and helpful collaborator. I have limitations and won’t always get it right, but your feedback will help me improve. </p>

                                            <p>Not sure where to start? You can try: </p>
                                            <p className="blue_label">Outline my blog post about summer mocktail recipes </p>
                                            <p className="blue_label">Draft a packing list for my weekend fishing and camping trip </p>
                                            <p className="blue_label">I want to write a novel. How can I get started? </p>

                                            {/* {messages && messages?.map((msg, index) => (
                                            <div key={index}>
                                                <div className='user_message'> <p><span className="user_name">B</span> {msg.message}</p>
                                                </div>

                                                <div className='ai_response'><p><img src={smile} alt="" />{msg.response && <span>{msg.response}</span>}</p></div>

                                            </div>
                                        ))}

                                        {cleared && (
                                            <div>
                                                <p>{getRandomMessage()}</p>
                                            </div>
                                        )} */}


                                        </div>
                                    </div> : ""}

                                    <div className='chat-message'>
                                        {messages && messages?.map((msg, index) => (
                                            <div key={index}>
                                                <div className='user_message'> <p><span className="user_name">{userName?.charAt(0).toUpperCase()}</span> {msg.message}</p>
                                                </div>

                                                {cleared ? "" : <div className='ai_response'><p><img src={smile} alt="" />{msg.response && <span>{msg.response}</span>}</p></div>}

                                            </div>
                                        ))}
                                    </div>
                                    <div className='random-message'>
                                        {cleared && (
                                            <div>
                                                <div className='random_image'>
                                                    <img src={neww} alt='' />
                                                </div>
                                                <p>"Chatbot is still in its experimental phase. Chatting with it and rating its response will help improve the experience."</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                            <div className="msg_type_outer">
                                <input type="text" placeholder="Enter a prompt here" className="form-control" value={inputMessage} onChange={handleinputChange} onKeyPress={handleKeyPress} />
                                <button className={`btn ${inputMessage ? 'btn-Class' : ''}`} type="submit" disabled={!inputMessage} onClick={handleSendClick}><svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M2.42877 25.375L27.7917 14.5L2.42877 3.625L2.41669 12.0833L20.5417 14.5L2.41669 16.9167L2.42877 25.375Z" fill="white" />
                                </svg>
                                </button>

                            </div>
                            <div className="copy_right">
                                <p>Chatbot may display inaccurate or offensive information that doesn’t represent our views.</p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Home;
