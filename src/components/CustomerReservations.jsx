import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Typography, Button } from "@mui/material";
import { fetchReservations } from "../petshopapi";
import dayjs from "dayjs";
import { fetchCancelReservation } from "../petshopapi";

const CustomerReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [colDef] = useState([
        { field: "reservationId", filter: true, width: 150 },
        { field: "created", valueGetter: p => dayjs(p.data.created).format('DD.MM.YYYY HH:mm'), filter: true, width: 250 },
        { field: "delivered", valueGetter: p => p.data.delivered ? dayjs(p.data.delivered).format('DD.MM.YYYY HH:mm') : "", filter: true, width: 250 },
        { field: "cancelled", valueGetter: p => p.data.cancelled ? dayjs(p.data.cancelled).format('DD.MM.YYYY HH:mm') : "", filter: true, width: 250 },
        {
            cellRenderer: params => {
                if (!params.data.delivered && !params.data.cancelled) {
                    return (
                        <Button size="small" color="error" onClick={() => cancelReservation(params.data.reservationId)}>
                            Cancel
                        </Button>);
                }
            }
            , width: 120
        }
    ]);

    useEffect(() => {
        if (sessionStorage.getItem("jwt"))
            handleReservationFetch();
    }, []);

    const handleReservationFetch = () => {
        fetchReservations()
            .then((data) => setReservations(data))
            .catch((err) => console.error(err));
    };

    const cancelReservation = (reservationId) => {
        fetchCancelReservation(reservationId)
            .then(handleReservationFetch)
            .catch(err => console.error(err));
    };

    return (
        <>
            <Typography variant="h4">Your reservations</Typography>
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={reservations}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
};

export default CustomerReservations;
