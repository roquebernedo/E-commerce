import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link} from "react-router-dom";
import '../styles/Product.scss'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useGetUserID } from '../Hooks/useGetUserID'
import { AiOutlineArrowLeft } from "react-icons/ai"

const Product = () => {

  
  // const [product, setProduct] = useState({
  //   title:"",
  //   description:"",
  //   image:"",
  //   color:"",
  //   size:"",
  //   material:"",
  //   instructions:"",
  //   price:"",
  // })

  const [product, setProduct] = useState([])
  const location = useLocation();
  const productID = location.pathname.split("/")[2];
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)
  const [quantity, setQuantity] = useState(1)
  const [savedProducts, setSavedProducts] = useState([])
  //const products = useSelector(state => state.cart.products)
  //console.log(products.title)
  const userID = useGetUserID()
  const [cookies, _] = useCookies(["access_token"])

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/product/${productID}`);
            setProduct(response.data)
            console.log("holi")
        } catch (error) {
            console.log(error);
        }
    };
    
    fetchProduct();
  }, [productID]);

  const saveProduct = async (productID) => {
    try{
      const response = await axios.put("http://localhost:8000/saved", { 
        productID, userID}, 
        { headers: { authorization : cookies.access_token}})
      setSavedProducts(response.data.savedRecipes)
    }catch(err){
      console.error(err)
    }
  }

  const isProductSaved = (id) => savedProducts.includes(id) 


  return (
    <div className='main-product'>
      <div className='top-product'>
            <Link className='link-arrow' to="/"><AiOutlineArrowLeft className='arrow-left' /></Link>
            <div className='product-title'>{product.title}</div>
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
                    price: product.price,
                    img: product.image,
                    quantity,

                  }))}>ADD TO CART</button>
              </div>
              <div>
                  <button onClick={() => saveProduct(product._id)} disabled={isProductSaved(product._id)}>
                    {isProductSaved(product._id) ?  "Saved" : "Save"}
                  </button>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Product