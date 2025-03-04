import { Avatar, Badge, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {auth, cart} = useSelector(store => store)
  const navigate = useNavigate()
  const handleAvatarClick = () =>{
    if(auth.user?.role === "ROLE_CUSTOMER")
    {
      navigate("/my-profile")
    }
    else
    {
      navigate("/my-profile")
    }
  }
  return (
    <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex items-center justify-between'>

      <div className='flex-grow lg:mr-10 cursor-pointer flex items-center space-x-4'>
        <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>
          Paradise
        </li>
      </div>

      <div className='flex items-center space-x-2 lg:space-x-10'>
        {/* <div className=''>
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div> */}
        <div className='flex items-center'>
          {auth.user ? <Avatar onClick={(handleAvatarClick)} sx={{ bgcolor: "white", color: pink.A400, cursor: "pointer" }}>{auth.user?.fullName[0].toUpperCase()}</Avatar> :
            <IconButton onClick={()=>navigate("/account/login")}>
              <Person/>
            </IconButton>} 
        </div>
        <div className=''>
          <IconButton onClick={()=>navigate("/cart")}> 
            <Badge color='primary' 
            badgeContent={cart.cartItems?.length ?? 0}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '1.2rem', // Adjust the font size as needed
                padding: '6px', // Optional: Adjust padding for better visibility
              },
            }} 
            showZero
            >
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Navbar
