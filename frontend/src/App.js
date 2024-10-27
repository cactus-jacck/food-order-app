import './App.css';
import Navbar from './component/navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';
import Home from './component/home/Home';

function App() {
  return (
      <ThemeProvider theme = {darkTheme}>
        <CssBaseline/>
        <Navbar />
        <Home />
      </ThemeProvider>
  );
}

export default App;
