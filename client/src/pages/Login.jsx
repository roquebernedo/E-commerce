import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import '../styles/Login.scss'
import FormInfo from '../components/FormInfo.jsx';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
      toast.success('Logeado exitosamente!')
    }catch(err){
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <div className='login-in'>
      {isLoading ? (
          <div className='loader'>
            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
          </div>
        ):
        
          <FormInfo 
            setPassword={setPassword}
            setEmail={setEmail}
            submitHandler={submitHandler}
          />
        
        }
    </div>
  );
};

export default Login;