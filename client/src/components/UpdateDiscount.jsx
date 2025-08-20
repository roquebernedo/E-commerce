import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/Add.scss'
import { useDispatch } from 'react-redux'
import { setAddingDiscount } from '../slices/authSlice'


const UpdateDiscount = () => {
   // eslint-disable-next-line no-unused-vars
  const [productData, setProductData] = useState([]);
  const [product, setProduct] = useState({
    
    discount:"",
   
  })
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const productId = location.pathname.split("/")[2]
  console.log(productId)
  useEffect(() => {
    const fetchProduct = async () => {
      try { 
        const response = await axios.get("https://e-commerce-f1fr.onrender.com/product/" + productId);
        setProductData(response.data);
        setProduct(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct(prev=>({...prev, [e.target.name]: e.target.value}))
  } 
  console.log(product)
  const handleClick = (id, discount) => { // si se hace api request se usa "async"
     // previene que se actualice
    console.log("hola")
    console.log(id)
    console.log(discount)
    dispatch(setAddingDiscount(id, discount))
    // try{
    //     await axios.put("http://localhost:8000/addingDiscount/"+ productId, product)
    //     console.log("llega")
    //     navigate("/")// sirve para navegar por el homepage
    // }catch(err){
    //     console.log(err)
    // }
  }

  return (
    <div className='form  '>
      <div className='menu-add'>
        <div className='edit-product-container'>
          <h1 className='new-product'>Eddit Product</h1>  
        </div>
        <div className='container-info'>
          
          <div className='div-product'>Discount: </div>
          <input className='size-product' type='number' onChange={handleChange} name='discount' value={product.discount}/>
          {/* <label htmlFor="main_features">Main Features</label> */}
          <button className='formButton' onClick={() => handleClick(product._id, product.discount)}>Edit</button>
        </div>
        
        {/* <div className='div-product'>Color: </div>
        <input className='color-product' onChange={handleChange} name='color' value={product.color}/>
        <div className='div-product'>Size: </div>
        <input className='size-product' onChange={handleChange} name='size' value={product.size}/>
        <div className='div-product'>Material: </div>
        <textarea className='material-product' onChange={handleChange} name='material' value={product.material}/>
        <div className='div-product'>Instructions: </div>
        <textarea className='instructions-product' onChange={handleChange} name='instructions' value={product.instructions}/>
        <div className='div-product'>Price: </div>
        <input className='price-product' type='number' onChange={handleChange} name='price' value={product.price}/>
        <button className='formButton' onClick={handleClick}>Edit</button> */}
      </div>
    </div>
  )
}

export default UpdateDiscount