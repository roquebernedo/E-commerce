import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import '../styles/Register.scss'
import FormInfo from '../components/FormInfo';

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

  return (
    <div className='register'>
      <h1 className='title-register'>Sign Up</h1>

      <form className='form-reg' onSubmit={submitHandler}>
        <FormInfo
          classForm={'login-reg'}
          title={'Name'}
          type={'text'}
          value={name}
          setItem={setName}
        />

        <FormInfo 
          classForm={'login-reg'}
          title={'Email Address'}
          type={'email'}
          value={email}
          setItem={setEmail}
        />
        
        <FormInfo 
          classForm={'login-reg'}
          title={'Password'}
          type={'password'}
          value={password}
          setItem={setPassword}
        />
        
        <FormInfo 
          classForm={'login-reg'}
          title={'Confirm Password'}
          type={'password'}
          value={confirmPassword}
          setItem={setConfirmPassword}
        />

        { isLoading && <h2>Loading..</h2>}

        <button className='sign log'>
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