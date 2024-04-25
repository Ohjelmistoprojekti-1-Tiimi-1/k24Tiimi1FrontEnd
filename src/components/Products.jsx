import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { fetchProducts } from "../petshopapi";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Products() {

    const [products, setProducts] = useState([]);

    const [colDef] = useState([
        { field: 'name', filter: true },
        { field: 'color', filter: true, width: 100 },
        { field: 'size', filter: true, width: 100 },
        { field: 'price', filter: true, width: 100 },
        { field: 'manufacturer', filter: true, width: 150 },
        { field: 'productType', filter: true, width: 150 },
    ]);

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