import { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { groupBy, sumBy } from "lodash";
import { Button } from "@mui/material";
import ReservationContext from "./ReservationContext";
import { newReservation } from "../petshopapi";

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
        { field: "count", filter: true}
    ]);

    useEffect(() => {
        const withCount = reservationProducts.map(reservationProduct => ({ ...reservationProduct, count: 1 }));
        const groupped = groupBy(withCount, "productId");
        const products = Object.entries(groupped).map(([key, value]) => {
            return (
                {
                    ...value[0],
                    count: sumBy(value, "count")
                }
            );
        });
        setProducts(products);
    }, []);

    const reserveProducts = () => {
        if (!sessionStorage.getItem("jwt")) {
            setOpen(true);
        } else {
            const reservation = procucts.map(reservationProduct => {
                return (
                    {
                        productId: reservationProduct.productId,
                        count: reservationProduct.count
                    }
                );
            });
            newReservation(reservation)
                .then(() => addToReservation([]))
                .catch(err => console.error(err));
        }
    };

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={procucts}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
            <Button onClick={reserveProducts}>Reserve</Button>
        </>
    );
};

export default ReservationProducts;