import React, { useEffect } from 'react'
import '../styles/UpdateInfoModal.scss'

const UpdateInfoModal = ({ closeModal, modalDisplay, closeOnOutsideClick, setFormData, formData, handle, key, submit, address, handleChange, userInfo }) => {
    useEffect(() => {
            if (userInfo && setFormData) {
                console.log(userInfo)
                setFormData({   
                    [!userInfo.isGoogleUser ? 'name' : 'firstName']: !userInfo.isGoogleUser ? userInfo.name : userInfo.firstName || '' ,
                    username: userInfo.username || '',
                });
            }
    }, [userInfo, setFormData]);
    console.log(formData)
    console.log(formData.firstName)
    console.log(userInfo)
    return (
        <form onSubmit={submit} className={modalDisplay ? 'open-modal' : 'modal'}>
            <div className={modalDisplay ? 'open-modal' : 'modal'} onClick={closeOnOutsideClick}>
                <div className="modal-content">
                    <div className='add-direction'>Editar Informacion</div>
                    <div className='buttons' key={key}>
                        <input type='text' placeholder='name' name={!userInfo.isGoogleUser ? 'name' : 'firstName'} onChange={handleChange} value={userInfo && !userInfo.isGoogleUser ? formData.name : formData.firstName}/>
                        <input type='text' placeholder='username' name='username' onChange={handleChange} value={userInfo && formData.username} />
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