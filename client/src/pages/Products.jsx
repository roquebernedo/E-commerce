import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Products.scss'
import { useSelector } from 'react-redux';

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
        <div className='image'>
            <div className='rose-stick'>
            <img className='rose' alt='' src='https://cdn.dribbble.com/assets/searches/search-header-800-1f49142870a5c1428edf0f570465ce9114ca4dc76f9d645bcf5c786a18dc697f.png'></img>
            </div>  
        </div>
        <div className='subTitle'>
            <div className='subMidle'>
                <div className='collection first'>
                    Collection <img alt='imagenquecata' className='icon' src='//store.figma.com/cdn/shop/t/9/assets/word-symbol-hourglass.static.svg?v=133626873782927219541678219731' /> of T-shirts <img className='icon' alt='imagenquecata' src='//store.figma.com/cdn/shop/t/9/assets/word-symbol-zag.static.svg?v=102718930007740203771678219731'/>
                </div>
                <div className='collection second'>
                    and <img className='icon' alt='imagenquecata' src='//store.figma.com/cdn/shop/t/9/assets/word-symbol-dots.static.svg?v=39142388321885661271678219731' /> components 
                    <img className='icon' alt='imagenquecata' src='//store.figma.com/cdn/shop/t/9/assets/word-symbol-sun.static.svg?v=163357932534391307201678219731' /> for you <img className='icon' alt='imagenquecata' src='//store.figma.com/cdn/shop/t/9/assets/word-symbol-comet.static.svg?v=16892712658856357451678219731' /> 
                </div>
                <div className='collection third'>
                    and <img className='icon' alt='imagenquecata' src='//store.figma.com/cdn/shop/t/9/assets/word-symbol-snake.static.svg?v=34100567131936571961678219731' /> your <img className='icon' alt='imagenquecata' src='//store.figma.com/cdn/shop/t/9/assets/word-symbol-tri.static.svg?v=32742515804419710851678219731' /> friends
                </div>
            </div>
        </div>
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