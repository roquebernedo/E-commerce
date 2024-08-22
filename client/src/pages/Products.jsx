import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Products.scss'
import { useDispatch, useSelector } from 'react-redux';
import ContentHome from '../components/ContentHome';
// import wishlistService from '../services/wishlist';
// import productService from '../services/product';
import { getNotification, initializeUsers } from '../slices/authSlice';

const Products = ({ buttonsFromHome, setButtonsFromHome }) => {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [wishlist, setWishlist] = useState()
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  // https://ecommerce-moez.onrender.com/ -> ESTE ES EL SERVER
  useEffect(() => {
    const fetchAllProducts = async () => {
        try{
            const res = await axios.get("https://e-commerce-f1fr.onrender.com")
            setProducts(res.data)
        }catch(err){
            console.log(err)  
        }
    }
    fetchAllProducts()
  }, [])
  
  useEffect(() => {
    if(userInfo){
      console.log("entro a este console")
      dispatch(getNotification())
    }
    dispatch(initializeUsers());
            // Suponiendo que devuelve una Promise
          // Recargar la página solo después de que el dispatch se resuelva
         
      
    
  }, [userInfo, dispatch])

  //console.log(wishlist)

  return (
    <>
    <div className='main-products'>
        <ContentHome buttonsFromHome={buttonsFromHome} setButtonsFromHome={setButtonsFromHome} />
    </div>
    </>
  )
}

export default Products