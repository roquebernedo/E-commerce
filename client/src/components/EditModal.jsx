import React, { useEffect } from 'react'
import '../styles/Modal.scss'

const EditModal = ({ closeModal, modalDisplay, closeOnOutsideClick, setFormData, formData, handle, key, handleOutsideClick, submit, address, handleChange }) => {
    
    useEffect(() => {
        if (address && setFormData) {
            setFormData({
                street_name: address.street_name || '',
                street_number: address.street_number || '',
                city: address.city || '',
                zip_code: address.zip_code || '',
                state: address.state || ''
            });
        }
    }, [address, setFormData]);

  return (
    <form onSubmit={submit}>
        <div className={modalDisplay ? 'open-modal' : 'modal'} onClick={closeOnOutsideClick} >
            <div className="modal-content">
                <div className='add-direction'>{address ? 'Editar direccion' : 'Agregar direccion'}</div>
                <div className='buttons' key={address ? address._id : key}>
                    <input type='text' placeholder='Calle' name='street_name' onChange={handleChange} value={address && formData.street_name}/>
                    <input type='number' placeholder='Altura' name='street_number' onChange={handleChange} value={address && formData.street_number} />
                    <input type='text' placeholder='Ciudad' name='city' onChange={handleChange} value={address && formData.city} />
                    <input type='number' placeholder='Codigo Postal' name='zip_code' onChange={handleChange} value={address && formData.zip_code} />
                    <input type='text' placeholder='Provincia' name='state' onChange={handleChange} value={address && formData.state} />
                </div>
                <div className='buttons-add-pay'>
                    <button type='submit'>Actualizar</button>
                    <button type='button' onClick={closeOnOutsideClick}>Cancelar</button>
                </div>
            </div>
        </div>
        
    </form>
  )
}

export default EditModal