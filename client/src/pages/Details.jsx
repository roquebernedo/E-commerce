import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { updateInfo } from '../slices/authSlice';
// import productService from "../services/product";

import '../styles/Profile.scss'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Details = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    // const [oldPassword, setPassword] = useState('');
    // const [newPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.authReducer)
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(true)
    // const { section } = useParams()
    // const [ render, setRender ] = useState(section)
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const handleClick = (ref) => {
      ref.current.focus(); // Mueve el cursor al input
    };
    // useEffect(() => {
    //   setRender(section || "details")
    // }, [section])

    console.log(userInfo)
    const addressTrue = userInfo ? userInfo.address && userInfo.address.address.find(item => item.isDefault === true) : ''
    console.log(userInfo)
    useEffect(() => {
      if(userInfo){
        setName(userInfo.name)
        setUsername(userInfo.username)
        setEmail(userInfo.email)
        if(address) setAddress(userInfo && userInfo.address.address.find(item => item.isDefault === true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(address)
      }
        
    }, [address, setAddress, userInfo])
    //console.log(userInfo.address.address.find(item => item.isDefault === true))
      // const logoutHanlder =  () => {
      //   window.localStorage.clear()
      //   window.location.reload();
      // }
    console.log(addressTrue)
      const submitHandler = async (e) => {
        e.preventDefault();
        console.log("hola")
        console.log(name)
        console.log(username)
        const userInfoDetails = {
          // name,
          // email,
          name,
          username
        };
        console.log(userInfo)
        //const user_data = await productService.changePassword(userInfoDetails)
        const { data } = await axios.put(`https://e-commerce-f1fr.onrender.com/api/users/update`, userInfoDetails, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          }
        })

        
        if(data){
          console.log(data)
          dispatch(updateInfo(userInfoDetails))
        }
       
      };
  return (
    <>
        <div className='profile-details'>
          <div className='details'>Detalles</div>
        </div>
        <form className='form-profile' onSubmit={submitHandler}>
          <div className='profile-details-main'>
            <div className='log-profile'>
              <div className='div-input'>Nombre</div>
              <div className='box-input-pen' onClick={() => handleClick(inputRef)}>
                <input
                  ref={inputRef}
                  className='name-user'
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className='profile-edit-svg'>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                </div>
                
              </div>
              
            </div>
            <div className='log-profile'>
              <div className='div-input'>Usuario</div>
              <div className='box-input-pen' onClick={() => handleClick(inputRef2)} >
                <input
                  ref={inputRef2}
                  className='name-user'
                  type='text'
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className='profile-edit-svg'>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                </div>
              </div>
              
            </div>

            <div className='log-profile'>
              <div className='div-input'>Email</div>
              <div className='name-user'>{email}</div>
            </div>

            <div className='log-profile'>
              <div className='div-input'>Direccion</div>
              <div className='box-input-pen' onClick={() => navigate("/profile/address")}>
                
                <div className='name-user'>{addressTrue ? `${addressTrue.street_name} ${addressTrue.street_number}, ${addressTrue.city}` : 'Coloca una direccion predeterminada'}</div>
                <div className='profile-edit-svg'>
                  <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000000"><path d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </div>
              </div>
            </div>

            <div className='log-profile'>
              <div className='div-input'>Seguridad</div>
              {/* <input
                className='input-profile'
                type='password'
                placeholder='Enter password'
                value={oldPassword}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              <div onClick={() => navigate("/profile/password")} className='password-change'>Cambiar contraseña</div>
            </div>

            {/* <div className='log-profile'>
              <div className='div-input'>Confirm Password</div>
              <input
                className='input-profile'
                type='password'
                placeholder='Confirm password'
                value={newPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className='log-profile'>
              <div className='div-input'>Password</div>
              <input
                className='input-profile'
                type='password'
                placeholder='Enter password'
                value={oldPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}

            { isLoading && <Loader />}

            <button className='update log'>
              Update
            </button>
          </div>
        </form>
    </>
  )
}

export default Details