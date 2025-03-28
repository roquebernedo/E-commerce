import React, { useEffect } from 'react'
import '../styles/UpdateInfoModal.scss'

const UpdateInfoModal = ({ closeModal, modalDisplay, closeOnOutsideClick, setFormData, formData, handle, key, submit, address, handleChange, userInfo }) => {
    useEffect(() => {
            if (userInfo && setFormData) {
                setFormData({
                    name: userInfo.name || '',
                    username: userInfo.username || '',
                });
            }
    }, [userInfo, setFormData]);
    
    return (
        <form onSubmit={submit} className={modalDisplay ? 'open-modal' : 'modal'}>
            <div className={modalDisplay ? 'open-modal' : 'modal'} onClick={closeOnOutsideClick}>
                <div className="modal-content">
                    <div className='add-direction'>Editar Informacion</div>
                    <div className='buttons' key={key}>
                        <input type='text' placeholder='Calle' name='name' onChange={handleChange} value={userInfo && formData.name}/>
                        <input type='text' placeholder='Provincia' name='username' onChange={handleChange} value={userInfo && formData.username} />
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

export default UpdateInfoModal