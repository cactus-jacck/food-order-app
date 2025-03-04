import { Dashboard, ShoppingBag } from '@mui/icons-material'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import React from 'react'
import { Divider, Drawer, useMediaQuery } from '@mui/material';

const menu = [
    {
        name: 'Dashboard',
        href: '/',
        icon: <Dashboard />,
        current: false
    },
    {
        name: 'Menu',
        href: '/menu',
        icon: <ShopTwoIcon/>,
        current: false
    },
    {
        name: 'Orders',
        href: '/orders',
        icon: <ShoppingBag/>,
        current: false
    },
    {
        name: 'Food Category',
        href: '/category',
        icon: <CategoryIcon/>,
        current: false
    },
    {
        name: 'Ingredients',
        href: '/ingredients',
        icon: <FastfoodIcon/>,
        current: false
    },
    {
        name: 'Events',
        href: '/events',
        icon: <EventIcon/>,
        current: false
    },
    {
        name: 'Admin Panel Settings',
        href: '/admin-panel-settings',
        icon: <AdminPanelSettingsIcon/>,
        current: false
    },
    {
        name: 'Logout',
        href: '/logout',
        icon: <LogoutIcon/>,
        current: false
    }
]

const AdminSideBar = () => {
    const isSmallScreen = useMediaQuery('(max-width:1080px)');

    const handleClose = () => {}

  return (
    <div>
      <>
        <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        onClose={handleClose} 
        open={true} 
        anchor='left' 
        sx={{zIndex:1}}>
            <div className='w-[70vw] lg:w-[20vw] h-screen flex-col
            justify-center text-lg space-y-[1.05rem] pt-5'>
                {menu.map((item) => (
                    <>
                        <div className='flex items-center gap-5 px-5 cursor-pointer'>
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                        <Divider/>
                    </>
                ))}
            </div>
        </Drawer>
      </>
    </div>
  )
}

export default AdminSideBar
