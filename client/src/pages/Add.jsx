import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/Add.scss'
import { useCookies } from 'react-cookie'
import { useGetUserID } from '../Hooks/useGetUserID'

const Add = () => {

  const [imageUrl, setImageUrl] = useState('');
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
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserID()
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"])

  const navigate = useNavigate()

  const handleChange = (e) => {
    setProduct(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
        await axios.post("http://localhost:8000/products", product)
        navigate('/')
      } catch (error) {
        console.log(error);
    }
  }

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const saveRecipe = async (productID) => {
    try{
      const response = await axios.put("https://react-recipe-afru.onrender.com/recipes", { 
        productID, userID}, 
        { headers: { authorization : cookies.access_token}})
      setSavedRecipes(response.data.savedRecipes)
    }catch(err){
      console.error(err)
    }
  }
  console.log(saveRecipe)

  const isRecipeSaved = (id) => savedRecipes.includes(id) 
  console.log(isRecipeSaved)

  return (
    <div className='form'>
      <div className='menu-add'>
        <h1 className='new-product'>Add New Product</h1>
        <div className='div-product'>Title: </div>
        <input className='title-product' type='text' onChange={handleChange} name='title'/>
        <div className='div-product'>Description: </div>
        <input className='description-product' type='text' onChange={handleChange} name='description'/>
        <div className='div-product'>Image: </div>
        <input className='image-product' type="text" onChange={handleUrlChange} value={imageUrl} name='image'/>
        {imageUrl && <div className='divURL'><img className='imgURL' src={imageUrl} alt="Selected" /></div>}
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
        <button className='formButton' onClick={handleClick}>Add</button>
        
      </div>
    </div>
  )
}

export default Add