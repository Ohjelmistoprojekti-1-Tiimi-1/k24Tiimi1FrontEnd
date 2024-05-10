import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchProductsWithInfo } from "../petshopapi";
import { Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


export default function ProductsGrid(params) {
    function ReserveButton(params) {
        console.log(params)
        if (sessionStorage.getItem("jwt") && variant !== "current") {
            return (
               <ReserveButton product={product} ></ReserveButton>
            );
        }
    }

    const [products] = useState(params.products);

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
        //{
        //  cellRenderer: params =>
        //      <Button size="small" onClick={() => handleReserve()}>Reserve</Button>, width: 120
        //}
        { cellRenderer: (params) => ReserveButton(params) },
    ]);

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
        </>
    );
} 