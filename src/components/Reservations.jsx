import React, {useEffect, useState} from "react";
import {Button, Box, Typography } from "@mui/material";
import ProductsGrid from "./ProductsGrid";
import { newReservation } from "../petshopapi";

export default function Reservations() {
    const [currentReservations, setCurrentReservations] = useState([]);
    const [error, setError] = useState("")

    useEffect (() =>  {
        let storage = JSON.parse(sessionStorage.getItem("reservations"));
        if (storage === null) {
            setCurrentReservations([])
        }
        setCurrentReservations(storage)
    }, [])

    const reserveProducts = async () => {
        try {
            const message = await newReservation(currentReservations);
            setError(message)
            sessionStorage.setItem("reservations", JSON.stringify([]));
            setCurrentReservations([]);
        }catch (err) {
            setError(err.message)
        }
    }

    return (
        <Box>
            <Box className="currentReservations">
                <Typography variant="h3">Current reservation</Typography>
                <ProductsGrid reserveButtonTrue={false} products={currentReservations} height={300} ></ProductsGrid>
                <Button onClick={reserveProducts} sx= {{marginLeft: "1em"}}variant="contained">Reserve products above</Button>
                <Typography color={"error"} >{error}</Typography>
            </Box>
        </Box>
    );
}
