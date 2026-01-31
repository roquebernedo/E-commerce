// import React, { useEffect } from 'react'
import '../styles/UpdateEmailModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addingNewPhone, setChangingEmail, updateInfo } from '../slices/authSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateName = () => {
    const { userInfo } = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        [!userInfo.isGoogleUser ? 'name' : 'firstName']: ''
    });
    const navigate = useNavigate()
    console.log(userInfo.name)
    useEffect(() => {
                if (userInfo && setFormData) {
                    console.log(userInfo)
                    setFormData({   
                        [!userInfo.isGoogleUser ? 'name' : 'firstName']: !userInfo.isGoogleUser ? userInfo.name : userInfo.firstName || '' ,
                        // username: userInfo.username || '',
                    });
                }
    }, [userInfo, setFormData]);

    console.log(formData.newPhone)

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     console.log("entro al submit")  
    //     const addPhone = {
    //       newPhone: formData.newPhone
    //     }
    //     console.log(addPhone)
    //     console.log(userInfo)
        
    //     const { data } = await axios.put(`http://localhost:8000/api/users/addPhoneNumber`, addPhone, {
    //       headers: {
    //         Authorization: `Bearer ${userInfo.token}`,
    //         'Content-Type': 'application/json',
    //       }
    //     })

    //     console.log("no paso")
    //     if(data){
    //       console.log(data)
    //       dispatch(addingNewPhone(data))
    //     }

    //     navigate("/profile/details")
    // };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("hola")
    
        const userInfoDetailsGoogle = {
          firstName: formData.firstName,
        }
        const userInfoDetails = {
          name: formData.name,
        };
        console.log(userInfo)
        console.log(userInfoDetailsGoogle)
        console.log(userInfoDetails)
        //const user_data = await productService.changePassword(userInfoDetails)
        const { data } = await axios.put(`http://localhost:8000/api/users/update`, !userInfo.isGoogleUser ? userInfoDetails : userInfoDetailsGoogle, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          }
        })

        
        if(data){
          console.log(data)
          if(userInfo.isGoogleUser){
            dispatch(updateInfo({ userInfoDetailsGoogle, isGoogleUser: true }))
          }else{
            dispatch(updateInfo(userInfoDetails))
          }
        }
       
      };

    const handleChange2 = (e) => {
        e.preventDefault()
        console.log("entro")
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value}));
        console.log(formData)
    };

    const cancelButton = (e) => {
        e.preventDefault()
        console.log("boton cancelar")
        navigate("/profile/details")
    }
    
    console.log(userInfo)
    return (
        <div className='modify-frame'>
            <div className='modify-frame-main'>
            <div className='modify-title'>
                <h1>{userInfo.phoneNumber ? 'Editar el numero de telefono movil' : 'Agregar numero de telefono movil'}</h1>
            </div>
            <div className='current-email'>
                <div className='current-email-main'>{userInfo.phoneNumber ?  `Numero de telefono actual: ${userInfo.phoneNumber}` : "Aun no cuentas con un numero de telefono"}</div>
            </div>
            <div className='modify-info'>
                <div className='info-text'>
                Escribe a continuación el nuevo numero de telefono con la que deseas asociar tu cuenta.
                </div>
            </div>
            <form className='modify-form' onSubmit={submitHandler}>
                <div className='modify-form-input'>
                    <div className='new-email'>Cambiar mi nombre</div>
                    {/* <input type='text' name='newPhone' onChange={handleChange2} value={formData.newPhone} /> */}
                    <input type='text' placeholder='name' name={!userInfo.isGoogleUser ? 'name' : 'firstName'} onChange={handleChange2} value={userInfo && !userInfo.isGoogleUser ? formData.name : formData.firstName}/>
                </div>
                <button type='submit'>Continuar</button>
                <button className='cancel' type='button' onClick={cancelButton}>Cancelar</button>
            </form>
                {/* <form onSubmit={submit} className={modalDisplay ? 'open-modal' : 'modal'}>
                    <div className={modalDisplay ? 'open-modal' : 'modal'} onClick={closeOnOutsideClick}>
                        <div className="modal-content">
                            <div className='add-direction'>Editar Informacion</div>
                            <div className='buttons' key={key}>
                                <input type='text' placeholder='name' name={!userInfo.isGoogleUser ? 'name' : 'firstName'} onChange={handleChange} value={userInfo && !userInfo.isGoogleUser ? formData.name : formData.firstName}/>
                                <input type='text' placeholder='username' name='username' onChange={handleChange} value={userInfo && formData.username} />
                                {/* <input type='text' placeholder='email' onChange={handleChange} /> */}
                            {/* </div>
                            <div className='buttons-add-pay'>
                                <button type='submit'>Actualizar</button>
                                <button type='button' onClick={closeOnOutsideClick}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>  */}
            </div>
        </div>
    )
}

export default UpdateName