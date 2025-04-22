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
    const { userInfo } = useSelector((state) => state.authReducer)
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
            const productsUser = products.find(products => products.user.find(u => u.id === (!userInfo.isGoogleUser ? userInfo.id : userInfo._id)))
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
                                    <Link key={products._id} to={`/product/${products._id}`} className='products-favorites-profile'>
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
                                                            <div className='not-favorites-price'>${`${products.price}.00`}</div>
                                                            <div className='product-favorites-priceoff'>
                                                                <div className='real-favorites-price'>${products.price-(products.price * 0.25)}</div>
                                                                <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000000" className="onsale-svg"><path fillRule="evenodd" d="M12.185 21.5c4.059 0 7.065-2.84 7.065-6.75 0-2.337-1.093-3.489-2.678-5.158l-.021-.023c-1.44-1.517-3.139-3.351-3.649-6.557a6.14 6.14 0 00-1.911 1.76c-.787 1.144-1.147 2.633-.216 4.495.603 1.205.777 2.74-.277 3.794-.657.657-1.762 1.1-2.956.586-.752-.324-1.353-.955-1.838-1.79-.567.706-.954 1.74-.954 2.893 0 3.847 3.288 6.75 7.435 6.75zm2.08-19.873c-.017-.345-.296-.625-.632-.543-2.337.575-6.605 4.042-4.2 8.854.474.946.392 1.675.004 2.062-.64.64-1.874.684-2.875-1.815-.131-.327-.498-.509-.803-.334-1.547.888-2.509 2.86-2.509 4.899 0 4.829 4.122 8.25 8.935 8.25 4.812 0 8.565-3.438 8.565-8.25 0-2.939-1.466-4.482-3.006-6.102-1.61-1.694-3.479-3.476-3.479-7.021z"></path></svg>
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