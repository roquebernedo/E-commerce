import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/Purchases.scss'

const Purchases = () => {
    const { userInfo } = useSelector((state) => state.authReducer)
    console.log(userInfo)

    return (
        <div className={userInfo.orders.length > 0 ? 'purchases purchases-alt' : 'purchases'}>
            <div className={userInfo.orders.length > 0 ? 'main-purchases main-alt' : 'main-purchases'}>
                <div className='purchases-options'>
                    <div className='title-purchases'>Compras</div>
                    
                </div>
                {userInfo.orders.length > 0
                    ?   <>
                            {userInfo.orders.map(orders => orders.products.map(product => 
                                <div className='products-profile-purchases' key={product._id}>
                                    <div className='products-main-profile-purchases'>
                                        <div className='product-img'>
                                            <div className='img-div'>
                                                <img alt='alt-item' className='image-item' src={product.image} />
                                            </div>
                                        </div>
                                        <div className='product-info-profile'>
                                            <div className='product-purch-profile-item'>
                                                <div className='product-info-left'>
                                                    <div className='product-info-left-top'>
                                                        <div className='product-info-name'>{product.title}</div>
                                                    </div>
                                                    
                                                </div>
                                                <div className='product-purch-right'>
                                                    <div className='product-purch-right-main'>
                                                        <div className='div-heart'>
                                                            <div>${product.price}.00</div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='delivered'>
                                        ¡Entregado!
                                    </div>
                                </div>
                            ))}
                        </>
                    :   <>
                            <div className='no-publications'>Aun no has comprado un producto</div>
                        </>
                    
                }
            </div>
        </div>
    )
}

export default Purchases