import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import '../styles/Favorites.scss'
import axios from 'axios';
import { addingToList, removeFavorite } from '../slices/authSlice';
import { FaRegHeart } from "react-icons/fa6";
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin: 0 auto;
  border-color: red;
`;

const Favorites = () => {
    const [products, setProducts] = useState([])
    const { userInfo } = useSelector((state) => state.auth)
    const [productsUserInfo, setProductsUserInfo] = useState([])
    const [productUserList, setProductUserList] = useState([])
    // const [list, setList] = useState()
    const [userWishList, setUserWishList] = useState([]) 
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    console.log(userInfo.wishlist)

    const containerStyles = css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 600px;
    `;

    useEffect(() => {
        setLoading(true)
        axios
          .get("https://e-commerce-f1fr.onrender.com/api/wishlist/list") 
          .then(response => {
            setProducts(response.data)
            setLoading(false)
          })
          .catch(error => {
            console.error("Error fetching wishlist", error)
            setLoading(false)
          })
      
    }, [])
    
    
    console.log(products)
    useEffect(() => {
        if(userInfo){
            const productsUser = products.find(products => products.user.find(u => u.id === userInfo.id))
            setProductsUserInfo(productsUser)
        }
        
    }, [products, setProductsUserInfo, userInfo])
    useEffect(() => {
        if(userInfo){
            if(productsUserInfo){
                console.log(productsUserInfo)
                const productUserWishList = userInfo.wishlist?.find(list => list._id === productsUserInfo._id)
                console.log(productUserWishList)
                setProductUserList(productUserWishList)
            }
        }
        
    }, [products, productsUserInfo, userInfo])
    console.log(productUserList)
    console.log(productsUserInfo)
    useEffect(() => {
        if(userInfo && userInfo.wishlist){
            const userListProducts = userInfo.wishlist?.map(item => item.products.map(pro => pro._id) || [])
            const flatUserList = userListProducts.flat()
            setUserWishList(flatUserList)
            console.log(userListProducts)
            //console.log(userWishList)
        }
    }, [userInfo])
    console.log(userWishList)

    const favorites = (e, id, content) => {
        e.preventDefault()
        //e.stopPropagation()
        console.log(id, content)
        dispatch(addingToList(id, content))
        
    }

    const removeFavoritee = (e, id, content) => {
        e.preventDefault()
        console.log(id)
        console.log(content)
        dispatch(removeFavorite(id, content))
    }


    return (
        <div className={productUserList && productUserList.products && productUserList.products.length > 0 ? 'favorites favorites-alt' : 'favorites'}>
            <div className={productUserList && productUserList.products && productUserList.products.length > 0 ? 'main-favorites main-alt' : 'main-favorites'}>
               
                <div className='favorites-options'>
                    <div className='title-favorites'>Favoritos</div>
                </div>
                {loading 
                    ? (
                        <div className='loader' css={containerStyles}>
                            <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
                        </div>
                      )
                    :   productUserList && productUserList.products && productUserList.products.length > 0
                        ?   <>
                                {productUserList.products.map(products => 
                                    <Link to={`/product/${products._id}`} className='products-favorites-profile'>
                                        <div className='products-favorites-main-profile'>
                                            <div className='product-favorites-img'>
                                                <div className='img-favorites-div'>
                                                    <img alt='favorite-product' className='image-favorites-item' src={products.image} />
                                                </div>
                                            </div>
                                            <div className='product-favorites-info-profile'>
                                                <div className='product-favorites-info-profile-item'>
                                                    <div className='product-favorites-info-left'>
                                                        <div className='product-favorites-info-left-top'>
                                                            <div className='product-favorites-info-name'>{products.title}</div>
                                                        </div>
                                                        <div className='product-favorites-info-left-center'>
                                                            <div className='not-favorites-price'>${`${products.price - 31}.00`}</div>
                                                            <div className='product-favorites-priceoff'>
                                                                <div className='real-favorites-price'>${products.price}.00</div>
                                                                <div className='off-favorites'>25% off</div>
                                                            </div>
                                                        </div>
                                                        <div className='product-favorites-info-left-bottom'>
                                                            <div className='product-favorites-delivery'>Envio gratis</div>
                                                        </div>
                                                    </div>
                                                    <div className='product-favorites-info-right'>
                                                        <div className='product-favorites-info-right-main'>
                                                            {userWishList.includes(products._id) 
                                                                ?   <div className='div-favorites-heart'><div onClick={(e) => removeFavoritee(e, products._id, products)} className='heart-broken-div'><FaHeartBroken className='icon-broken'/><FaHeart className='heart-broken'/></div></div>
                                                                :   <div className='div-favorites-heart'><div onClick={(e) => favorites(e, products._id, products)} className='heart-products-div'><FaRegHeart className='heart-products' /></div></div>
                                                            }
                                                            
                                                            <div className='div-favorites-cart'><IoCartOutline className='cart-favorites-profile' /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </>
                        :   <div className='no-favorites-publications'>Aun no tienes ningun producto favorito</div>
                }
            </div>
        </div>
    )
}

export default Favorites