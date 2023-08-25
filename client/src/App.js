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
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart.jsx"
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ShoppingCart from "./pages/ShoppingCart";

const Layout = () => {
  return (
    <>
      <Navbar/>
      <ToastContainer/>
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
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/add",
        element: <Add/>
      },
      {
        path: "/shopping",
        element: <ShoppingCart/>
      },
      {
        path: "/update/:id",
        element: <Update/>
      },
      {
        path: "/product/:id",
        element: <Product/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccess/>
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />
          }
        ]
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