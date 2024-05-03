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
import { login as loginService } from '../services/login'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if(userInfo){
      //window.location.reload();
      //navigate('/')
      
    }
  }, [navigate, userInfo])

  // const submitHandler = async (e) => {
  //   e.preventDefault();
    
  //   try{
  //     const res = await login({ email, password }).unwrap()
  //     dispatch(setCredentials({...res}))
  //     navigate('/')
  //     setTimeout(() => {
  //       window.location.reload()
  //     }, 1000);
      
      
  //     toast.success('Logeado exitosamente!')
  //   }catch(err){
  //     toast.error(err?.data?.message || err.error)
  //   }
  // };

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("entro al handle")
    console.log(email)
    try {
      console.log("tamos en try")
      const user = await loginService({
        email, password,
      })
      dispatch(setCredentials({...user}))
      console.log(user)
      navigate('/')
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000);
      toast.success('Logeado exitosamente!')
      // window.localStorage.setItem(
      //   'userInfo', JSON.stringify(user)
      // ) 
      // console.log("entra aca")
      // productService.setToken(user.token)
      // setUser(user)
      // setEmail('')
      // setPassword('')
    } catch (exception) {
      console.log("error")
    }
  }

  return (
    <div className='login-in'>
      {isLoading ? (
          <div className='loader'>
            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
          </div>
        ):
        <form className='form-login' onSubmit={handleLogin}>
          <FormInfo 
            setPassword={setPassword}
            setEmail={setEmail}
          />
        </form>
        }
    </div>
  );
};

export default Login;