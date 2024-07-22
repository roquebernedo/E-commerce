import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Products from './pages/Products';
import Add from './pages/Add';
import Update from './pages/Update';
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ShoppingCart from "./pages/ShoppingCart";
import React, { useEffect, useState } from 'react'
import Items from "./pages/Items.jsx";
import Us from "./pages/Us.jsx";
import Faqs from "./pages/Faqs.jsx";
import Footer from "./Footer/Footer.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import { useSelector } from "react-redux";
import productService from "./services/product.js";
import Publications from "./pages/Publications.jsx";
import Details from "./pages/Details.jsx";
import Favorites from "./pages/Favorites.jsx";
import Notifications from "./pages/Notifications.jsx";
import SingleNotification from "./pages/SingleNotification.jsx";

function App() {
  const { userInfo } = useSelector((state) => state.auth)
  const [filter, setFilter] = useState([])
  const [buttonsFromHome, setButtonsFromHome] = useState([])
  const [user, setUser] = useState(null)
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userInfo')
    //console.log(loggedUserJSON)
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      productService.setToken(user.token)
    }
  }, [])
 
  useEffect(() => {
    // const token = localStorage.getItem('loggedBlogappUser');
    // console.log(token)
    // const parseredToken = JSON.parse(token)
    if(user){
      const token = localStorage.getItem('userInfo');
      //console.log(token)
      const parseredToken = JSON.parse(token)
      const expirationTime = parseredToken.expirationTimeMilliseconds
    
      if (token && expirationTime) {
        const currentTime = new Date().getTime();
        const timeRemaining = parseInt(expirationTime) - currentTime;
        
        if (timeRemaining > 0) {
          // El token aún no ha expirado
          const expirationTimer = setTimeout(() => {
            // Token expirado, actualiza el estado del usuario
            window.localStorage.clear()
            setUser(null);
            window.location.reload();
          }, timeRemaining);
  
          // Limpia el temporizador cuando el componente se desmonta o cuando el token se renueva
          return () => clearTimeout(expirationTimer);
        } else {
          // El token ha expirado, actualiza el estado del usuario
          window.localStorage.clear()
          setUser(null);
          window.location.reload();
        }
      }
    }
  }, [user])

  return (
    <div>
      <Navbar filter={filter} setFilter={setFilter} />
      <Routes>
        <Route path="/" element={<Products buttonsFromHome={buttonsFromHome} setButtonsFromHome={setButtonsFromHome}/>} />
        <Route path="/results" element={<Items filterProducts={filter} buttonsMain={buttonsFromHome} />} />
        <Route path="/us" element={<Us />} />
        <Route path="/questions" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile/detalles" element={userInfo ? <Profile /> : <Navigate replace to='/login' /> } /> */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Navigate replace to="/details" />} />
          <Route path="details" element={userInfo ? <Details /> : <Navigate replace to="/login" />} />
          <Route path="publications" element={userInfo ? <Publications/> : <Navigate replace to="/login" />} />
          <Route path="favorites" element={userInfo ? <Favorites/> : <Navigate replace to="/login" />} />
          <Route path="notifications" element={userInfo ? <Notifications/> : <Navigate replace to="/login" />} />
          <Route path="notifications/:id" element={userInfo ? <SingleNotification/> : <Navigate replace to="/login" />} />
        </Route> 
        <Route path="/add" element={<Add />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;