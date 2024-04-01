import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import '../styles/Profile.scss'

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const [updateProfile, { isLoading}] = useUpdateUserMutation()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.setName, userInfo.setEmail])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Passwords do not match')
    }else{
      try{
        const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            password
        }).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('Profile updated')
      }catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }
  };
  
  return (
    <div className='profile'>
      <h1 className='update-profile'>Update Profile</h1>
      
      <form className='form-profile' onSubmit={submitHandler}>
        <div className='log-profile'>
          <div>Name</div>
          <input
            className='input-profile'
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='log-profile'>
          <div>Email Address</div>
          <input
            className='input-profile'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='log-profile'>
          <div>Password</div>
          <input
            className='input-profile'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='log-profile'>
          <div>Confirm Password</div>
          <input
            className='input-profile'
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        { isLoading && <Loader />}

        <button className='update log' >
          Update
        </button>
        
      </form>

      
    </div>
  );
};

export default Profile;