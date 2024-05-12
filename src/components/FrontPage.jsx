import { useEffect, useState } from "react";
import { fetchProductsWithInfo } from "../petshopapi";
import ProductCatalog from "./ProductCatalogue.jsx"
import { Typography } from "@mui/material";

function FrontPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchProductsWithInfo()
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    };

    return (
        <>
            <Typography variant="h3" sx={{ p: 2 }}>
                Welcome to PetShop!
            </Typography>
            <Typography sx={{ margin: "2em" }}>These products are -50% off right now!</Typography>
            <ProductCatalog products={products.slice(0, 3)}></ProductCatalog>
        </>
    );
}

export default FrontPage;
