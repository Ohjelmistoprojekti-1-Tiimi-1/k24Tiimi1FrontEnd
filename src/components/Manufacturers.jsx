import { useEffect, useState } from "react";
import { fetchManufacturers } from "../petshopapi.js";

import { Box, Typography, Stack, Card, CardActionArea, CardContent } from "@mui/material";

import ManufacturerElement from "./ManufacturerElement.jsx";


const Manufacturer = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState();


    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchManufacturers()
            .then(data => setManufacturers(data._embedded.manufacturers))
            .catch(err => console.error(err));
    };

    return (
        <>
        <Typography variant="h5" sx={{ p: 2 }}>
        Click on the manufacturer to view their products
      </Typography>
        <Box sx={{ p: 2 }}>

            <Stack direction="row" spacing={2} mt={2} alignItems="center">
                {manufacturers.map(manufacturer => {
                    return (
                        <Card sx={{ maxWidth: 345 }} key={manufacturer._links.manufacturer.href} onClick={() => setManufacturer(manufacturer)}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {manufacturer.name}
                                    </Typography>
                                    
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </Stack>

            {manufacturer &&
                <ManufacturerElement manufacturer={manufacturer} />
            }



        </Box>
        </>
    );
};

export default Manufacturer;
