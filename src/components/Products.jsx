import { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { IconButton, Snackbar } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { fetchProductsWithInfo } from "../petshopapi";
import { Link } from "react-router-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import ReservationContext from "./ReservationContext";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const { reservationProducts, addToReservation }  = useContext(ReservationContext);
    const [colDef] = useState([
        { field: "name", filter: true },
        { field: "color", filter: true, width: 100 },
        { field: "size", filter: true, width: 100 },
        { field: "price", filter: true, width: 100 },
        {
            field: "manufacturer.name",
            filter: true,
            width: 160,
            headerName: "Manufacturer",
        },
        {
            field: "productType.productTypeValue",
            filter: true,
            width: 160,
            headerName: "Type",
        },
        {
            cellRenderer: params =>
                < IconButton onClick={() => handleReserve(params.data)} >
                    <AddShoppingCartIcon />
                </IconButton >
        }
    ]);

    const handleReserve = (product) => {
        addToReservation(product);
        setOpen(true);
    };

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
        <div className="ag-theme-material" style={{ height: 600 }}>
            <AgGridReact
                rowData={products}
                columnDefs={colDef}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>
        <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={"Added to reservation."}
                action={<Link to={"/reservations"} style={{ color: "white" }} >Go to reservations</Link>}
            />
        </>
    );
}
