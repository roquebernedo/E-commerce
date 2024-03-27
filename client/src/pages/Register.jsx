import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import '../styles/Register.scss'
import RegisterInfo from '../components/RegisterInfo';
import FormInfo from '../components/FormInfo';
import { register as registerService} from '../services/register'
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const [register, { isLoading }] = useRegisterMutation()
  const [users, setUsers] = useState([])

 
  console.log(registerService)
  const addBlog = async (event) => {
    event.preventDefault()
    const noteObject = {
      name: name,
      email: email,
      passwordHash: password
    }
    
    // console.log(noteObject)
    // registerService
    //   .register(noteObject)
    //   .then(returnedBlog => {
    //     console.log(returnedBlog)
    //     setUsers(users.concat(noteObject))
    //   })
    // console.log(noteObject)
    try {
      const returnedBlog = await registerService(noteObject);
      console.log(returnedBlog);
      setUsers(users.concat(noteObject));
      toast.success('Creada exitosamente!')
      // Puedes realizar otras acciones después del registro, como redirigir al usuario
      navigate('/'); // Ejemplo de redirección a la página principal después del registro exitoso
    } catch (error) {
      console.error('Error registering user:', error);
      // Puedes manejar el error como desees, por ejemplo, mostrando un mensaje al usuario
      toast.error(error.message || 'Error registering user');
    }

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='register'>
      <h1 className='title-register'>Sign Up</h1>
      <form className='form-reg' onSubmit={addBlog}>
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