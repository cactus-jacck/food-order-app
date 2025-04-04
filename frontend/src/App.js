import './App.css';
import Navbar from './component/navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';
import Home from './component/home/Home';
import RestaurantDetails from './component/restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import Profile from './component/profile/Profile';
import CustomerRoute from './routers/CustomerRoute';
import Auth from './component/auth/Auth';
import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { getUser } from './component/state/authentication/Action';
import { findCart } from './component/state/cart/Action';
import { useNavigate } from 'react-router-dom';
import Routers from './routers/Routers';

function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)
  const navigate = useNavigate()

  useEffect(()=>{

    if(jwt)
    {
      dispatch(getUser(jwt))
    }
    else
    {
      navigate("/account/login")
    }

    // dispatch(getUser(auth.jwt || jwt))
  },[auth.jwt])

  useEffect(() => {
    if (auth.user) {
      dispatch(findCart(auth.jwt || jwt));
    }
  }, [auth.user, auth.jwt]);


  return (
      <ThemeProvider theme = {darkTheme}>
        <CssBaseline/>
        <Routers/>
      </ThemeProvider>
  );
}

export default App;
