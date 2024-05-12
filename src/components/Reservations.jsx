import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab';

import ReservationProducts from "./ReservationProducts";


export default function Reservations() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Your reservations" value="1" />
                        <Tab label="New Reservation" value="2" />
                    </TabList>
                    <TabPanel value="1">
                        Your reservations
                    </TabPanel>
                    <TabPanel value="2">
                        <ReservationProducts />
                    </TabPanel>

                </Box>
            </TabContext>
        </>
    );
};
