import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { loginUser } from '../slices/authSlice.js';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import '../styles/Login.scss'
import FormInfo from '../components/FormInfo.jsx';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import axios from 'axios';
import { useUserLogin } from '../hooks/useUserLogin.jsx';
// import productService from '../services/product.js';
const { REACT_APP_OAUTH_CLIENT_ID } = process.env;

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
  const { googleLogin } = useUserLogin()

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

  const handleCallbackResponse = async (response) => {
    try {
      console.log("mi gugelsito") 
      console.log(response)
      //dispatch(loadingUserData(true));
      //response.credential = Google user token
      const userDecoded = jwtDecode(response.credential); 
      console.log("no entro")
      console.log(response.credential)
      console.log(userDecoded)
      const googleToken = "google" + response.credential;
      console.log(response)
      console.log(googleToken)
      //? Login con el hook
      googleLogin(googleToken, userDecoded, true);

      //window.localStorage.setItem("loggedTokenEcommerce", googleToken);
    } catch (error){
      console.log(error);
      //! VOLVER A VER manejo de errores
    } finally {
      console.log("entro aca tambien")
      //dispatch(loadingUserData(false));
    }
  };

  useEffect(() => {

    /* global google */
    google.accounts.id.initialize({
      client_id: REACT_APP_OAUTH_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "standard",
      size: "large",
      width: 280,
      text: "continue_with",
      theme: "filled_black",
      shape: "square",
    });
    //google.accounts.id.prompt();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='login-in'>
      {isLoading ? (
          <div className='loader'>
            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
          </div>
        ):
        <>
          <form className='form-login' onSubmit={handleLogin}>
            <FormInfo 
              setPassword={setPassword}
              setEmail={setEmail}
            />
            <div className="google-container">
              <span>O ingresa con tu cuenta de Google</span>
              <span className="google-signin-container" id="signInDiv"></span>
            </div>
          </form>
          
        </>
        }
    </div>
  );
};

export default Login;