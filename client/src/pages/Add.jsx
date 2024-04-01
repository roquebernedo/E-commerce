import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/Add.scss'

const Form = ({handle, submit, product, handleIngredientChange, handleAddIngredient}) => {
  return (
    <form className='menu-add' onSubmit={submit}>
      <div className='new-product-div'>
        <h1 className='new-product'>Add New Product</h1>
      </div>
      <div className='div-product'>Title: </div>
      <input className='title-product' type='text' onChange={handle} name='title'/>

      <div className='div-product'>Description: </div>
      <input className='description-product' type='text' onChange={handle} name='description'/>

      <div className='div-product'>Brand: </div>
      <input className='brand-product' type='text' name='brand' onChange={handle}/>

      <div className='div-product'>Category: </div>
      <input className='category-product' onChange={handle} name='category'/>

      <div className='div-product'>Stock: </div>
      <input className='color-product' onChange={handle} name='stock'/>

      <div className='div-product' htmlFor="main_features">Main Features</div>
        {product.main_features.map((ingredient, index) => (
          <input
            className='input-main-features'
            key={index}
            type="text"
            name="main_features"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button className='button-main' type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>

      <div className='div-product'>Image: </div>
      <input className='image-product' onChange={handle} name='image'/>

      <div className='div-product'>Price: </div>
      <input className='price-product' type='number' onChange={handle} name='price'/>

      <div className='div-product'>Discount: </div>
      <input className='price-product' type='number' onChange={handle} name='discount'/>

      <div className='div-product'>Date: </div>
      <input className='price-product' type='text' onChange={handle} name='date'/>
      <button className='formButton' type='submit'>Add</button>
    </form>
  )
}

const Add = () => {

  const [product, setProduct] = useState({
    title:"",
    description:"",
    brand:"",
    category:"",
    stock:"",
    main_features: [],
    price: "",
    discount: "",
    date: "",
    image:"",
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

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const main_features = [...product.main_features];
    main_features[index] = value;
    setProduct({ ...product, main_features });
  };

  const handleAddIngredient = () => {
    const main_features = [...product.main_features, ""];
    setProduct({ ...product, main_features });
  };

  return (
    <div className='form'>
      <Form handle={handleChange} submit={onSubmit} product={product} handleAddIngredient={handleAddIngredient} handleIngredientChange={handleIngredientChange}/>
    </div>
  )
}

export default Add