import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
//dont use this file.
function Menu () {
    const [aktiivinen, setAktiivinen] = useState(0);

    const muuta = (event, arvo) => {
        setAktiivinen(arvo);
    };
    return (
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
                    <Tab component={Link} label="Products" to="/products" icon={<HomeIcon />}></Tab>
                    <Tab component={Link} label="Reservations" to="/reservations" icon={<HomeIcon />}></Tab>
                    <Tab component={Link} label="About" to="/about" icon={<HomeIcon />}></Tab>
                </Tabs>
            </AppBar>
           <Outlet/>
     
        </Box>
    
    );
} 

export default Menu