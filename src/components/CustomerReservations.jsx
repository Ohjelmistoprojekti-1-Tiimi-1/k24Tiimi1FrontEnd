import { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { groupBy, sumBy } from "lodash";
import { Button, Snackbar, Typography } from "@mui/material";
import ReservationContext from "./ReservationContext";
import { newReservation } from "../petshopapi";
import { Link } from "react-router-dom";
import { fetchReservations } from "../petshopapi";

const CustomerReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [products, setProducts] = useState([]);
  const [productURL, setProductURL] = useState("");
  const [colDef] = useState([
    { field: "reservationId", filter: true, width: 150 },
    { field: "created", filter: true, width: 250 },
    { field: "delivered", filter: true, width: 250 },
    { field: "cancelled", filter: true, width: 250 },
  ]);

  useEffect(() => {
    handleReservationFetch();
  }, []);

  const handleReservationFetch = () => {
    fetchReservations()
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Typography variant="h4">Your past reservations</Typography>
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
