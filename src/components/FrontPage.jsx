import { useEffect, useState } from "react";
import { fetchProducts } from "../petshopapi";
import ProductCatalog from "./ProductCatalogue.jsx"
import { Typography } from "@mui/material";

function FrontPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchProducts()
            .then(data => setProducts(data._embedded.products))
            .catch(err => console.error(err))
    }

    return (
        <>
        <Typography sx={{margin: "2em"}}>These products are on 50% sale just now!</Typography>
            <ProductCatalog products= {products.slice(0,3)}></ProductCatalog>
        </>
    );
}

export default FrontPage;
