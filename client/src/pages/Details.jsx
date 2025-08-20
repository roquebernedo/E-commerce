import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { updateInfo } from '../slices/authSlice';
import '../styles/Modal.scss'
// import productService from "../services/product";
import { toast } from 'react-toastify';
import '../styles/Profile.scss'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import UpdateInfoModal from '../components/UpdateInfoModal';

const Details = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [modalDisplay, setModalDisplay] = useState(false);
    // const [oldPassword, setPassword] = useState('');
    // const [newPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.authReducer)
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(true)
    // const { section } = useParams()
    // const [ render, setRender ] = useState(section)
    //const inputRef = useRef(null);
    //const inputRef2 = useRef(null);
    const modalRef = useRef(null);
    const [selectedAddress, setSelectedAddress] = useState()
    const [formData, setFormData] = useState({
      [!userInfo.isGoogleUser ? 'name' : 'firstName']: '',
      username: '',
    });
    console.log(userInfo.isGoogleUser)
    console.log(userInfo)
    // const [formGoogleData, setFormGoogleData] = useState({
    //   firstName: '',
    //   username: '',
    // })
    // const handleClick = (ref) => {
    //   ref.current.focus(); // Mueve el cursor al input
    // };
    // useEffect(() => {
    //   setRender(section || "details")
    // }, [section])

    //console.log(userInfo)
    const addressTrue = userInfo ? userInfo.addresses && userInfo.addresses.address.find(item => item.isDefault === true) : 'nada'
    console.log(addressTrue)
    //console.log(userInfo)
    useEffect(() => {
      if(userInfo){
        setName(!userInfo.isGoogleUser ? userInfo.name : userInfo.firstName)
        setFirstName(userInfo.isGoogleUser && userInfo.firstName)
        setUsername(userInfo.username)
        setEmail(userInfo.email)
        if(address) setAddress(userInfo && userInfo.address.address.find(item => item.isDefault === true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        //console.log(address)
      }
        
    }, [address, setAddress, userInfo])
    //console.log(userInfo.address.address.find(item => item.isDefault === true))
      // const logoutHanlder =  () => {
      //   window.localStorage.clear()
      //   window.location.reload();
      // }
    //console.log(addressTrue)
      const submitHandler = async (e) => {
        e.preventDefault();
        const loggedUserJSON = window.localStorage.getItem('loggedTokenEcommerce')
        const updatedUserInfo = { ...userInfo, token: loggedUserJSON }
        console.log(updatedUserInfo)
   
        console.log("hola")
        console.log(name)
        console.log(username)
        const userInfoDetailsGoogle = {
          firstName: formData.firstName,
          username: formData.username
        }
        const userInfoDetails = {
          name: formData.name,
          username: formData.username
        };
        console.log(userInfo)
        console.log(userInfoDetailsGoogle)
        console.log(userInfoDetails)
        //const user_data = await productService.changePassword(userInfoDetails)
        const { data } = await axios.put(`https://e-commerce-f1fr.onrender.com/api/users/update`, !userInfo.isGoogleUser ? userInfoDetails : userInfoDetailsGoogle, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          }
        })

        
        if(data){
          console.log(data)
          if(userInfo.isGoogleUser){
            dispatch(updateInfo({ userInfoDetailsGoogle, isGoogleUser: true }))
          }else{
            dispatch(updateInfo(userInfoDetails))
          }
        }
       
      };
      
      

      const openModal = (userInfo) => {
        console.log(userInfo.emailVerified)
        if(!userInfo.emailVerified){
          toast.warn('Verifica tu email para poder editar tus datos')
        }else{
          setModalDisplay(true);
          console.log(userInfo)
          setSelectedAddress(userInfo);
          console.log(selectedAddress)
        }
        
      };

      const closeModal = () => {
        setModalDisplay(false);
      };

      const closeOnOutsideClick = (event) => {
        if (event.target === modalRef.current || event.target === event.currentTarget) {
            closeModal();
        }
        //console.log(event.target)
      };
      const handleChange2 = (e) => {
        e.preventDefault()
        console.log("entro")
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value}));
        console.log(formData)
      };

      // const updateAddress = async (e) => {
      //   console.log("entro al update")
      //   e.preventDefault()
      //   dispatch(updatingAddress(selectedAddress._id, formData))
      //   closeModal()
      // }
      console.log(formData)
      console.log(userInfo)

      const handleVerifyEmail = async () => {
        console.log("hola entra")
        //setVerifyLoading(true);
        try {
          console.log("aca")
          // eslint-disable-next-line no-unused-vars
          const { data } = await axios.post("http://localhost:8000/api/users/sendVerifyEmail", {}, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              'Content-Type': 'application/json',
            }
          });
          console.log(data)
          //notification("Revisa tu email para verificar tu cuenta", "", "");
          //setVerifyResponse(true);
          console.log("Y paso")
        } catch (error) {
          //setVerifyLoading(false);
          console.error(error);
          //! VOLVER A VER manejo de errores
        }
      };

      const changePassword = () => {
        // if(userInfo.isGoogleUser){
        //   return toast.warn('No puedes cambiar tu contraseña con una cuenta gmail')
        // }
        userInfo.isGoogleUser 
          ? toast.warn('No esta permitido con Gmail')
          : userInfo.emailVerified 
            ? navigate("/profile/password")
            : toast.warn('Verifica tu email para poder editar tu contraseña')
      }
  return (
    <>
        <div className='profile-details'>
          <div className='details'>Detalles</div>
        </div>
        <div className='form-profile'>
          <div className='profile-details-main'>
            <div className='log-profile'>
              <div className='div-input'>Nombre</div>
              <div className='box-input-pen' onClick={() => openModal(userInfo)}>
                <div className='name-user'>{!userInfo.isGoogleUser ? name : firstName}</div>
                <div className='profile-edit-svg'>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                </div>
              </div>
              <UpdateInfoModal
                closeModal={closeModal}
                modalDisplay={modalDisplay}
                closeOnOutsideClick={closeOnOutsideClick}
                handleChange={handleChange2}
                submit={submitHandler}
                formData={formData}
                setFormData={setFormData}
                address={selectedAddress}
                userInfo={userInfo}
              />
            </div>
            <div className='log-profile'>
              <div className='div-input'>Usuario</div>
              <div className='box-input-pen' onClick={() => openModal(userInfo)}>
                <div className='name-user'>{username}</div>
                <div className='profile-edit-svg'>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                </div>
              </div>
              
            </div>

            <div className='log-profile'>
              <div className='div-input'>Email</div>
              <div className='email-user'>
                {!userInfo.isGoogleUser ? email : userInfo.googleEmail}
                {!userInfo.emailVerified && <div className='verify' onClick={() => handleVerifyEmail()}>Verificar Email</div>}
              </div>
            </div>

            <div className='log-profile'>
              <div className='div-input'>Direccion</div>
              <div className='box-input-pen' onClick={() => navigate("/profile/address")}>
                
                <div className='name-user'>{addressTrue ? `${addressTrue.street_name} ${addressTrue.street_number}, ${addressTrue.city}` : 'Coloca una direccion predeterminada'}</div>
                {
                  addressTrue && 
                  <div className='profile-edit-svg'>
                    <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000000"><path d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                  </div>
                }
              </div>
            </div>

            <div className='log-profile'>
              <div className='div-input'>Seguridad</div>
              {/* <input
                className='input-profile'
                type='password'
                placeholder='Enter password'
                value={oldPassword}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              <div onClick={() => changePassword()} className='password-change'>Cambiar contraseña</div>
            </div>

            {/* <div className='log-profile'>
              <div className='div-input'>Confirm Password</div>
              <input
                className='input-profile'
                type='password'
                placeholder='Confirm password'
                value={newPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className='log-profile'>
              <div className='div-input'>Password</div>
              <input
                className='input-profile'
                type='password'
                placeholder='Enter password'
                value={oldPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}

            { isLoading && <Loader />}

            {/* <button className='update log'>
              Update
            </button> */}
          </div>
        </div>
    </>
  )
}

export default Details