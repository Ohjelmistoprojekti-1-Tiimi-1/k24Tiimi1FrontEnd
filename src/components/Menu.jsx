import { AppBar, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

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
                    <Tab component={Link} label="Front Page" to="/" icon={<HomeIcon />}></Tab>
                </Tabs>
            </AppBar>
           <Outlet/>
     
        </Box>
    
    );
} 

export default Menu