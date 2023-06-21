import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Products.scss'

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchAllProducts = async () => {
        try{
            const res = await axios.get("https://ecommerce-vv1c.onrender.com/products")
            setProducts(res.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllProducts()
  }, [])

  const handleDelete = async (id) =>{
    try{
        await axios.delete("https://ecommerce-vv1c.onrender.com/products/"+id)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
  }
  //<button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
  return (
    <div className='main-products'>
        <div className='type-products'>
            <div className='type-left'>
                <Link className='all'>All</Link>
                <Link className='hoodies'>Hoodies</Link>
            </div>
            <div className='type-right'>
                <Link className='addnew' to="/add">Add new Product</Link>
            </div>
        </div>
        <div className='products'>
            {products.map(product => (
                <Link to={`/product/${product.id}`} className='product' key={product.id} >
                    <img className='img-product' src={product.image} alt=''/>
                    <div className='title'>{product.title}</div>
                    <span className='price'>${parseFloat(product.price).toFixed(2)}</span>
                    <Link className='newp' to={`/update/${product.id}`}>Update</Link>
                </Link>
            ))}
        </div>
        
    </div>
  )
}

export default Products