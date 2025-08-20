import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai"
import Cart from '../pages/Cart';
import { AiOutlineMenu } from "react-icons/ai"
import '../styles/ContentHome.scss'
import { FaSearch } from "react-icons/fa";
// import { MdLogout } from "react-icons/md";
import Menu from '../components/Menu';
import { CiHeart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import productService from '../services/product';
import { getAllProducts, getNotification, initializeUsers, logout } from '../slices/authSlice';


const Navbar = ({ filter, setFilter }) => {
  // const [filter, setFilter] = useState([])
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const { userInfo } = useSelector((state) => state.authReducer)
  const [products, setProducts] = useState([])
  const [noti, setNoti] = useState([])
  const [productUserList, setProductUserList] = useState([])
  const [productsUserInfo, setProductsUserInfo] = useState([])
  const [notiListUserInfo, setNotiListUserInfo] = useState([])
  console.log(notiListUserInfo)
  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState([])
  //console.log(userInfo)
  const [totalProducts, setTotalProducts] = useState()
  //const totProducts = userInfo.productsOnCart.reduce((a,b) => a + b.quantity, 0)
  //const products = useSelector(state => state.cart.products) Este es para el principal, pero el que usare
  // es para el backend, osea el que si deberia de ser
  //console.log(userInfo.productsOnCart.length)
  // const products = useSelector(state => 
  //   {
  //     if(state.cart.products){
  //       return state.cart.products
  //     }
  //   })

  //const totalProducts = products.reduce((a,b) => a + b.quantity, 0)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  //console.log(userInfo)
  useEffect(() => {
    if(userInfo){
      if(userInfo.productsOnCart){
        const totProducts = userInfo.productsOnCart.reduce((a,b) => a + b.quantity, 0)
        setTotalProducts(totProducts)
        //console.log(totalProducts)
      }
      //console.log(userInfo)
    }
    
  }, [userInfo])
  
  useEffect(() => {
    if(userInfo){
      //console.log("entro a este console")
      //console.log(userInfo.wishlist.length)
      if(userInfo.wishlist.length <= 0){
        dispatch(initializeUsers());
      }
      if(userInfo.notifications.length <= 0){
        dispatch(getNotification())
      }
    }
    dispatch(getAllProducts())
  }, [userInfo, dispatch])
  //console.log(totalProducts)
  const logoutHanlder =  () => {
      window.localStorage.clear()
      window.location.reload();
      //dispatch(logout());
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then(response => {
        setRates(response.data)
      })
  
  }, [])

  const filtering = (event) => {
    event.preventDefault()
    
    if (rates.length > 0) { 
      if(value === ''){
        setFilter([])
      }else{
        const filtered = rates.filter(person => 
          person.title.toLowerCase().includes(value.toLowerCase())
          || person.brand.toLowerCase().includes(value.toLowerCase())
        ); 
        setFilter(filtered);
        navigate('/results')
      }
    }
    setValue('')
  }


  function recargarPagina() {
    window.location.reload();
  }

  const handleMenu = () => {
    if(openMenu === true){
      setOpenMenu(false)
    }else{
      setOpenMenu(true)
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/wishlist/list")
      .then(response => {
        setProducts(response.data)
        console.log(response.data)
      })
  
  }, [])
  console.log(products)

  useEffect(() => {
    if(userInfo){
      productService.setNotifications().then(blogs =>
        setNoti(blogs)
      )  
    }
    
    
  }, [userInfo])
  //console.log(noti)
  //console.log(userInfo)
  
  // useEffect(() => {
    
  //   productService.getUniqueNoti().then(blogs =>
  //     setUnitFromList(blogs)
  //   )  
    
  // }, [])
  // console.log(unitFromList)
  
console.log(userInfo)
  useEffect(() => {
    if(userInfo){
        console.log(products)
        const productsUser = products.find(products => products.user.find(u => u.id === (!userInfo.isGoogleUser ? userInfo.id : userInfo._id)))
        console.log(productsUser)
        //console.log(productsUser)
        setProductsUserInfo(productsUser)
        const notiListUser = noti.find(noti => noti.user.find(user => user.id === (!userInfo.isGoogleUser ? userInfo.id : userInfo._id)))
        console.log(notiListUser)
        setNotiListUserInfo(notiListUser)
    }
    
  }, [products, setProductsUserInfo, userInfo, setNotiListUserInfo, noti])

  //console.log(productsUserInfo)
  //console.log(notiListUserInfo)

  useEffect(() => {
      if(userInfo){
          if(productsUserInfo){
            //console.log(productsUserInfo)
            //console.log(productUserList)
            const productUserWishList = userInfo.wishlist && userInfo.wishlist?.find(list => list._id === productsUserInfo._id)
            //console.log(productUserWishList)
            //console.log(productUserWishList)
            setProductUserList(productUserWishList)
          }
          if(notiListUserInfo){
            //console.log(notiListUserInfo)
            console.log(notiListUserInfo)
            console.log(userInfo.notifications)
            console.log(Array.isArray(userInfo.notifications))
            const notiListUser = userInfo.notifications && userInfo.notifications?.find(list => list._id === notiListUserInfo._id)
            //console.log(notiListUser)
            setNotifications(notiListUser)
          }
      }
      
  }, [products, productsUserInfo, userInfo, notiListUserInfo])
  console.log(notifications)
  
  //console.log(productUserList)
  //console.log(notifications)

  //const indx = random(30, 6);
  //console.log(indx)
  // let num = Math.floor(Math.random() * 6);
  // console.log(num)
  useEffect(() => {
    if(userInfo){
      //console.log(userInfo.expirationTimeMilliseconds)
      if(!userInfo.isGoogleUser){
        const remainingTime = userInfo.expirationTimeMilliseconds - Date.now(); // 10 segundos en milisegundos
        
        if (remainingTime > 0) {
          // Configurando un temporizador para desloguear
          const timer = setTimeout(() => {
            console.log('El token ha expirado, deslogueando usuario.');
            logoutHanlder();
            localStorage.removeItem('loggedTokenEcommerce');
            dispatch(logout());
          }, remainingTime);
    
          // Limpia el temporizador si el componente es null
          return () => clearTimeout(timer);
        } else {
          // Si ya expiró, desloguear de inmediato
          console.log('El token ya ha expirado, deslogueando usuario inmediatamente.');
          logoutHanlder();
          localStorage.removeItem('loggedTokenEcommerce');
          dispatch(logout());
        }
      }else{
        console.log("olowo")
        
      } 
    }
  }, [userInfo, dispatch])
 //dispatch(logout());
  return (
    <header className='navbar'>
      <div className='menu'>
        <div className='title'>
          <Link className='mainTitle' onClick={() =>  setTimeout(recargarPagina, 100)} to='/' >DirStore</Link>
        </div>
        <div className='button-icon'>
          <div className='button-icon-container'>
            <form className='form' onSubmit={filtering}>
              <input type='text' className='button-input' placeholder='Buscar un producto' value={value} onChange={(event) => setValue(event.target.value)}/>
              <button className='button-submit' type='submit'><FaSearch /></button>
            </form>
          </div>
        </div>
        { userInfo ? (
          <div className='log-reg'>
            <div className='sign profile-navbar'>
              <svg className='svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" role="presentation" alt="" data-testid="UserIcon" size="18" color="currentColor"><path d="M16.22 19.41A9.71 9.71 0 1 1 26 9.7a9.74 9.74 0 0 1-9.8 9.71M1.84 32a10.88 10.88 0 0 1 10.94-10.74h6.57A10.88 10.88 0 0 1 30.29 32H1.84" fill="currentColor"></path></svg>
              <div className='userinfo'>{!userInfo.isGoogleUser ? userInfo.name : userInfo.username}</div>
              <div className='div-menu-profile'>
                <div className='buttonsResponsive-profile'>
                  <Link className='buttonResponsive-profile' to='/profile/details'>
                    <div >Perfil</div>
                  </Link>
                  <Link className='buttonResponsive-profile' to='/profile/notifications'>
                    <div >Notificaciones</div>
                  </Link>
                  <Link className='buttonResponsive-profile' to='/profile/favorites'>
                    <div >Favoritos</div>
                  </Link>
                  <Link className='buttonResponsive-profile' to='/profile/purchases'>
                    <div>Compras</div>
                  </Link>
                  <Link className='buttonResponsive-profile' to='/profile/sales'>
                    <div>Ventas</div>
                  </Link>
                  <Link className='buttonResponsive-profile' to='/profile/publications'>
                    <div>Publicaciones</div>
                  </Link>
                  <Link className='buttonResponsive-profile' to='/profile/address'>
                    <div>Direcciones</div>
                  </Link>
                  <Link onClick={logoutHanlder} className='buttonResponsive-profile'>
                    <div>Salir</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className='sign log sign-favorites-heart'>
              <CiHeart className="sign-heart" />
              <div className='sign-favorites-menu'>
                <div className='div-products-favorites-menu'>
                        <div className='title-favorites-menu'>Favoritos</div>
                        <div className='section-favorites'>
                          {productUserList && productUserList.products && productUserList.products.length > 0
                            ? productUserList.products.map(products =>
                                <Link key={products._id} to={`/product/${products._id}`} className='products-favorites-menu'>
                                  <div className='div-products-items'>
                                    <div className='div-img-product-item'>
                                      <img src={products.image} alt='favoriteProduct' className='img-favorite-product-item'/>
                                    </div>
                                    <div className='div-img-product-info'>
                                      <div>{products.title}</div>
                                      <div>${products.price}.00</div>
                                    </div>
                                  </div>
                                </Link>)
                            : <div className='no-exist'>Aun no existe ningun producto favorito</div>
                          }
                        </div>
                        <div className='title-footer-menu'><Link to="/profile/favorites" className='link-favorites'>Ver todos los productos deseados</Link></div>
                </div>
              </div>
            </div>
            <div className='sign log noti'>
              <IoIosNotificationsOutline className='icon-noti' />
              <div className='sign-noti-menu'>
                <div className='div-noti-menu'>
                  <>
                    <div className='title-noti-menu'>Notificaciones</div>
                    <div className='section-notifications'>
                      {userInfo && notiListUserInfo && notiListUserInfo.notif_list && notiListUserInfo.notif_list.length > 0 && notiListUserInfo.notif_list
                            ? notiListUserInfo.notif_list?.map(notis =>
                                <Link to={`/profile/notifications/${notis._id}`} className='items-noti-menu' key={notis._id}>
                                  <div className='div-noti-items'>
                                    <TbPointFilled className='point-noti' />
                                    <div className='welcome'>{notis.title}</div>
                                  </div>
                                </Link>)
                            : <div className='no-exist'>Aun no existe ninguna notificacion</div>
                      }
                    </div>
                    <div className='title-footer-noti-menu'>
                      <Link to="/profile/notifications" className='link-noti'>Ver todas las notificaciones</Link>
                    </div>
                  </>
                </div>
              </div>
            </div>
            <div className='cartIcon sign' onClick={() => setOpen(!open)}>
              <AiOutlineShoppingCart className='car'/>
              <span className='number'>{totalProducts && totalProducts}</span>
            </div>
            <div className='buttons' onClick={() => handleMenu()}>
              <AiOutlineMenu className='menu-responsive' />
            </div>
          </div>
        ) : (
          <div className='log-reg'>
            <Link className='sign-in' to='/login'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" role="presentation" alt="" data-testid="UserIcon" size="18" color="currentColor"><path d="M16.22 19.41A9.71 9.71 0 1 1 26 9.7a9.74 9.74 0 0 1-9.8 9.71M1.84 32a10.88 10.88 0 0 1 10.94-10.74h6.57A10.88 10.88 0 0 1 30.29 32H1.84" fill="currentColor"></path></svg>
              <div className='iniciarsesion'>Iniciar sesion</div>
              <div className='iniciar-registrar'>Iniciar sesion / Registrarse</div>
            </Link>
            <div className='buttons' onClick={handleMenu}>
              <AiOutlineMenu className='menu-responsive' />
            </div>
            {/* <Link className='sign up' to='/register'>
              <div>Sign Up</div>
            </Link>     */}
          </div>
        )}
      </div>
      {openMenu && <Menu handle={() => setOpenMenu(false)} />}
      {open && <Cart setOpen={setOpen} open={open} />}
      <div className='menu-buttons-container'>
        <div className='menu-buttons'>
          <Link className='submenu home' onClick={() =>  setTimeout(recargarPagina, 100)} to='/'>
            <div>Home</div>
          </Link>
          <Link to='/results' className='submenu shop'>
            <div>Tienda</div>
          </Link>
          <Link to='/us' className='submenu us' >
            <div>Nosotros</div>
          </Link>
          <Link to='/questions' className='submenu questions'>
            <div>Preguntas Frecuentes</div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar