import { useEffect, useState } from "react";
import { fetchManufacturerProducts } from "../petshopapi";

import { Typography, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


const ManufacturerElement = ({ manufacturer }) => {
    const [products, setProducts] = useState([]);
    const [colDef] = useState([
        { field: 'name', filter: true },
        { field: 'color', filter: true, width: 100 },
        { field: 'size', filter: true, width: 100 },
        { field: 'price', filter: true, width: 100 },
        { field: 'productType.productTypeValue', filter: true, width: 160, headerName: "Type" },
        {
            cellRenderer: params =>
                < IconButton onClick={() => handleReserve()} >
                    <AddShoppingCartIcon />
                </IconButton >
        }
    ]);

    useEffect(() => {
        handleFetch()
    }, [manufacturer]);


    const handleFetch = () => {
        fetchManufacturerProducts(manufacturer.name)
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    };

    const handleReserve = {
        //TODO create reserving functionality
    }


    return (
        <>
            <Typography variant="h3">{manufacturer.name}</Typography>
            <Typography variant="h5">Country: {manufacturer.country}</Typography>
            <Typography variant="h5">Company ID: {manufacturer.businessIdentityCode} </Typography>
            <Typography variant="h4">All products by {manufacturer.name}: </Typography>

            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={products}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );

};

export default ManufacturerElement;