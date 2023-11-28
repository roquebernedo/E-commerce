import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { AiOutlineShoppingCart } from "react-icons/ai"
import Cart from '../pages/Cart';
import { AiOutlineMenu } from "react-icons/ai"

const Navbar = () => {

  const { userInfo } = useSelector((state) => state.auth)
  const products = useSelector(state => state.cart.products)
  const [ logoutApiCall ] = useLogoutMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const logoutHanlder = async () => {
    try{
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  function handleScroll(page) {
    const skillsSection = document.getElementById(page);
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='navbar'>
      <div className='menu'>
            { userInfo ? (
              <div className='log-reg'>
                <Link className='sign profile' to='/profile'>
                  Profile
                </Link>
                <Link className='sign' onClick={logoutHanlder}>
                  Logout
                </Link>
              </div>
            ) : (
              <div className='log-reg'>
                <Link className='sign in' to='/login'>
                  <div>Sign In</div>
                </Link>
                <Link className='sign up' to='/register'>
                  <div>Sign Up</div>
                </Link>
                
              </div>
            )}
            <div className='title'>
              <h1 className='mainTitle'>Dirsley</h1>
              <div className='secondaryTitle'>Store</div>
            </div>
            <div className='button-icon'>
              <div className='buttons'>
                <Link className='itemsMenu' to='/'><div>Home</div></Link>
                <Link className='itemsMenu' onClick={() => handleScroll('footer')}><div>About</div></Link>
                <Link className='itemsMenu' onClick={() => handleScroll('type-products')}><div>Shop</div></Link>
                <Link className='menu-responsive'><AiOutlineMenu /></Link>
              </div>
              <div className='cartIcon' onClick={() => setOpen(!open)}>
                  <AiOutlineShoppingCart className='car'/>
                  <span className='number'>{products.length}</span>
              </div>
            </div>
      </div>
      {open && <Cart/>}
    </div>
  )
}

export default Navbar