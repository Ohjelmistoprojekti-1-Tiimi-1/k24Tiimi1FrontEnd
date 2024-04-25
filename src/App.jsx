import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { CssBaseline } from '@mui/material'
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from '@mui/icons-material/Info';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const settings = {
  palette: {

    primary: {
      main: "#000000", contrastText: "#FFFFFF",
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
                    <Tab component={Link} label="PetShop" to="/" icon={<HomeIcon />}></Tab>
                    <Tab component={Link} label="Products" to="/products" icon={<LocalMallIcon />}></Tab>
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
