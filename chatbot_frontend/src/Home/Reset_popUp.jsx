import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };



const Reset_popUp = (props) => {

    let subtitle;
    function afterOpenModal() {
        subtitle.style.color = '#f00';
      }

      const handleClosePopup=()=>{
        props.setResetPopUp(false)
        props.setAddClass(false)
      }

      const handleClear=()=>{
       props.handleCleardata()
       props.setResetPopUp(false)
       props.setToggle(false);
      
      }

  return (
    <>
    <div className='reset_popup'>
       <ReactModal className="popup_outer send_message_popup" 
    isOpen={props.resetPopUp}
    onAfterOpen={afterOpenModal}
    onRequestClose={handleClosePopup}
    style={customStyles}
    contentLabel="Example Modal"
    >

        <div className='reset_chat'>
            <div className='reset'>
                <div className='popup-heading'>
                <h2>Reset Chat ?</h2>
                </div>
                <p>Your current chat session will not be saved and will get removed</p>
                <div className='reset-chat-button'>
        <button type='submit' className='btn btn-primary' onClick={handleClosePopup}>Cancel</button>
        <button type='button' className='btn btn-default' onClick={handleClear}>Reset</button>
        </div>
        </div>
        </div>
    </ReactModal>
    </div>
    </>
  )
}

export default Reset_popUp;
