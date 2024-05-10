import React, {useEffect, useState} from "react";
import { Box, Typography } from "@mui/material";
import ProductsGrid from "./ProductsGrid";

export default function Reservations() {

    const [currentReservations, setCurrentReservations] = useState([])
    
    useEffect (() =>  {
        let storage = JSON.parse(sessionStorage.getItem("reservations"));
        console.log(storage)
        if (storage === null) {
            console.log("ei")
            setCurrentReservations([])
        }
        console.log(storage)
        setCurrentReservations(storage)
    }, [])


    return (
        <Box>
            <Box className="currenReservations">
                <Typography variant="h3">Current reservation</Typography>
                <ProductsGrid variant="current" products={currentReservations}></ProductsGrid>
            </Box>
        </Box>
    );
}
