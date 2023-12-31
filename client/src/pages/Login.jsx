import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import '../styles/Login.scss'
import FormInfo from '../components/FormInfo.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/')
    }catch(err){
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <div className='login'>
      <h1>Sign In</h1>

      <form onSubmit={submitHandler}>
        <FormInfo 
          classForm={'email log'}
          title={'Email Address'}
          type={'email'}
          value={email}
          setItem={setEmail}
        />
        <FormInfo 
          classForm={'pass log'}
          title={'Password'}
          type={'password'}
          value={password}
          setItem={setPassword}
        />

        { isLoading && <h2>Loading..</h2> }

        <button className='sign log' type='submit'>
          Sign In
        </button>
      </form>

        <div className='new'>
          New Customer? <Link className='reg-link' to='/register'>Register</Link>
        </div>
      
    </div>
  );
};

export default Login;