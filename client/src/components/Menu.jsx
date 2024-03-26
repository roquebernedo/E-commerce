import React from 'react'
import '../styles/Menu.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = () => {

    const { userInfo } = useSelector((state) => state.auth)

    function recargarPagina() {
        window.location.reload();
      }

    const logoutHanlder =  () => {
        window.localStorage.clear()
        window.location.reload();
    }

  return (
    <div className='menuResponsive'>
        <div className='buttonsResponsive'>
          <Link onClick={() =>  setTimeout(recargarPagina, 100)} className='buttonResponsive' to='/'>
            <div>Home</div>
          </Link>
          <Link onClick={() =>  setTimeout(recargarPagina, 100)} className='buttonResponsive' to='/results'>
            <div>Tienda</div>
          </Link>
          <Link onClick={() =>  setTimeout(recargarPagina, 100)} className='buttonResponsive' to='/us'>
            <div>Nosotros</div>
          </Link>
          <Link onClick={() =>  setTimeout(recargarPagina, 100)} className='buttonResponsive' to='/questions'>
            <div>Preguntas Frecuentes</div>
          </Link>
          {userInfo ?
            <>
                <Link onClick={() =>  setTimeout(recargarPagina, 100)} className='buttonResponsive hide' to='/profile'>
                    <div>Profile</div>
                </Link>
                <Link onClick={logoutHanlder} className='buttonResponsive hide' to='/'>
                    <div>Logout</div>
                </Link>
            </>
           : 
            <Link onClick={() =>  setTimeout(recargarPagina, 100)} className='buttonResponsive' to='/questions'>
                <div>Iniciar sesion</div>
            </Link>
          }
        </div>
    </div>
  )
}

export default Menu