import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/Add.scss'

const Add = () => {

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

  const handleChange = (e) => {
    setProduct(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const onSubmit = async e => {
    e.preventDefault()
    try{
        await axios.post("https://ecommerce-moez.onrender.com/add", product)
        navigate("/")
      } catch (error) {
        console.log(error);
    }
  }


  //<input className='image-product' type="text" onChange={handleUrlChange} value={imageUrl} name='image'/>
  //{imageUrl && <div className='divURL'><img className='imgURL' src={imageUrl} alt="Selected" /></div>}

  return (
    <div className='form'>
      <form className='menu-add' onSubmit={onSubmit}>
        <h1 className='new-product'>Add New Product</h1>
        <div className='div-product'>Title: </div>
        <input className='title-product' type='text' onChange={handleChange} name='title'/>
        <div className='div-product'>Description: </div>
        <input className='description-product' type='text' onChange={handleChange} name='description'/>
        <div className='div-product'>Image: </div>
        <input className='image-product' type='text' name='image' onChange={handleChange}/>
        <div className='div-product'>Color: </div>
        <input className='color-product' onChange={handleChange} name='color'/>
        <div className='div-product'>Size: </div>
        <input className='size-product' onChange={handleChange} name='size'/>
        <div className='div-product'>Material: </div>
        <textarea className='material-product' onChange={handleChange} name='material'/>
        <div className='div-product'>Instructions: </div>
        <textarea className='instructions-product' onChange={handleChange} name='instructions'/>
        <div className='div-product'>Price: </div>
        <input className='price-product' type='number' onChange={handleChange} name='price'/>
        <button className='formButton' type='submit'>Add</button>
        
      </form>
    </div>
  )
}

export default Add