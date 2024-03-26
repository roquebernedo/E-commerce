import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import '../styles/Register.scss'
import RegisterInfo from '../components/RegisterInfo';

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
    <div className='register-in'>
      <form className='form-reg' onSubmit={submitHandler}>
        <RegisterInfo
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
        />
        { isLoading && <h2>Loading..</h2>}
      </form>
    </div>
  );
};

export default Register;