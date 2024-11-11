import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { updatingUserInfo } from '../slices/authSlice';

import '../styles/Profile.scss'

const Details = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(true)
    //const findAddress = userInfo.address.address.find(item => item.isDefault === true)

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
        if(address) setAddress(userInfo && userInfo.address.address.find(item => item.isDefault === true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, userInfo.setName, userInfo.setEmail])
    //console.log(userInfo.address.address.find(item => item.isDefault === true))
      // const logoutHanlder =  () => {
      //   window.localStorage.clear()
      //   window.location.reload();
      // }
    
      const submitHandler = async (e) => {
        e.preventDefault();
        console.log("hola")
        if(password !== confirmPassword){
          toast.error('Passwords do not match')
        }else{
          console.log("entro aca")
          try{
            console.log("si")
            //userService.setToken(userInfo.token)
            dispatch(updatingUserInfo({
                name,
                email,
                password,
                
            }))
            console.log("no llega aca")
            //console.log(res)
            //dispatch(setCredentials({...res}))
            toast.success('Profile updated')
          }catch(err){
            toast.error(err?.data?.message || err.error)
          }
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
              <div className='div-input'>Name</div>
              <input
                className='input-profile'
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='log-profile'>
              <div className='div-input'>Email Address</div>
              <input
                className='input-profile'
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='log-profile'>
              <div className='div-input'>Direccion</div>
              <input
                className='input-profile'
                type='text'
                placeholder='Direccion'
                value={`${address.street_name} ${address.street_number}, ${address.city}`}
                onChange={(e) => console.log("hola")}
              />
            </div>

            <div className='log-profile'>
              <div className='div-input'>Password</div>
              <input
                className='input-profile'
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='log-profile'>
              <div className='div-input'>Confirm Password</div>
              <input
                className='input-profile'
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

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