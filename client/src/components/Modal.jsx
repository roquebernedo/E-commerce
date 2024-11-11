import React from 'react'
import '../styles/Modal.scss'

const Modal = ({ closeModal, modalDisplay, closeOnOutsideClick, text, handle, key, handleOutsideClick, submit }) => {

  return (
    <form onSubmit={submit}>
        <div className={modalDisplay ? 'open-modal' : 'modal'} onClick={closeOnOutsideClick}>
            <div className="modal-content">
                <div className='add-direction'>Agregar direccion</div>
                <div className='buttons' key={key}>
                    <input type='text' placeholder='Calle' name='street_name' onChange={handle} />
                    <input type='number' placeholder='Altura' name='street_number' onChange={handle} />
                    <input type='text' placeholder='Ciudad' name='city' onChange={handle} />
                    <input type='number' placeholder='Codigo Postal' name='zip_code' onChange={handle} />
                    <input type='text' placeholder='Provincia' name='state' onChange={handle} />
                </div>
                <div className='buttons-add-pay'>
                    <button type='submit'>Agregar</button>
                    <button type='button' onClick={closeOnOutsideClick}>Cancelar</button>
                </div>
            </div>
        </div>
        
    </form>
  )
}

export default Modal