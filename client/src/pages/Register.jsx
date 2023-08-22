import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import '../styles/Register.scss'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  }, [ navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Passwords do not match')
    }else{
      try{
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({...res}))
        navigate('/') 
      }catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }
  };
  console.log(name)
  return (
    <div className='register'>
      <h1>Sign Up</h1>

      <form onSubmit={submitHandler}>
        <div className='log'>
          <div>Name</div>
          <input
            type='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='log'>
          <div>Email Address</div>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='log'>
          <div>Password</div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='log'>
          <div>Confirm Password</div>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        { isLoading && <h2>Loading..</h2>}

        <button
        className='sign log'>
          Sign Up
        </button>
      </form>

      
      <div className='new'>
          Already have an Account? <Link className='log-link' to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Register;