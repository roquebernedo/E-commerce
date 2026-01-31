// import React, { useEffect } from 'react'
import '../styles/UpdateEmailModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setChangingEmail } from '../slices/authSlice';
import axios from 'axios';
import { useState } from 'react';

const UpdateEmailModal = () => {
    const { userInfo } = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
          email: ''
    });

    console.log(formData.email)

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("entro al submit")
        const Email = {
          newEmail: formData.email
        }
        console.log(Email)
        console.log(userInfo)
        
        const { data } = await axios.put(`http://localhost:8000/api/users/changingEmail`, Email, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          }
        })
        console.log("no paso")
        if(data){
          console.log(data)
          dispatch(setChangingEmail( data ))
          
        }
        
    };

    const handleChange2 = (e) => {
        e.preventDefault()
        console.log("entro")
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value}));
        console.log(formData)
    };
    
    console.log(userInfo)
    return (
      <div className='modify-frame'>
        <div className='modify-frame-main'>
          <div className='modify-title'>
            <h1>Modifica tu dirección de correo electrónico</h1>
          </div>
          <div className='current-email'>
            <div className='current-email-main'>Dirección de correo electrónico actual: {userInfo && userInfo.email}</div>
          </div>
          <div className='modify-info'>
            <div className='info-text'>
              Escribe a continuación la nueva dirección de correo electrónico con la que deseas asociar tu cuenta.
               Enviaremos un código de verificación a esa dirección.
            </div>
          </div>
          <form className='modify-form' onSubmit={submitHandler}>
              <div className='modify-form-input'>
                <div className='new-email'>Nueva dirección de correo electrónico</div>
                <input type='text' name='email' onChange={handleChange2} value={formData.email} />
              </div>
              <button type='submit'>Continuar</button>
          </form>
        </div>
      </div>
    )
}

export default UpdateEmailModal