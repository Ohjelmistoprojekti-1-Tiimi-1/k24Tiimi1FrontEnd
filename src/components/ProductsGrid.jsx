import {useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


export default function ProductsGrid({reserveButtonTrue, products, height}) {
    function ReserveButton(product) {
        if (sessionStorage.getItem("jwt") && reserveButtonTrue) {
            return (
               <ReserveButton product={product} ></ReserveButton>
            );
        }else {
            return <></>
        }
    }

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
        { field: "count", filter: true, width: 100 },
        { cellRenderer: (params) => ReserveButton(params) },
        
    ]);

    return (
            <div className="ag-theme-material" style={{ height: height }}>
                <AgGridReact
                    rowData={products}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
    );
} 