import React, { useEffect, useState } from 'react'
import productService from '../services/product'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import '../styles/SingleNotification.scss'
import { CircleLoader } from 'react-spinners';
import { TbPointFilled } from 'react-icons/tb';
import { FaRegTrashCan } from "react-icons/fa6";
import { removeNotification } from '../slices/authSlice';

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin: 0 auto;
  border-color: red;
`;

const SingleNotification = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [unitFromList, setUnitFromList] = useState()
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const productID = location.pathname.split("/")[3];
    const dispatch = useDispatch()
    console.log(productID)

    const containerStyles = css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 600px;
    `;

    useEffect(() => {
        setLoading(true)
        if(userInfo){
            console.log("entro al single")
            productService.getUniqueNoti(productID).then(blogs => {
                setUnitFromList(blogs)
                setLoading(false)
            })  
            //dispatch(getUniqueNotification(unitFromList._id))
        }
        
    
    }, [userInfo, productID])

    // useEffect(() => {
    //     if(userInfo && unitFromList){
    //         dispatch(getUniqueNotification(unitFromList._id))
    //     }
        
    
    // }, [userInfo, unitFromList, dispatch])
    
    console.log(unitFromList)
    console.log("hola")

    const deletingNoti = (id) => {
        if(userInfo){
            console.log("entro al deletingNoti")
            console.log(id)
            // productService.deleteUniqueNoti(id).then(response => { console.log('Notificacion eliminada', response)})
            // .catch(error => {
            //     console.error('Error al eliminar la notificacion', error)
            // })
            dispatch(removeNotification(id))
            navigate('/profile/notifications')
        }
    }
        
    

    const openBar = () => {
        if(open === false){
            setOpen(true)
            console.log("aca va open true", open)
        }else{
            console.log("aca va open false", open)
            setOpen(false)
        }
    }
    console.log(open)
    const transformDateTime = (dateTimeString) => {
        return dateTimeString.replace(",", " |");
    };
   
    
    return (
        <div className='notifications-section'>
            <div className='notifications-primary'>
                <div className='notifications-single'>
                    <div className='title-single'>Notificaciones</div>
                </div>
                {loading 
                    ? (
                        <div className='loader' css={containerStyles}>
                            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
                        </div>
                    )
                    : <div className='main-noti'>
                        <div className='notification-information' onClick={openBar}>
                            <div className='notification-elements'>
                                <div className='div-main-noti'>
                                    <div className='div-point-green-noti'><TbPointFilled className='point-green-noti' /></div>
                                    <div className='welcome-unite'>{userInfo && unitFromList && unitFromList.title}</div>
                                </div>
                                <div className='welcome-date'>{transformDateTime(userInfo && unitFromList.date)}</div>
                            </div>
                            <div className='line'></div>
                        </div>
                        
                        <div className={!open ? 'notification-description' : 'notification-description noti-open'}>
                            <div className='notification-info-description'>
                                <div className='noti-desc'>{userInfo && unitFromList.description}</div>
                            </div>
                            <div className='notification-trash-can'>
                                <FaRegTrashCan onClick={() => deletingNoti(unitFromList._id)} />
                            </div>
                        </div>
                      </div>
                }
            </div>
        </div>
    )
}

export default SingleNotification