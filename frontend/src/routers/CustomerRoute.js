import React from 'react'
import Navbar from '../component/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/home/Home'
import RestaurantCard from '../component/restaurant/RestaurantCard'
import Cart from '../component/Cart/Cart'
import Profile from '../component/profile/Profile'
import Auth from '../component/auth/Auth'
import RestaurantDetails from '../component/restaurant/RestaurantDetails'
import ProtectedRoute from './ProtectedRoute'

const CustomerRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path='/account/:register' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/admin/restaurant' element={<Home />} />
          <Route path='restaurant/:city/:title/:id' element={<RestaurantDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-profile/*' element={<Profile />} />
        </Route>
      </Routes>
      <Auth />
    </div>
  )
}

export default CustomerRoute
