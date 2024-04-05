import React from 'react'
import '../styles/Menu.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = ({ handle }) => {

    const { userInfo } = useSelector((state) => state.auth)

    const logoutHanlder =  () => {
        window.localStorage.clear()
        window.location.reload();
    }

    function recargarPagina() {
      window.location.reload();
    }

  return (
    <div className='menuResponsive'>
        <div className='buttonsResponsive'>
          <Link className='buttonResponsive' onClick={() =>  setTimeout(recargarPagina, 100)} to='/'>
            <div onClick={handle}>Home</div>
          </Link>
          <Link className='buttonResponsive' to='/results'>
            <div onClick={handle}>Tienda</div>
          </Link>
          <Link className='buttonResponsive' to='/us'>
            <div onClick={handle}>Nosotros</div>
          </Link>
          <Link className='buttonResponsive' to='/questions'>
            <div onClick={handle}>Preguntas Frecuentes</div>
          </Link>
          {userInfo &&  
            <>
                <Link className='buttonResponsive hide' to='/profile'>
                    <div>Profile</div>
                </Link>
                <Link onClick={logoutHanlder} className='buttonResponsive hide' to='/'>
                    <div>Logout</div>
                </Link>
            </>
           
            
          }
        </div>
    </div>
  )
}

export default Menu