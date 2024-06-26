import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from "@mui/material";

function ReserveButton(product) {

    const reserve = async () => {
        const reservations = JSON.parse(sessionStorage.getItem("reservations"));
        if (reservations === "" || reservations == null) {
            sessionStorage.setItem("reservations", JSON.stringify([{ ...product.product, count: 1 }]));
        } else {
            //Tähän metodi jos haluaa että saman tuotteen varaukset näkyvät omalla rivillä. Lisää jsoniin myös attribuutti count.
            reservations.push({ ...product.product, count: 1 });
            sessionStorage.setItem("reservations", JSON.stringify(reservations));
        }
    };

    return (
        < IconButton onClick={reserve}>
            <AddShoppingCartIcon />
        </IconButton >
    );
}


export default ReserveButton;