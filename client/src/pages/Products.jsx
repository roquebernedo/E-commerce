import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Products.scss'
import { useSelector } from 'react-redux';
import ContentHome from '../components/ContentHome';

const Products = () => {

  const [products, setProducts] = useState([])
  const { userInfo } = useSelector((state) => state.auth)

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

  console.log(products)
  return (
    <div className='main-products'>
        <ContentHome />
        <div className='type-products' id='type-products'>
            <div className='type-left'>
                <Link className='all'>All</Link>
                <Link className='hoodies'>Hoodies</Link>
            </div>
            <div className='type-right'>
                {
                    userInfo ? (
                        <Link className='addnew' to="/add">Add new Product</Link>
                    ):(
                        <div></div>
                    )
                }
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