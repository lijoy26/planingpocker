import React from 'react'
import "./Modal.css"

const DeleteModal = ({isOpen,onClose,onConfirm}) => {
    if (!isOpen)
        return null;
    return (
    <div className='modal'>
      <div className='modal-content'>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this story</p>
        <button className='save-btn' onClick={onConfirm}>Delete</button>
        <button className='cancel-btn' onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteModal
