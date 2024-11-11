import React, { useEffect, useRef, useState } from 'react'
//import { useSelector } from 'react-redux'
import '../styles/Address.scss'
import { TbPointFilled } from "react-icons/tb";
import productService from '../services/product';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPin } from "react-icons/ti";
import { addingAddress, removeAddress, setAddress, updatingAddress } from '../slices/authSlice';
import { MdEdit } from "react-icons/md";
import Modal from '../components/Modal';
import EditModal from '../components/EditModal';

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin: 0 auto;
  border-color: red;
`;

const Address = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [noti, setNoti] = useState([])
    const [notiListUserInfo, setNotiListUserInfo] = useState([])
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [modalDisplay, setModalDisplay] = useState(false);
    const [modalDisplay2, setModalDisplay2] = useState(false);
    const modalRef = useRef(null);
    const [address, setAddresss] = useState({
        street_name:"",
        street_number:"",
        city:"",
        zip_code:"",
        state: ""
    })
    const [selectedAddress, setSelectedAddress] = useState()
    const [formData, setFormData] = useState({
        street_name: '',
        street_number: '',
        city: '',
        zip_code: '',
        state: ''
    });
    console.log(address)

    const openModal = () => {
        setModalDisplay(true);
    };
    
    const openModal2 = (addressFound) => {
        console.log(addressFound)
        setSelectedAddress(addressFound);
        console.log(selectedAddress)
        setModalDisplay2(true);
    };
    console.log(selectedAddress)

    const closeModal = () => {
        setModalDisplay(false);
        
    };

    const closeModal2 = () => {
        console.log("modal2")
        setModalDisplay2(false);
    };

    const closeOnOutsideClick = (event) => {
        if (event.target === modalRef.current || event.target === event.currentTarget) {
            closeModal();
            
        }
        console.log(event.target)
    };

    const closeOnOutsideClick2 = (event) => {
        if (event.target === modalRef.current || event.target === event.currentTarget) {
            closeModal2();
        }
        console.log(event.target)
    };
    

    const containerStyles = css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 600px;
    `;

    useEffect(() => {
        setLoading(true)
        if(userInfo){
            setLoading(false)
        }
    }, [userInfo])

    const settingDefaultAddress = (id) => {
        console.log(id)
        if(userInfo){
            dispatch(setAddress(id))
        }
    }

    const removing = (id) => {
        console.log(id)
        if(userInfo){
            dispatch(removeAddress(id))
        }
    }

    const addAddress = async (e) => {
        console.log("hola entro a addAddress")
        e.preventDefault()
        dispatch(addingAddress(address))
        closeModal()
    }

    const updateAddress = async (e) => {
        console.log("entro al update")
        e.preventDefault()
        dispatch(updatingAddress(selectedAddress._id, formData))
        closeModal2()
    }

    const handleChange = (e) => {
        e.preventDefault()
        setAddresss(prev => ({...prev, [e.target.name]: e.target.value}))
        // console.log(address)
    }

    const handleChange2 = (e) => {
        e.preventDefault()
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value}));
        
    };
    console.log(formData)
    console.log(userInfo)

    return (
        <div className={userInfo && userInfo.address && userInfo.address.address.length > 0 && userInfo.address.address ? 'addresses addresses-alt' : 'addresses'}>
            <div className={userInfo && userInfo.address && userInfo.address.address.length > 0 && userInfo.address.address ? 'main-addresses main-addresses-alt' : 'main-addresses'}>
                <div className='addresses-options'>
                    <div className='title-addresses'>Direcciones</div>
                </div>
                {loading 
                    ? (
                        <div className='loader' css={containerStyles}>
                            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
                        </div>
                      )
                    :   userInfo && userInfo.address && userInfo.address.address.length > 0 && userInfo.address.address 
                        ?   <>
                                {userInfo && userInfo.address.address.length > 0 && userInfo.address.address.map(addresses => 
                                        <div className='products-addresses-profile' key={addresses._id}>
                                            <div className='products-main-profile-addresses'>
                                                <div className='addresses-elements'>
                                                    <div className='product-info-profile-addresses'>
                                                        <div className='div-point-addresses'>
                                                            <TiPin onClick={() => settingDefaultAddress(addresses._id)} className={addresses.isDefault ? 'point-addresses' : 'point-addresses-false'}/>
                                                        </div>
                                                        <div className='welcome-dirstore'>
                                                            {`${addresses.street_name} ${addresses.street_number}, ${addresses.zip_code}, ${addresses.city}, ${addresses.state}`}
                                                        </div>
                                                    </div>
                                                    <div className='welcome-date'>
                                                        <MdEdit onClick={() => openModal2(addresses)} className='edit'/>
                                                        <EditModal
                                                            closeModal={closeModal2}
                                                            modalDisplay={modalDisplay2}
                                                            closeOnOutsideClick={closeOnOutsideClick2}
                                                            handleChange={handleChange2}
                                                            submit={updateAddress}
                                                            formData={formData}
                                                            setFormData={setFormData}
                                                            address={selectedAddress}
                                                        />
                                                        <FaRegTrashCan onClick={() => removing(addresses._id)} className='trashcan'/>
                                                    </div>
                                                </div>
                                                
                                            </div> 
                                        </div> 
                                )}
                            </>      
                        :   <div className='no-favorites-addresses'>Aun no tienes ninguna notificacion</div>
                }
                <div onClick={() => openModal()} className='addDirection'>Agregar direccion</div>
                <Modal
                    closeModal={closeModal}
                    modalDisplay={modalDisplay}
                    closeOnOutsideClick={closeOnOutsideClick}
                    handle={handleChange}
                    submit={addAddress}
                />
                
            </div>
        </div>
    )
}

export default Address