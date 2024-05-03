import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCatalog from "./ProductCatalog.jsx"


function Manufacturer({manufacturerId}) {
    const [manufacturer, setManufacturer] = useState({});
    const [products, setProducts] = useState([{}]);

    useEffect(() => {
        async function doFetch() {
            const response1 = await fetch(
                `${import.meta.env.VITE_API_MANUFACTURERS}/${manufacturerId}`
            );
            const json1 = await response1.json();
            setManufacturer(json1);

            const response2 = await fetch(
                `${import.meta.env.VITE_API_MANUFACTURERS}/${manufacturerId}/products`
            );
            const json2 = await response2.json();
            const products = json2._embedded.products;
            setProducts(products);
        }
        doFetch();
    }, []);

    return (
        <Box>
            <Typography sx={{margin:"2em", fontSize:"2em"}}> {manufacturer.name}</Typography>
            <Typography sx={{margin:"2em"}}>Country: {manufacturer.country}</Typography>
            <Typography sx={{margin:"2em"}}>Company ID: {manufacturer.businessIdentityCode}</Typography>

            <Typography sx={{margin:"2em"}}>Selaa tuottajan tuotteita:</Typography>
            <ProductCatalog products={products}></ProductCatalog>
            
        </Box>
    );
}
export default Manufacturer;
