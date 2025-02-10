import React, { useState } from 'react'
import '../styles/Password.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const Password = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { userInfo } = useSelector((state) => state.authReducer)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("hola")
        console.log(oldPassword)
        console.log(newPassword)
        const userInfoDetails = {
          oldPassword,
          newPassword
        };

        if(newPassword !== confirmPassword){
            toast.error('Passwords do not match')
        }else{
            //const user_data = await productService.changePassword(userInfoDetails)
            const { data } = await axios.put(`https://e-commerce-f1fr.onrender.com/api/users/profile`, userInfoDetails, {
                headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
                }
            })
            if(data){
                console.log(data)
            }
            setOldPassword('')
            setOldPassword('')
            setConfirmPassword('')
            navigate("/profile/details")
        }
    };

    return (
        <div className='main-container'>
            <div className='secondary-container'>
                <div className='title'>Cambiar contraseña</div>
                <form onSubmit={submitHandler} className='form-password'>
                    <div className='text-put-in'>Ingresa tu actual contraseña</div>
                    <span className='input-with-button'>
                        <input type='password' placeholder='Contraseña' name='oldPassword' className='input-two-icons' value={oldPassword} onChange={(e) => setOldPassword(e.target.value) } />
                    </span>
                    <div className='text-put-in'>Ingresa tu nueva contraseña</div>
                    <span className='input-with-button'>
                        <input type='password' placeholder='Nueva contraseña' name='password' className='input-two-icons' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </span>
                    <span className='input-with-button'>
                        <input type='password' placeholder='Repite la contraseña' name='repPassword' className='input-two-icons' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </span>
                    <button className='button-submit' type='submit'>Cambiar contraseña</button>
                </form>
                <span className='regresar-button' onClick={() => navigate("/profile/details")}>
                    <div className='div-after-regresar'>
                        <span className='button-container'>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                            <span>regresar</span>
                        </span>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default Password
