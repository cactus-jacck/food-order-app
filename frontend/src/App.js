import './App.css';
import Navbar from './component/navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';
import Home from './component/home/Home';
import RestaurantDetails from './component/restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';

function App() {
  return (
      <ThemeProvider theme = {darkTheme}>
        <CssBaseline/>
        <Navbar />
        {/* <Home /> */}
        {/* <RestaurantDetails /> */}
        <Cart />
      </ThemeProvider>
  );
}

export default App;
