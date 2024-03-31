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
import React, { useState } from 'react'
import Items from "./pages/Items.jsx";
import Us from "./pages/Us.jsx";
import Faqs from "./pages/Faqs.jsx";
import Footer from "./Footer/Footer.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import { useSelector } from "react-redux";

function App() {
  const { userInfo } = useSelector((state) => state.auth)
  const [filter, setFilter] = useState([])
  const [buttonsFromHome, setButtonsFromHome] = useState([])
  // eslint-disable-next-line no-unused-vars

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
        <Route path="/profile" element={userInfo ? <Profile /> : <Navigate replace to='/login' /> } />
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