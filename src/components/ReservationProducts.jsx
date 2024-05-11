import { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { groupBy, sumBy } from "lodash";

import ReservationContext from "./ReservationContext";

const ReservationProducts = () => {
    const { reservationProducts, addToReservation } = useContext(ReservationContext);
    const [procucts, setProducts] = useState([]);
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
    ]);

    useEffect(() => {
        // reservationProducts.forEach(r => console.log(r))
        const withCount = reservationProducts.map(reservationProduct => ({...reservationProduct, count: 1}));
        const goupped = groupBy(withCount, "productId")
        console.log(goupped)
        }, [])

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={reservationProducts}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
};

export default ReservationProducts;