/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Modal from 'react-modal'

function Hero() {
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
  const [onModal,setModal]=useState(false);
  function handleClick(){
    setModal(true)
  }

  function onRequestClose(){
    setModal(false);
  }
  return (
    <div className=' flex justify-between'>
      <div className= ' mt-8'>
        <div>
          <button onClick={handleClick} className=' bg-white text-4xl text-gray-400 border-2 p-24 rounded-xl shadow-xl hover:bg-transparent hover:text-black' >+</button>
          <Modal
            style={customStyles}
            isOpen={onModal}
            onRequestClose={onRequestClose}
          >
            <h1>Hey Boys</h1>
          </Modal>
        </div>
      </div>
      <div className= ' text-center pt-[10rem]'>Graphs</div>
    </div>
    
  )
}

export default Hero