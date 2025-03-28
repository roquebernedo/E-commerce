import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link} from "react-router-dom";
import '../styles/Product.scss'
import { useDispatch, useSelector } from 'react-redux';
//import { addToCart, createProduct, createProductCart } from '../redux/cartReducer';
import { useCookies } from 'react-cookie'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import { createProductCart, updateQuantityy } from '../slices/authSlice';

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin: 0 auto;
  border-color: red;
`;

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
  const [cookies, _] = useCookies(["access_token"])
  const { userInfo } = useSelector((state) => state.authReducer)
  console.log(userInfo)
  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://e-commerce-f1fr.onrender.com/product/${productID}`);
            //https://e-commerce-f1fr.onrender.com
            setProduct(response.data)
        } catch (error) {
            console.log(error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
    };
    
    fetchProduct()
  }, [productID]);
  console.log(product)
  const containerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;
  
  //console.log(userUpdate)
  // const addingOrIncreasing = (id) => {
  //   const userUpdate = userInfo.productsOnCart.find(find => find.id === id)
  //   console.log(userUpdate)
  //   console.log(id)
  //   console.log(quantity)
  //   if(userUpdate){
  //     const quantityAdd = userUpdate.quantity + quantity
  //     console.log("Despachando updateQuantity con:", id, quantity);
  //     console.log("si entra al quantity")
  //     console.log(quantityAdd)
  //     dispatch(updateQuantity(id, quantity))
  //     console.log("llego aqui")
  //   }else{
  //     dispatch(createProductCart({
  //       id: product._id,
  //       title: product.title,
  //       description: product.description,
  //       price: product.price,
  //       image: product.image,
  //       quantity
  //     }))
  //   }
  // }

  const addingOrIncreasingg = (product) => {
    //console.log(product)
    const userUpdate = userInfo.productsOnCart.find(find => find.id === product._id)
    console.log(userUpdate)
    if(userUpdate){
      dispatch(updateQuantityy({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        buyer: userInfo.id,
        quantity
      }))
    }else{
      dispatch(createProductCart({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        buyer: userInfo.id,
        quantity
      }))
    }
  }
  
  return (
    <div className='main-product-container'>
      {loading ? 
        (
          <div className='loader' css={containerStyles}>
            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
          </div>
        ):(
          <>
        <div className='top-product'>
              <Link className='link-arrow' to="/results"><AiOutlineArrowLeft className='arrow-left' /></Link>
              <div className='product-title'>{product.title}</div>
              {userInfo && 
                <Link to={`/update/${product._id}`} className='product' key={product._id} >Edit</Link>
              }
        </div>
        
        <div className='bottom-product'>
              <div className='left-product'>
                  <div className='image-container'>
                    <img className='product-image' alt='' src={product.image} />
                  </div>
                  <div className='images'>
                    <div className='mini-images'>
                      <img className='img-mini' src={product.image} alt=''/>
                    </div>
                  </div>
              </div>
              <div className='right-product'>
                <div className='right-top'>
                  <div className='product-price'>
                    <div className='price'>
                      ${parseFloat(product.price).toFixed(2)}
                    </div>
                  </div>
                  <div className='product-color'>
                    <div className='color'>Marca: {product.brand}</div>
                    <div className='coloritem'>Name: {product.title}</div>
                  </div>
                  <div className='product-size'>
                    <div className='size'>Vendedor <strong>Dirstore</strong></div>
                    <div className='sizeitem'>Stock: {product.stock}</div>
                  </div>
                </div>
                <div className='right-bottom'>
                  <div className='details'>
                    <div className='title-details'>Caracteristicas Principales</div>
                    <div className='title-desc'>{product ? product.main_features?.map(product => product) : ''}</div>
                  </div>
                  <div className='list'>
                    <div className='material'><strong>Categoria: </strong>{product.category}</div>
                    <div className='instructions'><strong>Descripcion: </strong>{product.description}</div>
                  </div>
                </div>
                <div className='adition'>
                    <div className='quantity'>
                      <button className='left but' onClick={()=>setQuantity((prev) => (prev===1 ? 1 : prev - 1))}>-</button>
                      {quantity}
                      <button className='right but' onClick={()=>setQuantity((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='add' disabled={userInfo === null} onClick={() => addingOrIncreasingg(product)} >ADD TO CART
                    </button>
                </div>
              </div>
          </div>
          </>
        )
      }
    </div>
  )
}

export default Product