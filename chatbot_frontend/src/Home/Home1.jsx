import React, { useState, useEffect } from 'react';
import Side_menu from './Side_menu';
import smile from '../images/smile.png';


const Home = () => {

    const [inputMessage, setInputMessage] = useState("");
    const [token, setToken] = useState('');
    const [lengthofdiv, setLenghtofDiv] = useState()
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
    const [responseMessages, setResponseMessages] = useState([]);
    const [windowHeight, setwindowHeight] = useState();
    const [toggle, setToggle] = useState(true);


    // .childNodes.length

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
        lastDiv.focus();
        lastDiv.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest", scrollOffset: "50px" });
    }, [lengthofdiv])


    useEffect(() => {
        setwindowHeight(window.innerHeight * 0.55)
    }, [window.innerHeight]);

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




    const handleSendClick = () => {
        if (inputMessage) {
            const newMessages = {
                message: inputMessage,
                response: '',
            };
            //   const newMessages = { ...messages };
            //   if (!newMessages[token]) {
            //     newMessages[token] = [];
            //   }
            //   newMessages[token].push(message);
            setMessages((prevMessages) => [...prevMessages, newMessages]);

            const generatedResponseMessage = `Hello from the server! You said: ${inputMessage}`;
            setResponse(generatedResponseMessage);
            setResponseMessages((prevResponseMessages) => [...prevResponseMessages, generatedResponseMessage]);


            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].response = generatedResponseMessage;
                return updatedMessages;
            });

            localStorage.setItem('messages', JSON.stringify(newMessages));
            setInputMessage('');
        }

        const msgOuterDiv = document.getElementById("msg_outer");
        const lastDiv = msgOuterDiv?.lastElementChild;
        console.log("divetofocus", lastDiv)
        lastDiv.focus();
        lastDiv.scrollIntoView({ behavior: "smooth", block: "nearest", scrollOffset: 50 });
    }



    const handleClear = () => {
        setMessages({});
        setResponse('');
        setResponseMessages([]);
        setToken('');
        localStorage.removeItem("messages")
        localStorage.removeItem(`messages${token}`);
        localStorage.removeItem(`response${token}`);
    }

 const handleToggle = ()=>{
    setToggle(prevState => !prevState)
 }








    return (
        <>
            <div className="chat_outer">

                <div className="header_outer">
                    <div className="toggle_side">
                        <a href="#" id="toggle_icon" onClick={handleToggle}>
                            <svg width="37" height="41" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.16667 30.75C5.72987 30.75 5.36346 30.586 5.06746 30.258C4.77146 29.93 4.62398 29.5246 4.62501 29.0417C4.62501 28.5576 4.77301 28.1516 5.06901 27.8236C5.36501 27.4956 5.73089 27.3322 6.16667 27.3333H30.8333C31.2701 27.3333 31.6365 27.4973 31.9325 27.8253C32.2285 28.1533 32.376 28.5588 32.375 29.0417C32.375 29.5257 32.227 29.9317 31.931 30.2597C31.635 30.5877 31.2691 30.7511 30.8333 30.75H6.16667ZM6.16667 22.2083C5.72987 22.2083 5.36346 22.0443 5.06746 21.7163C4.77146 21.3883 4.62398 20.9829 4.62501 20.5C4.62501 20.016 4.77301 19.61 5.06901 19.282C5.36501 18.954 5.73089 18.7905 6.16667 18.7917H30.8333C31.2701 18.7917 31.6365 18.9557 31.9325 19.2837C32.2285 19.6117 32.376 20.0171 32.375 20.5C32.375 20.984 32.227 21.39 31.931 21.718C31.635 22.046 31.2691 22.2095 30.8333 22.2083H6.16667ZM6.16667 13.6667C5.72987 13.6667 5.36346 13.5027 5.06746 13.1747C4.77146 12.8467 4.62398 12.4412 4.62501 11.9583C4.62501 11.4743 4.77301 11.0683 5.06901 10.7403C5.36501 10.4123 5.73089 10.2489 6.16667 10.25H30.8333C31.2701 10.25 31.6365 10.414 31.9325 10.742C32.2285 11.07 32.376 11.4755 32.375 11.9583C32.375 12.4424 32.227 12.8484 31.931 13.1764C31.635 13.5044 31.2691 13.6678 30.8333 13.6667H6.16667Z" fill="#4F4F4F" />
                            </svg>
                        </a>
                        <span className="title_name">Chatbot</span>
                        <span className="title_tag">Experiment</span>
                    </div>
                    <div className="log_name_side"><span className="user_name">B</span></div>
                </div>


                <div className="chat_inner">
                    <div className="side_menu">
                      {toggle &&  <Side_menu />}  
                    </div>
                    <div className="chat_side">
                        <div className="chat_box">
                        {/* <div className={`msg_outer ${toggle ? 'toggle-class' : ''}`}> */}
                            <div className={`msg_outer ${toggle ? 'toggle-class' : ''}`} id="msg_outer" style={{ height: `${windowHeight}px`, overflowY: 'scroll' }} >
                                <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                <p className="blue_label">Simply dummy text of the printing and typesetting industry.</p>
                                <p className="blue_label">Simply dummy text of the printing and typesetting industry.</p>
                                <p className="blue_label">Simply dummy text of the printing and typesetting industry.</p>
                                <ol>
                                    <li>First item</li>
                                    <li>Second item</li>
                                    <li>Third item</li>
                                    <li>Fourth item</li>
                                </ol>
                                <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                <br /> <br /> <br />
                                {messages && messages.map((msg, index) => (
                                    <div key={index}>
                                        <p>Message:-{index + 1}. {msg.message}</p>
                                        <p><img src={smile}/>{msg.response && <span>{msg.response}</span>}</p>

                                    </div>
                                ))}
                                <span style={{ display: "block", marginTop: "100px" }}></span>
                            </div>
{/* </div> */}

                            <div className="msg_type_outer">
                                <input type="text" placeholder="Enter a prompt here" className="form-control" value={inputMessage} onChange={handleinputChange} onKeyPress={handleKeyPress} />
                                <button className="btn" type="submit"><svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleSendClick}>
                                    <path d="M2.42877 25.375L27.7917 14.5L2.42877 3.625L2.41669 12.0833L20.5417 14.5L2.41669 16.9167L2.42877 25.375Z" fill="white" />
                                </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="copy_right">
                    <p>Chatbot may display inaccurate or offensive information that doesn’t represent our views.</p>
                </div>
            </div>
        </>
    )
}

export default Home;
