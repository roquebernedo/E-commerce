import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { emailVerified } from '../slices/authSlice';
import '../styles/VerifyEmail.scss'
// import { css } from '@emotion/react';
// import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const RecoverPassword = () => {
    console.log("holaaaaa")
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { verifyToken } = useParams();
    const { userInfo } = useSelector((state) => state.authReducer)
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch()
    console.log(userInfo)
    console.log(verifyToken)

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("hola")
        console.log(newPassword)
        const userInfoDetails = {
          newPassword
        };

        if(newPassword !== confirmPassword){
            toast.error('Passwords do not match')
        }else{
            //const user_data = await productService.changePassword(userInfoDetails)
            console.log("ti")
            const { data } = await axios.put(`https://e-commerce-f1fr.onrender.com/api/users/recoverPassword`, userInfoDetails, {
                headers: {
                Authorization: `Bearer ${verifyToken}`,
                'Content-Type': 'application/json',
                }
            })
            if(data){
                console.log(data)
            }
            // setOldPassword('')
            // setOldPassword('')
            setConfirmPassword('')
            navigate("/")
        }
    };
    return (
        <div className='main-container'>
            <div className='secondary-container'>
                <div className='title'>Cambiar contraseña</div>
                <form onSubmit={submitHandler} className='form-password'>
                    <div className='text-put-in'>Ingresa tu nueva contraseña</div>
                    <span className='input-with-button'>
                        <input type='password' placeholder='Nueva contraseña' name='password' className='input-two-icons' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </span>
                    <span className='input-with-button'>
                        <input type='password' placeholder='Repite la contraseña' name='repPassword' className='input-two-icons' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </span>
                    <button className='button-submit' type='submit'>Cambiar contraseña</button>
                </form>
                <span className='regresar-button' onClick={() => navigate("/")}>
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

export default RecoverPassword