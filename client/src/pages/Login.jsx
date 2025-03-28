import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { loginUser } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import '../styles/Login.scss'
import FormInfo from '../components/FormInfo.jsx';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import axios from 'axios';
// import productService from '../services/product.js';

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

  // const { userInfo } = useSelector((state) => state.authReducer)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("entro al handle")
    console.log(email)
    try {
      console.log("tamos en try")
      const response = await axios({
        method: 'post',
        url: 'https://e-commerce-f1fr.onrender.com/api/users/auth',
        data: { email, password },
      })
      //https://e-commerce-f1fr.onrender.com/api/users/auth
      const data = response.data
      window.localStorage.setItem("loggedTokenEcommerce", data.token)
      //dispatch(initializeUsers());
      console.log(data)
      // if (response.status === 401) {
      //   // Manejar el error aquí mismo
      //   console.log("Aca entro")
      //   toast.error(response.data.error);
      //   return;
      // }
      // const user = await loginService({
      //   email, password,
      // })
      dispatch(loginUser({ email, password}))
      //console.log(user)
      navigate('/')
      toast.success('Logeado exitosamente!')
    } catch (error) {
      console.log(".")
      if(error.response && error.response.data){
        console.log("Fue aca")
        console.log(error.response)
        console.log(error.response.data)
        console.log(error.response.data.error)
        toast.error(error.response.data.error)
      }else{
        toast.error('Algo salio mal.')
      }
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