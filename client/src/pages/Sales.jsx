import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/Sales.scss'
import axios from 'axios'

const Sales = () => {
    const { userInfo } = useSelector((state) => state.authReducer)
    console.log(userInfo)
    const [products, setProducts] = useState([])
    const [buyer, setBuyer] = useState([])
    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get("https://e-commerce-f1fr.onrender.com/api/users")
                setProducts(res.data)
            }catch(err){
                console.log(err)  
            }
        }
        fetchAllProducts()
    }, [])
    console.log(products)
    useEffect(() => {
        if(products.length > 0){
            
            const buyerIds = userInfo.sales.products.map(p => p.buyer);
            console.log(buyerIds)
        // Encontrar los usuarios completos
        const buyers = buyerIds.map(buyerId => products.find(user => user.id === buyerId));
        setBuyer(buyers)
        console.log(buyers);
        }
    }, [products, userInfo.sales.products])
    return (
        <div className={userInfo.sales ? 'sales sales-alt' : 'sales'}>
            <div className={userInfo.sales ? 'main-sales main-alt' : 'main-sales'}>
                <div className='sales-options'>
                    <div className='title-sales'>Ventas</div>
                    
                </div>
                {userInfo.sales
                    ?   <>
                            {userInfo.sales.products.map(product =>  {
                                const foundBuyer = buyer.find(b => b.id === product.buyer);
                                
                                return (
                                <div className='products-profile-sales' key={product._id}>
                                    <div className='products-main-profile-sales'>
                                        <div className='product-img'>
                                            <div className='img-div'>
                                                <img alt='alt-item' className='image-item' src={product.image} />
                                            </div>
                                        </div>
                                        <div className='product-sales-profile'>
                                            <div className='product-sales-profile-item'>
                                                <div className='product-sales-left'>
                                                    <div className='product-sales-left-top'>
                                                        <div className='product-sales-name'>{product.title} + {foundBuyer ? foundBuyer.email : 's'}</div>
                                                    </div>
                                                    
                                                </div>
                                                <div className='product-sales-right'>
                                                    <div className='product-sales-right-main'>
                                                        <div className='div-heart'>
                                                            <div>${product.price}.00</div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </>
                    :   <>
                            <div className='no-publications'>Aun no has vendido un producto</div>
                            <Link className='create-product'>Publicar</Link>
                        </>
                    
                }
            </div>
        </div>
    )
}

export default Sales