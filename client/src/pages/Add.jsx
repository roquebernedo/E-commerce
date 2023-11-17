import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/Add.scss'

const Form = ({handle, submit}) => {
  return (
    <form className='menu-add' onSubmit={submit}>
      <h1 className='new-product'>Add New Product</h1>
      <div className='div-product'>Title: </div>
      <input className='title-product' type='text' onChange={handle} name='title'/>
      <div className='div-product'>Description: </div>
      <input className='description-product' type='text' onChange={handle} name='description'/>
      <div className='div-product'>Image: </div>
      <input className='image-product' type='text' name='image' onChange={handle}/>
      <div className='div-product'>Color: </div>
      <input className='color-product' onChange={handle} name='color'/>
      <div className='div-product'>Size: </div>
      <input className='size-product' onChange={handle} name='size'/>
      <div className='div-product'>Material: </div>
      <textarea className='material-product' onChange={handle} name='material'/>
      <div className='div-product'>Instructions: </div>
      <textarea className='instructions-product' onChange={handle} name='instructions'/>
      <div className='div-product'>Price: </div>
      <input className='price-product' type='number' onChange={handle} name='price'/>
      <button className='formButton' type='submit'>Add</button>
    </form>
  )
}

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

  return (
    <div className='form'>
      <Form handle={handleChange} submit={onSubmit} />
    </div>
  )
}

export default Add