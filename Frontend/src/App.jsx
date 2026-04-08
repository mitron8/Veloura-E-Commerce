import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ProductDetails from "./pages/ProductDetails"
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'
import ProductList from './admin/ProductList'
import NavBar from './Components/NavBar'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutAddress from './pages/CheckoutAddress'
function Layout() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>

    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/product/:id",
      element: <ProductDetails />

    },
    {
      path: "/admin/product",
      element: <ProductList />
    },
    {
      path: "/admin/product/add",
      element: <AddProduct />
    },
    {
      path: "/admin/product/edit/:id",
      element: <EditProduct />

    },
    {path:"/cart",
      element:<Cart></Cart>
    },
    {path:"/checkoutAddress",
      element:<CheckoutAddress></CheckoutAddress>},
     {path:"/checkout",
      element:<Checkout></Checkout>
    }

  
  ]

  }




])

export default function App() {
  return <RouterProvider router={router} />
}