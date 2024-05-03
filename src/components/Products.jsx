import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { fetchProductsWithInfo } from "../petshopapi";
import { Button } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

//Something about this or petshopapi.js or .env file breaks FrontPage.jsx view of products.

export default function Products() {

    const [products, setProducts] = useState([]);

    const [colDef] = useState([
        { field: 'name', filter: true },
        { field: 'color', filter: true, width: 100 },
        { field: 'size', filter: true, width: 100 },
        { field: 'price', filter: true, width: 100 },
        { field: 'manufacturer.name', filter: true, width: 150 },
        { field: 'productType.productTypeValue', filter: true, width: 150 },
        {
          cellRenderer: params =>
              <Button size="small" onClick={() => handleReserve()}>Reserve</Button>, width: 120
      }
    ]);

    const handleReserve = {
      //TODO create reserving functionality
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchProductsWithInfo()
            .then(data => setProducts(data))
            .catch(err => console.error(err))
    }

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