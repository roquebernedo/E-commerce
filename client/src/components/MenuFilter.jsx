import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/MenuFilter.scss'

const MenuFilter = ({ handleFilter, setOpenMenu }) => {
  return (
    <div className='menu-Responsive'>
        <div className='buttonsResponsive'>
          <Link className='buttonResponsive'>
            <div onClick={() => {handleFilter('Videojuegos'); setOpenMenu(false)}}>Videojuegos</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => {handleFilter('Celulares'); setOpenMenu(false)}}>Celulares</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => {handleFilter('Computadoras'); setOpenMenu(false)}}>Computadoras</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => {handleFilter('Tablets'); setOpenMenu(false)}}>Tablets</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => {handleFilter('Audio'); setOpenMenu(false)}}>Audio</div>
          </Link>
          <Link className='buttonResponsive'>
            <div onClick={() => {handleFilter('Consola'); setOpenMenu(false)}}>Consola</div>
          </Link>
        </div>
    </div>
  )
}

export default MenuFilter