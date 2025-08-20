import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { loginUser } from '../slices/authSlice.js';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import '../styles/Login.scss'
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
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState('') 
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const [login, { isLoading }] = useLoginMutation()
  const { googleLogin } = useUserLogin()
  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
    // eslint-disable-next-line no-unused-vars
    setValue: setValueSignin,
    // eslint-disable-next-line no-unused-vars
    watch: watchSignin,
  } = useForm();

  const {
    // eslint-disable-next-line no-unused-vars
    register: registerSignup,
    // eslint-disable-next-line no-unused-vars
    handleSubmit: handleSubmitSignup, 
    // eslint-disable-next-line no-unused-vars
    formState: { errors: errorsSignup },
    // eslint-disable-next-line no-unused-vars
    setValue: setValueSignup,
    // eslint-disable-next-line no-unused-vars
    watch: watchSignup,
  } = useForm();

  const handleLogin = async (signinData) => {
    console.log("entro al handle")
    console.log(email)
    try {
      console.log("tamos en try")
      const response = await axios({  
        method: 'post',
        url: 'https://e-commerce-f1fr.onrender.com/api/users/auth',
        data: signinData,
      })
      console.log(signinData)
      // const { response } = await axios.post(`http://localhost:8000/api/users/auth`, signinData);
      //https://e-commerce-f1fr.onrender.com/api/users/auth
      console.log(response)
      // const data = response.data
      
      window.localStorage.setItem("loggedTokenEcommerce", response.data.token)
      //dispatch(initializeUsers());
      // console.log(data)
      // if (response.status === 401) {
      //   // Manejar el error aquí mismo
      //   console.log("Aca entro")
      //   toast.error(response.data.error);
      //   return;
      // }
      // const user = await loginService({
      //   email, password,
      // })
      dispatch(loginUser( signinData ))
      //console.log(user)
      navigate('/')
      toast.success('Logeado exitosamente!')
    } catch (error) {
      console.log(error)
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
          <form className='form-login' onSubmit={handleSubmitSignin(handleLogin)}>
            <div className="login">
              <section className='login-container'> 
                <div className='login-title'>
                  <h1 className='title'>Sign in</h1>
                </div>
                <div className='login-email'>
                  {errorsSignin.email?.type === "required" && (
                    <p className="error-input">Ingresa tu email</p>
                  )}
                  {errorsSignin.email?.type !== "required" && (
                    <label className='email lab'></label>
                  )}
                 
                  <input 
                    type='text' 
                    className='email-input'  
                    placeholder='Email'
                    // onChange={(e) => setEmail(e.target.value)} 
                    {...registerSignin("email", {
                      required: true,
                    })} 
                    // required
                    // onInvalid={(e) => e.target.setCustomValidity('Ingresa tu email')}
                    // onInput={(e) => e.target.setCustomValidity('')}  
                  />
                </div>
                <div className='login-password'>
                  {errorsSignin.password?.type === "required" && (
                    <p className="error-input">Ingresa tu contraseña</p>
                  )}
                  {errorsSignin.password?.type !== "required" && (
                    <label className='password lab'></label>
                  )}
                  
                  <input 
                    type='password' 
                    className='password-input' 
                    placeholder='Contraseña'
                    // onChange={(e) => setPassword(e.target.value)} 
                    {...registerSignin("password", {
                      required: true,
                    })}
                    // required
                    // onInvalid={(e) => e.target.setCustomValidity('Ingresa tu contraseña')}
                    // onInput={(e) => e.target.setCustomValidity('')} 
                  />
                  <Link className='password-save' to='/retrievePassword'>Recuperar contraseña</Link>
                </div>
                <div className='login-button'>
                  <button className='log-in' type='submit'>Log in</button>
                </div>
                <div className='login-recover'>
                  <div className='login-ask'>¿Necesitas una cuenta?</div>
                  <Link className='login-create' to='/register'>Crear cuenta</Link>
                </div>
              </section>
            </div>
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