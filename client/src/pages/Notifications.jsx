import React from 'react'
//import { useSelector } from 'react-redux'
import '../styles/Notifications.scss'
import { TbPointFilled } from "react-icons/tb";

const Notifications = () => {
    //const { userInfo } = useSelector((state) => state.auth)

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