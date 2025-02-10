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

import Success from "./components/Success.jsx";


function App() {
  const { userInfo } = useSelector((state) => state.authReducer)
  const [filter, setFilter] = useState([])
  const [buttonsFromHome, setButtonsFromHome] = useState([])
  // const [user, setUser] = useState(null)
  // const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTokenEcommerce')
    console.log(loggedUserJSON)
    //console.log(loggedUserJSON)
    if(loggedUserJSON){
      console.log(loggedUserJSON)
      productService.setToken(loggedUserJSON)
    }
  }, [])
 
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
        <Route path="/profile" element={userInfo ? <Profile /> : <Navigate replace to="/login" />}>
          {/* <Route index element={<Navigate replace to="/details" />} />
          <Route path="details" element={userInfo ? <Details /> : <Navigate replace to="/login" />} /> */}
          {/* <Route path="details/:section" element={userInfo ? <Details /> : <Navigate replace to="/login" />} /> */}
          {/* <Route path="publications" element={userInfo ? <Publications/> : <Navigate replace to="/login" />} />
          <Route path="address" element={userInfo ? <Address/> : <Navigate replace to="/login" />} />
          <Route path="purchases" element={userInfo ? <Purchases/> : <Navigate replace to="/login" />} />
          <Route path="favorites" element={userInfo ? <Favorites/> : <Navigate replace to="/login" />} />
          <Route path="notifications" element={userInfo ? <Notifications/> : <Navigate replace to="/login" />} />
          <Route path="sales" element={userInfo ? <Sales/> : <Navigate replace to="/login" />} />
          <Route path="notifications/:id" element={userInfo ? <SingleNotification/> : <Navigate replace to="/login" />} /> */}
        </Route> 
        <Route path="/profile/:section" element={userInfo ? <Profile /> : <Navigate replace to="/login" />} ></Route>
        <Route path="/add" element={<Add />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;