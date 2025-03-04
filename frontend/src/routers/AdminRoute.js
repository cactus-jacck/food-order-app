import React from 'react'
import CreateRestaurantForm from '../adminComponent/createRestaurantForm/CreateRestaurantForm'
import Admin from '../adminComponent/Admin/Admin'
import { Route, Routes } from 'react-router-dom'

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={false?<CreateRestaurantForm/>:<Admin/>}>

        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoute
