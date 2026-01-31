import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CircleLoader } from 'react-spinners';
import { css } from '@emotion/react';
import '../styles/Publications.scss'
import '../styles/SaleMetrics.scss'
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { updatingActivePublication } from '../slices/authSlice';
import { MdOutlinePauseCircle } from "react-icons/md";
import SalesMetrics from '../components/SalesMetrics';

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin: 0 auto;
  border-color: red;
`;

const Publications = () => {
    const [products, setProducts] = useState([])
    const { userInfo } = useSelector((state) => state.authReducer)
    const [loading, setLoading] = useState(true)
    // eslint-disable-next-line no-unused-vars
    const [productsUserInfo, setProductsUserInfo] = useState()
    const [selected, setSelected] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [minSale, setMinSale] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [maxSale, setMaxSale] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        axios
          .get("https://e-commerce-f1fr.onrender.com") // https://ecommerce-moez.onrender.com/
          .then(response => {
            setProducts(response.data)
          })
      
    }, [])
    
    useEffect(() => {
        
            let maxSale = 0;
            console.log(props[0])
            console.log(userInfo.publication.length)
            let minSale = userInfo.publication.length > 0 && userInfo.publication[0].sales[0] && userInfo.publication[0].sales[0].price
            // let minSale = userInfo.publication > 0 && userInfo.publication[0].sales[0] && userInfo.publication[0].sales[0].price
            //console.log(props[0].price)
            ? userInfo.publication[0].sales[0].price * userInfo.publication[0].sales[0].quantity
            : 0;
            console.log(minSale)
            console.log(maxSale)
            userInfo.publication.length > 0 && userInfo.publication[0].sales?.forEach((s) => {
        
            maxSale < s.price * s.quantity && (maxSale = s.price * s.quantity);
            minSale > s.price * s.quantity && (minSale = s.price * s.quantity);
            }); 
            console.log(maxSale)
            setMinSale(minSale);
            setMaxSale(maxSale);
        
        
        // let maxSale = 0;
        // console.log(props[0])
        // let minSale = props?.sales[0]
        // //console.log(props[0].price)
        // ? props.sales[0].price * props.sales[0].quantity
        // : 0;
        // console.log(minSale)
        // console.log(maxSale)
        // props?.sales.forEach((s) => {
     
        // maxSale < s.price * s.quantity && (maxSale = s.price * s.quantity);
        // minSale > s.price * s.quantity && (minSale = s.price * s.quantity);
        // }); 
        // console.log(maxSale)
        // setMinSale(minSale);
        // setMaxSale(maxSale);
        
    // eslint-disable-next-line
    }, [userInfo]);
    //https://e-commerce-f1fr.onrender.com
    // useEffect(() => {
    //     if(products.length > 0){
           console.log(products)
    //         console.log(products.filter(products => products.user.map(u => u.name === userInfo.name)))
    //         const productsUser = products && products.filter(products => products.user.find(u => u.name === userInfo.name))
    //         console.log(productsUser)
    //         setProductsUserInfo(productsUser)
    //     }
       
    // }, [products, userInfo])
    //console.log(products)
    console.log(userInfo)
    console.log(userInfo.sales)
    console.log(userInfo.products)
    console.log(userInfo.sales && userInfo.sales.products.map(pro => pro))
    console.log(userInfo.products.find(b => b._id === "67aa84993ebec9c7816a8776"))
    const ventas = userInfo.products.filter(product => userInfo.sales.products.filter(pro => pro.id === product._id))
    //const ventas2 = userInfo.sales.products.filter(product => )
    const ventas2 = userInfo.sales && userInfo.sales.products.filter(b => b.id === "67aa84993ebec9c7816a8776").reduce((b, c) => b + c.quantity, 0)
    //console.log(ventas2.reduce((b, c) => b + c.quantity, 0))
    console.log(ventas2)
    console.log(ventas)
    //console.log(productsUserInfo)
    if(userInfo.products.length > 0){
        console.log("si existe")
    }else{
        console.log("no existe")
    }

    const containerStyles = css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 600px;
    `;
    
    useEffect(() => {
        setLoading(true)
        if(userInfo){
            setLoading(false)
        }
    }, [userInfo])
    console.log(userInfo)

    const handleInfo = (id) => {
        if(selected === id){
            return setSelected(null)
        }
        setSelected(id)
    }

    // const handleShipping = (id) => {
    //     console.log(id)
    //     dispatch(updatingShipping(id))
    // }

    const handleActive = (id) => {
        console.log(id)
        dispatch(updatingActivePublication(id))
    }

    // const percenter = (num) => {
    //     let aux = Math.round((num * 100) / maxSale);
    //     if (aux > 99) {
    //     return 99;
    //     } else if (aux > 10) {
    //     return aux;
    //     } else {
    //     return 10;
    //     }
    // };

    const props = [
        [
            {
                price: 100,
                quantity: 2,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1, // 1 día atrás
            },
            {
                price:200,
                quantity: 4,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1,
            },
            {
                price:300,
                quantity: 3,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1,
            },
            {
                price:400,
                quantity: 3,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1,
            }
        ]
        ,
        [
            {
                price: 300,
                quantity: 2,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1, // 1 día atrás
            },
            {
                price:500,
                quantity: 4,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1,
            },
            {
                price:400,
                quantity: 3,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1,
            },
            {
                price:100,
                quantity: 3,
                payment_date: Date.now() - 1000 * 60 * 60 * 24 * 1,
            }
        ]
    ]
    console.log(props[0].price)

    return (
        <div className={userInfo.publication.length > 0 ? 'publications publications-alt' : 'publications'}>
            <div className={userInfo.publication.length > 0 ? 'main-publications main-alt' : 'main-publications'}>
                <div className='publications-options'>
                    <div className='title-publications'>Publicaciones</div>
                    
                </div>
                {loading 
                    ?   (
                            <div className='loader' css={containerStyles}>
                                <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
                            </div>
                        ) 
                    :   userInfo.publication.length > 0     
                            ?   <>
                                    {userInfo.publication.map(products => {
                                        const sales = products.sales && products.sales.reduce((b, c) => b + c.quantity, 0);
                                        const totalPrice = products.product.price * sales
                                        console.log(sales)
                                        console.log(userInfo.publication[0].sales.quantity && userInfo.publication[0].sales[0].quantity)    
                                        console.log(totalPrice)
                                        return (
                                        <div key={products._id} className='products-profile'>
                                            <div className='products-main-profile'>
                                                <div className='product-img'>
                                                    <div className='img-div'>
                                                        <img alt='alt-item' className='image-item' src={products.product.image} />
                                                    </div>
                                                </div>
                                                <div className='product-info-profile'>
                                                    <div className='product-info-profile-item'>
                                                        <div className='product-info-left'>
                                                            <div className='product-info-left-top'>
                                                                <div className='product-info-name'>{products.product.title}</div>
                                                            </div>
                                                        </div>
                                                        <div className='product-info-right'>
                                                            <div className='product-info-right-main'>
                                                                <div className='div-heart'>
                                                                    {products.product.freeShipping && 
                                                                        <div className='div-rocket'>
                                                                            <MdOutlineRocketLaunch className='heart-profile' />
                                                                            <div className='rocket'>Envíos gratis activos</div>
                                                                        </div>
                                                                    }
                                                                    <div className='div-pause'>
                                                                        {products.product.active 
                                                                            ? 
                                                                                <>
                                                                                    <IoPlayCircleOutline />
                                                                                    <div className='pause'>Publicacion activa</div>
                                                                                </>
                                                                            : 
                                                                                <>
                                                                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000" className="pc-indicator-pause"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path></svg>
                                                                                    <div className='pause'>Publicacion pausada</div>
                                                                                </>
                                                                        }
                                                                    </div>
                                                                    <div className='div-nostock'>
                                                                        <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon pc-indicator-stock css-onkibi"><path fill="currentColor" d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"></path></svg>
                                                                        <div className='nostock'>Sin stock</div>
                                                                    </div>
                                                                </div>
                                                                <div className='div-cart' onClick={() => handleInfo(products._id)}>
                                                                    <div className='mas-informacion'>Mas informacion</div>
                                                                    <IoIosArrowDown className={selected === products._id ? 'arrow-cart-vanish' : 'arrow-cart'} />
                                                                    <IoIosArrowUp className={selected === products._id ? 'arrow-up-cart' : 'arrow-up-vanish'} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={selected === products._id ? 'publication-details publication-details-open' : 'publication-details'}>
                                                <div className='publication-buttons'>
                                                    <div className='shipping'>
                                                        <div className='publication-shipping' onClick={() => handleActive(products._id)}>¿Envío Gratis?</div>
                                                        {products.product.freeShipping ? <FaCircle className='check-button'/> : <FaCircle className='check-button-white' />}
                                                    </div>
                                                    <div className='icons-main'>
                                                        <div className='icons-pen-container'>
                                                            <FaPen className='icons-pen' onClick={() => navigate(`/update/${products._id}`) } />
                                                            <div className='icons-pen-edit'>Editar publicacion</div>
                                                        </div>
                                                        <div className='icons-disc-container'>
                                                            <CiDiscount1 className='icons-disc' onClick={() => navigate(`/updateDiscount/${products._id}`)} />
                                                            <div className='icons-disc-desc'>Agregar descuentos</div>
                                                        </div>
                                                        <div className='icons-play-container'>
                                                            {products.product.active ?  <MdOutlinePauseCircle onClick={() => handleActive(products._id)} className='icons-pause'  /> : <IoPlayCircleOutline onClick={() => handleActive(products._id)} className='icons-play' />}
                                                            <div className='icons-play-play'>Reanudar publicacion</div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className='publication-calification'>
                                                    <div className='current-calification'>Calificacion Actual: </div>
                                                    <div className='calification-stars'>
                                                        <div className="calification-container">
                                                            <FaStar className='star' />
                                                            <FaStar className='star' />
                                                            <FaStar className='star' />
                                                            <FaStar className='star' />
                                                            <FaStar className='star' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div onClick={() => navigate("/results")} className='publication-store'>Ver en la tienda</div>
                                                <div className='moreinfo'>
                                                    <div className='text'>Ganancias Totales: </div>
                                                    <div className='moreinfo-results'>${totalPrice}</div>
                                                </div>
                                                <div className='moreinfo'>
                                                    <div className='text'>Ventas: </div>
                                                    <div className='moreinfo-results'>{sales}</div>
                                                </div>
                                                <div className='moreinfo'>
                                                    <div className='text'>Stock: </div>
                                                    <div className='moreinfo-results'>{products.product.stock}</div>
                                                </div> 
                                                <SalesMetrics publications={products} />
                                            </div>
                                            
                                        </div>
    
                                        )}
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