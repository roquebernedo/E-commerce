import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import '../styles/Login.scss'

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

        <div className='email log'>
            <div>Email Address</div>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className='pass log'>
            <div>Password</div>
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        { isLoading && <h2>Loading..</h2> }

        <button
          className='sign log' type='submit'
        >
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