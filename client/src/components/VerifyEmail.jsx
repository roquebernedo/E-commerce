import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emailVerified } from '../slices/authSlice';
import '../styles/VerifyEmail.scss'
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const VerifyEmail = () => {
    console.log("holaaaaa")
    const navigate = useNavigate()
    const { verifyToken } = useParams();
    const [response, setResponse] = useState(null);   
    const { userInfo } = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    console.log(userInfo)
        console.log(verifyToken)
    useEffect(() => {
        (async () => {
        try {
            console.log("aca esta el data")
            const { data } = await axios.put("https://e-commerce-f1fr.onrender.com/api/users/verifyEmail", null, {
            headers: {
                Authorization: `Bearer ${verifyToken}`,
            },
            });
            console.log(data)   
            setResponse(data.message);
            if(userInfo){
                dispatch(emailVerified(data.message))
            }
        } catch (error) {
            console.log(error)
            console.log("entra")
            setResponse(error.response.data.message); //! VOLVER A VER manejo de errores
        }
        })();
        
        console.log(response)
        // eslint-disable-next-line
    }, []);
    console.log(response)
    return (
        <div className='main-verify'>
            {response   ?
                        <>
                            {userInfo 
                                ? 
                                    response
                                :   
                                    <>
                                        {response}
                                        <button onClick={() => navigate("/login")} className='update log'>
                                            Ir a iniciar sesion
                                        </button>
                                    </>
                            }
                        </>
                        :
                        <div className='loader'>
                            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
                        </div> 
            }
            
        </div>
    )
}

export default VerifyEmail