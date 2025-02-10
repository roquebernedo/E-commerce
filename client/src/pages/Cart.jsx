import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from "react-icons/ai"
import '../styles/Cart.scss'
import ButtonPay from '../components/ButtonPay'
import { deletingCart, removeSingleProductUser } from '../slices/authSlice';

function Cart({ setOpen, open }) {
  //const products = useSelector(state => state.cart.products) igual aca, igual que en el Product.jsx
  const { userInfo } = useSelector((state) => state.authReducer)
  console.log(userInfo.productsOnCart)
  const totalPrice = () => {
    let total = 0
    if(userInfo){
      userInfo.productsOnCart.forEach((item) => (total+=item.quantity*item.price))
      return total.toFixed(2)
    }
  }
  // const deleteCarrito = (user) => {
  //   console.log("aca el carrito")

  //   productService
  //     .deleteCart(user.productsOnCart)
  //     .then(response =>{
  //       console.log("entra al deleteCarrito")
  //     })
  // }
  const dispatch = useDispatch()

  return (
    <div className='cart'>
      {userInfo.productsOnCart?.map(product => 
        (
          <div key={product.id} className='itemcart'>
            <img src={product.image} alt='' className='image'/>
            <div className='details'>
              <h1>{product.title?.substring(0,16)}</h1>
              <div>{product.description?.substring(0, 22)}</div>
              <div className='price'>{product.quantity} x ${product.price}</div>
              <div className='between'>
                <div>${product.quantity * product.price}</div>  
                <AiFillDelete className='delete' onClick={() => dispatch(removeSingleProductUser(product.id))}/>
              </div>   
            </div>
          </div>
        ))}
        
      <div className='total'>
        <div className='total-sub'>Subtotal: </div>
        <div className='total-sub'>${totalPrice()}</div>
      </div>
      
      <div className='buttons-cart'>
        <Link onClick={() => {dispatch(deletingCart(userInfo)); setOpen(!open)}} className='reset common-button-styles'>RESET CART</Link>
        <ButtonPay cartItems={userInfo.productsOnCart}/>
        <Link onClick={() => setOpen(!open)} className='link-arrow common-button-styles' to="/cart">VIEW CART</Link>
      </div>
    </div>
  )
}

export default Cart