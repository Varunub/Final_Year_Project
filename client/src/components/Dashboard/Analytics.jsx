/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Modal from 'react-modal'
function Analytics() {
  const [modalOpen,setModal]=useState(false)

  function handleClick(){
    setModal(true)
  }
  function handleClose(){
    setModal(false)
  }
  return (
    <div>
      <button onClick={handleClick}>Press</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleClose}
      >
        <box>
          <h1>Sample</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dicta eaque ea totam cumque, laudantium inventore dolorem error quam ipsa aspernatur nobis est animi debitis aut illo voluptates quod quo!</p>
        </box>
      </Modal>
    </div>
  )
}

export default Analytics