import React,{useState} from 'react';
import reset_chat from '../images/reset_chat.png';
import faq_icon from '../images/faq_icon.png';
import help_support from '../images/help_support.png';
import BaseUrl from '../BaseUrl';
import Reset_popUp from './Reset_popUp';
import Help from '../images/Help.svg';
import Reset from '../images/Reset.svg';
import FAQ from '../images/FAQ.svg';
const Side_menu = (props) => {

  const [resetPopUp, setResetPopUp] = useState('');
  const {hasMessages ,handleClear,setAddClass,handleaddClass} =props;



  const handleOpenResetPopup = () =>{
    if(hasMessages){
      setResetPopUp(true);
      }
      handleaddClass();
 }

const handleCleardata=()=>{
  handleClear();
  setAddClass(false);
}
  return (
    <>
    <div className='reset_popup_menu'>
     <Reset_popUp resetPopUp={resetPopUp} setResetPopUp={setResetPopUp} handleCleardata={handleCleardata} setToggle={props.setToggle} setAddClass={setAddClass}/>
       <div className="side_menu">
                        <ul>
                            <li className={hasMessages ? '' : 'fadereset'} onClick={handleOpenResetPopup}  disabled={true}><a href="#" > <span><img src={Reset} /></span>Reset chat</a></li>
                            <li><a href="#"> <span><img src={FAQ} /></span>FAQ</a></li>
                            <li><a href="#"> <span><img src={Help} /></span>Help &amp; support</a></li>
                        </ul>
                    </div>
                    </div>
    </>
  )
}

export default Side_menu;
