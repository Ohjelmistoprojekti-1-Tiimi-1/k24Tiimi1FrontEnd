import { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { groupBy, sumBy } from "lodash";
import { Button, Snackbar, Typography } from "@mui/material";
import ReservationContext from "./ReservationContext";
import { newReservation } from "../petshopapi";
import { Link } from "react-router-dom";

const ReservationProducts = () => {
    const [open, setOpen] = useState(false);
    const { reservationProducts, addToReservation, removeFromReservation } = useContext(ReservationContext);
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
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => changeReservatioinProductCount(params.data.productId, -1)}>
                    ➖
                </Button>
            , width: 120
        },
        { field: "count", filter: true },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => changeReservatioinProductCount(params.data.productId, 1)}>
                    ➕
                </Button>
            , width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => removeFromReservation(params.data.productId)}>
                    Delete
                </Button>
            , width: 120
        }
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
    }, [reservationProducts]);

    const reserveProducts = () => {
        if (!sessionStorage.getItem("jwt")) {
            setOpen(true);
        } else {
            if (window.confirm("Are you sure?")) {
                const reservation = procucts.map(reservationProduct => {
                    return (
                        {
                            productId: reservationProduct.productId,
                            count: reservationProduct.count
                        }
                    );
                });
                newReservation(reservation)
                    .then(() => sessionStorage.removeItem("reservation"))
                    .then(() => window.location.reload()) // molemmat pois ja metodi millä usecontex []
                    .catch(err => console.error(err));
            }
        }
    };

    const changeReservatioinProductCount = (productId, num) => {
        setProducts(prevProducts => prevProducts.map(p => {
            if (p.productId === productId) {
                if (p.count + num === 0) {
                    removeFromReservation(p.productId);
                } else {
                    return ({
                        ...p,
                        count: p.count + num,
                    });
                }
            }
            else return p;
        }));
    };

    return (
        <>
            <Typography variant="h4">Current reservation</Typography>
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
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={"Please login first to make the reservatioin: "}
                action={<Link to={"/login"} style={{ color: "white" }} >To Login Page</Link>}
            />
        </>
    );
};

export default ReservationProducts;