import React from 'react'
import AdminSideBar from './AdminSideBar'

const Admin = () => {
  return (
    <div>
      <div className='lg:flex justify-between'>
        <div>
          <AdminSideBar />
        </div>
        <div className='lg:w-[80%]'>

        </div>
      </div>
    </div>
  )
}

export default Admin
