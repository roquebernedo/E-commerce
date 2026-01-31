import '../styles/Profile.scss'
import { GoPerson } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { CiHeart, CiLogin  } from "react-icons/ci";
import { PiMapPinLight, PiMoneyDuotone } from "react-icons/pi";
import { GoTag } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Details from './Details';
import Notifications from './Notifications.jsx';
import Address from './Address.jsx';
import Purchases from './Purchases.jsx';
import Publications from './Publications.jsx';
import Sales from './Sales.jsx';
import Favorites from './Favorites.jsx';
import Password from './Password.jsx';
import UpdateEmailModal from '../components/UpdateEmailModal.jsx';

const Profile = () => {

  const navigate = useNavigate()
  const logoutHanlder =  () => {
    window.localStorage.clear()
    window.location.reload();
  }

  const { section } = useParams()
  const [ render, setRender ] = useState(section)

  useEffect(() => {
    setRender(section || "details")
    console.log(section)
  }, [section])

  return (
    <div className='profile'>
      <div className='profile-left'>
        <div className='profile-menu'>
          <div onClick={() => navigate("/profile/details")} className='profile-options'>
            <GoPerson className='profile-icon'/>
            <div className='icon-text'>Detalles</div>
          </div>
          <div onClick={() => navigate("/profile/notifications")} className='profile-options'><IoIosNotificationsOutline className='profile-icon'/><div className='icon-text'>Notificaciones</div></div> 
          {/* <Link to="/profile/notifications" className='profile-options'><IoIosNotificationsOutline className='profile-icon'/><div className='icon-text'>Notificaciones</div></Link> */}
          <div onClick={() => navigate("/profile/address")} className='profile-options'><PiMapPinLight className='profile-icon'/><div className='icon-text'>Direcciones</div></div>
          <div onClick={() => navigate("/profile/purchases")} className='profile-options'><IoBagOutline className='profile-icon'/><div className='icon-text'>Compras</div></div>
          <div onClick={() => navigate("/profile/publications")} className='profile-options'><GoTag className='profile-icon'/><div className='icon-text'>Publicaciones</div></div>
          <div onClick={() => navigate("/profile/sales")} className='profile-options'><PiMoneyDuotone className='profile-icon'/><div className='icon-text'>Ventas</div></div>
          <div onClick={() => navigate("/profile/favorites")} className='profile-options'><CiHeart className='profile-icon'/><div className='icon-text'>Favoritos</div></div>
          <div className='profile-options' onClick={logoutHanlder}>
            <CiLogin className='profile-icon'/>
            <div className='icon-text'>Salir</div>
          </div>
        </div>
      </div>
      <div className='profile-right'>
        {render === "details" && (
          <Details />
        )}

        {render === "notifications" && (
          <Notifications />
        )}

        {render === "address" && (
          <Address />
        )}

        {render === "purchases" && (
          <Purchases />
        )}

        {render === "publications" && (
          <Publications />
        )}

        {render === "sales" && (
          <Sales />
        )}

        {render === "favorites" && (
          <Favorites />
        )}

        {render === "password" && (
          <Password />
        )}
        
      </div>
    </div>
  );
};

export default Profile;