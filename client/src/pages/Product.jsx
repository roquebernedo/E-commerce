import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link} from "react-router-dom";
import '../styles/Product.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import { useCookies } from 'react-cookie'
import { useGetUserID } from '../Hooks/useGetUserID'
import { AiOutlineArrowLeft } from "react-icons/ai"

const Product = () => {

  const [product, setProduct] = useState([])
  const location = useLocation();
  const productID = location.pathname.split("/")[2];
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
   // eslint-disable-next-line no-unused-vars
  const [savedProducts, setSavedProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const userID = useGetUserID()
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"])
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://ecommerce-moez.onrender.com/product/${productID}`);
            setProduct(response.data)
        } catch (error) {
            console.log(error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 0);
        }
    };
    
    fetchProduct()
  }, [productID]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='main-product'>
      <div className='top-product'>
            <Link className='link-arrow' to="/"><AiOutlineArrowLeft className='arrow-left' /></Link>
            <div className='product-title'>{product.title}</div>
            {userInfo && 
              <Link to={`/update/${product._id}`} className='product' key={product._id} >Edit</Link>
            }
      </div>
      
      <div className='bottom-product'>
            <div className='left-product'>
                <img className='product-image' alt='' src={product.image} />
            </div>
            <div className='right-product'>
              <div className='right-top'>
                <div className='product-price'>
                  <div className='price'>
                    ${parseFloat(product.price).toFixed(2)}
                  </div>
                </div>
                <div className='product-color'>
                  <div className='color'><strong>Color</strong></div>
                  <div className='coloritem'>{product.color}</div>
                </div>
                <div className='product-size'>
                  <div className='size'><strong>Size</strong></div>
                  <div className='sizeitem'>{product.size}</div>
                </div>
              </div>
              <div className='right-bottom'>
                <div className='details'>
                  <div className='title-details'>Product Details</div>
                  <div className='title-desc'>{product.description}</div>
                </div>
                <div className='list'>
                  <div className='material'><strong>Material: </strong>{product.material}</div>
                  <div className='instructions'><strong>Instructions: </strong>{product.instructions}</div>
                </div>
              </div>
              <div className='adition'>
                  <div className='quantity'>
                    <button className='left but' onClick={()=>setQuantity((prev) => (prev===1 ? 1 : prev - 1))}>-</button>
                    {quantity}
                    <button className='right but' onClick={()=>setQuantity((prev) => prev + 1)}>+</button>
                  </div>
                  <button className='add' onClick={() => dispatch(addToCart({
                    id: product._id,
                    title: product.title,
                    desc: product.description,
                    color: product.color,
                    size: product.size,
                    price: product.price,
                    img: product.image,
                    quantity,
                    }))}>ADD TO CART
                  </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Product