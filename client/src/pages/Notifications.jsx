import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import '../styles/Notifications.scss'
import { IoCartOutline } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";

const Notifications = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [productsUserInfo, setProductsUserInfo] = useState([])
    return (
        <div className='notifications'>
            <div className='main-notifications'>
                <div className='notifications-options'>
                    <div className='title-notifications'>Notificaciones</div>
                </div>
                <div className='products-notifications-profile'>
                    <div className='products-main-profile-notifications'>
                        <div className='product-info-profile-notifications'>
                            <div className='div-point-noti'><TbPointFilled className='point-noti' /></div>
                            <div className='welcome-dirstore'>Dirstore te da la bienvenida!</div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Notifications