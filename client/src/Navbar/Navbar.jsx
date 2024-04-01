import React from 'react'
import { useSelector } from 'react-redux';
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai"
import Cart from '../pages/Cart';
import { AiOutlineMenu } from "react-icons/ai"
import '../styles/ContentHome.scss'
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Menu from '../components/Menu';

const Navbar = ({ filter, setFilter }) => {
  // const [filter, setFilter] = useState([])
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const { userInfo } = useSelector((state) => state.auth)
  const products = useSelector(state => state.cart.products)
  const totalProducts = products.reduce((a,b) => a + b.quantity, 0)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()

  const logoutHanlder =  () => {
      window.localStorage.clear()
      window.location.reload();
  }

  useEffect(() => {
    axios
      .get("https://ecommerce-moez.onrender.com/")
      .then(response => {
        setRates(response.data)
      })
  
  }, [])

  const filtering = (event) => {
    event.preventDefault()
    
    if (rates.length > 0) { 
      if(value === ''){
        console.log("funciona")
        setFilter([])
        
      }else{
        console.log("aca tambien")
        const filtered = rates.filter(person => person.title.toLowerCase().includes(value));
        console.log(filtered);
        setFilter(filtered);
        navigate('/results')
      }
    }
    setValue('')
  }

  function recargarPagina() {
    window.location.reload();
  }

  const handleMenu = () => {
    if(openMenu === true){
      setOpenMenu(false)
    }else{
      setOpenMenu(true)
    }
  }

  return (
    <header className='navbar'>
      <div className='menu'>
        <div className='title'>
          <Link className='mainTitle' to='/' >DirStore</Link>
        </div>
        <div className='button-icon'>
          <div className='button-icon-container'>
            <form className='form' onSubmit={filtering}>
              <input type='text' className='button-input' placeholder='Buscar un producto' value={value} onChange={(event) => setValue(event.target.value)}/>
             <button className='button-submit' type='submit'><FaSearch /></button>
            </form>
          </div>
        </div>
        { userInfo ? (
          <div className='log-reg'>
            <Link className='sign profile-navbar' to='/profile'>
              <svg className='svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" role="presentation" alt="" data-testid="UserIcon" size="18" color="currentColor"><path d="M16.22 19.41A9.71 9.71 0 1 1 26 9.7a9.74 9.74 0 0 1-9.8 9.71M1.84 32a10.88 10.88 0 0 1 10.94-10.74h6.57A10.88 10.88 0 0 1 30.29 32H1.84" fill="currentColor"></path></svg>
              <div className='userinfo'>{userInfo.name}</div>
            </Link>
            <Link className='sign log' onClick={logoutHanlder}>
              <MdLogout className='logout'/>
              <div className='logoutuser'>Logout</div>
            </Link>
            <div className='cartIcon' onClick={() => setOpen(!open)}>
              <AiOutlineShoppingCart className='car'/>
              <span className='number'>{totalProducts}</span>
            </div>
            <div className='buttons' onClick={handleMenu}>
              <AiOutlineMenu className='menu-responsive' />
            </div>
          </div>
        ) : (
          <div className='log-reg'>
            <Link className='sign-in' to='/login'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" role="presentation" alt="" data-testid="UserIcon" size="18" color="currentColor"><path d="M16.22 19.41A9.71 9.71 0 1 1 26 9.7a9.74 9.74 0 0 1-9.8 9.71M1.84 32a10.88 10.88 0 0 1 10.94-10.74h6.57A10.88 10.88 0 0 1 30.29 32H1.84" fill="currentColor"></path></svg>
              <div className='iniciarsesion'>Iniciar sesion</div>
              <div className='iniciar-registrar'>Iniciar sesion / Registrarse</div>
            </Link>
            <div className='buttons' onClick={handleMenu}>
              <AiOutlineMenu className='menu-responsive' />
            </div>
            {/* <Link className='sign up' to='/register'>
              <div>Sign Up</div>
            </Link>     */}
          </div>
        )}
      </div>
      {openMenu && <Menu handle={() => setOpenMenu(false)} />}
      {open && <Cart setOpen={setOpen} open={open} />}
      <div className='menu-buttons-container'>
        <div className='menu-buttons'>
          <Link className='submenu home' onClick={() =>  setTimeout(recargarPagina, 100)} to='/'>
            <div>Home</div>
          </Link>
          <Link to='/results' className='submenu shop'>
            <div>Tienda</div>
          </Link>
          <Link to='/us' className='submenu us' >
            <div>Nosotros</div>
          </Link>
          <Link to='/questions' className='submenu questions'>
            <div>Preguntas Frecuentes</div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar