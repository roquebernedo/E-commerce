import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from "react-icons/ai"
import '../styles/ShoppingCart.scss'
//import { decreaseItem, removeItem, increaseItem } from '../redux/cartReducer'
import ButtonPay from '../components/ButtonPay';
import { decreaseQuantityProduct, increaseQuantityProduct, removeSingleProductUser } from '../slices/authSlice';

const ShoppingCart = () => {

  const { userInfo } = useSelector((state) => state.auth)
  //console.log(userInfo)
  
  const totalPrice = () => {
    let total = 0 
    if(userInfo){
      userInfo.productsOnCart.forEach((item) => (total+=item.quantity*item.price))
      return total.toFixed(2)
    }
  }

  const dispatch = useDispatch()

  return (
    <div className='main-product-cart'>
      <div className='top-product'>
          <Link className='link-arrow' to="/"><AiOutlineArrowLeft className='arrow-left' /></Link>
          <div className='product-title'>Cart</div>
      </div>
      <div className='items'>
        <div className='items-container'>
          {userInfo ? (
            userInfo.productsOnCart.length > 0 ? userInfo.productsOnCart?.map(product =>(
              <div key={product.id} className='items-info'>
                <div className='item'>
                  <img src={product.image} alt='' className='image'/>
                  <div className='details'>
                    <h1>{product.title}</h1>
                    <div className='color-size'>{product.brand}</div>
                    <Link className='delete' onClick={() => dispatch(removeSingleProductUser(product.id))}>Remove</Link>
                  </div>
                  <div className='quantity-price' key={product.id}>
                    <div className='quantity'>
                      <button className='left but' onClick={() => dispatch(decreaseQuantityProduct(product))}>-</button>
                      <div className='quan'>{product.quantity}</div>
                      <button className='right but' onClick={() => dispatch(increaseQuantityProduct(product))}>+</button>
                    </div>
                    <div className='price'>${product.quantity * product.price}</div>
                  </div>
                </div>
              </div>
            )) : <div className='blank'></div>
          ) : <div className='blank'></div>}
        </div>
      
        <div className='subtotal'>
          <div className='summary'>
            <div className='ord-sum'>Order Summary</div>
            <div className='subprice'>
              <div className='subtot'>Subtotal</div>
              <div className='totprice'>${totalPrice()}</div>
            </div>
          </div>
          <div className='tot'>
            <div className='tot-total'>Total:</div>
            <div className='tot-price'>${totalPrice()}</div>
          </div>
          <div className='checkout-tot'>
            <ButtonPay cartItems={userInfo && userInfo.productsOnCart}/>
          </div>
          <div className='address'>Añade una direccion para continuar!</div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart