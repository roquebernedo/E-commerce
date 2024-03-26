import React, { useState } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Filter from './components/Filter';

const Layout = () => {
    const [filter, setFilter] = useState([])
    console.log(filter)

    return (
      <>
        <Navbar filter={filter} setFilter={setFilter}/>
        <ToastContainer/>
        {filter.length > 0 ? <Filter products={filter} /> : <Outlet/>}
        <Footer/>
      </>
    )
}

export default Layout