import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom"
import Products from './pages/Products';
import Add from './pages/Add';
import Update from './pages/Update';
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart.jsx"
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ShoppingCart from "./pages/ShoppingCart";
import React from 'react'
import Layout from "./Layout.js";
import Items from "./pages/Items.jsx";
import Us from "./pages/Us.jsx";
import Faqs from "./pages/Faqs.jsx";

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
        path: "/results",
        element: <Items/>
      },
      {
        path: "/questions",
        element: <Faqs />
      },
      {
        path: "/us",
        element: <Us/>
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