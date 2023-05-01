import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'


import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetail from '../pages/ProductDetail'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Singup from '../pages/Singup'
import ProtectedRoute from "./ProtectedRoute"

import AllProduct from '../admin/AllProduct'
import AddProducts from '../admin/AddProducts'
import Dashboard from '../admin/Dashboard'

const Routers = () => {
  return (
  <Routes>
    <Route path='/' element = {<Navigate to={'home'} />}/>
    <Route path='home' element = {<Home/>}/>
    <Route path='shop' element = {<Shop/>}/>
    <Route path='shop/:id' element = {<ProductDetail/>}/>
    <Route path='cart' element = {<Cart/>}/>
    
    <Route path='/*' element={<ProtectedRoute />}>
      <Route path='checkout' element = {<Checkout />}/>
      <Route path='dashboard' element = {<Dashboard />}/>
      <Route path='dashboard/all-products' element = {<AllProduct />}/>
      <Route path='dashboard/add-product' element = {<AddProducts />}/>
    </Route>

    <Route path='login' element = {<Login/>}/>
    <Route path='signup' element = {<Singup/>}/>
  </Routes>

  )
}

export default Routers
