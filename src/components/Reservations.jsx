import { useState, useContext } from "react";
import { Button, Box, Typography, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { newReservation } from "../petshopapi";
import ReservationProducts from "./ReservationProducts";
import ReservationContext from "./ReservationContext";

export default function Reservations() {
    const [open, setOpen] = useState(false);


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
