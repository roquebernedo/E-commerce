import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from "react-icons/ai"
import '../styles/ShoppingCart.scss'
import { removeItem, decreaseItem } from '../redux/cartReducer'
import { addToCart } from '../redux/cartReducer';
import ButtonPay from './ButtonPay';

const ShoppingCart = () => {


  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1)
  const location = useLocation();
  const productID = location.pathname.split("/")[2];
  const products = useSelector(state => state.cart.products)
  
  const totalPrice = () => {
    let total = 0
    products.forEach(item => total = total + (item.quantity*item.price))
    return total.toFixed(2)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://ecommerce-moez.onrender.com/product/${productID}`);
            setProduct(response.data)
            console.log("holi")
        } catch (error) {
            console.log(error);
        }
    };
    
    fetchProduct();
  }, [productID]);

  const LessQuantity = () => {
    setQuantity((prev) => (prev===1 ? 1 : prev - 1))
    dispatch(decreaseItem({
      id: product._id,
      title: product.title,
      desc: product.description,
      color: product.color,
      size: product.size,
      price: product.price,
      img: product.image,
      quantity,
    }))
  };

  const MoreQuantity = () => {
    setQuantity((prev) => (prev===1 ? 1 : prev + 1))
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      desc: product.description,
      color: product.color,
      size: product.size,
      price: product.price,
      img: product.image,
      quantity,
    }))
  }

  return (
    <div className='main-product'>
      <div className='top-product'>
            <Link className='link-arrow' to="/"><AiOutlineArrowLeft className='arrow-left' /></Link>
            <div className='product-title'>Cart</div>
      </div>
      <div className='items'>
      {products?.map(product => 
        (
          <div className='items-info'>
            <div key={product._id} className='item'>
              <img src={product.img} alt='' className='image'/>
              <div className='details'>
                <h1>{product.title}</h1>
                <div className='color-size'>{product.color} / {product.size}</div>
                <Link className='delete' onClick={() => dispatch(removeItem(product.id))}>Remove</Link>
              </div>
              <div className='quantity'>
                  <button className='left but' onClick={LessQuantity}>-</button>
                  {product.quantity}
                  <button className='right but' onClick={MoreQuantity}>+</button>
                
              </div>
              <div className='price'>${totalPrice()}</div>
            </div>
          </div>
        ))}
          
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
              
              <ButtonPay cartItems={products}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ShoppingCart