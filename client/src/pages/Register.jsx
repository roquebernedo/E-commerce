import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import '../styles/Register.scss'
import { css } from '@emotion/react';
import { register as registerService} from '../services/register'
import { CircleLoader } from 'react-spinners';
import RegisterInfo from '../components/RegisterInfo';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
// eslint-disable-next-line no-unused-vars
  const { userInfo } = useSelector((state) => state.authReducer)
  // eslint-disable-next-line no-unused-vars
  const [register, { isLoading }] = useRegisterMutation()
  const [users, setUsers] = useState([])
  console.log(users)
  const addBlog = async (event) => {
    event.preventDefault()
    const noteObject = {
      name: name,
      email: email,
      passwordHash: password
    }
    console.log("aca add")
    // console.log(noteObject)
    // registerService
    //   .register(noteObject)
    //   .then(returnedBlog => {
    //     console.log(returnedBlog)
    //     setUsers(users.concat(noteObject))
    //   })
    // console.log(noteObject)
    if(password !== confirmPassword){
      toast.error('Passwords do not match')
    }else{
      console.log("tambien")
      console.log(noteObject)
      try {
        const returnedBlog = await registerService(noteObject);
        console.log(returnedBlog);
        setUsers(users.concat(noteObject));
        toast.success('Creada exitosamente!')
        navigate('/');
      } catch (error) {
        console.log("error")
        console.error('Error registering user:', error);
        toast.error(error.message || 'Error registering user');
      }
    }
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='register-in'>
      { isLoading ?
        <div className='loader'>
          <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
        </div>  
        :
      <form className='form-reg' onSubmit={addBlog}>
        <RegisterInfo
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          /> 
      </form>
      }
    </div>
  );
};

export default Register;