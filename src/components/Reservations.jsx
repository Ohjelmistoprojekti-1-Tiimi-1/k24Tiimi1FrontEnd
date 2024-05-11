import { useEffect, useState } from "react";
import { Button, Box, Typography, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import ProductsGrid from "./notUsedComponents/ProductsGrid";
import { newReservation } from "../petshopapi";
import ReservationProducts from "./ReservationProducts";

export default function Reservations() {
    const [open, setOpen] = useState(false);
    

    const reserveProducts = () => {
        if (!sessionStorage.getItem("jwt"))
            setOpen(true)
    }
   

    return (
        <>
            <Box>
                <Typography variant="h3">Current reservation</Typography>
                <ReservationProducts />
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={"Please login first to make the reservatioin: "}
                action={<Link to={"/login"} style={{ color: "white" }} >To Login Page</Link>}
            />
        </>
    );
};
