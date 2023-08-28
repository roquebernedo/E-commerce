import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Products.scss'


const Products = () => {

  const [products, setProducts] = useState([])


  useEffect(() => {
    const fetchAllProducts = async () => {
        try{
            const res = await axios.get("https://ecommerce-moez.onrender.com/")
            setProducts(res.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllProducts()
  }, [])

  //<Link className='newp' to={`/update/${product.id}`}>Update</Link>

//   const handleDelete = async (id) =>{
//     try{
//         await axios.delete("http://localhost:8000/products/"+id)
//         window.location.reload()
//     }catch(err){
//         console.log(err)
//     }
//   }
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
            {products && products.map(product => (
                <Link to={`/product/${product._id}`} className='product' key={product._id} >
                    <img className='img-product' src={product.image} alt=''/>
                    <div className='title'>{product.title}</div>
                    <span className='price'>${parseFloat(product.price).toFixed(2)}</span>
                    
                </Link>
            ))}
        </div>
        
    </div>
  )
}

export default Products