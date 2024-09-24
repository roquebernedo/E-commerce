import React, { useEffect, useState } from 'react'
//import { useSelector } from 'react-redux'
import '../styles/Notifications.scss'
import { TbPointFilled } from "react-icons/tb";
import productService from '../services/product';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { FaRegTrashCan } from "react-icons/fa6";

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

    const containerStyles = css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 600px;
    `;

    useEffect(() => {
        setLoading(true)
        if(userInfo){
            productService.setNotifications().then(blogs => {
                setNoti(blogs)
                setLoading(false)
            })  
        }
    }, [userInfo])
    console.log(noti)

    useEffect(() => {
        productService.deleteUniqueNoti().then(blogs => blogs)
    },[])

    useEffect(() => {
        if(userInfo){
            const notiListUser = noti.find(noti => noti.user.find(user => user.id === userInfo.id))
            setNotiListUserInfo(notiListUser)
        }
        
    }, [userInfo, setNotiListUserInfo, noti])
    console.log(notiListUserInfo)

    useEffect(() => {
        if(userInfo){
            if(notiListUserInfo){
              console.log(notiListUserInfo)
              const notiListUser = userInfo.notifications && userInfo.notifications?.find(list => list._id === notiListUserInfo._id)
              console.log(notiListUser)
              setNotifications(notiListUser)
            }
        }
        
    }, [userInfo, notiListUserInfo])
    console.log(notifications)

    const openBar = () => {
        if(open === false){
            setOpen(true)
            console.log("aca va open true", open)
        }else{
            console.log("aca va open false", open)
            setOpen(false)
        }
    }

    const transformDateTime = (dateTimeString) => {
        return dateTimeString.replace(",", " |");
    };

    return (
        <div className={notiListUserInfo && notiListUserInfo.notif_list && notiListUserInfo.notif_list.length > 0 ? 'notifications notifcations-alt' : 'notifications'}>
            <div className={notiListUserInfo && notiListUserInfo.notif_list && notiListUserInfo.notif_list.length > 0 ? 'main-notifications main-notifications-alt' : 'main-notifications'}>
                <div className='notifications-options'>
                    <div className='title-notifications'>Direcciones</div>
                </div>
                {loading 
                    ? (
                        <div className='loader' css={containerStyles}>
                            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
                        </div>
                      )
                    :   userInfo && notiListUserInfo && notiListUserInfo.notif_list && notiListUserInfo.notif_list.length > 0
                        ?   <>
                                {notiListUserInfo.notif_list.map(notification => 
                                        <div className='products-notifications-profile'>
                                            <div className='products-main-profile-notifications' onClick={openBar}>
                                                <div className='notification-elements'>
                                                    <div className='product-info-profile-notifications'>
                                                        <div className='div-point-noti'><TbPointFilled className='point-noti' /></div>
                                                        <div className='welcome-dirstore'>{notification.title}</div>
                                                    </div>
                                                    <div className='welcome-date'>{transformDateTime(notification.date)}</div>
                                                </div>
                                                <div className='line'></div>
                                            </div>
                                            
                                            <div className={!open ? 'notification-description' : 'notification-description noti-open'}>
                                                <div className='notification-info-description'>
                                                    <div className='noti-desc'>{notification.description}</div>
                                                </div>
                                                <div className='notification-trash-can'>
                                                    <div className='container-trash'>
                                                        
                                                        <span className='spancito'><FaRegTrashCan onClick={() => console.log("hola")} className='trash-can'/></span>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div> 
                                )}
                            </>      
                        :   <div className='no-favorites-publications'>Aun no tienes ninguna notificacion</div>
                }
            </div>
        </div>
    )
}

export default Address