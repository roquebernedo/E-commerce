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
    <div className='register'>
      <h1>Update Profile</h1>
      
      <form onSubmit={submitHandler}>
        <div className='log'>
          <div>Name</div>
          <input
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='log'>
          <div>Email Address</div>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='log'>
          <div>Password</div>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='log'>
          <div>Confirm Password</div>
          <input
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