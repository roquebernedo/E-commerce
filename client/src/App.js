import {
  RouterProvider,
  Outlet,
  createBrowserRouter
} from "react-router-dom"
import Products from './pages/Products';
import Add from './pages/Add';
import Update from './pages/Update';
import './style.css'
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Product from "./pages/Product";

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Products/>
      },
      {
        path: "/add",
        element: <Add/>
      },
      {
        path: "/update/:id",
        element: <Update/>
      },
      {
        path: "/product/:id",
        element: <Product/>
      }
      
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;