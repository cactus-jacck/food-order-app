import {React, useState} from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile'
import Orders from './Orders'
import Address from './Address';
import Events from './Events';
import Favorites from './Favorites';
import Payments from './Payments';

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className='lg:flex'>
      <div className='sticky top-60px h-[calc(100vh - 60px)] lg:w-[20%]'>
        <ProfileNavigation open={openSideBar}/>
      </div>
      <div className='lg:w-[80%]'>
        <Routes>
          <Route path='/' element={<UserProfile />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/address' element={<Address />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/events' element={<Events />} />
        </Routes>
      </div>
    </div>
  )
}

export default Profile
