import { useEffect, useState, useContext } from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import ReservationContext from "./ReservationContext";
import ReservationProducts from "./ReservationProducts";
import CustomerReservations from "./CustomerReservations";

export default function Reservations() {
    const [value, setValue] = useState("1");
    const { reservationProducts, addToReservation } = useContext(ReservationContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (reservationProducts.length > 0) {
            setValue("2");
        } else {
            setValue("1")
        }
    }, [reservationProducts]);

    return (
        <>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Your reservations" value="1" />
                        <Tab label="New Reservation" value="2" />
                    </TabList>
                    <TabPanel value="1">
                        <CustomerReservations />
                    </TabPanel>
                    <TabPanel value="2">
                        <ReservationProducts />
                    </TabPanel>
                </Box>
            </TabContext>
        </>
    );
}
