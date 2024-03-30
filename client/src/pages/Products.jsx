import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Products.scss'
import { useSelector } from 'react-redux';
import ContentHome from '../components/ContentHome';

const Products = ({ buttonsFromHome, setButtonsFromHome }) => {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const { userInfo } = useSelector((state) => state.auth)
  
    // https://ecommerce-moez.onrender.com/ -> ESTE ES EL SERVER
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

 
  return (
    <>
    <div className='main-products'>
        <ContentHome buttonsFromHome={buttonsFromHome} setButtonsFromHome={setButtonsFromHome} />
    </div>
    </>
  )
}

export default Products