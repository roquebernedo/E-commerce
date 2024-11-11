import '../styles/Profile.scss'
import { GoPerson } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { CiHeart, CiLogin  } from "react-icons/ci";
import { PiMapPinLight, PiMoneyDuotone } from "react-icons/pi";
import { GoTag } from "react-icons/go";
import { Link, Outlet } from 'react-router-dom';

const Profile = () => {

  const logoutHanlder =  () => {
    window.localStorage.clear()
    window.location.reload();
  }

  return (
    <div className='profile'>
      <div className='profile-left'>
        <div className='profile-menu'>
          <Link to="/profile/details" className='profile-options'>
            <GoPerson className='profile-icon'/>
            <div className='icon-text'>Detalles</div>
          </Link>
          <Link to="/profile/notifications" className='profile-options'><IoIosNotificationsOutline className='profile-icon'/><div className='icon-text'>Notificaciones</div></Link> 
          <Link to="/profile/address" className='profile-options'><PiMapPinLight className='profile-icon'/><div className='icon-text'>Direcciones</div></Link>
          <Link to="/profile/purchases" className='profile-options'><IoBagOutline className='profile-icon'/><div className='icon-text'>Compras</div></Link>
          <Link to="/profile/publications" className='profile-options'><GoTag className='profile-icon'/><div className='icon-text'>Publicaciones</div></Link>
          <div className='profile-options'><PiMoneyDuotone className='profile-icon'/><div className='icon-text'>Ventas</div></div>
          <Link to="/profile/favorites" className='profile-options'><CiHeart className='profile-icon'/><div className='icon-text'>Favoritos</div></Link>
          <div className='profile-options' onClick={logoutHanlder}>
            <CiLogin className='profile-icon'/>
            <div className='icon-text'>Salir</div>
          </div>
        </div>
      </div>
      <div className='profile-right'>
        <Outlet />
      </div>
      
      

      
    </div>
  );
};

export default Profile;