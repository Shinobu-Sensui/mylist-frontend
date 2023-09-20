import React from 'react';
import './deletemodal.css'
import { env } from '../../../url';
import { toastError, toastSuccess } from '../../../utils/toast';


type ModalProps = {
    isOpen:boolean,
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void, 
    word?:string
}

const DeleteModal:React.FC<ModalProps> = ({ isOpen, onClose, word }) => {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await fetch(`${env}/deleteitems/${word}`, {
        method: 'DELETE',
        credentials:'include'
      });
      
      console.log(response)
      if (!response.ok && response.status !== 403) {
        throw new Error(`Server responded with status: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data)
      onClose(event);
  
      if (data.error) {
        toastError(data.error);
      } else {
        toastSuccess(`Le mot ${data.deleted} a bien été supprimé.`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toastError(`Un problème est survenu: ${error.message}`);
      } else {
        console.error(error);
        toastError(`Un problème inattendu est survenu`);
      }
    }
    
  };
  

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
      <div className='deleteModal' style={{
        padding: '20px',
        borderRadius: '10px'
      }}>
        <div className="deleteModalTitle">Mode Suppression</div>
        <div className="deleteModalWord">
             Vous souhaitez supprimer le mot <span className='deleteWordRappel'>{word}</span>
        </div>
        <div className="action-confirm">
          <button className='deleteSuccess' onClick={handleClick}>Confirmer</button>
          <button className='deleteCancel' onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  ) : null
  };

export default DeleteModal;
