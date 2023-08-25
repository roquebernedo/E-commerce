import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from "react-icons/ai"
import { removeItem, resetCart } from '../redux/cartReducer'
import '../styles/Cart.scss'
import ButtonPay from './ButtonPay'


function Cart() {
  console.log("hola")
  const products = useSelector(state => state.cart.products)
  
  const totalPrice = () => {
    let total = 0
    products.forEach(item => total = total + (item.quantity*item.price))
    return total.toFixed(2)
  }
  const dispatch = useDispatch()

  return (
    <div className='cart'>
      {products?.map(product => 
        (
          <div key={product._id} className='item'>
            <img style={{ width: '100px', height: '100px'}} src={product.img} alt='' className='image'/>
            <div className='details'>
              <h1>{product.title}</h1>
              <div>{product.desc.substring(0, 22)}</div>
              <div className='price'>{product.quantity} x ${product.price}</div>
              <div>${totalPrice()}</div>  
              <AiFillDelete className='delete' onClic k={() => dispatch(removeItem(product.id))}/>
              <ButtonPay cartItems={products}/>
            </div>
          </div>
        ))}
        
      <div className='total'>
        <div>Subtotal: ${totalPrice()}</div>
      </div>
      
      <div onClick={() => dispatch(resetCart())} className='reset'>Reset Cart</div>
      <Link className='link-arrow' to="/shopping">View Cart</Link>
    </div>
  )
}

export default Cart