import { Divider, Drawer, useMediaQuery, IconButton } from '@mui/material'
import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logout } from '../state/authentication/Action';
import { clearRestaurantState } from "../state/restaurant/Action";
import { clearMenuState } from "../state/menu/Action";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteIcon /> },
    { title: "Address", icon: <HomeIcon /> },
    // { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    // { title: "Notifications", icon: <NotificationsActiveIcon /> },
    // { title: "Events", icon: <EventIcon /> },
    { title: "Logout", icon: <LogoutIcon /> }
]
const ProfileNavigation = () => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State to control drawer open/close on small screens
    const [open, setOpen] = useState(false);

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            navigate("/account/login");
            dispatch(clearRestaurantState());
            dispatch(clearMenuState());
            dispatch(logout());
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
        // Close drawer after clicking (on small screens)
        if (isSmallScreen) setOpen(false);
    };

    return (
        <>
            {/* Hamburger Icon for Small Screens */}
            {isSmallScreen && (
                <IconButton onClick={() => setOpen(true)} className="fixed top-4 left-4 z-50">
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={() => setOpen(false)}
                open={isSmallScreen ? open : true}
                anchor="left"
                sx={{
                    zIndex: 1,
                    width: isSmallScreen ? "38vw" : "20vw",
                    "& .MuiDrawer-paper": {
                        width: isSmallScreen ? "38vw" : "20vw",
                        backgroundColor: "bg-black",
                        color: "white",
                    },
                    "& .MuiBackdrop-root": {
                        backgroundColor: "transparent", // Optional: Prevent grey backdrop on small screens
                    },
                }}
            >
                <div className="h-screen flex flex-col justify-center text-base gap-0 pt-12">
                    {menu.map((item, i) => (
                        <div key={i} >
                            <div
                                onClick={() => handleNavigate(item)}
                                className="px-5 max-w-[700px]:px-2 flex p-8 items-center space-x-5 max-w-[700px]:space-x-1 cursor-pointer"
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </div>
                    ))}
                </div>
            </Drawer>
        </>
    );
};

export default ProfileNavigation
