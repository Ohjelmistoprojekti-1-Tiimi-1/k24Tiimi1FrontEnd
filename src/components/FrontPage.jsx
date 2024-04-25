import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
//import { fetchIndividualProducts } from "../petshopapi";



function FrontPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    //this should probably be in petshopapi.js?
    const fetchIndividualProducts = () => {
        return fetch(import.meta.env.VITE_API_PRODUCTS + "/" + id)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);
    
                return response.json();
            })
    }

    const handleFetch = () => {
        fetchIndividualProducts()
            .then(data => setProducts(data._embedded.products))
            .catch(err => console.error(err))
    };

    return (
        <>
            <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
                Add some example products here as boxes
            </Box>
        </>
    );
}

export default FrontPage;
