import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useSelector, useStore } from 'react-redux';

const UserProfile = () => {
  const {auth} = useSelector(store => store)
    const handleLogout=()=>{

    }
  return (
    <div className='min-h-[80vh] flex flex-col 
    justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
        <AccountCircleIcon sx={{fontSize : "9rem"}}/>
        <h1 className='py-5 text-2xl font-semibold'>{auth?.user?.fullName}</h1>
        <p>{auth?.user?.email}</p>
        {/* <Button variant="contained" onClick={handleLogout} sx={{margin: "2rem 0rem"}}>Logout</Button> */}
      </div>
    </div>
  )
}

export default UserProfile
