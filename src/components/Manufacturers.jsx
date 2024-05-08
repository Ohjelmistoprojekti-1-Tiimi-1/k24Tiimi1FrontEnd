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
        <Box>

            <Stack direction="row" spacing={2} mt={2} alignItems="center">
                {manufacturers.map(manufacturer => {
                    return (
                        <Card sx={{ maxWidth: 345 }} key={manufacturer._links.manufacturer.href} onClick={() => setManufacturer(manufacturer)}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {manufacturer.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
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
    );
};

export default Manufacturer;
