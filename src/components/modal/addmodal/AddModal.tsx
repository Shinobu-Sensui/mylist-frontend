import React, { useState } from 'react';
import './addmodal.css'
import { fetchData } from '../../../utils/FetchApi';
import { env } from '../../../url';
import { userAccountStore } from '../../../store/store';
import { toastSuccess, toastError } from '../../../utils/toast';

type ModalProps = {
    isOpen:boolean,
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void, 
    word?:string
}


const AddModal:React.FC<ModalProps> = ({ isOpen, onClose, word }) : any=>  { 
  const [addModalForm, setAddModalForm] = useState({})
  const { selectEditCategory } = userAccountStore()

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>, index:number) : void => {
    const { value } = event.target
    if (value.length < 2 || value.length > 30) return  
    setAddModalForm( { ...addModalForm, [index]: value } )
  }

  const handleClick = async (event:React.MouseEvent<HTMLButtonElement>) => {
    const values:string[] = Object.values(addModalForm)
    if (values.length) {
      const response =  await fetchData(`${env}/additems`, 'POST', {
        items: values, 
        category: selectEditCategory
      })

      setAddModalForm({})
      onClose(event)
      console.log(response)
      if (!response) {
         toastError(`Un problème est survenu.`)
      } else if (response.code === 403){
          toastError(response.error.error)
      } else {
          if (response.success.length > 0) {
             toastSuccess(response.success.join('\n') + ".")
          }  

          if (response.error.length > 0) {
             toastError(response.error.join('\n') + '.')
          } 
      }
    }
  }

  return isOpen ? (
    <div className='parentAddModal' style={{
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
      <div className='addModal' style={{
        padding: '20px',
        borderRadius: '10px'
      }}>
        <div className="addModalTitle">Mode Implémentation 🖋️</div>
        <div className="addModalWord">
         Vous souhaitez ajouter des mots
        </div>
        <div className="addModalInputs">
        {
            
              [...Array(10)].map((_, index:number) => (
              <div className='parentAddModalInput' key={index}>
                <input onChange={(e) => handleChange(e, index)}  type="addModalsearch"  placeholder={word} name="" id="" />
              </div>
          ))
        }
          </div>
        
        <div className="action-confirm">
          <button onClick={handleClick} className='addModalSuccess'>Confirmer</button>
          <button className='addModalCancel' onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  ) : null
};

export default AddModal;
