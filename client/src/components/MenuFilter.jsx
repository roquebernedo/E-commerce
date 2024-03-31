import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/MenuFilter.scss'

const MenuFilter = ({ handleFilter }) => {

  return (
    <div className='menu-Responsive'>
        <div className='buttonsResponsive'>
          <Link className='buttonResponsive'>
            <div onClick={() => handleFilter('Videojuegos')}>Videojuegos</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => handleFilter('Celulares')}>Celulares</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => handleFilter('Computadoras')}>Computadoras</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => handleFilter('Tablets')}>Tablets</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => handleFilter('Audio')}>Audio</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => handleFilter('Consola')}>Consola</div>
          </Link>
        </div>
    </div>
  )
}

export default MenuFilter