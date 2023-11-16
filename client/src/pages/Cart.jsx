import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from "react-icons/ai"
import { removeItem, resetCart } from '../redux/cartReducer'
import '../styles/Cart.scss'
import ButtonPay from './ButtonPay'

function Cart() {
  
  const products = useSelector(state => state.cart.products)
  
  const totalPrice = () => {
    let total = 0
    products.forEach((item) => (total+=item.quantity*item.price))
    return total.toFixed(2)
  }
  
  const dispatch = useDispatch()

  return (
    <div className='cart'>
      {products?.map(product => 
        (
          <div key={product.id} className='itemcart'>
            <img style={{ width: '100px', height: '100px'}} src={product.img} alt='' className='image'/>
            <div className='details'>
              <h1>{product.title.substring(0,16)}</h1>
              <div>{product.desc?.substring(0, 22)}</div>
              <div className='price'>{product.quantity} x ${product.price}</div>
              <div className='between'>
                <div>${product.quantity * product.price}</div>  
                <AiFillDelete className='delete' onClick={() => dispatch(removeItem(product.id))}/>
              </div>   
            </div>
          </div>
        ))}
        
      <div className='total'>
        <div className='total-sub'>Subtotal: </div>
        <div className='total-sub'>${totalPrice()}</div>
      </div>
      
      <div className='buttons-cart'>
        <Link onClick={() => dispatch(resetCart())} className='reset'>RESET CART</Link>
        <ButtonPay cartItems={products}/>
        <Link className='link-arrow' to="/shopping">VIEW CART</Link>
      </div>
    </div>
  )
}

export default Cart