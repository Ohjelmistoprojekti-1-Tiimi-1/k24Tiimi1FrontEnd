import { useState, useContext } from "react";
import { Button, Box, Typography, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { newReservation } from "../petshopapi";
import ReservationProducts from "./ReservationProducts";
import ReservationContext from "./ReservationContext";

export default function Reservations() {


    return (
        <>
            <Box>
                <Typography variant="h3">Current reservation</Typography>
                <ReservationProducts />
            </Box>
        </>
    );
};
