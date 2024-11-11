import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../styles/Publications.scss'
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineRocketLaunch } from "react-icons/md";

const Publications = () => {
    const [products, setProducts] = useState([])
    const { userInfo } = useSelector((state) => state.auth)
    // eslint-disable-next-line no-unused-vars
    const [productsUserInfo, setProductsUserInfo] = useState()

    useEffect(() => {
        axios
          .get("https://e-commerce-f1fr.onrender.com") // https://ecommerce-moez.onrender.com/
          .then(response => {
            setProducts(response.data)
          })
      
    }, [])

    useEffect(() => {
        const productsUser = products.filter(products => products.user.some(u => u.name === userInfo.name))
        setProductsUserInfo(productsUser)
    }, [products, userInfo])
    //console.log(products)
    console.log(userInfo)
    //console.log(productsUserInfo)
    if(userInfo.products.length > 0){
        console.log("si existe")
    }else{
        console.log("no existe")
    }
    
    console.log(userInfo)
    return (
        <div className={userInfo.products.length > 0 ? 'publications publications-alt' : 'publications'}>
            <div className={userInfo.products.length > 0 ? 'main-publications main-alt' : 'main-publications'}>
                <div className='publications-options'>
                    <div className='title-publications'>Publicaciones</div>
                    
                </div>
                {userInfo.products.length > 0
                    ?   <>
                            {userInfo.products.map(products => 
                                <div className='products-profile'>
                                    <div className='products-main-profile'>
                                        <div className='product-img'>
                                            <div className='img-div'>
                                                <img alt='alt-item' className='image-item' src={products.image} />
                                            </div>
                                        </div>
                                        <div className='product-info-profile'>
                                            <div className='product-info-profile-item'>
                                                <div className='product-info-left'>
                                                    <div className='product-info-left-top'>
                                                        <div className='product-info-name'>{products.title}</div>
                                                    </div>
                                                    <div className='product-info-left-center'>
                                                        <div className='not-price'>${`${products.price - 31}.00`}</div>
                                                        <div className='product-priceoff'>
                                                            <div className='real-price'>${products.price}.00</div>
                                                            <div className='off'>25% off</div>
                                                        </div>
                                                    </div>
                                                    <div className='product-info-left-bottom'>
                                                        <div className='product-delivery'>Envio gratis</div>
                                                    </div>
                                                </div>
                                                <div className='product-info-right'>
                                                    <div className='product-info-right-main'>
                                                        <div className='div-heart'>
                                                            <MdOutlineRocketLaunch className='heart-profile' />
                                                            <div className='rocket'>Envíos gratis activos</div>
                                                        </div>
                                                        <div className='div-cart'>
                                                            <div className='mas-informacion'>Mas informacion</div>
                                                            <IoIosArrowDown className='arrow-cart' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    :   <>
                            <div className='no-publications'>Aun no has publicado ningun producto</div>
                            <Link className='create-product'>Publicar</Link>
                        </>
                    
                }
            </div>
        </div>
    )
}

export default Publications