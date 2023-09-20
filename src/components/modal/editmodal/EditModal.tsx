import React, { useState } from 'react';
import './editmodal.css'
import { env } from '../../../url';
import { toastSuccess } from '../../../utils/toast';

type ModalProps = {
    isOpen:boolean,
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void, 
    word?:string
}

const EditModal:React.FC<ModalProps> = ({ isOpen, onClose, word }) => {
  const [newValue, setNewValue] = useState('')

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (value.length > 1) {
        setNewValue(value)
      }
  }

  const handleClick = async (event:React.MouseEvent<HTMLButtonElement>) => {
    const url = `${env}/updateWord`
   
    const request = await fetch(url, {
      method:'PUT', 
      body: JSON.stringify({
        word,
        toBeModified:newValue
      }), 
      headers:{
        "Content-Type":"application/json"
      },
      credentials:'include'
    })

     const response = await request.json()
     if (response.message) {
       toastSuccess(response.message)
     }
    
    onClose(event)
  }
  
  return isOpen ? (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <div className='editModal' style={{
        padding: '20px',
        borderRadius: '10px'
      }}>
        <div className="modalTitle">Mode Édition</div>
        <div className="modalWord">
             Vous souhaitez modifier le mot <span className='wordRappel'>{word}</span>
        </div>

        <input type="search" onChange={handleChange}  placeholder={word} name="" id="" />
        <div className="action-confirm">
          <button className='editSuccess' onClick={handleClick}>Confirmer</button>
          <button className='editCancel' onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  ) : null
}

export default EditModal;
