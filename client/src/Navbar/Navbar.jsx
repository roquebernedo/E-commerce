import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { AiOutlineShoppingCart } from "react-icons/ai"
import Cart from '../pages/Cart';
import { AiOutlineArrowLeft } from "react-icons/ai"



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

  return (
    <div className='navbar'>
        <div className='menu '>
            { userInfo ? (
              <div className='log-reg'>
                <Link className='link-arrow' to="/"><AiOutlineArrowLeft className='arrow-left' /></Link>
                <Link className='sign profile' to='/profile'>
                  Profile
                </Link>
                <button className='logout' onClick={logoutHanlder}>
                  Logout
                </button>
              </div>
            ) : (
              <div className='log-reg'>
                <Link className='sign' to='/login'>
                  <FaSignInAlt /> <div>Sign In</div>
                </Link>
                <Link className='sign' to='/register'>
                  <FaSignOutAlt /> <div>Sign Up</div>
                </Link>
                
              </div>
            )}
            <div className='cartIcon' onClick={() => setOpen(!open)}>
                  <AiOutlineShoppingCart/>
                  <span className='number'>{products.length}</span>
            </div>
            
        </div>
        {open && <Cart/>}
    </div>
  )
}

export default Navbar