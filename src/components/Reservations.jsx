import { useEffect, useState } from "react";
import { Button, Box, Typography, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import { newReservation } from "../petshopapi";

export default function Reservations() {
    const [currentReservations, setCurrentReservations] = useState([]);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let storage = JSON.parse(sessionStorage.getItem("reservations"));
        if (storage === null) {
            setCurrentReservations([]);
        }
        setCurrentReservations(storage);
    }, []);

    const reserveProducts = async () => {
        try {
            const message = await newReservation(currentReservations);
            setError(message);
            sessionStorage.setItem("reservations", JSON.stringify([]));
            setCurrentReservations([]);
        } catch (err) {
            console.error(err.message);
            setOpen(true)
        }
    };

    return (
        <>
            <Box className="currentReservations">
                <Typography variant="h3">Current reservation</Typography>
                <ProductsGrid reserveButtonTrue={false} products={currentReservations} height={300} ></ProductsGrid>
                <Button onClick={reserveProducts} sx={{ marginLeft: "1em" }} variant="contained">Reserve products above</Button>
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
}
