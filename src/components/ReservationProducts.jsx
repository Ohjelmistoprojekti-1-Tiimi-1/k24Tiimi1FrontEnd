import { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { groupBy, sumBy } from "lodash";
import { Button, Snackbar, Typography, Stack } from "@mui/material";
import ReservationContext from "./ReservationContext";
import { newReservation } from "../petshopapi";
import { Link } from "react-router-dom";

const ReservationProducts = () => {
    const [open, setOpen] = useState(false);
    const { reservationProducts, addToReservation, removeFromReservation, emptyReservation } = useContext(ReservationContext);
    const [procucts, setProducts] = useState([]);
    const [colDef] = useState([
        { field: "name", filter: true },
        { field: "color", filter: true },
        { field: "size", filter: true },
        { field: "price", filter: true },
        {
            field: "manufacturer.name",
            filter: true,
            headerName: "Manufacturer",
        },
        {
            field: "productType.productTypeValue",
            filter: true,
            headerName: "Type",
        },
        {
            cellRenderer: params =>
                <Button size="small" onClick={() => changeReservatioinProductCount(params.data.productId, -1)}>
                    ➖
                </Button>
            , width: 120
        },
        { field: "count", cellStyle: { textAlign: 'center' }, filter: true, width: 110 },
        {
            cellRenderer: params =>
                <Button size="small" onClick={() => changeReservatioinProductCount(params.data.productId, 1)}>
                    ➕
                </Button>
            , width: 120
        },
        {
            cellRenderer: params =>
                <Button variant="contained" size="small" color="error" onClick={() => removeFromReservation(params.data.productId)}>
                    Remove
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
                    .then(emptyReservation)
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

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };

    return (
        <>
            <Stack direction="row">
                <Typography variant="h4">Current reservation</Typography>
                {reservationProducts.length > 0 &&
                    <Button variant="contained" onClick={reserveProducts} sx={{ position: "absolute", right: "5%" }}>Reserve selected products</Button>
                }
            </Stack>
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={procucts}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={"Please sign in to complete the reservation."}
                action={<Link to={"/login"} style={{ color: "white" }} >Sign in</Link>}
            />
        </>
    );
};

export default ReservationProducts;