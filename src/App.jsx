import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import InfoIcon from '@mui/icons-material/Info';
import FactoryIcon from '@mui/icons-material/Factory';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const settings = {
  palette: {

    primary: {
      main: "#23a627", contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: { fontFamily: "'Open Sans', sans-serif" }
};

const theme = createTheme(settings);

function App() {
  const [aktiivinen, setAktiivinen] = useState(0);

  const muuta = (event, arvo) => {
      setAktiivinen(arvo);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
            <AppBar position="static">
                <Tabs
                    color="inherit"
                    value={aktiivinen}
                    centered
                    textColor="inherit"
                    onChange={muuta}
                    variant="fullWidth"
                >
                    <Tab component={Link} label="PetShop" to="/" icon={<PetsIcon />}></Tab>
                    <Tab component={Link} label="Products" to="/products" icon={<LocalMallIcon />}></Tab>
                    <Tab component={Link} label="Manufacturers" to="/manufacturers" icon={<FactoryIcon />}></Tab>
                    <Tab component={Link} label="Reservations" to="/reservations" icon={<BeenhereIcon />}></Tab>
                    <Tab component={Link} label="About" to="/about" icon={<InfoIcon />}></Tab>
                    <Tab component={Link} label="Login" to="/login" icon={<AccountCircleIcon />}></Tab>
                </Tabs>
            </AppBar>
           <Outlet/>
     
        </Box>
    </ThemeProvider>
  )
}

export default App
