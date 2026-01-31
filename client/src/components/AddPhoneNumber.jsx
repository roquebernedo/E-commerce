// import React, { useEffect } from 'react'
import '../styles/UpdateEmailModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addingNewPhone, setChangingEmail } from '../slices/authSlice';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPhoneNumber = () => {
    const { userInfo } = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
          newPhone: ''
    });
    const navigate = useNavigate()

    console.log(formData.newPhone)

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("entro al submit")  
        const addPhone = {
          newPhone: formData.newPhone
        }
        console.log(addPhone)
        console.log(userInfo)
        
        const { data } = await axios.put(`http://localhost:8000/api/users/addPhoneNumber`, addPhone, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          }
        })

        console.log("no paso")
        if(data){
          console.log(data)
          dispatch(addingNewPhone(data))
        }

        navigate("/profile/details")
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
                <div className='new-email'>Nuevo numero de telefono</div>
                <input type='text' name='newPhone' onChange={handleChange2} value={formData.newPhone} />
              </div>
              <button type='submit'>Continuar</button>
              <button className='cancel' type='button' onClick={cancelButton}>Cancelar</button>
          </form>
        </div>
      </div>
    )
}

export default AddPhoneNumber