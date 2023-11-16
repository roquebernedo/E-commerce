import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/Add.scss'


const Update = () => {
   // eslint-disable-next-line no-unused-vars
  const [productData, setProductData] = useState([]);
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
  

  const navigate = useNavigate()
  const location = useLocation()
  const productId = location.pathname.split("/")[2]
 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        //const response = await axios.get("https://ecommerce-vv1c.onrender.com/products/" + productId);
        const response = await axios.get("https://ecommerce-vv1c.onrender.com/product/" + productId);
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

  const handleClick = async e => { // si se hace api request se usa "async"
    e.preventDefault() // previene que se actualice
    try{
        //await axios.put("https://ecommerce-vv1c.onrender.com/products/"+ productId, product)
        await axios.put("https://ecommerce-vv1c.onrender.com/products/"+ productId, product)
        navigate("/")// sirve para navegar por el homepage
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className='form'>
      <div className='menu-add'>
        <h1 className='new-product'>Add New Product</h1>
        <div className='div-product'>Title: </div>
        <input className='title-product' type='text' onChange={handleChange} name='title' value={product.title}/>
        <div className='div-product'>Description: </div>
        <input className='description-product' type='text' onChange={handleChange} name='description' value={product.description}/>
        <div className='div-product'>Image: </div>
        <input className='image-product' type="text" onChange={handleChange} name='image' value={product.image}/>
        <div className='div-product'>Color: </div>
        <input className='color-product' onChange={handleChange} name='color' value={product.color}/>
        <div className='div-product'>Size: </div>
        <input className='size-product' onChange={handleChange} name='size' value={product.size}/>
        <div className='div-product'>Material: </div>
        <textarea className='material-product' onChange={handleChange} name='material' value={product.material}/>
        <div className='div-product'>Instructions: </div>
        <textarea className='instructions-product' onChange={handleChange} name='instructions' value={product.instructions}/>
        <div className='div-product'>Price: </div>
        <input className='price-product' type='number' onChange={handleChange} name='price' value={product.price}/>
        <button className='formButton' onClick={handleClick}>Add</button>
      </div>
    </div>
  )
}

export default Update