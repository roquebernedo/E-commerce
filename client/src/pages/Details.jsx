import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { updatingUserInfo } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import '../styles/Profile.scss'

const Details = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const [updateProfile, { isLoading }] = useUpdateUserMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userInfo.setName, userInfo.setEmail])
    
      const logoutHanlder =  () => {
        window.localStorage.clear()
        window.location.reload();
      }
    
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
                id: userInfo.id,
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
                value={confirmPassword}
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