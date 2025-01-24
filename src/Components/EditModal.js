import React from 'react'
import './Modal.css'

const EditModal = ({ isOpen, storyText, onClose, onSave, setStoryText}) => {
    if (!isOpen) return null;
  return (
    <div className='modal'>
        {console.log("isOpen",isOpen)}
      <div className='modal-content'>
        <h3>Edit Story</h3>
        <input
            type='text'
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder='Enter new Story text'
        />
        <button className='save-btn' onClick={onSave}>Save</button>
        <button className='cancel-btn' onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default EditModal
