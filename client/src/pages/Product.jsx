import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Product.scss'
import { useNavigate, useLocation } from 'react-router-dom'

const Product = () => {

  
  const [product, setProduct] = useState({
    title:"",
    description:"",
    image:"",
    color:"",
    size:"",
    material:"",
    instructions:"",
    price:"",
  })

  const location = useLocation()
  const productId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://localhost:8802/product/" + productId);
            setProduct(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };
    
    fetchProduct();
  }, [productId]);


  return (
    <div className='main-product'>
        <div className='top-product'>
            <div className='product-title'>{product.title}</div>
        </div>
        <div className='bottom-product'>
            <div className='left-product'>
                <img className='product-image' src={product.image} />
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
            </div>
        </div>
    </div>
  )
}

export default Product